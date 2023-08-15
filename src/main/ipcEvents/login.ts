import { IpcMainEvent } from 'electron'

import { getWebviewSession, url } from '../session'
import { MainSessionData, RendererSessionData } from '../../types/session'

export default async function handleLogin(
  event: IpcMainEvent,
  user: MainSessionData
): Promise<void> {
  const { username, role, token } = user
  let userData: RendererSessionData = null

  console.log('ipcEvents/login.ts -> url: ', url)

  try {
    const sessionCookies = {
      url,
      name: 'session',
      value: JSON.stringify({ token, username, role })
    }

    const webviewSession = getWebviewSession()
    await webviewSession.cookies.set(sessionCookies)
    userData = { username, role }
  } catch (error) {
    console.log('ipcEvents/login.ts -> error: ', error)
  } finally {
    event.reply('session-updated', { user: userData })
  }
}
