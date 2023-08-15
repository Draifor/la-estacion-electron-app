import axios from 'axios'
import { SupplierType } from 'src/types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function deleteSupplier(supplierId: number): Promise<SupplierType | null> {
  try {
    const { data } = await axios.delete(`${SERVER_URL}/suppliers/${supplierId}`)
    console.log('main.ts -> deleteSupplier data: ', data)

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> deleteSupplier error.message: ', error.message)
    console.log('main.ts -> deleteSupplier error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al eliminar el proveedor'

    if (error.response.status === 400) {
      message = 'Error en el enpoint'
    }

    if (error.response.status === 404) {
      message = 'El proveedor no existe'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    if (
      error.response.data.includes(
        'Cannot delete or update a parent row: a foreign key constraint fail'
      )
    ) {
      message = 'No se puede eliminar el proveedor porque tiene facturas asociadas'
    }

    window.api.showAlertMessage('error', 'Error al eliminar el proveedor', message)
    return null
  }
}
