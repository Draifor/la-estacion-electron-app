import { useContext } from 'react'

import { SessionContext, SessionContextType } from '../context/SessionContext'

export default function useSessionContext(): SessionContextType {
  return useContext(SessionContext)
}
