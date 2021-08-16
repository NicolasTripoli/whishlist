function findCity(latitude, longitude) {
    fetch("/api/findcity", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": `{"lat":${latitude},"lon":${longitude}}`
    })
        .then(response => {
            return response.json()
        })
        .then(resp => {
            document.querySelector('#city').textContent = resp.data.address.city
        })
        .catch(err => {
            console.error(err);
        });
}

async function getAllProducts() {
    return fetch("/api/products", {
        "method": "GET",
        "headers": {}
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.error(err);
        });
}

async function removeFavoriteProducts(sku) {
    return fetch(`/api/favoriteProducts/${sku}`, {
        "method": "DELETE",
        "headers": {}
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.error(err);
        });
}

async function getAllFavoriteProducts() {
    return fetch(`/api/favoriteProducts`, {
        "method": "GET",
        "headers": {}
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.error(err);
        });
}

async function addFavoriteProducts(sku) {
    return fetch(`/api/favoriteProducts`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({ sku: sku })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.error(err);
        });
}