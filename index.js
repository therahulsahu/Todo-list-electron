const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const ipcRenderer = electron.ipcRenderer;

const newWindowBtn = document.getElementById('newWindowBtn');
const ulItems = document.getElementById('items');

let subWindow
newWindowBtn.addEventListener('click', () => {
    
    subWindow = new BrowserWindow({
        width:450,
        height: 200,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false
    });

    subWindow.loadFile('subWindow.html');

    subWindow.on('closed', () => win = null);
    
    subWindow.show();
});

ipcRenderer.on('task', (e, arg) => {
    const li = document.createElement('li');
    li.innerHTML = `${arg} <button class="btn btn-danger btn-sm float-right delete">✘</button>`;
    li.className = 'list-group-item';
    ulItems.appendChild(li);
});

ulItems.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        var li = e.target.parentElement;
        if(li.classList.contains('completed-tasks'))
            ulItems.removeChild(li);
        else
            li.classList.add('completed-tasks');
      }
});

// title bar
const navMin = document.getElementById('navMin');
navMin.addEventListener('click', (e) => {
    e.preventDefault();
    BrowserWindow.getFocusedWindow().minimize();
});

const navMax = document.getElementById('navMax');
navMax.addEventListener('click', (e) => {
    e.preventDefault();
    if(BrowserWindow.getFocusedWindow().isMaximized()){
        BrowserWindow.getFocusedWindow().unmaximize();
    }else{
        BrowserWindow.getFocusedWindow().maximize();
    }
});

const navClose = document.getElementById('navClose');
navClose.addEventListener('click', (e) => {
    e.preventDefault();
    BrowserWindow.getFocusedWindow().close();
});
