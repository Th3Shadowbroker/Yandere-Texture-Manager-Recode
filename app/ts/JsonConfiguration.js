"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var JsonConfiguration = /** @class */ (function () {
    function JsonConfiguration(filename) {
        this.filename = filename;
        if (fs.existsSync(filename)) {
            this.configuration = JSON.parse(fs.readFileSync(filename).toString('utf-8'));
        }
        else {
            this.configuration = {};
        }
    }
    JsonConfiguration.prototype.getConfiguration = function () {
        return this.configuration;
    };
    JsonConfiguration.prototype.getFileName = function () {
        return this.filename;
    };
    JsonConfiguration.prototype.getValue = function (name) {
        return this.configuration[name];
    };
    JsonConfiguration.prototype.setValue = function (name, value) {
        this.configuration[name] = value;
        return this;
    };
    JsonConfiguration.prototype.setDefaultValue = function (name, value) {
        if (!this.isSet(name))
            this.setValue(name, value);
        return this;
    };
    JsonConfiguration.prototype.isSet = function (name) {
        return this.configuration.hasOwnProperty(name);
    };
    JsonConfiguration.prototype.setConfiguration = function (configuration) {
        this.configuration = configuration;
    };
    JsonConfiguration.prototype.saveToOrigin = function () {
        try {
            fs.writeFileSync(this.filename, JSON.stringify(this.configuration, null, 2));
            return true;
        }
        catch (exceptions) {
            console.log('An error occurred while writing to ' + this.filename + ": " + exceptions.message);
            return false;
        }
    };
    JsonConfiguration.prototype.save = function (filename) {
        try {
            this.filename = filename;
            fs.writeFileSync(filename, JSON.stringify(this.configuration, null, 2));
            return true;
        }
        catch (exceptions) {
            console.log('An error occurred while writing to ' + this.filename + ": " + exceptions.message);
            return false;
        }
    };
    return JsonConfiguration;
}());
exports.JsonConfiguration = JsonConfiguration;
