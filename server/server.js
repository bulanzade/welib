// Importing required modules
const cors = require('cors')
const express = require('express')
const session = require('express-session')
const mongoStorage = require('connect-mongo')
const Interceptor = require("./routes/interceptor");

// parse env variables
require('dotenv').config()

require("./helpers/db/mongodb.js")()

// Configuring port
const port = process.env.PORT || 9000

const app = express()

// Configure middlewares
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}))
app.use(session({
    secret: 'welib',
    resave: false,
    saveUninitialized: true,
    cookie:
    {
        maxAge: 36000000,
        sameSite: 'lax'
    },
    store: mongoStorage.create({
        mongoUrl: process.env.DB_URL
    })
}))
app.use(express.json());
app.use(Interceptor);

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/views/'));

// Defining route middleware
app.use('/api', require('./routes/api'));

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);

module.exports = app;
