let express = require('express');
let router = express.Router();
let axios = require('axios');
let { addFavoriteProducts, getAllFavoriteProducts, removeFavoriteProducts } = require('../controllers/favoriteProductsController');

router.post('/findcity', (req, res, next) => {
    const { lat, lon } = req.body;

    const options = {
        method: 'GET',
        url: 'https://us1.locationiq.com/v1/reverse.php',
        params: {
            key: 'pk.acfd93d5dc736915c1282267c4d13368',
            lat: lat,
            lon: lon,
            zoom: '10',
            format: 'json'
        }
    };

    axios.request(options).then(function (response) {
        const data = {
            place_is: response.data.place_id,
            address: response.data.address
        }
        res.json({ status: 200, text: 'success', data: data });
    }).catch(function (error) {
        res.json({ status: 500, text: 'error', data: error });
    });
});

router.get('/products', (req, res, next) => {
    const options = {
        method: 'GET',
        url: 'https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e'
    };

    axios.request(options).then(function (response) {
        res.json({ status: 200, text: 'success', ...response.data });
    }).catch(function (error) {
        res.json({ status: 500, text: 'error', data: error });
    });
})

router.post('/favoriteProducts', addFavoriteProducts);

router.get('/favoriteProducts', getAllFavoriteProducts);

router.delete('/favoriteProducts/:id', removeFavoriteProducts);

module.exports = router;
