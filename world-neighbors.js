/* Region-wide city previews, screen-space labels and geographically rebased handoff. */
(function(){'use strict';
let entries=[],callbacks=null,flight=null,busy=false,cooldown=0,labelsRoot=null,labelPool=[];
function occupiedByCity(plan,x,z,half=0){if(!plan.previewDevelopedCells)plan.previewDevelopedCells=new Set((plan.cells||[]).map(c=>c.col+':'+c.row));for(let col=Math.floor((x-half+92)/184);col<=Math.floor((x+half+92)/184);col++)for(let row=Math.floor((z-half+46)/92);row<=Math.floor((z+half+46)/92);row++)if(plan.previewDevelopedCells.has(col+':'+row))return true;return false;}

const messages={
 it:{within:'Centri nell’area urbana',outside:'Altri centri vicini',district:'Quartiere',shared:'Area urbana condivisa',explanation:"Ogni centro ha il proprio spazio di crescita nel mondo 3D. Le distanze si adattano agli ingombri; sulla mappa restano le coordinate reali."},
 en:{within:'Places within the urban area',outside:'Other nearby places',district:'District',shared:'Shared urban area',explanation:"Each place has its own growth space in the 3D world. Distances adapt to city footprints; the map keeps real coordinates."},
 es:{within:'Centros del área urbana',outside:'Otros centros cercanos',district:'Barrio',shared:'Área urbana compartida',explanation:"Cada centro tiene su espacio de crecimiento en el mundo 3D. Las distancias se adaptan al tamaño urbano; el mapa mantiene las coordenadas reales."},
 pt:{within:'Centros na área urbana',outside:'Outros centros próximos',district:'Bairro',shared:'Área urbana compartilhada',explanation:"Cada centro tem espaço próprio para crescer no mundo 3D. As distâncias se adaptam ao tamanho das cidades; o mapa mantém as coordenadas reais."},
 fr:{within:'Localités dans la zone urbaine',outside:'Autres localités proches',district:'Quartier',shared:'Zone urbaine commune',explanation:"Chaque localité dispose de son espace de croissance en 3D. Les distances s’adaptent à la taille des villes ; la carte conserve les coordonnées réelles."},
 de:{within:'Orte im Stadtgebiet',outside:'Weitere Orte in der Nähe',district:'Stadtteil',shared:'Gemeinsames Stadtgebiet',explanation:"Jeder Ort hat im 3D-Modus Platz zum Wachsen. Die Abstände passen sich der Stadtgröße an; die Karte behält die echten Koordinaten."},
 ar:{within:'المراكز داخل المنطقة الحضرية',outside:'مراكز أخرى قريبة',district:'حي',shared:'منطقة حضرية مشتركة',explanation:"لكل مركز مساحة للنمو في العالم ثلاثي الأبعاد. تتكيف المسافات مع حجم المدن، وتحتفظ الخريطة بالإحداثيات الحقيقية."},
 id:{within:'Pusat dalam kawasan perkotaan',outside:'Pusat lain di sekitar',district:'Kawasan',shared:'Kawasan perkotaan bersama',explanation:"Setiap pusat memiliki ruang tumbuh di dunia 3D. Jarak menyesuaikan ukuran kota; peta tetap memakai koordinat asli."},
 ja:{within:'都市圏内の地域',outside:'その他の近隣地域',district:'地区',shared:'共通の都市圏',explanation:"3Dの世界では各都市に成長のための空間を確保します。距離は市街地の大きさに合わせて調整され、地図上の座標は変わりません。"},
 zh:{within:'城区内的地点',outside:'其他附近地点',district:'街区',shared:'共同城区',explanation:"3D世界为每个地点保留生长空间。距离会随城市规模调整；地图保持真实坐标。"}
};
function text(key){const locale=(window.GameI18n?.locale||'it').split('-')[0];return (messages[locale]||messages.en)[key];}
function placeKind(city){const id=Number(city.geonameId||String(city.id).replace(/^gn-/,''));return window.CityPlaceKinds?.districts.has(id)?'district':'place';}
function build({group,plan,height,getCamera,setCamera,onEnter,states,camera,container,city,footprintFor,previewLots}){
 labelsRoot?.remove();labelsRoot=null;labelPool=[];entries=[];flight=null;lastLabels=-Infinity;lastCameraSignature='';visibleLabelIds.clear();callbacks={getCamera,setCamera,onEnter,camera,container,height};
 if(container&&!document.getElementById('regionalLabelStyle')){const style=document.createElement('style');style.id='regionalLabelStyle';style.textContent='.regional-city-labels button{position:absolute;display:none;pointer-events:auto;background:transparent;color:#18372f;border:0;border-radius:5px;padding:0 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff,0 0 3px #fff,0 0 5px #fff;transform:translate(-50%,-50%);cursor:pointer;touch-action:manipulation;-webkit-text-stroke:3px #fff;paint-order:stroke fill}.regional-city-labels button:focus-visible{outline:2px solid #12685a;outline-offset:2px;background:#fffffff2}.regional-city-labels button:hover{color:#00644b}';document.head.append(style);}
 if(container){labelsRoot=document.createElement('div');labelsRoot.className='regional-city-labels';labelsRoot.style.cssText='position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:4';container.append(labelsRoot);}
 const positions=[],dummy=new THREE.Object3D(),placed=new Map(),geography=group.userData.geography,stats={candidates:0,blockedByActiveCity:0,blockedByRoad:0,blockedByWater:0,blockedByPreview:0,groupedCenters:0,placed:0};
 const neighbors=[...(plan.neighbors||[])].sort((a,b)=>Math.hypot(a.x,a.z)-Math.hypot(b.x,b.z)||String(a.city.id).localeCompare(String(b.city.id))),areas={records:neighbors.map(n=>{const pop=states?.get(n.city.id)?.count??n.city.pop??80,range=Math.hypot(n.x,n.z),count=Math.min(range>44000?16:range>18000?48:range>7000?120:256,Math.max(16,pop)),nx=Math.ceil(Math.sqrt(count*1.45)),nz=Math.ceil(count/nx);return{n,city:n.city,count,nx,nz,integrated:false,representative:true,groupSize:1,groupId:n.city.id,groupName:n.city.name};}),metadata:[]};
 function reserve(x,z){const half=9.2;stats.candidates++;if(occupiedByCity(plan,x,z,half)){stats.blockedByActiveCity++;return false;}if(geography?.landDistance(x,z)<Math.SQRT2*half){stats.blockedByWater++;return false;}if(window.WorldRoads?.distanceToRoad(x,z,plan)<18){stats.blockedByRoad++;return false;}const ix=Math.floor(x/24),iz=Math.floor(z/24);for(let a=ix-1;a<=ix+1;a++)for(let b=iz-1;b<=iz+1;b++)for(const p of placed.get(a+':'+b)||[])if(Math.abs(p.x-x)<half*2&&Math.abs(p.z-z)<half*2){stats.blockedByPreview++;return false;}const key=ix+':'+iz;if(!placed.has(key))placed.set(key,[]);placed.get(key).push({x,z});stats.placed++;return true;}
 for(const record of areas.records){const {n,city,count,nx,nz,integrated,representative}=record,begin=positions.length;
  const pop=states?.get(city.id)?.count??city.pop??80,lots=previewLots?previewLots(pop,count):Array.from({length:count},(_,i)=>({x:(i%nx-(nx-1)/2)*26,z:(Math.floor(i/nx)-(nz-1)/2)*26,index:i}));
  for(const p of lots){if(!previewLots&&(Math.abs(p.x)<14||Math.abs(p.z)<14))continue;if(!reserve(n.x+p.x,n.z+p.z))continue;const i=p.index,h=i%19===0?45:i%7===0?22:6+i%3*3;positions.push({city,x:n.x+p.x,z:n.z+p.z,h,y:height(n.x+p.x,n.z+p.z)});}
  entries.push({...n,y:height(n.x,n.z),radius:n.radius||220,label:null,integrated,representative,groupSize:record.groupSize,groupId:record.groupId,groupName:record.groupName,placeKind:placeKind(city),buildings:positions.length-begin});
 }
 const body=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshLambertMaterial({color:0xe0cc9a}),positions.length),roofGeo=new THREE.ConeGeometry(.72,1,4);roofGeo.rotateY(Math.PI/4);const roofs=new THREE.InstancedMesh(roofGeo,new THREE.MeshLambertMaterial({color:0xac5944}),positions.length);
 positions.forEach((p,i)=>{dummy.position.set(p.x,p.y+p.h/2,p.z);dummy.scale.set(15,p.h,15);dummy.updateMatrix();body.setMatrixAt(i,dummy.matrix);dummy.position.y=p.y+p.h+1.6;dummy.scale.set(18,3.2,18);dummy.updateMatrix();roofs.setMatrixAt(i,dummy.matrix);});
 const owners=positions.map(p=>p.city);for(const m of [body,roofs]){m.computeBoundingSphere();m.receiveShadow=false;m.userData.neighborCities=owners;group.add(m);}
 group.userData.urbanAreas=areas.metadata;group.userData.neighborPreviewPlacement=stats;group.userData.neighborPreviews=entries.map(e=>({id:e.city.id,name:e.city.name,x:e.x,z:e.z,buildings:e.buildings,integrated:e.integrated,representative:e.representative,groupId:e.groupId,groupSize:e.groupSize,placeKind:e.placeKind}));
}
function list(){return entries.map(e=>({...e,distance:Math.hypot(e.geoX??e.x,e.geoZ??e.z)})).sort((a,b)=>a.distance-b.distance);}
function focus(id){const e=entries.find(e=>e.city.id===id);if(!e||!callbacks||busy)return;const from=callbacks.getCamera();if(Math.hypot(e.x,e.z)>44000){busy=true;flight=null;cooldown=performance.now()+4500;const state={target:{x:e.x,y:e.y+6,z:e.z},distance:650,azimuth:from.azimuth,elevation:.73};Promise.resolve().then(()=>callbacks.onEnter(e,state)).catch(error=>console.error('Passaggio città',error)).finally(()=>{busy=false;});return;}flight={from,to:{target:{x:e.x,y:e.y+6,z:e.z},distance:650,azimuth:from.azimuth,elevation:.73},start:performance.now(),duration:1300};}

function placeLabels(candidates,hud,w,h){
 const boxes=[],shown=[],limit=w<600?8:16;
 for(const c of candidates){
  // Names stay at their geographic anchor. Crowded names appear on closer views.
  const box={l:c.x-c.width/2-9,r:c.x+c.width/2+9,t:c.y-(c.height||28)/2-5,b:c.y+(c.height||28)/2+5};
  if(box.l<12||box.r>w-12||box.t<12||box.b>h-12)continue;
  if([...hud,...boxes].some(b=>box.l<b.r&&box.r>b.l&&box.t<b.b&&box.b>b.t))continue;
  boxes.push(box);shown.push({...c,anchorX:c.x,anchorY:c.y});if(shown.length>=limit)break;
 }return shown;
}

const projected=new THREE.Vector3(),labelMeasureCache=new Map(),visibleLabelIds=new Set();let lastLabels=-Infinity,lastCameraSignature='',measureContext=null;
function labelSize(name,mobile){const font='700 '+(mobile?15:14)+'px/22px system-ui,Arial',key=font+'|'+name;let size=labelMeasureCache.get(key);if(!size){measureContext??=document.createElement('canvas').getContext('2d');measureContext.font=font;size={font,width:Math.min(mobile?248:272,Math.max(64,Math.ceil(measureContext.measureText(name).width)+14)),height:mobile?36:28};labelMeasureCache.set(key,size);}return size;}
function updateLabels(now){
 if(!labelsRoot||!callbacks.camera||now-lastLabels<32)return;
 const camera=callbacks.camera,w=callbacks.container.clientWidth,h=callbacks.container.clientHeight,candidates=[];
 const signature=[...camera.matrixWorld.elements,...camera.projectionMatrix.elements,w,h].join(',');
 if(signature===lastCameraSignature&&now-lastLabels<180)return;lastCameraSignature=signature;lastLabels=now;
 const viewDistance=callbacks.getCamera().distance,maxRange=Math.max(5000,viewDistance*10);
 for(const e of entries){if(e.integrated||!e.representative)continue;
  const d=camera.position.distanceToSquared(projected.set(e.x,e.y,e.z));
  if(d>maxRange*maxRange)continue;
  projected.set(e.x,e.y+3,e.z).project(camera);if(projected.z< -1||projected.z>1)continue;
  const x=(projected.x*.5+.5)*w,y=(-projected.y*.5+.5)*h,size=labelSize(e.city.name,w<600);
  if(x<8||x>w-8||y<8||y>h-8)continue;candidates.push({e,x:Math.round(x),y:Math.round(y),...size,d});
 }

 candidates.sort((a,b)=>a.d*(visibleLabelIds.has(a.e.city.id)?.82:1)-b.d*(visibleLabelIds.has(b.e.city.id)?.82:1)||String(a.e.city.id).localeCompare(String(b.e.city.id)));const origin=callbacks.container.getBoundingClientRect(),hud=Array.from(document.querySelectorAll('.hub-brand,.hub-search-area,.hub-city-strip,.hub-launch,.hub-tools,.hub-dialog,.hub-drawer,#v4Panel,#card,.v4Nav,#earthControls')).map(el=>el.getBoundingClientRect()).filter(r=>r.width>0&&r.height>0).map(r=>({l:r.left-origin.left-6,r:r.right-origin.left+6,t:r.top-origin.top-6,b:r.bottom-origin.top+6})),clear=candidates.filter(c=>{for(const t of [.25,.5,.75]){const x=camera.position.x+(c.e.x-camera.position.x)*t,z=camera.position.z+(c.e.z-camera.position.z)*t,y=camera.position.y+(c.e.y+3-camera.position.y)*t;if(callbacks.height(x,z)>y+12)return false;}return true;}),shown=placeLabels(clear,hud,w,h);
 const layout=JSON.stringify({centers:entries.length,candidates:candidates.length,terrainVisible:clear.length,shown:shown.length,range:Math.round(maxRange),nearest:Math.round(Math.min(...entries.map(e=>Math.hypot(e.x,e.z))))});if(labelsRoot.dataset.layout!==layout)labelsRoot.dataset.layout=layout;
 visibleLabelIds.clear();for(const c of shown)visibleLabelIds.add(c.e.city.id);
 for(const label of labelPool)if(!visibleLabelIds.has(label.dataset.cityId))label.style.display='none';
 for(const c of shown){
  let label=labelPool.find(l=>l.dataset.cityId===c.e.city.id);
  if(!label){label=document.createElement('button');label.type='button';label.dir='auto';label.dataset.cityId=c.e.city.id;label.onclick=()=>focus(label.dataset.cityId);labelsRoot.append(label);labelPool.push(label);}
  if(label.textContent!==c.e.city.name)label.textContent=c.e.city.name;
  label.title=c.e.city.name+' · '+(window.GameI18n?.country(c.e.city.countryCode,c.e.city.country)||c.e.city.country);
  label.setAttribute('aria-label',window.GameI18n?.t('Raggiungi '+c.e.city.name)||'Raggiungi '+c.e.city.name);
  const styles={left:c.x+'px',top:c.y+'px',width:c.width+'px',height:c.height+'px',font:c.font,display:'block'};
  for(const [key,value]of Object.entries(styles))if(label.style[key]!==value)label.style[key]=value;
 }

}
function update(now){if(!callbacks)return;if(busy){updateLabels(now);return;}
 if(flight){const p=Math.min(1,(now-flight.start)/flight.duration),t=p*p*(3-2*p),a=flight.from,b=flight.to;callbacks.setCamera({target:{x:a.target.x+(b.target.x-a.target.x)*t,y:a.target.y+(b.target.y-a.target.y)*t,z:a.target.z+(b.target.z-a.target.z)*t},distance:a.distance+(b.distance-a.distance)*t,azimuth:a.azimuth,elevation:a.elevation+(b.elevation-a.elevation)*t});if(p>=1)flight=null;}
 updateLabels(now);if(flight||now<cooldown)return;const state=callbacks.getCamera();if(state.distance>1800||Math.hypot(state.target.x,state.target.z)<160)return;
 const near=entries.filter(e=>!e.integrated&&e.representative&&Math.hypot(e.x-state.target.x,e.z-state.target.z)<Math.min(240,e.radius)).sort((a,b)=>Math.hypot(a.x-state.target.x,a.z-state.target.z)-Math.hypot(b.x-state.target.x,b.z-state.target.z))[0];if(!near)return;busy=true;flight=null;cooldown=now+4500;Promise.resolve(callbacks.onEnter(near,state)).catch(e=>console.error('Passaggio città',e)).finally(()=>{busy=false;});
}
function cancelFlight(){flight=null;}window.WorldNeighbors={placeLabels,build,list,focus,update,cancelFlight,text,refreshLabels:()=>{lastLabels=-Infinity;lastCameraSignature='';labelMeasureCache.clear();}};
})();
