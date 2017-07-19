function refreshTable() {
    function handleDeviceList() {
        var requestedDevices = getRequestedDevicesFromTableItems(getTableItems());
        var xhttp = buildHttpRequestObject();
        var query = buildDeviceShowInTableQuery(requestedDevices);
        sendQuery(xhttp, query);
    }

    function getTableItems() {
        var deviceList = document.getElementById("deviceListHead");
        return deviceList.getElementsByTagName("li");
    }

    function getRequestedDevicesFromTableItems(items) {
        var requestedDevices = [];

        for (var i = 0; i < items.length; ++i) {
            var listItem = items[i];
            var device = listItem.getElementsByTagName("input");

            if (device[0].checked === true) {
                var deviceName = listItem.getElementsByTagName("label");
                requestedDevices.push(deviceName[0].textContent);
            }
        }

        return requestedDevices;
    }

    function buildHttpRequestObject() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                handleDeviceListResponse(xhttp.responseText);
                document.getElementById("main_table_body").innerHTML = xhttp.responseText;
            }
        };
        return xhttp;
    }

    function handleDeviceListResponse(responseText) {
        document.getElementById("main_table_body").innerHTML = responseText;
    }

    function buildDeviceShowInTableQuery(requestedDevices) {
        var query = "/device/?device=";

        for (var i = 0; i < requestedDevices.length; i++) {
            if (i === requestedDevices.length - 1) {
                query += requestedDevices[i];
            } else {
                query += requestedDevices[i] + ",";
            }
        }

        query += "&showintable=true";
        return query;
    }

    function sendQuery(httpConnection, query) {
        httpConnection.open("GET", query);
        httpConnection.send();
    }
    
    handleDeviceList();
}
