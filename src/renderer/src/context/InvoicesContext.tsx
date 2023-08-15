import { useState, createContext, useMemo } from 'react'

import { InvoiceType } from '../../../types/databaseModels'

export type InvoicesContextType = {
  invoices: InvoiceType[]
  setInvoices: (invoices: InvoiceType[]) => void
  isEditInvoice: boolean
  setIsEditInvoice: (isEditInvoice: boolean) => void
  editInvoiceId: number
  setEditInvoiceId: (editInvoiceId: number) => void
}

export const InvoicesContext = createContext<InvoicesContextType>({
  invoices: [],
  setInvoices: (invoices) => invoices,
  isEditInvoice: false,
  setIsEditInvoice: (isEditInvoice) => isEditInvoice,
  editInvoiceId: 0,
  setEditInvoiceId: (editInvoiceId) => editInvoiceId
})

export default function InvoicesProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  const [invoices, setInvoices] = useState<InvoiceType[]>([])
  const [isEditInvoice, setIsEditInvoice] = useState<boolean>(false)
  const [editInvoiceId, setEditInvoiceId] = useState<number>(0)

  // Memoriza el valor del contexto
  const value = useMemo(
    () => ({
      invoices,
      setInvoices,
      isEditInvoice,
      setIsEditInvoice,
      editInvoiceId,
      setEditInvoiceId
    }),
    [invoices, isEditInvoice, editInvoiceId]
  )

  return <InvoicesContext.Provider value={value}>{children}</InvoicesContext.Provider>
}
