import axios from 'axios'
import { IngredientType } from 'src/types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function deleteIngredient(
  ingredientId: number
): Promise<IngredientType | null> {
  try {
    const { data } = await axios.delete(`${SERVER_URL}/ingredients/${ingredientId}`)
    console.log('main.ts -> deleteIngredient data: ', data)

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> deleteIngredient error.message: ', error.message)
    console.log('main.ts -> deleteIngredient error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al eliminar el ingrediente'

    if (error.response.status === 400) {
      message = 'Error en el enpoint'
    }

    if (error.response.status === 404) {
      message = 'El ingrediente no existe'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    if (
      error.response.data.includes(
        'Cannot delete or update a parent row: a foreign key constraint fail'
      )
    ) {
      message = 'No se puede eliminar el ingrediente porque hace parte de algunas mezclas'
    }

    window.api.showAlertMessage('error', 'Error al eliminar el ingrediente', message)
    return null
  }
}
