document.getElementById("notification").addEventListener("click", function () {
    let container = document.getElementById("notification-container");
    container.style.display = (container.style.display === "none" || container.style.display === "") ? "block" : "none";
});

// Fechar notificações ao clicar fora do contêiner
document.addEventListener("click", function (event) {
    let container = document.getElementById("notification-container");
    let notificationIcon = document.getElementById("notification");

    // Verifica se o clique foi fora do contêiner e do sino
    if (container.style.display === "block" && !container.contains(event.target) && !notificationIcon.contains(event.target)) {
        container.style.display = "none";
    }
});

// Função para adicionar notificações e atualizar o contador
function addNotification(message) {
    const notificationList = document.getElementById("notification-list");
    const container = document.getElementById("notification-container");

    // Criar nova notificação
    let notificationItem = document.createElement("li");
    notificationItem.textContent = message;

    notificationList.appendChild(notificationItem);

    // Adicionar classe para exibir notificações corretamente
    container.classList.add("notification");

    // Atualizar o contador baseado no número de notificações na lista
    updateNotificationBadge();
}

// Atualiza o contador de notificações corretamente
function updateNotificationBadge() {
    let badge = document.getElementById("notification-count");
    let totalNotifications = document.querySelectorAll("#notification-list li").length;
    let container = document.getElementById("notification-container");

    if (totalNotifications > 0) {
        badge.textContent = totalNotifications;
        badge.style.display = "flex"; // Mostra a bolinha
        container.classList.add("notification");
    } else {
        badge.style.display = "none"; // Esconde a bolinha
        container.classList.remove("notification");
    }
}

// Teste: adicionando duas notificações juntas
setTimeout(() => {
    addNotification("🚀 Seja bem vindo(a) ao Frontier!");
}, 2000);