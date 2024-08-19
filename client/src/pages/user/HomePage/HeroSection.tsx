import Button from '~/components/Button'

const HeroSection = () => {
  return (
    <section className='h-[calc(100vh-194px)] py-6'>
      <div className='container grid grid-cols-12 grid-rows-2 gap-6 h-full'>
        {/* Banner Item */}
        <div
          className='col-span-8 row-start-1 row-end-3 relative overflow-hidden rounded-[10px]
            pl-[60px] flex items-center'
        >
          <div className='absolute top-0 left-0 w-full h-full'>
            <img
              src='https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='hero-image'
              className='w-full h-full object-cover'
            />
          </div>

          {/* Textbox */}
          <div className='z-[1] max-w-[596px]'>
            <h2 className='text-white font-semibold text-5xl capitalize'>
              Fresh & Healthy Organic Food
            </h2>
            <div className='mt-7'>
              <p>Sale up to 30%</p>
              <Button variant='outlined' size='lg' className='mt-7'>
                Shop now
              </Button>
            </div>
          </div>
        </div>
        {/* Banner Item */}
        <div
          className='col-span-4 row-start-1 row-end-2 relative overflow-hidden rounded-[10px] flex
            items-center pl-8'
        >
          <div className='absolute top-0 left-0 w-full h-full -z-[1]'>
            <img
              src='https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='hero-image'
              className='w-full h-full object-cover'
            />
          </div>

          {/* Textbox */}
          <div>
            <h2>
              <span className='uppercase text-gray-900 font-medium block'>
                Summer sale
              </span>
              <span className='uppercase text-gray-800 font-semibold text-[32px] block mt-2'>
                75% Off
              </span>
            </h2>

            {/* Description */}
            <div className='mt-3'>
              <p className='text-gray-600'>Only Fruit & Vegetable</p>
              <Button variant='link' className='group h-5 px-0 gap-3 mt-6'>
                Shop now
                <img
                  src='/images/icon-arrow-right.svg'
                  alt='icon-arrow-right'
                  className='transition-transform duration-300 group-hover:translate-x-2'
                />
              </Button>
            </div>
          </div>
        </div>
        {/* Banner Item */}
        <div
          className='col-span-4 row-start-2 row-end-3 relative overflow-hidden rounded-[10px] flex
            items-center pl-8'
        >
          <div className='absolute top-0 left-0 w-full h-full -z-[1]'>
            <img
              src='https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='hero-image'
              className='w-full h-full object-cover'
            />
          </div>

          {/* Textbox */}
          <div>
            <h2>
              <span className='uppercase text-gray-900 font-medium block'>
                Summer sale
              </span>
              <span className='uppercase text-gray-800 font-semibold text-[32px] block mt-2'>
                75% Off
              </span>
            </h2>

            {/* Description */}
            <div className='mt-3'>
              <p className='text-gray-600'>Only Fruit & Vegetable</p>
              <Button variant='link' className='group h-5 px-0 gap-3 mt-6'>
                Shop now
                <img
                  src='/images/icon-arrow-right.svg'
                  alt='icon-arrow-right'
                  className='transition-transform duration-300 group-hover:translate-x-2'
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
