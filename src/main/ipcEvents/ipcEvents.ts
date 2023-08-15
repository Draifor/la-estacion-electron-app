import { BrowserWindow, ipcMain } from 'electron'
import logout from './logout'
import handleLogin from './login'
import getSession from './getSession'
import { showAlertMessage, showConfirmDialog } from '../showDialogs'

export function registerIpcEvents(win: BrowserWindow): void {
  ipcMain.on('get-session', getSession)

  ipcMain.on('login', (event, data) => handleLogin(event, data))

  ipcMain.on('logout', logout)

  ipcMain.on('show-alert', (_event, { type, title, message }) => {
    showAlertMessage(win, type, title, message)
  })

  ipcMain.handle('show-confirm', async (_event, { type, title, buttons, message }) => {
    const result = await showConfirmDialog(win, type, title, buttons, message)
    return result
  })
}
