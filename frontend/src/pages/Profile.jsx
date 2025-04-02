import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  return (
    <>
      <div className='flex w-full h-[92vh] gap-6'>

        <div className='left-space h-full w-[220px]'>
        </div>

        <div className='details-container w-full h-full flex flex-col md:pr-8 md:pl-12 py-4 gap-4 justify-start items-center overflow-y-auto custom-scrollbar'>
        <p className='flex w-full bg-[#cecece] text-lg sm:text-2xl font-[600] h-[40px] justify-center items-center mb-2'>
            Your Profile 
          </p>

          <div className='flex flex-col items-center w-full gap-2'>
          <div className='flex flex-col items-center w-full p-6 rounded-t-lg gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-20 h-20' viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
            <p className='font-semibold'>Manjeet Singh</p>
            </div>
          <div className='flex flex-col min-w-[300px] w-[90%] lg:w-[50%] rounded-lg border border-gray-500 relative'>
          <svg className='w-5 h-5 absolute top-2 right-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/></svg>
            <div className='flex w-full p-4'>
              <div className='flex flex-col grow'>
                <p className='font-bold'>Name</p>
                <p>Manjeet Singh</p>
              </div>
            </div>
            <div className='flex w-full p-4'>
              <div className='flex flex-col grow'>
                <p className='font-bold'>Email</p>
                <p>imanjeetsingh01@gmail.com</p>
              </div>
            </div>
            <div className='flex w-full p-4'>
              <div className='flex flex-col grow'>
                <p className='font-bold'>Phone</p>
                <p>9461835401</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col min-w-[300px] w-[90%] lg:w-[50%] rounded-lg border border-gray-500 relative'>
              <div className='flex w-full p-4'>
                <div className='flex flex-col grow'>
                  <p className='font-bold'>Password</p>
                <p>********</p>
                </div>
                <div className='flex justify-center items-center'>
                <button className='text-xs bg-[#FFCE42] py-1 px-4 leading-tight rounded-md'>Change</button>
              </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Profile;