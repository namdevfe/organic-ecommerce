import Divider from '~/components/Divider'

const TopHeader = () => {
  return (
    <div className='h-top-header border border-b-[1px] border-gray-100'>
      <div className='container h-full flex items-center justify-center md:justify-between'>
        {/* Left */}
        <div className='hidden md:flex items-center gap-2'>
          <img src='/images/icon-location.svg' alt='icon-location' />
          <span className='text-xs text-gray-600'>Store Location: Lincoln- 344, Illinois, Chicago, USA</span>
        </div>

        {/* Right */}
        <div className='flex items-center gap-5'>
          {/* Select Dropdown */}
          <div className='flex items-center gap-5'>
            <div className='text-xs text-gray-600 flex items-center gap-[6px] cursor-pointer'>
              <span>Eng</span>
              <img src='/images/icon-arrow-down.svg' alt='icon-arrow-down' />
            </div>

            <div className='text-xs text-gray-600 flex items-center gap-[6px] cursor-pointer'>
              <span className='uppercase'>Usd</span>
              <img src='/images/icon-arrow-down.svg' alt='icon-arrow-down' />
            </div>
          </div>

          {/* Divider */}
          <Divider width={1} height={15} />

          {/* Authentication */}
          <div className='flex items-center gap-[14px] text-xs text-gray-600 capitalize'>
            {/*  */}
            <div className='cursor-pointer transition-colors duration-300 hover:text-primary-200'>Sign In</div>
            <Divider className='w-[1px] h-[15px] bg-gray-600 rotate-12' />
            <div className='cursor-pointer transition-colors duration-300 hover:text-primary-200'>Sign Up</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
