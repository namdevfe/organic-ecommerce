import Logo from '~/components/Logo'

const MiddleFooter = () => {
  return (
    <div className='bg-gray-900 py-[60px]'>
      <div className='container flex lg:gap-28 justify-between flex-col lg:flex-row gap-6'>
        {/* Logo */}
        <div className='max-w-[336px]'>
          <Logo classNames='text-white' />
          <p className='mt-4 text-gray-500'>
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
            dui, eget bibendum magna congue nec.
          </p>
          <p className='flex gap-4 mt-4'>
            <span className='font-medium text-white pb-3 border-b border-b-primary-200'>
              (219) 555-0114
            </span>
            or
            <span className='font-medium text-white pb-3 border-b border-b-primary-200'>
              Proxy@gmail.com
            </span>
          </p>
        </div>

        {/* List Menu */}
        <div className='flex flex-1 justify-between'>
          {/* Menu Wrapper */}
          <div>
            <h4 className='text-white font-medium text-base'>My account</h4>
            <ul className='mt-5'>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
            </ul>
          </div>
          {/* Menu Wrapper */}
          <div>
            <h4 className='text-white font-medium text-base'>My account</h4>
            <ul className='mt-5'>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
            </ul>
          </div>
          {/* Menu Wrapper */}
          <div>
            <h4 className='text-white font-medium text-base'>My account</h4>
            <ul className='mt-5'>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
            </ul>
          </div>
          {/* Menu Wrapper */}
          <div>
            <h4 className='text-white font-medium text-base'>My account</h4>
            <ul className='mt-5'>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='inline-block py-[6px] transition-colors duration-300 hover:text-white'
                >
                  My account
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiddleFooter
