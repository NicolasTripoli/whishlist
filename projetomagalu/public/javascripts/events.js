window.onload = (e) => {
    setCity();
    changePage(false);
    setEventesHendler();
}

function setEventesHendler() {
    document.querySelector('#search').addEventListener('keyup', (element) => {
        filterProducts(element.target.value);
    }, false)
    document.querySelector('#listaDesejo').addEventListener('click', (element) => {
        changePage(true);
    }, false)
    document.querySelector('#logo').addEventListener('click', (element) => {
        changePage(false);
    }, false)
}

function setFavoriteEvent() {
    document.querySelectorAll('.flag').forEach((element) => {
        element.addEventListener('click', (element) => {
            toggleFavorite(element.target)
        }, false)
    })
}