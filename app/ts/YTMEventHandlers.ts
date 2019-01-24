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

import {ipcMain, dialog, BrowserWindow} from 'electron';
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

/**
 * Add a new texture.
 */
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

/**
 * Apply texture
 */
ipcMain.on('open-apply-texture-dialog', function (event, item) {

   console.log('ApplyTextureDialog:\n\tFile name: ' + item['fileName'] + '\n\tFile path: ' + item['filePath'])

   let applyDialog = new BrowserWindow
   (
       {
          height: 200,
          width: 500,
          resizable: false,
          maximizable: false,
          minimizable: false,
          autoHideMenuBar: true,
          title: 'Apply texture...',
          show: false
       }
   );

   applyDialog.loadFile(__dirname + '/../html/ApplyTextureWindow.html');

   applyDialog.webContents.on('did-finish-load', function () {
       applyDialog.webContents.send('receive-file-information', item);
   });

    applyDialog.show();
});
