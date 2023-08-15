import { IpcMainEvent } from 'electron'
import { getWebviewSession, url } from '../session'

export default function logout(event: IpcMainEvent): void {
  try {
    const webviewSession = getWebviewSession()
    webviewSession.cookies.remove(url, 'session').then(() => {
      event.reply('session-updated', { user: null })
    })
  } catch (error) {
    console.log('ipcEvents/logout.ts -> error: ', error)
  }
}
