var express = require('express')
var app = express()
var mysql = require('mysql')

/**
 * This middleware provides a consistent API 
 * for MySQL connections during request/response life cycle
 */ 
var myConnection  = require('./lib/db')

/**
 * setting up the templating view engine
 */ 
app.set('view engine', 'ejs')

/**
 * import routes/index.js
 * import routes/products.js
 */ 
// var index = require('./routes/index')
var products = require('./routes/')

/**
 * Express Validator Middleware for Form Validation
 */ 
var expressValidator = require('express-validator')
app.use(expressValidator())

/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads the form's input 
 * and store it as a javascript object
 */ 
var bodyParser = require('body-parser')
/**
 * bodyParser.urlencoded() parses the text as URL encoded data 
 * (which is how browsers tend to send form data from regular forms set to POST) 
 * and exposes the resulting object (containing the keys and values) on req. body.
 */ 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 
var methodOverride = require('method-override')

/**
 * using custom logic to override method
 * 
 * there are other ways of overriding as well
 * like using header & using query value
 */ 
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash())

// app.use('/', index)
app.use('/products', products)

app.listen(8000, function(){
    console.log('Server running at port 8000: http://127.0.0.1:8000')
})