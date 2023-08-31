import { IpcMainEvent } from 'electron'
import { clearSession } from '../session'

export default async function logout(event: IpcMainEvent): Promise<void> {
  try {
    await clearSession()

    event.reply('session-updated', { user: null })
  } catch (error) {
    console.log('ipcEvents/logout.ts -> error: ', error)
  }
}
