import { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom'

import { InvoiceType, SupplierType } from '../../../../types/databaseModels'
import createInvoice from '../../utils/apiFunctions/invoices/createInvoice'

import Card from '../Card'
import Button from '../Button'
import Alert from '../Alert'
import InputDate from '../InputDate'
import PageContainer from '../PageContainer'

const TOTAL_PAYMENT = 'Pago Total'
const PARTIAL_PAYMENT = 'Pago Parcial'

const defaultSupplier = {
  id: 0,
  name: 'Selecciona un proveedor'
}

const paymentMethods = [
  { type_id: 1, name: TOTAL_PAYMENT },
  { type_id: 2, name: PARTIAL_PAYMENT }
]

export default function CreateInvoice(): React.ReactNode {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  const today = date.toISOString().split('T')[0]

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InvoiceType>({
    defaultValues: { dueDate: today }
  })

  const [suppliers, setSuppliers] = useState<SupplierType[]>([])
  const [paymentMethod, setPaymentMethod] = useState<string>(TOTAL_PAYMENT)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [paidAmount, setPaidAmount] = useState<number>(0)
  const [remainingAmount, setRemainingAmount] = useState<number>(0)

  const navigate = useNavigate()

  useEffect(() => {
    const getSuppliers = async (): Promise<void> => {
      const suppliers = await fetch('http://localhost:5000/suppliers').then((res) => res.json())
      suppliers.sort((a: SupplierType, b: SupplierType) => a.name.localeCompare(b.name))
      suppliers.unshift(defaultSupplier)
      setSuppliers(suppliers)
    }
    getSuppliers()
  }, [])

  const labelClassName = 'w-[28%] mt-1 text-lg font-medium text-gray-600 '
  const inputClassName = 'w-[65%] p-2 border border-gray-300 bg-white text-gray-600 rounded-md '

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setPaymentMethod(event.target.value)
    setPaidAmount(0)
    setRemainingAmount(0)
  }

  const handleTotalAmountChange = (value: number): void => {
    setTotalAmount(value ? value : 0)
    if (paymentMethod === TOTAL_PAYMENT) {
      setPaidAmount(value)
      setRemainingAmount(0)
    } else {
      setRemainingAmount(value - paidAmount)
    }
  }

  const handlePaidAmountChange = (value: number): void => {
    console.log('value', value)
    if (value <= totalAmount) {
      setPaidAmount(value)
      setRemainingAmount(totalAmount - value)
    }
    if (!value) setRemainingAmount(totalAmount)
  }

  const onSubmit: SubmitHandler<InvoiceType> = async (data) => {
    console.log('data', data)
    console.log(paidAmount, remainingAmount)
    const { supplier, description, dueDate } = data

    const newInvoice = {
      date: today,
      supplier,
      paymentStatus: remainingAmount === 0 ? 'Pagada' : 'Crédito',
      description,
      totalAmount,
      paidAmount,
      remainingAmount,
      dueDate
    }

    console.log('new invoice', newInvoice)

    const invoiceCreated = await createInvoice(newInvoice)

    if (invoiceCreated) {
      navigate('/invoices')
    }
  }

  return (
    <PageContainer>
      <Card>
        <h1 className="text-4xl font-bold text-center text-blue-600">Agregar Factura</h1>
        <form
          className="space-y-6 border-t border-b border-gray-200 py-6 text-gray-600"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap">
            <label htmlFor="supplier" className={labelClassName}>
              Proveedor
            </label>
            <select
              id="supplier"
              className={inputClassName}
              {...register('supplier', {
                required: true,
                validate: (value) => value !== defaultSupplier.name
              })}
            >
              {suppliers.map((supplier, index) => (
                <option key={index} value={supplier.name}>
                  {supplier.name}
                </option>
              ))}
            </select>
            {errors.supplier && Alert({ alert: 'Selecciona un proveedor', type: 'error' })}
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="paymentMethod" className={labelClassName}>
              Tipo de pago
            </label>
            <select
              id="paymentMethod"
              className={inputClassName + '!w-1/3'}
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              {paymentMethods.map((paymentMethod, index) => (
                <option key={index} value={paymentMethod.name}>
                  {paymentMethod.name}
                </option>
              ))}
            </select>
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
            <label htmlFor="totalAmount" className={labelClassName}>
              Valor Factura
            </label>
            <Controller
              control={control}
              name="totalAmount"
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
                    handleTotalAmountChange(parseInt(values.value))
                    onChange(parseInt(values.value))
                  }}
                />
              )}
            />
            {errors.totalAmount &&
              Alert({ alert: 'Ingresa el valor de la factura', type: 'error' })}
          </div>
          {paymentMethod === PARTIAL_PAYMENT && (
            <>
              <div className="flex flex-wrap">
                <label htmlFor="paidAmount" className={labelClassName}>
                  Valor a Pagar
                </label>
                <Controller
                  control={control}
                  name="paidAmount"
                  rules={{
                    required: true,
                    validate: (value) => value <= totalAmount
                  }}
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
                        handlePaidAmountChange(parseInt(values.value))
                        onChange(parseInt(values.value) || 0)
                      }}
                    />
                  )}
                />
                {errors.paidAmount &&
                  (errors.paidAmount.type === 'validate'
                    ? Alert({
                        alert: 'El valor a pagar no puede ser mayor al valor de la factura',
                        type: 'error'
                      })
                    : errors.paidAmount.type === 'required' &&
                      Alert({
                        alert: 'Ingresa el valor a pagar',
                        type: 'error'
                      }))}
              </div>
              <div className="flex flex-wrap">
                <label htmlFor="remainingAmount" className={labelClassName}>
                  Valor Restante
                </label>
                <Controller
                  control={control}
                  name="remainingAmount"
                  render={({ field: { onChange } }): JSX.Element => (
                    <NumericFormat
                      value={remainingAmount}
                      displayType={'text'}
                      defaultValue={0}
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      prefix={'$'}
                      className={inputClassName}
                      onValueChange={(values): boolean => {
                        onChange(parseInt(values.value))
                        return parseInt(values.value) <= totalAmount
                      }}
                    />
                  )}
                />
                {errors.remainingAmount &&
                  Alert({ alert: 'Ingresa el valor restante', type: 'error' })}
              </div>
              <div className="flex flex-wrap">
                <label htmlFor="dueDate" className={labelClassName + '!w-[45%] !mt-0'}>
                  Fecha de vencimiento
                </label>
                <Controller
                  control={control}
                  name="dueDate"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }): JSX.Element => (
                    <InputDate
                      value={value as unknown as Date}
                      onChange={(date): void => onChange(date[0] as unknown as string)}
                      className="w-1/2 bg-white text-gray-600 rounded-md"
                      options={{
                        minDate: new Date().setHours(0, 0, 0, 0)
                      }}
                    />
                  )}
                />
                {errors.dueDate && (
                  <div className="w-full">
                    {Alert({
                      alert: 'Debe seleccionar una fecha de vencimiento',
                      type: 'error'
                    })}
                  </div>
                )}
              </div>
            </>
          )}
          <div className="flex justify-center gap-3">
            <Button type="submit" baseStyle="green" className="p-3 w-64">
              Agregar Factura
            </Button>
            <Button
              className="p-3 w-44"
              baseStyle="green"
              onClick={(): void => {
                navigate('/invoices')
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
