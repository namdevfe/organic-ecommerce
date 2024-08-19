import { Outlet } from 'react-router-dom'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import MobileMenu from '~/components/MobileMenu'

const MainLayout = () => {
  return (
    <div>
      <Header />
      <MobileMenu />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
