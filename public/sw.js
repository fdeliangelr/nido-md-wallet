self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Permite que la app funcione y cargue correctamente
  event.respondWith(fetch(event.target).catch(() => caches.match(event.request)));
});