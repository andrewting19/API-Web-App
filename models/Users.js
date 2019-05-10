var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var doc = new GoogleSpreadsheet('1ib-bwbtW3uQk8QfOQ0SR0EbwszXJefv71Wq4qokLdoM');

exports.both = function (callback) {
    out = [[]];
    doc.useServiceAccountAuth(creds, function (err) {
        doc.getInfo(function (err, info) {
            sheet = info.worksheets[0];

            sheet.getCells({
                'min-row': 2,
                'min-col': 1,
                'max-col': 2,
                'return-empty': true
            }, function (err, cells) {
                for (var i = 0; i < cells.length / 2; i += 1) {
                    out[i] = []
                    for (var k = 0; k < 2; k += 1) {
                        out[i].push(cells[2 * i + k].value);
                    }
                }
                callback(out);
            });

        });
    });
}
isOpen = function (name, callback) {
    var userList = exports.usernames(function (userList) {
        var isopen = true;
        for (var i = 0; i < userList.length; i += 1) {
            if (userList[i] == name) {
                isopen = false;

            }
        }
        callback(isopen);
    });
}
exports.validateAPIkey = function (apikey, callback) {
    var apikeyList = exports.apikeys(function (apikeyList) {
        var verity = false;
        for (var i = 0; i < apikeyList.length; i++) {
            key = apikeyList[i];
            if (key === apikey) {
                console.log("true");
                verity = true;
                break;
            }
        }
        callback(verity);

    });
}
exports.createUser = function (u, callback) {
    isOpen(u.name, function (open) {
        console.log(open);
        if (open) {

            doc.useServiceAccountAuth(creds, function (err) {
                doc.addRow(1, u, function () {
                    callback(true, "success");
                });
            });

        } else {
            callback(false, "failure");
        }
    });
}
exports.usernames = function (callback) {
    out = [];
    doc.useServiceAccountAuth(creds, function (err) {
        doc.getInfo(function (err, info) {
            sheet = info.worksheets[0];

            sheet.getCells({
                'min-row': 2,
                'min-col': 1,
                'max-col': 1,
                'return-empty': true
            }, function (err, cells) {
                for (var i = 0; i < cells.length; i += 1) {
                    out.push(cells[i].value)
                }
                callback(out);
            });

        });
    });
}
exports.apikeys = function (callback) {
    out = [];
    doc.useServiceAccountAuth(creds, function (err) {
        doc.getInfo(function (err, info) {
            sheet = info.worksheets[0];

            sheet.getCells({
                'min-row': 2,
                'min-col': 2,
                'max-col': 2,
                'return-empty': true
            }, function (err, cells) {
                for (var i = 0; i < cells.length; i += 1) {
                    out.push(cells[i].value)
                }
                callback(out);
            });

        });
    });
}
