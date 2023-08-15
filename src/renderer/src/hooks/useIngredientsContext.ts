import { useContext } from 'react'

import { IngredientsContext, IngredientsContextType } from '../context/IngredientsContext'

export default function useIngredientsContext(): IngredientsContextType {
  return useContext(IngredientsContext)
}
