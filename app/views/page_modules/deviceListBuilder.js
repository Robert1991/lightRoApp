/* global __dirname */
const handlebars = require('handlebars');
const format = require('string-format');
const fs = require('fs');

const listRow = "<li><div class=\"checkbox\"><label><input type=\"checkbox\" value=\"\" {checked}>{device_name}</label></div></li>\n";

exports.registerHelper = function () {
    handlebars.registerHelper('device_list', function (devices) {
        var deviceList = "";

        for (var i = 0; i < devices.length; i++) {
            if (i === 0) {
                deviceList += addDeviceToDeviceList(devices[i]['name'], "checked");
            } else {
                deviceList += addDeviceToDeviceList(devices[i]['name'], "");
            }

        }
        return deviceList;
    });
};

function addDeviceToDeviceList(deviceName, checked) {
    return format(listRow, {'checked': String(checked), 'device_name': deviceName});
}