const queryKey = "addDeviceToDb";
var dbHandle = require("../../data/dbHandle.js");
const responseFormatter = require('../../query_resolver/ResponseFormatter.js');

exports.execute = function (query, response) {
    var nameExists = checkDeviceName(query['name']);
    var networkAddrExists = checkIfNetWorkAddressExists(query['network_addr'], query['port']);
    var responseMessage = responseFormatter.formatSimpleResponse('OK',nameExists && networkAddrExists);
    response.send(responseMessage);
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