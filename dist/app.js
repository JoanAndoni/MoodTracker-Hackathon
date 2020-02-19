"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var PORT = process.env.PORT || 5000;
var app = express();
app.get('/', function (req, res) {
    res.send('Free your mind Hackathon!');
});
app.listen(PORT, function () {
    console.log("App listening!");
});
