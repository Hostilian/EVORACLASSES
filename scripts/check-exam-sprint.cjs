'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const data=JSON.parse(read('study/exam-sprint.json'));
assert.equal(data.format,'evora-exam-sprint-public-v1');
assert.equal(data.timezone,'Europe/Lisbon');
assert.equal(data.courses.length,5);
assert.equal(data.weeks.length,11);
const shorts=new Set(data.courses.map(c=>c.short));
assert.deepEqual([...shorts].sort(),['Data','HCI','Software','Stats','Web']);
const day=s=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&new Date(s+'T12:00:00Z').toISOString().slice(0,10)===s;
let tasks=0,previous='',ids=new Set();
for(const w of data.weeks){
 assert.ok(day(w.start)&&day(w.end)&&w.start<=w.end);
 assert.ok(!previous||w.start>previous);previous=w.start;
 assert.ok(w.tasks.length>=5);
 for(const c of shorts)assert.ok(w.tasks.some(t=>t.course===c),'Week missing '+c+' '+w.start);
 for(const t of w.tasks){
  assert.ok(!ids.has(t.id),'Duplicate task ID '+t.id);ids.add(t.id);tasks++;
  assert.ok(shorts.has(t.course));
  assert.equal(t.kind,'personal-study-plan');
  assert.ok(t.title.length>15&&t.method.length>5);
 }
}
for(const d of data.deadlines){
 assert.ok(day(d.date));assert.ok(shorts.has(d.course));
 assert.ok(['conditional','announced','historical-course','provisional','conflicting'].includes(d.certainty));
 assert.ok(d.url.startsWith('https://www.moodle.uevora.pt/2627/'));
}
const html=read('study/exam-sprint.html');
for(const p of ['exam-sprint.js','exam-sprint.css','exam-sprint.json'])
 assert.ok(fs.existsSync(path.join(root,'study',p)));
assert.ok(html.includes('id="course-checklists"'));
assert.ok(html.includes('id="catchup-list"'));
assert.ok(html.includes('id="catchup-count"'));
assert.ok(read('study/exam-sprint.js').includes('renderBacklog()'));
for(const w of data.weeks.slice(0,7))for(const c of shorts)assert.ok(w.tasks.some(t=>t.id===w.id+'-'+c+'-exam-drill'),'Missing zero-to-exam weekly drill '+w.id+' '+c);
assert.ok(html.includes('id="private-token"'));
assert.ok(html.includes('id="session-list"'));
assert.ok(read('index.html').includes('study/exam-sprint.html'));
assert.ok(read('study/today.html').includes('exam-sprint.html'));
for(const p of ['study/exam-sprint.html','study/exam-sprint.css','study/exam-sprint.js','study/exam-sprint.json']){
 const content=read(p);
 for(const secret of ['ghp_','github_pat_','hostiliann@gmail.com','ex77222@alunos.uevora.pt'])
  assert.ok(!content.includes(secret),'Do not publish private account data in '+p);
}
assert.ok(!html.includes('unsafe-inline'));
assert.ok(read('study/exam-sprint.js').includes('verified')&&read('study/exam-sprint.js').includes('REPO'));
for(const code of ['INF13207L','INF13204L','INF14387L','INF13186L','MAT02354L'])
 assert.ok(read('study/courses/'+code+'.html').includes('../exam-sprint.html'),'Missing phone sprint navigation in '+code);
assert.ok(read('study/study_guide.html').includes('exam-sprint.html'));
console.log(JSON.stringify({course_count:shorts.size,weekly_checklists:data.weeks.length,authored_tasks:tasks,dated_assessments:data.deadlines.length,personal_receipts_public:false,legacy_plan_preserved:true}));
