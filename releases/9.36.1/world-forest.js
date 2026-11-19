/* Far woodland uses two instanced impostors per grove. */
(function(){
'use strict';
const canopyColors=['#36633a','#486f3d','#587541','#3c663c'];
let groveCanvas, canopyCanvas;

function random(seed){
 const value=Math.sin(seed*12.9898+78.233)*43758.5453;
 return value-Math.floor(value);
}

function smoothStep(value){
 const t=Math.max(0,Math.min(1,value));
 return t*t*(3-2*t);
}

function foliage2D(context,x,y,width,height,color){
 context.fillStyle=color;
 context.beginPath();
 context.ellipse(x,y,width,height,0,0,Math.PI*2);
 context.fill();
 context.fillStyle='#789753';
 context.beginPath();
 context.ellipse(x-width*.25,y-height*.27,width*.47,height*.42,-.27,0,Math.PI*2);
 context.fill();
}

function groveTexture(){
 if(!groveCanvas){
  groveCanvas=document.createElement('canvas');
  groveCanvas.width=512;
  // Power-of-two dimensions keep trilinear minification available on WebGL 1.
  groveCanvas.height=128;
  const context=groveCanvas.getContext('2d');
  const yScale=groveCanvas.height/96;
  for(let i=0;i<12;i++){
   const x=20+i*42+(random(i+30)-.5)*16,base=(91-random(i+9)*9)*yScale;
   const h=(22+random(i+7)**2*60)*yScale,w=8+random(i+18)*9;
   context.fillStyle='#66583d';
   context.fillRect(x-1,base-h*.53,3,h*.53);
   foliage2D(context,x,base-h*.59,w,h*.39,canopyColors[i%canopyColors.length]);
  }
 }
 return forestTexture(groveCanvas);
}

function canopyTexture(){
 if(!canopyCanvas){
  canopyCanvas=document.createElement('canvas');
  canopyCanvas.width=canopyCanvas.height=256;
  const context=canopyCanvas.getContext('2d');
  for(let i=0;i<25;i++){
   const x=26+(i%5)*51+(random(i+41)-.5)*24,y=26+Math.floor(i/5)*51+(random(i+63)-.5)*24;
   const r=4+random(i+32)**1.65*10;
   foliage2D(context,x,y,r,r*(.75+random(i+78)*.5),canopyColors[i%canopyColors.length]);
  }
 }
 return forestTexture(canopyCanvas);
}

function forestTexture(canvas){
 const texture=new THREE.CanvasTexture(canvas);
 texture.colorSpace=THREE.SRGBColorSpace;
 texture.minFilter=THREE.LinearMipmapLinearFilter;
 texture.magFilter=THREE.LinearFilter;
 return texture;
}

function build(options){
 const steps=buildSteps(options);
 let result;
 do{result=steps.next();}while(!result.done);
 return result.value;
}

function* buildSteps({group,region,plan,height,city,bounds}){
 const extent=region?.extent||50000,spacing=200,points=[];
 const originX=city.lng*111320*Math.max(.02,Math.cos(city.lat*Math.PI/180));
 const originNorth=city.lat*111320;
 for(let row=Math.floor((originNorth-extent)/spacing);row<=Math.ceil((originNorth+extent)/spacing);row++){
  if((row&3)===0)yield;
  for(let col=Math.floor((originX-extent)/spacing);col<=Math.ceil((originX+extent)/spacing);col++){
   const seed=col*73856093^row*19349663;
   const x=(col+.13+random(seed)*.74)*spacing-originX;
   const z=originNorth-(row+.13+random(seed+47)*.74)*spacing;
   const axis=Math.max(Math.abs(x),Math.abs(z)),radius=Math.hypot(x,z);
   if(radius<4700||axis>extent)continue;
   const edgeDensity=1-.55*smoothStep((axis/extent-.53)/.47);
   const nearDensity=smoothStep((radius-4700)/1900);
   const cover=region?.vegetation?region.vegetation(x,z):
    (1-(region?.aridity?.(x,z)||0)*.99)*(1-(region?.coldness?.(x,z)||0)*.97);
   if(random(seed+101)>nearDensity*edgeDensity*.90*cover)continue;
   const width=135+random(seed+9)*44;
   if(region&&region.landDistance(x,z)<width*.5+18)continue;
   if(x>bounds.minX-60&&x<bounds.maxX+60&&z>bounds.minZ-60&&z<bounds.maxZ+60)continue;
   if(WorldRoads.nearSettlement(x,z,plan,100)||WorldRoads.distanceToRoad(x,z,plan)<80)continue;
   const y=height(x,z),treeLine=1-smoothStep((y-650)/600);
   if(random(seed+17)>treeLine)continue;
   points.push({x,z,y,w:width,h:13+random(seed+31)*9,color:random(seed+61)});
  }
 }

 const options={alphaTest:.012,transparent:true,depthWrite:false,side:THREE.DoubleSide,forceSinglePass:true,fog:true};
 const material=new THREE.MeshBasicMaterial({...options,map:groveTexture()});
 material.onBeforeCompile=shader=>{
  shader.vertexShader=shader.vertexShader.replace('#include <uv_vertex>',
   '#include <uv_vertex>\nif(instanceMatrix[0].x<0.)vMapUv.x=1.-vMapUv.x;');
  shader.vertexShader=shader.vertexShader.replace('#include <project_vertex>',
   'vec4 mvPosition=modelViewMatrix*instanceMatrix*vec4(0.,0.,0.,1.); mvPosition.xy+=position.xy*vec2(length(instanceMatrix[0].xyz),length(instanceMatrix[1].xyz)); gl_Position=projectionMatrix*mvPosition;');
 };
 material.customProgramCacheKey=()=> 'far-woodland-groves-v2';
 const mesh=new THREE.InstancedMesh(new THREE.PlaneGeometry(1,1),material,points.length);
 const topMaterial=new THREE.MeshBasicMaterial({...options,map:canopyTexture()});
 const top=new THREE.InstancedMesh(new THREE.PlaneGeometry(1,1).rotateX(-Math.PI/2),topMaterial,points.length);
 const dummy=new THREE.Object3D(),color=new THREE.Color(),direction=new THREE.Vector3();
 for(let i=0;i<points.length;i++){
  if(i>0&&i%2048===0)yield;
  const p=points[i];
  dummy.position.set(p.x,p.y+p.h*.46,p.z);
  dummy.rotation.y=p.color>.5?Math.PI:0;
  dummy.scale.set(p.w,p.h,1);
  dummy.updateMatrix();
  color.setHSL(.23,.12,.78+p.color*.15);
  mesh.setMatrixAt(i,dummy.matrix);
  mesh.setColorAt(i,color);
  dummy.position.set(p.x,p.y+4+p.h*.27,p.z);
  dummy.rotation.y=p.color*Math.PI*2;
  dummy.scale.set(p.w,1,p.w);
  dummy.updateMatrix();
  top.setMatrixAt(i,dummy.matrix);
  top.setColorAt(i,color);
 }
 mesh.onBeforeRender=(_renderer,_scene,camera)=>{
  camera.getWorldDirection(direction);
  material.opacity=1-smoothStep((Math.abs(direction.y)-.3)/.5);
 };
 top.onBeforeRender=(_renderer,_scene,camera)=>{
  camera.getWorldDirection(direction);
  topMaterial.opacity=smoothStep((Math.abs(direction.y)-.15)/.55);
 };
 top.computeBoundingSphere();
 top.userData.farForestCanopies=true;
 mesh.computeBoundingSphere();
 mesh.userData.farForest=true;
 group.add(top,mesh);
 group.userData.forestHorizon=extent;
 group.userData.farForestGroves=points.length;
 return mesh;
}

window.WorldForest={build,buildSteps};
})();
