var request = require('request');
var apikey = "mTiZZDQR";

exports.pcases = function (year, neighborhood, sex, race) {
    var rstring = "http://localhost:3042/data?Type=cases&apikey=";
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
    var rstring = "http://localhost:3042/data?Type=distribution&apikey=";
    rstring += apikey;
    if (!(zipcode == null)) {
        rstring += "&zipcode=" + zipcode;
    }
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
    var rstring = "http://localhost:3042/data?Type=cases&apikey=";
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
    var rstring = "http://localhost:3042/data?Type=distribution&apikey=";
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
