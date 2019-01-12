"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var YTMApplication_1 = require("./ts/YTMApplication");
var JsonConfiguration_1 = require("./ts/JsonConfiguration");
var path = require("path");
var fs = require("fs");
var YTMFileSystem_1 = require("./ts/YTMFileSystem");
var ytmApp;
var ytmConfig;
electron_1.app.on('ready', initialize);
function initialize() {
    checkFileStructure();
    loadConfiguration();
    createWindow();
}
function checkFileStructure() {
    YTMFileSystem_1.YTMFileSystem.mkDirs();
}
function loadConfiguration() {
    ytmConfig = new JsonConfiguration_1.JsonConfiguration(path.resolve(YTMFileSystem_1.YTMFileSystem.startupDirectory + '/ytm.json'));
    if (!ytmConfig.isSet('gamePath')) {
        selectGameDirectory();
    }
    ytmConfig.saveToOrigin();
}
function selectGameDirectory() {
    var pathSelection = electron_1.dialog.showOpenDialog({
        title: 'Select the Yandere Simulator directory...',
        properties: ["openDirectory"]
    });
    if (pathSelection) {
        if (fs.existsSync(path.resolve(pathSelection + '/YandereSimulator.exe')) &&
            fs.existsSync(path.resolve(pathSelection + '/YandereSimulator_Data'))) {
            ytmConfig.setValue('gamePath', pathSelection);
        }
        else {
            electron_1.dialog.showErrorBox('Cannot verify directory...', 'Failed to find the required file/s and/or directory/directories:\n\nYandereSimulator.exe\nYandereSimulator_Data');
            selectGameDirectory();
        }
    }
    else {
        electron_1.dialog.showErrorBox('Invalid selection...', 'You\'ve select an invalid directory!');
        selectGameDirectory();
    }
}
function createWindow() {
    ytmApp = new YTMApplication_1.YTMApplication(600, 800, ytmConfig, 'Yandere Texture Manager', __dirname + '/html/MainWindow.html', true);
}
