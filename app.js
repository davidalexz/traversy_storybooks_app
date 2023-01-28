
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const hbs = require('hbs')
const connectDB = require('./config/db')

// Load config 

dotenv.config({path: './config/config.env'})

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

// Static folder

app.use(express.static('public'))

// Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000//we use process.env to access variable that are in our config file



app.listen(PORT, console.log(`Connected in ${process.env.NODE_ENV} mode on port ${PORT}`))