import SpinnerIcon from './icons/SpinnerIcon'

type Props = {
  className?: string
}

export default function Spinner({ className }: Props): React.ReactNode {
  return <SpinnerIcon className={`${className} animate-spin`} />
}
