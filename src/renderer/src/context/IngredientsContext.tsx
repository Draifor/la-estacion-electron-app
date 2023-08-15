import { useState, createContext, useMemo } from 'react'

import { IngredientType } from '../../../types/databaseModels'

export type IngredientsContextType = {
  ingredients: IngredientType[]
  setIngredients: (ingredients: IngredientType[]) => void
  isEditIngredient: boolean
  setIsEditIngredient: (isEditIngredient: boolean) => void
  editIngredientId: number
  setEditIngredientId: (editIngredientId: number) => void
}

export const IngredientsContext = createContext<IngredientsContextType>({
  ingredients: [],
  setIngredients: (ingredients) => ingredients,
  isEditIngredient: false,
  setIsEditIngredient: (isEditIngredient) => isEditIngredient,
  editIngredientId: 0,
  setEditIngredientId: (editIngredient) => editIngredient
})

export default function IngredientsProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  const [ingredients, setIngredients] = useState<IngredientType[]>([])
  const [isEditIngredient, setIsEditIngredient] = useState<boolean>(false)
  const [editIngredientId, setEditIngredientId] = useState<number>(0)

  // Memoriza el valor del contexto
  const value = useMemo(
    () => ({
      ingredients,
      setIngredients,
      isEditIngredient,
      setIsEditIngredient,
      editIngredientId,
      setEditIngredientId
    }),
    [ingredients, isEditIngredient, editIngredientId]
  )

  return <IngredientsContext.Provider value={value}>{children}</IngredientsContext.Provider>
}
