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
}