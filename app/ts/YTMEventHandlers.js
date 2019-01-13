"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const YTMFileSystem_1 = require("./YTMFileSystem");
electron_1.ipcMain.on('request-update-texture-list', function (event, item) {
    console.log('Texture-list update requested!');
    event.sender.send('update-texture-list', YTMFileSystem_1.YTMFileSystem.getStorageFileMap());
});
//# sourceMappingURL=YTMEventHandlers.js.map