function toast(message){const old=document.querySelector('.toast');if(old)old.remove();const t=document.createElement('div');t.className='toast';t.textContent=message;document.body.appendChild(t);setTimeout(()=>t.remove(),2800)}
document.addEventListener('DOMContentLoaded',()=>{
  const askBtn=document.querySelector('[data-ask]');
  if(askBtn){askBtn.addEventListener('click',()=>{const answer=document.querySelector('#answer');if(answer)answer.classList.remove('hidden');toast('BET found 31 comparable experiences')})}
  const follow=document.querySelector('[data-follow]');
  if(follow){follow.addEventListener('click',()=>{const active=follow.dataset.active==='1';follow.dataset.active=active?'0':'1';follow.textContent=active?'＋ Follow':'✓ Following';toast(active?'No longer following':'You are now following Anna')})}
  const research=document.querySelector('[data-research]');
  if(research){research.addEventListener('click',()=>{document.querySelector('#research-state')?.classList.remove('hidden');toast('Live Research launched to 42 matched entrepreneurs')})}
})
