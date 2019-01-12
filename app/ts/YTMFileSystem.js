"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var fs = require("fs");
var YTMFileSystem = /** @class */ (function () {
    function YTMFileSystem() {
    }
    Object.defineProperty(YTMFileSystem, "startupDirectory", {
        get: function () {
            return path.resolve('ytm');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YTMFileSystem, "storageDirectory", {
        get: function () {
            return path.resolve('ytm/storage');
        },
        enumerable: true,
        configurable: true
    });
    YTMFileSystem.mkDirs = function () {
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
    };
    YTMFileSystem.getStorageFileMap = function () {
        var filemap = {};
        fs.readdirSync(YTMFileSystem.storageDirectory).filter(function (file) { return path.extname(file) === '.png'; }).forEach(function (file) { filemap[file] = path.resolve(YTMFileSystem.storageDirectory + '/' + file); });
        return filemap;
    };
    return YTMFileSystem;
}());
exports.YTMFileSystem = YTMFileSystem;
