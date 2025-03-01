document.getElementById('frontier').addEventListener('click', function() {
    fetch('frontier.html') // Carrega o conteúdo do arquivo
        .then(response => response.text())
        .then(data => {
            document.getElementById('popup-content').innerHTML = data; // Insere o conteúdo no popup
            document.getElementById('popup').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        });
});

function openPopup() {
    document.getElementById('popup').classList.add('show');
    document.getElementById('overlay').classList.add('show');
}

function closePopup() {
    document.getElementById('popup').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    
    setTimeout(() => {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }, 300);
}

document.getElementById('frontier').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    setTimeout(openPopup, 10);
});

document.getElementById('closePopup').addEventListener('click', closePopup);
document.getElementById('overlay').addEventListener('click', closePopup);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});