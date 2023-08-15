import IngredientsProvider from '../context/IngredientsContext'
import ViewContainer from '../components/ViewContainer'
import IngredientsPage from '../components/ingredients/IngredientsPage'

export default function IngredientsView(): React.ReactNode {
  return (
    <ViewContainer>
      <IngredientsProvider>
        <IngredientsPage />
      </IngredientsProvider>
    </ViewContainer>
  )
}
