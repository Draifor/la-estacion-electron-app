import SuppliersProvider from '../context/SuppliersContext'
import ViewContainer from '../components/ViewContainer'
import SuppliersPage from '../components/suppliers/SuppliersPage'

export default function SuppliersView(): React.ReactNode {
  return (
    <ViewContainer>
      <SuppliersProvider>
        <SuppliersPage />
      </SuppliersProvider>
    </ViewContainer>
  )
}
