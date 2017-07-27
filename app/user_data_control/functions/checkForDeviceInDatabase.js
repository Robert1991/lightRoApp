const queryKey = "addDeviceToDb";
var dbHandle = require("../../data/dbHandle.js");
var format = require('string-format');
const responseFormat = "{{status : \"{status}\", msg : \"{msg}\"}}";

exports.execute = function (query, response) {
    var exists = false;

    try {
        exists = checkDeviceName(query['name']);
    } catch (err) {
        exists = false;
    }

    response.send(format(responseFormat, {'status': 'OK', 'msg': "" + exists}));
};

function checkDeviceName(name) {
    var exists = dbHandle.checkIfDeviceExists(name, function (err) {
        if (err) {
            throw err;
        }
    });
    console.log(exists);
    if (exists) {
        return true;
    } else {
        return false;
    }
}