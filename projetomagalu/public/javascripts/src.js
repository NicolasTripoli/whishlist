var SCREENPRODUCTS = []

function setCity() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                findCity(position.coords.latitude, position.coords.longitude)
            },
            (err) => {
                document.querySelector('#city').textContent = ' - '
            }
        )
    } else {
        document.querySelector('#city').textContent = ' - '
    }
}

function renderProducts(products = [], locale) {
    clearProducts();
    products.forEach(element => {
        var template = document.createElement('template');

        template.innerHTML = "";

        let product =
            `<div class="product">
            ${(locale) ?
                `<div class="delete">
                    <i class="far fa-times-circle" id="${element.sku}"></i>s
                 </div>`
                :
                `<div class="flag ${(false) ? 'active' : ''}">
                    <i class="fas fa-heart" id="${element.sku}"></i>
                 </div>`
            }
                            
                <div class="center">
                    <img src="${element.image}" alt="${element.title}" class="product-image" id="image">
                    <p id="title">${element.title}</p>
                    <p class="price"><span id="currencyFormat">${element.currencyFormat}</span><span id="price">${element.price.toLocaleString()}</span></p>
                </div>
             </div>`;

        template.innerHTML = product;

        document.querySelector(".products").appendChild(template.content.firstChild);
    });
    setFavoriteEvent();
}

function clearProducts() {
    document.querySelector(".products").innerHTML = "";
}

function filterProducts(text) {
    if (text.trim() !== "") {
        let filter = SCREENPRODUCTS.filter((element) => {
            return (element.title.toLowerCase()).includes(text.toLowerCase());
        });
        clearProducts();
        renderProducts(filter);
    } else {
        clearProducts();
        renderProducts(SCREENPRODUCTS);
    }
}

function changePage(locale) {
    toggleLoad()
    document.querySelector('#search').value = ''
    if (locale) {
        document.querySelector('#breadcumb').innerHTML += ` > Lista de Desejos`
        renderProducts([], locale);
        toggleLoad();
    } else {
        document.querySelector('#breadcumb').innerHTML = `<a href="#home" class="home">Home</a>`
        getAllProducts().then(data => {
            SCREENPRODUCTS = data.products;
            renderProducts(SCREENPRODUCTS, locale);
            toggleLoad();
        });
    }
}

function toggleFavorite(element) {
    let target;
    if (element.tagName === "I") {
        target = element;
    } else {
        target = element.querySelector('i');
    }
    target.classList.toggle("active");
    if (target.classList.toString().includes('active')) {
        addFavoriteProducts(target.id);
    } else {
        removeFavoriteProducts(target.id);
    }
}

function toggleLoad() {
    document.querySelector('#loading').classList.toggle("hide")
}