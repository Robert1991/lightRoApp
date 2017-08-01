function FormDataExpressionCheck(currentFormData) {
    this.formData = currentFormData;
    this.networkNameExp = /(^[a-zA-Z]+$)|(^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/;
    this.portExp = /^[0-9]{1,4}$/;
    
    this.checkIfDevicesSettingsAreInValidFormat = function () {
        return this.checkDeviceNetworkName() && this.checkDevicePort();
    };

    this.checkDeviceNetworkName = function () {
        return this.formData.deviceNetworkName.match(this.networkNameExp);
    };

    this.checkDevicePort = function () {
        return this.formData.devicePort.match(this.portExp);
    };

    this.checkIfFormIsFilled = function () {
        var formDataObjectKeys = Object.keys(this.formData);

        for (var i = 0; i < Object.keys(this.formData).length; i++) {
            if (this.formData[formDataObjectKeys[i]].length <= 0) {
                return false;
            }
        }

        return true;
    };
}

FormDataExpressionCheck.prototype.checkNetworkPortFormat = function () {
    return this.checkIfDevicesSettingsAreInValidFormat();
};

FormDataExpressionCheck.prototype.checkForEmptyValues = function () {
    return this.checkIfFormIsFilled();
};