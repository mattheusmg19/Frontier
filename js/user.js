document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("userModal");
    const modalNome = document.getElementById("modalNome");
    const modalCargo = document.getElementById("modalCargo");
    const btnFechar = document.querySelector(".close");

    document.getElementById("user").addEventListener("click", () => {
        // Pega os dados do usuário do localStorage
        const nome = localStorage.getItem("usuarioNome") || "Desconhecido";
        const cargo = localStorage.getItem("usuarioCargo") || "Não definido";

        // Insere os dados no modal
        modalNome.textContent = nome;
        modalCargo.textContent = cargo;

        // Exibe o modal
        modal.style.display = "flex";
    });

    // Fecha o modal ao clicar no botão de fechar
    btnFechar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fecha o modal ao clicar em qualquer lugar da tela, exceto no próprio modal
    document.addEventListener("click", (event) => {
        if (!modal.contains(event.target) && event.target.id !== "user") {
            modal.style.display = "none";
        }
    });
});
