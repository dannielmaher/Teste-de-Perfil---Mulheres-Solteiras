/* Service Worker — faz o app abrir offline e ser "instalável" na tela do celular.
   Se você editar os arquivos, troque o número da versão (v1 -> v2) para forçar
   a atualização nos celulares que já usaram o app. */
const CACHE = "registro-possiveis-v1";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/model.js",
  "./js/app.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-maskable.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(chaves.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((resp) => resp || fetch(e.request).catch(() => caches.match("./index.html")))
  );
});
