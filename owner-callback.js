/* Consume credentials before loading the game or any third-party scripts. */
(async function(){'use strict';const values=new URLSearchParams(location.hash.slice(1));history.replaceState(null,'',location.pathname);const token=values.get('access_token'),refresh=values.get('refresh_token');
 try{if(!token||!refresh)throw Error('Il link non è valido oppure è già stato utilizzato. Richiedi un nuovo accesso.');
  const response=await fetch('https://hqcsecqbwaxwmaleapse.supabase.co/rest/v1/rpc/owner_access_status',{method:'POST',headers:{apikey:'sb_publishable_mO8srQB6CO1U8XQkBqK75Q_psYUHrvI',Authorization:'Bearer '+token,'Content-Type':'application/json'},body:'{}',cache:'no-store'});
  if(!response.ok||await response.json()!==true)throw Error('Questo account non è autorizzato ad aprire la simulazione.');
  const session={access_token:token,refresh_token:refresh,expires_at:Number(values.get('expires_at'))||Math.floor(Date.now()/1000)+Number(values.get('expires_in')||3600)};
  localStorage.setItem('casa-owner-session-v1',JSON.stringify(session));location.replace('./?accesso=verificato&v=9.3.0');
 }catch(error){document.getElementById('authResult').textContent=error.message;document.getElementById('authProgress').hidden=true;document.getElementById('authReturn').hidden=false;}
})();
