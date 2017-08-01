function QueryBuilder(queryTarget,queryFormat) {
    this.queryLayout = "/{target}/{query}";
    this.queryTarget = queryTarget;
    this.queryFormat = queryFormat;
    
    this.getListObjectsAsString = function(list) {
        var listObjectsAsString = "";
        for (var i = 0; i < list.length; i++) {
            if (i === list.length - 1) {
                listObjectsAsString += list[i];
            } else {
                listObjectsAsString += list[i] + ",";
            }
        }
        return listObjectsAsString;
    };
}

QueryBuilder.prototype.buildQuery = function(data) {
    var query = this.queryFormat.format(data);
    return this.queryLayout.format({'target' : this.queryTarget, 'query' : query});
};

QueryBuilder.prototype.buildQueryFromList = function(data) {
    data.list = this.getListObjectsAsString(data.list);
    var query = this.queryFormat.format(data);
    
    return this.queryLayout.format({'target' : this.queryTarget, 'query' : query});
};