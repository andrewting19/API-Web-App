var request = require('request');
var apikey = "mTiZZDQR";
var Promise = require('promise');
exports.pcases = function (year, neighborhood, sex, race) {
    var rstring = "https://radiant-fjord-19703.herokuapp.com/data?type=cases&apikey=";
    //var rstring = "http://localhost:3042/data?type=cases&apikey=";
    rstring += apikey;
    if (!(neighborhood == null)) {
        rstring += "&neighborhood=" + neighborhood;
    }
    if (!(year == null)) {
        rstring += "&year=" + year;
    }
    if (!(sex == null)) {
        rstring += "&sex=" + sex;
    }
    if (!(race == null)) {
        rstring += "&race=" + race;
    }
    console.log(rstring);
    return new Promise(function (resolve, reject) {
        request(rstring, function (error, response, body) {
            if (error) return reject(error);
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(e);
            }
        });
    });
}
exports.pdistribution = function (zipcode) {
    var rstring = "https://radiant-fjord-19703.herokuapp.com/data?type=distribution&apikey=";
    //var rstring = "http://localhost:3042/data?type=distribution&apikey=";
    rstring += apikey;
    if (!(zipcode == null)) {
        rstring += "&zipcode=" + zipcode;
    }
    console.log(rstring);
    return new Promise(function (resolve, reject) {
        request(rstring, function (error, response, body) {
            if (error) return reject(error);
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(e);
            }
        });
    });
}
exports.cases = function (year, neigborhood, sex, race, callback) {
    var rstring = "https://radiant-fjord-19703.herokuapp.com/data?type=cases&apikey=";
    rstring += apikey;
    if (!(neigborhood == null)) {
        rstring += "&neighborhood=" + neighborhood;
    }
    if (!(year == null)) {
        rstring += "&year=" + year;
    }
    if (!(sex == null)) {
        rstring += "&sex=" + sex;
    }
    if (!(race == null)) {
        rstring += "&race=" + race;
    }

    request(rstring, function (err, res, body) {
        data = JSON.parse(body);
        console.log("wait for me");
        if (callback) {
            callback(data);
        } else {
            return (data);
        }
    });
}

exports.distribution = function (zipcode, callback) {
    var rstring = "https://radiant-fjord-19703.herokuapp.com/data?type=distribution&apikey=";
    rstring += apikey;
    if (!(zipcode == null)) {
        rstring += "&zipcode=" + zipcode;
    }

    request(rstring, function (err, res, body) {
        data = JSON.parse(body);
        if (callback) {
            callback(data);
        } else {
            return (data);
        }

    });
}

exports.mapWithMarkers = function (array, address) {
    var mapA;
    var center = address; //address = {lat, lng};
    var zoomedIn = 15; //experimental value
    var markerArray = {
        test: "useless"
    };

    function initMap() {
        mapA = new google.maps.Map(document.getElementById('map'), {
            zoom: zoomedIn,
            center: address
        });
        for (var i = 0; i < array.length; i++) {
            markerArray["marker" + (i + 1)] = new google.maps.Marker({
                position: array[i],
                map: mapA
            });
        }
    }
};
