var express = require('express');
var fs = require("fs");
var router = express.Router();

var Users = require('../models/Users');
var Data = require('../models/data');
var userName;
var userPSWD;

class User {
    constructor(username, password, zipcode, neighborhood) {
        this.username = username;
        this.password = password;
        this.zipcode = zipcode;
        this.neighborhood = neighborhood;
    }
}


//login request; renders either index if password is wrong
//or main if correct login entered
router.get('/users/main', function (request, response) {
    console.log("GET REQUEST /users/main/" + request.query.player_name + " at " + new Date());
    var user_data = {
      name: request.query.player_name,
      password: request.query.password
    };
    userName = user_data.name;
    userPSWD=user_data.password;
    //response.render('main', {user:user_data});
    //set up data
    Users.getUser(userName, function (user_data) {
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        if (user_data["name"] == "") { //if someone accidentally submits login w/o entering anything
            console.log(user_data["name"]+" <- blank name entered, login failed");
            response.render('index', {
                page: request.url,
                user: user_data,
                title: "Index"
            });
        } else if (user_data.pswd == userPSWD) {
            console.log("Successful login, getting main page");
            response.render('main', {
                page: request.url,
                user: user_data,
                title: "Main"
            });
        } else {
            console.log("Incorrect username entered, login failed");
            user_data["failure"] = 4;
            userName = "";
            userPSWD = "";
            response.render('index', {
                page: request.url,
                user: user_data,
                title: "Index"
            });
        }
    });
});



//request for returning to main page; same as the login request w/o having to log in again
/*router.get('/users/main', function(request, response){
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
});*/

//request for when user does not choose a valid weapon or villain
router.get('/error', function (request, response) {
    //use the saved username and password which resets when you return to login page
    var user_data = {};
    user_data["name"] = userName;
    user_data["pswd"] = userPSWD;
    response.render('game', {
        page: request.url,
        user: user_data,
        title: "error"
    });
});

//request for when user clicks create account; shows new user form
router.get('/user/new', function (req, res) {
    console.log("GET REQUEST /users/new at" + new Date());
    var u;
    var feedback = {
        failure: 0
    }
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('user_details', {
        user: u,
        feedback: feedback,
        title: "create"
    });
});

//request for when user creates an account; creates a user, returns to login index
router.post('/users', function (req, res) {
    console.log('POST Request- /Users' + " at " + new Date());
    var u = {
        name: req.body.name,
        password: req.body.password,
        zipcode: req.body.zipcode,
        neighborhood: req.body.neighborhood
    }
    var feedback = {
        failure: 0
    }
    Users.createUser(u, function (result, feedback) {
        if (result) {
            res.redirect('/');
        } else {
            advice["failure"] = feedback;
            res.status(200);
            res.setHeader('Content-Type', 'text/html')
            res.render('user_details', {
                user: u,
                feedback: advice,
                title: "create"
            });
        }
    });
});

//request for when user chooses to edit account after logging in; shows edit form
router.get('/user/:id/edit', function (req, res) {
    console.log("GET REQUEST /users/" + req.params.id + "/edit" + " at " + new Date());
    var feedback = {
        failure: 0
    }
    var u = Users.getUser(req.params.id, function (u) {
        console.log(u)
        res.status(200);
        res.setHeader('Content-Type', 'text/html')
        res.render('user_details', {
            user: u,
            feedback: feedback,
            title: "update"
        });
    });
});

//request for when user chooses to delete account; deletes account, returns to index
router.delete('/user/:id', function (req, res) {
    console.log("DELETE REQUEST /users/" + req.params.id + " at " + new Date());
    Users.deleteUser(req.params.id, function () {
        res.status(200);
        res.setHeader('Content-Type', 'text/html')
        res.redirect('/');
    });
})

//request for when user updates account; updates user with :id
router.put('/user/:id', function (req, res) {
    console.log("PUT REQUEST /users/" + req.params.id + " at " + new Date());
    var u = {
        original_name: req.params.id,
        name: req.body.player_name,
        pswd: req.body.pswd,
        first: req.body.first,
        last: req.body.last
    }
    console.log(u);
    var feedback = {
        failure: 0
    }

    res.status(200);
    res.setHeader('Content-Type', 'text/html')

    if (u.name == null || u.name == "" || u.pswd == null || u.pswd == "" || u.first == null || u.first == "" || u.last == null || u.last == "") {
        console.log("inv");
        result = false;
        feedback["failure"] = 42;
        Users.getUser(u.original_name, function (user) {
            res.render('user_details', {
                user: user,
                feedback: feedback,
                title: "update"
            });
        })
    }

    if (u.original_name != u.name) {
        Users.getUser(u.name, function (user) {
            if (user.name == "notarealuser") {
                Users.getUser(u.original_name, function (original_user) {
                    var date = Users.returnDate();
                    var user_array = [u.name, u.pswd, original_user.total, original_user.wins, original_user.losses, original_user.rock, original_user.paper, original_user.scissors, u.first, u.last, original_user.creation, date]
                    Users.updateUser(u.original_name, user_array, function () {
                        u.creation = user_array[10]
                        u.update = user_array[11]
                        res.render('user_details', {
                            user: u,
                            feedback: feedback,
                            title: "update"
                        });
                    });
                });
            } else {
                u.name = u.original_name;
                u.creation = user_array[10]
                u.update = user_array[11]
                res.render('user_details', {
                    user: u,
                    feedback: feedback,
                    title: "update"
                });
            }
        })
    } else {
        Users.getUser(u.original_name, function (original_user) {
            // console.log(original_user);
            var date = Users.returnDate();
            var user_array = [u.original_name, u.pswd, original_user.total, original_user.wins, original_user.losses, original_user.rock, original_user.paper, original_user.scissors, u.first, u.last, original_user.creation, date]
            Users.updateUser(u.original_name, user_array, function () {
                u.creation = user_array[10]
                u.update = user_array[11]
                res.render('user_details', {
                    user: u,
                    feedback: feedback,
                    title: "update"
                });
            });
        });
    }
});

//Shows results of a user after input neighborhood and zipcode,
//shows # of diagnoses in area and nearest condom distribution center
router.get('/users/:id/results', function (request, response) {
    console.log("GET REQUEST /users/" + request.params.id + "/results" + " at " + new Date());
    var user_data = {
        name: request.params.id,
        pswd: request.params.pswd,
        zipcode: request.query.zipcode,
        neighborhood: request.query.neighborhood
    };

    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('results', {
        user: user_data
    });
});

module.exports = router;
