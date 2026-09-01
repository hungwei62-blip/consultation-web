// Service Worker for 晤談行程紀錄表
// 策略：cache-first。資料存於 localStorage，不經過 fetch，因此 SW 只需快取殼層檔案（HTML、manifest、圖示）讓 App 可離線開啟。
// 部署後若修改了 HTML，請把下面 CACHE 的版本號往上調一號（例如 'v3' → 'v4'）。

const CACHE = 'counsel-schedule-v3';

const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/favicon-16.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // 只處理同源 GET，跳過其他
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // 順便把同源新檔案也快取起來（HTML、icon 等可能會新增）
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
        }
        return res;
      }).catch(() => {
        // 真的沒網又沒快取時，讓 HTML 請求退回主頁
        if (req.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});