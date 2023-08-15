import { ElectronAPI } from '@electron-toolkit/preload'
import API from '../types/api'

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
