const CACHE_NAME = 'dhan-pos-v5';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const files = ['/', '/index.html', '/products.html', '/expenses.html', '/settings.html'];
      for(let file of files) {
        try {
          await cache.add(file);
        } catch(err) {
          console.log('Skip:', file);
        }
      }
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
