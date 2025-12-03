// sw.js
// キャッシュの名前（バージョンアップするときはここを 'deskel-v2' などに変えます）
const CACHE_NAME = 'deskel-v3';

// オフラインで使いたいファイルのリスト
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon.png'
];

// 1. インストール時：ファイルをキャッシュ（貯蔵庫）に保存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. 起動時：古いキャッシュを削除（バージョンアップ用）
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

// 3. 通信時：キャッシュがあればそれを返す、なければネットに取りに行く
self.addEventListener('fetch', (event) => {
  // --- ★ 修正箇所: blob: スキームのリクエストは Service Worker の対象外とする ---
  if (event.request.url.startsWith('blob:')) {
    return; // blob URL は無視してブラウザのデフォルト処理に任せる
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      // キャッシュに見つかればそれを返す（高速・オフライン対応）
      if (response) {
        return response;
      }
      // なければインターネットに取りに行く
      return fetch(event.request).catch(() => {
        // オフラインで、かつ画像などのリクエストが失敗した場合の処理（必要なら）
        // 現状は特に何もしない
      });
    })
  );
});