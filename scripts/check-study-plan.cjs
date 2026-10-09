'use strict';
// Offline public contract checks. This file never reads account credentials or reports.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),h=require(path.join(root,'study/today.js'));
const p=h.validatePlan(JSON.parse(fs.readFileSync(path.join(root,'study/today-plan.json'),'utf8')));
const add=(d,n)=>{const x=new Date(d+'T12:00:00Z');x.setUTCDate(x.getUTCDate()+n);return x.toISOString().slice(0,10);};
const weeks=new Map();let days=0;
for(let d=p.study_start;d<=p.study_end;d=add(d,1)){
  const core=h.dailyTasks(d,p),optional=h.optionalTasks(d,p),budget=h.weekBudget(d,p);
  assert.equal(core.reduce((s,t)=>s+t.minutes,0),h.coreLimit(d,p),'Daily capacity '+d);
  assert.ok(core.filter(t=>t.kind==='priority').length<=3,'Priority count '+d);
  assert.equal(new Set(core.concat(optional).map(t=>t.id)).size,core.length+optional.length,'Unique IDs '+d);
  for(const t of core.concat(optional))assert.equal(t.signature,JSON.stringify([t.id,t.title,t.minutes,t.course||'',t.text||'',t.kind]),'Deterministic signature '+d);
  const w=weeks.get(budget.start)||{core:0,optional:0,max:budget.max};
  w.core+=core.reduce((s,t)=>s+t.minutes,0);w.optional+=optional.reduce((s,t)=>s+t.minutes,0);weeks.set(budget.start,w);days++;
}
for(const w of weeks.values()){assert.ok(w.core<=420);assert.ok(w.core+w.optional<=w.max&&w.max<=480);}
assert.equal(h.optionalTasks('2026-10-11',p).reduce((s,t)=>s+t.minutes,0),35);
assert.equal(h.optionalTasks('2026-10-18',p).reduce((s,t)=>s+t.minutes,0),60);
assert.equal(h.optionalTasks('2026-10-09',p).length,0);
const date='2026-10-09',tasks=h.dailyTasks(date,p);
assert.deepEqual(tasks.map(t=>[t.id,t.minutes]),[['registration-review',25],['portuguese-or-web',40],['practice',30],['break-1',5],['break-2',5]]);
const earlier={tasks:{practice:{done:true,signature:'earlier revised task',user_reported_at:'2026-10-08T12:00:00.000Z',minutes:70,title:'Earlier report'}}};
const out=h.packet(date,p,earlier);
assert.equal(out.tasks.length,0);assert.equal(out.reported_status,'unreported');assert.equal(out.reported_minutes,0);
assert.equal(out.archived_tasks[0].done,true);assert.equal(out.official_completion_inferred,false);
const unchanged=h.packet(date,p,{tasks:{practice:{done:false,signature:h.taskSignature(tasks[2]),user_reported_at:'2026-10-08T12:00:00.000Z'}}});
assert.equal(unchanged.tasks[0].done,false);assert.equal(unchanged.reported_minutes,0);
assert.ok(h.nextProposal('2026-10-08',p,{days:{}}).tasks.every(t=>!t.title.startsWith('Continue:')));
const previous=h.dailyTasks('2026-10-08',p).find(t=>t.id==='practice');
const explicit={days:{'2026-10-08':{tasks:{practice:{done:false,signature:h.taskSignature(previous),user_reported_at:'2026-10-08T12:00:00.000Z'}}}}};
const proposal=h.nextProposal('2026-10-08',p,explicit);
assert.equal(proposal.tasks.filter(t=>t.title.startsWith('Continue:')).length,1);assert.equal(proposal.minutes,105);
for(const mutate of [
  q=>q.dated_priority_overrides[0].priorities[0].minutes++,
  q=>q.dated_priority_overrides.push(q.dated_priority_overrides[0]),
  q=>q.dated_priority_overrides[0].priorities[0].checked=true,
  q=>q.dated_priority_overrides[0].priorities[0].signature='inherited',
  q=>q.dated_priority_overrides[0].source_urls=['javascript:alert(1)'],
  q=>q.dated_priority_overrides[0].date='2026-10-11',
  q=>q.dated_priority_overrides=false,
  q=>q.dated_priority_overrides[0].source_checked_on='2026-10-10'
]){const q=structuredClone(p);mutate(q);assert.throws(()=>h.validatePlan(q));}
process.stdout.write(JSON.stringify({offline_days_checked:days,weeks_checked:weeks.size,capacity_and_signatures:true,changed_reports_archived:true,unknown_not_completed:true,explicit_false_carry_only:true,invalid_dated_priorities_rejected:true})+'\n');
