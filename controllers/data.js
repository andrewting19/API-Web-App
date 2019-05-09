var express = require('express');
var fs = require("fs");
var router = express.Router();
var dataJS = require('../models/Data');
var Developer = require('../models/Developer.js')
//var jobJS = require('../models/jobprogram');
var apikey;

router.get('/neighborhoodsearch', function (req, res) {
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('results', {
        page: req.url,
        user: user_data,
        title: "Result"
    });
    /*req("apiinthesky.herokuapp.com/neighborhoodsearch?apikey=" + apikey + "&neighborhood=" + req.query.neighborhood + "&zipcode=" + req.query.zipcode, function (err, res, body) {
        data = JSON.parse(body);

        //do things with data here
    });*/
})

router.get('/condomsearch', function (req, res) {
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('results', {
        page: req.url,
        user: user_data,
        title: "Result"
    });
    /*req("apiinthesky.herokuapp.com/condomsearch?apikey=" + apikey + "&neighborhood=" + req.query.neighborhood + "&zipcode=" + req.query.zipcode, function (err, res, body) {
        data = JSON.parse(body);
        //do things with data here
    });*/

});
