// Gráfico de Total de Projetos (Barra)
const projectsCtx = document.getElementById('projectsChart').getContext('2d');
const projectsChart = new Chart(projectsCtx, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [{
            label: '',
            data: [5, 9, 7, 8, 6],
            backgroundColor: 'rgba(54, 162, 235, 0.4)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 3
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false  // Remove o quadradinho da legenda
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.raw;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Gráfico de Ganhos do Mês (Linha)
const earningsCtx = document.getElementById('earningsChart').getContext('2d');
const earningsChart = new Chart(earningsCtx, {
    type: 'line',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [{
            label: '',
            data: [2000, 3500, 2700, 3300, 2800],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
            fill: true
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false  // Remove o quadradinho da legenda
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.raw;
                    }
                }
            },
            datalabels: {
                display: true,
                align: 'top',
                color: '#333',
                font: {
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Gráfico de Tarefas Pendentes (Doughnut)
const tasksCtx = document.getElementById('tasksChart').getContext('2d');
const tasksChart = new Chart(tasksCtx, {
    type: 'bar',
    data: {
        labels: ['Concluídas', 'Pendentes'],
        datasets: [{
            label: 'Tarefas',
            data: [12, 8],
            backgroundColor: ['rgba(89, 189, 241, 0.4)', 'rgba(245, 181, 11, 0.4)'],
            borderColor: ['#59BDF1', '#F5B50B'],
            borderWidth: 3
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false  // Remove o quadradinho da legenda
            }
        }
    }
});

// Gráfico de Avaliações dos Clientes (Radar)
const ratingsCtx = document.getElementById('ratingsChart').getContext('2d');
const ratingsChart = new Chart(ratingsCtx, {
    type: 'line',
    data: {
        labels: ['Design', 'Pontualidade', 'Comunicação', 'Criatividade', 'Preço'],
        datasets: [{
            label: '',
            data: [4.5, 4.8, 4.2, 4.7, 4.6],
            backgroundColor: 'rgba(255, 99, 132, 0.4)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: true,
            borderWidth: 3
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false  // Remove o quadradinho da legenda
            }
        }
    }
});

// Gráfico de Controle Financeiro (Barra)
const financeCtx = document.getElementById('financeChart').getContext('2d');
const financeChart = new Chart(financeCtx, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [{
            label: '',
            data: [1500, 1800, 1200, 1400, 1600],
            backgroundColor: 'rgba(255, 159, 64, 0.4)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 3
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false  // Remove o quadradinho da legenda
            },
            datalabels: {
                display: true,
                align: 'top',
                color: '#333',
                font: {
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// gráfico de horas trabalhadas por mês
const hoursCtx = document.getElementById('hoursChart').getContext('2d');
const hoursChart = new Chart(hoursCtx, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [{
            label: 'Horas Trabalhadas',
            data: [120, 135, 150, 140, 160], // Valores de exemplo
            backgroundColor: 'rgba(255, 206, 86, 0.4)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false // Remove o quadradinho da legenda
            },
            tooltip: {
                enabled: true
            }
        }
    }
});
