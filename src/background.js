import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { app, BrowserWindow, ipcMain, Tray, Menu, screen } from 'electron'

const path = require('path')
const iconPath = path.join(__static, 'icon.png')

let mainWindow
let tray
let remindWindow

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    frame: false,
    resizable: false,
    width: 800,
    height: 600,
    icon: iconPath,
    webPreferences:{
      backgroundThrottling: false,
      nodeIntegration:true,
      contextIsolation: false
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/main.html')
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL(`file://${__dirname}/main.html`)
  }
  mainWindow.removeMenu()
  setTray ()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

ipcMain.on('mainWindow:close', () => {
  mainWindow.hide()
})

ipcMain.on('remindWindow:close', () => {
  remindWindow.close()
})

ipcMain.on('setTaskTimer', (event, time, task) => {
  const now = new Date()
  const date = new Date()
  date.setHours(time.slice(0,2), time.slice(3),0)
  const timeout = date.getTime() - now.getTime()
  setTimeout(() => {
    createRemindWindow(task)
  }, timeout)
})

function setTray () {
  tray = new Tray(iconPath)
  tray.setToolTip('Tasky')
  tray.on('click', () => {
    if(mainWindow.isVisible()){
      mainWindow.hide()
    }else{
      mainWindow.show()
    }
  })
  tray.on('right-click', () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ])
    tray.popUpContextMenu(menuConfig)
  })

}

function createRemindWindow (task) {
  if(remindWindow) remindWindow.close()
  remindWindow = new BrowserWindow({
    height: 450,
    width: 360,
    resizable: false,
    frame: false,
    icon: iconPath,
    show: false,
    webPreferences:{
      nodeIntegration:true,
      contextIsolation: false,
    }
  })
  remindWindow.removeMenu()

  const size = screen.getPrimaryDisplay().workAreaSize
  const { y } = tray.getBounds()
  const { height, width } = remindWindow.getBounds()
  const yPosition = process.platform === 'darwin' ? y : y - height
  remindWindow.setBounds({
    x: size.width - width,
    y: yPosition,
    height,
    width 
  })

  remindWindow.setAlwaysOnTop(true)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    remindWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/remind.html')
  } else {
    createProtocol('app')
    remindWindow.loadURL(`file://${__dirname}/remind.html`)
  }
  
  remindWindow.webContents.on('did-finish-load', () => {
    remindWindow.webContents.send('setTask', task)
  })

  remindWindow.show()
  remindWindow.on('closed', () => { remindWindow = null })
  setTimeout( () => {
    remindWindow && remindWindow.close()
  }, 50 * 1000)
}

