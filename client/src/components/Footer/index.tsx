import BottomFooter from '~/components/Footer/BottomFooter'
import MiddleFooter from '~/components/Footer/MiddleFooter'
import TopFooter from '~/components/Footer/TopFooter'

const Footer = () => {
  return (
    <footer className='w-full'>
      <TopFooter />
      <MiddleFooter />
      <BottomFooter />
    </footer>
  )
}

export default Footer
