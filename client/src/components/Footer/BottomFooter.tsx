const BottomFooter = () => {
  return (
    <div className='bg-gray-900 py-6 border-t border-t-gray-500'>
      <div className='container flex flex-col md:flex-row gap-3 items-center md:justify-between'>
        {/* Copyright */}
        <div className='text-gray-500'>
          Ecobazar eCommerce © 2021. All Rights Reserved
        </div>

        {/* Payments */}
        <div className='flex gap-2'>
          <a href='flex'>
            <img src='/images/icon-applepay.svg' alt='icon-apple-pay' />
          </a>
          <a href='flex'>
            <img src='/images/icon-visa.svg' alt='icon-visa' />
          </a>
          <a href='flex'>
            <img src='/images/icon-discover.svg' alt='icon-discover' />
          </a>
          <a href='flex'>
            <img src='/images/icon-mastercard.svg' alt='icon-mastercard' />
          </a>
          <a href='flex'>
            <img src='/images/icon-cartpay.svg' alt='icon-cart-pay' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default BottomFooter
