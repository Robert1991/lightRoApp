/* global __dirname */

var path = require('path');
var jsonDB = require('node-json-db');
var format = require('string-format');

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

/////////////////////////////////
// TODO Refactor own class
// TODO Check if device is already in table 
// TODO Check after connection status and build an dummy

const default_color = "#cc66ff";
var deviceInputFormat = "/{device_name}/{db_key}";

exports.addDevice = function(deviceTable) {
    var keys = Object.keys(deviceTable);
    for(var i = 0; i < keys.length; i++) {
        deviceDb.push(format(deviceInputFormat,{'device_name' : deviceTable['name'], 'db_key' : keys[i]}),deviceTable[keys[i]]);
    }
    setDefaultLiveColor(deviceTable['name']);
    deviceDb.save();
    return true;
};

exports.getDevicesFromList = function(names) {
    var deviceList = [];
    
    for (var i = 0; i < names.length; i++) {
        deviceList.push(getDeviceByName(names[i]));
    }    
    
    return deviceList;
};

function setDefaultLiveColor(deviceName) {
    deviceDb.push(format(deviceInputFormat,{'device_name' : deviceName, 'db_key' : 'last_live_color'}),default_color);
}

function getDeviceByName(name) {
    var device = deviceDb.getData("/" + name);
    return device;
}