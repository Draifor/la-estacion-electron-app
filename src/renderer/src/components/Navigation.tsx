import { Link } from 'react-router-dom'

import DropdownMenu from './DropdownMenu'
import SessionButtons from './SessionButtons'
import useUserContext from '../hooks/useSessionContext'

export default function Navigation(): React.ReactNode {
  const { user } = useUserContext()

  const menuDropdownItems = [
    {
      firstLabel: 'Proveedores',
      items: [
        {
          label: 'Ver Proveedores',
          link: '/suppliers'
        },
        {
          label: 'Agregar Proveedor',
          link: 'suppliers/add-supplier'
        }
      ]
    },
    {
      firstLabel: 'Facturas',
      items: [
        {
          label: 'Ver Facturas',
          link: '/invoices'
        },
        {
          label: 'Agregar Factura',
          link: 'invoices/add-invoice'
        }
      ]
    },
    {
      firstLabel: 'Ingredientes',
      items: [
        {
          label: 'Ver Ingredientes',
          link: '/ingredients'
        },
        {
          label: 'Agregar Ingrediente',
          link: 'ingredients/add-ingredient'
        }
      ]
    },
    {
      firstLabel: 'Ventas',
      items: [
        {
          label: 'Ver Ventas',
          link: '/sales'
        },
        {
          label: 'Agregar Venta',
          link: 'sales/add-sale'
        }
      ]
    },
    {
      firstLabel: 'Usuarios',
      isAdmin: true,
      items: [
        {
          label: 'Ver Usuarios',
          link: '/users'
        },
        {
          label: 'Agregar Usuario',
          link: 'users/add-user'
        }
      ]
    }
  ]

  return (
    <nav className="bg-gray-700 h-16">
      <div className="container mx-auto px-4 w-[90vw] max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-lg">
              LA ESTACIÓN
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/dashboard"
                  className="text-white tex hover:text-yellow-500 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              {menuDropdownItems.map((item) => (
                <li key={item.firstLabel} className="text-center m-0">
                  <DropdownMenu
                    title={item.firstLabel}
                    items={item.items}
                    className="text-white tex hover:text-yellow-500 transition-colors"
                    isVisible={item.isAdmin ? user?.role === 'admin' : true}
                  />
                </li>
              ))}
            </ul>
          </div>
          <SessionButtons />
        </div>
      </div>
    </nav>
  )
}
