/* global __dirname */
const handlebars = require('handlebars');
const format = require('string-format');
const fs = require('fs');

const listRow = "<li id=device_list_{device_name}><div class=\"checkbox\"><label><input type=\"checkbox\" value=\"\" {checked}>{device_name}</label></div></li>\n";

exports.registerHelper = function () {
    handlebars.registerHelper('device_list', function (devices,selected_devices) {
        var deviceList = "";
        var selectedDevices = getSelectedDeviceNames(selected_devices);
        
        for (var i = 0; i < devices.length; i++) {
            deviceList += buildListElement(devices[i]['name'],selectedDevices);
        }
        return deviceList;
    });
};

function getSelectedDeviceNames(selected_devices) {
    var names = [];
    for (var i = 0; i < selected_devices.length; i++) {
        names.push(selected_devices[i].name);
    }
    return names;
}

function buildListElement(deviceName, selectedDevices) {
    if (checkIfValueIsInArray(deviceName, selectedDevices)) {
        return formatListElement(deviceName, "checked");
    } else {
        return formatListElement(deviceName, "");
    }
}

function formatListElement(deviceName, checked) {
    return format(listRow, {'checked': String(checked), 'device_name': deviceName});
}

function checkIfValueIsInArray(array,value) {
    return array.indexOf(value) > -1;
}
