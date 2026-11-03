/* Sudamérica Casa por Casa · Visual Engine 8.4
   Native-resolution physically based rendering, dynamically centered sun shadows,
   no blur, downsampling or dark screen-space filters. */
(function(){
 'use strict';
 const target=new THREE.Vector3(),direction=new THREE.Vector3(),offset=new THREE.Vector3(-155,205,115);
 const shadowCenter=new THREE.Vector3(Infinity,0,Infinity);
 let sun=null,lastShadow=-Infinity;
 const shadowInterval=1000/12;
 let maxRatio=1,lastFrame=0,averageFrame=16.7,samples=0;
 function setup(scene,camera,renderer){
  renderer.useLegacyLights=false;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.autoUpdate=false;
  maxRatio=Math.min(renderer.getPixelRatio(),1.5);
  renderer.setPixelRatio(maxRatio);
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.13;
  scene.traverse(function(o){
   if(o.isDirectionalLight&&!sun){
    sun=o;sun.castShadow=true;
    sun.shadow.mapSize.set(2048,2048);
    const c=sun.shadow.camera;
    c.left=-114;c.right=114;c.top=114;c.bottom=-114;c.near=1;c.far=750;
    c.updateProjectionMatrix();
    sun.shadow.bias=-0.00014;sun.shadow.normalBias=.032;
    sun.shadow.radius=3;
   }
  });
 }
 function render(scene,camera,renderer){
  const now=performance.now();
  const elapsed=now-lastFrame;
  lastFrame=now;
  if(elapsed>0&&elapsed<150&&!document.hidden){
   averageFrame+=(elapsed-averageFrame)*.06;
   if(++samples>=90){
    const ratio=renderer.getPixelRatio();
    const minimum=Math.min(.78,maxRatio);
    const next=averageFrame>27?Math.max(minimum,ratio-.15):
      averageFrame<18?Math.min(maxRatio,ratio+.10):ratio;
    if(next!==ratio)renderer.setPixelRatio(next);
    samples=0;
   }
  }
  if(sun && now-lastShadow>=shadowInterval){
   camera.getWorldDirection(direction);
   const depth=Math.min(350,camera.position.y/Math.max(.15,-direction.y));
   target.copy(camera.position).addScaledVector(direction,depth);
   target.y=0;
   if(shadowCenter.distanceToSquared(target)>=4 || now-lastShadow>=500){
    shadowCenter.copy(target);
    sun.target.position.copy(target);
    sun.position.copy(target).add(offset);
    sun.target.updateMatrixWorld();
    renderer.shadowMap.needsUpdate=true;
    lastShadow=now;
   }
  }
  renderer.setRenderTarget(null);
  renderer.render(scene,camera);
 }
 window.SudamericaRender8={setup,render,resize:function(){}};
})();
