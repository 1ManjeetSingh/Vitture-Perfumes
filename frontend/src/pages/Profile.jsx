import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [isOpenEditName, setIsOpenEditName] = useState(false);

  return (
    <>
      <div className='flex w-full h-[92vh] gap-6'>

        <div className='left-space h-full w-[220px]'>
        </div>

        <div className='details-container w-full h-full flex flex-col md:pr-8 md:pl-12 py-4 gap-4 justify-start items-center overflow-y-auto custom-scrollbar'>
        <p className='flex w-full bg-[#cecece] text-lg sm:text-2xl font-[600] h-[40px] justify-center items-center mb-2'>
            Your Profile 
          </p>
          <div className='flex flex-col min-w-[300px] w-[90%] lg:w-[50%] rounded-lg'>
            <div className='flex flex-col items-center w-full p-6 rounded-t-lg gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-20 h-20' viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
            <p className='font-semibold'>UserName123</p>
            </div>
            <div className='flex w-full p-4 rounded-t-lg border border-gray-500'>
              <div className='flex flex-col grow'>
                <p className='font-bold'>Name</p>
                <p>Manjeet Singh</p>
              </div>
              <div className='flex justify-center items-start'>
                <button className='text-xs bg-[#FFCE42] py-1 px-4 leading-tight rounded-md' onClick={() => setIsOpenEditName(true)}>Edit</button>
              </div>
            </div>
            {isOpenEditName && <div clasName="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-lg transition-all duration-500 linear">
              <input
                type="text"
                clasName="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFCE42] w-full"
                placeholder="Enter name..."
              />

              <div className='flex w-full justify-end gap-4'>
              <button
                clasName="text-xs bg-[#60A5FA] hover:bg-[#3B82F6] transition-all duration-300 py-2 px-6 rounded-md font-medium shadow-md">
                Save
              </button>

              <button
                clasName="text-xs bg-gray-200 hover:bg-gray-300 transition-all duration-300 py-2 px-6 rounded-md font-medium shadow-md"
                onClick={() => setIsOpenEditName(false)}>
                Discard
              </button>
              </div>
            </div>
            }
            <div className='flex w-full p-4 border border-gray-500'>
              <div className='flex flex-col grow'>
                <p className='font-bold'>Email</p>
                <p>imanjeetsingh01@gmail.com</p>
              </div>
              <div className='flex justify-center items-start'>
                <button className='text-xs bg-[#FFCE42] py-1 px-4 leading-tight rounded-md'>Edit</button>
              </div>
            </div>
            <div className='flex w-full p-4 border border-gray-500'>
              <div className='flex flex-col grow'>
                <p className='font-bold'>Phone</p>
                <p>9461835401</p>
              </div>
              <div className='flex justify-center items-start'>
                <button className='text-xs bg-[#FFCE42] py-1 px-4 leading-tight rounded-md'>Edit</button>
              </div>
            </div>
            <div className='flex w-full p-4 rounded-b-lg border border-gray-500'>
              <div className='flex flex-col grow'>
                <p className='font-bold'>Password</p>
                <p>********</p>
              </div>
              <div className='flex justify-center items-start'>
                <button className='text-xs bg-[#FFCE42] py-1 px-4 leading-tight rounded-md'>Edit</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Profile;