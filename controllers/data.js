var express = require('express');
var fs = require("fs");
var router = express.Router();
var dataJS = require('../models/Data');
var Developer = require('../models/Developer.js')
//var jobJS = require('../models/jobprogram');
var apikey;

router.get('/neighborhoodsearch', function (req, res) {

    var rstring = "apiinthesky.herokuapp.com/data?type=cases&apikey=";
    rstring += apikey;
    if (!(req.query.neighborhood == null)) {
        rstring += "&neighborhood=" + req.query.neighborhood;
    }
    if (!(req.query.year == null)) {
        rstring += "&year=" + req.query.year;
    }
    if (!(req.query.gender == null)) {
        rstring += "&gender=" + req.query.gender;
    }
    if (!(req.query.race == null)) {
        rstring += "&race=" + req.query.race;
    }
    req(rstring, function (err, res, body) {
        data = JSON.parse(body);
        res.status(200);
        res.setHeader('Content-Type', 'text/html')
        res.render('results', {
            page: req.url,
            thedata: data,
            title: "Result"
        });
        //do things with data here
    });
})

router.get('/condomsearch', function (req, res) {
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('results', {
        page: req.url,
        user: user_data,
        title: "Result"
    });
    var rstring = "apiinthesky.herokuapp.com/data?type=distribution&apikey=";
    rstring += apikey;
    if (!(req.query.zipcode == null)) {
        rstring += "&zipcode=" + req.query.zipcode;
    }
    req(rstring, function (err, res, body) {
        data = JSON.parse(body);
        res.status(200);
        res.setHeader('Content-Type', 'text/html')
        res.render('results', {
            page: req.url,
            user: data,
            title: "Result"
        });
        //do things with data here
    });

});
