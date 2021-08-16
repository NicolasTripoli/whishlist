window.onload = (e) => {
    const isFirstLoadInList = window.location.href.includes('ListadeDesejos');
    setCity();
    changePage(isFirstLoadInList);
    setEventesHendler();
}

function setEventesHendler() {
    document.querySelector('#search').addEventListener('keyup', (element) => {
        filterProducts(element.target.value);
    }, false)
    document.querySelector('#listaDesejos').addEventListener('click', (element) => {
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

    document.querySelectorAll('.fa-times-circle').forEach((element) => {
        element.addEventListener('click', (element) => {
            deleteFavorite(element.target)
        }, false)
    })
}

function setBreadcumbsEvents() {
    document.querySelector('.home').addEventListener('click', (element) => {
        changePage(false);
    }, false)
}