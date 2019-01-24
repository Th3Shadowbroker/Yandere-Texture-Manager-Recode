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

//Imports
const {YTMApplication} = require('./../ts/YTMApplication');
const electron = require('electron');
const { remote, ipcRenderer } = electron;
const path = require('path');

//Functionality
function hidePreview()
{
    let previewElement = document.getElementById('preview-image');
    previewElement.style.opacity = '0';

    let previewPlaceholderElement = document.getElementById('preview-image-placeholder');
    previewPlaceholderElement.style.opacity = '1';

    let previewTextElement = document.getElementById('texture-path');
    previewTextElement.style.opacity = '0';
}

function showPreview()
{
    let previewElement = document.getElementById('preview-image');
    previewElement.style.opacity = '1';

    let previewPlaceholderElement = document.getElementById('preview-image-placeholder');
    previewPlaceholderElement.style.opacity = '0';

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

function openApplyDialog()
{
    let textureSelectionElement = document.getElementById('texture-selection');
    let args = {'fileName': textureSelectionElement.options[textureSelectionElement.selectedIndex].innerText, 'filePath': textureSelectionElement.value};
    ipcRenderer.send('open-apply-texture-dialog', args);
}

//Events - Misc.
document.getElementById('website-link').addEventListener('click', function() { remote.shell.openItem('https://m4taiori.io'); });
document.getElementById('preview-image').addEventListener('error', hidePreview);
document.getElementById('texture-selection').addEventListener('change', function () { loadPreview( document.getElementById('texture-selection').value ); } );

//Events - Actions
document.getElementById('btn-use-texture').addEventListener('click', function () { openApplyDialog(); } );
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
