/////// UNDER CONSTRUCTION
const format = require('string-format');
const colorFormat = RegExp("[a-z0-9A-Z]{5}");
const responseFormat = "{{status : \"{status}\", msg : \"{msg}\"}}";

// pruefung als funktion in eigene Klasse (vll in json mitgeben ...)
// zerlegung von url in json objekt --> methode dazu wieder in eigene Klasse

const networkFormatExpression = RegExp("(^[a-zA-Z]+$)|(^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})");
const portFormatExpression = RegExp("[a-z0-9A-Z]{5}");

exports.execute = function (query, response) {
    var foo = "0";
    
    if (checkConnectionToRequestedDevice(query['network_addr'],query['port'])) {
        response.send(format(responseFormat, {'status': 'OK', 'msg': 'OkMeessage'}));
    } else {
        response.send(format(responseFormat, {'status': 'NOK', 'msg': 'NOkMeessage'}));
    }
};

exports.checkConnectionToDevice = function(networkNameIp,Port) {
    return checkConnectionToRequestedDevice(networkNameIp,Port);
};

function checkConnectionToRequestedDevice(networkNameIp,Port) {
    var sendRequestToDeviceAndGetAnswer = true;
    
    if (sendRequestToDeviceAndGetAnswer) {
        return true;
    } else {
        return false;
    }
}