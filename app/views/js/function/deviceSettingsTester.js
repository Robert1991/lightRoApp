function testDeviceSettings() {
    const networkNameExp = /(^[a-zA-Z]+$)|(^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/;
    const portExp = /^[0-9]{1,4}$/;
    const testDeviceSettingsQueryFormat = "/device/?network_addr={network}&port={port}&test_conn=true";
    const checkIfNameExistsQueryFormat = "/user/?name={name}&checkForName=";
    const device_network_name_tagId = "device_network_name";
    const device_port_tagId = "device_port";
    
    var deviceName = "";
    var deviceNetworkName = "";
    var devicePort = "";
    var sendSettings = true;

    function checkDeviceNetworkName() {
        return deviceNetworkName.match(networkNameExp);
    }

    function checkDevicePort() {
        return devicePort.match(portExp);
    }

    function buildHttpRequestObject() {
        return new XMLHttpRequest();
    }

    function sendQuery(httpConnection, query) {
        httpConnection.open("GET", query, false);
        httpConnection.send();
    }

    function parseQueryResponse(httpConnection) {
        if (httpConnection.status === 200) {
            return eval("(" + httpConnection.responseText + ')');
        } else {
            return "undefined";
        }
    }
    
    function buildQuery(queryFormat,parameters) {
        return queryFormat.format(parameters);
    }

    function buildTestSettingsQuery(deviceNetworkName, devicePort) {
        return buildQuery(testDeviceSettingsQueryFormat,{network: deviceNetworkName, port: devicePort});
    }
    
    function buildCheckIfNameExistsQuery(deviceName) {
        return buildQuery(checkIfNameExistsQueryFormat,{name : deviceName});
    }

    function processResponseFromTestSettings(response) {
        if (response['status'] !== 'OK') {
            alert("Device could not be found!");
            sendSettings = false;
        }
    }
    
    function processResponseFromCheckForDeviceNameQuery(response) {
        if (response['msg'] === 'true') {
            alert("Name already exists!");
            sendSettings = false;
        } 
    }
    
    function sendSettingsToServer() {
        var testSettingsQuery = buildTestSettingsQuery(deviceNetworkName, devicePort);
        var xhttp = buildHttpRequestObject();
        sendQuery(xhttp, testSettingsQuery);
        
        return parseQueryResponse(xhttp);
    }
    
    function sendQueryForDeviceName() {
        var checkForDeviceNameQuery = buildCheckIfNameExistsQuery(deviceName);
        var serverRequest = buildHttpRequestObject();
        sendQuery(serverRequest, checkForDeviceNameQuery);
        return parseQueryResponse(serverRequest);
    }
    
    function checkIfDeviceNameAlreadyExists() {
        var response = sendQueryForDeviceName();
        processResponseFromCheckForDeviceNameQuery(response);
    }
    
    function checkIfConfigurationIsValid() {
        var response = sendSettingsToServer();
            if (response !== 'undefined') {
                processResponseFromTestSettings(response);
            } else {
                sendSettings= false;
            }
    }
    
    function checkIfDevicesSettingsAreInValidFormat() {
        return checkDeviceNetworkName(deviceNetworkName) && checkDevicePort(devicePort);
    }
    
    function setDeviceVariables() {
        deviceNetworkName = document.getElementById("device_network_name").value;
        devicePort = document.getElementById("device_port").value;
        deviceName = document.getElementById("device_name").value;
    }
    
    // main
    setDeviceVariables();
    
    if (checkIfDevicesSettingsAreInValidFormat()) {
        // check if Device is in Db
        checkIfDeviceNameAlreadyExists();
        
        if (sendSettings) {    
            checkIfConfigurationIsValid();
        }
    } else {
        alert("Please enter in an valid format.");
        sendSettings = false;
    }
    
    return sendSettings;
}
