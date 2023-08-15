import axios from 'axios'

import { IngredientType } from '../../../../../types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function createIngredient(
  ingredient: IngredientType
): Promise<IngredientType | null> {
  try {
    const { data } = await axios.post(`${SERVER_URL}/ingredients`, ingredient)
    console.log('main.ts -> createIngredient data: ', data)

    new Notification('Ingrediente creado', {
      body: 'El ingrediente se creó correctamente'
    })

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> createIngredient error.message: ', error.message)
    console.log('main.ts -> createIngredient error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al crear el ingrediente'

    if (error.response.status === 404) {
      message = 'Error en el enpoint'
    }

    if (error.response.status === 400) {
      message = 'El ingrediente ya existe'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al crear el ingrediente', message)

    return null
  }
}
