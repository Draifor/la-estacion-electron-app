import { BrowserWindow, dialog } from 'electron'

export function showAlertMessage(
  win: BrowserWindow,
  type: 'none' | 'info' | 'error' | 'question' | 'warning' | undefined,
  title: string,
  message: string
): void {
  dialog.showMessageBox(win, {
    type,
    title,
    message
  })
}

export async function showConfirmDialog(
  win: BrowserWindow,
  type: 'none' | 'info' | 'error' | 'question' | 'warning' | undefined,
  title: string,
  buttons: string[],
  message: string
): Promise<number> {
  const result = await dialog.showMessageBox(win, {
    type,
    title,
    message,
    buttons: buttons,
    defaultId: 0,
    cancelId: 1
  })
  // Devuelve la respuesta del usuario (0 para Sí, 1 para No)
  return result.response
}
