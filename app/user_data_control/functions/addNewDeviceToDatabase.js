const queryKey = "addDeviceToDb";
var pageDataHelper = require("../../views/pageDataBuilder.js");
var dbHandle = require("../../data/dbHandle.js");

exports.execute = function(addDeviceQuery,response) {
    var indexPageDevices = [];
    // getting rid of the query key
    var deviceInfoSubmittion = deleteQueryKey(addDeviceQuery);
    dbHandle.addDevice(deviceInfoSubmittion);
    
    // getting the name of the submitted item
    indexPageDevices.push(dbHandle.getDeviceByName(deviceInfoSubmittion['name']));
    pageDataHelper.buildIndexPage(response,indexPageDevices);
};

function deleteQueryKey(addDeviceQuery) {
    delete addDeviceQuery[queryKey];
    return addDeviceQuery;
}