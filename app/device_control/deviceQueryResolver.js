var pageDataHelper = require("../views/pageDataBuilder.js");
const parameterFunctionMapping = require("./parameterFunctionMapping.json");
var QueryResolver = require("../query_resolver/queryResolver.js");

exports.delegate = function (request, response) {
    var queryParameters = Object.keys(request.query);
    var resultFunction = getFunctionFromParameters(queryParameters);
    executeResultFunction(resultFunction,request.query,response);
};

function getFunctionFromParameters(queryParameters) {
    var queryResolver = new QueryResolver(parameterFunctionMapping);
    queryResolver.getQueryHandlerFromParameters(queryParameters);    
    return queryResolver.getQueryHandlerFromParameters(queryParameters);
}

function executeResultFunction(resultFunction,query,response) {
    if (resultFunction !== "undefined") {
        require(resultFunction).execute(query,response);
    } else {
        pageDataHelper.send404(response);
    }
}