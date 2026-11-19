/* Shared schematic intercity roads: the map and the 3D exits use the same graph. */
(function(){'use strict';
const normLon=x=>((x+540)%360)-180;
function delta(a,b){const x=normLon(b.lng-a.lng)*111320*Math.cos((a.lat+b.lat)*Math.PI/360),z=-(b.lat-a.lat)*111320;return{x,z,distance:Math.hypot(x,z),angle:Math.atan2(x,z)};}
function point(city,x,z){return[city.lat-z/111320,normLon(city.lng+x/(111320*Math.max(.02,Math.cos(city.lat*Math.PI/180))))];}
const land=(window.WORLD_LAND_DETAIL||window.WORLD_LAND)?.features||[];
const polygons=[];for(const f of land){const rings=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.type==='MultiPolygon'?f.geometry.coordinates:[];for(const p of rings){const xs=p[0].map(p=>p[0]),ys=p[0].map(p=>p[1]);polygons.push({rings:p,minX:Math.min(...xs),maxX:Math.max(...xs),minY:Math.min(...ys),maxY:Math.max(...ys),coastlineDetail:f.properties?.coastlineDetail===true});}}
const detailedCoasts=polygons.filter(p=>p.coastlineDetail);
function inRing(lng,lat,ring){let inside=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>lat)!==(b[1]>lat)&&lng<(b[0]-a[0])*(lat-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;}
function onLand(lat,lng){lng=normLon(lng);return polygons.some(p=>lng>=p.minX&&lng<=p.maxX&&lat>=p.minY&&lat<=p.maxY&&inRing(lng,lat,p.rings[0])&&!p.rings.slice(1).some(r=>inRing(lng,lat,r)));}
function curve(a,b,bendRatio=.004){const dx=normLon(b.lng-a.lng),dy=b.lat-a.lat,cos=Math.cos((a.lat+b.lat)*Math.PI/360),length=Math.hypot(dx*cos,dy),bend=length*bendRatio,nx=-dy/(length||1)/Math.max(.02,cos)*bend,ny=dx*cos/(length||1)*bend,points=[];for(let i=0;i<=16;i++){const t=i/16,u=1-t,offset=3*u*t;points.push([a.lat+dy*t+ny*offset,a.lng+dx*t+nx*offset]);}points[0]=[a.lat,a.lng];points[points.length-1]=[b.lat,a.lng+dx];return points;}
function coastCandidates(path){
 if(!detailedCoasts.length)return [];
 const minX=Math.min(...path.map(p=>p[1])),maxX=Math.max(...path.map(p=>p[1]));
 const minY=Math.min(...path.map(p=>p[0])),maxY=Math.max(...path.map(p=>p[0]));
 const candidates=[];
 for(const coast of detailedCoasts){
  if(coast.maxY<minY||coast.minY>maxY)continue;
  const shift=360*Math.round((minX+maxX-coast.minX-coast.maxX)/720);
  if(coast.maxX+shift>=minX&&coast.minX+shift<=maxX)candidates.push({coast,shift});
 }
 return candidates;
}
function crossesDetailedWater(a,b,candidates){
 const [lat,lng]=a,[nextLat,nextLng]=b,dx=nextLng-lng,dy=nextLat-lat;
 const left=Math.min(lng,nextLng),right=Math.max(lng,nextLng),bottom=Math.min(lat,nextLat),top=Math.max(lat,nextLat);
 const cuts=[0,1];let nearCoast=false;
 for(const {coast,shift} of candidates){
  if(coast.maxX+shift<left||coast.minX+shift>right||coast.maxY<bottom||coast.minY>top)continue;
  nearCoast=true;
  for(const ring of coast.rings)for(let i=0,j=ring.length-1;i<ring.length;j=i++){
   const [x,y]=ring[j],[u,v]=ring[i],sx=u-x,sy=v-y;
   if(Math.max(x,u)+shift<left||Math.min(x,u)+shift>right||Math.max(y,v)<bottom||Math.min(y,v)>top)continue;
   const det=dx*sy-dy*sx;
   if(Math.abs(det)<1e-18)continue;
   const ox=x+shift-lng,oy=y-lat;
   const t=(ox*sy-oy*sx)/det,along=(ox*dy-oy*dx)/det;
   if(t>0&&t<1&&along>=0&&along<=1)cuts.push(t);
  }
 }
 if(!nearCoast)return false;
 cuts.sort((a,b)=>a-b);
 // Every interval between shoreline intersections must be on land, even in very narrow inlets.
 for(let i=1;i<cuts.length;i++){
  if(cuts[i]-cuts[i-1]<1e-9)continue;
  const t=(cuts[i]+cuts[i-1])/2;
  if(!onLand(lat+dy*t,lng+dx*t))return true;
 }
 return false;
}
function pathStaysOnLand(path,distance,candidates){
 const samples=Math.max(1,Math.ceil(distance/(path.length-1)/1000));
 for(let i=1;i<path.length;i++){
  const a=path[i-1],b=path[i];
  if(candidates.length&&crossesDetailedWater(a,b,candidates))return false;
  for(let j=1;j<=samples;j++){
   if(i===path.length-1&&j===samples)continue;
   const t=j/samples;
   if(!onLand(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t))return false;
  }
 }
 return true;
}
function safeRoute(a,b){
 if(a.id>b.id)[a,b]=[b,a];
 const distance=delta(a,b).distance;
 if(distance<500||distance>350000)return null;
 let path=curve(a,b);
 const candidates=coastCandidates(path);
 if(candidates.length&&(!onLand(a.lat,a.lng)||!onLand(b.lat,b.lng)))return null;
 if(polygons.length&&!pathStaysOnLand(path,distance,candidates)){
  if(!candidates.length||distance>30000)return null;
  // Give a short link room to go around a harbour before letting the graph pick other streets.
  path=[-.04,.04,-.10,.10,-.21,.21].map(bend=>curve(a,b,bend)).find(detour=>pathStaysOnLand(detour,distance,coastCandidates(detour)));
  if(!path)return null;
 }
 return {id:a.id+'|'+b.id,a,b,path,distance};
}
function boundsFor(city,radius){const dy=radius/111320,dx=dy/Math.max(.05,Math.cos(city.lat*Math.PI/180));return{getSouth:()=>city.lat-dy,getNorth:()=>city.lat+dy,getWest:()=>city.lng-dx,getEast:()=>city.lng+dx};}
const cache=new Map();let revision=-1,activeGraph=null;const persistentLinks=new Map();
function edges(nodes){const list=[...new Map(nodes.filter(c=>c.geoVerified!==false).map(c=>[c.id,c])).values()].sort((a,b)=>a.id.localeCompare(b.id)),pairs=[],parent=new Map(list.map(c=>[c.id,c.id]));const find=id=>{while(parent.get(id)!==id){parent.set(id,parent.get(parent.get(id)));id=parent.get(id);}return id;};for(let i=0;i<list.length;i++)for(let j=i+1;j<list.length;j++){const distance=delta(list[i],list[j]).distance;if(distance>=500&&distance<=350000)pairs.push({a:list[i],b:list[j],distance});}pairs.sort((a,b)=>a.distance-b.distance||a.a.id.localeCompare(b.a.id)||a.b.id.localeCompare(b.b.id));const result=[];for(const p of pairs){const a=find(p.a.id),b=find(p.b.id);if(a===b)continue;const route=safeRoute(p.a,p.b);if(!route)continue;parent.set(a,b);result.push(route);if(result.length===list.length-1)break;}return result;}
function links(city,atlas){if(activeGraph?.has(city.id))return activeGraph.get(city.id);if(persistentLinks.get(city.id)?.length)return persistentLinks.get(city.id);if(revision!==atlas.byId.size){cache.clear();revision=atlas.byId.size;}if(cache.has(city.id))return cache.get(city.id);let nearby=[];for(const radius of [25000,80000,200000,350000]){nearby=atlas.visible(boundsFor(city,radius)).filter(c=>c.id!==city.id&&c.geoVerified!==false).map(c=>({c,d:delta(city,c).distance})).filter(p=>p.d>500&&p.d<=radius).sort((a,b)=>a.d-b.d);if(nearby.length>=8)break;}const result=edges([city,...nearby.slice(0,20).map(p=>p.c)]).filter(r=>r.a.id===city.id||r.b.id===city.id);cache.set(city.id,result);return result;}
function local(city,geo){return{x:normLon(geo.lng-city.lng)*111320*Math.cos(city.lat*Math.PI/180),z:-(geo.lat-city.lat)*111320};}
function regionalCities(city,atlas,radius=46000){return [...new Map(atlas.visible(boundsFor(city,radius)).filter(c=>c.id!==city.id&&c.geoVerified!==false&&Math.hypot(...Object.values(local(city,c)))<=radius).map(c=>[c.id,c])).values()];}
function regionalRoutes(city,atlas){const nearby=new Set([city.id,...regionalCities(city,atlas).map(c=>c.id)]),routes=controller?.snapshot()||[];if(activeGraph)return routes.filter(r=>nearby.has(r.a.id)||nearby.has(r.b.id));return edges([city,...regionalCities(city,atlas)]);}

// The geographical map stays metric. The 3D region reserves each complete city footprint.
function citySpace(city,neighbors,bounds,footprintFor,states){
 const radius=b=>Math.max(...[b.minX,b.maxX].flatMap(x=>[b.minZ,b.maxZ].map(z=>Math.hypot(x,z))))+90;
 const records=[{city,x:0,z:0,r:radius(bounds)},...neighbors.map(n=>({city:n.city,x:n.x,z:n.z,r:radius(footprintFor(states?.get(n.city.id)?.count??n.city.pop??80,states?.get(n.city.id)?.shops))}))];
 const duplicate=new Set();for(let i=0;i<records.length;i++)for(let j=i+1;j<records.length;j++)if(Math.hypot(records[i].x-records[j].x,records[i].z-records[j].z)<1){duplicate.add(i);duplicate.add(j);}
 // Coincident source coordinates have no defined bearing. Resolve only that exceptional case.
 for(const i of duplicate){
  if(i===0)continue;
  const id=String(records[i].city.id);let hash=2166136261;
  for(const c of id)hash=Math.imul(hash^c.charCodeAt(0),16777619);
  const angle=(hash>>>0)/4294967296*Math.PI*2;
  records[i].x+=Math.sin(angle)*120;records[i].z+=Math.cos(angle)*120;
 }
 const active=records[0],neighborRecords=records.slice(1);
 let scale=1;
 for(const n of neighborRecords){
  n.distance=Math.hypot(n.x,n.z);
  scale=Math.max(scale,(active.r+n.r+180)/Math.max(.001,n.distance));
 }
 // A single central suburb can overlap the active city without stretching the coastline and all distant places.
 scale=Math.min(2,Math.ceil(scale*1000)/1000);
 const placed=[{x:0,z:0,radius:active.r}],centers=new Map([[active.city.id,placed[0]]]);
 neighborRecords.sort((a,b)=>a.distance-b.distance||String(a.city.id).localeCompare(String(b.city.id)));
 // Resolve nearby footprints along their own bearings. Secondary pairs no longer stretch the entire region.
 for(const n of neighborRecords){
  const ux=n.x/n.distance,uz=n.z/n.distance;
  let distance=n.distance*scale;
  const occupied=[];
  for(const p of placed){
   const offset=p.x*uz-p.z*ux,gap=p.radius+n.r+180;
   if(Math.abs(offset)>=gap)continue;
   const along=p.x*ux+p.z*uz,pad=Math.sqrt(gap*gap-offset*offset);
   if(along+pad>distance)occupied.push([along-pad,along+pad]);
  }
  occupied.sort((a,b)=>a[0]-b[0]);
  for(const [start,end] of occupied){if(distance<start)break;if(distance<end)distance=end;}
  const center={x:ux*distance,z:uz*distance,radius:n.r};
  placed.push(center);centers.set(n.city.id,center);
 }
 return {scale,centers,coincidentCenters:duplicate.size};
}

function projectRoute(route,city,from,start,fromCenter,toCenter,scale){
 const coordinates=from.id===route.a.id?route.path:[...route.path].reverse();
 const points=coordinates.map(([lat,lng])=>{const p=local(city,{lat,lng});return {x:p.x*scale,z:p.z*scale};});
 const first=points[0],last=points.at(-1);
 const shiftFrom={x:fromCenter.x-first.x,z:fromCenter.z-first.z},shiftTo={x:toCenter.x-last.x,z:toCenter.z-last.z};
 const adjusted=points.map((p,i)=>{
  const t=i/(points.length-1),a=Math.max(0,1-t*4),b=Math.max(0,1-(1-t)*4);
  return {x:p.x+shiftFrom.x*a+shiftTo.x*b,z:p.z+shiftFrom.z*a+shiftTo.z*b};
 });
 const gateDistance=Math.hypot(start.x-fromCenter.x,start.z-fromCenter.z);
 if(gateDistance===0)return adjusted;
 // Join the generated junction to the geographic road after it leaves the developed area.
 const direct=Math.hypot(toCenter.x-fromCenter.x,toCenter.z-fromCenter.z)||1;
 const fraction=Math.min(.73,(gateDistance+Math.min(160,direct*.08))/direct);
 const index=fraction*(adjusted.length-1),next=Math.ceil(index),prev=adjusted[Math.floor(index)],after=adjusted[next];
 const blend=index-Math.floor(index),join={x:prev.x+(after.x-prev.x)*blend,z:prev.z+(after.z-prev.z)*blend};
 return [start,join,...adjusted.slice(next+(blend===0?1:0))];
}
function horizonPath(points,radius=47000){
 const path=[];
 for(let i=1;i<points.length;i++){
  const a=points[i-1],b=points[i],dx=b.x-a.x,dz=b.z-a.z,length2=dx*dx+dz*dz;
  if(!length2)continue;
  const dot=a.x*dx+a.z*dz,det=dot*dot-length2*(a.x*a.x+a.z*a.z-radius*radius);
  if(det<0)continue;
  const cut=Math.sqrt(det),start=Math.max(0,(-dot-cut)/length2),end=Math.min(1,(-dot+cut)/length2);
  if(end<=start)continue;
  const n=Math.ceil((end-start)*Math.sqrt(length2)/90);
  for(let j=path.length?1:0;j<=n;j++){const t=start+(end-start)*j/n;path.push({x:a.x+dx*t,z:a.z+dz*t});}
  if(end<1)break;
 }
 return path;
}
function cityPlan(city,cells,atlas,options=null){if(!cells.length)return{roads:[],neighbors:[],cells:[],bounds:{minX:-92,maxX:92,minZ:-46,maxZ:46}};const minCol=Math.min(...cells.map(c=>c.col)),maxCol=Math.max(...cells.map(c=>c.col)),minRow=Math.min(...cells.map(c=>c.row)),maxRow=Math.max(...cells.map(c=>c.row)),bounds={minX:(minCol-.5)*184,maxX:(maxCol+.5)*184,minZ:(minRow-.5)*92,maxZ:(maxRow+.5)*92},roads=[],neighbors=new Map(regionalCities(city,atlas).map(c=>{const p=local(city,c);return[c.id,{city:c,x:p.x,z:p.z,radius:220}];}));
const space=options?.footprintFor?citySpace(city,[...neighbors.values()],bounds,options.footprintFor,options.states):null,spaceScale=space?.scale||1,project=c=>space?.centers.get(c.id)||(()=>{const p=local(city,c);return{x:p.x*spaceScale,z:p.z*spaceScale};})();
if(space)for(const n of neighbors.values()){const p=project(n.city);n.geoX=n.x;n.geoZ=n.z;n.x=p.x;n.z=p.z;n.reservedRadius=p.radius;}
for(const route of regionalRoutes(city,atlas)){let from=route.a,to=route.b;if(to.id===city.id||from.id!==city.id&&delta(city,from).distance>delta(city,to).distance)[from,to]=[to,from];for(const c of [from,to])if(c.id!==city.id){const geographic=local(city,c),p=project(c);if(Math.hypot(geographic.x,geographic.z)<=46000&&!neighbors.has(c.id))neighbors.set(c.id,{city:c,x:p.x,z:p.z,geoX:geographic.x,geoZ:geographic.z,radius:320,reservedRadius:p.radius});}const actualStart=project(from),end=project(to);let start=actualStart,urbanConnection=false;
if(from.id===city.id){const len=Math.hypot(end.x,end.z)||1,ux=end.x/len,uz=end.z/len,cx=(bounds.minX+bounds.maxX)/2,cz=(bounds.minZ+bounds.maxZ)/2;let best=-Infinity;for(const cell of cells)for(const sx of [-.5,.5])for(const sz of [-.5,.5]){const p={x:(cell.col+sx)*184,z:(cell.row+sz)*92},score=p.x*ux+p.z*uz-Math.abs((p.x-cx)*uz-(p.z-cz)*ux)*.01;if(score>best){best=score;start=p;}}urbanConnection=end.x>bounds.minX&&end.x<bounds.maxX&&end.z>bounds.minZ&&end.z<bounds.maxZ;}
const path=horizonPath(projectRoute(route,city,from,start,actualStart,end,spaceScale));if(path.length<2)continue;roads.push({id:route.id,from:from.id,to:to.id,angle:delta(from,to).angle,path,canonical:true,urbanConnection,destination:{...end},route});}
return{roads,neighbors:[...neighbors.values()],cells,bounds,spaceScale,spaceReservations:space?[...space.centers].map(([id,p])=>({id,...p})):[],coincidentCenters:space?.coincidentCenters||0};}
function nearSettlement(x,z,plan,margin=100){if(!plan)return false;if(!plan.neighborSpatial){const grid=new Map();for(const n of plan.neighbors||[]){const k=Math.floor(n.x/1000)+':'+Math.floor(n.z/1000);if(!grid.has(k))grid.set(k,[]);grid.get(k).push(n);}plan.neighborSpatial=grid;}const ix=Math.floor(x/1000),iz=Math.floor(z/1000);for(let a=ix-1;a<=ix+1;a++)for(let b=iz-1;b<=iz+1;b++)for(const n of plan.neighborSpatial.get(a+':'+b)||[])if(Math.hypot(x-n.x,z-n.z)<n.radius+margin)return true;return false;}
function distanceToRoad(x,z,plan){if(plan&&!plan.roadSpatial){const cells=new Map(),size=128;for(const road of plan.roads)for(let i=1;i<road.path.length;i++){const a=road.path[i-1],b=road.path[i],seg={a,b};for(let ix=Math.floor((Math.min(a.x,b.x)-24)/size);ix<=Math.floor((Math.max(a.x,b.x)+24)/size);ix++)for(let iz=Math.floor((Math.min(a.z,b.z)-24)/size);iz<=Math.floor((Math.max(a.z,b.z)+24)/size);iz++){const key=ix+':'+iz;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(seg);}}plan.roadSpatial={size,cells};}let best=Infinity;const segments=plan?.roadSpatial?plan.roadSpatial.cells.get(Math.floor(x/plan.roadSpatial.size)+':'+Math.floor(z/plan.roadSpatial.size))||[]:(plan?.roads||[]).flatMap(r=>r.path.slice(1).map((b,i)=>({a:r.path[i],b})));for(const {a,b}of segments){const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz||1)));best=Math.min(best,Math.hypot(x-a.x-t*dx,z-a.z-t*dz));}return best;}
function draw3D(plan,group,height=()=>0,valid=()=>true,blocked=()=>false){
 if(!plan?.roads.length)return;const T=THREE,surfaces=[],markings=[];
 for(const road of plan.roads){if(road.urbanConnection)continue;const points=[];for(let i=1;i<road.path.length;i++){
  const a=road.path[i-1],b=road.path[i],range=Math.min(Math.hypot(a.x,a.z),Math.hypot(b.x,b.z));
  const step=range<5000?8:range<15000?20:36;
  const n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/step));
  for(let j=0;j<n;j++){const t=j/n;points.push({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t});}
 }points.push(road.path.at(-1));
  const section=(i,width,offset)=>{const p=points[i],a=points[Math.max(0,i-1)],b=points[Math.min(points.length-1,i+1)],length=Math.hypot(b.x-a.x,b.z-a.z)||1,nx=-(b.z-a.z)/length*width*.5,nz=(b.x-a.x)/length*width*.5;return [-1,1].map(side=>{const x=p.x+side*nx,z=p.z+side*nz;return{x,y:Math.max(0,height(x,z))+offset,z};});};
  const quad=(target,a,b)=>{for(const p of [a[0],a[1],b[0],a[1],b[1],b[0]])target.push(p.x,p.y,p.z);};
  const isDry=edges=>edges.every(p=>valid(p.x,p.z));
  let previous=section(0,9,.16),previousDry=isDry(previous);
  for(let i=1;i<points.length;i++){
   const current=section(i,9,.16),currentDry=isDry(current);
   if(previousDry&&currentDry&&!blocked(previous,current)){
    quad(surfaces,previous,current);
    if(i%3===1&&Math.hypot(points[i].x,points[i].z)<7000)quad(markings,section(i-1,.20,.19),section(i,.20,.19));
   }
   previous=current;previousDry=currentDry;
  }
 }
 for(const [positions,color]of [[surfaces,0x474d58],[markings,0xeadfc3]]){if(!positions.length)continue;const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.computeVertexNormals();const mesh=new T.Mesh(geometry,new T.MeshStandardMaterial({color,roughness:.92,polygonOffset:true,polygonOffsetFactor:positions===markings?-2:-1,polygonOffsetUnits:positions===markings?-2:-1}));mesh.receiveShadow=true;mesh.castShadow=false;mesh.userData.intercityRoad=true;group.add(mesh);}
}
let controller,holdNextGraph=false;
function attach({map,L,atlas,getCity,getCells,zoomLevel,getVisibleCities,getIs3D=()=>false}){const layer=L.layerGroup().addTo(map),renderer=L.canvas({padding:.2});let scheduled=false,previousKey=null,previousRoutes=[];function syncGraph(force=false){if(!force&&(getIs3D()||holdNextGraph)&&previousKey!==null){holdNextGraph=false;return previousRoutes;}const nodes=[...new Map([...(getVisibleCities?getVisibleCities():atlas.visible(map.getBounds())).filter(c=>c.geoVerified!==false).slice(0,450),...regionalCities(getCity(),atlas)].map(c=>[c.id,c])).values()];if(!nodes.some(c=>c.id===getCity().id))nodes.push(getCity());if(nodes.length<2){const city=getCity(),near=atlas.visible(boundsFor(city,80000)).filter(c=>c.id!==city.id&&c.geoVerified!==false).sort((a,b)=>delta(city,a).distance-delta(city,b).distance);if(near[0])nodes.push(near[0]);}const key=atlas.byId.size+':'+nodes.map(c=>c.id+':'+c.lat+':'+c.lng).sort().join(';');if(key===previousKey)return previousRoutes;const routes=edges(nodes);const selected=getCity();if(!routes.some(r=>r.a.id===selected.id||r.b.id===selected.id)){const nearby=atlas.visible(boundsFor(selected,80000)).filter(c=>c.id!==selected.id&&c.geoVerified!==false).sort((a,b)=>delta(selected,a).distance-delta(selected,b).distance);for(const c of nearby){const route=safeRoute(selected,c);if(!route)continue;if(!nodes.some(n=>n.id===c.id))nodes.push(c);routes.push(route);break;}}previousKey=key;previousRoutes=routes;activeGraph=new Map(nodes.map(c=>[c.id,[]]));for(const r of routes){activeGraph.get(r.a.id).push(r);activeGraph.get(r.b.id).push(r);}for(const [id,links]of activeGraph)if(links.length)persistentLinks.set(id,links);return routes;}function refresh(){if(scheduled)return;scheduled=true;setTimeout(()=>{scheduled=false;if(getIs3D())return;layer.clearLayers();const zoom=map.getZoom(),city=getCity();if(zoom<4)return;const core=syncGraph(),extra=links(city,atlas).filter(r=>{const other=r.a.id===city.id?r.b:r.a;return !map.getBounds().contains([other.lat,other.lng]);}),routes=[...new Map([...core,...extra].map(r=>[r.id,r])).values()];const bounds=map.getBounds(),markers=getVisibleCities?new Set(getVisibleCities().map(c=>c.id)):null;
const visibleEnd=c=>!markers||markers.has(c.id)||!bounds.contains([c.lat,c.lng]);
const paths=routes.filter(r=>visibleEnd(r.a)&&visibleEnd(r.b)).map(r=>r.path),weight=zoom<7?.8:zoom<9?1.05:1.35;if(paths.length){L.polyline(paths,{renderer,color:'#e5dbc0',weight:weight+1.1,opacity:.75,interactive:false}).addTo(layer);L.polyline(paths,{renderer,color:'#687b76',weight,opacity:.85,interactive:false}).addTo(layer);}if(zoom>=9&&map.getBounds().pad(.15).contains([city.lat,city.lng])){const cells=getCells(),segments=[];for(const c of cells){const x=(c.col-.5)*184,z=(c.row-.5)*92;for(const [a,b]of [[{x,z},{x:x+184,z}],[{x:x+184,z},{x:x+184,z:z+92}],[{x:x+184,z:z+92},{x,z:z+92}],[{x,z:z+92},{x,z}]])segments.push([point(city,a.x,a.z),point(city,b.x,b.z)]);}if(segments.length)L.polyline(segments,{renderer,color:'#596b67',weight:zoom>=11?2:1,opacity:Math.min(.92,.25+(zoom-9)*.3),interactive:false}).addTo(layer);}},60);}map.on('zoomend moveend',refresh);controller={refresh,syncGraph,snapshot:()=>previousRoutes};refresh();return controller;}
window.WorldRoads={citySpace,landPolygons:polygons,delta,local,regionalCities,regionalRoutes,holdGraph(){holdNextGraph=true;},graphSnapshot(){return controller?.snapshot()||[];},point,curve,onLand,safeRoute,links,edges,cityPlan,nearSettlement,distanceToRoad,draw3D,attach,sync(force=false){return controller?.syncGraph(force);},refresh(){controller?.refresh();}};
})();
