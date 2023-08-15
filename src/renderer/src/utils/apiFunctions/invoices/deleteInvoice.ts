import axios from 'axios'
import { InvoiceType } from 'src/types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function deleteInvoice(invoiceId: number): Promise<InvoiceType | null> {
  try {
    const { data } = await axios.delete(`${SERVER_URL}/invoices/${invoiceId}`)
    console.log('main.ts -> deleteInvoice data: ', data)

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> deleteInvoice error.message: ', error.message)
    console.log('main.ts -> deleteInvoice error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al eliminar la factura'

    if (error.response.status === 400) {
      message = 'Error en el enpoint'
    }

    if (error.response.status === 404) {
      message = 'La factura no existe'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al eliminar la factura', message)

    return null
  }
}
