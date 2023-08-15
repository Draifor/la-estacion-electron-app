import { useState, createContext, useMemo } from 'react'

import { UserType } from '../../../types/databaseModels'

export type UsersContextType = {
  users: UserType[]
  setUsers: (users: UserType[]) => void
  isEditUser: boolean
  setIsEditUser: (isEditUser: boolean) => void
  editUserId: number
  setEditUserId: (editUserId: number) => void
}

export const UsersContext = createContext<UsersContextType>({
  users: [],
  setUsers: (users) => users,
  isEditUser: false,
  setIsEditUser: (isEditUser) => isEditUser,
  editUserId: 0,
  setEditUserId: (editUser) => editUser
})

export default function UsersProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  const [users, setUsers] = useState<UserType[]>([])
  const [isEditUser, setIsEditUser] = useState<boolean>(false)
  const [editUserId, setEditUserId] = useState<number>(0)

  // Memoriza el valor del contexto
  const value = useMemo(
    () => ({
      users,
      setUsers,
      isEditUser,
      setIsEditUser,
      editUserId,
      setEditUserId
    }),
    [users, isEditUser, editUserId]
  )

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}
