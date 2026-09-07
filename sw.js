const C='reset-v14-clean-tone-studio-1';
const A=['./','./index.html','./data.js','./firebase-config.js','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))])));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  if(u.pathname.endsWith('/')||u.pathname.endsWith('/index.html')){
      e.respondWith(fetch(new Request(e.request,{cache:'no-store'})).then(r=>r).catch(()=>caches.match('./index.html')));
      return;
    }
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));
});


self.addEventListener('push',e=>{
  let payload={};
  try{payload=e.data?e.data.json():{}}catch{payload={body:e.data?e.data.text():""}}
  const n=payload.notification||payload;
  const title=n.title||'RESET';
  const options={
    body:n.body||payload.body||'You have a new RESET notification.',
    icon:n.icon||'icon.svg',
    badge:n.badge||'icon.svg',
    tag:n.tag||'reset-push',
    data:payload.data||n.data||{},
    renotify:true
  };
  e.waitUntil(self.registration.showNotification(title,options));
});

self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const target=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(ws=>{
    for(const w of ws){if('focus' in w)return w.focus()}
    return clients.openWindow?clients.openWindow(target):null;
  }));
});
