import axios from 'axios'

import { SetStateTypes } from '../../../../../types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

type getIngredientProps = {
  setState: SetStateTypes
}

export default async function getIngredients({ setState }: getIngredientProps): Promise<void> {
  try {
    const { data } = await axios.get(`${SERVER_URL}/ingredients`)
    console.log('main.ts -> fetchIngredients data: ', data)

    setState(data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> fetchIngredients error.message: ', error.message)
    console.log('main.ts -> fetchIngredients error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al obtener los ingredientes'

    if (error.response.status === 404) {
      message = 'Error en el enpoint'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al obtener los ingredientes', message)
  }
}
