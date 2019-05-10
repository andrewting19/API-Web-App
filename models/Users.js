var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var doc = new GoogleSpreadsheet('1ib-bwbtW3uQk8QfOQ0SR0EbwszXJefv71Wq4qokLdoM');

exports.loadAll = function (filename, callback) {
    var user_data = [];
    doc.useServiceAccountAuth(creds, function (err) {
        doc.getRows(filename, function (err, rows) {
            callback(rows);
        });
    });
}
exports.getUser = function (username, callback) {
    var u = {}
    var all_users = exports.loadAll(1, function (all_users) {
        for (var i = 0; i < all_users.length; i++) {
            if (all_users[i].username == username) {
                u = all_users[i];
                break;
            }
        }
        callback(u);
    });
}
/*exports.getUser = function (username, callback) {
    console.log(username);
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
                    if (cells[i].value == username) {
                        sheet.getCells({
                            'min-row': 2 + i,
                            'max=row': 2 + i,
                            'min-col': 1,
                            'max-col': 4,
                            'return-empty': true
                        }, function (err, cells) {
                            var u = {
                                username: cells[0],
                                password: cells[1],
                                zipcode: cells[2],
                                neighborhood: cells[3]
                            }
                            callback(u);
                        });
                    }
                }
            });

        });
    });
}*/
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
