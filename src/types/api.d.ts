// window.electronAPI type
export default interface API {
  showAlertMessage: (
    type: 'info' | 'success' | 'warning' | 'error',
    title: string,
    message: string
  ) => void
  showConfirmDialog: (
    type: 'info' | 'success' | 'warning' | 'error',
    title: string,
    buttons: string[],
    message: string
  ) => Promise<number>
}
