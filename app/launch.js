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
const YTMApplication_1 = require("./ts/YTMApplication");
const JsonConfiguration_1 = require("./ts/JsonConfiguration");
const path = require("path");
const fs = require("fs");
const YTMFileSystem_1 = require("./ts/YTMFileSystem");
let ytmApp;
let ytmConfig;
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
    let pathSelection = electron_1.dialog.showOpenDialog({
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
//# sourceMappingURL=launch.js.map