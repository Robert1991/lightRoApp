class EventHandlerRegister {
    constructor() {

    }
    
    static registerHandlersForTable() {
        var rowIds = TableDataHandle.getTableRowIds();
        for (var i = 0; i < rowIds.length; i++) {
            var rowElement = document.getElementById(rowIds[i]);
            var element = TableDataHandle.getTableCellFromRow(rowElement, "deleteDevice");
            var buttonElement = element.getElementsByTagName('button')[0];
            TableDataHandle.registerEventHandlerForElement(buttonElement, "click", deleteDeviceFromDbHandler);
        }
    }

}