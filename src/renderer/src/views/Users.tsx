import UsersProvider from '../context/UsersContext'
import ViewContainer from '../components/ViewContainer'
import UsersPage from '../components/users/UsersPage'

export default function UsersView(): React.ReactNode {
  return (
    <ViewContainer>
      <UsersProvider>
        <UsersPage />
      </UsersProvider>
    </ViewContainer>
  )
}
