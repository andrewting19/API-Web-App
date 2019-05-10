//API In The Sky
//Authors: Sadi Gulcelik, Anna Rietbrock, Andrew Ting
//Date: 5/10/19

//required packages
var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
var app = express();
var Developer = require(__dirname + '/models/Developer');
var Data = require(__dirname + '/models/Data');
var Users = require(__dirname+'/models/Users');
var userRoutes = require(__dirname+'/controllers/user');
var dataRoutes = require(__dirname+'/controllers/data');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(require(__dirname + '/controllers/user'));

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
  console.log("Get request: /");

  var user_data={};
  userName = "";
  userPSWD = "";
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {page:request.url, user:user_data, title:"Index"});
});

app.get('/main', function(request, response){
  console.log("Get request: /main");

  var user_data={};
  userName = "notarealuser";
  userPSWD = "";
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('main', {page:request.url, user:user_data, title:"Main"});
});

app.get('/about', function(request, response){
  console.log("Get request: /about");

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('about', {page:request.url, title:"About"});
});

app.get('/logout', function(request, response){
  console.log("Get request: /logout");
  res.redirect('/');
});
