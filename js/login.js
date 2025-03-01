import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBS7WKdZBo7GHH1ZV65Ie_eTpbrGK46BS0",
    authDomain: "teste-491ef.firebaseapp.com",
    projectId: "teste-491ef",
    storageBucket: "teste-491ef.firebasestorage.app",
    messagingSenderId: "182969624474",
    appId: "1:182969624474:web:2e38ebea2965e1ca3b3c23"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Adiciona evento ao botão de login
document.addEventListener("DOMContentLoaded", () => {
    const botaoEntrar = document.querySelector("button");
    if (botaoEntrar) {
        botaoEntrar.addEventListener("click", entrar);
    }
});

async function entrar() {
    const usuarioInput = document.querySelector("input[type='text']").value.trim();
    const senhaInput = document.querySelector("input[type='password']").value.trim();

    if (!usuarioInput || !senhaInput) {
        mostrarPopup("Preencha todos os campos!");
        return;
    }

    try {
        const loginCollection = collection(db, "login");
        const snapshot = await getDocs(loginCollection);

        let loginValido = false;
        let usuarioNome = "";
        let usuarioCargo = "";

        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.usuario === usuarioInput && data.senha === senhaInput) {
                loginValido = true;
                usuarioNome = data.nome;
                usuarioCargo = data.cargo;
            }
        });

        if (loginValido) {
            // Salva os dados do usuário no localStorage
            localStorage.setItem("usuarioNome", usuarioNome);
            localStorage.setItem("usuarioCargo", usuarioCargo);

            // Redireciona para a página inicial
            window.location.href = "home.html";
        } else {
            mostrarPopup("Usuário ou senha incorretos.");
        }
    } catch (error) {
        console.error("Erro ao buscar dados no Firebase:", error);
        mostrarPopup("Erro ao conectar ao servidor.");
    }
}

function mostrarPopup(mensagem) {
    let modal = document.querySelector(".modal-overlay");
    if (!modal) {
        modal = document.createElement("div");
        modal.classList.add("modal-overlay");
        modal.innerHTML = `
            <div class="modal-content">
                <p id="modal-mensagem">${mensagem}</p>
                <button onclick="fecharPopup()">OK</button>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        document.getElementById("modal-mensagem").innerText = mensagem;
        modal.style.display = "flex";
    }
}

window.fecharPopup = function () {
    document.querySelector(".modal-overlay").style.display = "none";
};
