const MobileMenu = () => {
  const isShowMobileMenu = false

  return (
    isShowMobileMenu && (
      <div className='fixed top-0 left-0 w-screen h-screen bg-primary-200 pt-[92px]'>
        <ul className='flex flex-col items-center justify-center h-full'>
          <li>
            <a
              href='#'
              className='inline-block text-white text-2xl text-center py-3 capitalize'
            >
              Home
            </a>
          </li>
          <li>
            <a
              href='#'
              className='inline-block text-white text-2xl text-center py-3 capitalize'
            >
              Home
            </a>
          </li>
          <li>
            <a
              href='#'
              className='inline-block text-white text-2xl text-center py-3 capitalize'
            >
              Home
            </a>
          </li>
          <li>
            <a
              href='#'
              className='inline-block text-white text-2xl text-center py-3 capitalize'
            >
              Home
            </a>
          </li>
        </ul>
      </div>
    )
  )
}

export default MobileMenu
