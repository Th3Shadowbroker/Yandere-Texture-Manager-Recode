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

