const queryKey = "addDeviceToDb";

var dbHandle = require("../../data/dbHandle.js");

exports.execute = function(addDeviceQuery,response) {
    // getting rid of the query key
    var deviceInfoSubmittion = deleteQueryKey(addDeviceQuery);
    dbHandle.addDevice(deviceInfoSubmittion);
    response.send("OK");
};

function deleteQueryKey(addDeviceQuery) {
    delete addDeviceQuery[queryKey];
    return addDeviceQuery;
}