var dbHandle = require("../data/dbHandle.js");
var pageDataHelper = require("./pageDataBuilder.js");

exports.showIndexPage = function(request,response) {
    if (checkUrlIsValid(request.url)) {
        var allDevices = dbHandle.getDeviceList();
        buildIndexPage(response,[allDevices[0]]);
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

function buildIndexPage(response,selectedDevices) {
    pageDataHelper.buildIndexPage(response,selectedDevices);
}