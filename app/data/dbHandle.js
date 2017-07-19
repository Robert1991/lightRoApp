/* global __dirname */

var path = require('path');
var jsonDB = require('node-json-db');
var deviceDb = new jsonDB(path.join(__dirname, '/deviceDatabase.json'), true, false);

exports.getDeviceList = function() {
    var devices = deviceDb.getData("/");
    var deviceKeys = Object.keys(devices);
    
    if (deviceKeys < 0) {
        return [];
    } else {
        var deviceArray = [];
        
        for (var i = 0; i < deviceKeys.length; i++) {
            deviceArray.push(devices[deviceKeys[i]]);
        }
    }
    
    return deviceArray;
};

exports.getDeviceByName = function(name) {
    return getDeviceByName(name);
};

exports.getDevicesFromList = function(names) {
    var deviceList = [];
    
    for (var i = 0; i < names.length; i++) {
        deviceList.push(getDeviceByName(names[i]));
    }    
    
    return deviceList;
};

function getDeviceByName(name) {
    var device = deviceDb.getData("/" + name);
    return device;
}