import { Route, Routes } from 'react-router-dom'
import { ADMIN_ROUTES, USER_ROUTES } from '~/constants/routes'
import AdminLayout from '~/layouts/AdminLayout'
import MainLayout from '~/layouts/MainLayout'
import DashboardPage from '~/pages/admin/DashboardPage'
import HomePage from '~/pages/user/HomePage'
import LoginPage from '~/pages/user/LoginPage'
import RegisterPage from '~/pages/user/RegisterPage'

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path={USER_ROUTES.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={USER_ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={USER_ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        {/* Private Routes */}
        <Route path={ADMIN_ROUTES.DASHBOARD} element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
