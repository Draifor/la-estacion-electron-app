import Flatpickr from 'react-flatpickr'
import { Spanish } from 'flatpickr/dist/l10n/es.js'
import 'flatpickr/dist/flatpickr.css'

interface Props {
  value: Date
  onChange: (date: Date[]) => void
  options?: Record<string, unknown>
  className?: string
}

export default function InputDate({
  value,
  onChange,
  className = '',
  options
}: Props): React.ReactNode {
  return (
    <Flatpickr
      className={`${className} w-full text-center bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-red focus:border-gray-500`}
      options={{
        locale: Spanish,
        ...options
      }}
      placeholder={'Seleccione una fecha'}
      value={value}
      onChange={onChange}
    />
  )
}
