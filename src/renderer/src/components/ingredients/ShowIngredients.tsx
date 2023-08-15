import { NumericFormat } from 'react-number-format'

import useIngredientsContext from '../../hooks/useIngredientsContext'
import deleteIngredient from '../../utils/apiFunctions/ingredients/deleteIngredient'
import { confirmDialog } from '../../utils/showDialog'

import PageContainer from '../PageContainer'
import Button from '../Button'
import EditIcon from '../icons/EditIcon'
import DeleteIcon from '../icons/DeleteIcon'
import { Link } from 'react-router-dom'

const units = [
  { value: 'kg', name: 'Kilogramo' },
  { value: 'g', name: 'Gramo' },
  { value: 'l', name: 'Litro' },
  { value: 'ml', name: 'Mililitro' },
  { value: 'un', name: 'Unidad' }
]

export default function ShowIngredients(): React.ReactNode {
  const { ingredients, setIngredients, setIsEditIngredient, setEditIngredientId } =
    useIngredientsContext()

  console.log('ingredients', ingredients)

  const handleEditIngredient = (ingredientId: number): void => {
    console.log('edit ingredient', ingredientId)
    setEditIngredientId(ingredientId)
    setIsEditIngredient(true)
  }

  const handleDeleteIngredient = async (ingredientId: number): Promise<void> => {
    console.log('delete ingredient', ingredientId)

    const confirmDeleteFunction = async (confirmAction: boolean): Promise<void> => {
      if (!confirmAction) return

      const ingredientDeleted = await deleteIngredient(ingredientId)

      if (!ingredientDeleted) return

      window.api.showAlertMessage('info', 'Operación exitosa', 'Ingrediente eliminado')

      const updatedIngredient = ingredients.filter((ingredient) => ingredient.id !== ingredientId)
      setIngredients(updatedIngredient)
    }

    confirmDialog('Se eliminará el ingrediente\n¿Está seguro?', confirmDeleteFunction)
  }

  const headerTable = [
    { key: 'No', label: 'No.' },
    { key: 'name', label: 'Nombre', className: 'text-left w-32' },
    { key: 'description', label: 'Descripción' },
    { key: 'price', label: 'Precio', className: 'w-28 text-left' },
    { key: 'stock', label: 'cantidad', className: 'w-28 text-left' },
    { key: 'actions', label: 'Acciones' }
  ]

  // Calculate empty rows to fill the table
  const emptyRows = Math.max(10 - ingredients.length, 0)

  return (
    <PageContainer>
      <div className="flex-grow w-full overflow-y-auto h-[75vh]">
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
            {ingredients.map((ingredient, index) => (
              <tr
                key={ingredient.id}
                className="bg-white text-center border-b border-gray-200 even:bg-gray-100"
              >
                <td className="font-bold">{index + 1}.</td>
                <td className="px-1 text-left">{ingredient.name}</td>
                <td className="px-2 text-left">{ingredient.description}</td>
                <td className="px-1 text-left">
                  <NumericFormat
                    value={ingredient.price}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'$'}
                  />
                </td>
                <td className="px-1 text-left">
                  <NumericFormat
                    value={ingredient.stock}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                  />
                  <span>{units.find((unit) => unit.value === ingredient.unit)?.name}</span>
                </td>
                <td className="px-1">
                  <div className="flex justify-around items-center">
                    <Button
                      baseStyle="blue"
                      thickness="thin"
                      onClick={(): void => handleEditIngredient(ingredient.id!)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      baseStyle="red"
                      thickness="thin"
                      onClick={(): Promise<void> => handleDeleteIngredient(ingredient.id!)}
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
                <td className="font-bold">{ingredients.length + index + 1}.</td>
                <td colSpan={headerTable.length - 1}>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/ingredients/add-ingredient" className="mt-3 flex-grow">
        <Button baseStyle="green">Agregar Ingrediente</Button>
      </Link>
    </PageContainer>
  )
}
