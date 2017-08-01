document.getElementById('deviceListHead').addEventListener('change', refreshTableHandler);

function refreshTableHandler() {
    const queryFormat = "?device={list}&showintable=true";
    var queryBuilder = new QueryBuilder("device", queryFormat);

    var tableServerResponseFunction = function (httpConnection) {
        document.getElementById("main_table_body").innerHTML = httpConnection.responseText;
        EventHandlerRegister.registerHandlersForTable();
    };

    function handleDeviceList() {
        var requestedDevices = ListDataHandle.getDeviceNamesFromListItems();
        var serverConnection = new ServerConnectionASync();
        var query = buildDeviceShowInTableQuery(requestedDevices);
        serverConnection.sendQuery(query, "GET", tableServerResponseFunction);
    }

    function buildDeviceShowInTableQuery(requestedDevices) {
        return queryBuilder.buildQueryFromList({list: requestedDevices});
    }

    handleDeviceList();
}
