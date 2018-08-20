const express = require('express');
const bodyparser = require('body-parser');
const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');
const model = require('./model')

let config = {
    apiKey: "AIzaSyBzJkS7Igw3rml52rSDt-A8c8XuQD4tFSo",
    authDomain: "sbuy-wallet.firebaseapp.com",
    databaseURL: "https://sbuy-wallet.firebaseio.com",
    projectId: "sbuy-wallet",
    storageBucket: "sbuy-wallet.appspot.com",
    messagingSenderId: "939709253749"
};
firebase.initializeApp(config);

const app = express();

app.use(bodyparser.urlencoded({ extended: false  }));
app.use(bodyparser.json({ extended: false  }));

app.use(express.static('app/public'))
app.set('views', './app/public/views')
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index.ejs")
})
    
app.post('/signin', (req, res) => {
    let Email = req.body.Email, password = req.body.password
    // res.send(`username ${Email} Password ${password}`)
    firebase.auth().signInWithEmailAndPassword(Email, password)
    .then( () => res.send("<h1> success <h1>"))
    .catch( error => res.send(`${error.code}`));

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Run Port ${PORT}.... `))