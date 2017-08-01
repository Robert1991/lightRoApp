/* global __dirname */
const scriptFormat = "<script>{scriptContent}</script>";
const scriptDir = __dirname + "/../js";


var handlebars = require('handlebars');
var format = require('string-format');
var dirHandle = require('../../util/DirHandle');
var fileHandle = require('../../util/FileHandle');
var ContentCompressor = require(__dirname + '/util/StringContentCompressor');

exports.registerHelper = function () {
    handlebars.registerHelper('local_script_import', function () {
        var scripts = "";
        var dirContent = [];
        dirContent = dirHandle.readDirContentSyncRecursive(scriptDir);
        
        for (i = 0; i < dirContent.length; i++) {
            scripts += getScriptContentFromSourceFile(dirContent[i]);
        }

        return format(scriptFormat, {'scriptContent': scripts});
    });
};

function getScriptContentFromSourceFile(scriptLocation) {
    var scriptContent = fileHandle.readFileSync(scriptLocation);
    return ContentCompressor.compressStringContent(" " + scriptContent + " ");
}

