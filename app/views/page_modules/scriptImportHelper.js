/* global __dirname */
const handlebars = require('handlebars');
const fs = require('fs');
const format = require('string-format');
// matches at least one blank 
const blankExp = /\ +/g;
// Comments,Tab,Newline
const filteredPatternsWithoutReplacement = [/.*\/{2,}.*[\n{1}]|^/g,/\t/g,/\n/g];
const scriptFormat = "<script>{scriptContent}</script>";

exports.registerHelper = function () {
    handlebars.registerHelper('local_script_import', function (local_js) {
        var scripts = "";

        for (i = 0; i < local_js.length; i++) {
            scripts += getScriptContentFromSourceFile(local_js[i]);
        }

        return format(scriptFormat, {'scriptContent': scripts});
    });
};

function getScriptContentFromSourceFile(scriptLocation) {
    var scriptContent = fs.readFileSync(__dirname + "/../" + scriptLocation, {encoding: 'utf8'});
    return compressScriptContent(scriptContent);
}

function compressScriptContent(scriptContent) {
    var compressed = scriptContent;
    for (var i = 0; i < filteredPatternsWithoutReplacement.length; i++) {
        compressed = filterPattern(compressed,filteredPatternsWithoutReplacement[i],"");
    }
    compressed = filterPattern(compressed,blankExp," ");
    return compressed;
}

function filterPattern(content,pattern,replacement) {
    return content.replace(pattern,replacement);
}