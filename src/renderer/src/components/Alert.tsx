import WarningIcon from './icons/WarningIcon'

type AlertProps = {
  alert: string
  type?: string
}

export default function Alert({ alert, type }: AlertProps): React.ReactNode {
  let className: string

  switch (type) {
    case 'warning':
      className = 'text-yellow-600'
      break
    case 'error':
      className = 'text-red-500'
      break
    case 'success':
      className = 'text-green-600'
      break
    default:
      className = 'text-red-500'
      break
  }

  return (
    <div
      className={`flex items-center justify-center gap-3 w-full p-3 text-base font-medium ${className}`}
    >
      <WarningIcon className="w-5 h-5" />
      <p>{alert}</p>
    </div>
  )
}
