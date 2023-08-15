export function alertDialog(message: string): void {
  window.api.showAlertMessage('info', 'Alerta', message)
}

export function confirmDialog(message: string, callback: (value: boolean) => void): void {
  window.api.showConfirmDialog('info', 'Confirmación', ['Sí', 'No'], message).then((value) => {
    callback(value === 0)
  })
}
