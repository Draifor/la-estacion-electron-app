import { NumericFormat } from 'react-number-format'

import useInvoicesContext from '../../hooks/useInvoicesContext'
import deleteInvoice from '../../utils/apiFunctions/invoices/deleteInvoice'
import getInvoices from '../../utils/apiFunctions/invoices/getInvoices'
import { confirmDialog } from '../../utils/showDialog'

import PageContainer from '../PageContainer'
import Button from '../Button'
import SelectDateRange from '../SelectDateRange'
import EditIcon from '../icons/EditIcon'
import DeleteIcon from '../icons/DeleteIcon'
import { Link } from 'react-router-dom'

export default function ShowInvoices(): React.ReactNode {
  const { invoices, setInvoices, setIsEditInvoice, setEditInvoiceId } = useInvoicesContext()

  console.log('invoices', invoices)

  const handleEditInvoice = (invoiceId: number): void => {
    console.log('edit invoice', invoiceId)
    setEditInvoiceId(invoiceId)
    setIsEditInvoice(true)
  }

  const handleDeleteInvoice = async (invoiceId: number): Promise<void> => {
    console.log('delete invoice', invoiceId)

    const confirmDeleteFunction = async (confirmAction: boolean): Promise<void> => {
      if (!confirmAction) return

      const invoiceDeleted = await deleteInvoice(invoiceId)

      if (!invoiceDeleted) return

      window.api.showAlertMessage('info', 'Operación exitosa', 'Proveedor eliminado')

      const updatedInvoice = invoices.filter((invoice) => invoice.id !== invoiceId)
      setInvoices(updatedInvoice)
    }

    confirmDialog('Se eliminará el proveedor\n¿Está seguro?', confirmDeleteFunction)
  }

  const headerTable = [
    { key: 'No', label: 'No.' },
    { key: 'supplier', label: 'Proveedor', className: 'text-left w-32' },
    { key: 'description', label: 'Descripción' },
    { key: 'date', label: 'Fecha Factura', className: 'w-32' },
    { key: 'dueDate', label: 'Fecha Vencimiento', className: 'w-36' },
    { key: 'paymentStatus', label: 'Estado', className: 'w-28' },
    { key: 'totalAmount', label: 'Valor Total', className: 'w-28 text-left' },
    { key: 'paidAmount', label: 'Valor Pagado', className: 'w-28 text-left' },
    {
      key: 'remainingAmount',
      label: 'Valor Pendiente',
      className: 'w-32 text-left'
    },
    { key: 'actions', label: 'Acciones' }
  ]

  // Calculate empty rows to fill the table
  const emptyRows = Math.max(10 - invoices.length, 0)

  return (
    <PageContainer>
      <SelectDateRange fetchFunction={getInvoices} setState={setInvoices} />
      <div className="flex-grow w-full overflow-y-auto h-[70vh]">
        <table className="w-full mt-4 text-gray-900 border border-gray-200 shadow-lg">
          <thead>
            <tr>
              {headerTable.map((column, index) => (
                <th
                  key={column.key}
                  className={`${column.className && column.className} ${
                    !index && 'px-3'
                  } py-2 bg-gray-200 border-b border-gray-200`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr
                key={invoice.id}
                className="bg-white text-center border-b border-gray-200 even:bg-gray-100"
              >
                <td className="font-bold">{index + 1}.</td>
                <td className="px-1 text-left">{invoice.supplier}</td>
                <td className="px-2 text-left">{invoice.description}</td>
                <td className="px-1">{invoice.date}</td>
                <td className="px-1">{invoice.dueDate}</td>
                <td className="px-1">{invoice.paymentStatus}</td>
                <td className="px-1 text-left">
                  <NumericFormat
                    value={invoice.totalAmount}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'$'}
                  />
                </td>
                <td className="px-1 text-left">
                  <NumericFormat
                    value={invoice.paidAmount}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'$'}
                  />
                </td>
                <td className="px-1 text-left">
                  <NumericFormat
                    value={invoice.remainingAmount}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'$'}
                  />
                </td>
                <td className="px-1">
                  <div className="flex justify-around items-center">
                    <Button
                      baseStyle="blue"
                      thickness="thin"
                      onClick={(): void => handleEditInvoice(invoice.id!)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      baseStyle="red"
                      thickness="thin"
                      onClick={(): Promise<void> => handleDeleteInvoice(invoice.id!)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {/* Add empty rows */}
            {Array.from({ length: emptyRows }).map((_, index) => (
              <tr
                key={`empty-row-${index}`}
                className="h-11 bg-white text-center border-b border-gray-200 even:bg-gray-100"
              >
                <td className="font-bold">{invoices.length + index + 1}.</td>
                <td colSpan={headerTable.length - 1}>&nbsp;</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-200">
              <th colSpan={4} className="px-2 py-1 text-center border-b border-gray-200">
                Cantidad de Facturas:
                <span className="font-normal ml-4">{invoices.length}</span>
              </th>
              <th colSpan={2} className="px-1 py-1 text-center border-b border-gray-200">
                Total
              </th>
              <td className="px-1 py-1 border-b border-gray-200 text-left">
                <NumericFormat
                  value={invoices.reduce((total, invoice) => total + invoice.totalAmount, 0)}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'$'}
                />
              </td>
              <td className="px-1 py-1 border-b border-gray-200 text-left">
                <NumericFormat
                  value={invoices.reduce((total, invoice) => total + invoice.paidAmount, 0)}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'$'}
                />
              </td>
              <td className="px-1 py-1 border-b border-gray-200 text-left">
                <NumericFormat
                  value={invoices.reduce((total, invoice) => total + invoice.remainingAmount, 0)}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'$'}
                />
              </td>
              <th colSpan={1} className="px-2 py-1 border-b border-gray-200" />
            </tr>
          </tfoot>
        </table>
      </div>
      <Link to="/invoices/add-invoice" className="mt-3 flex-grow">
        <Button baseStyle="green">Agregar Factura</Button>
      </Link>
    </PageContainer>
  )
}
