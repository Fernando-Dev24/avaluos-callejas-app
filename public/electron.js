const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const { autoUpdater } = require('electron-updater');

// Global variable
let win;

async function createWindow() {
   win = new BrowserWindow({
      width: 1366,
      height: 768,
      icon: 'public/icon.ico',
      webPreferences: {
         nodeIntegration: true,
         enableRemoteModule: true,
      },
   });

   // win load
   win.loadURL(
      isDev
      ?'http://localhost:3000'
      : url.format({
         pathname: path.join(__dirname, 'index.html'),
         protocol: "file",
         slashes: true
      }),
   );

   // Open the DevTools
   if( isDev ) {
      win.webContents.openDevTools({ mode: 'detach' });
   };

   // Check if there is a new version of Avaluos Callejas App
   if(!isDev) {
      autoUpdater.checkForUpdates();
   };
};

/* 
   This method will be called when Electron is finished initialization and is ready to create browser windows.
   Some API's can only be used after this event occurs.
*/
app.whenReady().then(createWindow());

/* Quit when all windows are closed, except on macOS. There, its common for apps and their menu bar to stay active until user quits expliciy with CMD + Q */
app.on('window-all-closed', () => {
   if(process.platform !== 'darwin'){
      app.quit();
   };
});

app.on('activate', () => {
   if( BrowserWindow.getAllWindows().length === 0 ) {
      createWindow();
   }
});

// AutoUpdater dialogs
autoUpdater.on('update-available', (_event, releaseNotes, releaseName) => {
   const dialogOptions = {
      type: 'info',
      buttons: ["Entendido"],
      title: 'Callejas Avalúos App | Facturación - Actualización',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'La actualización se está descargando, te notificaremos cuando termine'
   };
   dialog.showMessageBox(dialogOptions, ( response ) => {
      // Do something
   });
});

// AutoUpdater downloaded
autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
   const dialogOptions = {
      type: 'info',
      buttons: ["Instalar ahora", "Instalar luego"],
      title: 'Callejas Avalúos App | Facturación - Actualización',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: "La descarga ha terminado. ¿Cúando quieres instalar la actualización?"
   };
   dialog.showMessageBox(dialogOptions).then((returnValue) => {
      if(returnValue.response === 0) autoUpdater.quitAndInstall();
   });
});