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
import {YTMApplication} from "./ts/YTMApplication";
import {JsonConfiguration} from "./ts/JsonConfiguration";
import path = require("path");
import fs = require("fs");
import {YTMFileSystem} from "./ts/YTMFileSystem";


let ytmApp : YTMApplication;
let ytmConfig : JsonConfiguration;
app.on('ready', initialize);

function initialize() : void
{
    checkFileStructure();
    loadConfiguration();
    createWindow();
}

function checkFileStructure()
{
    YTMFileSystem.mkDirs();
}

function loadConfiguration() : void
{
    ytmConfig = new JsonConfiguration( path.resolve( YTMFileSystem.startupDirectory + '/ytm.json' ) );

    if ( !ytmConfig.isSet('gamePath') )
    {
        selectGameDirectory();
    }

    ytmConfig.saveToOrigin();
}

function selectGameDirectory()
{
    let pathSelection = dialog.showOpenDialog
    (
        {
           title: 'Select the Yandere Simulator directory...',
           properties: ["openDirectory"]
        }
    );

    if ( pathSelection )
    {
        if (
            fs.existsSync( path.resolve( pathSelection + '/YandereSimulator.exe' ) ) &&
            fs.existsSync( path.resolve( pathSelection + '/YandereSimulator_Data' ) )
           )
        {
            ytmConfig.setValue('gamePath', pathSelection);
        }
        else
        {
            dialog.showErrorBox( 'Cannot verify directory...', 'Failed to find the required file/s and/or directory/directories:\n\nYandereSimulator.exe\nYandereSimulator_Data' );
            selectGameDirectory();
        }
    }
    else
    {
        dialog.showErrorBox('Invalid selection...', 'You\'ve select an invalid directory!');
        selectGameDirectory();
    }
}

function createWindow() : void
{
    ytmApp = new YTMApplication
    (
        600,
        800,
        ytmConfig,
        'Yandere Texture Manager',
        __dirname + '/html/MainWindow.html',
        true
    );
}
