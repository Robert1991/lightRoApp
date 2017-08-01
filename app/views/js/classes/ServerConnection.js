function ServerConnectionSync() {
    this.httpConnection = new XMLHttpRequest();
}

ServerConnectionSync.prototype.sendQuery = function (query, type) {
    this.httpConnection.open(type, query, false);
    this.httpConnection.send();
};

ServerConnectionSync.prototype.getSyncResponse = function () {
    if (this.httpConnection.status === 200) {
        return eval("(" + this.httpConnection.responseText + ')');
    } else {
        return "undefined";
    }
};

function ServerConnectionASync(asyncResponseFunction) {
    this.responseFunction = asyncResponseFunction;
}

ServerConnectionASync.prototype.sendQuery = function (query,type,responseFunction) {
    var asyncFunctionHandle = function () {
        if (httpConnection.readyState === 4 && httpConnection.status === 200) {
            responseFunction(httpConnection);
        }
    };
    
    var httpConnection = new XMLHttpRequest();
    httpConnection.open(type, query, true);
    httpConnection.onreadystatechange = asyncFunctionHandle;
    httpConnection.send();
};