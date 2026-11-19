/* Vector-tile geometry reader, MVT 2.1. Data: OpenStreetMap / OpenFreeMap / OpenMapTiles. */
(function(){
class Reader{constructor(bytes){this.b=bytes;this.p=0;this.end=bytes.length;}v(){let n=0,m=1;while(this.p<this.end){const c=this.b[this.p++];n+=(c&127)*m;if(c<128)return n;m*=128;if(m>2**56)throw Error('varint overflow');}throw Error('truncated');}bytes(){const n=this.v(),b=this.b.subarray(this.p,this.p+n);this.p+=n;if(this.p>this.end)throw Error('truncated bytes');return b;}str(){return new TextDecoder().decode(this.bytes());}skip(w){if(w===0)this.v();else if(w===1)this.p+=8;else if(w===2)this.bytes();else if(w===5)this.p+=4;else throw Error('wire type');}}
function packed(bytes){const r=new Reader(bytes),out=[];while(r.p<r.end)out.push(r.v());return out;}
function value(bytes){const r=new Reader(bytes);let out;while(r.p<r.end){const k=r.v(),f=k>>3,w=k&7;if(f===1)out=r.str();else if(f===2){out=new DataView(r.b.buffer,r.b.byteOffset+r.p,4).getFloat32(0,true);r.p+=4;}else if(f===3){out=new DataView(r.b.buffer,r.b.byteOffset+r.p,8).getFloat64(0,true);r.p+=8;}else if(f===6){const n=r.v();out=n%2?-(n+1)/2:n/2;}else if([4,5,7].includes(f))out=r.v();else r.skip(w);}return out;}
function geometry(data){let x=0,y=0,i=0,paths=[],path;while(i<data.length){const v=data[i++],cmd=v&7,count=v>>3;if(cmd===7){if(path&&path.length)path.push([...path[0]]);continue;}if(cmd!==1&&cmd!==2)throw Error('invalid geom command');for(let n=0;n<count;n++){const dx=data[i++],dy=data[i++];x+=dx%2?-(dx+1)/2:dx/2;y+=dy%2?-(dy+1)/2:dy/2;if(cmd===1){path=[];paths.push(path);}path.push([x,y]);}}return paths;}
function decodeTile(bytes){const r=new Reader(bytes),layers={};while(r.p<r.end){const k=r.v();if(k>>3!==3){r.skip(k&7);continue;}const lr=new Reader(r.bytes()),keys=[],values=[],features=[];let name='',extent=4096;while(lr.p<lr.end){const t=lr.v(),f=t>>3,w=t&7;if(f===1)name=lr.str();else if(f===2)features.push(lr.bytes());else if(f===3)keys.push(lr.str());else if(f===4)values.push(value(lr.bytes()));else if(f===5)extent=lr.v();else lr.skip(w);}layers[name]={extent,features:features.map(bytes=>{const fr=new Reader(bytes);let id=0,type=0,tags=[],coords=[];while(fr.p<fr.end){const t=fr.v(),f=t>>3,w=t&7;if(f===1)id=fr.v();else if(f===2)tags=packed(fr.bytes());else if(f===3)type=fr.v();else if(f===4)coords=packed(fr.bytes());else fr.skip(w);}const props={};for(let i=0;i<tags.length;i+=2)props[keys[tags[i]]]=values[tags[i+1]];return{id,type,props,paths:geometry(coords)};})};}return layers;}
const GRID=16384;
const squareWords=/(?:^|[^\p{L}])(?:plaza|plazoleta|praca|pracinha|largo|square|piazza|piazzale|piazzetta|platz|marktplatz|rathausplatz|stadtplatz|plac|plein|torg|torget|piata|ter|sheshi?|meydani?|quang truong|πλατεια|площадь|площа|հրապարակ|მოედანი|ساحة|ميدان)(?:$|[^\p{L}])|^place\s|广场|廣場|広場|광장|चौक|จัตุรัส/iu;
const parkWords=/(?:^|[^\p{L}])(?:park|parque|parc|parco|jardin|jardim|garten|ogrod|puisto|volksgarten|парк|حديقة)(?:$|[^\p{L}])|公园|公園|공원/iu;
const centralWords=/armas|mayor|central|principal|matriz|bolivar|independen|town hall|markt|municipal|市民|中央|централ|الاستقلال/iu;
const pedestrian=/^(?:path|pedestrian|footway|steps|corridor)$/i;
const publicPolygon=/^(?:park|garden|square|town_square|village_green|recreation_ground|pedestrian)$/i;
const parkPolygon=/^(?:park|garden|village_green)$/i;
const privateName=/shopping|\bmall\b|centro comercial|supermarket|parking garage|hotel\b|hotelier|business park/i;
const normalize=name=>String(name||'').normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase();
const area=ring=>Math.abs(ring.reduce((sum,p,i)=>{const q=ring[(i+1)%ring.length];return sum+p[0]*q[1]-q[0]*p[1];},0)/2);
const same=(a,b)=>Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])<.001;
const westEast=city=>(city.lng+180)/360*GRID;
const northSouth=city=>(1-Math.asinh(Math.tan(city.lat*Math.PI/180))/Math.PI)/2*GRID;
function osm(id){
 const type=['','node','way','relation'][id%10],key=Math.floor(id/10);
 return Number.isSafeInteger(id)&&key>0&&type?{id:type+':'+key,source:'https://www.openstreetmap.org/'+type+'/'+key}:null;
}
function bounds(ring){
 return ring.reduce(([minX,minY,maxX,maxY],[x,y])=>[Math.min(minX,x),Math.min(minY,y),Math.max(maxX,x),Math.max(maxY,y)],[Infinity,Infinity,-Infinity,-Infinity]);
}
function inside([x,y],ring,boundary=false){
 let yes=false;
 for(let i=0,j=ring.length-1;i<ring.length;j=i++){
  const a=ring[j],b=ring[i],dx=b[0]-a[0],dy=b[1]-a[1];
  if(boundary&&x>=Math.min(a[0],b[0])&&x<=Math.max(a[0],b[0])&&y>=Math.min(a[1],b[1])&&y<=Math.max(a[1],b[1])&&Math.abs((x-a[0])*dy-(y-a[1])*dx)<.001)return true;
  if((a[1]>y)!==(b[1]>y)&&x<a[0]+(y-a[1])*dx/dy)yes=!yes;
 }
 return yes;
}
function clippedWalkway(line,ring,holes){
 const paths=[],edges=[ring,...holes].flatMap(path=>path.slice(1).map((end,i)=>[path[i],end]));
 let run=[];
 const flush=()=>{if(run.length>1)paths.push(run);run=[];};
 for(let i=1;i<line.length;i++){
  const a=line[i-1],b=line[i],dx=b[0]-a[0],dy=b[1]-a[1],cuts=[0,1];
  if(same(a,b))continue;
  for(const [p,q] of edges){
   const ex=q[0]-p[0],ey=q[1]-p[1],d=dx*ey-dy*ex;
   if(Math.abs(d)<.001)continue;
   const ex0=p[0]-a[0],ey0=p[1]-a[1],t=(ex0*ey-ey0*ex)/d,u=(ex0*dy-ey0*dx)/d;
   if(t>0&&t<1&&u>=0&&u<=1)cuts.push(t);
  }
  cuts.sort((u,v)=>u-v);
  const at=t=>[a[0]+t*dx,a[1]+t*dy];
  for(let j=1;j<cuts.length;j++){
   if(cuts[j]-cuts[j-1]<.0001)continue;
   const mid=at((cuts[j]+cuts[j-1])/2);
   if(!inside(mid,ring,true)||holes.some(hole=>inside(mid,hole))){flush();continue;}
   const start=at(cuts[j-1]),end=at(cuts[j]);
   if(run.length&&!same(run.at(-1),start))flush();
   if(!run.length)run.push(start);
   run.push(end);
  }
 }
 flush();return paths;
}
function select(city,layers,tile){
 const extent=layers.poi?.extent||Object.values(layers)[0]?.extent||4096;
 const worldX=westEast(city)-tile.x,cx=(worldX-GRID*Math.round(worldX/GRID))*extent,cy=(northSouth(city)-tile.y)*extent;
 const mpu=40075016.686*Math.cos(city.lat*Math.PI/180)/GRID/extent;
 const features=name=>{
  const layer=layers[name];
  if(!layer)return [];
  if(layer.extent===extent)return layer.features;
  const ratio=extent/layer.extent;
  return layer.features.map(feature=>({...feature,paths:feature.paths.map(path=>path.map(([x,y])=>[x*ratio,y*ratio]))}));
 };
 const polygons=[],byId=new Map();
 for(const layer of ['park','landuse','landcover','transportation'])for(const f of features(layer)){
  if(f.type!==3||!osm(f.id))continue;
  const item={f,layer};polygons.push(item);
  if(!byId.has(f.id))byId.set(f.id,item);
 }
 const candidates=new Map();
 const nominate=(item,name,pointLabel=false)=>{
  if(typeof name!=='string'||!name.trim()||name.length>160)return;
  const text=normalize(name),{f,layer}=item,properties=f.props||{};
  if(privateName.test(text))return;
  const square=squareWords.test(text)||squareWords.test(name)||properties.class==='square'||properties.subclass==='town_square';
  const namedPark=parkWords.test(text)||parkWords.test(name);
  const park=parkPolygon.test(properties.class||'')||parkPolygon.test(properties.subclass||'')||namedPark;
  if(!square&&!park)return;
  const civic=publicPolygon.test(properties.class||'')||publicPolygon.test(properties.subclass||'')
    ||layer==='park'&&(square||namedPark)&&!/^(?:historic|zoo|cemetery|archaeological_site|ruins|fort)$/i.test(properties.class||'')
    ||layer==='transportation'&&square&&pedestrian.test(properties.class||'');
  const associatedGrass=pointLabel&&square&&layer==='landcover'&&properties.class==='grass';
  if(!civic&&!associatedGrass)return;
  const rings=f.paths.filter(r=>r.length>=4&&r.length<=1200&&same(r[0],r.at(-1))).sort((a,b)=>area(b)-area(a));
  const ring=rings[0];if(!ring)return;
  const scaleArea=area(ring)*mpu*mpu,[x,y,X,Y]=bounds(ring);
  // Tiles that cut an outline are skipped instead of supplying an invented edge.
  if(scaleArea<100||scaleArea>250000||x<=1||y<=1||X>=extent-1||Y>=extent-1) return;
  const centre=[(x+X)/2,(y+Y)/2],range=Math.hypot(centre[0]-cx,centre[1]-cy)*mpu;
  const central=centralWords.test(text);
  if(range>(square?2700:1500))return;
  const selectionScore=(square?2600:900)+(central?650:0)-range;
  const holes=rings.slice(1).filter(r=>r.every(p=>inside(p,ring,true)));
  if(rings.length>1&&holes.length!==rings.length-1)return;
  const candidate={f,ring,holes,centre,name:name.trim(),square,park,selectionScore};
  if(!candidates.has(f.id)||candidates.get(f.id).selectionScore<selectionScore)candidates.set(f.id,candidate);
 };
 for(const item of polygons)nominate(item,item.f.props?.name);
 const poi=features('poi');
 for(const f of poi){
  const item=byId.get(f.id);
  if(f.type===1&&item)nominate(item,f.props?.name,true);
 }
 const chosen=[...candidates.values()].sort((a,b)=>b.selectionScore-a.selectionScore||a.f.id-b.f.id)[0];
 if(!chosen)return null;
 const {f,ring,holes,centre,name,square,park,selectionScore}=chosen,link=osm(f.id);
 const convert=path=>path.map(([x,y])=>({x:Math.round((x-centre[0])*mpu*100)/100,z:Math.round((y-centre[1])*mpu*100)/100}));
 const contains=p=>inside(p,ring,true)&&!holes.some(hole=>inside(p,hole));
 const surfaces=[],walkwayDetails=[],landmarks=[],trees=[],benches=[];
 const transport=features('transportation');
 for(const [layer,items] of [['landcover',features('landcover')],['transportation',transport],['water',features('water')]]){
  for(const feature of items){
   if(feature.type!==3||feature.id===f.id)continue;
   if(layer==='landcover'&&feature.props.class!=='grass'||layer==='transportation'&&!pedestrian.test(feature.props.class||''))continue;
   const bounded=feature.paths.filter(p=>p.length>=4&&p.length<=1200&&p.every(contains));
   if(bounded.length)surfaces.push({kind:layer==='landcover'?'lawn':layer==='water'?'water':'paving',rings:bounded.map(convert)});
  }
 }
 for(const feature of transport){
  if(feature.type!==2||!pedestrian.test(feature.props.class||''))continue;
  for(const line of feature.paths){
   if(!line?.length)continue;
   const [x,y,X,Y]=bounds(line),[rx,ry,rX,rY]=bounds(ring);
   if(X<rx||x>rX||Y<ry||y>rY)continue;
   for(const run of clippedWalkway(line,ring,holes)){
    walkwayDetails.push({points:convert(run),surface:feature.props.surface,widthMeters:Number(feature.props.width)||undefined});
   }
  }
 }
 for(const feature of poi){
  const point=feature.paths[0]?.[0],props=feature.props;
  if(feature.type!==1||!point||!contains(point))continue;
  if(props.class==='tree'||props.subclass==='tree'){trees.push(convert([point])[0]);continue;}
  if(props.class==='bench'||props.subclass==='bench'){benches.push(convert([point])[0]);continue;}
  const source=osm(feature.id);
  if(!source||!['monument','artwork','fountain'].includes(props.class)&&props.subclass!=='fountain')continue;
  const label=props.name||'Opera mappata',position=convert([point])[0];
  const model=window.SquareDetails?.classify(label,props)||(props.class==='fountain'||props.subclass==='fountain'?'fountain':'unclassified');
  landmarks.push({...source,name:label,...position,model,kind:model==='fountain'?'fountain':'artwork',status:model==='unclassified'?'needs-model':'mapped-archetype'});
 }
 return {name,base:park&&!square?'lawn':'paving',outline:convert(ring),holes:holes.map(convert),surfaces,paths:walkwayDetails.map(route=>route.points),walkwayDetails,trees,benches,landmarks,detailSchema:2,
  source:link.source,documented:true,realGeometry:true,layout:'survey',selection:'central-square-candidate',selectionScore,geometrySource:'OpenFreeMap / OpenMapTiles / OpenStreetMap'};
}
let metadata;
async function resolve(city){
 if(!Number.isFinite(city.lat)||!Number.isFinite(city.lng)||Math.abs(city.lat)>85||Math.abs(city.lng)>180)return null;
 if(!metadata)metadata=fetch('https://tiles.openfreemap.org/planet/latest',{signal:AbortSignal.timeout(8000)}).then(r=>{if(!r.ok)throw Error('Map metadata unavailable');return r.json();}).catch(e=>{metadata=null;throw e;});
 const meta=await metadata,gx=westEast(city),gy=northSouth(city),x=Math.floor(gx),y=Math.floor(gy),east=gx-x<.5?-1:1,south=gy-y<.5?-1:1;
 const read=async(dx,dy)=>{
  const tile={x:(x+dx+GRID)%GRID,y:y+dy};
  if(tile.y<0||tile.y>=GRID)return null;
  const url=meta.tiles[0].replace('{z}',14).replace('{x}',tile.x).replace('{y}',tile.y);
  const response=await fetch(url,{signal:AbortSignal.timeout(6500)});
  return response.ok?select(city,decodeTile(new Uint8Array(await response.arrayBuffer())),tile):null;
 };
 const main=await read(0,0).catch(()=>null);
 if(main?.selectionScore>=2650)return main;
 const nearby=await Promise.allSettled([read(east,0),read(0,south),read(east,south)]);
 return [main,...nearby.map(result=>result.status==='fulfilled'?result.value:null)].filter(Boolean).sort((a,b)=>b.selectionScore-a.selectionScore)[0]||null;
}
window.PlazaMapResolver={resolve,select,decodeTile};

})();
