const CACHE_NAME = 'dhan-pos-v3'; // palitan mo v2 to v3 para mag-update
const urlsToCache = [
  '/',
  '/index.html',
  '/settings.html',
  '/products.html', 
  '/expenses.html',
  '/pos.html',
  '/daily-production.html',
  '/net-profet.html',
  '/firebase-config.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/bg.jpg' // kung meron ka neto
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    .catch(err => console.log('Cache failed:', err)) // para di mag-crash
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if(cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
