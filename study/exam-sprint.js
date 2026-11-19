'use strict';
(function(){
  const PLAN_URL='exam-sprint.json';
  const FORMAT='evora-exam-sprint-progress-v1';
  const STORE='evora-exam-sprint-local-v1';
  const REPO='Hostilian/EVORA-STUDY-PROGRESS';
  const API='https://api.github.com';
  const REMOTE_PATH='progress/exam-sprint-v1.json';
  const EVIDENCE_PATH='plan/exam-sprint-2026-11-19.json';
  const MAX_BYTES=500000;
  const $=id=>document.getElementById(id);
  let plan=null,selectedIndex=0,token='',repoBranch='',remoteReady=false,submitting=false,evidence=null;
  const newProgress=()=>({format:FORMAT,version:1,target:35,checks:{},sessions:[],removed_sessions:{},updated_at:null});
  let progress=newProgress();
  const today=()=>{
    const parts=Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Lisbon',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const m=Object.fromEntries(parts.map(p=>[p.type,p.value]));
    return m.year+'-'+m.month+'-'+m.day;
  };
  const dateMs=d=>Date.parse(d+'T12:00:00Z');
  const safeDate=d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&!Number.isNaN(dateMs(d))&&new Date(dateMs(d)).toISOString().slice(0,10)===d;
  const isoNow=()=>new Date().toISOString();
  const el=(tag,txt,cls)=>{const n=document.createElement(tag);if(txt!==undefined)n.textContent=txt;if(cls)n.className=cls;return n;};
  const clear=n=>n.replaceChildren();
  const note=(id,t,error=false)=>{const n=$(id);n.textContent=t;n.classList.toggle('error',error);};
  const course=short=>plan.courses.find(c=>c.short===short);
  const pageLink=(parent,url,label)=>{
    if(typeof url!=='string'||!/^https:\/\/(www\.moodle\.uevora\.pt|calendar\.google\.com|hostilian\.github\.io)\//.test(url))return;
    const a=el('a',label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';parent.append(a);
  };
  const dateLabel=d=>new Date(dateMs(d)).toLocaleDateString('en-GB',{day:'numeric',month:'short',timeZone:'UTC'});
  const week=()=>plan.weeks[selectedIndex];
  const inWeek=(day,w)=>day>=w.start&&day<=w.end;
  const taskList=w=>w.tasks.concat(plan.courses.map(c=>({id:w.id+'-'+c.short+'-moodle-check',course:c.short,title:'Check new Moodle announcements, activities, grades and submission status this week',method:'A completed check means only you opened the official page, not that a class requirement was met.',kind:'recurring-source-review'})));
  const checked=id=>progress.checks[id]?.done===true;
  const weeklySessions=w=>progress.sessions.filter(s=>inWeek(s.date,w));
  const weeklyMinutes=w=>weeklySessions(w).reduce((n,s)=>n+s.minutes,0);
  const humanTime=minutes=>{const h=Math.floor(minutes/60),m=minutes%60;return h+(m?('h '+String(m).padStart(2,'0')+'m'):'h');};
  function validatePlan(p){
    if(!p||p.format!=='evora-exam-sprint-public-v1'||!Array.isArray(p.courses)||p.courses.length!==5||!Array.isArray(p.weeks)||p.weeks.length<6||!Array.isArray(p.deadlines))throw Error('The public exam plan is malformed.');
    const ids=new Set();
    for(const w of p.weeks){
      if(!safeDate(w.start)||!safeDate(w.end)||w.start>w.end||!Array.isArray(w.tasks))throw Error('A weekly schedule is malformed.');
      for(const t of w.tasks){
        if(ids.has(t.id)||!p.courses.some(c=>c.short===t.course))throw Error('Duplicate or invalid task.');
        ids.add(t.id);
      }
    }
    return p;
  }
  function parseProgress(obj){
    if(!obj||obj.format!==FORMAT||obj.version!==1||!obj.checks||typeof obj.checks!=='object'||Array.isArray(obj.checks)||!Array.isArray(obj.sessions))throw Error('This is not an exam sprint progress backup.');
    const clean=newProgress();
    clean.target=[20,25,30,35,40].includes(obj.target)?obj.target:35;
    const validIDs=new Set(plan.weeks.flatMap(w=>taskList(w).map(t=>t.id)));
    for(const [id,value] of Object.entries(obj.checks)){
      if(!validIDs.has(id)||!value||typeof value.done!=='boolean'||Number.isNaN(Date.parse(value.at)))continue;
      clean.checks[id]={done:value.done,at:value.at};
    }
    for(const s of obj.sessions){
      if(!s||typeof s.id!=='string'||s.id.length>90||!safeDate(s.date)||!plan.courses.some(c=>c.short===s.course)||!['problems','theory','mock','project','anki'].includes(s.type)||!Number.isInteger(s.minutes)||s.minutes<5||s.minutes>360)continue;
      const result=Number.isInteger(s.correct)&&Number.isInteger(s.total)&&s.correct>=0&&s.total>0&&s.total<=1000&&s.correct<=s.total&&s.type==='mock'?{correct:s.correct,total:s.total}:{};
      clean.sessions.push({id:s.id,date:s.date,course:s.course,minutes:s.minutes,type:s.type,note:String(s.note||'').slice(0,250),at:typeof s.at==='string'?s.at:isoNow(),...result});
    }
    if(obj.removed_sessions&&typeof obj.removed_sessions==='object'&&!Array.isArray(obj.removed_sessions))for(const [id,at] of Object.entries(obj.removed_sessions)){if(typeof id==='string'&&id.length<91&&typeof at==='string'&&!Number.isNaN(Date.parse(at)))clean.removed_sessions[id]=at;}
    clean.sessions=clean.sessions.filter(x=>!clean.removed_sessions[x.id]||x.at>clean.removed_sessions[x.id]);
    clean.updated_at=typeof obj.updated_at==='string'?obj.updated_at:null;
    return clean;
  }
  function saveLocal(){
    progress.updated_at=isoNow();
    try{localStorage.setItem(STORE,JSON.stringify(progress));}catch(e){note('status','Local save failed. Export your progress backup now.',true);return;}
    if(remoteReady)note('sync-status','Local changes saved on this device, not yet cloud-synced. Select Save & verify private sync.');
  }
  function mergeProgress(local,remote){
    const merged=newProgress();
    merged.target=local.target;
    const ids=new Set([...Object.keys(local.checks),...Object.keys(remote.checks)]);
    for(const id of ids){
      const a=local.checks[id],b=remote.checks[id];
      if(!a||!b){merged.checks[id]=a||b;continue;}
      if(a.at===b.at&&a.done!==b.done)throw Error('Conflicting equal-time checklist edits; export both devices before retrying.');
      merged.checks[id]=a.at>=b.at?a:b;
    }
    const all=new Map();
    for(const s of remote.sessions)all.set(s.id,s);
    for(const s of local.sessions){
      if(all.has(s.id)&&JSON.stringify(all.get(s.id))!==JSON.stringify(s))throw Error('Conflicting session ID; export both devices before retrying.');
      all.set(s.id,s);
    }
    for(const id of new Set([...Object.keys(local.removed_sessions||{}),...Object.keys(remote.removed_sessions||{})])){const a=local.removed_sessions?.[id],b=remote.removed_sessions?.[id];merged.removed_sessions[id]=!a?b:!b?a:(a>=b?a:b);}
    merged.sessions=[...all.values()].filter(s=>!merged.removed_sessions[s.id]||s.at>merged.removed_sessions[s.id]).sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
    merged.updated_at=isoNow();
    return merged;
  }
  function renderSummary(){
    const w=week(),total=taskList(w),done=total.filter(t=>checked(t.id)).length,hours=weeklyMinutes(w);
    $('hours-done').textContent=humanTime(hours);
    $('hours-target').textContent=progress.target+'h';
    $('tasks-done').textContent=done+'/'+total.length;
    const pct=Math.round(Math.min(100,hours/(progress.target*60)*100));
    $('hour-bar').style.width=pct+'%';
    $('hour-progress').setAttribute('aria-valuenow',String(pct));
    $('days-to-first').textContent=Math.max(0,Math.ceil((dateMs('2027-01-04')-dateMs(today()))/86400000)).toString();
  }
  function renderNext(){
    const area=$('next-steps');clear(area);
    const tasks=taskList(week()).filter(t=>!checked(t.id));
    const order={HCI:1,Software:2,Data:3,Web:4,Stats:5};
    tasks.sort((a,b)=>(a.kind==='recurring-source-review'?10:(order[a.course]||9))-(b.kind==='recurring-source-review'?10:(order[b.course]||9)));
    if(!tasks.length){area.append(el('p','All weekly review items have been checked. Record your actual study hours and check the next week.','muted'));return;}
    for(const [i,t] of tasks.slice(0,3).entries()){
      const row=el('div',undefined,'nextrow'),number=el('span',String(i+1),'stepnumber'),info=el('div');
      info.append(el('strong',t.course+' · '+t.title),el('p',t.method));
      row.append(number,info);area.append(row);
    }
  }
  function renderCourses(){
    const area=$('course-checklists');clear(area);
    const w=week();
    for(const c of plan.courses){
      const tasks=taskList(w).filter(t=>t.course===c.short),done=tasks.filter(t=>checked(t.id)).length;
      const details=el('details',undefined,'course-panel');details.open=done!==tasks.length;
      const scores=progress.sessions.filter(s=>s.course===c.short&&s.type==='mock'&&s.total>0).sort((a,b)=>b.date.localeCompare(a.date)||b.at.localeCompare(a.at));
      const lastScore=scores.length?' · latest self-mock '+scores[0].correct+'/'+scores[0].total+' ('+Math.round(scores[0].correct*100/scores[0].total)+'%)':' · no self-mock score yet';
      const summary=el('summary');const label=el('div');label.append(el('span',c.name,'course-title'),el('span','Exam: '+(c.examEnd!==c.exam?dateLabel(c.exam)+'–'+dateLabel(c.examEnd):dateLabel(c.exam))+' · '+c.examConfidence+lastScore,'course-date'));
      summary.append(label,el('span',done+'/'+tasks.length,'pct'));details.append(summary);
      const body=el('div',undefined,'course-body');
      for(const task of tasks){
        const row=el('label',undefined,'task'+(checked(task.id)?' done':'')),input=el('input'),copy=el('div');
        input.type='checkbox';input.checked=checked(task.id);input.setAttribute('aria-label',task.title);
        input.addEventListener('change',()=>{
          progress.checks[task.id]={done:input.checked,at:isoNow()};
          saveLocal();render();
        });
        copy.append(el('strong',task.title),el('p',task.method));row.append(input,copy);body.append(row);
      }
      const links=el('div',undefined,'links');pageLink(links,c.moodle,'Official Moodle course');
      pageLink(links,'https://hostilian.github.io/EVORACLASSES/study/courses/'+c.code+'.html','Study notes + videos');
      body.append(links);details.append(body);area.append(details);
    }
  }
  function renderSessions(){
    const area=$('session-list');clear(area);
    const sessions=weeklySessions(week()).sort((a,b)=>b.date.localeCompare(a.date)||b.at.localeCompare(a.at));
    $('clear-week').hidden=true;
    if(!sessions.length){area.append(el('p','No verified-by-you study sessions recorded for this week.','muted'));return;}
    for(const s of sessions){
      const row=el('div',undefined,'session'),info=el('div'),del=el('button','Remove');
      info.append(el('strong',dateLabel(s.date)+' · '+s.course+' · '+humanTime(s.minutes)+' · '+s.type+(s.total?' · self-mock '+s.correct+'/'+s.total:'')));
      if(s.note)info.append(el('small',s.note));
      del.type='button';del.setAttribute('aria-label','Remove this recorded session');
      del.addEventListener('click',()=>{if(!confirm('Remove this study session from the tracker? A later manual sync will also remove it in your private cloud record.'))return;progress.removed_sessions[s.id]=isoNow();progress.sessions=progress.sessions.filter(x=>x.id!==s.id);saveLocal();render();});
      row.append(info,del);area.append(row);
    }
  }
  function renderDeadlines(){
    const area=$('deadline-list');clear(area);
    const base=week().start>today()?week().start:today();
    const d=plan.deadlines.filter(x=>x.date>=base).slice(0,12);
    if(!d.length){area.append(el('p','No more dated assessments in the saved plan.','muted'));return;}
    for(const item of d){
      const row=el('div',undefined,'deadline'),label=el('time',dateLabel(item.date)),info=el('div');
      label.dateTime=item.date;info.append(el('strong',item.course+' · '+item.title));
      info.append(el('span',item.certainty.replaceAll('-',' '),'flag'+(item.certainty==='historical-course'?' source':'')));
      info.append(el('p',item.note));
      const l=el('div',undefined,'links');pageLink(l,item.url,'Open official page');info.append(l);
      row.append(label,info);area.append(row);
    }
  }
  function render(){
    if(!plan)return;
    const w=week();
    $('week-title').textContent=dateLabel(w.start)+' – '+dateLabel(w.end);
    $('week-theme').textContent=w.theme+' · week '+(selectedIndex+1)+' of '+plan.weeks.length;
    $('week-prev').disabled=selectedIndex===0;
    $('week-next').disabled=selectedIndex===plan.weeks.length-1;
    $('target').value=String(progress.target);
    renderSummary();renderNext();renderCourses();renderSessions();renderDeadlines();
  }
  function currentWeek(){
    const now=today(),idx=plan.weeks.findIndex(w=>inWeek(now,w));
    return idx>=0?idx:now<plan.weeks[0].start?0:plan.weeks.length-1;
  }
  const repoPath='/repos/'+REPO;
  async function request(url,options={}){
    if(!token)throw Error('No private token in memory.');
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    try{
      const r=await fetch(API+url,{method:options.method||'GET',credentials:'omit',redirect:'error',cache:'no-store',signal:controller.signal,headers:{'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Authorization':'Bearer '+token,...(options.body?{'Content-Type':'application/json'}:{})},body:options.body?JSON.stringify(options.body):undefined});
      const payload=await r.json().catch(()=>null);
      return {status:r.status,payload};
    }finally{clearTimeout(timer);}
  }
  function decodeFile(data){
    if(!data||data.type!=='file'||data.encoding!=='base64'||data.size>MAX_BYTES)throw Error('Private file is missing or too large.');
    const raw=atob(String(data.content).replace(/\s/g,''));
    const bytes=Uint8Array.from(raw,c=>c.charCodeAt(0));
    return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
  }
  function encodeFile(obj){
    const bytes=new TextEncoder().encode(JSON.stringify(obj,null,2)+'\n');
    let buffer='';for(let i=0;i<bytes.length;i+=8192)buffer+=String.fromCharCode(...bytes.slice(i,i+8192));
    return btoa(buffer);
  }
  async function readFile(path){
    const r=await request(repoPath+'/contents/'+path+'?ref='+encodeURIComponent(repoBranch));
    if(r.status===404)return {value:null,sha:null};
    if(r.status!==200)throw Error('Private read failed (GitHub '+r.status+').');
    return {value:decodeFile(r.payload),sha:r.payload.sha};
  }
  async function verifyRepo(){
    const who=await request('/user');
    if(who.status!==200||who.payload?.login?.toLowerCase()!=='hostilian')throw Error('Private token must belong to the repository owner.');
    const r=await request(repoPath);
    if(r.status!==200||r.payload?.private!==true||r.payload?.name!=='EVORA-STUDY-PROGRESS'||r.payload?.owner?.login?.toLowerCase()!=='hostilian'||!r.payload?.default_branch)throw Error('Only the existing private data-only progress repository is allowed.');
    repoBranch=r.payload.default_branch;
    const manifest=await readFile('sync-manifest.json');
    if(manifest.value?.kind!=='evora-progress-data-only')throw Error('Repository data-only manifest could not be verified.');
  }
  function showEvidence(){
    const section=$('verified-evidence'),list=$('evidence-list');clear(list);
    if(!evidence||!Array.isArray(evidence.receipts)){section.hidden=true;return;}
    section.hidden=false;
    for(const receipt of evidence.receipts){
      const row=el('div',undefined,'evidence');
      row.append(el('strong',receipt.course+' · '+receipt.title));
      row.append(el('small','Moodle receipt '+receipt.received+' · status: submitted, grade unknown'));
      if(typeof receipt.url==='string'&&receipt.url.startsWith('https://mail.google.com/')){const a=el('a','Open private receipt');a.href=receipt.url;a.target='_blank';a.rel='noopener noreferrer';row.append(a);}
      list.append(row);
    }
    if(Array.isArray(evidence.unverified))for(const item of evidence.unverified){const row=el('div',undefined,'evidence');row.append(el('strong',item.course+' · '+item.title),el('small','Unverified: '+item.note));list.append(row);}
  }
  async function connect(){
    if(submitting)return;
    token=$('private-token').value.trim();$('private-token').value='';
    if(!token){note('sync-status','Enter a token only in the password field on your device.',true);return;}
    $('connect').disabled=true;submitting=true;
    try{
      await verifyRepo();remoteReady=true;
      const personal=await readFile(EVIDENCE_PATH);evidence=personal.value;
      const remote=await readFile(REMOTE_PATH);
      if(remote.value){progress=mergeProgress(progress,parseProgress(remote.value));saveLocal();}
      $('sync').disabled=false;$('disconnect').disabled=false;
      note('sync-status','Connected; private read verified. No write yet. Select Save & verify private sync to confirm cross-device persistence.');
      showEvidence();render();
    }catch(error){disconnect();note('sync-status',error.message+' No cloud save made.',true);}
    finally{submitting=false;$('connect').disabled=remoteReady;}
  }
  async function sync(){
    if(!remoteReady||submitting)return;
    submitting=true;$('sync').disabled=true;
    note('sync-status','Checking latest private state before saving…');
    try{
      for(let attempt=0;attempt<2;attempt++){
        await verifyRepo();
        const remote=await readFile(REMOTE_PATH);
        const merged=remote.value?mergeProgress(progress,parseProgress(remote.value)):parseProgress(progress);
        const body={message:'Save self-reported exam sprint phone progress',content:encodeFile(merged),branch:repoBranch};
        if(remote.sha)body.sha=remote.sha;
        const res=await request(repoPath+'/contents/'+REMOTE_PATH,{method:'PUT',body});
        if([409,422].includes(res.status)&&attempt===0)continue;
        if(![200,201].includes(res.status))throw Error('Private save rejected (GitHub '+res.status+').');
        const check=await readFile(REMOTE_PATH);
        if(!check.value||JSON.stringify(parseProgress(check.value).checks)!==JSON.stringify(parseProgress(merged).checks)||parseProgress(check.value).sessions.length!==merged.sessions.length)throw Error('Read-back did not match. Keep your local backup and retry manually.');
        progress=merged;saveLocal();
        note('sync-status','Private GitHub write and read-back verified. This does not mean Moodle tasks were submitted or reminders delivered.');
        render();return;
      }
      throw Error('Concurrent changes blocked saving; please retry after checking your other device.');
    }catch(error){note('sync-status',error.message+' Local progress is retained.',true);}
    finally{submitting=false;$('sync').disabled=!remoteReady;}
  }
  function disconnect(){
    token='';repoBranch='';remoteReady=false;evidence=null;$('private-token').value='';
    $('connect').disabled=false;$('sync').disabled=true;$('disconnect').disabled=true;
    $('verified-evidence').hidden=true;
    note('sync-status','Disconnected. Token cleared from this page; progress remains on this device.');
  }
  function exportBackup(){
    const data=JSON.stringify(progress,null,2),url=URL.createObjectURL(new Blob([data],{type:'application/json'})),a=el('a');
    a.href=url;a.download='evora-exam-sprint-backup.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    note('backup-status','Backup download requested; no secret included.');
  }
  async function importBackup(){
    const file=$('import').files?.[0];if(!file)return;
    try{
      if(file.size>MAX_BYTES)throw Error('Choose a backup smaller than 500 KB.');
      const imported=parseProgress(JSON.parse(await file.text()));
      progress=mergeProgress(progress,imported);saveLocal();render();
      note('backup-status','Merged backup into this browser. Cloud upload still requires your explicit Save & verify private sync.');
    }catch(error){note('backup-status',error.message,true);}
    finally{$('import').value='';}
  }
  function setup(){
    $('week-prev').addEventListener('click',()=>{if(selectedIndex>0)selectedIndex--;render();});
    $('week-next').addEventListener('click',()=>{if(selectedIndex<plan.weeks.length-1)selectedIndex++;render();});
    $('week-now').addEventListener('click',()=>{selectedIndex=currentWeek();render();});
    $('target').addEventListener('change',()=>{progress.target=Number($('target').value);saveLocal();render();});
    $('session-date').value=today();$('session-date').max=today();
    for(const c of plan.courses){const o=el('option',c.name);o.value=c.short;$('session-course').append(o);}
    $('session-form').addEventListener('submit',e=>{
      e.preventDefault();
      const date=$('session-date').value,minutes=Number($('session-minutes').value),selected=$('session-course').value,type=$('session-type').value;
      const correctRaw=$('session-correct').value.trim(),totalRaw=$('session-total').value.trim(),hasScore=correctRaw!==''||totalRaw!=='';
      if(hasScore&&(correctRaw===''||totalRaw===''||type!=='mock'||!Number.isInteger(Number(correctRaw))||!Number.isInteger(Number(totalRaw))||Number(correctRaw)<0||Number(totalRaw)<1||Number(totalRaw)>1000||Number(correctRaw)>Number(totalRaw)))return note('log-status','For a scored mock, enter both correct and total questions (0 ≤ correct ≤ total).',true);
      if(!safeDate(date)||date>today()||!Number.isInteger(minutes)||minutes<5||minutes>360||!course(selected))return note('log-status','Enter a past/current date, an available course and 5–360 genuine minutes.',true);
      const id='session-'+Date.now()+'-'+Math.random().toString(36).slice(2,10);
      progress.sessions.push({id,date,course:selected,type,minutes,note:$('session-note').value.trim().slice(0,250),at:isoNow(),...(hasScore?{correct:Number(correctRaw),total:Number(totalRaw)}:{})});
      $('session-note').value='';$('session-correct').value='';$('session-total').value='';
      const idx=plan.weeks.findIndex(w=>inWeek(date,w));if(idx>=0)selectedIndex=idx;
      saveLocal();render();note('log-status','Completed session recorded locally. For cross-device backup, use the explicit private sync button.');
    });
    $('connect').addEventListener('click',connect);$('sync').addEventListener('click',sync);$('disconnect').addEventListener('click',disconnect);
    $('export').addEventListener('click',exportBackup);$('import').addEventListener('change',importBackup);
    window.addEventListener('pagehide',()=>{token='';remoteReady=false;});
  }
  (async()=>{
    try{
      const r=await fetch(PLAN_URL,{credentials:'omit',redirect:'error',cache:'no-store'});
      if(!r.ok)throw Error('Could not load the public exam plan.');
      plan=validatePlan(await r.json());
      try{const x=JSON.parse(localStorage.getItem(STORE)||'null');if(x)progress=parseProgress(x);}catch(e){note('status','Saved local progress needs a fresh backup import; nothing was marked complete.',true);}
      selectedIndex=currentWeek();setup();render();$('workspace').hidden=false;
      note('status','Plan reviewed '+plan.updated_on+'. All tasks start uncompleted unless you explicitly checked them in this browser or imported a backup.');
    }catch(error){note('status','Tracker unavailable: '+error.message,true);}
  })();
})();
