"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var YTMFileSystem_1 = require("./YTMFileSystem");
electron_1.ipcMain.on('request-update-texture-list', function (event, item) {
    console.log('Texture-list update requested!');
    event.sender.send('update-texture-list', YTMFileSystem_1.YTMFileSystem.getStorageFileMap());
});
