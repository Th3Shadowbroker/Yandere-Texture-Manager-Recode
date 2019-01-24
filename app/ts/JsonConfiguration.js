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