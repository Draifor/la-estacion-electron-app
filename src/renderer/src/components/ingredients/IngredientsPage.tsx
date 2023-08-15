import { useEffect } from 'react'

import useIngredientsContext from '../../hooks/useIngredientsContext'
import getIngredients from '../../utils/apiFunctions/ingredients/getIngredients'

import EditIngredient from './EditIngredient'
import ShowIngredients from './ShowIngredients'

export default function IngredientsPage(): React.ReactNode {
  const { setIngredients, isEditIngredient } = useIngredientsContext()

  useEffect(() => {
    getIngredients({ setState: setIngredients })
  }, [])

  return <>{isEditIngredient ? <EditIngredient /> : <ShowIngredients />}</>
}
