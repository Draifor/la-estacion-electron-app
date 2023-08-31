import { IpcMainEvent } from 'electron'
import { loadSession } from '../session'

export default async function getSession(event: IpcMainEvent): Promise<void> {
  try {
    const sessionData = await loadSession()
    if (!sessionData) throw new Error('No session data found')

    const { username, role } = sessionData
    event.reply('session-updated', { user: { username, role } })
  } catch (error) {
    console.log('getSession error:', error)
    event.reply('session-updated', { user: null })
  }
}
