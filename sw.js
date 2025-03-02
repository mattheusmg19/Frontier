self.addEventListener("install", (event) => {
  console.log("Service Worker instalado!");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker ativado!");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  console.log("Interceptando requisição para:", event.request.url);
});
