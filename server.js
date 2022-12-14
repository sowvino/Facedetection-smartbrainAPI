const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');
const port = 3000;



const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'Achu@2019',
        database: 'smart-brain'
    }
});

//db.select('*').from('users').then(data => console.log(data));


const app = express();
app.use(express.json());
app.use(cors());

//
app.get('/', (req, res) => {
    res.send("Its working!!!!");
});

//signing in the form
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });


//registration form 
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

//getting the user profile once it is signed in using id params
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

///counter for no. of times user enters the profile image entry is incremented
app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApicall(req, res) });

app.listen(process.env.PORT || port, function () {
    console.log('app is working');
});

