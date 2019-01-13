"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
class YTMFileSystem {
    static get startupDirectory() {
        return path.resolve('ytm');
    }
    static get storageDirectory() {
        return path.resolve('ytm/storage');
    }
    static mkDirs() {
        try {
            if (!fs.existsSync(YTMFileSystem.startupDirectory))
                fs.mkdirSync(YTMFileSystem.startupDirectory);
            if (!fs.existsSync(YTMFileSystem.storageDirectory))
                fs.mkdirSync(YTMFileSystem.storageDirectory);
        }
        catch (ex) {
            electron_1.dialog.showErrorBox('An error occurred...', 'An error occurred while creating the YTM directory:\n\n' + ex.message);
            electron_1.app.exit(1);
        }
    }
    static getStorageFileMap() {
        let filemap = {};
        fs.readdirSync(YTMFileSystem.storageDirectory).filter(file => path.extname(file) === '.png').forEach(file => { filemap[file] = path.resolve(YTMFileSystem.storageDirectory + '/' + file); });
        return filemap;
    }
}
exports.YTMFileSystem = YTMFileSystem;
//# sourceMappingURL=YTMFileSystem.js.map