/* Dedicated owner entry: authorization and tools remain in the existing gated flow. */
(function(){'use strict';
 if(location.pathname.split('/').pop()!=='laboratorio.html')return;
 const ownerButton=document.getElementById('ownerAccessButton'),ownerDialog=document.getElementById('ownerAccessDialog'),actions=document.getElementById('ownerVerifiedActions'),toggle=document.getElementById('ownerToggleTest');
 if(!ownerButton||!ownerDialog||!toggle)return;
 document.body.classList.add('personal-lab');
 const bar=document.createElement('section');bar.className='lab-ribbon';bar.dataset.i18nSkip='true';bar.setAttribute('aria-label','Laboratorio personale');
 const status=document.createElement('strong');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 const tools=document.createElement('button');tools.type='button';tools.textContent='Apri strumenti';tools.onclick=()=>{if(window.OwnerAccess?.testMode()){document.querySelector('.hub-tools button:last-child')?.click();return;}ownerButton.click();};
 const publicLink=document.createElement('a');publicLink.href='./';publicLink.target='_blank';publicLink.rel='noopener';publicLink.textContent='Sito pubblico ↗';bar.append(status,tools,publicLink);document.body.append(bar);
 let attempted=false,openedTools=false,queued=false;
 function refresh(){queued=false;const owner=window.OwnerAccess?.isOwner(),testing=window.OwnerAccess?.testMode();status.textContent=testing?'🧪 Laboratorio · sperimentazione':'🔒 Laboratorio personale';
  if(owner&&!testing&&!attempted&&!toggle.disabled){attempted=true;toggle.click();return;}
  if(testing&&!openedTools&&!ownerDialog.open&&document.getElementById('ownerSimulationControls')){openedTools=true;const menu=document.querySelector('.hub-tools button:last-child');if(menu?.getAttribute('aria-expanded')!=='true')menu?.click();document.getElementById('ownerSimulationControls').scrollIntoView({block:'start'});}
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(refresh);}}
 const observer=new MutationObserver(schedule);observer.observe(actions,{attributes:true,subtree:true,attributeFilter:['hidden','disabled']});observer.observe(ownerDialog,{attributes:true,attributeFilter:['open']});observer.observe(document.body,{attributes:true,attributeFilter:['class']});
 ownerButton.click();schedule();
})();
