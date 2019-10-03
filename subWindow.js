const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;

const textInput = document.getElementById('textInput');
const submitBtn = document.getElementById('submitBtn');
const closeBtn = document.getElementById('closeBtn');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(textInput.value == ''){
        return;
    }
    ipcRenderer.send('task', textInput.value);
    textInput.value = '';
});

closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    BrowserWindow.getFocusedWindow().close();
});