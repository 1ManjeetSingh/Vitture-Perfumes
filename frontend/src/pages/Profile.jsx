import React from 'react'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const Profile = () => {
  return (
    <>
    <Navbar />
    
    <div className='flex w-full'>
    <div className='h-[152vh] w-[220px] border border-gray-300 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] flex flex-col gap-6'>
      <div className='h-[92vh] flex flex-col w-full justify-start'
      style={{
        position: 'sticky',
        top: '0px',
      }}>
      <div className='flex w-full justify-start border-b border-gray-300 p-2 text-lg font-semibold cursor-default bg-[#cfcfcf]'>Details</div>
      <div className='flex w-full justify-start border-b border-gray-300 p-2 text-lg font-semibold cursor-default'>Your Orders</div>
      <div className='flex w-full justify-start border-b border-gray-300 p-2 text-lg font-semibold cursor-default'>Address</div>
      <div className='flex w-full justify-start border-b border-gray-300 p-2 text-lg font-semibold cursor-default'>payment methods</div>
      </div>
    </div>
    <div>

    </div>
    </div>

    <Footer />
    </>
  )
}

export default Profile;