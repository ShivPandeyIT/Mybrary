//check if production then use env variable
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config() //this is going to load all the variables from .env file and it's going to import them into 
    //our process.env varaible in our application
}

// import express from express library
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

//import the router from index.js file 
const indexRouter = require('./routes/index')

//set view engine, in this case we are going to use ejs as our view engine
app.set('view engine', 'ejs')
//also we want to set where our views are going to coming from, and we're going to put them inside of a views directory
app.set('views', __dirname + '/views')
//hook up Express layouts, so we can use app.set and we tell it we want to set of what our layout file is going to be and
//essentially the idea behind a layout file is that every single file is going to be put inside of this layout file so 
//we don't have to duplicate all of the begning HTML and ending HTML of our projects such as the header and the footer, so that 
//is going to be inside of a layouts folder instead of file called layout
app.set('layout','layouts/layout')
//we also need to tell our Exoress application that we want to use Express layouts so we'll just say after use and 
//we pass in that Express layouts variable that we included from that library
app.use(expressLayouts)
//we also want to tell Express where our public files are going to be these are there's going to be our files 
//such as our style sheets our JavaScript all of our images so we're just going to say that is going to be in place
//called Express static public so again this is just going to a folder in our application
//which is called public (create public folder). public is just a very common name that's used most of the time when
//referring to these public files.
app.use(express.static('public'))

//import mongoose from the library that we installed
const mongoose = require('mongoose')
//now setup connection for our database. But when you have application deployed you want to connect to a server that's on 
//the web somewhere so in here we're going to pass a string for the  URL which is going to come
//from our environment variable
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

//Now we can tell our app that we want to listen on a ceratin port. Server is going to tell us that what port it is listening
//to not us but for development we're just going to default this to port 3000 since the server is not telling us anything for our
//hosting platform so we're just going to use port 3000.
app.listen(process.env.Port || 3000)

//above steps is all that we need to get our server up and running

