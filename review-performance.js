/* Review-only measurements. No requests, identifiers or persistent storage. */
(function(){
 const samples={count:0,totalMs:0,maxMs:0},loads=[];let observer;
 try{
  observer=new PerformanceObserver(list=>{for(const task of list.getEntries()){
   samples.count++;samples.totalMs+=task.duration;samples.maxMs=Math.max(samples.maxMs,task.duration);
  }});
  observer.observe({type:'longtask',buffered:true});
 }catch{}
 let started=document.documentElement.dataset.loadingState==='visible'?performance.now():null;
 const loadingObserver=new MutationObserver(()=>{
  if(document.documentElement.dataset.loadingState==='visible'){if(started===null)started=performance.now();}
  else if(started!==null){loads.push(Math.round(performance.now()-started));if(loads.length>20)loads.shift();started=null;}
 });
 loadingObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-loading-state']});
 window.ReviewPerformance=Object.freeze({snapshot(){
  const navigation=performance.getEntriesByType('navigation')[0];
  return {navigationMs:navigation?Math.round(navigation.loadEventEnd-navigation.startTime):null,
   longTasks:observer?{count:samples.count,totalMs:Math.round(samples.totalMs),maxMs:Math.round(samples.maxMs)}:null,
   completedLoadingMs:loads.slice(),loadingNow:started!==null};
 }});
})();
