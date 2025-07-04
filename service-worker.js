self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('digiterra-cache').then(cache => {
      return cache.addAll([
        'index.html',
        'app.js',
        'users.json',
        'manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});