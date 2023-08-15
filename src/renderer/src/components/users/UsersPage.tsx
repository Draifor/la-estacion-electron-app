import { useEffect } from 'react'

import useUsersContext from '../../hooks/useUsersContext'
import getUsers from '../../utils/apiFunctions/users/getUsers'

import EditUser from './EditUser'
import ShowUsers from './ShowUsers'

export default function UsersPage(): React.ReactNode {
  const { setUsers, isEditUser } = useUsersContext()

  useEffect(() => {
    getUsers({ setUsers })
  }, [])

  return <>{isEditUser ? <EditUser /> : <ShowUsers />}</>
}
