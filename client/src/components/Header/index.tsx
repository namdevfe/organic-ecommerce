import BottomHeader from '~/components/Header/BottomHeader'
import MiddleHeader from '~/components/Header/MiddleHeader'
import TopHeader from '~/components/Header/TopHeader'

const Header = () => {
  return (
    <header>
      <TopHeader />

      <MiddleHeader />

      <BottomHeader />
    </header>
  )
}

export default Header
