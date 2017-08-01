/* global __dirname */
const handlebars = require('handlebars');
const fs = require('fs');
const format = require('string-format');
const tableRow = "<tr id={row_index}><td id=\"name\">{name}</td><td id=\"location\">{location}</td><td id=\"network_name\">{network_name}</td><td id=\"port\">{port}</td><td id=\"connection_status\">{connection_status}</td>{color}{buttons}</tr>";
const colorRectangle = "<td id=\"color\"><div id=\"rectangle\" class=\"well well-sm\" style=\"width:20 px; height:20 px; background-color:{color}\"></div></td>";
const changeButton = "<td id=\"{button_id}\"><button type=\"button\" class=\"btn btn-default\"  onclick=\"{function}\"> {icon}</button></td>";
const gylphiconSpan = "<span class=\"glyphicon glyphicon-{type}\"></span>";
const glyphiconIconDelete = "trash";
const functionDelete = "deleteDeviceFromDb(this)";
const functionChangeDeviceSettings = "changeDeviceSettings()";
const glyphiconIconOk = "ok";
const glyphiconIconNOk = "remove";
const glyphiconIconsSettings = "cog";
const rowIndexFormat = "table_row_{number}";

const lastLiveColor = 'last_live_color';
const connectionStatus = 'connection_status';

exports.registerHelper = function () {
    handlebars.registerHelper('device_info_table', function (selected_devices) {
        var tableRows = "";

        for (var i = 0; i < selected_devices.length; i++) {
            tableRows += buildTableRow(selected_devices[i],i);
        }

        return tableRows;
    });
};

exports.buildTableRow = function (device,index) {
    return buildTableRow(device,index);
};

function buildTableRow(device,row_number) {
    device.row_index = getRowId(row_number);
    device.color = format(colorRectangle, {'color': device[lastLiveColor]});
    device.buttons = getButtonsForRow();
    device.connection_status = getConnectionStatusIcons(device[connectionStatus]);
    return format(tableRow,device);
}

function getButtonsForRow() {
    return  getChangeSettingsButton() + getDeleteButton();
}

function getDeleteButton() {
    var glyphicon = formatGlyphicon(glyphiconIconDelete);
    return format(changeButton, {'button_id' : 'deleteDevice' , 'function' : functionDelete, 'icon' : glyphicon});
}

function getChangeSettingsButton() {
    var glyphicon = formatGlyphicon(glyphiconIconsSettings);
    return format(changeButton, {'button_id' : 'changeSettings' , 'function' : functionChangeDeviceSettings, 'icon' : glyphicon});
}

function getConnectionStatusIcons(connectionStatus) {
    if (connectionStatus === 'OK') {
        return formatGlyphicon(glyphiconIconOk);
    } else {
        return formatGlyphicon(glyphiconIconNOk);
    }
}

function formatGlyphicon(glyphiconType) {
    return format(gylphiconSpan,{'type': glyphiconType});
}

function getRowId(rowIndex) {
    return format(rowIndexFormat,{'number' : rowIndex+1});
}