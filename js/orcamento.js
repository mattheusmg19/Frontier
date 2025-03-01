import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

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

async function adicionarJob() {
    let descricao = document.getElementById("descricao").value;
    let quantidade = parseInt(document.getElementById("quantidade").value);
    let tempo = parseFloat(document.getElementById("tempo").value);
    let unidade = document.getElementById("unidadeTempo").value;
    let valorHora = parseFloat(document.getElementById("valorHora").value);
    
    if (unidade === "minuto") {
        tempo = tempo / 60;
    }
    
    let valor = (tempo * valorHora * quantidade).toFixed(2);
    
    await addDoc(collection(db, "orçamento"), {
        descricao,
        quantidade,
        tempo: tempo.toFixed(2),
        unidade,
        valor
    });
    
    let tabela = document.getElementById("tabelaOrcamento");
    let novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `<td>${descricao}</td><td>${quantidade}</td><td>${tempo.toFixed(2)} horas</td><td>R$ ${valor}</td>`;
    
    atualizarTotal();
}

function atualizarTotal() {
    let total = 0;
    let linhas = document.getElementById("tabelaOrcamento").rows;
    for (let i = 0; i < linhas.length; i++) {
        total += parseFloat(linhas[i].cells[3].innerText.replace("R$ ", ""));
    }
    document.getElementById("totalOrcamento").innerText = total.toFixed(2);
}

async function limparTudo() {
    const collectionRef = collection(db, "orçamento");
    const querySnapshot = await getDocs(collectionRef);

    // Deleta todos os documentos encontrados
    querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "orçamento", document.id));
    });

    // Limpa a tabela do HTML após deletar os dados
    document.getElementById("tabelaOrcamento").innerHTML = '';
    atualizarTotal(); // Atualiza o total, que ficará 0 após limpar os dados
}

window.adicionarJob = adicionarJob;
window.limparTudo = limparTudo;

window.adicionarJob = adicionarJob;