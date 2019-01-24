"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class YTMApplication {
    constructor(height, width, configuration, defaultTitle, defaultHtml, showByDefault) {
        YTMApplication._instance = this;
        this._configuration = configuration;
        this._mainWindow = new electron_1.BrowserWindow({
            height: height,
            width: width,
            resizable: false,
            autoHideMenuBar: true,
            show: showByDefault,
            title: defaultTitle
        });
        this._mainWindow.on('closed', () => { electron_1.app.exit(0); });
        require('./YTMEventHandlers');
        electron_1.globalShortcut.register('ctrl+shift+d', function () { if (electron_1.BrowserWindow.getFocusedWindow()) {
            electron_1.BrowserWindow.getFocusedWindow().webContents.toggleDevTools();
        } });
        this._mainWindow.loadFile(defaultHtml);
    }
    static get config() {
        return YTMApplication._instance._configuration;
    }
    static get mainWindow() {
        return YTMApplication._instance._mainWindow;
    }
    static get instance() {
        return YTMApplication._instance;
    }
}
exports.YTMApplication = YTMApplication;
//# sourceMappingURL=YTMApplication.js.map