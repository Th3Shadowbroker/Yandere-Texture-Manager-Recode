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

import {BrowserWindow, globalShortcut, app} from 'electron';
import {JsonConfiguration} from "./JsonConfiguration";

export class YTMApplication
{

    private _mainWindow : BrowserWindow;

    private _configuration : JsonConfiguration;

    private static _instance : YTMApplication;

    constructor( height : number, width : number, configuration : JsonConfiguration, defaultTitle : string, defaultHtml : string, showByDefault : boolean )
    {
        YTMApplication._instance = this;

        this._configuration = configuration;

        this._mainWindow = new BrowserWindow
        (
            {
                height: height,
                width: width,
                resizable: false,
                autoHideMenuBar: true,
                show: showByDefault,
                title: defaultTitle
            }
        );

        this._mainWindow.on('closed', () => { app.exit(0); } );

        require('./YTMEventHandlers');
        globalShortcut.register( 'ctrl+shift+d', function(){ if ( BrowserWindow.getFocusedWindow() ) { BrowserWindow.getFocusedWindow().webContents.toggleDevTools(); } } );

        this._mainWindow.loadFile(defaultHtml);
    }

    public static get config() : JsonConfiguration
    {
        return YTMApplication._instance._configuration;
    }

    public static get mainWindow() : BrowserWindow
    {
        return YTMApplication._instance._mainWindow;
    }

    static get instance() : YTMApplication
    {
        return YTMApplication._instance;
    }

}
