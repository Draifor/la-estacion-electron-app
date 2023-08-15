import axios from 'axios'

import { InvoiceType } from '../../../../../types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function updateInvoice(invoice: InvoiceType): Promise<InvoiceType | null> {
  try {
    const { data } = await axios.put(`${SERVER_URL}/invoices`, invoice)
    console.log('main.ts -> editInvoice data: ', data)

    new Notification('Factura modificada con éxito')

    return data

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> editInvoice error.message: ', error.message)
    console.log('main.ts -> editInvoice error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al editar la factura'

    if (error.response.status === 404) {
      message = 'Factura no encontrado'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al editar la factura', message)

    return null
  }
}
