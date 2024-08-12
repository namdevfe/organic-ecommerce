const Search = () => {
  return (
    <div className='hidden max-w-[380px] lg:max-w-[498px] h-[45px] md:flex items-center border border-gray-100 rounded-md overflow-hidden'>
      {/* Input */}
      <div className='w-[400px] h-full relative'>
        <input
          type='text'
          placeholder='Search'
          className='w-full h-full outline-none pl-11 placeholder:text-gray-500'
        />
        <img
          src='/images/icon-search.svg'
          alt='icon-search'
          className=' absolute top-2/4 left-4 -translate-y-2/4'
        />
      </div>

      {/* Button Search */}
      <button className='h-full px-6 bg-primary-200 min-w-fit text-white font-semibold'>
        Search
      </button>
    </div>
  )
}

export default Search
