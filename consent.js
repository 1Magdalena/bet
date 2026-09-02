// BET consent + first-party product-analytics bootstrap. No non-essential tracking runs before opt-in.
(function(){
  const KEY='bet_consent_v1', POLICY='2026-09-02';
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}};
  const write=(v)=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}; window.dispatchEvent(new CustomEvent('bet:consent',{detail:v}));};
  async function sync(v){ if(!window.BET_API?.setConsent)return; try{await window.BET_API.setConsent({productAnalytics:!!v.productAnalytics,analytics:!!v.analytics,marketing:!!v.marketing,policyVersion:POLICY})}catch{} }
  function set(v){const value={necessary:true,productAnalytics:!!v.productAnalytics,analytics:!!v.analytics,marketing:!!v.marketing,policyVersion:POLICY,updatedAt:new Date().toISOString()};write(value);sync(value);return value;}
  function banner(){
    if(read())return;
    const el=document.createElement('div');el.id='bet-consent';el.setAttribute('role','dialog');el.setAttribute('aria-label','Privacy preferences');
    el.innerHTML='<div><b>Privacy preferences</b><p>BET uses necessary storage for core functionality. With your permission, first-party product analytics help us understand how BET is used.</p></div><div class="bet-consent-actions"><button data-c="reject">Necessary only</button><button data-c="manage">Manage</button><button data-c="accept">Accept analytics</button></div><div data-c-panel hidden><label><input type="checkbox" checked disabled> Necessary</label><label><input type="checkbox" data-product> Product analytics</label><label><input type="checkbox" data-analytics> Additional analytics</label><label><input type="checkbox" data-marketing> Marketing</label><button data-c="save">Save preferences</button></div>';
    const st=document.createElement('style');st.textContent='#bet-consent{position:fixed;z-index:9999;left:18px;right:18px;bottom:18px;max-width:920px;margin:auto;background:#f5efe6;border:1px solid #cfc3b6;padding:18px 20px;box-shadow:0 12px 40px #0002;font:14px/1.45 system-ui;color:#2c2521}#bet-consent p{margin:6px 0 0}.bet-consent-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}#bet-consent button{padding:9px 13px;border:1px solid #6e2636;background:transparent;border-radius:4px;cursor:pointer}#bet-consent button[data-c="accept"],#bet-consent button[data-c="save"]{background:#6e2636;color:white}#bet-consent [data-c-panel]{margin-top:12px;border-top:1px solid #d8cec4;padding-top:12px}#bet-consent label{display:block;margin:7px 0}';document.head.appendChild(st);document.body.appendChild(el);
    el.addEventListener('click',e=>{const a=e.target?.dataset?.c;if(!a)return;if(a==='manage'){el.querySelector('[data-c-panel]').hidden=false;return}if(a==='reject'){set({});el.remove()}if(a==='accept'){set({productAnalytics:true,analytics:true});el.remove()}if(a==='save'){set({productAnalytics:el.querySelector('[data-product]').checked,analytics:el.querySelector('[data-analytics]').checked,marketing:el.querySelector('[data-marketing]').checked});el.remove()}});
  }
  let sessionId=null,lastBeat=Date.now(),lastInput=Date.now();
  async function startTracking(){const c=read();if(!c?.productAnalytics||!window.BET_API?.startActivitySession||sessionId)return;try{const r=await window.BET_API.startActivitySession();sessionId=r?.data?.id||null}catch{}}
  ['pointerdown','keydown','scroll','touchstart'].forEach(n=>addEventListener(n,()=>{lastInput=Date.now()},{passive:true}));
  setInterval(async()=>{if(!sessionId||document.visibilityState!=='visible'||Date.now()-lastInput>300000)return;const now=Date.now(),secs=Math.min(60,Math.max(1,Math.round((now-lastBeat)/1000)));lastBeat=now;try{await window.BET_API.activityHeartbeat({sessionId,activeSeconds:secs,module:document.body.dataset.module||location.pathname})}catch{}},60000);
  window.BET_PRIVACY={get:read,set,openPreferences:()=>{localStorage.removeItem(KEY);banner()}};
  addEventListener('bet:consent',e=>{if(e.detail?.productAnalytics)startTracking()});
  addEventListener('DOMContentLoaded',()=>{banner();startTracking()});
})();
