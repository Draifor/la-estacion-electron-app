import { useContext } from 'react'

import { SuppliersContext, SuppliersContextType } from '../context/SuppliersContext'

export default function useSuppliersContext(): SuppliersContextType {
  return useContext(SuppliersContext)
}
