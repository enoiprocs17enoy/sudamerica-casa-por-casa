/* Read-only gallery for visitors. Publishing is reserved to the existing verified manager. */
(function(){'use strict';
 const base='https://hqcsecqbwaxwmaleapse.supabase.co',key='sb_publishable_mO8srQB6CO1U8XQkBqK75Q_psYUHrvI',cities=new Map(),pending=new Map();
 const t=k=>ShowcaseCopy.t(k),gt=s=>window.GameI18n?.t(s)||s,idFor=h=>(h.cityId||currentCity.id)+':'+h.id;
 const lawnColors=[0x84ac82,0x72a56b,0x91ad70,0x65936b];
 function clean(s){if(!s||typeof s!=='object'||Array.isArray(s))return{};const out={};for(const [key,max]of [['paint',7],['lawn',3],['points',1000000]])if(Number.isInteger(s[key])&&s[key]>=0&&s[key]<=max)out[key]=s[key];if(typeof s.premium==='boolean')out.premium=s.premium;if(s.garden&&typeof s.garden==='object'){const garden={};for(const item of GARDEN_CATALOG)if(Number.isInteger(s.garden[item.id])&&s.garden[item.id]>=0&&s.garden[item.id]<4)garden[item.id]=s.garden[item.id];out.garden=Object.freeze(garden);}return Object.freeze(out);}
 function styleFor(h){return cities.get(h.cityId||currentCity.id)?.styles.get(h.id);}
 function syncPoints(){for(const h of homes)h.points=scoreOverrides.get(scoreOverrideKey(h.cityId,h.id))??styleFor(h)?.points??demoResidentPoints(h.id-1,h.cityId);}
 async function loadCity(city){if(!city||!/^[a-z0-9][a-z0-9-]{0,79}$/.test(city.id))return;const stored=cities.get(city.id);if(stored&&Date.now()-stored.at<30000){if(currentCity.id===city.id)syncPoints();return;}if(pending.has(city.id))return pending.get(city.id);const task=(async()=>{const abort=new AbortController(),timeout=setTimeout(()=>abort.abort(),3500);try{const styles=new Map();for(let offset=0;offset<5000;offset+=1000){const response=await fetch(base+'/rest/v1/house_presentations?city_id=eq.'+encodeURIComponent(city.id)+'&select=home_id,settings&order=home_id&limit=1000&offset='+offset,{headers:{apikey:key},credentials:'omit',referrerPolicy:'no-referrer',signal:abort.signal});if(!response.ok)throw Error('Gallery unavailable');const rows=await response.json();if(!Array.isArray(rows))throw Error('Invalid gallery');for(const row of rows)if(Number.isInteger(row.home_id)&&row.home_id>=1&&row.home_id<=5000)styles.set(row.home_id,clean(row.settings));if(rows.length<1000)break;}cities.set(city.id,{at:Date.now(),styles});if(cities.size>12)cities.delete(cities.keys().next().value);if(currentCity.id===city.id)syncPoints();}catch{/* The read-only simulated gallery remains usable if the service is unavailable. */}finally{clearTimeout(timeout);pending.delete(city.id);}})();pending.set(city.id,task);return task;}
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const button=(text,action,cls='')=>{const b=el('button',cls,text);b.type='button';b.onclick=action;return b;};
 const dialog=el('dialog','hub-dialog showcase-dialog');dialog.id='showcaseDialog';dialog.dataset.i18nSkip='true';document.body.append(dialog);let current=null,returnFocus=null;
 function close(){if(dialog.open)dialog.close();}
 dialog.addEventListener('close',()=>{
  current=null;
  const trigger=returnFocus;
  returnFocus=null;
  if(trigger?.isConnected)trigger.focus();
 });
 dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const rect=dialog.getBoundingClientRect();
  if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)close();
 });
 function open(kind,title,trigger=document.activeElement){
  if(!dialog.open)returnFocus=trigger;
  current=kind;
  dialog.replaceChildren();
  const exit=button('✕',close,'hub-close');
  exit.setAttribute('aria-label',gt('Chiudi'));
  const heading=el('h2','',title);
  heading.id='showcaseDialogTitle';
  dialog.append(exit,el('p','hub-kicker',t('preview')),heading);
  dialog.setAttribute('aria-labelledby',heading.id);
  if(!dialog.open)dialog.showModal();
  dialog.scrollTop=0;
  exit.focus();
 }
 function officialProfile(){const handle=window.CommunityContact?.instagram;return typeof handle==='string'&&/^[a-zA-Z0-9._]{1,30}$/.test(handle)?'https://www.instagram.com/'+handle+'/':null;}
 function showReference(home){
  const reference=el('div','showcase-reference');
  const handle='@'+home.user;
  const city=home.cityName||currentCity.name;
  const code='#'+String(home.id).padStart(5,'0');
  const details=[handle,city,code].join(' · ');
  const property=el('p','showcase-property');
  property.append(el('bdi','',handle),el('span','',' · '),el('bdi','',city),el('span','',' · '),el('bdi','',code));
  const status=el('span','showcase-copy-status');
  status.setAttribute('role','status');
  const fallback=el('textarea','showcase-copy-field');
  fallback.hidden=true;
  fallback.readOnly=true;
  fallback.value=details;
  fallback.setAttribute('dir','auto');
  fallback.setAttribute('aria-label',t('copy'));
  const copy=button(t('copy'),async()=>{
   try{
    await navigator.clipboard.writeText(details);
    status.textContent=t('copied');
   }catch{
    if(!fallback.isConnected)reference.append(fallback);
    fallback.hidden=false;
    fallback.focus();
    fallback.select();
   }
  },'showcase-copy-button');
  reference.append(property,copy,status);
  dialog.append(reference);
 }
 function openRequest(h=null,trigger){
  open({kind:'request',home:h},t('request_title'),trigger);
  const profile=officialProfile();
  if(!profile){
   const status=el('section','showcase-pending');
   status.append(el('strong','',t('pending')),el('p','',t('pending_note')));
   dialog.append(status);
  }else{
   dialog.append(el('p','',t('request_intro')));
   const steps=el('ol','showcase-steps');
   for(const key of ['step1','step2','step3'])steps.append(el('li','',t(key)));
   dialog.append(steps);
   const link=el('a','showcase-primary',t('instagram'));
   link.href=profile;
   link.target='_blank';
   link.rel='noopener noreferrer';
   dialog.append(link);
  }
  if(h)showReference(h);
  dialog.append(button(gt('Chiudi'),close,'showcase-secondary'));
 }
 function openInfo(){
  open({kind:'info'},SitePrivacy.ui('title'));
  SitePrivacy.render(dialog);
  const link=el('a','showcase-privacy-page-link',SitePrivacy.ui('title'));
  link.href='./privacy.html?lang='+encodeURIComponent(window.GameI18n?.locale||'it');
  const actions=el('div','showcase-actions');
  actions.append(link,button(gt('Chiudi'),close,'showcase-secondary'));
  dialog.append(actions);
 }
 function inputField(form,text,node){const label=el('label','showcase-field');label.append(el('span','',text),node);form.append(label);return node;}
 function openManager(h){if(!window.OwnerAccess?.isOwner())return;open({kind:'manager',home:h},t('manage'));dialog.append(el('p','showcase-property','@'+h.user+' · '+currentCity.name+' · #'+String(h.id).padStart(5,'0')),el('p','',t('manager_note')));const form=el('form','showcase-editor');form.onsubmit=e=>e.preventDefault();dialog.append(form);const paint=el('select');HOUSE_PAINTS.forEach((p,i)=>paint.add(new Option(gt(p.name),i)));paint.value=housePaintIndex(h);inputField(form,gt('Colore della casa'),paint);const lawn=el('select');lawnColors.forEach((n,i)=>lawn.add(new Option((i+1)+' · #'+n.toString(16).padStart(6,'0'),i)));lawn.value=styleFor(h)?.lawn??simulatedChoice(h,'house','lawn',4);inputField(form,gt('Giardino'),lawn);const points=el('input');points.type='number';points.min='0';points.max='1000000';points.step='1';points.value=h.points;inputField(form,gt('Punti esatti per questa casa'),points);const premium=el('input');premium.type='checkbox';premium.checked=isPremiumHouse(h);inputField(form,'Premium',premium);const garden={};for(const item of GARDEN_CATALOG){const picker=el('select');item.options.forEach((name,i)=>picker.add(new Option(gt(name),i)));picker.value=gardenChoice(h,item.id);garden[item.id]=picker;inputField(form,gt(item.label),picker);}const check=el('input');check.type='checkbox';inputField(form,t('verify'),check);const note=el('p','showcase-status');note.setAttribute('role','status');note.setAttribute('aria-live','polite');const save=button(t('save'),()=>void publish(false),'showcase-primary'),reset=button(t('reset'),()=>void publish(true));save.disabled=reset.disabled=true;check.onchange=()=>save.disabled=reset.disabled=!check.checked;form.append(note,save,reset);
  let publishing=false;async function publish(restore){if(publishing||!check.checked||!window.OwnerAccess?.isOwner())return;const value=Number(points.value);if(points.value.trim()===''||!Number.isInteger(value)||value<0||value>1000000){points.reportValidity();return;}const settings=restore?{}:{paint:Number(paint.value),lawn:Number(lawn.value),points:value,premium:premium.checked,garden:Object.fromEntries(Object.entries(garden).map(([key,field])=>[key,Number(field.value)]))};publishing=true;save.disabled=reset.disabled=true;note.textContent='…';try{const result=await window.OwnerAccess.savePresentation({cityId:h.cityId,homeId:h.id,settings});if(!result||result.city_id!==h.cityId||result.home_id!==h.id)throw Error('Invalid result');if(!cities.has(h.cityId))cities.set(h.cityId,{at:Date.now(),styles:new Map()});cities.get(h.cityId).styles.set(h.id,clean(result.settings));const recordKey=scoreOverrideKey(h.cityId,h.id);scoreOverrides.delete(recordKey);colorOverrides.delete(recordKey);designOverrides.delete(recordKey);for(const item of GARDEN_CATALOG)gardenChoices.delete(recordKey+':'+item.id);syncPoints();if(active)await rebuild();note.textContent=t('saved');showOwnerCard(h,'casa');}catch{note.textContent=t('save_error');}finally{publishing=false;save.disabled=reset.disabled=!check.checked;}}
 }
 function mountCard(h,kind,target){
  if(kind!=='casa')return;
  const profile=officialProfile();
  const section=el('section','showcase-request-card');
  section.dataset.i18nSkip='true';
  section.append(el('strong','',t(profile?'request_title':'pending')),el('p','',t(profile?'request_intro':'pending_note')));
  const actions=el('div','showcase-actions');
  actions.append(button(t('request'),event=>openRequest(h,event?.currentTarget),profile?'showcase-primary':'showcase-copy-button'));
  if(window.OwnerAccess?.isOwner())actions.append(button(t('manage'),()=>openManager(h),'showcase-manager'));
  section.append(actions);
  target.append(section);
 }
 window.HouseShowcase=Object.freeze({loadCity,styleFor,mountCard});window.ShowcaseUI=Object.freeze({t,openRequest,openInfo});
 window.GameI18n?.onChange(()=>{const next=current;if(next?.kind==='request')openRequest(next.home);else if(next?.kind==='info')openInfo();});
 if(typeof active!=='undefined'&&active)void loadCity(currentCity).then(()=>rebuild());
})();
