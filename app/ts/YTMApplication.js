"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var YTMApplication = /** @class */ (function () {
    function YTMApplication(height, width, configuration, defaultTitle, defaultHtml, showByDefault) {
        YTMApplication._instance = this;
        this.configuration = configuration;
        this.mainWindow = new electron_1.BrowserWindow({
            height: height,
            width: width,
            resizable: false,
            autoHideMenuBar: true,
            show: showByDefault,
            title: defaultTitle
        });
        require('./YTMEventHandlers');
        electron_1.globalShortcut.register('ctrl+shift+d', function () { YTMApplication.mainWindow.webContents.toggleDevTools(); });
        this.mainWindow.loadFile(defaultHtml);
    }
    Object.defineProperty(YTMApplication, "config", {
        get: function () {
            return YTMApplication._instance.configuration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YTMApplication, "mainWindow", {
        get: function () {
            return YTMApplication._instance.mainWindow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YTMApplication, "instance", {
        get: function () {
            return YTMApplication._instance;
        },
        enumerable: true,
        configurable: true
    });
    return YTMApplication;
}());
exports.YTMApplication = YTMApplication;
