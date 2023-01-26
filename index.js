const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')

// Load config 

dotenv.config({path: './config/config.env'})

connectDB()

 const app = express()

 if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
 }


const PORT = process.env.PORT || 5000//we use process.env to access variable that are in our config file



app.listen(PORT, console.log(`Connected in ${process.env.NODE_ENV} mode on port ${PORT}`))