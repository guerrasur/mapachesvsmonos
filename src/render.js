// Original creature sprites, rendered one pixel at a time.
// Backdrops use the art supplied for this project; gameplay silhouettes are code-native.
const C={ink:'#020426',edge:'#0f0840',deep:'#054d53',shade:'#097373',leaf:'#16866b',green:'#27b887',lime:'#d3d93b',light:'#27f2b9',grass:'#093f49',grassLight:'#177569',grassDark:'#052c36',soil:'#536155',soilDark:'#293b49',soilLight:'#6b7f60',cream:'#9fcd9a',fur:'#168d87',silver:'#27f2b9',furShade:'#097373',furDeep:'#054c61',mask:'#0f0840',eye:'#d3d93b',white:'#d8ffcb',purple:'#a2237e',purpleShade:'#531d66',mushroom:'#a2237e',pink:'#ee55b3',blue:'#12739b'};
function r(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)}
function poly(c,pts,color){const min=Math.ceil(Math.min(...pts.map(p=>p[1]))),max=Math.floor(Math.max(...pts.map(p=>p[1])));for(let y=min;y<max;y++){const cuts=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];if((a[1]<=y&&b[1]>y)||(b[1]<=y&&a[1]>y))cuts.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]))}cuts.sort((a,b)=>a-b);for(let i=0;i<cuts.length;i+=2)r(c,Math.ceil(cuts[i]),y,Math.floor(cuts[i+1])-Math.ceil(cuts[i])+1,1,color)}}
function oval(c,x,y,rx,ry,color){for(let yy=-ry;yy<=ry;yy++){const w=Math.floor(rx*Math.sqrt(Math.max(0,1-(yy*yy)/(ry*ry))));r(c,x-w,y+yy,2*w+1,1,color)}}
function fur(c,color){[[19,30],[65,34],[27,48],[56,48],[29,64],[54,69],[39,73],[26,38],[59,36],[37,24]].forEach(([x,y],i)=>{r(c,x,y,2,1,color);if(i%2)r(c,x+1,y+1,2,1,color)})}
function raccoon(c,type){
 const spore=type==='spore',f=spore?C.purple:C.fur,fs=spore?C.purpleShade:C.furShade;
 // Large curled tail, with six individually shaped bands.
 poly(c,[[55,76],[64,65],[64,47],[70,32],[78,25],[86,30],[90,43],[88,64],[81,79],[67,87],[56,84]],C.ink);
 poly(c,[[59,76],[67,64],[67,48],[73,34],[78,29],[83,32],[86,45],[84,64],[77,77],[66,82],[59,81]],f);
 poly(c,[[73,35],[76,30],[81,31],[85,40],[82,44],[70,40]],C.mask);
 poly(c,[[67,48],[68,43],[85,47],[85,54],[67,54]],C.mask);
 poly(c,[[66,62],[67,57],[84,59],[82,65],[78,69]],C.mask);
 poly(c,[[60,75],[64,68],[77,73],[73,78],[67,80]],C.mask);
 r(c,82,35,2,5,C.silver);r(c,82,50,2,5,C.silver);r(c,76,69,2,3,C.silver);
 // Feet and body.
 poly(c,[[24,78],[32,73],[40,76],[38,87],[20,87],[19,83]],C.ink);poly(c,[[46,76],[56,75],[60,84],[57,87],[43,87],[42,83]],C.ink);
 r(c,24,81,12,4,fs);r(c,46,81,10,4,fs);r(c,23,84,3,1,C.silver);r(c,28,84,3,1,C.silver);r(c,47,84,3,1,C.silver);
 oval(c,40,65,23,19,C.ink);oval(c,40,64,20,17,fs);oval(c,38,62,17,15,f);oval(c,40,67,12,13,C.silver);oval(c,40,65,10,11,C.cream);
 poly(c,[[19,51],[26,52],[27,63],[24,72],[15,69],[13,64]],C.ink);poly(c,[[20,55],[24,57],[24,65],[21,69],[16,66]],f);
 poly(c,[[55,51],[62,53],[67,65],[62,71],[54,69],[51,62]],C.ink);poly(c,[[57,55],[61,57],[64,64],[61,68],[56,66]],f);
 r(c,15,65,9,3,C.mask);r(c,56,65,9,3,C.mask);r(c,18,65,1,3,C.cream);r(c,21,65,1,3,C.cream);r(c,58,65,1,3,C.cream);r(c,61,65,1,3,C.cream);
 // Pointed ears and shaggy head.
 poly(c,[[16,27],[13,8],[18,7],[31,18],[50,18],[61,8],[67,11],[65,30]],C.ink);
 poly(c,[[18,25],[17,12],[20,12],[30,22]],f);poly(c,[[53,22],[61,13],[64,13],[61,28]],f);
 poly(c,[[20,21],[19,14],[26,20]],C.pink);poly(c,[[57,22],[61,16],[62,24]],C.pink);
 poly(c,[[20,21],[27,16],[36,18],[40,15],[48,18],[56,18],[64,25],[68,34],[66,41],[70,43],[62,49],[63,53],[54,55],[48,60],[33,60],[26,56],[18,53],[19,48],[12,43],[16,39],[14,31]],C.ink);
 poly(c,[[21,24],[29,20],[36,22],[40,19],[48,22],[55,21],[61,27],[64,34],[61,41],[65,44],[57,47],[58,51],[51,51],[47,56],[34,56],[27,52],[22,51],[23,46],[17,43],[21,38],[18,32]],fs);
 poly(c,[[22,26],[29,23],[39,24],[40,21],[49,25],[55,24],[59,30],[60,38],[55,43],[51,49],[44,54],[33,52],[25,46],[22,38],[20,32]],f);
 // Brow and pale cheeks around the characteristic mask.
 poly(c,[[24,28],[32,26],[40,30],[49,27],[57,29],[55,32],[48,32],[41,35],[32,32],[24,33]],C.silver);
 poly(c,[[20,35],[28,33],[37,35],[40,40],[33,45],[24,42],[18,39]],C.mask);
 poly(c,[[43,35],[51,32],[62,34],[64,38],[58,43],[47,45],[41,40]],C.mask);
 r(c,24,36,8,5,C.ink);r(c,49,35,8,5,C.ink);r(c,25,37,6,2,spore?C.pink:C.eye);r(c,50,36,6,2,spore?C.pink:C.eye);r(c,28,36,2,3,C.ink);r(c,52,35,2,3,C.ink);r(c,25,36,1,1,C.white);r(c,50,35,1,1,C.white);
 poly(c,[[32,39],[40,35],[47,39],[53,46],[49,52],[40,55],[30,50],[28,44]],C.cream);poly(c,[[36,40],[45,40],[47,43],[42,47],[37,45],[34,43]],C.ink);r(c,37,41,6,1,C.furDeep);r(c,40,47,1,3,C.ink);r(c,35,50,2,3,C.eye);r(c,45,50,2,3,C.eye);r(c,35,49,5,1,C.furShade);r(c,42,49,6,1,C.furShade);
 r(c,25,44,5,1,C.silver);r(c,53,43,5,1,C.silver);r(c,23,46,5,1,C.furDeep);r(c,54,46,5,1,C.furDeep);fur(c,C.silver);
 if(spore){
  // A full mushroom cap, small shoulder fungi and spores: a distinct silhouette.
  poly(c,[[23,19],[25,13],[30,9],[35,6],[48,5],[57,9],[62,16],[66,20],[63,24],[22,24],[19,21]],C.ink);
  poly(c,[[23,20],[27,14],[32,11],[37,8],[48,8],[55,11],[59,17],[62,21]],C.mushroom);
  r(c,26,21,34,2,C.pink);r(c,32,12,5,3,C.cream);r(c,47,10,4,2,C.cream);r(c,53,17,5,3,C.cream);r(c,28,17,3,2,C.pink);r(c,41,16,3,3,C.pink);r(c,38,23,9,3,C.cream);
  r(c,59,55,3,7,C.cream);poly(c,[[55,55],[57,51],[63,50],[67,54],[66,57],[54,57]],C.ink);r(c,57,53,8,3,C.mushroom);r(c,59,53,2,1,C.cream);
  r(c,73,74,3,5,C.cream);r(c,70,72,8,3,C.mushroom);r(c,72,71,4,1,C.pink);
  [[11,22],[77,14],[7,50],[78,57]].forEach(([x,y])=>{r(c,x,y,2,2,C.cream);r(c,x-1,y+1,4,1,C.cream)});
 }else{
  // Crystal growths and a salvaged collar.
  poly(c,[[15,54],[8,45],[9,39],[14,43],[19,53]],C.ink);poly(c,[[15,52],[11,44],[11,42],[14,46]],C.eye);
  poly(c,[[65,61],[73,52],[77,52],[72,63]],C.ink);poly(c,[[67,60],[74,54],[72,59]],C.eye);
  r(c,27,56,27,4,C.mask);r(c,36,56,8,4,C.soilDark);r(c,38,57,4,2,C.eye);
  poly(c,[[37,70],[39,65],[41,68],[43,65],[45,70],[43,74],[39,74]],C.green);r(c,40,69,3,3,C.eye);
 }
}

function monkey(c,type){
 const thorn=type==='thorn',base=thorn?'#1b9168':'#126b87',shade=thorn?'#084f4d':'#183650',light=thorn?C.green:C.light,face=thorn?'#bfcc64':'#77bcb1',accent=thorn?C.lime:C.pink;
 // A wiry silhouette, a long tail and outsized arms, rather than a round mascot.
 poly(c,[[60,74],[74,77],[83,68],[83,53],[77,48],[71,50],[71,58],[76,58],[76,64],[70,68],[58,64]],C.ink);
 poly(c,[[63,73],[73,72],[79,66],[79,54],[75,52],[74,54],[76,59],[75,65],[70,69],[61,68]],base);
 r(c,76,54,2,6,light);r(c,71,70,5,2,light);
 poly(c,[[31,68],[44,65],[48,73],[45,89],[28,90],[25,86]],C.ink);
 poly(c,[[48,67],[61,65],[66,80],[75,85],[73,90],[53,90],[48,80]],C.ink);
 poly(c,[[34,70],[41,70],[42,77],[38,86],[29,86]],shade);
 poly(c,[[53,70],[59,69],[62,81],[69,86],[56,86],[52,78]],base);
 r(c,29,86,14,2,base);r(c,58,87,13,1,light);[30,35,40,58,63,68].forEach(x=>r(c,x,86,2,3,face));
 poly(c,[[29,42],[44,36],[61,40],[68,55],[63,72],[55,78],[40,78],[28,70],[23,56]],C.ink);
 poly(c,[[32,44],[44,40],[59,44],[62,56],[59,69],[52,73],[42,73],[31,67],[28,55]],shade);
 poly(c,[[32,46],[44,43],[48,48],[46,69],[39,70],[32,63],[29,54]],base);
 poly(c,[[44,47],[55,46],[59,57],[54,69],[44,70],[40,64]],face);
 r(c,43,54,11,2,shade);r(c,45,64,6,2,shade);
 // Long forearms end in articulated hands.
 poly(c,[[28,42],[19,44],[11,58],[8,77],[13,84],[25,80],[27,73],[25,59],[33,52]],C.ink);
 poly(c,[[23,46],[18,49],[15,60],[13,74],[17,79],[22,76],[22, 60],[28,50]],base);
 poly(c,[[61,42],[73,45],[80,57],[84,73],[82,82],[69,83],[65,75],[66,61],[59,52]],C.ink);
 poly(c,[[66,46],[71,48],[76,59],[80,74],[77,79],[70,78],[69,60],[63,52]],base);
 r(c,14,64,3,10,light);r(c,75,62,2,11,light);[14,18,22,70,74,78].forEach(x=>r(c,x,76,2,5,face));
 // Ears, angular muzzle, fur ridge and luminous slit eyes.
 oval(c,26,29,8,11,C.ink);oval(c,26,29,5,8,face);oval(c,63,28,9,11,C.ink);oval(c,63,28,5,8,face);
 poly(c,[[30,18],[31,11],[35,9],[36,5],[44,9],[46,3],[52,9],[59,9],[60,16],[65,24],[62,38],[56,46],[40,48],[30,39],[26,27]],C.ink);
 poly(c,[[34,18],[35,13],[43,15],[47,9],[51,15],[57,14],[60,24],[58,36],[54,42],[41,43],[33,36],[30,27]],base);
 poly(c,[[33,26],[39,22],[44,25],[48,24],[56,21],[60,28],[56,34],[52,38],[39,39],[32,34]],face);
 poly(c,[[33,25],[39,24],[44,28],[43,31],[35,30]],C.ink);poly(c,[[48,27],[56,23],[59,25],[57,30],[49,31]],C.ink);
 r(c,35,27,6,2,accent);r(c,50,27,6,2,accent);r(c,38,27,1,2,C.ink);r(c,52,27,1,2,C.ink);
 poly(c,[[41,31],[49,30],[53,33],[53,39],[49,43],[42,43],[37,38],[38,34]],face);
 r(c,42,34,8,2,C.ink);r(c,40,39,13,2,shade);r(c,42,39,2,3,C.white);r(c,49,39,2,3,C.white);
 [[32,20],[56,16],[31,52],[64,58],[36,69],[59,77],[19,60]].forEach(([x,y])=>{r(c,x,y,3,1,light);r(c,x+1,y+1,3,1,light);});
 if(thorn){
  // Branches and thorns alter the outline, not just the color.
  poly(c,[[30,18],[21,14],[18,5],[22,7],[26,12],[31,12],[35,17]],C.ink);
  poly(c,[[30,16],[24,12],[22,9],[26,14],[32,14]],light);
  poly(c,[[57,17],[64,10],[68,3],[69,10],[76,11],[70,15],[63,19]],C.ink);
  poly(c,[[61,15],[66,11],[68,8],[67,13],[72,13],[63,17]],light);
  [[14,55],[77,53],[27,69],[64,67]].forEach(([x,y],i)=>poly(c,[[x,y+5],[x-7,y-6],[x+2,y],[x+5,y-4],[x+4,y+7]],i%2?C.lime:C.green));
  poly(c,[[29,45],[34,43],[38,49],[45,52],[55,49],[59,43],[63,46],[58,55],[46,59],[36,54]],C.ink);
  poly(c,[[32,46],[38,51],[46,55],[55,51],[60,46],[56,54],[46,57],[37,52]],C.green);
  r(c,49,60,3,4,C.pink);r(c,48,61,5,2,C.pink);
 }else{
  // Salvaged wiring and a broken electrical insulator.
  poly(c,[[52,15],[56,6],[59,5],[61,9],[58,17]],C.ink);r(c,55,7,4,2,C.lime);r(c,54,10,5,2,C.light);r(c,54,13,4,2,C.lime);
  r(c,32,44,29,4,C.ink);r(c,42,43,11,7,'#496575');r(c,45,44,5,4,C.lime);r(c,48,44,2,2,C.white);
  poly(c,[[29,49],[34,54],[34,63],[41,66],[42,71],[37,69],[30,63],[30,55],[26,52]],C.pink);
  [[8,29],[82,25],[6,59]].forEach(([x,y])=>{poly(c,[[x,y],[x+4,y-7],[x+3,y-1],[x+7,y-2],[x+2,y+7],[x+3,y+1]],C.lime);});
 }
}

export function drawCreature(canvas,type,locked=false){
 const c=canvas.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);c.imageSmoothingEnabled=false;
 if(type==='volt'||type==='thorn')monkey(c,type);else raccoon(c,type);
 if(locked){const data=c.getImageData(0,0,96,96);for(let i=0;i<data.data.length;i+=4)if(data.data[i+3]){data.data[i]=46;data.data[i+1]=62;data.data[i+2]=79;}c.putImageData(data,0,0);}
}
const art={};
export function loadArt(){
 return Promise.all(['night-city','world'].map(name=>new Promise(resolve=>{
  const img=new Image();img.onload=()=>{art[name]=img;resolve();};img.onerror=()=>resolve();img.src=new URL(`../assets/${name}.jpg?v=0.3.0`,import.meta.url).href;
 })));
}
function fallback(c,faction){
 r(c,0,0,384,296,C.ink);oval(c,238,66,35,35,C.light);
 for(let i=0;i<11;i++){const x=i*39-10,h=40+(i*23)%65;r(c,x,155-h,32,h,C.edge);for(let y=166-h;y<151;y+=9)for(let dx=4;dx<30;dx+=9)if((dx+y+i)%4<2)r(c,x+dx,y,2,3,C.lime);}
 r(c,0,156,384,140,C.grassDark);
 if(faction==='monkey'){for(let x=0;x<384;x+=41)r(c,x,115,5,100,C.deep);}
 for(let i=0;i<90;i++)r(c,(i*71)%384,180+(i*29)%115,3,1,i%3===0?C.leaf:C.deep);
}
function backdrop(c,faction){
 const img=art[faction==='monkey'?'world':'night-city'];
 if(!img){fallback(c,faction);return;}
 // Monkey habitat uses the overgrown ruins in the northwest of the supplied world.
 const source=faction==='monkey'?{x:0,y:0,w:690,h:560}:{x:0,y:0,w:img.width,h:img.height};
 const scale=Math.max(384/source.w,296/source.h),w=384/scale,h=296/scale;
 c.drawImage(img,source.x+(source.w-w)/2,source.y+(source.h-h)/2,w,h,0,0,384,296);
}
function leaves(c,x,y,seed,large=false){
 const rx=large?36:42,ry=large?29:23;
 poly(c,[[x-rx-4,y+12],[x-rx-2,y-7],[x-rx+9,y-21],[x-15,y-ry],[x+5,y-ry-5],[x+25,y-ry+4],[x+rx,y-11],[x+rx+5,y+10],[x+rx-5,y+24],[x-25,y+25]],C.ink);
 oval(c,x,y,rx,ry,C.deep);
 // Irregular layered clusters: lit tips above, deep shadows below.
 const clusters=[[-25,-5],[-14,-18],[2,-22],[19,-15],[29,-3],[-31,8],[-16,0],[0,-6],[15,2],[-21,15],[-5,12],[10,14],[27,13],[0,23]];
 clusters.forEach(([dx,dy],i)=>{
  const sway=(seed*3+i*7)%5-2,cy=y+dy*(large?1.2:1),cx=x+dx+sway;
  poly(c,[[cx-10,cy+1],[cx-7,cy-5],[cx-2,cy-7],[cx+4,cy-6],[cx+10,cy-1],[cx+11,cy+5],[cx+5,cy+9],[cx-6,cy+8]],i>8?'#06464b':'#086358');
  poly(c,[[cx-8,cy],[cx-4,cy-4],[cx+2,cy-5],[cx+8,cy-1],[cx+4,cy+3],[cx-4,cy+2]],i>8?C.deep:C.shade);
  r(c,cx-3,cy-4,5,1,i<5?'#27b887':C.leaf);r(c,cx-6,cy-1,2,2,C.leaf);
 });
 for(let i=0;i<85;i++){
  const n=Math.imul(i+seed*37,2654435761)>>>0,m=Math.imul(i+seed*11,1597334677)>>>0;
  const dx=n%(rx*2)-rx,dy=m%(ry*2)-ry;
  if(dx*dx/(rx*rx)+dy*dy/(ry*ry)>1)continue;
  const color=dy<0?[C.leaf,C.shade,'#27b887'][i%3]:[C.deep,'#0a5356',C.shade][i%3];
  poly(c,[[x+dx-2,y+dy],[x+dx,y+dy-2],[x+dx+4,y+dy-1],[x+dx+1,y+dy+2]],color);
 }
 [[-30,-7],[-15,-22],[4,-28],[25,-13]].forEach(([dx,dy],i)=>{r(c,x+dx,y+dy,2,2,(i+seed)%3?C.leaf:C.lime);});
}
function hiding(c,x,faction,shake=0){
 x+=shake;oval(c,x,253,47,7,'#020426');
 if(faction==='monkey'){
  poly(c,[[x-8,249],[x-7,207],[x-16,192],[x-11,187],[x-3,197],[x+5,187],[x+8,178],[x+14,178],[x+10,197],[x+7,243],[x+17,251],[x-19,251]],C.ink);
  poly(c,[[x-5,244],[x-3,212],[x+2,194],[x+7,190],[x+3,232],[x+5,246]],'#365148');
  r(c,x-2,215,2,25,C.shade);r(c,x+3,200,1,15,C.lime);
  leaves(c,x,190,Math.floor(x/10),true);
  poly(c,[[x-17,209],[x-16,221],[x-10,229],[x-11,240],[x-14,242],[x-12,229],[x-19,222],[x-19,212]],C.leaf);
  r(c,x+8,207,1,22,C.green);r(c,x+6,228,3,1,C.lime);
 }else{
  leaves(c,x,222,Math.floor(x/10));
  r(c,x-17,244,9,3,'#39334c');r(c,x-15,243,7,1,C.pink);
  r(c,x+23,249,10,3,C.furDeep);r(c,x+23,249,7,1,C.silver);
 }
}
function bait(c,faction){
 oval(c,192,275,14,4,C.ink);
 if(faction==='monkey'){poly(c,[[182,265],[186,270],[195,273],[202,269],[204,265],[205,271],[200,277],[188,276],[181,272]],C.lime);r(c,184,271,4,1,C.green);}
 else{r(c,184,266,17,9,C.furDeep);r(c,185,265,15,3,C.silver);r(c,188,268,9,5,C.pink);r(c,191,269,4,2,C.cream);}
}
export function drawScene(canvas,{faction='raccoon',chosen=null,outcome=null,phase='idle',time=0}={}){
 const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;backdrop(c,faction);
 if(phase==='result'&&outcome){
  r(c,0,0,384,296,'#020426ba');
  const accent=outcome==='spore'||outcome==='volt'?C.pink:C.light;
  oval(c,192,241,79,11,C.ink);oval(c,192,243,72,5,C.deep);r(c,143,244,98,1,accent);
  const sprite=document.createElement('canvas');sprite.width=sprite.height=96;drawCreature(sprite,outcome);c.drawImage(sprite,96,47,192,192);
  [[101,109],[286,88],[88,195],[279,183],[119,65],[262,224]].forEach(([x,y],i)=>{r(c,x,y,2,2,accent);if(i%2)r(c,x-2,y+1,6,1,accent);});
  return;
 }
 // Foreground darkness seats the code-native foliage in the illustrated environment.
 const gradient=c.createLinearGradient(0,151,0,296);gradient.addColorStop(0,'#02042600');gradient.addColorStop(1,'#02042680');c.fillStyle=gradient;c.fillRect(0,151,384,145);
 [62,192,322].forEach((x,i)=>{const shake=chosen===i&&phase==='revealing'?Math.round(Math.sin(time/42)*4):0;hiding(c,x,faction,shake);if(chosen===i&&phase==='result'){r(c,x-11,225,22,11,C.ink);r(c,x-7,228,14,5,C.deep);}});
 if(phase==='waiting'||phase==='ready')bait(c,faction);
 if(phase==='ready')for(const x of [62,192,322]){r(c,x-2,194,4,2,C.lime);r(c,x-6,190,2,1,C.light);}
}
