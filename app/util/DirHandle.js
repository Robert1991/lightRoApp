var fs = require('fs');

var recursiveDirWalk = function (dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory())
            results = results.concat(recursiveDirWalk(file));
        else
            results.push(file);
    });
    return results;
};


exports.readDirContentSyncRecursive = function(dirPath) {
    return recursiveDirWalk(dirPath);
};