import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { cn } from '~/utils/functions'

const MobileMenu = () => {
  const isShowMobileMenu = useSelector((state: RootState) => state.app.isShowMobileMenu)

  return (
    <div
      className={cn(
        'fixed top-0 left-0 w-screen h-screen bg-primary-200 pt-[134px] transition-opacity duration-300 opacity-100',
        {
          'opacity-0 pointer-events-none': !isShowMobileMenu
        }
      )}
    >
      <ul className='flex flex-col items-center justify-center h-full'>
        <li>
          <a href='#' className='inline-block text-white text-2xl text-center py-3 capitalize'>
            Home
          </a>
        </li>
        <li>
          <a href='#' className='inline-block text-white text-2xl text-center py-3 capitalize'>
            Home
          </a>
        </li>
        <li>
          <a href='#' className='inline-block text-white text-2xl text-center py-3 capitalize'>
            Home
          </a>
        </li>
        <li>
          <a href='#' className='inline-block text-white text-2xl text-center py-3 capitalize'>
            Home
          </a>
        </li>
      </ul>
    </div>
  )
}

export default MobileMenu
