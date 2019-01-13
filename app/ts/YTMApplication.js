"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class YTMApplication {
    constructor(height, width, configuration, defaultTitle, defaultHtml, showByDefault) {
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
    static get config() {
        return YTMApplication._instance.configuration;
    }
    static get mainWindow() {
        return YTMApplication._instance.mainWindow;
    }
    static get instance() {
        return YTMApplication._instance;
    }
}
exports.YTMApplication = YTMApplication;
//# sourceMappingURL=YTMApplication.js.map