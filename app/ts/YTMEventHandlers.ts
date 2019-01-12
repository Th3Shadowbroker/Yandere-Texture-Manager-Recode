import {ipcMain} from 'electron';
import {YTMFileSystem} from "./YTMFileSystem";

ipcMain.on('request-update-texture-list', function ( event, item )
{
   console.log('Texture-list update requested!');
   event.sender.send('update-texture-list', YTMFileSystem.getStorageFileMap());
});
