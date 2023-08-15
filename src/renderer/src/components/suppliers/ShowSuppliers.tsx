import { Link } from 'react-router-dom'

import useSuppliersContext from '../../hooks/useSuppliersContext'
import deleteSupplier from '../../utils/apiFunctions/suppliers/deleteSupplier'
import { confirmDialog } from '../../utils/showDialog'

import Button from '../Button'
import PageContainer from '../PageContainer'
import EditIcon from '../icons/EditIcon'
import DeleteIcon from '../icons/DeleteIcon'

export default function ShowSuppliers(): React.ReactNode {
  const { suppliers, setSuppliers, setIsEditSupplier, setEditSupplierId } = useSuppliersContext()

  console.log('suppliers', suppliers)

  const handleEditSupplier = (supplierId: number): void => {
    console.log('edit supplier', supplierId)
    setEditSupplierId(supplierId)
    setIsEditSupplier(true)
  }

  const handleDeleteSupplier = async (supplierId: number): Promise<void> => {
    console.log('delete supplier', supplierId)

    const confirmDeleteFunction = async (confirmAction: boolean): Promise<void> => {
      if (!confirmAction) return

      const supplierDeleted = await deleteSupplier(supplierId)

      if (!supplierDeleted) return

      window.api.showAlertMessage('info', 'Operación exitosa', 'Proveedor eliminado')

      const updatedSupplier = suppliers.filter((supplier) => supplier.id !== supplierId)
      setSuppliers(updatedSupplier)
    }

    confirmDialog('Se eliminará el proveedor\n¿Está seguro?', confirmDeleteFunction)
  }

  const headerTable = [
    { key: 'No', label: 'No.' },
    { key: 'supplier', label: 'Proveedor' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'address', label: 'Dirección' },
    { key: 'type', label: 'Tipo' },
    { key: 'actions', label: 'Acciones' }
  ]

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  suppliers.sort((a, b) => a.id! - b.id!)

  // Calculate empty rows to fill the table
  const emptyRows = Math.max(10 - suppliers.length, 0)

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
            {suppliers.map((supplier, index) => (
              <tr
                key={supplier.id}
                className="bg-white text-center border-b border-gray-200 even:bg-gray-100"
              >
                <td className="font-bold">{index + 1}.</td>
                <td className="px-2">{supplier.name}</td>
                <td className="px-2">{supplier.phone}</td>
                <td className="px-2">{supplier.address}</td>
                <td className="px-2">{supplier.type}</td>
                <td className="flex justify-around px-2">
                  <Button
                    baseStyle="blue"
                    thickness="thin"
                    onClick={(): void => handleEditSupplier(supplier.id!)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    baseStyle="red"
                    thickness="thin"
                    onClick={(): Promise<void> => handleDeleteSupplier(supplier.id!)}
                  >
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
            {/* Add empty rows */}
            {Array.from({ length: emptyRows }).map((_, index) => (
              <tr
                key={`empty-row-${index}`}
                className="h-11 bg-white text-center border-b border-gray-200 even:bg-gray-100"
              >
                <td className="font-bold">{suppliers.length + index + 1}.</td>
                <td colSpan={headerTable.length - 1}>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to={'/suppliers/add-supplier'} className="mt-3">
        <Button baseStyle="green">Agregar Proveedor</Button>
      </Link>
    </PageContainer>
  )
}
