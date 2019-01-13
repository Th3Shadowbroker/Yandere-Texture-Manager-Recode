import {app, dialog} from 'electron';
import path = require('path');
import fs = require("fs");

export class YTMFileSystem
{

    static get startupDirectory() : string
    {
        return path.resolve('ytm');
    }

    static get storageDirectory() : string
    {
        return path.resolve( 'ytm/storage' );
    }

    static mkDirs() : void
    {
        try
        {
            if (!fs.existsSync( YTMFileSystem.startupDirectory )) fs.mkdirSync( YTMFileSystem.startupDirectory );
            if (!fs.existsSync( YTMFileSystem.storageDirectory )) fs.mkdirSync( YTMFileSystem.storageDirectory );
        }
        catch (ex)
        {
            dialog.showErrorBox('An error occurred...', 'An error occurred while creating the YTM directory:\n\n' + ex.message);
            app.exit(1);
        }
    }

    static getStorageFileMap() : {}
    {
        let filemap = {};
        fs.readdirSync( YTMFileSystem.storageDirectory ).filter( file => path.extname( file ).toLowerCase() === '.png' ).forEach
        (
          file => { filemap[file] = path.resolve( YTMFileSystem.storageDirectory + '/' + file ); }
        );

        return filemap;
    }

}
