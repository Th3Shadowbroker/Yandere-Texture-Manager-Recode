"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var YTMApplication_1 = require("./ts/YTMApplication");
var ytmApp;
electron_1.app.on('ready', initialize);
function initialize() {
    ytmApp = new YTMApplication_1.YTMApplication();
}
