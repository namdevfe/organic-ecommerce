import { Link } from 'react-router-dom'
import { USER_ROUTES } from '~/constants/routes'
import { cn } from '~/utils/functions'

type LogoProps = {
  classNames?: string
}

const Logo = ({ classNames = '' }: LogoProps) => {
  return (
    <Link to={USER_ROUTES.HOME} className='flex items-center gap-2'>
      <img src='/images/icon-plant.svg' alt='icon-plant' />
      <span
        className={cn(
          'text-[2rem] font-medium leading-[2.375rem] text-gray-900',
          classNames
        )}
      >
        NamShop
      </span>
    </Link>
  )
}

export default Logo
