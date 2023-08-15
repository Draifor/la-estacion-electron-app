import axios from 'axios'

import { InvoiceType } from '../../../../../types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function createInvoice(invoice: InvoiceType): Promise<InvoiceType | null> {
  try {
    const { data } = await axios.post(`${SERVER_URL}/invoices`, invoice)
    console.log('main.ts -> createInvoice data: ', data)

    new Notification('Factura creada', {
      body: 'La factura se creó correctamente'
    })

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> createInvoice error.message: ', error.message)
    console.log('main.ts -> createInvoice error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al crear la factura'

    if (error.response.status === 404) {
      message = 'Error en el enpoint'
    }

    if (error.response.status === 400 && error.response.data === 'Invoice type not found') {
      message = 'No se encontró el tipo de factura'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al crear la factura', message)

    return null
  }
}
