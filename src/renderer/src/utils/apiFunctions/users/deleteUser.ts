import axios from 'axios'
import { UserType } from 'src/types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function deleteUser(userId: number): Promise<UserType | null> {
  try {
    const { data } = await axios.delete(`${SERVER_URL}/users/${userId}`)
    console.log('main.ts -> deleteUser data: ', data)

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> deleteUser error.message: ', error.message)
    console.log('main.ts -> deleteUser error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al eliminar el usuario'

    if (error.response.status === 400) {
      message = 'Error en el enpoint'
    }

    if (error.response.status === 404) {
      message = 'El usuario no existe'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al eliminar el usuario', message)
    return null
  }
}
