import Button from './Button'
import EditIcon from './icons/EditIcon'

interface Props {
  onClick: () => void
  className?: string
  disabled?: boolean
}

export default function EditButton({ onClick, className = '', disabled }: Props): React.ReactNode {
  return (
    <Button
      onClick={onClick}
      baseStyle={disabled ? 'disabled' : 'blue'}
      thickness="thin"
      disabled={disabled}
      className={className}
    >
      <EditIcon />
    </Button>
  )
}
