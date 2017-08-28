document.getElementById('submitButton').addEventListener('click', submitSettingsEventHandler);

function submitSettingsEventHandler() {
    const device_network_name_tagId = "device_network_name";
    const device_port_tagId = "device_port";
    var formData = new FormData();
    var sendSettings = true;

    function processResponseFromTestSettings(response) {
        if (response['status'] !== 'OK') {
            alert("Device could not be found!");
            sendSettings = false;
        }
    }

    function processResponseFromCheckForDeviceNameQuery(response) {
        if (response['msg'] === 'true') {
            alert("Name or network address already exists!");
            sendSettings = false;
        }
    }

    function checkIfDeviceNameAlreadyExists() {
        var settingsDuplicationCheck = new SettingsDuplicationTest(formData.deviceNetworkName,formData.devicePort,formData.deviceName);
        var response = settingsDuplicationCheck.checkForDuplicateEntries();
        processResponseFromCheckForDeviceNameQuery(response);
    }

    function checkIfConfigurationIsValid() {
        var testSettingsRequest = new TestDeviceSettingsRequest(formData.deviceNetworkName, formData.devicePort);
        var response = testSettingsRequest.sendTestSettingsQuery();
        
        if (response !== 'undefined') {
            processResponseFromTestSettings(response);
        } else {
            sendSettings = false;
        }
    }
    
    function checkIfDevicesSettingsAreInValidFormat() {
        var formDataExpressionCheck =  new FormDataExpressionCheck(formData);
        
        if (formDataExpressionCheck.checkForEmptyValues()) {    
            if (formDataExpressionCheck.checkNetworkPortFormat()) {
                return true;
            } else {
                alert("Please enter in an valid format.");
                return false;
            }
        } else {
            alert("Please fill out all the fields");
            return false;
        }
        
    }

    if (checkIfDevicesSettingsAreInValidFormat()) {
        // check if Device is in Db
        checkIfDeviceNameAlreadyExists();

        if (sendSettings) {
            checkIfConfigurationIsValid();
        }
    } else {
        sendSettings = false;
    }

    if (sendSettings) {
        document.getElementById("addDeviceForm").submit();
    }
    
    
}