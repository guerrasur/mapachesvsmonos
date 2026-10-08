// Original pixel art. Polygon and ellipse scanlines keep every edge on the pixel grid.
const C={ink:'#293e3b',edge:'#3d554c',deep:'#416b53',shade:'#577d5b',leaf:'#6f995d',green:'#9bb970',lime:'#c7d788',light:'#e6e7ae',grass:'#a8c977',grassLight:'#b7d58a',grassDark:'#8bb469',soil:'#dbce9d',soilDark:'#b8aa81',soilLight:'#eee0b2',cream:'#f1e5c1',fur:'#a7ada1',silver:'#c7cbb6',furShade:'#748d83',furDeep:'#576c64',mask:'#3c4a4b',eye:'#c3f083',white:'#faf8df',purple:'#9d93ae',purpleShade:'#6e7792',mushroom:'#be6986',pink:'#e5999e',blue:'#759fbd'};
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
 r(c,24,36,8,5,C.ink);r(c,49,35,8,5,C.ink);r(c,25,36,6,3,spore?C.pink:C.eye);r(c,50,35,6,3,spore?C.pink:C.eye);r(c,28,36,2,3,C.ink);r(c,52,35,2,3,C.ink);r(c,25,36,1,1,C.white);r(c,50,35,1,1,C.white);
 poly(c,[[32,39],[40,35],[47,39],[53,46],[49,52],[40,55],[30,50],[28,44]],C.cream);poly(c,[[36,40],[45,40],[47,43],[42,47],[37,45],[34,43]],C.ink);r(c,37,41,6,1,C.furDeep);r(c,40,47,1,3,C.ink);r(c,35,49,5,1,C.furShade);r(c,42,49,6,1,C.furShade);
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
export function drawCreature(canvas,type,locked=false){const c=canvas.getContext('2d');c.clearRect(0,0,96,96);c.imageSmoothingEnabled=false;raccoon(c,type);if(locked){const data=c.getImageData(0,0,96,96);for(let i=0;i<data.data.length;i+=4){if(data.data[i+3]){data.data[i]=126;data.data[i+1]=145;data.data[i+2]=111}}c.putImageData(data,0,0)}}
function tuft(c,x,y,color){r(c,x,y+2,1,3,color);r(c,x-2,y+1,1,2,color);r(c,x+2,y,1,3,color)}
function bush(c,x,y,shake=0){x+=shake;oval(c,x,y+21,32,9,C.grassDark);poly(c,[[x-29,y+17],[x-31,y+9],[x-27,y-1],[x-20,y-8],[x-11,y-14],[x-4,y-17],[x+6,y-16],[x+15,y-11],[x+24,y-5],[x+30,y+3],[x+30,y+14],[x+23,y+21],[x-22,y+21]],C.ink);poly(c,[[x-26,y+15],[x-27,y+7],[x-23,y-1],[x-17,y-6],[x-9,y-11],[x-1,y-13],[x+7,y-12],[x+16,y-7],[x+23,y-2],[x+26,y+5],[x+25,y+14],[x+19,y+18],[x-20,y+18]],C.deep);
 const clusters=[[-14,0],[-3,-6],[10,-2],[-21,8],[-7,7],[7,8],[20,7],[-13,14],[2,15],[15,13]];
 clusters.forEach(([dx,dy],i)=>{poly(c,[[x+dx-7,y+dy+1],[x+dx-5,y+dy-3],[x+dx,y+dy-5],[x+dx+5,y+dy-2],[x+dx+7,y+dy+3],[x+dx+4,y+dy+6],[x+dx-4,y+dy+5]],i>6?C.shade:C.leaf);r(c,x+dx-3,y+dy-2,6,2,i>6?C.leaf:C.green);r(c,x+dx-4,y+dy,2,2,C.green);r(c,x+dx+1,y+dy+3,4,2,C.shade);r(c,x+dx,y+dy+1,2,2,i%3?C.lime:C.green)});r(c,x-9,y+20,17,2,C.soilDark);}
function tree(c,x,y){r(c,x-4,y+16,8,11,C.edge);r(c,x-2,y+17,4,10,C.soilDark);oval(c,x,y+20,20,5,C.grassDark);poly(c,[[x-21,y+12],[x-24,y+3],[x-19,y-10],[x-11,y-18],[x-3,y-24],[x+8,y-23],[x+18,y-14],[x+23,y-3],[x+22,y+10],[x+15,y+17],[x-12,y+18]],C.edge);poly(c,[[x-18,y+9],[x-20,y],[x-15,y-10],[x-8,y-16],[x,y-19],[x+8,y-17],[x+15,y-9],[x+18,y],[x+17,y+10],[x+10,y+14],[x-10,y+14]],C.shade);[[-10,-2],[0,-10],[10,-1],[-9,9],[4,9]].forEach(([dx,dy])=>{oval(c,x+dx,y+dy,8,6,C.leaf);r(c,x+dx-4,y+dy-3,7,2,C.green);r(c,x+dx-5,y+dy-1,2,2,C.green)});}
function player(c,x,y){oval(c,x,y+15,10,3,C.grassDark);r(c,x-6,y+6,5,8,C.ink);r(c,x+2,y+6,5,8,C.ink);r(c,x-7,y+13,6,3,C.mask);r(c,x+2,y+13,6,3,C.mask);r(c,x-7,y-2,15,9,C.ink);r(c,x-6,y-1,13,7,C.blue);r(c,x-10,y,3,6,C.cream);r(c,x+8,y,3,6,C.cream);r(c,x-4,y,8,9,C.soilDark);r(c,x-3,y+1,6,5,C.soil);r(c,x-5,y-11,11,10,C.ink);r(c,x-4,y-10,9,8,C.furDeep);r(c,x-7,y-12,14,5,C.ink);r(c,x-6,y-12,12,3,C.mushroom);r(c,x-3,y-15,8,3,C.mushroom);r(c,x-1,y-14,5,1,C.pink);}
function encounter(c,outcome){r(c,0,0,240,208,C.light);for(let y=0;y<208;y+=4)r(c,0,y,240,1,'#dce2ab');r(c,0,137,240,71,'#cbd899');oval(c,120,168,65,16,C.grassDark);oval(c,120,163,65,13,C.grassLight);oval(c,120,162,50,8,C.grass);const sprite=document.createElement('canvas');sprite.width=sprite.height=96;drawCreature(sprite,outcome);c.drawImage(sprite,24,-2,192,192);}
export function drawScene(canvas,{chosen=null,outcome=null,phase='ready',time=0}={}){
 const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;if(phase==='result'&&outcome){encounter(c,outcome);return}
 r(c,0,0,240,208,C.grass);
 // A small tiled clearing: sparse flowers, a path and the tree boundary.
 for(let y=0;y<208;y+=16)for(let x=0;x<240;x+=16){const n=(x*7+y*11)%17;if(n<8){r(c,x+2,y+5,2,1,C.grassLight);r(c,x+10,y+12,2,1,C.grassLight)}if(n<4)tuft(c,x+8,y+4,C.grassDark)}
 poly(c,[[106,35],[134,35],[134,159],[142,173],[142,208],[98,208],[98,173],[106,159]],C.soilDark);poly(c,[[109,35],[131,35],[131,160],[139,175],[139,208],[101,208],[101,175],[109,160]],C.soil);
 for(let i=0;i<34;i++){const x=110+(i*13)%20,y=38+(i*29)%163;r(c,x,y,2,1,i%2?C.soilLight:C.soilDark)}
 [5,43,81,159,197,235].forEach(x=>tree(c,x,15));tree(c,-8,65);tree(c,248,65);tree(c,-11,118);tree(c,251,118);
 [[28,70],[205,87],[23,178],[210,184],[87,109],[157,111]].forEach(([x,y],i)=>{tuft(c,x,y+3,C.deep);r(c,x-2,y,5,1,i%2?C.cream:C.pink);r(c,x,y-2,1,5,i%2?C.cream:C.pink);r(c,x,y,1,1,C.soilDark)});
 // Three large, detailed bushes. Their positions match the three hit targets.
 const points=[[120,67],[60,131],[180,131]];points.forEach(([x,y],i)=>{const shake=chosen===i&&phase==='revealing'?Math.round(Math.sin(time/40)*3):0;bush(c,x,y,shake);if(chosen===i&&phase==='result'){r(c,x-10,y+5,20,12,C.ink);r(c,x-7,y+8,14,8,C.deep)}});
 player(c,120,180);
}
