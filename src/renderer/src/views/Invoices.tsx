import InvoicesProvider from '../context/InvoicesContext'
import ViewContainer from '../components/ViewContainer'
import InvoicesPage from '../components/invoices/InvoicesPage'

export default function InvoicesView(): React.ReactNode {
  return (
    <ViewContainer>
      <InvoicesProvider>
        <InvoicesPage />
      </InvoicesProvider>
    </ViewContainer>
  )
}
