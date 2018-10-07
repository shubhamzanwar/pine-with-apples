const cacheName = 'v3';
const cacheFiles = [
  "./",
  "./index.html",
]

self.addEventListener('install', (e) => { //eslint-disable-line
  console.log("[Service worker] installed");
  e.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      console.log("[Service Worker] caching files");
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', (e) => { //eslint-disable-line
  console.log("[Service worker] activated");
  e.waitUntil(
    caches.keys()
    .then((cacheNames) => {
      return Promise.all(cacheNames.map((thisCacheName) => {
        if (thisCacheName !== cacheName){
          console.log("[Service Worker] removing cache files from: ", thisCacheName);
          return caches.delete(thisCacheName);
        }
        return null;
      }))
    })
  )
});

self.addEventListener('fetch', (e) => { //eslint-disable-line
  console.log("[Service worker] fetching");
  e.respondWith(
    caches.match(e.request)
    .then((response) => {
      if(response) {
        console.log("[Service worker] found in cache", e.request.url);
        return response;
      }
      const requestClone = e.request.clone();
      fetch(requestClone)
        .then((response) => {
          if(!response) {
            console.log("[Service worker]: no response");
            return response;
          }
          const responseClone = response.clone();
          caches.open(cacheName)
          .then((cache) => {
            console.log("[Service Worker] caching the response received", e.request.url);
            cache.put(e.request, responseClone);;
            return response;
          })
        })
        .catch((e) => {
          console.log("[Service Worker] error fetching & caching the response", e);
          return {};
        })
    })
  )
});