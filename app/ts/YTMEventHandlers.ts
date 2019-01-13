import {ipcMain, dialog} from 'electron';
import {YTMFileSystem} from "./YTMFileSystem";
import fs = require("fs");
import path = require("path");

/**
 * Refresh texture list.
 */
ipcMain.on('request-update-texture-list', function ( event, item )
{
   console.log('Texture-list update requested!');
   event.sender.send('update-texture-list', YTMFileSystem.getStorageFileMap());
});

/**
 * Delete texture.
 */
ipcMain.on('request-texture-deletion', function ( event, item )
{
   if ( !item || item.length < 1 ) return;

   console.log('File deletion requested: ' + item);

   let req = dialog.showMessageBox(
   {
      type: 'question',
      message: 'Are you sure you want to delete this file?\n\n' + item,
      title: 'Delete texture...',
      buttons: ['No','Yes'],
      cancelId: 0,
      defaultId: 0
   });

   console.log('User request result: ' + req);

   if ( req )
   {
      try
      {
         fs.unlinkSync(item);
         console.log( 'File deleted: ' + item );
         event.sender.send('update-texture-list', YTMFileSystem.getStorageFileMap());
      }
      catch (ex)
      {
         dialog.showErrorBox('Error', 'Deletion of ' + item + " failed:\n\n" + ex.message);
      }
   }
});

ipcMain.on('add-texture', function (event, item)
{
   console.log('Requesting file selection...');

   let ofd = dialog.showOpenDialog
   (
       {
          title: 'Add textures...',
          filters: [ {name: 'PNG-File', extensions: ['png']} ],
          properties: [ "openFile", "multiSelections" ]
       }
   );

   if ( !ofd || ofd.length < 1 ) return;

   ofd.forEach
   (
       selectedFile =>
       {
          try
          {
             let sourceFile = path.resolve(selectedFile);
             let targetFile = path.resolve(YTMFileSystem.storageDirectory + '/' + path.basename(selectedFile));

             if (!fs.existsSync(targetFile))
             {
                console.log('Copying ' + sourceFile + ' to ' + targetFile + '...');
                fs.copyFileSync( sourceFile, targetFile );
             }
             else
             {
                dialog.showErrorBox('Error', 'There\'s already a file named ' + path.basename(selectedFile) + '.\nThe file will be ignored.');
             }
          }
          catch (ex)
          {
             dialog.showErrorBox('Error', 'Failed to load ' + selectedFile + " to storage directory:\n\n" + ex.message);
          }
       }
   );

   event.sender.send('update-texture-list', YTMFileSystem.getStorageFileMap());
});
