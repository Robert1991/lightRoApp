function TestDeviceSettingsRequest(deviceNetworkName, port) {
    this.queryTarget = "device";
    this.queryFormat = "?network_addr={network}&port={port}&test_conn=true";
    this.deviceNetworkName = deviceNetworkName;
    this.port = port;

}

TestDeviceSettingsRequest.prototype.sendTestSettingsQuery = function () {
    var queryBuilder = new QueryBuilder(this.queryTarget, this.queryFormat);
    var query = queryBuilder.buildQuery({'network': this.deviceNetworkName, 'port': this.port});
    var httpConnection = new ServerConnectionSync();
    httpConnection.sendQuery(query, "GET");
    return httpConnection.getSyncResponse();
};
