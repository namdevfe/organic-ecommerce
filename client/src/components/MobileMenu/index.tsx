import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import useViewportWidth from '~/hooks/useViewportWidth'
import { RootState } from '~/store'
import { handleCloseMobileMenu } from '~/store/reducers/appReducer'
import { cn } from '~/utils/functions'

const MobileMenu = () => {
  const width = useViewportWidth()
  const isShowMobileMenu = useSelector((state: RootState) => state.app.isShowMobileMenu)
  const dispatch = useDispatch()

  useEffect(() => {
    if (width >= 768) {
      dispatch(handleCloseMobileMenu())
    }
  }, [width])

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
