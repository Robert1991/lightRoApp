/* global submitSettingsEventHandler */
// String format function
String.prototype.format = function (placeholders) {
    var s = this;
    for (var propertyName in placeholders) {
        var re = new RegExp('{' + propertyName + '}', 'gm');
        s = s.replace(re, placeholders[propertyName]);
    }
    return s;
};

function _confirmAction(action) {
    return confirm(action);
}