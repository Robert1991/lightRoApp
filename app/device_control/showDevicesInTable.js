var pageDataHelper = require("../views/pageDataBuilder.js");
var dbHandle = require("../data/dbHandle.js");

exports.showDevicesInTable = function (request, response) {
    var deviceList = getDevicesFromQuery(request.query['device']);
    displaySelectedDevices(response, deviceList);
};

function getDevicesFromQuery(query) {
    var devices = query.split(",");
    if (devices[0] === '') {
        return [];
    } else {
        return devices;
    }
}

function displaySelectedDevices(response, devices) {
    var deviceData = getDeviceList(devices);
    buildTablePageData(response, deviceData);
}

function getDeviceList(selectedDevices) {
    try {
        if (selectedDevices[0] !== '') {
            return dbHandle.getDevicesFromList(selectedDevices);
        } else {
            return [];
        }

    } catch (error) {
        console.log(error);
        return [];
    }
}


function buildTablePageData(response, selectedDevices) {
    pageDataHelper.buildPageTable(response, selectedDevices);
}