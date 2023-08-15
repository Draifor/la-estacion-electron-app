import axios from 'axios'

import { UserType } from '../../../../../types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

export default async function updateUser(user: UserType): Promise<UserType | void> {
  try {
    const { data } = await axios.put(`${SERVER_URL}/users`, user)
    console.log('main.ts -> editUser data: ', data)

    new Notification('Usuario modificado con éxito')

    return data

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> editUser error.message: ', error.message)
    console.log('main.ts -> editUser error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al editar el usuario'

    if (error.response.status === 404) {
      message = 'Usuario no encontrado'
    }

    if (error.response.status === 400 && error.response.data === 'Password is required') {
      message = 'La contraseña es requerida'
    }

    if (error.response.status === 400 && error.response.data === 'Current password is incorrect') {
      message = 'La contraseña actual es incorrecta'
    }

    if (
      error.response.status === 400 &&
      error.response.data === 'Password must be at least 6 characters'
    ) {
      message = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al editar el usuario', message)
  }
}
