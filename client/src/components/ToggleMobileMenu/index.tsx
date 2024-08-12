import { useState } from 'react'
import { cn } from '~/utils/functions'

const ToggleMobileMenu = () => {
  const [isShowMobileMenu, setIsShowMobileMenu] = useState<boolean>(false)

  const handleShowMobileMenu = () => {
    setIsShowMobileMenu(!isShowMobileMenu)
  }

  return (
    <div
      onClick={handleShowMobileMenu}
      className={cn(
        'md:hidden relative size-7 cursor-pointer z-10 before:content-[""] before:block before:absolute before:top-0 before:right-0 before:w-full before:h-[2px] before:bg-primary-200 before:transition-all before:duration-300 after:content-[""] after:block after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary-200 after:transition-all after:duration-300',
        {
          'before:bg-white before:translate-x-[1px] before:translate-y-[13px] before:-rotate-45 after:bg-white after:translate-x-[1px] after:-translate-y-[13px] after:rotate-45':
            isShowMobileMenu
        }
      )}
    >
      <span
        className={cn(
          'absolute top-2/4 right-0 w-[14px] h-[2px] bg-primary-200 transition-opacity duration-300',
          {
            'opacity-0': isShowMobileMenu
          }
        )}
      ></span>
    </div>
  )
}

export default ToggleMobileMenu
