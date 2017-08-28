var dbHandle = require("../data/dbHandle.js");
var pageDataHelper = require("./pageDataBuilder.js");

exports.showIndexPage = function (request, response) {
    if (checkUrlIsValid(request.url)) {
        var allDevices = getDeviceList();
        buildIndexPage(response, [allDevices[0]]);
    } else {
        pageDataHelper.send404(response);
    }
};

function checkUrlIsValid(url) {
    if (url === '/') {
        return true;
    } else {
        return false;
    }
}

function buildIndexPage(response, selectedDevices) {
    pageDataHelper.buildIndexPage(response, selectedDevices);
}

function getDeviceList() {
    try {
        var deviceList =  dbHandle.getDeviceList();
        
        if (typeof deviceList !== "undefined" && deviceList)
            return deviceList;
        else 
            return [];
    } catch (err) {
        return [];
    }
}