//Imports
const electron = require('electron');
const { remote, ipcRenderer } = electron;
const path = require('path');

//Functionality
function hidePreview()
{
    let previewElement = document.getElementById('preview-image');
    previewElement.style.opacity = '0';

    let previewTextElement = document.getElementById('texture-path');
    previewTextElement.style.opacity = '0';
}

function showPreview()
{
    let previewElement = document.getElementById('preview-image');
    previewElement.style.opacity = '1';

    let previewTextElement = document.getElementById('texture-path');
    previewTextElement.style.opacity = '1';
}

function addTexture( textureName, texturePath )
{
    let textureSelectionElement = document.getElementById('texture-selection');
    let textureOptionNode = document.createElement('option');
    textureOptionNode.value = texturePath;
    textureOptionNode.innerText = textureName;
    textureSelectionElement.appendChild(textureOptionNode);
}

function clearTextureList()
{
    let textureSelectionElement = document.getElementById('texture-selection');
    textureSelectionElement.innerHTML = '';
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
    clearTextureList();
    for ( let texture in textures )
    {
        addTexture( texture, textures[texture] );
    }

    let textureSelectionElement = document.getElementById('texture-selection');
    if ( textureSelectionElement.options.length > 0 )
    {
        textureSelectionElement.value = textureSelectionElement.options[0].value;
        loadPreview(textureSelectionElement.value);
    }
    else
    {
        hidePreview();
    }
}

//Events - Misc.
document.getElementById('website-link').addEventListener('click', function() { remote.shell.openItem('https://m4taiori.io'); });
document.getElementById('preview-image').addEventListener('error', hidePreview);
document.getElementById('texture-selection').addEventListener('change', function () { loadPreview( document.getElementById('texture-selection').value ); } );

//Events - Actions
document.getElementById('btn-add-texture').addEventListener('click', function () { ipcRenderer.send('add-texture'); });
document.getElementById('btn-delete-texture').addEventListener('click', function () { ipcRenderer.send('request-texture-deletion', document.getElementById('texture-selection').value ) } );
document.getElementById('btn-refresh-textures').addEventListener('click', function() { ipcRenderer.send('request-update-texture-list'); });

//Listeners
ipcRenderer.on( 'update-texture-list', function( event, item ) { updateTextureList(item); } );

//Autorun
ipcRenderer.send('request-update-texture-list');

//Import dependencies
window.$ = require('jquery');
window.Bootstrap = require('bootstrap');
