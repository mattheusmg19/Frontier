const CACHE_NAME = "frontier-cache-v1";
const FILES_TO_CACHE = [
  "/Frontier/", // 🔧 Ajustado para o caminho correto
  "/Frontier/index.html",
  "/Frontier/css/login.css",
  "/Frontier/js/login.js",
  "/Frontier/icon-192x192.png",
  "/Frontier/icon-512x512.png"
];

// Instalação do Service Worker e armazenamento dos arquivos no cache
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Cache armazenado com sucesso!");
      return cache.addAll(FILES_TO_CACHE);
    }).catch(err => console.error("Erro ao armazenar no cache:", err))
  );
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
});

// Interceptação de requisições para servir arquivos do cache
self.addEventListener("fetch", function(event) {
  console.log("Interceptando requisição para:", event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(err => console.error("Erro ao buscar no cache:", err))
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
  // 🔧 Aqui você pode adicionar lógica para sincronizar dados com um servidor
}

// Atualização periódica do app (Periodic Sync)
self.addEventListener("periodicsync", async function(event) {
  if (event.tag === "sync-content") {
    try {
      await updateAppContent();
    } catch (err) {
      console.error("Erro ao registrar Periodic Sync:", err);
    }
  }
});

async function updateAppContent() {
  console.log("Atualizando o conteúdo do app...");
  // 🔧 Aqui você pode adicionar lógica para atualizar dados no cache
}

// Notificações Push
self.addEventListener("push", function(event) {
  const options = {
    body: "Nova notificação!",
    icon: "/Frontier/icon-192x192.png" // 🔧 Corrigido o caminho
  };
  event.waitUntil(
    self.registration.showNotification("Frontier", options)
  );
});
