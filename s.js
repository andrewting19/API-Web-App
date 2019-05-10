//PRS Showdown
//Authors: Sadi Gulcelik, Ayesha Ali
//Date: 1/18/19

//required packages
var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
var app = express();
var Developer = require(__dirname + '/models/Developer');
var dat = require(__dirname + '/models/Data');
var dev = require(__dirname + '/models/Developer');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
app.use(require(__dirname + '/controllers/user'));

//app.use(require(__dirname + '/controllers/data'));

//set up server
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));
app.use(express.urlencoded());

var port = process.env.PORT || 3000;
app.listen(port, function () {
    //dataJS.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.get('/', function (request, response) {
    console.log("Get request: /");

    var user_data = {};
    userName = "";
    userPSWD = "";
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('index', {
        page: request.url,
        user: user_data,
        title: "Index"
    });
});

app.get('/main', function (request, response) {
    console.log("Get request: /main");

    var user_data = {};
    userName = "notarealuser";
    userPSWD = "";
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('main', {
        page: request.url,
        user: user_data,
        title: "Main"
    });
});

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
    res.redirect('/');
});
