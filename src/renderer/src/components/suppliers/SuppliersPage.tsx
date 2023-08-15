import { useEffect } from 'react'

import useSuppliersContext from '../../hooks/useSuppliersContext'
import getSuppliers from '../../utils/apiFunctions/suppliers/getSuppliers'

import EditSupplier from './EditSupplier'
import ShowSuppliers from './ShowSuppliers'

export default function SuppliersPage(): React.ReactNode {
  const { setSuppliers, isEditSupplier } = useSuppliersContext()

  useEffect(() => {
    getSuppliers({ setSuppliers })
  }, [])

  return <>{isEditSupplier ? <EditSupplier /> : <ShowSuppliers />}</>
}
