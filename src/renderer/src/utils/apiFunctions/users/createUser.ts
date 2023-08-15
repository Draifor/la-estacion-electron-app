import axios from 'axios'

import { UserType } from '../../../../../types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function createUser(user: UserType): Promise<UserType | null> {
  try {
    const { data } = await axios.post(`${SERVER_URL}/users`, user)
    console.log('main.ts -> createUser data: ', data)

    window.api.showAlertMessage('info', 'Usuario creado', 'El usuario se creó correctamente')

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> createUser error.message: ', error.message)
    console.log('main.ts -> createUser error.respponse.data: ', error.response.data)
    // Validate error response
    let message = 'Error al crear el usuario'

    if (error.response.status === 404) {
      message = 'Error en el enpoint'
    }

    if (error.response.status === 400) {
      message = 'El usuario ya existe'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al crear el usuario', message)

    return null
  }
}
