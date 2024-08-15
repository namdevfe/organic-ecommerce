import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TwitterIcon
} from '~/components/Icon'

const TopFooter = () => {
  return (
    <div className='bg-[#F7F7F7] py-10'>
      <div className='container flex md:items-center flex-col md:flex-row gap-4'>
        {/* Textbox */}
        <div className='max-w-[448px] text-center md:text-left'>
          <h2 className='text-gray-900 text-2xl font-semibold'>
            Subcribe our Newsletter
          </h2>
          <p className='mt-1'>
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
            Phasellus imperdiet elit eu magna.
          </p>
        </div>

        {/* Right */}
        <div className='flex flex-col items-center xl:flex-row md:items-stretch gap-3 xl:gap-10'>
          {/* Send mail */}
          <div
            className='min-w-fit w-full md:min-w-[450px] lg:min-w-[536px] max-w-[536px] h-[52px] flex
              rounded-[43px] overflow-hidden'
          >
            <input
              type='text'
              placeholder='Your email address'
              className='h-full w-full pl-6 outline-none placeholder:text-gray-500 placeholder:text-base'
            />
            <button
              type='submit'
              className='px-10 h-full text-white text-base font-semibold rounded-[43px] bg-primary-200'
            >
              Subcribe
            </button>
          </div>

          {/* Socials network */}
          <ul className='flex items-center gap-2 justify-end xl:justify-start'>
            <li>
              <a
                href='#'
                className='group hover:bg-primary-200 size-10 flex items-center justify-center rounded-full
                  transition-colors duration-300'
              >
                <FacebookIcon className='fill-[#4D4D4D] transition-colors duration-300 group-hover:fill-white' />
              </a>
            </li>
            <li>
              <a
                href='#'
                className='group hover:bg-primary-200 size-10 flex items-center justify-center rounded-full
                  transition-colors duration-300'
              >
                <TwitterIcon className='fill-[#4D4D4D] transition-colors duration-300 group-hover:fill-white' />
              </a>
            </li>
            <li>
              <a
                href='#'
                className='group hover:bg-primary-200 size-10 flex items-center justify-center rounded-full
                  transition-colors duration-300'
              >
                <PinterestIcon className='fill-[#4D4D4D] transition-colors duration-300 group-hover:fill-white' />
              </a>
            </li>
            <li>
              <a
                href='#'
                className='group hover:bg-primary-200 size-10 flex items-center justify-center rounded-full
                  transition-colors duration-300'
              >
                <InstagramIcon className='fill-[#4D4D4D] transition-colors duration-300 group-hover:fill-white' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TopFooter
