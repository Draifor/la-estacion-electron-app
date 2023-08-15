import { IpcMainEvent } from 'electron'
import { RendererSessionData } from '../../types/session'
import { getWebviewSession, url } from '../session'

export default async function getSession(event: IpcMainEvent): Promise<void> {
  let user: RendererSessionData = null
  try {
    const webviewSession = getWebviewSession()
    const sessionCookies = await webviewSession.cookies.get({
      url,
      name: 'session'
    })
    if (sessionCookies.length) {
      const { username, role } = JSON.parse(sessionCookies[0]?.value)
      if (username && role) {
        user = { username, role }
      }
    }
  } catch (error) {
    console.log('main.ts -> get-session error: ', error)
  } finally {
    event.reply('session-updated', { user })
  }
}
