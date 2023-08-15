import axios from 'axios'

import { MainSessionData, LoginData } from '../../../../types/session'

const SERVER_URL = 'http://localhost:5000'

export default async function handleLogin({
  username,
  password,
  setLoading
}: LoginData): Promise<void> {
  setLoading(true)

  try {
    const { data } = await axios.post(`${SERVER_URL}/login`, {
      username,
      password
    })
    console.log('apiFunctions/user.ts -> login data: ', data)
    const { token, user } = data

    const userData: MainSessionData = { username, role: user.role, token }

    window.electron.ipcRenderer.send('login', userData)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('apiFunctions/user.ts -> login error: ', error.response.data)
    // Validate error response
    let message = 'Login failed'

    if (error.response.status === 401) {
      message = 'La contraseña es incorrecta'
    }

    if (error.response.status === 404) {
      message = 'El usuario no existe'
    }

    if (error.response.status === 500) {
      message = 'Ocurrió un error en el servidor'
    }

    window.api.showAlertMessage('error', 'Error al iniciar sesión', message)

    setLoading(false)
  }
}
