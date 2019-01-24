"use strict";
/*
 * Copyright (c) 2019 M4taiori
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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