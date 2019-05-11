var express = require('express');
var fs = require("fs");
var router = express.Router();
var Promise = require('promise');
var http = require('http');
var url = require('url');
var Users = require('../models/Users');
var dat = require('../models/Data');
var userName;
var userPSWD;

//login request; renders either index if password is wrong
//or main if correct login entered
router.get('/users/backtomain', function (request, response) {
    if (userName == null) {
        response.redirect('/');
    } else {
        Users.getUser(userName, function (user_data) {
            response.status(200);
            response.setHeader('Content-Type', 'text/html')
            /*var previous;
            var previousData;
            try {
                previous = fs.readFileSync(__dirname"/data/" + user_data.username + ".txt ", 'utf8');
                var prevd = previous.split(',')[0].split("~");
                var prevc = previous.split(',')[1].split("~");
                previousData = ("You previously looked at the distribution centers at zip code(s)" + prevd.join(", ") + "and the statistics in " + prevd.join(", ") + ".");
            } catch (err) {
                previous = "#";
                previousData = ("No previous view is recorded. ")
            }*/
            var dist = dat.pdistribution(user_data.zipcode);
            var cas = dat.pcases(null, user_data.neighborhood, null, null);
            Promise.all([dist, cas]).then(function (info) {
                response.render('main', {
                    page: request.url,
                    info: info,
                    user: user_data,
                    //previous: previous,
                    //previousData: previousData,
                    title: "Main"
                });
            });
        });
    }

});
router.get('/users/main', function (request, response) {

    console.log("GET REQUEST /users/main/" + request.query.player_name + " at " + new Date());
    var user_data = {
        name: request.query.player_name,
        password: request.query.password
    };
    userName = user_data.name;
    userPSWD = user_data.password;
    //response.render('main', {user:user_data});
    //set up data
    Users.getUser(userName, function (user_data) {
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        if (user_data["username"] == "") { //if someone accidentally submits login w/o entering anything
            console.log(user_data["username"] + " <- blank name entered, login failed");
            response.render('index', {
                page: request.url,
                user: user_data,
                title: "Index",
                feedback: "Please enter a username to continue."
            });
        } else if (user_data.password == userPSWD) {
            /*var previous;
            var previousData;
            try {
                previous = fs.readFileSync("../data/" + user_data.username + ".txt ", 'utf8');
                var prevd = previous.split(',')[0].split("~");
                var prevc = previous.split(',')[1].split("~");
                previousData = ("You previously looked at the distribution centers at zip code(s)" + prevd.join(", ") + "and the statistics in " + prevd.join(", ") + ".");
            } catch (err) {
                previous = "#";
                previousData = ("No previous view is recorded. ")
            }*/
            var dist = dat.pdistribution(user_data.zipcode);
            var cas = dat.pcases(null, user_data.neighborhood, null, null);

            Promise.all([dist, cas]).then(function (info) {
                response.render('main', {
                    page: request.url,
                    info: info,
                    user: user_data,
                    //previous: previous,
                    //previousData: previousData,
                    title: "Main"
                });
            });

        } else {
            console.log("Incorrect password or username entered, login failed");
            user_data["failure"] = 4;
            userName = "";
            userPSWD = "";
            response.render('index', {
                page: request.url,
                user: user_data,
                title: "Index",
                feedback: "Username or password was incorrect. Please enter a correct username and password to continue."
            });
        }
    });
});


router.get('/users/results', function (request, response) {
    console.log("Get request: /results");

    var queryData = url.parse(request.url, true).query;

    var dist;
    var cas;
    text = "";
    if (queryData.zipcode == null) {
        dist = []
    } else if (Array.isArray(queryData.zipcode)) {
        text += queryData.zipcode.join('~')
        dist = dat.pdistribution(queryData.zipcode.join('~'));
    } else {
        text += text += queryData.zipcode;
        dist = dat.pdistribution(queryData.zipcode);
    }
    text += ",";
    if (queryData.neighborhood == null) {
        cas = []
    } else if (Array.isArray(queryData.neighborhood)) {
        text += queryData.neighborhood.join('~')
        cas = dat.pcases(null, queryData.neighborhood.join('~'), null, null);
    } else {
        text += queryData.neighborhood;
        cas = dat.pcases(null, queryData.neighborhood, null, null);
    }
    //fs.writeFileSync("../data/" + userName + ".txt", text, 'utf8')
    Promise.all([dist, cas]).then(function (info) {
        response.render('results', {
            page: request.url,
            info: info,
            title: "Result"
        });
    });
});

//request for when user clicks create account; shows new user form
router.get('/user/new', function (req, res) {
    console.log("GET REQUEST /users/new at" + new Date());
    var u;
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('user_details', {
        user: u,
        feedback: "Empty forms just waiting to be filled! Sign-up page loaded!",
        title: "create"
    });
});

//request for when user creates an account; creates a user, returns to login index
router.post('/users', function (req, res) {
    console.log('POST Request- /Users' + " at " + new Date());
    var u = {
        username: req.body.name,
        password: req.body.password,
        zipcode: req.body.zipcode,
        neighborhood: req.body.neighborhood,
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
/*
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
*/

module.exports = router;
