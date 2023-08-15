import axios from 'axios'

import { SupplierType } from '../../../../../types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function updateSupplier(supplier: SupplierType): Promise<SupplierType | null> {
  try {
    const { data } = await axios.put(`${SERVER_URL}/suppliers`, supplier)
    console.log('main.ts -> editSupplier data: ', data)

    new Notification('Proveedor modificado con éxito')

    return data

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> editSupplier error.message: ', error.message)
    console.log('main.ts -> editSupplier error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al editar el proveedor'

    if (error.response.status === 404) {
      message = 'Proveedor no encontrado'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al editar el proveedor', message)

    return null
  }
}
