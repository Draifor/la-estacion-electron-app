import { useContext } from 'react'

import { UsersContext, UsersContextType } from '../context/UsersContext'

export default function useUsersContext(): UsersContextType {
  return useContext(UsersContext)
}
