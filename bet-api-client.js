// Browser-side BET API client. No privileged secret belongs here.
(function(){
  const runtime=window.BET_RUNTIME||{};
  async function token(){
    if(window.BET_AUTH?.getAccessToken) return await window.BET_AUTH.getAccessToken();
    return null;
  }
  async function request(path,options={}){
    if(!runtime.apiBaseUrl) throw new Error('BET API is not configured');
    const accessToken=await token();
    const headers=new Headers(options.headers||{});
    headers.set('content-type','application/json');
    if(accessToken) headers.set('authorization',`Bearer ${accessToken}`);
    const res=await fetch(`${runtime.apiBaseUrl.replace(/\/$/,'')}${path}`,{...options,headers});
    if(res.status===204) return null;
    const body=await res.json().catch(()=>({error:'invalid_response'}));
    if(!res.ok) throw Object.assign(new Error(body.error||`HTTP ${res.status}`),{status:res.status,body});
    return body;
  }
  window.BET_API={
    syncMember:(payload)=>request('/v1/auth/sync',{method:'POST',body:JSON.stringify(payload)}),
    me:()=>request('/v1/me'),
    businesses:()=>request('/v1/businesses'),
    createBusiness:(payload)=>request('/v1/businesses',{method:'POST',body:JSON.stringify(payload)}),
    experiences:()=>request('/v1/experiences'),
    createExperience:(payload)=>request('/v1/experiences',{method:'POST',body:JSON.stringify(payload)}),
    questions:()=>request('/v1/questions'),
    createQuestion:(payload)=>request('/v1/questions',{method:'POST',body:JSON.stringify(payload)}),
    question:(id)=>request(`/v1/questions/${encodeURIComponent(id)}`),
    notifications:()=>request('/v1/notifications'),
    markNotificationRead:(id)=>request(`/v1/notifications/${encodeURIComponent(id)}/read`,{method:'POST'}),
    getConsent:()=>request('/v1/me/consent'),
    setConsent:(payload)=>request('/v1/me/consent',{method:'PUT',body:JSON.stringify(payload)}),
    startActivitySession:()=>request('/v1/activity/session',{method:'POST'}),
    activityEvent:(payload)=>request('/v1/activity/event',{method:'POST',body:JSON.stringify(payload)}),
    activityHeartbeat:(payload)=>request('/v1/activity/heartbeat',{method:'POST',body:JSON.stringify(payload)}),
    supportChat:(message)=>request('/v1/support/chat',{method:'POST',body:JSON.stringify({message})}),
    escalateSupport:(payload)=>request('/v1/support/escalate',{method:'POST',body:JSON.stringify(payload)}),
    adminOverview:(params={})=>request(`/v1/admin/overview?${new URLSearchParams(params)}`),
    adminFilterOptions:()=>request('/v1/admin/filter-options'),
    adminMembers:(params={})=>request(`/v1/admin/members?${new URLSearchParams(params)}`),
    adminMember:(id)=>request(`/v1/admin/members/${encodeURIComponent(id)}`),
    adminBillingSummary:(params={})=>request(`/v1/admin/billing-summary?${new URLSearchParams(params)}`),
    adminDataSummary:(params={})=>request(`/v1/admin/data-summary?${new URLSearchParams(params)}`)
  };
})();
