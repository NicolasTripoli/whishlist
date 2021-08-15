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
    return fetch("http://localhost:3000/api/products", {
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