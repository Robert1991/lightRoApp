var express = require('express');
var app = express();
var deviceQueryDelegator = require("./device_control/deviceQueryResolver.js");
var userDataControl = require("./user_data_control/userDataQueryResolver.js");
var indexPageBuilder = require("./views/indexPageBuilder.js");

const indexPage = '/';
const device = '/device/';
const user = '/user/';
const add = '/add/';

app.get(indexPage, function (req, res) {
    console.log(req.url);
    indexPageBuilder.showIndexPage(req,res);  
});

app.get(device, function (req, res) {
    console.log(req.url);
    deviceQueryDelegator.delegate(req,res);
});

app.get(add, function (req, res) {
    console.log(req.url);
    userDataControl.delegate(req,res);
});

app.get(user, function (req, res) {
    console.log(req.url);
    userDataControl.delegate(req,res);
});


app.post('/', function (req, res) {
    console.log(req.url);
    res.send('POST');
});

app.put('/', function (req, res) {
    res.send('Got a PUT request at /user');
});

app.delete('/', function (req, res) {
    res.send('Got a DELETE request at /user');
});

app.listen(3000, function () {
    console.log('LightRoApp listening on port 3000!');
});
