//PRS Showdown
//Authors: Sadi Gulcelik, Ayesha Ali
//Date: 1/18/19

//required packages
var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
var app = express();
var dat = require(__dirname + '/models/Data');
var dev = require(__dirname + '/models/Developer');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
app.use(require(__dirname + '/controllers/data'));
app.use(require(__dirname + '/controllers/user'));



//set up server
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));
app.use(express.urlencoded());

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server started at '+ new Date()+', on port ' + port+'!');
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
        title: "Index"
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
app.get('/results', function (request, response) {
    console.log("Get request: /about");
    zipcode = req.body.zipcode;
    neighborhood = req.body.neighborhood;
    var dist = Data.pdistribution(user_data.zipcode);
    var cas = Data.pcases(null, user_data.neighborhood, null, null);
    Promise.all([dist, cas]).then(function (info) {
        console.log(dist);
        console.log(cas);
        response.render('results', {
            page: request.url,
            info: info,
            title: "Result"
        });
    });
});

app.get('/logout', function (request, response) {
    console.log("Get request: /logout");
    res.redirect('/');
});
