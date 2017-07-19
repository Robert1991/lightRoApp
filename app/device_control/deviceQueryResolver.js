var devicesTableBuilder = require("./showDevicesInTable.js");
var valid_actions = ["set", "showintable", "network_addr", "port", "device", "test_conn"];
//var request = require("request");
var pageDataHelper = require("../views/pageDataBuilder.js");

// Refactor idee: objekt schlüssel in für funktion definieren welche methode gecallt wird
// --> modellieren über klasse oder sp

exports.delegate = function (request, response) {
    var queryParameters = Object.keys(request.query);
    
    if (checkIfQueryIsValid(queryParameters)) {
        var controlParameters = getDeviceQueryParameters(queryParameters);
        delegateAction(controlParameters, request, response);
    } else {
        pageDataHelper.send404(response);
    }
};

function checkIfQueryIsValid(queryParameters) {
    if (queryParameters.length > 0) {
        if (queryParameters[0] === 'device' && queryParameters.length > 1) {
            return checkParameterScope(queryParameters);
        }
    } else if (queryParameters[queryParameters.length - 1] === 'test_conn') {
        return checkParameterScope(queryParameters);
    } else {
        // 404
    }
}

function checkParameterScope(queryParameters) {
    for (var i = 0; i < queryParameters.length; i++) {
        if (valid_actions.indexOf(queryParameters[i]) === -1) {
            return false;
        }
        console.log(queryParameters[i])
    }

    return true;
}

function getDeviceQueryParameters(queryParameters) {
    var parameters = [];
    for (var i = 0; i < queryParameters.length; i++) {
        if (queryParameters[i] !== 'device') {
            parameters.push(queryParameters[i]);
        }
    }

    return parameters;
}
////////// under construction ///////
const colorFormat = RegExp("[a-z0-9A-Z]{5}");
const colorNetworkFormat = RegExp("(^[a-zA-Z]+$)|(^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})");
const colorPortFormat = RegExp("[a-z0-9A-Z]{5}");

function delegateAction(controlParameters, request, response) {
    console.log(request.query['test_conn']);
    if (controlParameters.length === 1) {
        if (controlParameters[0] === 'set') {
            if (colorFormat.test(controlParameters[0].match)) {
                setColorForDevice(request, response);
            } else {
                //404
            }
        } else if (controlParameters[0] === 'showintable') {
            devicesTableBuilder.showDevicesInTable(request, response);
        } else if (request.query['test_conn'] === true) {
            console.log(request.query['network_addr'] + " " + request.query['port']);
        }
    }
}

// Refactor own class
function setColorForDevice(request, response) {
    var color = request.query['set'];
    //request("http://zeropione:3000/?set=" + color, function(error, response, body) {
    //   console.log("ok");
//    });

    // Hier ansteuerung der anderen pi's und Rueckgabe der zusetzenden Farbe
    response.send("ok");
}