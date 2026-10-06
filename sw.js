const CACHE = "evil-spotify-v2";
const SHELL = [
  "./index.html", "./signin.html", "./home.html", "./adminPanel.html",
  "./login.css", "./signin.css", "./style.css", "./adminPanel.css",
  "./login.js", "./signin.js", "./main.js", "./adminPanel.js",
  "./firebase.js", "./cloudinary.js", "./pwa.js", "./manifest.json",
  "./evil-spotify-logo.png",
  "./icons/icon-192.png", "./icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);

  if (req.method !== "GET" || url.origin !== location.origin) return;

  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req))
  );
});
