import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [isOpenEditName, setIsOpenEditName] = useState(false);

  return (
    <>
      <div className='flex w-full h-[92vh] gap-6'>

        <div className='left-space h-full w-[220px]'>
        </div>

        <div className='details-container w-full h-full flex flex-col pr-8 pl-12 py-4 gap-4 justify-start items-center overflow-y-auto custom-scrollbar'>
        <p className='flex w-full bg-[#cecece] text-lg sm:text-2xl font-[600] h-[40px] justify-center items-center mb-2'>
            Your Profile 
          </p>
          <div className='flex flex-col w-[50%] bg-white rounded-lg'>
            <div className='flex w-full p-4 rounded-t-lg border border-gray-500'>
              <div className='flex flex-col grow'>
                <p className='font-bold'>Name</p>
                <p>Manjeet Singh</p>
              </div>
              <div className='flex justify-center items-start'>
                <button className='text-xs bg-[#FFCE42] py-1 px-4 leading-tight rounded-md' onClick={() => setIsOpenEditName(true)}>Edit</button>
              </div>
            </div>
            {isOpenEditName && <div class="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-lg transition-all duration-500 linear">
              <input
                type="text"
                class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFCE42] w-full"
                placeholder="Enter name..."
              />

              <div className='flex w-full justify-end gap-4'>
              <button
                class="text-xs bg-[#60A5FA] hover:bg-[#3B82F6] transition-all duration-300 py-2 px-6 rounded-md font-medium shadow-md">
                Save
              </button>

              <button
                class="text-xs bg-gray-200 hover:bg-gray-300 transition-all duration-300 py-2 px-6 rounded-md font-medium shadow-md"
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