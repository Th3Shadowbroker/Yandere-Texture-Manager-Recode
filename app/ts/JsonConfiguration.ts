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

import fs = require("fs");
import {isNullOrUndefined, isUndefined} from "util";

export class JsonConfiguration
{

    private filename : string;

    private configuration : object;

    public constructor(filename)
    {
        this.filename = filename;

        if ( fs.existsSync(filename) )
        {
            this.configuration = JSON.parse( fs.readFileSync(filename).toString('utf-8') );
        }
        else
        {
            this.configuration = {};
        }
    }

    public getConfiguration() : object
    {
        return this.configuration;
    }

    public getFileName() : string
    {
        return this.filename;
    }

    public getValue(name : string) : string
    {
        return this.configuration[name];
    }

    public setValue(name : string, value : any) : JsonConfiguration
    {
        this.configuration[name] = value;
        return this;
    }

    public setDefaultValue(name : string, value : any) : JsonConfiguration
    {
        if (!this.isSet(name)) this.setValue(name, value);
        return this;
    }

    public isSet(name : string) : boolean
    {
        return this.configuration.hasOwnProperty(name);
    }

    public setConfiguration(configuration : object)
    {
        this.configuration = configuration;
    }

    public saveToOrigin() : boolean
    {
        try
        {
            fs.writeFileSync( this.filename, JSON.stringify(this.configuration, null, 2) );
            return true;
        }
        catch (exceptions)
        {
            console.log('An error occurred while writing to ' + this.filename + ": " + exceptions.message);
            return false;
        }
    }

    public save(filename : string) : boolean
    {
        try
        {
            this.filename = filename;
            fs.writeFileSync( filename, JSON.stringify(this.configuration, null, 2) );
            return true;
        }
        catch (exceptions)
        {
            console.log('An error occurred while writing to ' + this.filename + ": " + exceptions.message);
            return false;
        }
    }

}
