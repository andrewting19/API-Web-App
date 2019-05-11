//PRS Showdown
//Authors: Sadi Gulcelik, Ayesha Ali
//Date: 1/18/19

//required packages
var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
var app = express();
var dat = require(__dirname + '/models/Data');
var http = require('http');
var url = require('url');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
app.use(require(__dirname + '/controllers/data'));
app.use(require(__dirname + '/controllers/user'));

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);



//set up server
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));
app.use(express.urlencoded());

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server started at ' + new Date() + ', on port ' + port + '!');
});


app.get('/', function (request, response) {
    console.log("Get request: /");

    var user_data = {};
    userName = "";
    userPSWD = "";
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('index', {
        dirname: __dirname,
        page: request.url,
        user: user_data,
        title: "Index",
        feedback: "Webpage is loaded and ready to rumble!"
    });
});

// app.get('/main', function (request, response) {
//     console.log("Get request: /main");
//
//     var user_data = {};
//     userName = "notarealuser";
//     userPSWD = "";
//     response.status(200);
//     response.setHeader('Content-Type', 'text/html')
//     response.render('main', {
//         page: request.url,
//         user: user_data,
//         title: "Main"
//     });
// });
app.get('/about', function (request, response) {
    console.log("Get request: /about");

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('about', {
        page: request.url,
        title: "About"
    });
});


app.get('/logout', function (request, response) {
    console.log("Get request: /logout");
    response.redirect('/');
});
