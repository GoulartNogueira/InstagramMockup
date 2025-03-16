const CACHE_NAME = 'instagram-mockup-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/components/BottomNavigation.tsx',
  '/src/components/ContentTabs.tsx',
  '/src/components/PostsGrid.tsx',
  '/src/components/ProfileComponents.tsx',
  '/src/components/ProfileHeader.tsx',
  '/src/components/ProfileInfo.tsx',
  '/src/components/ProfileView.tsx',
  '/src/components/StoryHighlights.tsx',
  '/src/components/VerifiedBadge.tsx',
  '/src/context/ProfileContext.tsx',
  '/src/pages/ConfigPage.tsx',
  '/src/pages/ProfileView.tsx',
  '/src/pages/PublicationsPage.tsx',
  '/src/types.ts',
  '/src/vite-env.d.ts',
  '/src/index.css',
  '/src/main.tsx',
  '/tailwind.config.js',
  '/tsconfig.json',
  '/tsconfig.node.json',
  '/vite.config.ts',
  '/pwa-192x192.png',
  '/pwa-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
