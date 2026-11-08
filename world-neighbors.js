/* Region-wide city previews, screen-space labels and geographically rebased handoff. */
(function(){'use strict';
let entries=[],callbacks=null,flight=null,busy=false,cooldown=0,labelsRoot=null,labelPool=[];
function build({group,plan,height,getCamera,setCamera,onEnter,states,camera,container}){
 labelsRoot?.remove();labelsRoot=null;labelPool=[];entries=[];flight=null;callbacks={getCamera,setCamera,onEnter,camera,container,height};
 if(container){labelsRoot=document.createElement('div');labelsRoot.className='regional-city-labels';labelsRoot.style.cssText='position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:4';container.append(labelsRoot);}
 const positions=[],dummy=new THREE.Object3D();
 for(const n of plan.neighbors||[]){
  const city=n.city,pop=states?.get(city.id)?.count??city.pop??80,range=Math.hypot(n.x,n.z),count=Math.min(range>18000?16:range>7000?28:70,Math.max(16,Math.round(Math.sqrt(pop)*4))),nx=Math.ceil(Math.sqrt(count*1.45)),nz=Math.ceil(count/nx);
  const begin=positions.length;
  for(let i=0;i<count;i++){const x=(i%nx-(nx-1)/2)*26,z=(Math.floor(i/nx)-(nz-1)/2)*26;if(Math.abs(x)<14||Math.abs(z)<14)continue;const h=i%19===0?45:i%7===0?22:6+i%3*3;positions.push({city,x:n.x+x,z:n.z+z,h,y:height(n.x+x,n.z+z)});}
  entries.push({...n,y:height(n.x,n.z),radius:n.radius||220,label:null,buildings:positions.length-begin});
 }
 const body=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshLambertMaterial({color:0xe0cc9a}),positions.length),roofGeo=new THREE.ConeGeometry(.72,1,4);roofGeo.rotateY(Math.PI/4);
 const roofs=new THREE.InstancedMesh(roofGeo,new THREE.MeshLambertMaterial({color:0xac5944}),positions.length);
 positions.forEach((p,i)=>{dummy.position.set(p.x,p.y+p.h/2,p.z);dummy.scale.set(15,p.h,15);dummy.updateMatrix();body.setMatrixAt(i,dummy.matrix);dummy.position.y=p.y+p.h+1.6;dummy.scale.set(18,3.2,18);dummy.updateMatrix();roofs.setMatrixAt(i,dummy.matrix);});
 const owners=positions.map(p=>p.city);for(const m of [body,roofs]){m.computeBoundingSphere();m.receiveShadow=false;m.userData.neighborCities=owners;group.add(m);}
 group.userData.neighborPreviews=entries.map(e=>({id:e.city.id,name:e.city.name,x:e.x,z:e.z,buildings:e.buildings}));
}
function list(){return entries.map(e=>({...e,distance:Math.hypot(e.x,e.z)})).sort((a,b)=>a.distance-b.distance);}
function focus(id){const e=entries.find(e=>e.city.id===id);if(!e||!callbacks)return;const from=callbacks.getCamera();flight={from,to:{target:{x:e.x,y:e.y+6,z:e.z},distance:650,azimuth:from.azimuth,elevation:.73},start:performance.now(),duration:1300};}
const projected=new THREE.Vector3();let lastLabels=-Infinity;
function updateLabels(now){
 if(!labelsRoot||!callbacks.camera||now-lastLabels<90)return;lastLabels=now;
 const camera=callbacks.camera,w=callbacks.container.clientWidth,h=callbacks.container.clientHeight,candidates=[];
 for(const e of entries){projected.set(e.x,e.y+65,e.z).project(camera);if(projected.z< -1||projected.z>1)continue;const x=(projected.x*.5+.5)*w,y=(-projected.y*.5+.5)*h-8,width=Math.min(205,Math.max(102,e.city.name.length*7.5+24));if(x<width/2+8||x>w-width/2-8||y<110||y>h-100||x>w-170&&y<400)continue;const d=camera.position.distanceToSquared(new THREE.Vector3(e.x,e.y,e.z));candidates.push({e,x,y,width,d});}
 candidates.sort((a,b)=>a.d-b.d);const boxes=[],shown=[];for(const c of candidates){const box={l:c.x-c.width/2-6,r:c.x+c.width/2+6,t:c.y-38,b:c.y+6};if(boxes.some(b=>box.l<b.r&&box.r>b.l&&box.t<b.b&&box.b>b.t))continue;if(boxes.length>=35)break;let hidden=false;for(const t of [.25,.5,.75]){const x=camera.position.x+(c.e.x-camera.position.x)*t,z=camera.position.z+(c.e.z-camera.position.z)*t,y=camera.position.y+(c.e.y+65-camera.position.y)*t;if(callbacks.height(x,z)>y+12){hidden=true;break;}}if(hidden)continue;boxes.push(box);shown.push(c);}
 for(let i=0;i<shown.length;i++){const c=shown[i];let label=labelPool[i];if(!label){label=document.createElement('button');label.type='button';label.style.cssText="position:absolute;display:none;pointer-events:auto;background:#102f40f2;color:#fff9e8;border:1px solid #c6e6e0aa;border-radius:7px;padding:6px 10px;font:600 13px/18px system-ui,Arial;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 2px 6px #0005;transform:translate(-50%,-100%);height:32px";label.onclick=()=>focus(label.dataset.cityId);labelsRoot.append(label);labelPool.push(label);}if(label.dataset.cityId!==c.e.city.id){label.dataset.cityId=c.e.city.id;label.textContent=c.e.city.name;label.title=c.e.city.name+' · '+c.e.city.country;label.setAttribute('aria-label','Raggiungi '+c.e.city.name);}const x=Math.round(c.x)+'px',y=Math.round(c.y)+'px',width=Math.round(c.width)+'px';if(label.style.left!==x)label.style.left=x;if(label.style.top!==y)label.style.top=y;if(label.style.width!==width)label.style.width=width;if(label.style.display!=='block')label.style.display='block';}
 for(let i=shown.length;i<labelPool.length;i++)if(labelPool[i].style.display!=='none')labelPool[i].style.display='none';
}
function update(now){if(!callbacks)return;updateLabels(now);if(busy)return;
 if(flight){const p=Math.min(1,(now-flight.start)/flight.duration),t=p*p*(3-2*p),a=flight.from,b=flight.to;callbacks.setCamera({target:{x:a.target.x+(b.target.x-a.target.x)*t,y:a.target.y+(b.target.y-a.target.y)*t,z:a.target.z+(b.target.z-a.target.z)*t},distance:a.distance+(b.distance-a.distance)*t,azimuth:a.azimuth,elevation:a.elevation+(b.elevation-a.elevation)*t});if(p>=1)flight=null;}
 if(flight||now<cooldown)return;const state=callbacks.getCamera();if(state.distance>1800||Math.hypot(state.target.x,state.target.z)<160)return;
 const near=entries.filter(e=>Math.hypot(e.x-state.target.x,e.z-state.target.z)<Math.min(240,e.radius)).sort((a,b)=>Math.hypot(a.x-state.target.x,a.z-state.target.z)-Math.hypot(b.x-state.target.x,b.z-state.target.z))[0];if(!near)return;busy=true;flight=null;cooldown=now+4500;Promise.resolve(callbacks.onEnter(near,state)).catch(e=>console.error('Passaggio città',e)).finally(()=>{busy=false;});
}
function cancelFlight(){flight=null;}window.WorldNeighbors={build,list,focus,update,cancelFlight};
})();
