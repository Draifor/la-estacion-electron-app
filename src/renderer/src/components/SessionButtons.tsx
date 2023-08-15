import { useNavigate } from 'react-router-dom'

import useUserContext from '../hooks/useSessionContext'

import Button from './Button'

export default function HandleSession(): React.ReactNode {
  const { user } = useUserContext()
  const navigate = useNavigate()

  const handleLogout = (): void => {
    window.electron.ipcRenderer.send('logout')
    setTimeout(() => {
      navigate('/login')
      new Notification('Se ha cerrado la sesión')
    }, 500)
  }

  return (
    <>
      {user && (
        <div className="flex items-center space-x-4 text-center">
          <p className="text-white font-medium">
            Usuario: <span className="text-yellow-500">{user.username}</span>
          </p>
          <Button className="p-3 min-w-fit" baseStyle="red" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      )}
    </>
  )
}
