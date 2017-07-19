function submitSettings() {
    var networkNameExp = /(^[a-zA-Z]+$)|(^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/;
    var portExp = /^[0-9]{1,4}$/;
    var queryFormat = "/device/?network_addr={network}&port={port}&test_conn=true";
    
    function checkDeviceNetworkName(deviceNetworkName) {
        return deviceNetworkName.match(networkNameExp);
    }
    
    function checkDevicePort(devicePort) {
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
    
    function checkIfDevicesSettingsAreInValidFormat(deviceNetworkName,devicePort) {
        return checkDeviceNetworkName(deviceNetworkName) && checkDevicePort(devicePort);
    }
    
    function buildQuery(deviceNetworkAddress,devicePort) {
        return queryFormat.format({network: deviceNetworkAddress, port: devicePort});
    }
    
    var deviceNetworkName = document.getElementById("device_network_name_ip").value;
    var devicePort = document.getElementById("device_port").value;
    
    var deviceValid = checkIfDevicesSettingsAreInValidFormat(deviceNetworkName,devicePort);
    
    if (deviceValid) {
        var testSettingsQuery = buildQuery(deviceNetworkName,devicePort);
        var xhttp = buildHttpRequestObject();
        sendQuery(xhttp,testSettingsQuery);
        
        if (xhttp.status === 200) {
            alert("Done");
            alert(xhttp.responseText);
        }
    }
    
    alert("2");
    
    return false;
}
