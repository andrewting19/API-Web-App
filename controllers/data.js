var express = require('express');
var fs = require("fs");
var router = express.Router();
var dataJS = require('../models/Data');
var Developer = require('../models')
//var jobJS = require('../models/jobprogram');
var apikey;

router.get('/neighborhoodsearch', function(request, response) {
  request("apiinthesky.herokuapp.com/neighborhoodsearch?apikey="+apikey+"&neighborhood="+req.query.neighborhood+"&zipcode="+req.query.zipcode, function(err, response, body) {
    data = JSON.parse(body);

    //do things with data here
  });
})

router.get('/condomsearch', function(request, response) {
  request("apiinthesky.herokuapp.com/condomsearch?apikey="+apikey+"&neighborhood="+req.query.neighborhood+"&zipcode="+req.query.zipcode, function(err, response, body) {
    data=JSON.parse(body);

    //do things with data here
  });

});
