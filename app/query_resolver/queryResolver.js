/* global undefinded */

function QueryResolver(mappingFile) {
    this.parameterKeys = Object.keys(mappingFile);
    this.mapping = mappingFile;
}

QueryResolver.prototype.getQueryHandlerFromParameters = function (queryParameters) {
    var queryHandler = this.lookUpParameterSet(queryParameters);
    return queryHandler;
};

QueryResolver.prototype.lookUpParameterSet = function (queryParameters) {
        for (var i = 0; i < this.parameterKeys.length; i++) {
            var found = true;
            for (var j = 0; j < queryParameters.length; j++) {
                if (this.parameterKeys[i].indexOf(queryParameters[j]) === -1) {
                    found = false;
                }
            }

            if (found) {
                queryHandler = this.mapping[this.parameterKeys[i]];
                return queryHandler;
            }
        }

        return "undefinded";
};

module.exports = QueryResolver;
