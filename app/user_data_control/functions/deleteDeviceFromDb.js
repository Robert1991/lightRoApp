const queryKey = "deleteDeviceFromDb";
var dbHandle = require("../../data/dbHandle.js");
var responseFormatter = require('../../query_resolver/ResponseFormatter.js');

exports.execute = function(deleteDeviceQuery,response) {
    if (deleteDeviceFromDb(deleteDeviceQuery)) {
        response.send(responseFormatter.formatSimpleResponse("OK","deleted"));
    } else {
        response.send(responseFormatter.formatSimpleResponse("NOK","error"));
    }
};

function deleteDeviceFromDb(deleteDeviceQuery) {
    try {
        dbHandle.deleteDevice(deleteDeviceQuery['name'], function (err) {
            if (err) {
                throw err;
            }
        });
        
        return true;
    } catch (err) {
        return false;
    }
}