type Props = {
  children?: React.ReactNode
}

export default function ViewContainer({ children }: Props): React.ReactNode {
  return (
    <div className="max-w-[90vw] w-full flex flex-col flex-grow overflow-auto items-center justify-center gap-3">
      {children}
    </div>
  )
}
