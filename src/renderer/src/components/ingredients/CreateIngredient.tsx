import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom'

import { IngredientType } from '../../../../types/databaseModels'
import createIngredient from '../../utils/apiFunctions/ingredients/createIngredient'

import Card from '../Card'
import Button from '../Button'
import Alert from '../Alert'
import PageContainer from '../PageContainer'

const units = [
  { id: 1, value: 'kg', name: 'Kilogramo' },
  { id: 2, value: 'g', name: 'Gramo' },
  { id: 3, value: 'l', name: 'Litro' },
  { id: 4, value: 'ml', name: 'Mililitro' },
  { id: 5, value: 'un', name: 'Unidad' }
]

export default function CreateIngredient(): React.ReactNode {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IngredientType>()

  const navigate = useNavigate()

  const labelClassName = 'w-[28%] mt-1 text-lg font-medium text-gray-600 '
  const inputClassName = 'w-[65%] p-2 border border-gray-300 bg-white text-gray-600 rounded-md '

  const onSubmit: SubmitHandler<IngredientType> = async (data) => {
    console.log('data', data)
    const { name, description, unit, price, stock } = data

    const newIngredient = {
      name,
      description,
      price,
      stock,
      unit
    }

    console.log('new ingredient', newIngredient)

    const ingredientCreated = await createIngredient(newIngredient)

    if (ingredientCreated) {
      navigate('/ingredients')
    }
  }

  return (
    <PageContainer>
      <Card>
        <h1 className="text-4xl font-bold text-center text-blue-600">Agregar Ingrediente</h1>
        <form
          className="space-y-6 border-t border-b border-gray-200 py-6 text-gray-600"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap">
            <label htmlFor="name" className={labelClassName}>
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className={inputClassName}
              {...register('name', { required: true })}
            />
            {errors.name && Alert({ alert: 'Ingresa el nombre del ingrediente', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="description" className={labelClassName}>
              Descripción
            </label>
            <textarea
              id="description"
              className={inputClassName}
              {...register('description', { required: true })}
            />
            {errors.description && Alert({ alert: 'Ingresa una descripción', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="price" className={labelClassName}>
              Precio
            </label>
            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field: { onChange, value } }): JSX.Element => (
                <NumericFormat
                  value={value}
                  displayType={'input'}
                  defaultValue={0}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'$'}
                  className={inputClassName}
                  onValueChange={(values): void => {
                    onChange(parseInt(values.value))
                  }}
                />
              )}
            />
            {errors.price && Alert({ alert: 'Ingresa el precio', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="stock" className={labelClassName}>
              Stock
            </label>
            <Controller
              control={control}
              name="stock"
              rules={{ required: true }}
              render={({ field: { onChange, value } }): JSX.Element => (
                <NumericFormat
                  value={value}
                  displayType={'input'}
                  defaultValue={0}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  className={inputClassName}
                  onValueChange={(values): void => {
                    onChange(parseInt(values.value))
                  }}
                />
              )}
            />
            {errors.stock && Alert({ alert: 'Ingresa el stock', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="unit" className={labelClassName}>
              Unidad
            </label>
            <select
              id="unit"
              className={inputClassName}
              {...register('unit', {
                required: true
              })}
            >
              {units.map((unit) => (
                <option key={unit.id} value={unit.value}>
                  {unit.name}
                </option>
              ))}
            </select>
            {errors.name && Alert({ alert: 'Selecciona una unidad', type: 'error' })}
          </div>
          <div className="flex justify-center gap-3">
            <Button type="submit" baseStyle="green" className="p-3 w-64">
              Agregar Ingrediente
            </Button>
            <Button
              className="p-3 w-44"
              baseStyle="green"
              onClick={(): void => {
                navigate('/ingredients')
              }}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </PageContainer>
  )
}
