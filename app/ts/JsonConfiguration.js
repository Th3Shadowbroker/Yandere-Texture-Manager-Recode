"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class JsonConfiguration {
    constructor(filename) {
        this.filename = filename;
        if (fs.existsSync(filename)) {
            this.configuration = JSON.parse(fs.readFileSync(filename).toString('utf-8'));
        }
        else {
            this.configuration = {};
        }
    }
    getConfiguration() {
        return this.configuration;
    }
    getFileName() {
        return this.filename;
    }
    getValue(name) {
        return this.configuration[name];
    }
    setValue(name, value) {
        this.configuration[name] = value;
        return this;
    }
    setDefaultValue(name, value) {
        if (!this.isSet(name))
            this.setValue(name, value);
        return this;
    }
    isSet(name) {
        return this.configuration.hasOwnProperty(name);
    }
    setConfiguration(configuration) {
        this.configuration = configuration;
    }
    saveToOrigin() {
        try {
            fs.writeFileSync(this.filename, JSON.stringify(this.configuration, null, 2));
            return true;
        }
        catch (exceptions) {
            console.log('An error occurred while writing to ' + this.filename + ": " + exceptions.message);
            return false;
        }
    }
    save(filename) {
        try {
            this.filename = filename;
            fs.writeFileSync(filename, JSON.stringify(this.configuration, null, 2));
            return true;
        }
        catch (exceptions) {
            console.log('An error occurred while writing to ' + this.filename + ": " + exceptions.message);
            return false;
        }
    }
}
exports.JsonConfiguration = JsonConfiguration;
//# sourceMappingURL=JsonConfiguration.js.map