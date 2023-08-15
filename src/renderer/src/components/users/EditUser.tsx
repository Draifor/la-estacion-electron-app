import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { useState } from 'react'

import useUsersContext from '../../hooks/useUsersContext'
import { UserType } from '../../../../types/databaseModels'
import updateUser from '../../utils/apiFunctions/users/updateUser'
import { confirmDialog } from '../../utils/showDialog'

import PageContainer from '../PageContainer'
import Card from '../Card'
import Button from '../Button'
import Alert from '../Alert'

type Role = { value: string; label: string }

const roles: Role[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'user', label: 'Usuario' }
]

export default function EditUser(): React.ReactNode {
  const { users, setUsers, setIsEditUser, editUserId } = useUsersContext()
  const editUser = users.find((user) => user.id === editUserId)
  console.log('edit user', editUser)
  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<UserType>({ defaultValues: editUser })
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false)

  const labelClassName = 'w-1/5 mt-1 text-lg font-medium text-gray-600'
  const inputClassName = 'w-3/4 p-2 border border-gray-300 bg-white text-gray-600 rounded-md'

  const onSubmit: SubmitHandler<UserType> = async (data) => {
    console.log('data', data)
    if (editUserId === 1) {
      window.api.showAlertMessage(
        'info',
        'Operación no permitida',
        'No se puede editar el usuario administrador'
      )
      return
    }

    const handleUpdateUser = async (confirmAction: boolean): Promise<void> => {
      if (!confirmAction) return

      const { name, username, phone, role, password } = data

      const updatedUser = await updateUser({
        id: editUserId,
        name,
        username,
        phone,
        role,
        password,
        isChangingPassword
      })

      if (!updatedUser) return

      const updatedUsers = users.map((user) => {
        if (user.id === editUserId) {
          return updatedUser
        }
        return user
      })
      setUsers(updatedUsers)
      setIsEditUser(false)
    }

    confirmDialog('Se actualizará el usuario\n¿Está seguro?', handleUpdateUser)
  }

  return (
    <PageContainer>
      <Card>
        <h1 className="text-4xl font-bold text-center text-blue-600">Editar usuario</h1>
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
            {errors.username && Alert({ alert: 'Ingresa el nombre de usuario', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="phone" className={labelClassName}>
              Celular
            </label>
            <Controller
              control={control}
              name="phone"
              rules={{
                validate: (value) => (value?.includes('_') ? false : true)
              }}
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
            {errors.phone && Alert({ alert: 'Ingresa un número válido', type: 'error' })}
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
          {isChangingPassword ? (
            <>
              <div className="flex flex-wrap">
                <label htmlFor="password" className={labelClassName + ' w-2/5'}>
                  Nueva Contraseña
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
                <label htmlFor="confirmPassword" className={labelClassName + ' w-2/5'}>
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
            </>
          ) : (
            <Button
              className="w-80 block !mt-10 mx-auto p-3"
              baseStyle="green"
              onClick={(): void => {
                setIsChangingPassword(true)
              }}
            >
              Cambiar contraseña
            </Button>
          )}

          <div className="flex justify-center gap-3">
            <Button type="submit" baseStyle="green" className="w-48 p-3 px-14">
              Guardar Cambios
            </Button>
            <Button
              className="w-40 p-3 px-16"
              baseStyle="green"
              onClick={(): void => {
                setIsEditUser(false)
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
