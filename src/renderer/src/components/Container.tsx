type Props = {
  children?: React.ReactNode
}

export default function Container({ children }: Props): React.ReactNode {
  return (
    <div className="flex flex-col w-[95vw] mx-auto py-4 justify-center items-center gap-3">{children}</div>
  )
}
