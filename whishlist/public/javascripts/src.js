var SCREENPRODUCTS = []

function setCity() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                findCity(position.coords.latitude, position.coords.longitude);
            },
            (err) => {
                document.querySelector('#city').textContent = ' - ';
            }
        )
    } else {
        document.querySelector('#city').textContent = ' - ';
    }
}

function renderProducts(products = [], locale) {
    products.forEach(element => {
        var template = document.createElement('template');

        template.innerHTML = "";

        let product =
            `<div class="product">
            ${(locale) ?
                `<div class="delete">
                    <i class="far fa-times-circle" id="${element.sku}"></i>
                 </div>`
                :
                `<div class="flag">
                    <i class="fas fa-heart ${(element.favorite) ? 'active' : ''}" id="${element.sku}"></i>
                 </div>`
            }
                            
                <div class="center">
                    <img src="${element.image}" alt="${element.title}" class="product-image" id="image">
                    <p id="title">${element.title}</p>
                    <p class="price"><span id="currencyFormat">${element.currencyFormat}</span><span id="price">${element.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></p>
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
    const isInList = window.location.href.includes('ListadeDesejos');

    if (text.trim() !== "") {
        let filter = SCREENPRODUCTS.filter((element) => {
            return (element.title.toLowerCase()).includes(text.toLowerCase());
        });
        clearProducts();
        renderProducts(filter, isInList);
    } else {
        clearProducts();
        renderProducts(SCREENPRODUCTS, isInList);
    }
}

function changePage(locale) {
    clearProducts()
    toggleLoad()
    document.querySelector('#search').value = ''
    if (locale) {
        document.querySelector('#breadcumb').innerHTML = `<a href="#home" class="home">Home</a> > Lista de Desejos`
        getAllProducts().then(products => {
            getAllFavoriteProducts().then(favorites => {
                let ajustProducts = products.products.filter(element => {
                    let isFavorite = favorites.data.find(item => {
                        return item.sku == element.sku;
                    })
                    return (isFavorite) ? true : false;
                })
                SCREENPRODUCTS = ajustProducts;

                renderProducts(SCREENPRODUCTS, locale);
                toggleLoad();
            })
        })
    } else {
        document.querySelector('#breadcumb').innerHTML = `<a href="#home" class="home">Home</a>`
        getAllProducts().then(products => {
            getAllFavoriteProducts().then(favorites => {
                if (favorites.data.length > 0) {
                    let ajustProducts = products.products.map(element => {
                        let isFavorite = favorites.data.find(item => {
                            return item.sku == element.sku;
                        })
                        element.favorite = (isFavorite) ? true : false;
                        return element;
                    })
                    SCREENPRODUCTS = ajustProducts;
                } else {
                    SCREENPRODUCTS = products.products;
                }

                renderProducts(SCREENPRODUCTS, locale);
                toggleLoad();
            })
        });
    }
    setBreadcumbsEvents();
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
        let index = SCREENPRODUCTS.findIndex(e=> e.sku == target.id);
        SCREENPRODUCTS[index].favorite = true;
    } else {
        removeFavoriteProducts(target.id);
        let index = SCREENPRODUCTS.findIndex(e=> e.sku == target.id);
        SCREENPRODUCTS[index].favorite = false;
    }
}

function deleteFavorite(target) {
    clearProducts();
    removeFavoriteProducts(target.id);
    changePage(true);
}

function toggleLoad() {
    document.querySelector('#loading').classList.toggle("hide");
}