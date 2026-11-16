'use strict';
const API = 'https://magno.di.uevora.pt/tweb/t1';
const state = {agents: [], events: [], mode: 'upcoming', page: 1, pages: 1, total: 0, search: null, session: null, current: null, serial: 0};
const el = id => document.getElementById(id);
function esc(x) { return String(x === undefined || x === null ? '' : x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function parseDate(v){const d=new Date(String(v||'').replace(' ','T'));return Number.isNaN(d.getTime())?null:d;}
function prettyDate(v){const d=parseDate(v);return d?new Intl.DateTimeFormat('pt-PT',{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(d):String(v||'Data por confirmar');}
function miniDate(v){const d=parseDate(v);return d?{day:new Intl.DateTimeFormat('pt-PT',{day:'2-digit'}).format(d),month:new Intl.DateTimeFormat('pt-PT',{month:'short'}).format(d)}:{day:'—',month:'—'};}
function duration(v){const m=Number(v);return m>0?(m<60?m+' min':Math.floor(m/60)+'h'+(m%60?String(m%60).padStart(2,'0'):'')):'Por confirmar';}
function toast(msg,error){const t=el('toast');t.textContent=String(msg);t.classList.toggle('error',!!error);t.hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.hidden=true,7000);}
function showModal(id){el(id).hidden=false;document.body.style.overflow='hidden';el(id).querySelector('button')?.focus();}
function hideModal(id){el(id).hidden=true;document.body.style.overflow='';}
async function api(path,method,body){
 const ctrl=new AbortController();const time=setTimeout(()=>ctrl.abort(),12000);
 try {
  const r=await fetch(API+path,{method:method||'GET',headers:{Accept:'application/json',...(body===undefined?{}:{'Content-Type':'application/json'})},body:body===undefined?undefined:JSON.stringify(body),signal:ctrl.signal});
  const t=await r.text();let data;
  try{data=JSON.parse(t);}catch{throw new Error('A resposta do servidor não é JSON válido.');}
  if(!r.ok||data.ok===false)throw new Error(data.error||data.message||'Erro HTTP '+r.status);
  return data;
 }catch(e){
  if(e.name==='AbortError')throw new Error('O servidor demorou demasiado a responder.');
  if(e instanceof TypeError)throw new Error('Não foi possível contactar o servidor. Verifique a ligação.');
  throw e;
 }finally{clearTimeout(time);}
}
const asList=data=>Array.isArray(data?.events)?data.events:Array.isArray(data?.items)?data.items:Array.isArray(data)?data:[];
function setConnection(connected){const p=el('api-pill');p.textContent=connected?'● API ligada':'● API indisponível';p.className='connection-pill '+(connected?'online':'offline');}
function card(event,i){
 const dt=miniDate(event.datetime),place=event.location?.address||'Local não indicado';
 const when=parseDate(event.datetime),time=when?new Intl.DateTimeFormat('pt-PT',{hour:'2-digit',minute:'2-digit'}).format(when):'Hora a confirmar';
 return '<article class="event-card"><div class="event-card-top"><span class="event-glyph" aria-hidden="true">'+['✳','✦','☼','✺'][i%4]+'</span><div class="date-stamp"><strong>'+esc(dt.day)+'</strong><span>'+esc(dt.month)+'</span></div></div>'+
 '<div class="event-card-body"><span class="event-category">Évora · Agenda cultural</span><h3>'+esc(event.name)+'</h3><p>'+esc(String(event.description||'').slice(0,160))+'</p><div class="card-at-a-glance"><span>◷ '+esc(time)+'</span><span>⧖ '+esc(duration(event.duration))+'</span></div>'+
 '<div class="event-card-footer"><span>⌖ '+esc(place)+'</span><button type="button" data-detail="'+esc(event.id)+'">Descobrir ↗</button></div></div></article>';
}
function render(){
 const filter=el('local-agent').value,sort=el('local-order').value;
 let events=state.events.slice();
 if(filter)events=events.filter(e=>String(e.agent_id)===filter);
 events.sort((a,b)=>sort==='name'?String(a.name||'').localeCompare(String(b.name||''),'pt'):(parseDate(a.datetime)?.getTime()||0)-(parseDate(b.datetime)?.getTime()||0));
 const type=state.mode==='upcoming'?'Próximos quatro eventos':state.mode==='search'?'Resultados da pesquisa':'Agenda completa';
 el('results-heading').textContent=type+' · '+events.length+(events.length===1?' evento':' eventos');
 el('events-list').innerHTML=events.length?events.map(card).join(''):'<p class="empty-state">Sem eventos para estes critérios. Altere a pesquisa ou os filtros.</p>';
 if(events.length&&!window.matchMedia('(prefers-reduced-motion:reduce)').matches){
  el('events-list').querySelectorAll('.event-card').forEach((c,i)=>{c.classList.add('card-animate');c.style.animationDelay=(i*0.08).toFixed(2)+'s';});
 }
 el('pager').hidden=state.mode==='upcoming'||state.pages<2;
 el('page-info').textContent='Página '+state.page+' de '+state.pages;
 el('prev-page').disabled=state.page<=1;el('next-page').disabled=state.page>=state.pages;
 renderMapExperience(events);
}
function renderMapExperience(events) {
 const locations=el('map-locations'),canvas=el('map-visual'),count=el('map-events-count');
 if(!locations||!canvas||!count)return;
 const plottable=events.filter(e=>e.location?.lat!=null&&e.location?.lng!=null&&
  Number.isFinite(Number(e.location.lat))&&Number.isFinite(Number(e.location.lng))&&
  Math.abs(Number(e.location.lat))<=90&&Math.abs(Number(e.location.lng))<=180);
 count.textContent=String(plottable.length).padStart(2,'0');
 if(!plottable.length){
  locations.innerHTML='<p class="map-no-locations">Sem coordenadas para estes resultados.</p>';
  canvas.innerHTML='<p class="map-placeholder">Selecione outros resultados com localização disponível.</p>';
  return;
 }
 locations.innerHTML=plottable.map((e,i)=>{
  const date=miniDate(e.datetime),place=e.location?.address||'Évora';
  return '<button type="button" class="map-location'+(i===0?' is-selected':'')+
    '" data-map-index="'+i+'" aria-pressed="'+String(i===0)+'"><span class="map-number">'+
    String(i+1).padStart(2,'0')+'</span><span class="map-location-meta"><strong>'+esc(e.name)+
    '</strong><small>'+esc(date.day)+' '+esc(date.month)+' · '+esc(place)+'</small></span>'+
    '<span class="map-location-arrow" aria-hidden="true">↗</span></button>';
 }).join('');
 function select(index){
  const e=plottable[index];if(!e)return;
  locations.querySelectorAll('[data-map-index]').forEach((button,i)=>{
   const selected=i===index;button.classList.toggle('is-selected',selected);
   button.setAttribute('aria-pressed',String(selected));
  });
  canvas.innerHTML='<div class="map-overlay-label"><span>ÉVORA / LOCAL '+String(index+1).padStart(2,'0')+
   '</span><strong>'+esc(e.name)+'</strong></div>'+mapHTML(e.location);
 }
 locations.querySelectorAll('[data-map-index]').forEach(b=>b.addEventListener('click',()=>{
   select(Number(b.dataset.mapIndex));
 }));
 select(0);
}
function loading(){el('events-list').innerHTML='<p class="loading">A consultar a agenda cultural…</p>';}
function loadError(e,serial){if(serial!==state.serial)return;setConnection(false);el('results-heading').textContent='Erro ao consultar a agenda';el('events-list').innerHTML='<p class="error-state">'+esc(e.message)+'</p>';toast(e.message,true);}
async function agents(){
 try{
  const data=await api('/agents');state.agents=Array.isArray(data.agents)?data.agents:[];
  const agEl=el('agent-count'),agN=state.agents.length;if(agN){agEl.setAttribute('data-count',String(agN));agEl.textContent=String(agN);}else{agEl.textContent='—';}
  for(const id of ['local-agent','agent-select']){
   const extra=id==='local-agent'?'<option value="">Todos os agentes</option>':'';
   el(id).innerHTML=extra+state.agents.map(a=>'<option value="'+esc(a.id)+'">'+esc(a.name)+'</option>').join('');
  }
 }catch(e){console.warn('Agents unavailable',e);el('agent-count').textContent='—';}
}
async function upcoming(){
 const serial=++state.serial;loading();state.mode='upcoming';state.search=null;
 try{
  const [data,paged]=await Promise.all([api('/events'),api('/events','POST',{page:1})]);
  if(serial!==state.serial)return;
  state.events=asList(data).slice(0,4);state.page=1;state.pages=1;state.total=Number(paged.total)||0;
  const allEl=el('all-count');if(state.total){allEl.setAttribute('data-count',String(state.total));allEl.textContent=String(state.total);}else{allEl.textContent='—';}setConnection(true);render();
 }catch(e){loadError(e,serial);}
}
async function catalog(page){
 const serial=++state.serial;state.mode='catalog';loading();
 try{
  const data=await api('/events','POST',{page:page||1});
  if(serial!==state.serial)return;
  state.events=asList(data);state.page=Number(data.page)||1;state.pages=Number(data.pages)||1;
  state.total=Number(data.total)||state.total;el('all-count').textContent=String(state.total||'—');
  setConnection(true);render();
 }catch(e){loadError(e,serial);}
}
async function search(page){
 const q=el('search-text').value.trim(),d=el('search-date').value;
 if(!q&&!d)return toast('Escreva um termo ou selecione uma data.',true);
 const serial=++state.serial;state.mode='search';state.search={q,d};loading();
 const body={page:page||1};if(q)body.q=q;if(d)body.d=d;
 try{
  const data=await api('/search','POST',body);
  if(serial!==state.serial)return;
  state.events=asList(data);state.page=Number(data.page)||1;state.pages=Number(data.pages)||1;
  setConnection(true);render();
 }catch(e){loadError(e,serial);}
}
function mapHTML(loc){
 const lat=Number(loc?.lat),lon=Number(loc?.lng);
 if(loc?.lat==null||loc?.lng==null||!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180)return '<p class="muted">Localização não disponível.</p>';
 const box=[lon-.006,lat-.003,lon+.006,lat+.003].join('%2C');
 const embed='https://www.openstreetmap.org/export/embed.html?bbox='+box+'&layer=mapnik&marker='+lat+'%2C'+lon;
 const link='https://www.openstreetmap.org/?mlat='+lat+'&mlon='+lon+'#map=16/'+lat+'/'+lon;
 return '<iframe class="map-frame" title="Localização do evento" src="'+esc(embed)+'" loading="lazy" referrerpolicy="no-referrer"></iframe><a class="text-action" target="_blank" rel="noopener noreferrer" href="'+esc(link)+'">Abrir mapa ↗</a>';
}
async function detail(id){
 if(!/^\d+$/.test(String(id)))return;
 showModal('event-modal');el('event-details').innerHTML='<p class="loading">A carregar evento…</p>';
 try{const data=await api('/events/'+encodeURIComponent(id));state.current=data.event||data;renderDetail(state.current);}
 catch(e){el('event-details').innerHTML='<p class="error-state">'+esc(e.message)+'</p>';}
}
function renderDetail(event){
 const comments=Array.isArray(event.comments)?event.comments:[];
 const agent=state.agents.find(a=>String(a.id)===String(event.agent_id));
 const mine=state.session?.role==='agent'&&String(state.session.agentId)===String(event.agent_id);
 const admin=state.session?.role==='admin';
 const logged=!!state.session;
 const validGPS=event.location?.lat!=null&&event.location?.lng!=null&&Number.isFinite(Number(event.location.lat))&&Number.isFinite(Number(event.location.lng));
 const coords=validGPS?Number(event.location.lat).toFixed(5)+'°, '+Number(event.location.lng).toFixed(5)+'°':'GPS por confirmar';
 const commentHTML=comments.map(c=>'<div class="comment"><strong>'+esc(c.author)+'</strong><p>'+esc(c.text)+'</p><small class="muted">'+esc(prettyDate(c.datetime))+'</small>'+(admin?'<button type="button" class="small-button danger-action" data-delete-comment="'+esc(c.id)+'">Eliminar</button>':'')+'</div>').join('')||'<p class="muted">Sem comentários.</p>';
 el('event-details').innerHTML='<p class="eyebrow">Cultura · Évora</p><h2 id="modal-event-title">'+esc(event.name)+'</h2><p>'+esc(event.description)+'</p>'+
 '<div class="modal-meta"><div><strong>Data e hora</strong>'+esc(prettyDate(event.datetime))+'</div><div><strong>Duração</strong>'+esc(duration(event.duration))+'</div><div><strong>Local</strong>'+esc(event.location?.address)+'<small class="geo-coords">'+esc(coords)+'</small></div><div><strong>Agente</strong>'+esc(agent?.name)+'</div></div>'+
 '<div class="modal-columns" style="margin-top:22px"><div class="modal-panel"><h3>No mapa</h3>'+mapHTML(event.location)+'</div>'+
 '<div class="modal-panel"><h3>Comentários</h3>'+commentHTML+
 (logged?'<form class="stack" id="comment-form"><label for="comment-text">A sua opinião</label><textarea id="comment-text" maxlength="1500" rows="3" required></textarea><button class="button button-maroon" type="submit">Publicar comentário</button></form>':'<p class="muted">Inicie sessão para comentar.</p>')+'</div></div>'+
 ((mine||admin)?'<div class="detail-actions">'+(mine?'<button class="button button-outline" type="button" id="edit-event">Editar evento</button>':'')+'<button class="button button-outline danger-action" type="button" id="delete-event">Eliminar evento</button></div>':'');
 el('comment-form')?.addEventListener('submit',e=>postComment(e,event.id));
 el('edit-event')?.addEventListener('click',()=>{hideModal('event-modal');management();fillEvent(event);el('gestao').scrollIntoView({behavior:'smooth'});});
 el('delete-event')?.addEventListener('click',()=>removeEvent(event.id));
}
function accountUpdate(){
 el('account-button').textContent=state.session?state.session.name+' · Sair':'Entrar ↗';
 const manager=state.session&&state.session.role!=='visitor';
 el('nav-management').hidden=!manager;el('gestao').hidden=!manager;
 el('feature-login').textContent=state.session?'Explorar eventos ↗':'Participar ↗';
}
function roleUpdate(){el('agent-identity').hidden=el('role-select').value!=='agent';}
function management(){
 const s=state.session;if(!s||s.role==='visitor'){el('gestao').hidden=true;return;}
 el('gestao').hidden=false;
 if(s.role==='admin'){
  el('management-content').innerHTML='<div class="manage-panel"><h3>Agentes culturais registados</h3><p class="muted">Como administrador pode remover eventos e comentários a partir do detalhe de cada evento.</p><ul class="list-small">'+state.agents.map(a=>'<li>'+esc(a.name)+'<small>ID '+esc(a.id)+'</small></li>').join('')+'</ul></div>';
  return;
 }
 const agent=state.agents.find(a=>String(a.id)===String(s.agentId));
 el('management-content').innerHTML='<div class="management-grid"><div class="manage-panel"><h3>Novo evento cultural</h3><p class="muted">A publicar como agente: <strong>'+esc(agent?.name)+'</strong>. Confirme os dados antes de enviar.</p>'+
 '<form id="event-form" class="manage-form"><input type="hidden" id="editing-id">'+
 '<label class="full">Nome<input id="manage-name" required minlength="3" maxlength="150"></label>'+
 '<label class="full">Morada<input id="manage-address" required maxlength="220"></label>'+
 '<label>Latitude<input id="manage-lat" type="number" step="any" min="-90" max="90" required value="38.572"></label>'+
 '<label>Longitude<input id="manage-lng" type="number" step="any" min="-180" max="180" required value="-7.908"></label>'+
 '<label>Data e hora<input id="manage-date" type="datetime-local" required></label>'+
 '<label>Duração (min)<input id="manage-duration" type="number" min="1" max="10080" required value="90"></label>'+
 '<label class="full">Descrição<textarea id="manage-description" maxlength="2000" required rows="3"></textarea></label>'+
 '<button class="button button-maroon" id="manage-submit" type="submit">Publicar evento</button></form></div>'+
 '<div class="manage-panel"><h3>Área do agente</h3><p>Utilizador: <strong>'+esc(s.name)+'</strong></p><p>Organização: <strong>'+esc(agent?.name)+'</strong></p><p class="muted">Só é possível editar ou eliminar eventos criados por este agente.</p></div></div>';
 el('event-form').addEventListener('submit',submitEvent);
}
function fillEvent(e){
 if(!state.session||state.session.role!=='agent')return;
 const fields={name:e.name,address:e.location?.address,lat:e.location?.lat,lng:e.location?.lng,duration:e.duration,description:e.description};
 for(const [key,val] of Object.entries(fields))el('manage-'+key).value=val??'';
 const dt=String(e.datetime||'').replace(' ','T').slice(0,16);el('manage-date').value=dt;
 el('editing-id').value=String(e.id);el('manage-submit').textContent='Guardar alterações';
}
function eventWriteFeedback(payload,created){
 const code=(typeof payload==='string'||typeof payload==='number')?payload:
   payload?.registration_code??payload?.code??payload?.codigo??payload?.eventCode??payload?.event?.id??payload?.event_id??payload?.id;
 if(created&&code!==undefined&&code!==null&&String(code).trim())
   return 'Evento registado. Código de registo: '+String(code);
 const message=payload?.message??payload?.mensagem;
 if(typeof message==='string'&&message.trim())return message;
 return created?'Evento registado com sucesso.':'Alterações guardadas.';
}
async function submitEvent(event){
 event.preventDefault();
 const s=state.session;if(!s||s.role!=='agent')return;
 const id=el('editing-id').value;
 const body={name:el('manage-name').value.trim(),location:{address:el('manage-address').value.trim(),lat:Number(el('manage-lat').value),lng:Number(el('manage-lng').value)},datetime:el('manage-date').value,duration:Number(el('manage-duration').value),description:el('manage-description').value.trim(),agent_id:Number(s.agentId)};
 if(!body.name||!body.description||!body.location.address)return toast('Preencha os campos obrigatórios.',true);
 if(!confirm((id?'Editar':'Publicar')+' este evento?'))return;
 try{
  const result=await api(id?'/events/'+encodeURIComponent(id):'/newevent','POST',body);
  toast(eventWriteFeedback(result,!id));event.target.reset();el('editing-id').value='';el('manage-submit').textContent='Publicar evento';await upcoming();
 }catch(e){toast('Não foi possível concluir: '+e.message,true);}
}
async function postComment(event,id){
 event.preventDefault();const s=state.session;
 if(!s)return toast('Inicie sessão.',true);
 const text=el('comment-text').value.trim();if(!text)return;
 if(!confirm('Publicar este comentário?'))return;
 try{await api('/newcomment','POST',{event_id:id,author:s.name,text});toast('Comentário publicado.');await detail(String(id));}
 catch(e){toast('Comentário não publicado: '+e.message,true);}
}
async function removeEvent(id){
 const s=state.session,e=state.current;
 const permitted=s?.role==='admin'||(s?.role==='agent'&&e&&String(s.agentId)===String(e.agent_id)&&String(e.id)===String(id));
 if(!permitted)return toast('Sem permissão para eliminar este evento.',true);
 if(!confirm('Eliminar este evento? Esta ação não pode ser revertida.'))return;
 try{await api('/deleteevent','POST',{id});hideModal('event-modal');toast('Evento eliminado.');await upcoming();}
 catch(e){toast('Não foi possível eliminar: '+e.message,true);}
}
async function deleteComment(id){
 if(state.session?.role!=='admin')return toast('Operação reservada ao administrador.',true);
 if(!confirm('Eliminar este comentário?'))return;
 try{await api('/deletecomment','POST',{event_id:state.current.id,comment_id:id});toast('Comentário eliminado.');await detail(String(state.current.id));}
 catch(e){toast('Não foi possível eliminar: '+e.message,true);}
}
function bind(){
 el('search-form').addEventListener('submit',e=>{e.preventDefault();search(1);});
 el('reset-search').addEventListener('click',()=>{el('search-form').reset();el('local-agent').value='';el('local-order').value='date';upcoming();});
 el('local-agent').addEventListener('change',render);el('local-order').addEventListener('change',render);
 el('catalog-button').addEventListener('click',()=>catalog(1));
 el('reload-button').addEventListener('click',()=>{if(state.mode==='search')search(state.page);else if(state.mode==='catalog')catalog(state.page);else upcoming();});
 el('prev-page').addEventListener('click',()=>{if(state.page<=1)return;if(state.mode==='search')search(state.page-1);else catalog(state.page-1);});
 el('next-page').addEventListener('click',()=>{if(state.page>=state.pages)return;if(state.mode==='search')search(state.page+1);else catalog(state.page+1);});
 el('events-list').addEventListener('click',e=>{const b=e.target.closest('[data-detail]');if(b)detail(b.dataset.detail);});
 el('event-details').addEventListener('click',e=>{const b=e.target.closest('[data-delete-comment]');if(b)deleteComment(b.dataset.deleteComment);});
 el('account-button').addEventListener('click',()=>{if(state.session){state.session=null;accountUpdate();toast('Sessão terminada.');return;}showModal('auth-modal');});
 el('feature-login').addEventListener('click',()=>state.session?el('eventos').scrollIntoView({behavior:'smooth'}):showModal('auth-modal'));
 el('role-select').addEventListener('change',roleUpdate);
 el('auth-form').addEventListener('submit',e=>{e.preventDefault();const role=el('role-select').value,name=el('demo-name').value.trim(),agentId=role==='agent'?el('agent-select').value:null;if(!name)return;if(role==='agent'&&!agentId)return toast('Selecione o agente.',true);state.session={role,name,agentId};hideModal('auth-modal');accountUpdate();management();toast('Bem-vindo, '+name+'!');});
 for(const id of ['auth-modal','event-modal'])el(id).addEventListener('click',e=>{if(e.target===el(id))hideModal(id);});
 el('auth-close').addEventListener('click',()=>hideModal('auth-modal'));el('event-close').addEventListener('click',()=>hideModal('event-modal'));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')for(const id of ['auth-modal','event-modal'])if(!el(id).hidden)hideModal(id);});
}
document.addEventListener('DOMContentLoaded',()=>{bind();accountUpdate();roleUpdate();Promise.all([agents(),upcoming()]);});


document.addEventListener('DOMContentLoaded', () => {
  const bar = document.getElementById('scroll-progress');
  const up = document.getElementById('back-to-top');
  const theme = document.getElementById('theme-button');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let previousFrame = 0;
  const heroImg = document.querySelector('.hero-photo img');
  function updateScroll() {
    previousFrame = 0;
    const length = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = Math.min(1, Math.max(0, window.scrollY / length));
    if (bar) bar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
    if (up) up.classList.toggle('is-visible', window.scrollY > 600);
    if (heroImg && !reduceMotion) {
      heroImg.style.transform = 'translateY(' + (window.scrollY * 0.4).toFixed(1) + 'px) scale(1.08)';
    }
  }
  window.addEventListener('scroll', () => {
    if (!previousFrame) previousFrame = window.requestAnimationFrame(updateScroll);
  }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  up?.addEventListener('click', () => window.scrollTo({
    top: 0, behavior: reduceMotion ? 'instant' : 'smooth'
  }));

  function setNight(enabled) {
    document.body.classList.toggle('night-mode', enabled);
    if (theme) {
      theme.setAttribute('aria-pressed', String(enabled));
      theme.setAttribute('aria-label', enabled ? 'Alternar para modo diurno' : 'Alternar para modo noturno');
      theme.title = enabled ? 'Vista diurna' : 'Vista noturna';
      theme.innerHTML = enabled ? '☼ <span>Dia</span>' : '◐ <span>Vista</span>';
    }
  }
  try { setNight(localStorage.getItem('explorar-evora-night-mode') === 'true'); }
  catch (_) { setNight(false); }
  theme?.addEventListener('click', () => {
    const enabled = !document.body.classList.contains('night-mode');
    setNight(enabled);
    try { localStorage.setItem('explorar-evora-night-mode', String(enabled)); }
    catch (_) {}
  });

  if (window.matchMedia('(pointer:fine)').matches) {
    document.getElementById('events-list')?.addEventListener('pointermove', e => {
      const card = e.target.closest('.event-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', ((e.clientX-r.left)/r.width*100).toFixed(1));
      card.style.setProperty('--pointer-y', ((e.clientY-r.top)/r.height*100).toFixed(1));
    }, { passive: true });
  }

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

  function animateCounter(el, target) {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) { el.textContent = target; return; }
    let current = 0;
    const duration = 1100, interval = 18;
    const steps = Math.ceil(duration / interval);
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.round(target * (1 - Math.pow(1 - step / steps, 3)));
      el.textContent = current;
      if (step >= steps) { el.textContent = target; clearInterval(timer); }
    }, interval);
  }

  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.getAttribute('data-count');
      if (raw) { animateCounter(el, Number(raw)); statObs.unobserve(el); }
    });
  }, { threshold: 0.5 });
  ['all-count','agent-count'].forEach(id => {
    const el = document.getElementById(id);
    if (el) statObs.observe(el);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.topbar');
  const button = document.getElementById('menu-button');
  const nav = document.getElementById('main-navigation');
  if (!header || !button || !nav) return;
  function closeMenu() {
    header.classList.remove('menu-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Abrir menu de navegação');
    button.title = 'Menu';
  }
  button.addEventListener('click', () => {
    const open = !header.classList.contains('menu-open');
    header.classList.toggle('menu-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    button.title = open ? 'Fechar menu' : 'Menu';
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) closeMenu();
  }, { passive: true });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) closeMenu();
  });
});
