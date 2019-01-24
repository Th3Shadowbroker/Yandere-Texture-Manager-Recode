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

const {JsonConfiguration} = require("../ts/JsonConfiguration");
const {YTMFileSystem} = require("../ts/YTMFileSystem");
const {YTMApplication} = require('../ts/YTMApplication');
const electron = require('electron');
const {ipcRenderer, remote} = electron;
const fs = require('fs');
const path = require('path');

/**
 * Process received information
 */
let fileName;
let filePath;
ipcRenderer.on('receive-file-information', function (event, item) {
    fileName = item['fileName'];
    filePath = item['filePath'];
});

function copyTexture()
{
    let config = new JsonConfiguration( path.resolve( YTMFileSystem.startupDirectory + '/ytm.json' ) );
    let targetPath = path.resolve(config.getValue('gamePath') + '/YandereSimulator_Data/StreamingAssets/' + document.getElementById('customization-selection').value);
    let selectionElement = document.getElementById('customization-selection');

    console.log('Copying ' + filePath + ' to ' + targetPath);
    fs.copyFileSync(filePath, targetPath);
    remote.dialog.showMessageBox( {title: 'Texture applied...', message: 'Texture will be used as ' + selectionElement.options[selectionElement.selectedIndex].innerText + ' (' + selectionElement.options[selectionElement.selectedIndex].value + ')', buttons: ['OK']} );
    remote.getCurrentWindow().close();
}

document.getElementById('btn-use-texture').addEventListener('click', copyTexture);

//Import dependencies
window.$ = require('jquery');
window.Bootstrap = require('bootstrap');

