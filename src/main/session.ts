import { is } from '@electron-toolkit/utils'
import { session } from 'electron'
import { join } from 'node:path'

export const partition = 'persist:webviewsession'

export function getWebviewSession(): Electron.Session {
  return session.fromPartition(partition)
}

// HMR for renderer base on electron-vite cli.
// Load the remote URL for development or the local html file for production.
export const url =
  is.dev && process.env['ELECTRON_RENDERER_URL']
    ? process.env['ELECTRON_RENDERER_URL']
    : `file://${join(__dirname, '../renderer/index.html')}`
