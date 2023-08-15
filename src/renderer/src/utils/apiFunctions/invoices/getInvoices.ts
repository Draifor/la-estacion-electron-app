import axios from 'axios'

import { DataFetchingOptions } from '../../../../../types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function getInvoices({
  from,
  to,
  setState
}: DataFetchingOptions): Promise<void> {
  try {
    if (!from && !to) {
      const actualDate = new Date()

      actualDate.setHours(0, 0, 0, 0)

      from = actualDate.toISOString().slice(0, 10)
      to = from
    }

    console.log('main.ts -> fetchInvoices from: ', from)
    console.log('main.ts -> fetchInvoices to: ', to)

    const { data } = await axios.get(`${SERVER_URL}/invoices/${from}/${to}`)
    console.log('main.ts -> fetchInvoices data: ', data)

    setState(data)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> fetchInvoices error.message: ', error.message)
    console.log('main.ts -> fetchInvoices error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al obtener las facturas'

    if (error.response.status === 404) {
      message = 'Error en el enpoint'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al obtener las facturas', message)
  }
}
