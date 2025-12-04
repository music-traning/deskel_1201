// sw.js
// ★修正1: バージョン名を必ず変える（v3 -> v4）
const CACHE_NAME = 'deskel-v5.2';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon.png'
];

// 1. インストール時
self.addEventListener('install', (event) => {
  // ★修正2: 待機状態をスキップして、即座に新しいSWを有効にする
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. 起動時（アクティベート時）
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
    }).then(() => {
      // ★修正3: すぐにページをコントロール下に置く（リロード不要で反映させる）
      return self.clients.claim();
    })
  );
});

// 3. 通信時
self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith('blob:')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => {
        // オフライン時のフォールバックがあればここに記述
      });
    })
  );
});