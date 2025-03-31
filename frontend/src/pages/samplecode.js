<div className='flex justify-center items-start'>
                <button className='text-xs bg-[#FFCE42] py-1 px-4 leading-tight rounded-md' onClick={() => setIsOpenEdit(true)}>Edit</button>
              </div>

{isOpenEdit && <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-lg transition-all duration-500 linear">
    <input
      type="text"
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFCE42] w-full"
      placeholder="Enter name..."
    />

    <div className='flex w-full justify-end gap-4'>
    <button
      className="text-xs bg-[#60A5FA] hover:bg-[#3B82F6] transition-all duration-300 py-2 px-6 rounded-md font-medium shadow-md">
      Save
    </button>

    <button
      className="text-xs bg-gray-200 hover:bg-gray-300 transition-all duration-300 py-2 px-6 rounded-md font-medium shadow-md"
      onClick={() => setIsOpenEditName(false)}>
      Discard
    </button>
    </div>
  </div>
  }