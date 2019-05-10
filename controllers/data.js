var express = require('express');
var fs = require("fs");
var router = express.Router();

var dataJS = require('../models/Data');
var Developer = require('../models/Developer.js')
//var jobJS = require('../models/jobprogram');
var apikey = "mTiZZDQR";
var request = require('request');

router.get('/neighborhoodsearch', function (req, res) {

    var rstring = "localhost:3042/data?type=cases&apikey=";
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
    request(rstring, function (err, res, body) {
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
    var rstring = "localhost:3042/data?type=distribution&apikey=";
    rstring += apikey;
    if (!(req.query.zipcode == null)) {
        rstring += "&zipcode=" + req.query.zipcode;
    }
    request(rstring, function (err, response, body) {
        if (!err) {
            var data = JSON.parse(body);
            res.status(200);
            res.setHeader('Content-Type', 'text/html')
            res.render('results', {
                page: req.url,
                thedata: data,
                title: "Result"
            });
        } else {
            res.redirect('/');
        }
    });
});
module.exports = router;
