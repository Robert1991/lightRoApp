/* global TableDataHandle, ListDataHandle, EventHandlerRegister */
function deleteDeviceFromDbHandler() {
    const deleteDeviceQueryTarget = "user";
    const deleteDeviceQueryFormat = "?name={name}&deleteDeviceFromDb=";
    
    var responseFunction = function (httpConnection) {
        var response = eval("(" + httpConnection.responseText + ')');
       
       if (response['status'] !== 'OK') {
           alert("Error deleting device.");
       } else {
           alert("Device deleted");
       }
       EventHandlerRegister.registerHandlersForTable();
    };
    
    function sendQueryForDelete(deviceName) {
        var deleteDeviceQueryBuilder = new QueryBuilder(deleteDeviceQueryTarget,deleteDeviceQueryFormat);
        var query = deleteDeviceQueryBuilder.buildQuery({'name' : deviceName});
        var aSyncServerConnection = new ServerConnectionASync();
        aSyncServerConnection.sendQuery(query,"GET",responseFunction);
    }
    
    function getDeviceNameFromTableRow(tableRow) {
        return TableDataHandle.getDeviceRowCellValue(tableRow,'name');
    }
    
    var tableRow = TableDataHandle.getRowFromElement(this);
    var deviceName = getDeviceNameFromTableRow(tableRow);
    
    if(_confirmAction("Do you really want to delete the settings for " + deviceName)) {
       var rowIndex = TableDataHandle.getRowIndexFromElement(this);
       sendQueryForDelete(deviceName); 
        // Send Request for delete
       TableDataHandle.deleteTableRowFromIndex(rowIndex);
       ListDataHandle.deleteListEntryForName(deviceName);
       EventHandlerRegister.registerHandlersForTable();
    }
}
