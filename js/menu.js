//ajuste de item ativo e inativo

var menuItem = document.querySelectorAll('.item-menu')

function selectLink(){
    menuItem.forEach((item)=>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')
}

menuItem.forEach((item)=>
    item.addEventListener('click',selectLink)
)

//uso pelo botão de menu hambúrguer

var btnExp = document.querySelectorAll('#btn-exp');
var menuSide = document.querySelectorAll('.menu-lateral');

// ✅ Adiciona a classe "expandir" apenas se a tela for maior que 480px ao carregar a página
window.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth > 480) {
        menuSide.forEach(menu => menu.classList.add('expandir'));
    }
});

// ✅ Mantém a funcionalidade de alternar a classe ao clicar no botão
btnExp.forEach(btn => {
    btn.addEventListener('click', function() {
        menuSide.forEach(menu => {
            menu.classList.toggle('expandir');
        });
    });
});


//tela inteira
function entrarEmTelaCheia() {
    let elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari e Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // Internet Explorer
        elem.msRequestFullscreen();
    }
}

// Tentar ativar o fullscreen ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    entrarEmTelaCheia();
});

document.addEventListener("click", () => {
    entrarEmTelaCheia();
}, { once: true }); // Apenas no primeiro clique

