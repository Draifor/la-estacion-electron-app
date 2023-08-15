import { useState, createContext, useMemo } from 'react'

import { SupplierType } from '../../../types/databaseModels'

export type SuppliersContextType = {
  suppliers: SupplierType[]
  setSuppliers: (suppliers: SupplierType[]) => void
  isEditSupplier: boolean
  setIsEditSupplier: (isEditSupplier: boolean) => void
  editSupplierId: number
  setEditSupplierId: (editSupplierId: number) => void
}

export const SuppliersContext = createContext<SuppliersContextType>({
  suppliers: [],
  setSuppliers: (suppliers) => suppliers,
  isEditSupplier: false,
  setIsEditSupplier: (isEditSupplier) => isEditSupplier,
  editSupplierId: 0,
  setEditSupplierId: (editSupplierId) => editSupplierId
})

export default function SuppliersProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  const [suppliers, setSuppliers] = useState<SupplierType[]>([])
  const [isEditSupplier, setIsEditSupplier] = useState<boolean>(false)
  const [editSupplierId, setEditSupplierId] = useState<number>(0)

  // Memoriza el valor del contexto
  const value = useMemo(
    () => ({
      suppliers,
      setSuppliers,
      isEditSupplier,
      setIsEditSupplier,
      editSupplierId,
      setEditSupplierId
    }),
    [suppliers, isEditSupplier, editSupplierId]
  )

  return <SuppliersContext.Provider value={value}>{children}</SuppliersContext.Provider>
}
