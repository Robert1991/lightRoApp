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
    
    static getTableItems() {
        var deviceList = document.getElementById("deviceListHead");
        return deviceList.getElementsByTagName("li");
    }
    
    static getDeviceNamesFromTableItems() {
        var items = this.getTableItems();
        var deviceNames = [];

        for (var i = 0; i < items.length; ++i) {
            var listItem = items[i];
            var device = listItem.getElementsByTagName("input");

            if (device[0].checked === true) {
                var deviceName = listItem.getElementsByTagName("label");
                deviceNames.push(deviceName[0].textContent);
            }
        }

        return deviceNames;
    }
}