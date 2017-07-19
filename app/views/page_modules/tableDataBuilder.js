/* global __dirname */
const handlebars = require('handlebars');
const fs = require('fs');
const format = require('string-format');
const colorRectangle = "<div id=\"rectangle\" class=\"well well-sm\" style=\"width:20 px; height:20 px; background-color:{color}\"></div>";
const lastLiveColor = 'last_live_color';

exports.registerHelper = function () {
    handlebars.registerHelper('device_info_table', function (selected_devices) {
        var tableRows = "";

        for (var i = 0; i < selected_devices.length; i++) {
            tableRows += buildTableRow(selected_devices[i]);
        }

        return tableRows;
    });
};

exports.buildTableRow = function (device) {
    return buildTableRow(device);
};

function buildTableRow(device) {
    var tableRow = "<tr>";

    for (var i = 0; i < Object.keys(device).length; i++) {
        tableRow += "<td>";

        if (Object.keys(device)[i] !== lastLiveColor) {
            tableRow += device[Object.keys(device)[i]];
        } else {
            tableRow += format(colorRectangle, {'color': device[lastLiveColor]});
        }

        tableRow += "</td>";
    }

    tableRow += "</tr>";
    return tableRow;
}