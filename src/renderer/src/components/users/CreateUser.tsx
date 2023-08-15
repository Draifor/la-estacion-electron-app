import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom'

import { UserType } from '../../../../types/databaseModels'
import createUser from '../../utils/apiFunctions/users/createUser'

import Card from '../Card'
import Button from '../Button'
import Alert from '../Alert'
import PageContainer from '../PageContainer'

const roles = [
  { value: 'user', label: 'Usuario' },
  { value: 'admin', label: 'Administrador' }
]

export default function CreateUser(): React.ReactNode {
  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<UserType>()

  const navigate = useNavigate()

  const labelClassName = 'w-1/5 text-lg font-medium text-gray-600'
  const inputClassName = 'w-3/4 p-2 border border-gray-300 bg-white text-gray-600 rounded-md'

  const onSubmit: SubmitHandler<UserType> = async (data) => {
    const { name, username, phone, role, password } = data

    const newUser = await createUser({ name, username, phone, role, password })

    if (newUser) {
      navigate('/users')
    }
  }

  return (
    <PageContainer>
      <Card>
        <h1 className="text-4xl font-bold text-center text-blue-600">Crear usuario</h1>
        <form
          className="space-y-6 border-t border-b border-gray-200 py-6 text-gray-600"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap">
            <label htmlFor="name" className={labelClassName}>
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className={inputClassName}
              {...register('name', { required: true })}
            />
            {errors.name && Alert({ alert: 'Ingresa el nombre', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="userName" className={labelClassName}>
              Usuario
            </label>
            <input
              type="text"
              id="userName"
              className={inputClassName}
              {...register('username', { required: true })}
            />
            {errors.username && Alert({ alert: 'Ingresa el usuario', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="phone" className={labelClassName}>
              Celular
            </label>
            <Controller
              control={control}
              name="phone"
              rules={{ minLength: 10 }}
              render={({ field: { onChange, value } }): JSX.Element => (
                <PatternFormat
                  format="### ### ####"
                  mask="_"
                  value={value}
                  onValueChange={({ formattedValue }): void => onChange(formattedValue)}
                  className={inputClassName}
                />
              )}
            />
            {errors.phone && Alert({ alert: 'Ingresa el número de celular', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="role" className={labelClassName}>
              Rol
            </label>
            <select
              id="role"
              className={inputClassName + ' cursor-pointer !w-2/5'}
              {...register('role', { required: true })}
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && Alert({ alert: 'Selecciona un rol', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="password" className={labelClassName + ' w-[45%]'}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className={inputClassName + ' !w-1/2'}
              {...register('password', { required: true, minLength: 5 })}
            />
            {errors.password &&
              Alert({
                alert:
                  errors.password.type === 'required'
                    ? 'La contraseña es obligatoria'
                    : errors.password.type === 'minLength'
                    ? 'La contraseña debe tener al menos 6 caracteres'
                    : ''
              })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="confirmPassword" className={labelClassName + ' w-[45%]'}>
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={inputClassName + ' !w-1/2'}
              {...register('confirmPassword', {
                required: true,
                validate: (value) =>
                  value === getValues('password') || 'Las contraseñas no coinciden'
              })}
            />
            {errors.confirmPassword &&
              Alert({ alert: 'Las contraseñas no coinciden', type: 'error' })}
          </div>
          <div className="flex gap-3 justify-center">
            <Button type="submit" baseStyle="green" className="w-64 p-3">
              Crear Usuario
            </Button>
            <Button
              className="w-44 p-3"
              baseStyle="green"
              onClick={(): void => {
                navigate('/users')
              }}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </PageContainer>
  )
}
