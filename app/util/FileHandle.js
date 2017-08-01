var fs = require('fs');

exports.readFileSync = function(filePath) {
    return fs.readFileSync(filePath, {encoding: 'utf8'});
};