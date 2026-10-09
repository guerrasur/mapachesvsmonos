import {drawScene,drawCreature,loadArt} from './render.js?v=0.3.0';
import {CREATURES,FACTIONS} from './data.js?v=0.3.0';

const VERSION='0.3.0', KEY='mapachesvsmonos-save-v1', WAIT_MS=10000;
const $=s=>document.querySelector(s), buttons=[...document.querySelectorAll('[data-bush]')];
let storageOK=true,busy=false,pendingVersion=null,checking=false,updating=false,choosingFaction=false,lastStage='';

function newRound(faction){
  const options=[...FACTIONS[faction].ids,null];
  for(let i=2;i>0;i--){const j=Math.floor(Math.random()*(i+1));[options[i],options[j]]=[options[j],options[i]];}
  return {options,chosen:null,startedAt:null,readyAt:null};
}
function fresh(){return {schema:2,faction:null,counts:Object.fromEntries(CREATURES.map(c=>[c.id,0])),attempts:0,round:null};}
function validCount(n){return Number.isSafeInteger(n)&&n>=0;}
function validRound(round,faction){
  if(!round||!Array.isArray(round.options)||round.options.length!==3)return false;
  if(![...FACTIONS[faction].ids,null].every(id=>round.options.includes(id)))return false;
  if(round.chosen!==null&&![0,1,2].includes(round.chosen))return false;
  const idle=round.startedAt===null&&round.readyAt===null;
  const timed=Number.isSafeInteger(round.startedAt)&&round.startedAt>=0&&Number.isSafeInteger(round.readyAt)&&round.readyAt-round.startedAt===WAIT_MS;
  return (idle||timed)&&(round.chosen===null||timed);
}
function load(){
  try{
    const raw=localStorage.getItem(KEY);if(!raw)return fresh();
    const s=JSON.parse(raw);
    // Preserve v0.1/v0.2 captures and the already-shuffled search when moving to two factions.
    if(s?.schema===1&&s.counts&&['rad','spore'].every(id=>validCount(s.counts[id]))&&validCount(s.attempts)){
      const migrated=fresh();migrated.faction='raccoon';migrated.counts.rad=s.counts.rad;migrated.counts.spore=s.counts.spore;migrated.attempts=s.attempts;
      const startedAt=Date.now()-WAIT_MS,round={...s.round,startedAt,readyAt:startedAt+WAIT_MS};
      migrated.round=validRound(round,'raccoon')?round:newRound('raccoon');return migrated;
    }
    if(s?.schema===2&&s.counts&&CREATURES.every(c=>validCount(s.counts[c.id]))&&validCount(s.attempts)){
      if(s.faction===null&&s.round===null)return s;
      if(FACTIONS[s.faction]&&validRound(s.round,s.faction))return s;
    }
  }catch{storageOK=false;}
  return fresh();
}
const state=load();
function save(){
  try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;}catch{storageOK=false;}
  $('#save-status').hidden=storageOK;
  $('#save-status').textContent='El navegador no permite guardar. Esta sesión sigue siendo jugable.';
}
function stage(){
  if(!state.faction)return 'faction';
  if(state.round.chosen!==null)return busy?'revealing':'result';
  if(state.round.readyAt===null)return 'idle';
  return Date.now()<state.round.readyAt?'waiting':'ready';
}
function renderCards(){
  const cards=$('#cards');cards.replaceChildren();
  for(const cr of CREATURES){
    const count=state.counts[cr.id],card=document.createElement('article');card.className=`creature-card${count?'':' locked'}`;
    const canvas=document.createElement('canvas');canvas.width=canvas.height=96;canvas.setAttribute('aria-hidden','true');drawCreature(canvas,cr.id,!count);
    const title=document.createElement('h3'),detail=document.createElement('p'),mutation=document.createElement('p');
    mutation.className='mutation';mutation.textContent=count?cr.mutation:'SIN REGISTRO';
    title.textContent=count?cr.name:'???';detail.textContent=count?`${count} ${count===1?'captura':'capturas'}`:'Sin descubrir';
    card.append(canvas,mutation,title,detail);if(count)card.title=cr.lore;cards.append(card);
  }
  $('#collection-count').textContent=`${CREATURES.filter(c=>state.counts[c.id]).length} / ${CREATURES.length}`;
}
function draw(time=0){
  if(!state.faction||choosingFaction)return;
  const round=state.round;
  drawScene($('#scene'),{faction:state.faction,chosen:round.chosen,outcome:round.chosen===null?null:round.options[round.chosen],phase:stage(),time});
}
function render(){
  const showFactions=!state.faction||choosingFaction;
  $('#factions').hidden=!showFactions;$('#game').hidden=showFactions;$('#cancel-faction').hidden=!state.faction;
  if(showFactions){lastStage='faction';return;}
  const faction=FACTIONS[state.faction],current=stage(),round=state.round,outcome=round.chosen===null?null:round.options[round.chosen];
  $('#faction-name').textContent=`BANDO ${faction.name}`;$('#zone-name').textContent=faction.zone;
  $('#choices').setAttribute('aria-label',`Elegí un ${faction.hiding}`);$('#choices').hidden=current!=='ready';
  buttons.forEach((button,i)=>{button.disabled=current!=='ready';button.setAttribute('aria-label',`Buscar en el ${faction.hiding} ${i+1}`);});
  $('#bait').hidden=current!=='idle';$('#bait').replaceChildren(document.createTextNode(`Dejar ${faction.bait} `));
  const plus=document.createElement('span');plus.setAttribute('aria-hidden','true');plus.textContent='+';$('#bait').append(plus);
  $('#next').hidden=current!=='result';$('#wait-progress').hidden=current!=='waiting';
  $('#encounter-tag').hidden=current!=='result'||!outcome;
  const messages={
    idle:['PREPARÁ LA BÚSQUEDA','Dejá una carnada.','Los mutantes salen cuando baja el ruido.','SIN CARNADA'],
    waiting:['CARNADA COLOCADA','Algo puede acercarse…','Podés salir. La espera sigue.','ESPERANDO'],
    ready:['SE DETECTÓ MOVIMIENTO',`Elegí un ${faction.hiding}.`,'Una elección. También puede no haber nada.','REVISAR'],
    revealing:['SIGUIENDO EL RASTRO','Buscando…','Escuchá las ramas.','RASTREANDO']
  };
  let message=messages[current];
  if(current==='result'){
    const creature=CREATURES.find(c=>c.id===outcome);
    message=creature?['CAPTURA REGISTRADA',creature.name,creature.lore,'CAPTURADO']:['RASTRO PERDIDO','No había nada.','La carnada desapareció. Probá otra vez.','SIN HALLAZGO'];
    if(creature)$('#mutation-tag').textContent=creature.mutation;
  }
  [$('#result-label'),$('#result-title'),$('#result-detail'),$('#scene-state')].forEach((element,i)=>{element.textContent=message[i];});
  lastStage=current;draw();renderCards();tick();
}
function tick(){
  if(!state.faction||choosingFaction||busy)return;
  const current=stage();if(current!==lastStage){render();return;}
  if(current==='waiting'){
    const left=Math.max(0,state.round.readyAt-Date.now()),progress=Math.max(0,Math.min(100,100-left/WAIT_MS*100));
    const countdown=`Revisá en ${Math.ceil(left/1000)} s`;if($('#result-title').textContent!==countdown)$('#result-title').textContent=countdown;
    $('#wait-progress').setAttribute('aria-valuenow',Math.round(progress));$('#wait-progress span').style.width=`${progress}%`;
  }
}
function chooseFaction(faction){
  if(busy||updating||!FACTIONS[faction])return;
  if(state.faction!==faction){state.faction=faction;state.round=newRound(faction);save();}
  choosingFaction=false;render();($('#bait').hidden?$('#change-faction'):$('#bait')).focus({preventScroll:true});
}
async function choose(index){
  if(busy||updating||choosingFaction||stage()!=='ready')return;
  busy=true;state.round.chosen=index;state.attempts++;
  const outcome=state.round.options[index];if(outcome)state.counts[outcome]++;
  // Commit before animation, so a refresh cannot reroll or award the same capture twice.
  save();render();
  const start=performance.now(),duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:780;
  await new Promise(resolve=>{function frame(now){if(now-start<duration){draw(now);requestAnimationFrame(frame);}else resolve();}requestAnimationFrame(frame);});
  busy=false;render();$('#next').focus({preventScroll:true});if(pendingVersion)applyUpdate(pendingVersion);
}
buttons.forEach((button,i)=>button.addEventListener('click',()=>choose(i)));
document.querySelectorAll('[data-faction]').forEach(button=>button.addEventListener('click',()=>chooseFaction(button.dataset.faction)));
$('#change-faction').addEventListener('click',()=>{if(busy||updating)return;choosingFaction=true;render();document.querySelector(`[data-faction="${state.faction}"]`).focus({preventScroll:true});});
$('#cancel-faction').addEventListener('click',()=>{choosingFaction=false;render();$('#change-faction').focus({preventScroll:true});});
$('#bait').addEventListener('click',()=>{if(busy||updating||stage()!=='idle')return;const now=Date.now();state.round.startedAt=now;state.round.readyAt=now+WAIT_MS;save();render();});
$('#next').addEventListener('click',()=>{if(busy||updating||stage()!=='result')return;state.round=newRound(state.faction);save();render();$('#bait').focus({preventScroll:true});});
function status(text){$('#update-status').textContent=text;$('#update-status').hidden=false;}
async function applyUpdate(version){
  if(updating)return;if(busy){pendingVersion=version;return;}updating=true;save();status('Actualizando… Tus capturas están guardadas.');
  try{sessionStorage.setItem('mvm-update-attempt',JSON.stringify({version,at:Date.now()}));}catch{}
  const url=new URL(location.href);url.searchParams.set('_v',version);url.searchParams.set('_t',Date.now());location.replace(url.href);
}
async function checkUpdate(manual=false){
  if(checking||updating)return;
  if(!navigator.onLine){if(manual)status('Sin conexión. Podés seguir jugando en esta sesión.');return;}
  checking=true;
  try{
    const response=await fetch(`./version.json?_=${Date.now()}`,{cache:'no-store'});if(!response.ok)throw new Error('version');
    const data=await response.json();if(!/^\d+\.\d+\.\d+$/.test(data.version))throw new Error('version');
    if(data.version!==VERSION){
      let attempted=null;try{attempted=JSON.parse(sessionStorage.getItem('mvm-update-attempt'));}catch{}
      if(attempted?.version===data.version&&Date.now()-attempted.at<45000&&!manual){status('La nueva versión se está publicando. Se volverá a comprobar.');return;}
      if(manual){try{sessionStorage.removeItem('mvm-update-attempt');}catch{}}applyUpdate(data.version);
    }else{
      try{sessionStorage.removeItem('mvm-update-attempt');}catch{}
      if(manual){status(`v${VERSION}: ya está actualizado.`);setTimeout(()=>{$('#update-status').hidden=true;},2500);}
    }
  }catch{if(manual)status('No se pudo comprobar la actualización. Podés seguir jugando.');}
  finally{checking=false;}
}
$('#version').textContent=`v${VERSION}`;$('#update').addEventListener('click',()=>checkUpdate(true));
window.addEventListener('focus',()=>{tick();checkUpdate();});window.addEventListener('online',()=>checkUpdate());
document.addEventListener('visibilitychange',()=>{if(!document.hidden){tick();checkUpdate();}});
setInterval(tick,250);setInterval(()=>checkUpdate(),60000);
document.querySelectorAll('[data-portrait]').forEach(canvas=>drawCreature(canvas,canvas.dataset.portrait));
save();render();loadArt().then(()=>draw());checkUpdate();
