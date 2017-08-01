const queryKey = "addDeviceToDb";
var dbHandle = require("../../data/dbHandle.js");
var format = require('string-format');
const responseFormat = "{{status : \"{status}\", msg : \"{msg}\"}}";

exports.execute = function (query, response) {
    var nameExists = false;
    var networkAddrExists = false;
    
    nameExists = checkDeviceName(query['name']);
    networkAddrExists = checkIfNetWorkAddressExists(query['network_addr'], query['port']);

    response.send(format(responseFormat, {'status': 'OK', 'msg': "" + nameExists && networkAddrExists}));
};

function checkIfNetWorkAddressExists(networkName, port) {
    var exists = false;

    try {
        exists = dbHandle.checkIfNetworkAddressExists(networkName, port, function (err) {
            if (err) {
                throw err;
            }
        });
    } catch (err) {
        exists = false;
    }

    return exists;
}

function checkDeviceName(name) {
    var exists = false;

    try {
        exists = dbHandle.checkIfDeviceExists(name, function (err) {
            if (err) {
                throw err;
            }
        });
    } catch (err) {
        exists = false;
    }

    return exists;
}