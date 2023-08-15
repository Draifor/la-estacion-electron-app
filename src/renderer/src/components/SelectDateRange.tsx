import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import InputDate from './InputDate'
import Alert from './Alert'
import Button from './Button'
import { alertDialog } from '../utils/showDialog'
import { SetStateTypes, DataFetchingOptions } from '../../../types/databaseModels'

interface DateRange {
  from: Date
  to: Date
}

interface Props {
  fetchFunction: (data: DataFetchingOptions) => void
  setState: SetStateTypes
}

export default function SelectDateRange({ fetchFunction, setState }: Props): React.ReactNode {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<DateRange>()

  const createDefaultDate = (): Date => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }

  const onSubmit: SubmitHandler<DateRange> = async (data) => {
    console.log('data', data)
    if (data.from > data.to) {
      alertDialog('El campo fecha inicial no puede ser mayor al campo fecha final')
      return
    }
    const from = data.from.toISOString().split('T')[0]
    const to = data.to.toISOString().split('T')[0]
    console.log('from', from)
    console.log('to', to)

    fetchFunction({ from, to, setState })
  }

  return (
    <div className="container md:h-36 mx-auto px-4 text-center max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Buscar por Fecha</h1>
      <form
        className="flex flex-wrap items-start justify-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase font-bold mb-2" htmlFor="from">
            Fecha Inicial
          </label>
          <Controller
            control={control}
            name="from"
            rules={{ required: true }}
            render={({ field: { onChange, value } }): JSX.Element => (
              <InputDate
                value={value}
                onChange={(date): void => {
                  onChange(date[0])
                  !getValues('to') && setValue('to', createDefaultDate())
                }}
                options={{ maxDate: new Date() }}
              />
            )}
          />
          {errors.from &&
            Alert({
              alert: 'Debe seleccionar una fecha inicial',
              type: 'error'
            })}
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase font-bold mb-2" htmlFor="to">
            Fecha Final
          </label>
          <Controller
            control={control}
            name="to"
            rules={{
              required: true,
              validate: (value) => value >= getValues('from')
            }}
            render={({ field: { onChange, value } }): JSX.Element => (
              <InputDate
                value={value}
                onChange={(date): void => onChange(date[0])}
                options={{ defaultDate: new Date(), maxDate: new Date() }}
              />
            )}
          />
          {errors.to?.type === 'validate'
            ? Alert({
                alert: 'La fecha final no puede ser anterior a la fecha inicial',
                type: 'error'
              })
            : errors.to?.type === 'required' &&
              Alert({
                alert: 'Debe seleccionar una fecha final',
                type: 'error'
              })}
        </div>
        <div className="flex justify-center h-10 md:mt-6">
          <Button type="submit" baseStyle="green">
            Buscar
          </Button>
        </div>
      </form>
    </div>
  )
}
