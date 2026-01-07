const CACHE_NAME = 'command-board-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './Residential.html',
  './Highrise_tacticalboard.html',
  './HighriseV.1.html',
  './MedicalGroup.html',
  './Staging Officer 2.1.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
  // Add any other local images like logo.jpg or 1.png here if needed
];

// Install Event: Cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event: Serve from cache first, fall back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});