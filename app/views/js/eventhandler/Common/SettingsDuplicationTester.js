function SettingsDuplicationTest(deviceNetworkName,devicePort,deviceName) {
    this.queryFormat = "?name={name}&network_addr={network}&port={port}&checkForName=";
    this.queryTarget = "user";
    this.deviceNetworkName = deviceNetworkName;
    this.devicePort = devicePort;
    this.deviceName = deviceName;
}

SettingsDuplicationTest.prototype.checkForDuplicateEntries = function() {
    var queryBuilder = new QueryBuilder(this.queryTarget, this.queryFormat);
    var query = queryBuilder.buildQuery({'name' : this.deviceName ,'network': this.deviceNetworkName, 'port': this.devicePort});
    var httpConnection = new ServerConnectionSync();
    httpConnection.sendQuery(query, "GET");
    return httpConnection.getSyncResponse();
};
