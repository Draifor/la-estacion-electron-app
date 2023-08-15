type Props = {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  children: React.ReactNode
  onClick?: () => void
  baseStyle?: string
  disabled?: boolean
  thickness?: 'thin' | 'thick'
}

export default function Button({
  type = 'button',
  className = '',
  onClick,
  children,
  baseStyle = '',
  disabled = false,
  thickness = 'thick'
}: Props): React.ReactNode {
  let defaultStyle = 'text-white font-bold rounded shadow-md border-2 '
  switch (baseStyle) {
    case 'none':
      defaultStyle = ''
      break
    case 'blue':
      defaultStyle += 'bg-blue-600 hover:bg-blue-700 hover:border-blue-600'
      break
    case 'red':
      defaultStyle += 'bg-red-600 hover:bg-red-700 hover:border-red-600 border-red-600'
      break
    case 'green':
      defaultStyle += 'bg-green-600 hover:bg-green-700 hover:border-green-600'
      break
    case 'disabled':
      defaultStyle += 'bg-gray-600 hover:bg-gray-600 border-gray-600'
      break
    default:
      defaultStyle += 'bg-blue-600 hover:bg-blue-700 border-blue-600'
      break
  }

  const thicknessStyle = thickness === 'thin' ? 'px-2 py-0.5' : 'px-4 py-2'

  return (
    <button
      className={`${thicknessStyle} ${className} ${defaultStyle}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
