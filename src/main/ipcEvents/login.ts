import { IpcMainEvent } from 'electron'

import { MainSessionData, RendererSessionData } from '../../types/session'
import { saveSession } from '../session'

export default async function handleLogin(
  event: IpcMainEvent,
  user: MainSessionData
): Promise<void> {
  const { username, role, token } = user
  let userData: RendererSessionData = null

  try {
    const sessionData = { username, role, token }

    await saveSession(sessionData)

    userData = { username, role }
  } catch (error) {
    console.log('ipcEvents/login.ts -> error: ', error)
  } finally {
    event.reply('session-updated', { user: userData })
  }
}
