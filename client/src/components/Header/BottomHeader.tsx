const LIST_MENUS = [
  {
    id: 1,
    page: 'home'
  },
  {
    id: 2,
    page: 'shop'
  },
  {
    id: 3,
    page: 'blog'
  },
  {
    id: 4,
    page: 'about'
  },
  {
    id: 5,
    page: 'contact'
  }
]

const BottomHeader = () => {
  return (
    <div className='h-bottom-header bg-gray-800 hidden md:block'>
      <div className='container h-full flex items-center justify-between'>
        {/* Menus */}
        <ul className='h-full flex items-center -ml-4'>
          {LIST_MENUS.map((item) => (
            <li key={item.id}>
              <a
                href='/'
                className='inline-block px-4 py-2 transition-colors duration-300 text-gray-400 hover:text-white font-medium capitalize'
              >
                {item.page}
              </a>
            </li>
          ))}
        </ul>

        {/* Phone */}
        <div className='flex items-center gap-2'>
          <img src='/images/icon-phone.svg' alt='icon-phone' />
          <span className='text-white font-medium'>(219) 555-0114</span>
        </div>
      </div>
    </div>
  )
}

export default BottomHeader
