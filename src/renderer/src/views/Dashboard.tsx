import { Link } from 'react-router-dom'

import Card from '../components/Card'
import ImageIcon from '../components/icons/ImageIcon'
import PlusIcon from '../components/icons/PlusIcon'
import UserIcon from '../components/icons/UserIcon'
import Loading from '../components/Loading'
import useUserContext from '../hooks/useSessionContext'

export default function Dashboard(): React.ReactNode {
  const { user, loading } = useUserContext()

  const firstSquareItems = [
    {
      name: 'Ver Proveedores',
      link: '/suppliers',
      icon: <ImageIcon />
    },
    {
      name: 'Agregar Proveedor',
      link: '/suppliers/add-supplier',
      icon: <PlusIcon />
    },
    {
      name: 'Ver Facturas',
      link: '/invoices',
      icon: <ImageIcon />
    },
    {
      name: 'Agregar Factura',
      link: '/invoices/add-invoice',
      icon: <PlusIcon />
    }
  ]

  const secondSquareItems = [
    {
      name: 'Ver Ingredientes',
      link: '/ingredients',
      icon: <ImageIcon />
    },
    {
      name: 'Agregar Ingrediente',
      link: '/ingredients/add-ingredient',
      icon: <PlusIcon />
    },
    {
      name: 'Ver Ventas',
      link: '/sales',
      icon: <ImageIcon />
    },
    {
      name: 'Agregar Venta',
      link: '/sales/add-sale',
      icon: <PlusIcon />
    }
  ]

  const adminMenuItems = [
    // {
    //   name: 'Generar Reporte',
    //   link: '/reports/generate-report',
    //   icon: <PlusIcon />
    // },
    { name: 'Ver Usuarios', link: '/users', icon: <UserIcon /> },
    { name: 'Agregar Usuario', link: '/users/add-user', icon: <PlusIcon /> }
  ]

  // Ver un indicador de carga mientras se está obteniendo la sesión del usuario
  if (loading) {
    return <Loading />
  }

  return (
    <Card>
      <h1 className="text-4xl font-bold text-center text-blue-600">
        Bienvenido a <span className="text-yellow-500">LA ESTACIÓN</span>
      </h1>
      <p className="text-2xl font-bold text-center text-gray-700 mt-4">Hola, {user?.username}</p>
      <div className="grid gap-3 grid-cols-2 grid-rows-3">
        <div className="w-56">
          <ul className="space-y-4 border-t border-b border-gray-200 py-6">
            {firstSquareItems.map((item) => (
              <li key={item.link} className="flex items-center">
                <Link
                  to={item.link}
                  className="flex items-center space-x-4 w-full p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium rounded-md"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-56">
          <ul className="space-y-4 border-t border-b border-gray-200 py-6">
            {secondSquareItems.map((item) => (
              <li key={item.link} className="flex items-center">
                <Link
                  to={item.link}
                  className="flex items-center space-x-4 w-full p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium rounded-md"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ul className="space-y-4 border-t border-b border-gray-200 py-6">
          {user?.role === 'admin' &&
            adminMenuItems.map((item) => (
              <li key={item.link} className="flex items-center">
                <a
                  href={item.link}
                  className="flex items-center space-x-4 w-full p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium rounded-md"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </Card>
  )
}
