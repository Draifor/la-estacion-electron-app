import { useContext } from 'react'

import { InvoicesContext, InvoicesContextType } from '../context/InvoicesContext'

export default function useInvoicesContext(): InvoicesContextType {
  return useContext(InvoicesContext)
}
