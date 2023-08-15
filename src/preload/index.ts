import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import API from '../types/api'

// Custom APIs for renderer
const api: API = {
  showAlertMessage: (
    type: 'info' | 'success' | 'warning' | 'error',
    title: string,
    message: string
  ) => {
    electronAPI.ipcRenderer.send('show-alert', { type, title, message })
  },
  showConfirmDialog: async (
    type: 'info' | 'success' | 'warning' | 'error',
    title: string,
    buttons: string[],
    message: string
  ) => {
    const result = await electronAPI.ipcRenderer.invoke('show-confirm', { type, title, buttons, message })
    return result
  }
}
console.log('preload/index.ts -> api: ', api)
console.log('preload/index.ts -> electronAPI: ', electronAPI)
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
