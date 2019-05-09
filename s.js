var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
var app = express();
var dat = require(__dirname + '/models/Data');
var all_users = dat.loadGoogle(function (all_users) {
    console.log(all_users);
});

//set up server
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));
app.use(express.urlencoded());
app.use(require('./controllers/user')); //change?

var port = process.env.PORT || 3000;
app.listen(port, function () {
    //dat.log('Server started at ' + new Date() + ', on port ' + port + '!');
});

app.get('/', function (request, response) {
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

app.get('/logout', function (request, response) {
    console.log("Get request: /logout");
    response.redirect('/');
});
