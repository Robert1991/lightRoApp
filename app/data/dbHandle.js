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

exports.checkIfDeviceExists = function(name) {
    if(Object.keys(getDeviceByName(name)).length > 0) {
        return true;
    }
    
    return false;
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
    if (Object.keys(device).length > 0)
        return device;
    else
        return "undefined";
}

exports.getDeviceByNetworkNameAndPort = function(networkName,port) {
    return getDeviceByNetworkNameAndPortInternal(networkName,port);
};

exports.checkIfNetworkAddressExists = function(networkName,port) {
    if (getDeviceByNetworkNameAndPortInternal(networkName,port) !== "undefined") {
        return true;
    } else {
        return false;
    }
};

function getDeviceByNetworkNameAndPortInternal(networkName,port) {
    var devices = deviceDb.getData("/");
    var deviceKeys = Object.keys(devices);
    
    for (var i = 0; i < deviceKeys.length; i++) {
        if (devices[deviceKeys[i]]['network_name'] === networkName && port === devices[deviceKeys[i]]['port']) {                
            return devices[i];
        }
    }
    
    return "undefined";
}

/////////////////////////////////
// TODO Refactor own class add device settings in dbhandle to

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

exports.deleteDevice = function(name) {
    deviceDb.delete("/" + name);
    deviceDb.save();
};