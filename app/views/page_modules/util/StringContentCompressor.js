// matches at least one blank 
const blankExp = /\ +/g;
// Comments,Tab,Newline
const filteredPatternsWithoutReplacement = [/.*\/{2,}.*[\n{1}]|^/g, /\t/g, /\n/g];

exports.compressStringContent = function(stringContent) {
    return compressStringContent(stringContent);
};

function compressStringContent(scriptContent) {
    var compressed = scriptContent;
    for (var i = 0; i < filteredPatternsWithoutReplacement.length; i++) {
        compressed = filterPattern(compressed, filteredPatternsWithoutReplacement[i], "");
    }
    compressed = filterPattern(compressed, blankExp, " ");
    return compressed;
}

function filterPattern(content, pattern, replacement) {
    return content.replace(pattern, replacement);
}