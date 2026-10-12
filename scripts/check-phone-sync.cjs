'use strict';
// Offline browser-flow regression. All API replies, reports and keys below are test fixtures.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'study/today.js'),'utf8');
const plan=JSON.parse(fs.readFileSync(path.join(root,'study/today-plan.json'),'utf8'));
const date='2026-10-12',key='offline-test-key',store='evora-today-progress-v1';
const ids=['load-status','app','selected-title','date','previous-day','next-day','today','capacity','priorities','breaks','note','save-status','proposal','optional','course-links','month','month-summary','upcoming','undated','export','import','backup-status','repo-owner','repo-name','repo-token','connect','disconnect','sync-now','sync-status','resolve-conflicts'];
class Element{
  constructor(tag){this.tagName=tag.toUpperCase();this.childNodes=[];this.events=new Map();this.value='';this.textContent='';this.disabled=false;this.hidden=false;}
  append(...items){this.childNodes.push(...items);}
  prepend(...items){this.childNodes.unshift(...items);}
  replaceChildren(...items){this.childNodes=items;}
  setAttribute(name,value){this[name]=value;}
  addEventListener(name,callback){this.events.set(name,[...(this.events.get(name)||[]),callback]);}
  async fire(name){for(const callback of this.events.get(name)||[])await callback({type:name});}
  remove(){}
}
async function settle(){await new Promise(resolve=>setImmediate(resolve));}
function fixture(){
  const n=Object.fromEntries(ids.map(id=>[id,new Element('div')])),storage=new Map(),events=new Map(),timers=new Map(),calls=[],remote=new Map();let timerId=0;
  n['repo-owner'].value='Hostilian';n['repo-name'].value='EVORA-STUDY-PROGRESS';n['sync-now'].disabled=true;n.disconnect.disabled=true;
  const settings={writeStatus:201,userStatus:200,private:true,holdProgressRead:false},held=[];
  const reply=(status,data)=>({status,ok:status>=200&&status<300,json:async()=>structuredClone(data)});
  const file=value=>({type:'file',encoding:'base64',size:Buffer.byteLength(JSON.stringify(value)),content:Buffer.from(JSON.stringify(value)).toString('base64'),sha:'fixture-sha'});
  const fetch=async(url,options={})=>{
    if(url==='today-plan.json')return reply(200,plan);
    const u=new URL(url),method=options.method||'GET';calls.push({url,method,body:options.body,signal:options.signal});
    assert.equal(u.origin,'https://api.github.com');assert.equal(options.credentials,'omit');assert.equal(options.redirect,'error');assert.equal(options.cache,'no-store');assert.equal(options.headers.Authorization,'Bearer '+key);
    if(u.pathname==='/user')return reply(settings.userStatus,{login:'Hostilian'});
    assert.ok(u.pathname.startsWith('/repos/Hostilian/EVORA-STUDY-PROGRESS'));
    if(u.pathname==='/repos/Hostilian/EVORA-STUDY-PROGRESS')return reply(200,{private:settings.private,owner:{login:'Hostilian'},name:'EVORA-STUDY-PROGRESS',default_branch:'main'});
    const relative=u.pathname.split('/contents/')[1];
    if(relative==='sync-manifest.json')return reply(200,file({kind:'evora-progress-data-only',schema:'evora-phone-progress-v1'}));
    if(relative.startsWith('plans/'))return reply(404,{});
    assert.equal(relative,'progress/'+date+'.json');
    if(method==='PUT'){
      assert.equal(options.headers['Content-Type'],'application/json');const body=JSON.parse(options.body);assert.equal(body.branch,'main');
      const report=JSON.parse(Buffer.from(body.content,'base64').toString('utf8'));assert.equal(report.date,date);
      if([200,201].includes(settings.writeStatus))remote.set(relative,report);
      return reply(settings.writeStatus,{});
    }
    if(settings.holdProgressRead)return new Promise((resolve,reject)=>{held.push({resolve:()=>resolve(reply(404,{})),signal:options.signal});options.signal.addEventListener('abort',()=>{const error=Error('Request aborted');error.name='AbortError';reject(error);},{once:true});});
    return remote.has(relative)?reply(200,file(remote.get(relative))):reply(404,{});
  };
  class Clock extends Date{constructor(...args){super(...(args.length?args:['2026-10-12T12:00:00.000Z']));}static now(){return Date.parse('2026-10-12T12:00:00.000Z');}}
  vm.runInNewContext(source,{document:{getElementById:id=>n[id],createElement:tag=>new Element(tag),body:new Element('body')},window:{addEventListener:(name,callback)=>events.set(name,callback)},location:{href:'https://hostilian.github.io/EVORACLASSES/study/today.html?date='+date,origin:'https://hostilian.github.io',search:'?date='+date},localStorage:{getItem:name=>storage.get(name)||null,setItem:(name,value)=>storage.set(name,value)},fetch,URL,URLSearchParams,Date:Clock,Intl,TextEncoder,TextDecoder,AbortController,Blob,atob:s=>Buffer.from(s,'base64').toString('binary'),btoa:s=>Buffer.from(s,'binary').toString('base64'),setTimeout:(callback,ms)=>{const id=++timerId;timers.set(id,{callback,ms});return id;},clearTimeout:id=>timers.delete(id)},{filename:'today.js'});
  return {n,storage,timers,calls,remote,settings,held,events,
    connect:async()=>{n['repo-token'].value=key;await n.connect.fire('click');await settle();},
    notDone:async()=>{const button=n.priorities.childNodes[0].childNodes.find(x=>x.tagName==='BUTTON');assert.ok(button);await button.fire('click');await settle();},
    sync:async()=>{await n['sync-now'].fire('click');await settle();},
    report:()=>JSON.parse(storage.get(store)).days[date],
    writes:()=>calls.filter(c=>c.method==='PUT'),
    pagehide:()=>events.get('pagehide')(),
  };
}
(async()=>{
  const blank=fixture();await settle();await blank.connect();await blank.sync();
  assert.match(blank.n['sync-status'].textContent,/Choose Not done yet/);assert.equal(blank.writes().length,0);assert.equal(blank.report().reported_status,'unreported');

  const normal=fixture();await settle();await normal.connect();await normal.notDone();await normal.sync();
  assert.equal(normal.writes().length,1,normal.n['sync-status'].textContent);assert.match(normal.n['sync-status'].textContent,/Private read and write verified for 2026-10-12/);
  const saved=normal.remote.get('progress/'+date+'.json');assert.equal(saved.tasks.length,1);assert.equal(saved.tasks[0].done,false);assert.equal(saved.reported_minutes,0);assert.equal(saved.official_completion_inferred,false);
  assert.ok(![...normal.storage.values()].join('').includes(key));

  const restored=fixture();await settle();await restored.connect();await restored.notDone();restored.pagehide();await settle();
  assert.equal(restored.n['sync-now'].disabled,true);assert.equal(restored.n.disconnect.disabled,true);assert.match(restored.n['sync-status'].textContent,/Reconnect/);
  assert.ok([...restored.timers.values()].every(t=>t.ms!==1200),'Queued auto-save was cancelled');const requestsBefore=restored.calls.length;await restored.sync();assert.equal(restored.calls.length,requestsBefore);
  assert.equal(restored.report().tasks[0].done,false);await restored.connect();await restored.sync();assert.equal(restored.writes().length,1);assert.match(restored.n['sync-status'].textContent,/Private read and write verified/);

  const interrupted=fixture();await settle();await interrupted.connect();await interrupted.notDone();interrupted.settings.holdProgressRead=true;await interrupted.sync();assert.equal(interrupted.held.length,1);
  interrupted.pagehide();await settle();assert.equal(interrupted.held[0].signal.aborted,true);assert.equal(interrupted.writes().length,0);assert.equal(interrupted.n['sync-now'].disabled,true);assert.match(interrupted.n['sync-status'].textContent,/Reconnect/);assert.equal(interrupted.report().tasks[0].done,false);

  const denied=fixture();await settle();await denied.connect();await denied.notDone();denied.settings.writeStatus=403;await denied.sync();
  assert.match(denied.n['sync-status'].textContent,/GitHub 403/);assert.match(denied.n['sync-status'].textContent,/Contents → Read and write/);assert.match(denied.n['sync-status'].textContent,/browser report is retained/);assert.equal(denied.report().tasks[0].done,false);assert.equal(denied.remote.size,0);

  denied.settings.userStatus=401;await denied.connect();assert.equal(denied.n['sync-now'].disabled,true);assert.equal(denied.n.disconnect.disabled,true);assert.match(denied.n['sync-status'].textContent,/GitHub refused the key \(401\)/);assert.equal(denied.report().tasks[0].done,false);

  const publicTarget=fixture();await settle();publicTarget.settings.private=false;await publicTarget.connect();assert.equal(publicTarget.n['sync-now'].disabled,true);assert.equal(publicTarget.writes().length,0);assert.match(publicTarget.n['sync-status'].textContent,/Public repositories are refused/);

  process.stdout.write(JSON.stringify({offline_browser_sync_scenarios:7,truthful_false_saved_and_read_back:true,unreported_never_uploaded:true,restored_tab_requires_reconnect:true,inflight_request_cancelled:true,permission_failure_keeps_report:true,invalid_key_resets_controls:true,public_repository_refused:true,keys_not_stored:true})+'\n');
})().catch(error=>{process.stderr.write(error.stack+'\n');process.exitCode=1;});
