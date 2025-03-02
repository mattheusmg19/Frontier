const CACHE_NAME = "frontier-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "index.html",
  "css/login.css",
  "js/login.js",
  "icon-192x192.png",
  "icon-512x512.png"
];

// Instalação do Service Worker e armazenamento dos arquivos no cache
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Cache armazenado com sucesso!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // Força a ativação imediata do novo Service Worker
});

// Ativação do Service Worker e remoção de caches antigos
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cache) {
          if (cache !== CACHE_NAME) {
            console.log("Removendo cache antigo:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Garante que o SW atualizado seja ativado imediatamente
});

// Interceptação de requisições para servir arquivos do cache e armazenar novos arquivos dinamicamente
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(fetchResponse) {
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});

// Sincronização em segundo plano (Background Sync)
self.addEventListener("sync", function(event) {
  if (event.tag === "sync-data") {
    event.waitUntil(syncAppData());
  }
});

async function syncAppData() {
  console.log("Sincronizando dados em segundo plano...");
  // Lógica para sincronizar os dados do app
}

// Atualização periódica do app (Periodic Sync)
self.addEventListener("periodicsync", function(event) {
  if (event.tag === "sync-content") {
    event.waitUntil(updateAppContent());
  }
});

async function updateAppContent() {
  console.log("Atualizando o conteúdo do app...");
  // Lógica para atualizar os dados do app
}

// Notificações Push
self.addEventListener("push", function(event) {
  const options = {
    body: "Nova notificação!",
    icon: "icon-192x192.png"
  };
  event.waitUntil(
    self.registration.showNotification("Frontier", options)
  );
});

// Registrar atualização periódica se suportado pelo navegador
if ("periodicSync" in self.registration) {
  self.registration.periodicSync.register("sync-content", {
    minInterval: 24 * 60 * 60 * 1000 // 1 dia
  }).then(() => {
    console.log("Periodic Sync registrado com sucesso!");
  }).catch((err) => {
    console.error("Erro ao registrar Periodic Sync:", err);
  });
}
