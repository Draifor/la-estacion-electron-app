import React, { useState, createContext, useMemo, useEffect } from 'react'

import { RendererSessionData } from '../../../types/session'
import { IpcRendererEvent } from 'electron'

export type SessionContextType = {
  user: RendererSessionData
  setUser: (user: RendererSessionData) => void
  isAdministrator: boolean
  setAdministrator?: (isAdministrator: boolean) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const SessionContext = createContext<SessionContextType>({
  user: null,
  setUser: (user) => user,
  loading: true,
  setLoading: (loading) => loading,
  isAdministrator: false,
  setAdministrator: (isAdministrator) => isAdministrator
})

export default function SessionProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  const [user, setUser] = useState<RendererSessionData>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isAdministrator, setIsAdministrator] = useState<boolean>(false)

  const handleSessionUpdated = (
    _event: IpcRendererEvent,
    session: { user: RendererSessionData }
  ): void => {
    console.log('session: ', session)
    setUser(session.user)
    setIsAdministrator(session.user?.role === 'admin')
    setLoading(false)
  }

  useEffect(() => {
    window.electron.ipcRenderer.send('get-session')
    console.log('session-updated --> Create')
    window.electron.ipcRenderer.on('session-updated', handleSessionUpdated)

    return () => {
      window.electron.ipcRenderer.removeListener('session-updated', handleSessionUpdated)
      console.log('session-updated --> Remove')
    }
  }, [])

  // Memoriza el valor del contexto
  const value = useMemo(
    () => ({ user, setUser, loading, setLoading, isAdministrator }),
    [user, loading, isAdministrator]
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
