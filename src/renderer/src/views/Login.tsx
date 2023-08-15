import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import useSessionContext from '../hooks/useSessionContext'
import handleLogin from '../utils/apiFunctions/userSession'
import { UserLoginType } from '../../../types/databaseModels'

import Card from '../components/Card'
import Alert from '../components/Alert'
import Button from '../components/Button'
import Loading from '../components/Loading'

export default function Login(): React.ReactNode {
  const { user, loading, setLoading } = useSessionContext()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserLoginType>()

  const navigate = useNavigate()

  const labelClassName = 'text-lg font-medium text-gray-600'
  const inputClassName = 'mt-2 p-2 border border-gray-300 bg-white text-gray-600 rounded-md'

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
    /* eslint-disable */
  }, [user])
  /* eslint-enable */

  const onSubmit: SubmitHandler<UserLoginType> = async (data) => {
    const { username, password } = data
    console.log('data', data)
    handleLogin({ username, password, setLoading })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="flex flex-wrap flex-grow content-center h-[90vh]">
      <Card>
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Bienvenido a <span className="text-yellow-500">LA ESTACIÓN</span>
        </h1>
        <p className="text-2xl font-bold text-center text-gray-700 mt-4">Sistema de Inventarios</p>
        <form
          className="space-y-6 border-t border-b border-gray-200 py-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label htmlFor="username" className={labelClassName}>
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              className={inputClassName}
              autoFocus
              {...register('username', { required: true })}
            />
            {errors.username && Alert({ alert: 'Ingresa el nombre', type: 'error' })}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className={labelClassName}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className={inputClassName}
              {...register('password', { required: true })}
            />
            {errors.password && Alert({ alert: 'Ingresa la contraseña', type: 'error' })}
          </div>
          <Button type="submit" className="w-full p-3">
            Iniciar Sesión
          </Button>
        </form>
      </Card>
    </div>
  )
}
