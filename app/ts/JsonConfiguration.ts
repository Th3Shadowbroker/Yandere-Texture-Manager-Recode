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
