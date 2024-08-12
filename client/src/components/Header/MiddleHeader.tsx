import Divider from '~/components/Divider'
import Logo from '~/components/Logo'
import Search from '~/components/Search'
import ToggleMobileMenu from '~/components/ToggleMobileMenu'

const MiddleHeader = () => {
  return (
    <div className='h-middle-header'>
      <div className='container h-full flex items-center justify-between'>
        <Logo />

        <Search />

        {/* Shopping */}
        <div className='flex items-center gap-4'>
          {/* Wishlist */}
          <div className='flex cursor-pointer'>
            <img src='/images/icon-heart.svg' alt='icon-heart' />
          </div>

          <Divider className='h-6 w-[1px]' />

          {/* Badge */}
          <div className='relative flex cursor-pointer'>
            <img src='/images/icon-cart.svg' alt='icon-cart' />
            <span className='absolute left-2/4 -top-1/4 bg-primary-300 rounded-full flex items-center justify-center size-[18px] text-white text-[0.625rem] font-medium'>
              2
            </span>
          </div>

          <Divider className='h-6 w-[1px] md:hidden' />

          <ToggleMobileMenu />
        </div>
      </div>
    </div>
  )
}

export default MiddleHeader
