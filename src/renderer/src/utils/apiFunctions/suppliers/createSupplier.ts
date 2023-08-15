import axios from 'axios'

import { SupplierType } from '../../../../../types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function createSupplier(supplier: SupplierType): Promise<SupplierType | null> {
  try {
    const { data } = await axios.post(`${SERVER_URL}/suppliers`, supplier)
    console.log('main.ts -> createSupplier data: ', data)

    window.api.showAlertMessage('info', 'Proveedor creado', 'El proveedor se creó correctamente')

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> createSupplier error.message: ', error.message)
    console.log('main.ts -> createSupplier error.respponse.data: ', error.response.data)
    // Validate error response
    let message = 'Error al crear el proveedor'

    if (error.response.status === 404) {
      message = 'Error en el enpoint'
    }

    if (error.response.status === 400 && error.response.data === 'Supplier type not found') {
      message = 'No se encontró el tipo de proveedor'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al crear el proveedor', message)

    return null
  }
}
