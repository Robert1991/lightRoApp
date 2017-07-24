/////// UNDER CONSTRUCTION
const colorFormat = RegExp("[a-z0-9A-Z]{5}");

// pruefung als funktion in eigene Klasse (vll in json mitgeben ...)
// zerlegung von url in json objekt --> methode dazu wieder in eigene Klasse

const networkFormatExpression = RegExp("(^[a-zA-Z]+$)|(^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})");
const portFormatExpression = RegExp("[a-z0-9A-Z]{5}");

exports.execute = function(query,response) {
    console.log(query);
    
    var foo = "0";
    
    if (foo === "0")
        response.send("{status : \"OK\", msg : \"OKMessage\"}");
    else
        response.send("{status : \"NOK\", msg : \"NOKMessage\"}");
    
    
};