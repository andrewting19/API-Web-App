var express = require('express');
var fs = require("fs");
var router = express.Router();
var Users = require('../models/User');
var Data = require('../models/data');
var Villains = require('../models/Villain');
var userName;
var userPSWD;

//login request; renders either index if password is wrong
//or main if correct login entered
router.get('/users/:id/main', function(request, response){
  console.log("GET REQUEST /users/game: "+request.query.player_name+" at "+ new Date());
  Villains.changeColors();
  //set up data
  var user_data={
    name: request.query.player_name,
    pswd: request.query.pswd
  };
  userName = user_data["name"];
  userPSWD = user_data["pswd"];
  Users.getUser(userName, function(user_data){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    if (user_data["name"] == "") {//if someone accidentally submits login w/o entering anything
      console.log(user_data["name"]);
      response.render('index', {page:request.url, user:user_data, title:"Index"});
    } else if (user_data.pswd == userPSWD) {
      response.render('main', {page:request.url, user:user_data, title:"index"});
    } else {
      user_data["failure"] = 4;
      userName = "";
      userPSWD = "";
      response.render('index', {page:request.url, user:user_data, title:"Index"});
    }
  });
});

//request for returning to main page; same as the login request w/o having to log in again
router.get('/users/main', function(request, response){
  console.log("GET /playAgain at"+new Date());
  //use the saved username and password which resets when you return to login page
  var user_data={};
  user_data["name"] = userName;
  user_data["pswd"] = userPSWD;
  // var csv_data = console.loadCSV("data/users.csv");
  //if the saved username is empty than return to index page
  if (user_data["name"] == "") {//if someone accidentally submits login w/o entering anything

    response.render('index', {page:request.url, user:user_data, title:"Index"});
  } else {

    response.render('main', {page:request.url, user:user_data, title:"playGame"});
  }
});

//request for when user does not choose a valid weapon or villain
router.get('/error', function(request, response){
  //use the saved username and password which resets when you return to login page
  var user_data={};
  user_data["name"] = userName;
  user_data["pswd"] = userPSWD;
  response.render('game', {page:request.url, user:user_data, title:"error"});
});

//request for when user clicks create account; shows new user form
router.get('/users/new', function(req, res){
  console.log("GET REQUEST /users/new at"+ new Date());
  var u;
  var feedback = {
    failure:0
  }
  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  res.render('user_details', {user:u, feedback:feedback, title:"create"});
});

//request for when user creates an account; creates a user, returns to login index
router.post('/users',function(req,res){
  console.log('POST Request- /Users'+" at "+ new Date());
  var u = {
    name: req.body.player_name,
    pswd: req.body.pswd,
    first: req.body.first,
    last: req.body.last
  }
  var feedback = {
    failure: 0
  }
  Users.createUser(u.name, u.pswd, u.first,u.last, function(result, feedbackN){
    if (result) {
      res.redirect('/');
    } else {
      var u;
      feedback["failure"] = feedbackN;
      res.status(200);
      res.setHeader('Content-Type', 'text/html')
      res.render('user_details', {user:u, feedback:feedback, title:"create"});
    }
  });
});

//request for when user chooses to edit account after logging in; shows edit form
router.get('/user/:id/edit', function(req, res){
  console.log("GET REQUEST /users/"+req.params.id+"/edit"+" at "+ new Date());
  var feedback = {
    failure:0
  }
  var u = Users.getUser(req.params.id, function(u){
    console.log(u)
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('user_details', {user:u, feedback:feedback, title:"update"});
  });
});

//request for when user chooses to delete account; deletes account, returns to index
router.delete('/user/:id', function (req, res) {
  console.log("DELETE REQUEST /users/"+req.params.id+" at "+ new Date());
  Users.deleteUser(req.params.id, function(){
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.redirect('/');
  });
})

//request for when user updates account; updates user with :id
router.put('/user/:id', function (req, res) {
  console.log("PUT REQUEST /users/"+req.params.id+" at "+ new Date());
  var u = {
    original_name: req.params.id,
    name: req.body.player_name,
    pswd: req.body.pswd,
    first: req.body.first,
    last: req.body.last
  }
  console.log(u);
  var feedback = {
    failure:0
  }

  res.status(200);
  res.setHeader('Content-Type', 'text/html')

  if (u.name==null||u.name==""||u.pswd==null||u.pswd==""||u.first==null||u.first==""||u.last==null||u.last==""){
      console.log("inv");
      result= false;
      feedback["failure"]= 42;
      Users.getUser(u.original_name, function(user) {
        res.render('user_details', {user:user, feedback:feedback, title:"update"});
      })
  }

  if (u.original_name != u.name) {
    Users.getUser(u.name, function(user) {
      if (user.name == "notarealuser") {
        Users.getUser(u.original_name, function(original_user) {
          var date = Users.returnDate();
          var user_array = [u.name, u.pswd, original_user.total, original_user.wins, original_user.losses, original_user.rock, original_user.paper, original_user.scissors, u.first, u.last, original_user.creation, date]
          Users.updateUser(u.original_name, user_array, function(){
            u.creation = user_array[10]
            u.update = user_array[11]
            res.render('user_details', {user:u, feedback:feedback, title:"update"});
          });
        });
      } else {
            u.name=u.original_name;
            u.creation = user_array[10]
            u.update = user_array[11]
            res.render('user_details', {user:u, feedback:feedback, title:"update"});
        }
      })
  } else {
      Users.getUser(u.original_name, function(original_user) {
        // console.log(original_user);
        var date = Users.returnDate();
        var user_array = [u.original_name, u.pswd, original_user.total, original_user.wins, original_user.losses, original_user.rock, original_user.paper, original_user.scissors, u.first, u.last, original_user.creation, date]
        Users.updateUser(u.original_name, user_array, function(){
          u.creation = user_array[10]
          u.update = user_array[11]
          res.render('user_details', {user:u, feedback:feedback, title:"update"});
        });
      });
    }
});

//game handling
router.get('/users/:id/results', function(request, response){
  console.log("GET REQUEST /users/"+request.params.id+"/results"+" at "+ new Date());
  var user_data={
    name: request.params.id,
    pswd: request.params.pswd,
    zipcode: request.query.zipcode,
    neighborhood: request.query.neighborhood
  };

  var villainPrevious=fs.readFileSync("data/villainPrevious.txt",'utf8');
  var userPrevious=fs.readFileSync("data/userPrevious.txt",'utf8');

  if (user_data.weapon=="error"||user_data.villain=="error"){
    response.redirect("/error");
  } else{
    var villainWeapon= "";
    var arr = Users.handleThrow(user_data.weapon, user_data.villain, villainWeapon, villainPrevious,userPrevious);
    user_data["result"] = arr[0];
    user_data["response"] =arr[1];

    Users.getUser(user_data.name, function(user_obj) {
      user_obj.total =parseInt(user_obj.total)+1
      user_obj[user_data.weapon]=parseInt(user_obj[user_data.weapon])+ 1
      switch(user_data["result"]){
        case "won":
          user_obj.wins =parseInt(user_obj.wins)+1
          break;
        case "lost":
          user_obj.losses =parseInt(user_obj.losses)+1
          break;
      }
      var user_array = [user_obj.name, user_obj.pswd, user_obj.total, user_obj.wins, user_obj.losses, user_obj.rock, user_obj.paper, user_obj.scissors, user_obj.first, user_obj.last, user_obj.creation, user_obj.update]
      Villains.getVillain(user_data.villain, function(villain_obj){
        villain_obj.total =parseInt(villain_obj.total)+1
        villain_obj[user_data["response"]]=parseInt(villain_obj[user_data["response"]])+1
        switch(user_data["result"]){
            case "won":
              villain_obj.losses = parseInt(villain_obj.losses)+1
              break;
            case "lost":
              villain_obj.wins = parseInt(villain_obj.wins)+1
              break;
          }
        var villain_array = [villain_obj.name, villain_obj.total, villain_obj.wins, villain_obj.losses, villain_obj.rock, villain_obj.paper, villain_obj.scissors]
        Users.updateUser(user_obj.name, user_array, function(){
          Villains.updateVillain(villain_obj.name, villain_array, function(){
            response.status(200);
            response.setHeader('Content-Type', 'text/html')
            response.render('results',{page:request.url, user:user_data, title:"results"});
          });
        });
      });
    });
  }
});

module.exports = router;
