
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

// Load config 

dotenv.config({path: './config/config.env'})

// Passport config

require('./config/passport')(passport) //we pass in passport from line 6 as an argument so that we can use in the /config/passport.js file

connectDB()

 const app = express()

// Logging
 if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
 }

 // Handlebars

app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

// Sessions middleware

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false, //don't create a session until something is store
	store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder

app.use(express.static('public'))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000//we use process.env to access variable that are in our config file



app.listen(PORT, console.log(`Connected in ${process.env.NODE_ENV} mode on port ${PORT}`))