/* Vector-tile geometry reader, MVT 2.1. Data: OpenStreetMap / OpenFreeMap / OpenMapTiles. */
(function(){
class Reader{constructor(bytes){this.b=bytes;this.p=0;this.end=bytes.length;}v(){let n=0,m=1;while(this.p<this.end){const c=this.b[this.p++];n+=(c&127)*m;if(c<128)return n;m*=128;if(m>2**56)throw Error('varint overflow');}throw Error('truncated');}bytes(){const n=this.v(),b=this.b.subarray(this.p,this.p+n);this.p+=n;if(this.p>this.end)throw Error('truncated bytes');return b;}str(){return new TextDecoder().decode(this.bytes());}skip(w){if(w===0)this.v();else if(w===1)this.p+=8;else if(w===2)this.bytes();else if(w===5)this.p+=4;else throw Error('wire type');}}
function packed(bytes){const r=new Reader(bytes),out=[];while(r.p<r.end)out.push(r.v());return out;}
function value(bytes){const r=new Reader(bytes);let out;while(r.p<r.end){const k=r.v(),f=k>>3,w=k&7;if(f===1)out=r.str();else if(f===2){out=new DataView(r.b.buffer,r.b.byteOffset+r.p,4).getFloat32(0,true);r.p+=4;}else if(f===3){out=new DataView(r.b.buffer,r.b.byteOffset+r.p,8).getFloat64(0,true);r.p+=8;}else if(f===6){const n=r.v();out=n%2?-(n+1)/2:n/2;}else if([4,5,7].includes(f))out=r.v();else r.skip(w);}return out;}
function geometry(data){let x=0,y=0,i=0,paths=[],path;while(i<data.length){const v=data[i++],cmd=v&7,count=v>>3;if(cmd===7){if(path&&path.length)path.push([...path[0]]);continue;}if(cmd!==1&&cmd!==2)throw Error('invalid geom command');for(let n=0;n<count;n++){const dx=data[i++],dy=data[i++];x+=dx%2?-(dx+1)/2:dx/2;y+=dy%2?-(dy+1)/2:dy/2;if(cmd===1){path=[];paths.push(path);}path.push([x,y]);}}return paths;}
function decodeTile(bytes){const r=new Reader(bytes),layers={};while(r.p<r.end){const k=r.v();if(k>>3!==3){r.skip(k&7);continue;}const lr=new Reader(r.bytes()),keys=[],values=[],features=[];let name='',extent=4096;while(lr.p<lr.end){const t=lr.v(),f=t>>3,w=t&7;if(f===1)name=lr.str();else if(f===2)features.push(lr.bytes());else if(f===3)keys.push(lr.str());else if(f===4)values.push(value(lr.bytes()));else if(f===5)extent=lr.v();else lr.skip(w);}layers[name]={extent,features:features.map(bytes=>{const fr=new Reader(bytes);let id=0,type=0,tags=[],coords=[];while(fr.p<fr.end){const t=fr.v(),f=t>>3,w=t&7;if(f===1)id=fr.v();else if(f===2)tags=packed(fr.bytes());else if(f===3)type=fr.v();else if(f===4)coords=packed(fr.bytes());else fr.skip(w);}const props={};for(let i=0;i<tags.length;i+=2)props[keys[tags[i]]]=values[tags[i+1]];return{id,type,props,paths:geometry(coords)};})};}return layers;}


const area=ring=>Math.abs(ring.reduce((sum,p,i)=>{const q=ring[(i+1)%ring.length];return sum+p[0]*q[1]-q[0]*p[1];},0)/2);
function inside(p,ring){let yes=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
function select(city,layers,tile){
 const extent=layers.poi?.extent||4096,n=16384,cx=((city.lng+180)/360*n-tile.x)*extent,cy=((1-Math.asinh(Math.tan(city.lat*Math.PI/180))/Math.PI)/2*n-tile.y)*extent,mpu=40075016.686*Math.cos(city.lat*Math.PI/180)/n/extent;
 const candidates=(layers.poi?.features||[]).filter(f=>f.type===1&&f.props.name&&/plaza|praça|praca|largo|square|parque|park/i.test(f.props.name)&&['park','attraction'].includes(f.props.class));
 candidates.forEach(f=>{const p=f.paths[0][0];f.score=(/armas|mayor|central|principal|matriz|bol[ií]var|independ[eê]ncia/i.test(f.props.name)?350:0)-Math.hypot(p[0]-cx,p[1]-cy)*mpu;});candidates.sort((a,b)=>b.score-a.score);
 for(const f of candidates){
  let parent;for(const layer of ['landcover','landuse','park','transportation']){parent=layers[layer]?.features.find(p=>p.id===f.id&&p.type===3);if(parent)break;}
  if(!parent)continue;const rings=parent.paths.filter(r=>r.length>=4).sort((a,b)=>area(b)-area(a));const ring=rings[0];if(!ring||area(ring)*mpu*mpu<100||area(ring)*mpu*mpu>300000)continue;
  if(ring.some(p=>p[0]<0||p[1]<0||p[0]>extent||p[1]>extent))continue;
  const centre=[(Math.min(...ring.map(p=>p[0]))+Math.max(...ring.map(p=>p[0])))/2,(Math.min(...ring.map(p=>p[1]))+Math.max(...ring.map(p=>p[1])))/2];
  const convert=path=>path.map(p=>({x:(p[0]-centre[0])*mpu,z:(p[1]-centre[1])*mpu})),surfaces=[],paths=[];
  for(const lname of ['landcover','transportation','water'])for(const feature of layers[lname]?.features||[]){if(feature.type!==3||feature.id===f.id)continue;if(lname==='landcover'&&feature.props.class!=='grass'||lname==='transportation'&&feature.props.class!=='path')continue;const filtered=feature.paths.filter(p=>p.length>=4&&p.every(v=>inside(v,ring)));if(filtered.length)surfaces.push({kind:lname==='landcover'?'lawn':lname==='water'?'water':'paving',rings:filtered.map(convert)});}
  for(const feature of layers.transportation?.features||[]){if(feature.type!==2||feature.props.class!=='path')continue;for(const line of feature.paths){let part=[];for(const p of line){if(inside(p,ring))part.push(p);else{if(part.length>1)paths.push(convert(part));part=[];}}if(part.length>1)paths.push(convert(part));}}
  const landmarks=[];
  for(const poi of layers.poi?.features||[]){
   if(poi.type!==1||!['monument','artwork','fountain'].includes(poi.props.class)&&poi.props.subclass!=='fountain')continue;
   const point=poi.paths[0]?.[0];if(!point||!inside(point,ring))continue;
   const position=convert([point])[0],name=poi.props.name||'Opera mappata';
   const model=window.SquareDetails?.classify(name,poi.props)||(poi.props.subclass==='fountain'?'fountain':'unclassified');
   const type=poi.id%10===3?'relation':poi.id%10===2?'way':'node',id=Math.floor(poi.id/10);
   landmarks.push({id:type+':'+id,name,...position,model,kind:model==='fountain'?'fountain':'artwork',status:model==='unclassified'?'needs-model':'mapped-archetype',source:'https://www.openstreetmap.org/'+type+'/'+id});
  }
  return {landmarks,detailSchema:2,name:f.props.name,base:parent.props.class==='grass'?'lawn':'paving',outline:convert(ring),holes:rings.slice(1).map(convert),surfaces,paths,source:'https://www.openstreetmap.org/'+(f.id%10===3?'relation':f.id%10===2?'way':'node')+'/'+Math.floor(f.id/10),documented:true,realGeometry:true,layout:'survey',selection:'central-square-candidate'};
 }
 return null;
}
let metadata;
async function resolve(city){
 if(!Number.isFinite(city.lat)||!Number.isFinite(city.lng)||Math.abs(city.lat)>85||Math.abs(city.lng)>180)return null;
 if(!metadata)metadata=fetch('https://tiles.openfreemap.org/planet/latest',{signal:AbortSignal.timeout(8000)}).then(r=>{if(!r.ok)throw Error('Map metadata unavailable');return r.json();}).catch(e=>{metadata=null;throw e;});
 const meta=await metadata,n=16384,gx=(city.lng+180)/360*n,gy=(1-Math.asinh(Math.tan(city.lat*Math.PI/180))/Math.PI)/2*n,x=Math.floor(gx),y=Math.floor(gy);
 const offsets=[[0,0],[gx-x<.5?-1:1,0],[0,gy-y<.5?-1:1]];
 for(const [dx,dy]of offsets){const tile={x:x+dx,y:y+dy};const url=meta.tiles[0].replace('{z}',14).replace('{x}',tile.x).replace('{y}',tile.y);const response=await fetch(url,{signal:AbortSignal.timeout(8000)});if(!response.ok)continue;const square=select(city,decodeTile(new Uint8Array(await response.arrayBuffer())),tile);if(square)return square;}
 return null;
}
window.PlazaMapResolver={resolve,select,decodeTile};

})();
