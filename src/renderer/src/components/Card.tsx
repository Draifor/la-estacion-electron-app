type Props = {
  children?: React.ReactNode
}

export default function Card({ children }: Props): React.ReactNode {
  return (
    <div className="container max-w-lg px-4 py-6 bg-white shadow-lg rounded-lg">{children}</div>
  )
}
