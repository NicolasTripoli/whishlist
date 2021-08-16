var firebase = require('firebase');
var config = require('./config');

const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;