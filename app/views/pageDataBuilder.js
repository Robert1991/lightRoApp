/* global __dirname */

const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const tableDataBuilder = require("./page_modules/tableDataBuilder.js");
const scriptImportHelper = require("./page_modules/scriptImportHelper.js");
const deviceListBuilder = require("./page_modules/deviceListBuilder.js");

const indexPageData = require(path.resolve(__dirname, './template_data/indexPageData.json'));
const indexLocation = path.join(__dirname, "./html/index.html");
const err404Page = path.join(__dirname, "./html/404.html");

var deviceConnectionChecker = require("../device_control/functions/testConnectionToDevice.js");
var dbHandle = require("../data/dbHandle.js");

exports.buildIndexPage = function (response, selectedDevices) {
    fs.readFile(indexLocation, 'utf8', function (err, source) {
        assignDataToIndexPage(checkConnectionStatusForDevices(selectedDevices));
        registerHelperForIndexPage();
        response.send(compilePage(source, indexPageData));
    });
};

exports.buildPageTable = function (response, selectedDevices) {
    var tableData = "";
    for (var i = 0; i < selectedDevices.length; i++) {
        tableData += tableDataBuilder.buildTableRow(selectedDevices[i], i);
    }
    response.send(tableData);
};

exports.send404 = function (response) {
    response.sendFile(err404Page);
};

function assignDataToIndexPage(selectedDevices) {
    indexPageData['selected_devices'] = selectedDevices;
    indexPageData['devices'] = dbHandle.getDeviceList();
}

function checkConnectionStatusForDevices(selectedDevices) {
    var devices = [];
    for (var i = 0; i < selectedDevices.length; i++) {
        var selectedDevice = selectedDevices[i];
        var available = deviceConnectionChecker.checkConnectionToDevice(selectedDevice['network_name'], selectedDevice['port']);

        if (available)
            selectedDevice.connection_status = "OK";
        else
            selectedDevice.connection_status = "NOK";

        selectedDevices[i] = selectedDevice;
    }
    return selectedDevices;
}

function registerHelperForIndexPage() {
    scriptImportHelper.registerHelper();
    deviceListBuilder.registerHelper();
    tableDataBuilder.registerHelper();
}

function compilePage(source, indexPageData) {
    var template = handlebars.compile(source);
    return template(indexPageData);
}

function handleError(err) {
    if (err) {
        throw err;
    }
}