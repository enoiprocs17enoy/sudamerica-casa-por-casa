(function(){
/* Localization core shared by DOM labels and Three.js canvas labels.
   Catalogues are reviewed static assets; no translation requests at runtime. */
function createTranslator(locale,catalog={}){
 const messages=catalog.messages||{},patterns=(catalog.templates||[]).map(({source,target,translateSlots=[]})=>{
  const slots=[];let cursor=0,pattern='^';for(const match of source.matchAll(/\{([A-Za-z][A-Za-z0-9_]*)\}/g)){const numeric=['count','points','level','total','floors','id','shops','facilities','reached'].includes(match[1]);pattern+=escape(source.slice(cursor,match.index))+(numeric?'([\\p{N}.,\\u00a0\\u202f\\u066b\\u066c\\u200e\\u200f\\u061c\\u2019\\u0027 ]+)':'(.+?)');slots.push(match[1]);cursor=match.index+match[0].length;}pattern+=escape(source.slice(cursor))+'$';return {regexp:new RegExp(pattern,'u'),slots,target,translateSlots};
 });
 function escape(text){return text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
 const number=new Intl.NumberFormat(locale),plainNumber=new Intl.NumberFormat(locale,{useGrouping:false}),plural=new Intl.PluralRules(locale),parts=number.formatToParts(12345.6),group=parts.find(part=>part.type==='group')?.value,decimal=parts.find(part=>part.type==='decimal')?.value||'.',digits=new Map(Array.from({length:10},(_,i)=>[plainNumber.format(i),String(i)]));
 function numeric(value){let text=String(value).trim();for(const [digit,ascii]of digits)text=text.replaceAll(digit,ascii);if(group)text=text.replaceAll(group,'');text=text.replaceAll(decimal,'.').replace(/[\s\u061c\u200e\u200f]/g,'');return Number(text);}
 function render(target,values,numbers){if(Array.isArray(target))return target.map(part=>render(part,values,numbers)).join('');if(target&&typeof target==='object'){const form=plural.select(numbers[target.plural]);return render(target.forms[form]??target.forms.other,values,numbers);}return String(target).replace(/\{([A-Za-z][A-Za-z0-9_]*)\}/g,(token,key)=>values[key]??token);}
 function translate(value,depth=0){const text=String(value??''),trimmed=text.trim();if(!trimmed)return text;
  let result=Object.hasOwn(messages,trimmed)?messages[trimmed]:null;
  if(result===null)for(const {regexp,slots,target,translateSlots}of patterns){const match=regexp.exec(trimmed);if(!match)continue;const values={},numbers={};slots.forEach((key,i)=>{const raw=match[i+1];numbers[key]=numeric(raw);values[key]=translateSlots.includes(key)&&Object.hasOwn(messages,raw)?messages[raw]:raw;if(['count','points','level','total','floors'].includes(key)&&/^\p{N}+$/u.test(raw.trim())&&Number.isFinite(numbers[key]))values[key]=(['level','total','floors'].includes(key)?plainNumber:number).format(numbers[key]);});result=render(target,values,numbers);break;}
  if(result===null&&depth===0&&trimmed.includes(' · '))result=trimmed.split(' · ').map(part=>translate(part,1)).join(' · ');
  if(result===null&&depth<3){const prefix=/^([^\p{L}\p{N}]+?\s+)([\s\S]+)$/u.exec(trimmed);if(prefix)result=prefix[1]+translate(prefix[2],depth+1);}
  return result===null?text:text.slice(0,text.indexOf(trimmed))+result+text.slice(text.indexOf(trimmed)+trimmed.length);
 }
 const script=new Intl.Locale(locale).maximize().script;
 function recognizes(value,depth=0){const text=String(value).trim();if(Object.hasOwn(messages,text)||patterns.some(pattern=>pattern.regexp.test(text)))return true;if(depth===0&&text.includes(' · '))return text.split(' · ').every(part=>recognizes(part,1));if(depth<3){const prefix=/^([^\p{L}\p{N}]+?\s+)([\s\S]+)$/u.exec(text);if(prefix)return recognizes(prefix[2],depth+1);}return false;}
 return {locale,translate,recognizes,number:value=>number.format(value),plural:(count,forms)=>forms[plural.select(count)]??forms.other,dir:['Arab','Hebr','Syrc','Thaa','Nkoo','Adlm','Rohg','Mand','Samr'].includes(script)?'rtl':'ltr'};
}

/* Translate UI text without replacing markup, handlers, values or proper names. */
function bindTranslation(root,getTranslator,{onMissing=()=>{},skipSelector='script,style,noscript,code,pre,textarea,[data-i18n-skip],#worldCountry,#citySelect,#cityLabel,#currentCityName,#loadingPlace,.regional-city-labels,#username'}={}){
 const textSources=new WeakMap(),attributeSources=new WeakMap(),pending=new Set();let scheduled=false,disposed=false;
 const skip=node=>!node||!!node.closest?.(skipSelector);
 function text(node){if(skip(node.parentElement)||!node.data.trim())return;const previous=textSources.get(node),source=previous&&node.data===previous.rendered?previous.source:node.data;const rendered=getTranslator().translate(source);textSources.set(node,{source,rendered});if(node.data!==rendered)node.data=rendered;if(/[\p{L}]/u.test(source))onMissing(source,node);}
 function attributes(element){if(skip(element))return;let sources=attributeSources.get(element);if(!sources){sources=new Map();attributeSources.set(element,sources);}for(const name of ['title','aria-label','placeholder']){if(!element.hasAttribute(name))continue;const value=element.getAttribute(name),previous=sources.get(name),source=previous&&value===previous.rendered?previous.source:value,rendered=getTranslator().translate(source);sources.set(name,{source,rendered});if(value!==rendered)element.setAttribute(name,rendered);if(/[\p{L}]/u.test(source))onMissing(source,{parentElement:element});}}
 function walk(node){if(node.nodeType===3){text(node);return;}if(node.nodeType!==1||skip(node))return;attributes(node);for(const element of node.querySelectorAll('[title],[aria-label],[placeholder]'))attributes(element);const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);let next;while(next=walker.nextNode())text(next);}
 const options={subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','aria-label','placeholder']};
 function flush(){scheduled=false;if(disposed)return;observer.disconnect();try{const roots=[...pending];pending.clear();for(const node of roots){if(node!==root&&!node.isConnected)continue;if(roots.some(parent=>parent!==node&&parent.contains?.(node)))continue;walk(node);}}finally{observer.observe(root,options);}}
 function queue(node){if(disposed)return;pending.add(node);if(!scheduled){scheduled=true;requestAnimationFrame(flush);}}
 const observer=new MutationObserver(records=>{for(const record of records){if(record.type==='childList'){for(const node of record.addedNodes)queue(node);}else queue(record.target);}});
 observer.observe(root,options);queue(root);
 return {refresh:()=>queue(root),dispose:()=>{disposed=true;observer.disconnect();pending.clear();}};
}

(function(){'use strict';
 const revision='9.4.0-i18n8',review=document.documentElement.dataset.i18nReview==='true',cache=new Map(),listeners=new Set(),auditors=new Set(),missing=new Set();
 const italian={
  "locale":"it",
  "name":"Italiano",
  "reviewStatus":"source",
  "messages":{
    "Zoom in":"Avvicina",
    "Zoom out":"Allontana",
    "A JavaScript library for interactive maps":"Una libreria per mappe interattive"
  },
  "templates":[
    {"source":"{count} case","target":{"plural":"count","forms":{"one":"{count} casa","other":"{count} case"}}},
    {"source":"{points} punti","target":{"plural":"points","forms":{"one":"{points} punto","other":"{points} punti"}}},
    {"source":"⭐ {points} punti","target":{"plural":"points","forms":{"one":"⭐ {points} punto","other":"⭐ {points} punti"}}},
    {"source":"{count} risultati","target":{"plural":"count","forms":{"one":"{count} risultato","other":"{count} risultati"}}},
    {"source":"{count} mongolfiere","target":{"plural":"count","forms":{"one":"{count} mongolfiera","other":"{count} mongolfiere"}}},
    {"source":"🏗️ {tier} · {floors} piani","target":{"plural":"floors","forms":{"one":"🏗️ {tier} · {floors} piano","other":"🏗️ {tier} · {floors} piani"}}},
    {"source":"{count} CASE","target":{"plural":"count","forms":{"one":"{count} CASA","other":"{count} CASE"}}}
  ]
}
;
 let translator=createTranslator('it',italian),displayNames=null,manifest=null,select=null,binding=null,generation=0;
 const country=(code,fallback='')=>{if(!code)return fallback;try{return displayNames?.of(code)||fallback||code;}catch{return fallback||code;}};
 const api={get locale(){return translator.locale;},get dir(){return translator.dir;},t:value=>translator.translate(value),number:(value,options)=>new Intl.NumberFormat(translator.locale,options).format(value),country,onChange:listener=>{listeners.add(listener);return()=>listeners.delete(listener);},registerAudit:listener=>{if(review)auditors.add(listener);},setLocale,diagnostics:()=>({locale:translator.locale,untranslated:[...missing].sort(),scene:review?[...auditors].map(audit=>audit()):[]})};
 window.GameI18n=Object.freeze(api);
 function notify(text){let node=document.getElementById('languageNotice');if(!node){node=document.createElement('p');node.id='languageNotice';node.setAttribute('role','status');document.body.append(node);}node.textContent=text;clearTimeout(notify.timer);notify.timer=setTimeout(()=>{node.remove();},6000);}
 async function catalogue(code){if(code==='it')return italian;if(cache.has(code))return cache.get(code);const response=await fetch('locales/'+encodeURIComponent(code)+'.json?v='+revision);if(!response.ok)throw Error('Catalogue not available');const data=await response.json();if(data.locale!==code||!data.messages)throw Error('Invalid catalogue');cache.set(code,data);return data;}
 async function setLocale(code,{remember=true}={}){if(!manifest?.languages.some(language=>language.code===code&&(language.complete||review)))throw Error('Language is not ready');const sequence=++generation,previous=translator,previousDisplayNames=displayNames;let applied=false;const ticket=window.CityLoading?.begin({phase:'language',priority:20,title:'Prepariamo la tua lingua.',detail:'Aggiorniamo testi e cartelli della città.'});if(select)select.disabled=true;
  try{const data=await catalogue(code);if(sequence!==generation)return false;translator=createTranslator(code,data);displayNames=typeof Intl.DisplayNames==='function'?new Intl.DisplayNames([code],{type:'region'}):null;document.documentElement.lang=code;document.documentElement.dir=translator.dir;applied=true;for(const node of document.querySelectorAll('#username,#currentCityName'))node.dir='auto';missing.clear();if(select){select.value=code;select.setAttribute('aria-label',translator.translate('Lingua'));}const jobs=[...listeners].map(listener=>Promise.resolve().then(()=>listener(code))),results=await Promise.allSettled(jobs),failed=results.find(result=>result.status==='rejected');if(failed)throw failed.reason;if(sequence!==generation)return false;binding?.refresh();await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));if(sequence!==generation)return false;if(remember){try{localStorage.setItem('casa-language-v1',code);}catch{}}return true;
  }catch(error){if(sequence===generation){if(applied){translator=previous;displayNames=previousDisplayNames;document.documentElement.lang=translator.locale;document.documentElement.dir=translator.dir;await Promise.allSettled([...listeners].map(listener=>Promise.resolve().then(()=>listener(translator.locale))));binding?.refresh();}if(select){select.value=translator.locale;select.setAttribute('aria-label',translator.translate('Lingua'));}notify('Lingua non disponibile. Controlla la connessione e riprova.');}console.warn('Language catalogue unavailable',code);return false;
  }finally{if(sequence===generation&&select)select.disabled=false;if(ticket)await window.CityLoading.end(ticket);}
 }
 function picker(){const controls=document.getElementById('earthControls');if(!controls)return;const container=document.createElement('div');container.id='languageSwitcher';const icon=document.createElement('span');icon.textContent='🌐';icon.setAttribute('aria-hidden','true');select=document.createElement('select');select.id='languagePicker';select.dataset.i18nSkip='true';select.setAttribute('aria-label','Lingua');for(const language of manifest.languages){if(!language.complete&&!review)continue;const option=document.createElement('option');option.value=language.code;option.textContent=language.name+(!language.complete?' · preview':'');option.lang=language.code;select.append(option);}select.onchange=()=>void setLocale(select.value);container.append(icon,select);controls.append(container);}
 const proper=node=>node.parentElement?.closest('#worldCountry,#citySelect,#cityLabel,#currentCityName,#username,.regional-city-labels,[data-i18n-skip]');
 binding=bindTranslation(document.body,()=>translator,{onMissing:(source,node)=>{const text=source.trim(),brand=text.replace(/^[^\p{L}\p{N}]+/u,'');if(review&&!proper(node)&&!translator.recognizes(text)&&!['Sudamérica Casa por Casa','Sudamérica · Casa por Casa','OpenStreetMap contributors','OpenMapTiles','GeoNames','Leaflet','Natural Earth','RESOLVE'].includes(brand)&&missing.size<3000&&/[A-Za-zÀ-ž]/.test(source))missing.add(text);}});
 (async()=>{try{const response=await fetch('locales/manifest.json?v='+revision);if(!response.ok)throw Error('Manifest not available');manifest=await response.json();picker();let requested=new URL(location.href).searchParams.get('lang');if(!requested)try{requested=localStorage.getItem('casa-language-v1');}catch{}const available=manifest.languages.filter(language=>language.complete||review).map(language=>language.code);if(!requested){for(const preference of navigator.languages||[navigator.language]){requested=available.find(code=>code.toLowerCase()===preference.toLowerCase())||available.find(code=>code===preference.split('-')[0]);if(requested)break;}}if(!available.includes(requested))requested='it';await setLocale(requested,{remember:false});
  }catch{console.warn('Language manifest unavailable');}
 })();
})();

})();
