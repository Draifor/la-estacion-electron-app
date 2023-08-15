interface PageContainerProps {
  children: React.ReactNode
}

export default function PageContainer({ children }: PageContainerProps): React.ReactNode {
  return (
    <div className="flex flex-col items-center justify-center gap-2 my-3 w-full max-w-screen-2xl h-full">
      {children}
    </div>
  )
}
