import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import useSuppliersContext from '../../hooks/useSuppliersContext'
import { SupplierType } from '../../../../types/databaseModels'
import updateSupplier from '../../utils/apiFunctions/suppliers/updateSupplier'

import { confirmDialog } from '../../utils/showDialog'
import Card from '../Card'
import Button from '../Button'
import Alert from '../Alert'
import PageContainer from '../PageContainer'

const supplierTypes: string[] = ['Pequeño', 'Grande', 'Queso']

export default function EditSupplier(): React.ReactNode {
  const { suppliers, setSuppliers, setIsEditSupplier, editSupplierId } = useSuppliersContext()
  const editSupplier = suppliers.find((supplier) => supplier.id === editSupplierId)
  console.log('edit supplier', editSupplier)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SupplierType>({ defaultValues: editSupplier })

  const labelClassName = 'w-1/5 mt-1 text-lg font-medium text-gray-600'
  const inputClassName = 'w-3/4 p-2 border border-gray-300 bg-white text-gray-600 rounded-md'

  const onSubmit: SubmitHandler<SupplierType> = async (data) => {
    console.log('data', data)
    const handleUpdateSupplier = async (confirmAction: boolean): Promise<void> => {
      if (!confirmAction) return

      const { name, phone, address, type } = data

      const updatedSupplier = await updateSupplier({
        id: editSupplierId,
        name,
        phone,
        address,
        type
      })

      if (!updatedSupplier) return

      const updatedSuppliers = suppliers.map((supplier) => {
        if (supplier.id === editSupplierId) {
          return updatedSupplier
        }
        return supplier
      })
      setSuppliers(updatedSuppliers)
      setIsEditSupplier(false)
    }

    confirmDialog('Se actualizará el proveedor\n¿Está seguro?', handleUpdateSupplier)
  }

  return (
    <PageContainer>
      <Card>
        <h1 className="text-4xl font-bold text-center text-blue-600">Editar Proveedor</h1>
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
            {errors.name && Alert({ alert: 'Ingresa el nombre', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="address" className={labelClassName}>
              Dirección
            </label>
            <input
              type="text"
              id="address"
              className={inputClassName}
              {...register('address', { required: true })}
            />
            {errors.address && Alert({ alert: 'Ingresa la dirección', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="phone" className={labelClassName}>
              Teléfono
            </label>
            <Controller
              control={control}
              name="phone"
              rules={{
                validate: (value) => (value?.includes('_') ? false : true)
              }}
              render={({ field: { onChange, value } }): JSX.Element => (
                <PatternFormat
                  format="### ### ####"
                  mask="_"
                  value={value}
                  onValueChange={({ formattedValue }): void => onChange(formattedValue)}
                  className={inputClassName}
                />
              )}
            />
            {errors.phone && Alert({ alert: 'Ingresa un número válido', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="type" className={labelClassName}>
              Tipo
            </label>
            <select
              id="type"
              className={inputClassName + ' cursor-pointer !w-2/5'}
              {...register('type', { required: true })}
            >
              {supplierTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && Alert({ alert: 'Selecciona un tipo', type: 'error' })}
          </div>
          <div className="flex justify-center gap-3">
            <Button type="submit" baseStyle="green" className="w-48 p-3 px-14">
              Guardar Cambios
            </Button>
            <Button
              className="w-40 p-3 px-16"
              baseStyle="green"
              onClick={(): void => {
                setIsEditSupplier(false)
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
