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
app.use(methodOverride('_method'));

//set up server
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));
app.use(express.urlencoded());

var port = process.env.PORT || 3000;
app.listen(port, function(){
  //dataJS.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.get('/', function(request, response){
    //dataJS.increment("index");
  var user_data={};
  userName = "";
  userPSWD = "";
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {page:request.url, user:user_data, title:"Index"});
});

app.get('/main', function(request, response){
  var user_data={};
  userName = "notarealuser";
  userPSWD = "";
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('main', {page:request.url, user:user_data, title:"Main"});
});

app.get('/logout', function(request, response){
  console.log("Get request: /logout");
  res.redirect('/');
});
