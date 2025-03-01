const daysContainer = document.querySelector(".days");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const prevYearBtn = document.getElementById("prevYear");
const nextYearBtn = document.getElementById("nextYear");
const selectedDate = document.getElementById("selectedDate");
const appointmentsList = document.getElementById("appointments");
const newAppointmentInput = document.getElementById("newAppointment");
const addAppointmentBtn = document.getElementById("addAppointment");

let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    
    monthYear.innerText = `${monthNames[month]} ${year}`;
    daysContainer.innerHTML = "";

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement("div");
        daysContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= lastDateOfMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.innerText = day;

        if (
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()
        ) {
            dayElement.classList.add("today");
        }

        dayElement.addEventListener("click", () => {
            const selectedFullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            selectedDate.innerText = `${day} de ${monthNames[month]} de ${year}`;
            
            // Atualizar os compromissos para o novo dia selecionado
            getAppointments();
        });

        daysContainer.appendChild(dayElement);
    }
}

prevMonthBtn.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

prevYearBtn.addEventListener("click", function () {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    renderCalendar();
});

nextYearBtn.addEventListener("click", function () {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    renderCalendar();
});


window.addEventListener("load", () => {
    renderCalendar();
    const todayDate = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
    selectedDate.innerText = `${new Date().getDate()} de ${new Date().toLocaleString('pt-BR', { month: 'long' })} de ${new Date().getFullYear()}`;
    
    // Atualizar os compromissos ao carregar
    getAppointments();
});
