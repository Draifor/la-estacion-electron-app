import axios from 'axios'

import { SetStateTypes } from '../../../../../types/databaseModels'

const SERVER_URL = 'http://localhost:5000'

type getUserProps = {
  setUsers: SetStateTypes
}

export default async function getUsers({ setUsers }: getUserProps): Promise<void> {
  try {
    const { data } = await axios.get(`${SERVER_URL}/users`)
    console.log('main.ts -> fetchUsers data: ', data)

    setUsers(data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('main.ts -> fetchUsers error.message: ', error.message)
    console.log('main.ts -> fetchUsers error.response.data: ', error.response.data)
    // Validate error response
    let message = 'Error al obtener los usuarios'

    if (error.response.status === 404) {
      message = 'Error en el enpoint'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al obtener los usuarios', message)
  }
}
