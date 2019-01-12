//Imports
const electron = require('electron');
const { remote, ipcRenderer } = electron;
const path = require('path');

//Functionality
function hidePreview()
{
    let previewElement = document.getElementById('preview-image');
    previewElement.style.opacity = '0';
}

function showPreview()
{
    let previewElement = document.getElementById('preview-image');
    previewElement.style.opacity = '1';
}

function addTexture( textureName, texturePath )
{
    let textureSelectionElement = document.getElementById('texture-selection');
    let textureOptionNode = document.createElement('option');
    textureOptionNode.value = texturePath;
    textureOptionNode.innerText = textureName;
    textureSelectionElement.appendChild(textureOptionNode);
}

function loadPreview( texturePath )
{
    showPreview();
    let previewElement = document.getElementById('preview-image');
    previewElement.setAttribute('src', texturePath);
    document.getElementById('texture-path').innerText = path.basename(texturePath);
}

function updateTextureList( textures )
{
    for ( let texture in textures )
    {
        addTexture( texture, textures[texture] );
    }
}

//Events
document.getElementById('website-link').addEventListener('click', function() { remote.shell.openItem('https://m4taiori.io'); });
document.getElementById('preview-image').addEventListener('error', hidePreview);
document.getElementById('texture-selection').addEventListener('change', function () { loadPreview( document.getElementById('texture-selection').value ); } );

//Listeners
ipcRenderer.on( 'update-texture-list', function( event, item ) { updateTextureList(item); } );

//Autorun
ipcRenderer.send('request-update-texture-list');
