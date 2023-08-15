import Button from './Button'
import DeleteIcon from './icons/DeleteIcon'

interface Props {
  onClick: () => void
  className?: string
  disabled?: boolean
}

export default function DeleteButton({
  onClick,
  className = '',
  disabled
}: Props): React.ReactNode {
  return (
    <Button
      onClick={onClick}
      baseStyle={disabled ? 'disabled' : 'red'}
      thickness="thin"
      disabled={disabled}
      className={className}
    >
      <DeleteIcon />
    </Button>
  )
}
