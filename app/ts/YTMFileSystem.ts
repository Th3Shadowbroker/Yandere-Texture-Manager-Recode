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
