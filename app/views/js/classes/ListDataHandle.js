class ListDataHandle {
    constructor() {
        
    }
    
    static getListId() {
        return "deviceListHead";
    }
    
    static deleteListEntryForName(elementName) {
        var element = document.getElementById("device_list_" + elementName);
        element.parentNode.removeChild(element);
    }
    
    static getRowIndexFromElementName(elementName) {
        var deviceList = document.getElementById(this.getListId()).getElementsByTagName("li");
        var index = 0;

        for (var i = 0; i < deviceList.length; i++) {
            var deviceName = deviceList[i].getElementsByTagName("label")[i].innerHTML;
            deviceName = deviceName.replace(/^\<.*\>/,"");
            
            if (deviceName === elementName) {
                return i;
            }
        }
        
        return index;
    }
    
    static getListItems() {
        var deviceList = document.getElementById("deviceListHead");
        return deviceList.getElementsByTagName("li");
    }
    
    static getDeviceNamesFromListItems() {
        var items = this.getListItems();
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