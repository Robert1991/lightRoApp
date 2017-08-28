/* global deleteDeviceFromDbHandler, TableDataHandle */

class EventHandlerRegister {
    constructor() {

    }

    static registerHandlersForTable() {
        var rowIds = TableDataHandle.getTableRowIds();
        for (var i = 0; i < rowIds.length; i++) {
            var rowElement = document.getElementById(rowIds[i]);
            
            if (rowElement) {
                var element = TableDataHandle.getTableCellFromRow(rowElement, "deleteDevice");
                var buttonElements = element.getElementsByTagName('button');
                
                if (buttonElements.length === 1) {
                    TableDataHandle.registerEventHandlerForElement(buttonElements[0], "click", deleteDeviceFromDbHandler);
                }
            }

        }
    }

}