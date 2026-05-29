self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('dhan-pos-v1').then((cache) => {
      return cache.addAll(['index.html', 'settings.html', 'firebase-config.js']);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
