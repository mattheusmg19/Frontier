import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBS7WKdZBo7GHH1ZV65Ie_eTpbrGK46BS0",
    authDomain: "teste-491ef.firebaseapp.com",
    projectId: "teste-491ef",
    storageBucket: "teste-491ef.firebasestorage.app",
    messagingSenderId: "182969624474",
    appId: "1:182969624474:web:2e38ebea2965e1ca3b3c23"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("openAddModal").addEventListener("click", () => {
    document.getElementById("modalAdd").style.display = "flex";
});

document.getElementById("closeAddModal").addEventListener("click", () => {
    document.getElementById("modalAdd").style.display = "none";
});

document.getElementById("closeInfoModal").addEventListener("click", () => {
    document.getElementById("modalInfo").style.display = "none";
});

document.getElementById("addCliente").addEventListener("click", async () => {
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const endereco = document.getElementById("endereco").value;
    const cidade = document.getElementById("cidade").value;

    await addDoc(collection(db, "clientes"), { nome, cpf, telefone, email, endereco, cidade });
    document.getElementById("modalAdd").style.display = "none";
    carregarClientes();
});

async function carregarClientes() {
    
    const listaClientes = document.getElementById("listaClientes");
    listaClientes.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "clientes"));
    querySnapshot.forEach((doc) => {
        const cliente = doc.data();
        const li = document.createElement("li");
        li.className = "cliente-item";
        li.innerHTML = `
            <span>${cliente.nome}</span>
            <button class="btn btn-delete"><i class="bi bi-trash-fill trash"></i></button>
        `;

        li.addEventListener("click", () => mostrarInfoCliente(cliente));

        // Pegando o botão de excluir dentro do elemento criado
        const deleteButton = li.querySelector(".btn-delete");
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Impede que o clique no botão de excluir propague para o <li>
            excluirCliente(doc.id);
        });

        listaClientes.appendChild(li);
    });
}

function mostrarInfoCliente(cliente) {
    const info = `<span class="title-info">Nome: </span>${cliente.nome}<br><span class="title-info">CPF: </span>${cliente.cpf}<br><span class="title-info">Telefone: </span>${cliente.telefone}<br><span class="title-info">Email: </span>${cliente.email}<br><span class="title-info">Endereço: </span>${cliente.endereco}<br><span class="title-info">Cidade: </span>${cliente.cidade}`;
    document.getElementById("infoCliente").innerHTML = info;
    document.getElementById("modalInfo").style.display = "flex";
}

window.excluirCliente = async (id) => {
    await deleteDoc(doc(db, "clientes", id));
    carregarClientes();
};

// Função para fechar o modal ao clicar na área de fundo
document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

// Função para fechar os modais ao pressionar a tecla Esc
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal").forEach(modal => {
            if (modal.style.display === "flex") {
                modal.style.display = "none";
            }
        });
    }
});


carregarClientes();

        //ajusta cpf
        document.getElementById("cpf").addEventListener("input", function(event) {
            let cpf = event.target.value;

            // Remover tudo que não seja número
            cpf = cpf.replace(/\D/g, "");

            // Limitar a 11 caracteres numéricos
            if (cpf.length > 11) {
                cpf = cpf.slice(0, 11);
            }

            // Adicionar a máscara
            if (cpf.length <= 11) {
                cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
                cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
                cpf = cpf.replace(/(\d{3})(\d{2})$/, "$1-$2");
            }

            // Atualizar o valor do campo
            event.target.value = cpf;
        });

        //filtro nome do cliente
        document.getElementById("filtro-descricao").addEventListener("input", function () {
            const filtro = this.value.toLowerCase();
            document.querySelectorAll(".cliente-item").forEach(item => {
                const nomeCliente = item.querySelector("span").textContent.toLowerCase();
                if (nomeCliente.includes(filtro)) {
                    item.style.display = "flex"; // Mostra os itens que correspondem ao filtro
                } else {
                    item.style.display = "none"; // Esconde os itens que não correspondem
                }
            });
        });

        //limpar filtro
        const inputFiltro = document.getElementById("filtro-descricao");
        const iconePesquisa = document.querySelector("#pesquisar");

        const iconeBorracha = document.createElement("i");
        iconeBorracha.className = "bi bi-eraser-fill"; // Ícone de borracha
        iconeBorracha.style.cursor = "pointer";
        iconeBorracha.style.display = "none"; // Inicialmente oculto

        // Adiciona o ícone de borracha ao input
        document.querySelector(".input-container").appendChild(iconeBorracha);

        inputFiltro.addEventListener("input", function () {
            const filtro = this.value.trim().toLowerCase();
            
            // Alternar ícones
            if (filtro.length > 0) {
                iconePesquisa.style.display = "none"; // Esconde a lupa
                iconeBorracha.style.display = "block"; // Mostra a borracha
            } else {
                iconePesquisa.style.display = "block"; // Mostra a lupa
                iconeBorracha.style.display = "none"; // Esconde a borracha
            }

            // Filtrar clientes
            document.querySelectorAll(".cliente-item").forEach(item => {
                const nomeCliente = item.querySelector("span").textContent.toLowerCase();
                item.style.display = nomeCliente.includes(filtro) ? "flex" : "none";
            });
        });

        // Limpar input ao clicar na borracha
        iconeBorracha.addEventListener("click", function () {
            inputFiltro.value = "";
            iconePesquisa.style.display = "block"; // Volta a exibir a lupa
            iconeBorracha.style.display = "none"; // Esconde a borracha

            // Mostrar todos os clientes novamente
            document.querySelectorAll(".cliente-item").forEach(item => {
                item.style.display = "flex";
            });
        });

        

