import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

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
const carteiraRef = collection(db, "carteira");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("transacao-form");
    const tabela = document.getElementById("tabela-transacoes");
    const saldoAtual = document.getElementById("saldo-atual");
    const totalEntradas = document.getElementById("total-entradas");
    const totalSaidas = document.getElementById("total-saidas");
    const filtroDescricao = document.getElementById("filtro-descricao");
    const filtroData = document.getElementById("filtro-data");
    const filtroTipo = document.getElementById("filtro-tipo");
    const btnLimparFiltros = document.getElementById("limparFiltros");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const descricao = document.getElementById("descricao").value;
        const valor = parseFloat(document.getElementById("valor").value);
        const tipo = document.getElementById("tipo").value;
        
        // Formatar a data para "YYYY-MM-DD" para facilitar filtragem
        const agora = new Date();
        const dataFormatada = agora.toISOString().split("T")[0]; 
        const dataHora = agora.toLocaleString(); // Mantém o formato original para exibição

        await addDoc(carteiraRef, { descricao, valor, tipo, dataHora, dataFormatada });
        form.reset();
    });

    function aplicarFiltros(snapshot) {
        tabela.innerHTML = "";
        let entradas = 0;
        let saidas = 0;

        snapshot.docs.forEach(docSnapshot => {
            const { descricao, valor, tipo, dataHora, dataFormatada } = docSnapshot.data();
            const docId = docSnapshot.id;
            const icon = tipo === "entrada" ? "bi-caret-up-fill text-success" : "bi-caret-down-fill text-danger";

            // Captura os valores dos filtros
            const filtroDescricaoValor = filtroDescricao.value.toLowerCase();
            const filtroDataValor = filtroData.value; // Já vem no formato "YYYY-MM-DD"
            const filtroTipoValor = filtroTipo.value;

            // Aplicação dos filtros
            const descricaoMatch = descricao.toLowerCase().includes(filtroDescricaoValor);
            const tipoMatch = filtroTipoValor === "todos" || tipo === filtroTipoValor;
            const dataMatch = filtroDataValor === "" || dataFormatada === filtroDataValor;

            if (descricaoMatch && tipoMatch && dataMatch) {
                if (tipo === "entrada") entradas += valor;
                else saidas += valor;

                tabela.innerHTML += `
                    <tr>
                        <td><i class="bi ${icon}"></i></td>
                        <td>${descricao}</td>
                        <td>R$ ${valor.toFixed(2)}</td>
                        <td>${tipo}</td>
                        <td>${dataHora}</td>
                        <td>
                            <button class="btn-delete" onclick="removerTransacao('${docId}')">
                                <i class="bi bi-trash-fill"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }
        });

        totalEntradas.textContent = `R$ ${entradas.toFixed(2)}`;
        totalSaidas.textContent = `R$ ${saidas.toFixed(2)}`;
        saldoAtual.textContent = `R$ ${(entradas - saidas).toFixed(2)}`;
    }

    // Atualiza a tabela e aplica os filtros sempre que há mudanças no Firestore
    onSnapshot(carteiraRef, aplicarFiltros);

    // Aplica os filtros ao mudar qualquer input
    [filtroTipo, filtroData, filtroDescricao].forEach(element => {
        element.addEventListener("input", () => {
            onSnapshot(carteiraRef, aplicarFiltros);
        });
    });

    // Função para limpar os filtros e recarregar os dados
    btnLimparFiltros.addEventListener("click", () => {
        filtroDescricao.value = "";
        filtroData.value = "";
        filtroTipo.value = "todos";

        // Recarrega os dados sem filtros
        onSnapshot(carteiraRef, aplicarFiltros);
    });

    window.removerTransacao = async (id) => {
        await deleteDoc(doc(db, "carteira", id));
    };
});
