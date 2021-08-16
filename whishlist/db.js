let firebase = require('firebase');
let config = require('./config');

const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;