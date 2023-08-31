import fs from 'fs/promises'
import path from 'path'
import { app } from 'electron'
import { MainSessionData } from '../types/session'

const userDataPath = app.getPath('userData')
const sessionFilePath = path.join(userDataPath, 'session.json')

export async function saveSession(sessionData: MainSessionData): Promise<void> {
  try {
    await fs.writeFile(sessionFilePath, JSON.stringify(sessionData))
  } catch (error) {
    console.error('Error saving session:', error)
  }
}

export async function loadSession(): Promise<MainSessionData | null> {
  try {
    const data = await fs.readFile(sessionFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading session:', error)
    return null
  }
}

export async function clearSession(): Promise<void> {
  try {
    await fs.unlink(sessionFilePath)
  } catch (error) {
    console.error('Error clearing session:', error)
  }
}
