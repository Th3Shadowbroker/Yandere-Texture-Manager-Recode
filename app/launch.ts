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
