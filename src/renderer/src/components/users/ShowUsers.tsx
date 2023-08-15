import { Link } from 'react-router-dom'

import useUsersContext from '../../hooks/useUsersContext'
import deleteUser from '../../utils/apiFunctions/users/deleteUser'
import { confirmDialog } from '../../utils/showDialog'

import Button from '../Button'
import PageContainer from '../PageContainer'
import EditButton from '../EditButton'
import DeleteButton from '../DeleteButton'

export default function ShowUsers(): React.ReactNode {
  const { users, setUsers, setIsEditUser, setEditUserId } = useUsersContext()

  console.log('users', users)

  const handleEditUser = (userId: number): void => {
    console.log('edit user', userId)
    setEditUserId(userId)
    setIsEditUser(true)
  }

  const handleDeleteUser = async (userId: number): Promise<void> => {
    console.log('delete user', userId)

    if (userId === 1) {
      window.api.showAlertMessage(
        'info',
        'Operación no permitida',
        'No se puede eliminar el usuario administrador'
      )
      return
    }

    const confirmDeleteFunction = async (confirmAction: boolean): Promise<void> => {
      if (!confirmAction) return

      const userDeleted = await deleteUser(userId)

      if (!userDeleted) return

      window.api.showAlertMessage('info', 'Operación exitosa', 'Usuario eliminado')

      const updatedUsers = users.filter((user) => user.id !== userId)
      setUsers(updatedUsers)
    }

    confirmDialog('Se eliminará el usuario\n¿Está seguro?', confirmDeleteFunction)
  }

  const headerTable = [
    { key: 'No', label: 'No.' },
    { key: 'user', label: 'Usuario' },
    { key: 'name', label: 'Nombre' },
    { key: 'cellphone', label: 'Celular' },
    { key: 'role', label: 'Rol' },
    { key: 'actions', label: 'Acciones' }
  ]

  users.sort((a, b) => a.id! - b.id!)

  // Calculate empty rows to fill the table
  const emptyRows = Math.max(10 - users.length, 0)

  return (
    <PageContainer>
      <div className="flex-grow w-full overflow-y-auto h-[75vh]">
        <table className="w-full mt-4 text-gray-900 border border-gray-200 shadow-lg">
          <thead>
            <tr>
              {headerTable.map((column, index) => (
                <th
                  key={column.key}
                  className={`${index && 'px-4'} py-2 bg-gray-200 border-b border-gray-200`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="bg-white text-center border-b border-gray-200 even:bg-gray-100"
              >
                <td className="font-bold">{index + 1}.</td>
                <td className="px-2">{user.username}</td>
                <td className="px-2">{user.name}</td>
                <td className="px-2">{user.phone}</td>
                <td className="px-2">{user.role}</td>
                <td className="flex justify-around px-2">
                  <EditButton
                    onClick={(): void => handleEditUser(user.id!)}
                    disabled={user.id === 1}
                  />
                  <DeleteButton
                    onClick={(): Promise<void> => handleDeleteUser(user.id!)}
                    disabled={user.id === 1}
                  />
                </td>
              </tr>
            ))}
            {Array.from({ length: emptyRows }).map((_, index) => (
              <tr
                key={`empty-row-${index}`}
                className="h-11 bg-white text-center border-b border-gray-200 even:bg-gray-100"
              >
                <td className="font-bold">{users.length + index + 1}.</td>
                <td colSpan={headerTable.length - 1}>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to={'/users/add-user'} className="mt-3">
        <Button baseStyle="green">Agregar Usuario</Button>
      </Link>
    </PageContainer>
  )
}
