import { lazy, Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './views/Login'
import Dashboard from './views/Dashboard'

import Container from './components/Container'
import Navigation from './components/Navigation'
import Loading from './components/Loading'
import ProtectedRoute from './components/ProtectedRoute'

import useUserContext from './hooks/useSessionContext'

const CreateUser = lazy(() => import('./components/users/CreateUser'))
const UsersView = lazy(() => import('./views/Users'))
const CreateSupplier = lazy(() => import('./components/suppliers/CreateSupplier'))
const SuppliersView = lazy(() => import('./views/Suppliers'))
const CreateInvoice = lazy(() => import('./components/invoices/CreateInvoice'))
const InvoicesView = lazy(() => import('./views/Invoices'))
const CreateIngredient = lazy(() => import('./components/ingredients/CreateIngredient'))
const IngredientsView = lazy(() => import('./views/Ingredients'))

export default function App(): React.ReactNode {
  const { user, isAdministrator } = useUserContext()

  return (
      <Router>
        <Container>
          {user && <Navigation />}

          <Suspense fallback={<Loading />}>
            <Routes>
              <Route index element={<Login />} />
              <Route path='/' element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/suppliers/add-supplier" element={<CreateSupplier />} />
                <Route path="/suppliers" element={<SuppliersView />} />
                <Route path="/invoices/add-invoice" element={<CreateInvoice />} />
                <Route path="/invoices" element={<InvoicesView />} />
                <Route path="/ingredients/add-ingredient" element={<CreateIngredient />} />
                <Route path="/ingredients" element={<IngredientsView />} />
              </Route>
              <Route element={<ProtectedRoute isAdminRoute={isAdministrator} />}>
                <Route path="/users/add-user" element={<CreateUser />} />
                <Route path="/users" element={<UsersView />} />
              </Route>
            </Routes>
          </Suspense>
        </Container>
      </Router>
  )
}
