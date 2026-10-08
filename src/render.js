// All art is drawn on a low-resolution canvas, using a fixed palette.
const P={dark:'#111b16',shadow:'#22342a',deep:'#304739',leaf:'#4f6741',light:'#78944c',glow:'#c3e783',sky:'#68795a',mist:'#a1ab72',rust:'#92664c',stone:'#4c5a4c',cream:'#e0d7b0',fur:'#838b79',black:'#27312c',purple:'#9274a5'};
function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)}
function bush(c,x,y,chosen,shake){
  x+=shake;
  rect(c,x-29,y+18,58,7,P.dark);
  [[-25,0,14,23],[-18,-9,18,30],[-5,-15,19,36],[10,-8,16,29],[21,2,9,20]].forEach(([dx,dy,w,h])=>rect(c,x+dx,y+dy,w,h,P.dark));
  [[-24,1,13,18],[-17,-7,16,26],[-3,-13,15,33],[10,-6,14,26],[21,4,7,15]].forEach(([dx,dy,w,h])=>rect(c,x+dx,y+dy,w,h,chosen?P.deep:P.leaf));
  [[-18,-3,7,4],[-3,-9,8,4],[11,-2,7,4],[-12,6,5,3],[2,9,7,4],[20,7,4,3]].forEach(([dx,dy,w,h])=>rect(c,x+dx,y+dy,w,h,chosen?P.leaf:P.light));
  rect(c,x-6,y+19,14,4,P.shadow);
}
const SPRITE=[
'     kk       kk     ',
'    kffk     kffk    ',
'    kfcfkkkkkfcfk    ',
'   kffffffffffffk   ',
'  kffccccccccccffk  ',
'  kfkkkkfkkfkkkkfk  ',
'  kkggkkfkkggkkkk  ',
'  kkkkkcccckkkkkk  ',
'   kccckkkkcccck   ',
'    kccckkcccck    ',
'     kcccccck      ',
'    kffffffffk     ',
'   kfffccccfffk kk ',
'   kfffccccfffkkffk',
'   kfffccccfffkkcck',
'    kffccccffkkffk ',
'    kffffffffkkck  ',
'    kffk  kffkkk   ',
'    kkkk  kkkk     '
];
export function drawCreature(canvas,type,locked=false){
 const c=canvas.getContext('2d');c.clearRect(0,0,32,32);const colors={k:P.dark,f:type==='spore'?P.purple:P.fur,c:P.cream,g:P.glow};
 SPRITE.forEach((row,y)=>[...row].forEach((p,x)=>{if(p!==' ')rect(c,x+4,y+7,1,1,locked?P.shadow:colors[p])}));
 if(type==='spore'&&!locked){rect(c,13,4,8,3,P.rust);rect(c,11,5,12,2,P.rust);rect(c,15,7,3,2,P.cream);rect(c,14,5,2,1,P.glow);rect(c,19,6,2,1,P.cream)}
}
export function drawScene(canvas,{chosen=null,outcome=null,phase='ready',time=0}={}){
 const c=canvas.getContext('2d'); c.imageSmoothingEnabled=false;
 rect(c,0,0,320,208,P.sky);rect(c,0,30,320,24,'#718160');rect(c,0,54,320,26,'#7b8a60');
 rect(c,242,20,24,24,P.mist);rect(c,248,17,13,30,P.mist);rect(c,42,32,65,4,'#84936a');rect(c,54,27,30,5,'#84936a');
 // Abandoned city, cables and overgrowth.
 [[0,70,30,51],[36,55,33,71],[72,83,21,36],[205,75,30,43],[246,56,38,67],[290,77,30,46]].forEach(([x,y,w,h])=>{
 rect(c,x,y,w,h,P.stone);rect(c,x+3,y-5,w-9,5,P.stone);for(let xx=x+5;xx<x+w-4;xx+=9)for(let yy=y+9;yy<y+h-5;yy+=14)rect(c,xx,yy,4,6,P.shadow);
 });
 rect(c,58,39,2,22,P.shadow);rect(c,53,41,12,2,P.shadow);rect(c,264,38,2,21,P.shadow);rect(c,256,43,16,2,P.shadow);
 c.strokeStyle=P.shadow;c.lineWidth=1;c.beginPath();c.moveTo(59,42);c.lineTo(160,58);c.lineTo(265,44);c.stroke();
 rect(c,0,113,320,95,P.deep);rect(c,0,126,320,82,P.shadow);rect(c,0,162,320,46,'#283a2c');
 // Rubble, path, hazard barrel, grass.
 [[6,114,21,12],[23,108,22,18],[279,116,22,12],[300,111,20,17]].forEach(([x,y,w,h])=>{rect(c,x,y,w,h,P.shadow);rect(c,x+2,y+2,w-4,3,P.leaf)});
 rect(c,135,110,49,7,P.leaf);rect(c,125,117,65,9,P.leaf);rect(c,111,126,82,10,'#5e6946');rect(c,96,136,114,11,'#5e6946');rect(c,123,153,72,14,'#485438');
 rect(c,20,134,16,21,P.dark);rect(c,22,135,12,18,P.rust);rect(c,21,137,14,3,P.stone);rect(c,21,149,14,2,P.stone);rect(c,27,141,3,5,P.glow);
 for(let i=0;i<58;i++){let x=(i*43+17)%320,y=130+(i*19)%78;rect(c,x,y,1,4,i%3?P.leaf:P.light);if(i%2)rect(c,x-2,y+2,2,1,P.leaf)}
 [[87,120],[222,133],[51,197],[245,192],[164,193]].forEach(([x,y])=>{rect(c,x,y,9,3,P.stone);rect(c,x+2,y-2,4,2,P.stone)});
 for(let i=0;i<3;i++){
  const x=64+i*96;const selected=chosen===i;const shake=selected&&phase==='revealing'?Math.round(Math.sin(time/45)*2):0;
  bush(c,x,160,selected,shake);
  if(selected&&phase==='result'){
   if(outcome){const temp=document.createElement('canvas');temp.width=temp.height=32;drawCreature(temp,outcome);c.drawImage(temp,x-24,117,48,48);rect(c,x-3,110,2,3,P.glow);rect(c,x+20,121,3,1,P.glow)}
   else {rect(c,x-12,146,24,19,P.dark);rect(c,x-6,153,12,4,P.shadow)}
  }
 }
 rect(c,0,204,320,4,P.dark);
}
