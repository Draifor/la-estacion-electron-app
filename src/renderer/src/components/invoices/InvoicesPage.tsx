import { useEffect } from 'react'

import useInvoicesContext from '../../hooks/useInvoicesContext'
import getInvoices from '../../utils/apiFunctions/invoices/getInvoices'

import EditInvoice from './EditInvoice'
import ShowInvoices from './ShowInvoices'

export default function InvoicesPage(): React.ReactNode {
  const { setInvoices, isEditInvoice } = useInvoicesContext()

  useEffect(() => {
    getInvoices({ setState: setInvoices })
  }, [])

  return <>{isEditInvoice ? <EditInvoice /> : <ShowInvoices />}</>
}
