const queryKey = "deleteDeviceFromDb";
var pageDataHelper = require("../../views/pageDataBuilder.js");
var dbHandle = require("../../data/dbHandle.js");
var indexPageDevices = [];

exports.execute = function(deleteDeviceQuery,response) {
    // getting rid of the query key
    dbHandle.deleteDevice(deleteDeviceQuery);
    
    // Sending the standard page data
    pageDataHelper.buildIndexPage(response,indexPageDevices);
};