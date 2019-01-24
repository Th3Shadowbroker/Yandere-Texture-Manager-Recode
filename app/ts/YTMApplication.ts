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
