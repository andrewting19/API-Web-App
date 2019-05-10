var express = require('express');
var fs = require("fs");
var router = express.Router();

var dat = require('../models/Data');
var Developer = require('../models/Developer.js')
//var jobJS = require('../models/jobprogram');

var request = require('request');

router.get('/neighborhoodsearch', function (req, res) {

    dat.cases(req.query.year, req.query.neighborhood, req.query.sex, req.query.race, function (filteredData) {

        res.status(200);
        res.setHeader('Content-Type', 'text/html')
        res.render('results', {
            page: req.url,
            thedata: filteredData,
            title: "Result"
        });
        //do things with data here
    });
})

router.get('/condomsearch', function (req, res) {
    var rstring = "http://localhost:3042/data?Type=distribution&apikey=";
    rstring += apikey;
    if (!(req.query.zipcode == null)) {
        rstring += "&zipcode=" + req.query.zipcode;
    }
    rstring += "&zipcode=" + "10128";
    console.log(rstring)
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
            console.log(err);
            res.redirect('/');
        }
    });
});
module.exports = router;
