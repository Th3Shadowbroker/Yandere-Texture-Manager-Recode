import {app, dialog} from 'electron';
import {YTMApplication} from "./ts/YTMApplication";

let ytmApp;
app.on('ready', initialize);
function initialize()
{
    ytmApp = new YTMApplication();
}
