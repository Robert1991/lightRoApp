class TableDataHandle {
    constructor() {
    }

    static getDeviceRowCellValue(tableRow, valueID) {
        var columns = tableRow.getElementsByTagName("td");
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].id === valueID) {
                return columns[i].innerHTML;
            }
        }

        return "undefined";
    }
    
    static getTableCellFromRow(tableRow, valueID) {
        var columns = tableRow.getElementsByTagName("td");
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].id === valueID) {
                return columns[i];
            }
        }
        return "undefined";
    }

    static getRowIndexFromElement(element) {
        var parent = element.parentNode;
        while (parent.nodeName.toLowerCase() !== 'tr') {
            parent = parent.parentNode;
        }
        return parent.rowIndex;
    }

    static getRowFromElement(element) {
        var rowIndex = this.getRowIndexFromElement(element);
        return document.getElementById("table_row_" + rowIndex);
    }
    
    static deleteTableRowFromIndex(rowIndex) {
        document.getElementById("deviceSettingsTable").deleteRow(rowIndex);
    }
    
    static getTableRowElements() {
        return document.getElementById("deviceSettingsTable").rows;
    }
    
    static getTableRowIds() {
        var ids = [];
        var tableRows = this.getTableRowElements();
        
        for (var i = 0; i < tableRows.length; i++) {
            if (tableRows[i].id.length > 0)
                ids.push(tableRows[i].id);
        }
        
        return ids;
    }
    
    static registerEventHandlerForElement(element,event,handler) {
        element.addEventListener(event, handler);
    }
}