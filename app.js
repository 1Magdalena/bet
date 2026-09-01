function toast(message){const old=document.querySelector('.toast');if(old)old.remove();const t=document.createElement('div');t.className='toast';t.textContent=message;document.body.appendChild(t);setTimeout(()=>t.remove(),2800)}
document.addEventListener('DOMContentLoaded',()=>{
  const askBtn=document.querySelector('[data-ask]');
  if(askBtn){askBtn.addEventListener('click',()=>{const answer=document.querySelector('#answer');if(answer)answer.classList.remove('hidden');toast('BET checked this question for qualified experience')})}
  const research=document.querySelector('[data-research]');
  if(research){research.addEventListener('click',()=>{document.querySelector('#research-state')?.classList.remove('hidden');toast('BET is checking a targeted set of possible experience holders')})}
})

// Guided contribution foundation. UI-only in this static prototype; production state is server-owned.
(function(){
  document.querySelectorAll('[data-onboarding="skip"]').forEach(function(el){
    el.addEventListener('click', function(){ try{ localStorage.setItem('bet_onboarding_status','skipped'); }catch(e){} });
  });
  var send=document.getElementById('support-send'), input=document.getElementById('support-input'), thread=document.getElementById('support-thread');
  if(send && input && thread){
    send.addEventListener('click', function(){
      var q=input.value.trim(); if(!q) return;
      var u=document.createElement('div'); u.className='support-msg user'; u.textContent=q; thread.appendChild(u); input.value='';
      var b=document.createElement('div'); b.className='support-msg bot';
      var business=/price|pricing|sales|market|hire|hiring|expand|strategy|revenue|profit|should i|should we/i.test(q);
      b.innerHTML=business ? '<b>BET Support</b><br>That sounds like a business question rather than a technical BET issue. Ask BET is the right place for it. <a href="ask.html">Go to Ask BET →</a>' : '<b>BET Support</b><br>This prototype has the Support boundary and escalation UX prepared. Production Support will answer only from approved BET product documentation. If it cannot resolve the issue, it will offer human support.';
      thread.appendChild(b); thread.scrollTop=thread.scrollHeight;
    });
  }
})();

// Product feature flags. Keep disabled capabilities in code when architecture requires later activation.
window.BET_FEATURE_FLAGS = Object.assign({
  payment_safety_messaging: false
}, window.BET_FEATURE_FLAGS || {});

document.querySelectorAll('[data-feature]').forEach((el) => {
  const key = el.getAttribute('data-feature');
  if (window.BET_FEATURE_FLAGS[key] === true) el.hidden = false;
});
