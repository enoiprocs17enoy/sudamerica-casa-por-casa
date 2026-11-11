/* Review-only measurements. No requests, identifiers or persistent storage. */
(function(){
 const samples={count:0,totalMs:0,maxMs:0},loads=[],stages=[],tasks=[],firstDraws=[];let observer;
 try{
  observer=new PerformanceObserver(list=>{for(const task of list.getEntries()){
   samples.count++;samples.totalMs+=task.duration;samples.maxMs=Math.max(samples.maxMs,task.duration);
   tasks.push({startMs:Math.round(task.startTime),durationMs:Math.round(task.duration)});if(tasks.length>100)tasks.shift();
  }});
  observer.observe({type:'longtask',buffered:true});
 }catch{}
 let started=document.documentElement.dataset.loadingState==='visible'?performance.now():null;
 const loadingObserver=new MutationObserver(()=>{
  if(document.documentElement.dataset.loadingState==='visible'){if(started===null)started=performance.now();}
  else if(started!==null){loads.push(Math.round(performance.now()-started));if(loads.length>20)loads.shift();started=null;}
 });
 loadingObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-loading-state']});
 window.ReviewPerformance=Object.freeze({recordFirstDraw(data){firstDraws.push({...data});if(firstDraws.length>10)firstDraws.shift();},recordStage(name,durationMs){const end=performance.now();stages.push({name,durationMs:Math.round(durationMs),startMs:Math.round(end-durationMs),endMs:Math.round(end)});if(stages.length>100)stages.shift();},snapshot(){
  const navigation=performance.getEntriesByType('navigation')[0];
  return {navigationMs:navigation?Math.round(navigation.loadEventEnd-navigation.startTime):null,
   longTasks:observer?{count:samples.count,totalMs:Math.round(samples.totalMs),maxMs:Math.round(samples.maxMs),entries:tasks.slice()}:null,
   firstDraws:firstDraws.slice(),render:window.SudamericaRender8?.performanceSnapshot?.()||null,completedLoadingMs:loads.slice(),loadingNow:started!==null,buildStages:stages.slice()};
 }});
})();
