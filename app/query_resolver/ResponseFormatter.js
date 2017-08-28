const responseFormat = "{{status : \"{status}\", msg : \"{msg}\"}}";
var format = require('string-format');

exports.formatSimpleResponse = function(status,msg) {
    return formatResponse(status,msg);
};

function formatResponse(status,msg) {
    return format(responseFormat,{'status' : status, 'msg' : msg});
}
