function testDeviceSettings() {
    const networkNameExp = /(^[a-zA-Z]+$)|(^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/;
    const portExp = /^[0-9]{1,4}$/;
    const queryFormat = "/device/?network_addr={network}&port={port}&test_conn=true";
    var deviceNetworkName = "";
    var devicePort = "";
    var sendSettings = false;

    function checkDeviceNetworkName() {
        return deviceNetworkName.match(networkNameExp);
    }

    function checkDevicePort() {
        return devicePort.match(portExp);
    }

    function buildHttpRequestObject() {
        var xhttp = new XMLHttpRequest();
        return xhttp;
    }

    function sendQuery(httpConnection, query) {
        httpConnection.open("GET", query, false);
        httpConnection.send();
    }

    function checkIfDevicesSettingsAreInValidFormat() {
        return checkDeviceNetworkName(deviceNetworkName) && checkDevicePort(devicePort);
    }

    function buildQuery() {
        return queryFormat.format({network: deviceNetworkName, port: devicePort});
    }

    function setDeviceVariables() {
        deviceNetworkName = document.getElementById("device_network_name_ip").value;
        devicePort = document.getElementById("device_port").value;
    }

    function parseQueryResponse(httpConnection) {
        if (httpConnection.status === 200) {
            return eval("(" + httpConnection.responseText + ')');
        } else {
            alert("error");
            return "undefined";
        }
    }

    function sendSettingsToServer() {
        var testSettingsQuery = buildQuery(deviceNetworkName, devicePort);
        var xhttp = buildHttpRequestObject();
        sendQuery(xhttp, testSettingsQuery);
        return parseQueryResponse(xhttp);
    }

    function processResponse(response) {
        alert(response['status']);
        if (response['status'] === 'OK') {
            sendSettings = true;
        } else {
            alert(response['msg']);
        }
    }
    
    // entry
    setDeviceVariables();

    if (checkIfDevicesSettingsAreInValidFormat()) {
        var response = sendSettingsToServer();
        if (response !== 'undefined') {
            processResponse(response);
        }
    }

    return sendSettings;
}
