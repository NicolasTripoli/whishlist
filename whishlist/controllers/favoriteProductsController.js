var firebase = require('../db');
var favoriteProducts = require('../models/favoriteProducts');
var firestore = firebase.firestore();

const addFavoriteProducts = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('favoriteProducts').doc().set(data);
        res.json({ status: 200, text: 'Ok: Record saved successful.' });
    } catch (error) {
        res.status(400).json({ status: 400, text: `Error: ${error.message}.` });
    }
}

const getAllFavoriteProducts = async (req, res, next) => {
    try {
        const products = await firestore.collection('favoriteProducts');
        const data = await products.get();
        const productsArray = []
        if (data.empty) {
            res.json({ status: 200, text: 'Warning: No data in data base', data: [] })
        } else {
            data.forEach((element) => {
                const product = new favoriteProducts(
                    element.id,
                    element.data().sku
                )
                productsArray.push(product);
            });
            res.json({ status: 200, text: 'Ok', data: productsArray })
        }
    } catch (error) {
        res.status(400).json({ status: 400, text: `Error: ${error.message}.` });
    }
}

const removeFavoriteProducts = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('favoriteProducts')
            .where("sku", "==", id)
            .get()
            .then(function (data) {
                if (data.empty) {
                    res.json({ status: 200, text: 'Warning: No data in data base' })
                } else {
                    data.forEach(function (document) {
                        document.ref.delete();
                    });
                    res.json({ status: 200, text: 'Ok' })
                }
            });
    } catch (error) {
        res.status(400).json({ status: 400, text: `Error: ${error.message}.` });
    }
}

module.exports = {
    addFavoriteProducts,
    getAllFavoriteProducts,
    removeFavoriteProducts
}