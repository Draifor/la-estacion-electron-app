import axios from 'axios'

import { IngredientType } from '../../../../../types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function updateIngredient(
  ingredient: IngredientType
): Promise<IngredientType | null> {
  try {
    const { data } = await axios.put(`${SERVER_URL}/ingredients`, ingredient)
    console.log('main.ts -> editIngredient data: ', data)

    new Notification('Ingrediente modificado con éxito')

    return data

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> editIngredient error.message: ', error.message)
    console.log('main.ts -> editIngredient error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al editar el ingrediente'

    if (error.response.status === 404) {
      message = 'Ingrediente no encontrado'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al editar el ingrediente', message)

    return null
  }
}
