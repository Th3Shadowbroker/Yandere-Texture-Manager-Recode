import {BrowserWindow, globalShortcut, ipcMain} from 'electron';
import {JsonConfiguration} from "./JsonConfiguration";

export class YTMApplication
{

    private mainWindow : BrowserWindow;

    private configuration : JsonConfiguration

    private static _instance : YTMApplication;

    constructor( height : number, width : number, configuration : JsonConfiguration, defaultTitle : string, defaultHtml : string, showByDefault : boolean )
    {
        YTMApplication._instance = this;

        this.configuration = configuration;

        this.mainWindow = new BrowserWindow
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

        require('./YTMEventHandlers');
        globalShortcut.register( 'ctrl+shift+d', function(){ YTMApplication.mainWindow.webContents.toggleDevTools() } );

        this.mainWindow.loadFile(defaultHtml);
    }

    static get config() : JsonConfiguration
    {
        return YTMApplication._instance.configuration;
    }

    static get mainWindow() : BrowserWindow
    {
        return YTMApplication._instance.mainWindow;
    }

    static get instance() : YTMApplication
    {
        return YTMApplication._instance;
    }

}
