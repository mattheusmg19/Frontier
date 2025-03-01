import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Sua configuração do Firebase
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

// Função para carregar todas as tarefas
async function loadTasks() {
    const querySnapshot = await getDocs(collection(db, "teste"));
    const notDoneList = document.getElementById("not-done-list");
    const doneList = document.getElementById("done-list");

    notDoneList.innerHTML = "";
    doneList.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const task = doc.data();
        const taskId = doc.id;
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        
        // Adiciona título e descrição
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button class="toggle-btn" data-id="${taskId}">${task.completed ? "Pendente" : "Concluída"}</button>
            <button class="delete-btn" data-id="${taskId}">Excluir</button>
        `;

        // Adiciona ao cartão apropriado
        if (task.completed) {
            doneList.appendChild(taskElement);
        } else {
            notDoneList.appendChild(taskElement);
        }
    });

    // Associando o evento de clique aos botões de "marcar como concluído"
    const toggleButtons = document.querySelectorAll(".toggle-btn");
    toggleButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const taskId = e.target.getAttribute("data-id");
            const taskRef = doc(db, "teste", taskId);
            
            // Pega o status atual da tarefa
            const isCompleted = e.target.textContent === "Concluída";

            updateDoc(taskRef, { completed: isCompleted })
                .then(() => {
                    loadTasks(); // Recarrega as tarefas após a alteração
                })
                .catch(error => console.error("Erro ao alterar o status da tarefa:", error));
        });
    });

    // Associando o evento de clique aos botões de "Excluir"
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const taskId = e.target.getAttribute("data-id");
            const taskRef = doc(db, "teste", taskId);
            
            deleteDoc(taskRef)
                .then(() => {
                    loadTasks(); // Recarrega as tarefas após exclusão
                })
                .catch(error => console.error("Erro ao excluir a tarefa:", error));
        });
    });
}

// Função para adicionar uma nova tarefa
document.getElementById("add-task").addEventListener("click", async () => {
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-desc").value;

    if (title && description) {
        try {
            await addDoc(collection(db, "teste"), {
                title: title,
                description: description,
                completed: false
            });
            loadTasks(); // Recarrega as tarefas
        } catch (e) {
            console.error("Erro ao adicionar tarefa: ", e);
        }
    } else {
        alert("Preencha o título e a descrição!");
    }
});

// Função para limpar todas as tarefas
document.getElementById("clear-tasks").addEventListener("click", async () => {
    const querySnapshot = await getDocs(collection(db, "teste"));
    
    querySnapshot.forEach(async (doc) => {
        const taskRef = doc(db, "teste", doc.id);
        await deleteDoc(taskRef);
    });

    loadTasks(); // Recarrega as tarefas
});

// Carrega as tarefas ao carregar a página
loadTasks();
