import React, { useEffect, useState, useRef } from 'react';
import { useUser } from "../contexts/UserContext";
import { Link } from 'react-router-dom';
import { Input, message } from 'antd';

const Profile = () => {

  const { user } = useUser();

  const token = JSON.parse(localStorage.getItem("token"));
  
  const [editProfile, setEditProfile] = useState(false);
  const editProfileRef = useRef(null);
  const now = Date.now();

  // to change Name and Email
  const [formData, setFormData] = useState({
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.value}`,
        },
        body: JSON.stringify(
          formData
        ),
      });
  
      if (!response.ok) {
        const data = await response.json();
        message.error(data.message);
        return;
      }
  
      const data = await response.json();
      message.success(data.message);

      // Updating user in local storage
      user.fullName = formData.fullName;
      user.email = formData.email;

      const User = {
        value: user,
        expiry: now + 3600000, // 1 hour = 3600000 ms
        lastAccessed: now,
      };
      
      localStorage.setItem("user", JSON.stringify(User))

      setEditProfile(false);
    } catch (err) {
      message.error("Something went wrong: " + err.message);
    }
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editProfileRef.current && !editProfileRef.current.contains(event.target)) {
        setEditProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!editProfile) {
      setFormData({
        fullName: user?.fullName ?? "",
        email: user?.email ?? "",
        password: "",
      });
    }
  }, [editProfile, user]);

  // to  change phone No.
  const [editPhoneNo, setEditPhonNo] = useState(false);
  const editPhoneNoRef = useRef(null);


  const [formDataPhone, setFormDataPhone] = useState({
    phoneNo: user?.phoneNo ?? "",
    password: "",
  });

  const handleChangePhoneNo = (e) => {
    setFormDataPhone({ ...formDataPhone, [e.target.name]: e.target.value });
  }

  const handleSubmitPhone = async(e) => {
    e.preventDefault();
      
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.value}`,
        },
        body: JSON.stringify(
          formDataPhone
        ),
      });
  
      if (!response.ok) {
        const data = await response.json();
        message.error(data.message);
        return;
      }
  
      const data = await response.json(); // Don't forget await here!
      message.success(data.message);

      user.phoneNo = formDataPhone.phoneNo;

      const User = {
        value: user,
        expiry: now + 3600000, // 1 hour = 3600000 ms
        lastAccessed: now,
      };
      
      localStorage.setItem("user", JSON.stringify(User))

      setEditPhonNo(false);
    } catch (err) {
      message.error("Something went wrong: " + err.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editPhoneNoRef.current && !editPhoneNoRef.current.contains(event.target)) {
        setEditPhonNo(false);

      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!editPhoneNo) {
      setFormDataPhone({
        phoneNo: user?.phoneNo ?? "",
        password: "",
      });
    }
  }, [editPhoneNo, user]);

  // to change password
  const [editPassword, setEditPassword] = useState(false);
  const editPasswordRef = useRef(null);

  const [formDataPassword, setFormDataPassword] = useState({
    password: "",
    newPassword: "",
  });

  const handleChangePassword = (e) => {
    setFormDataPassword({ ...formDataPassword, [e.target.name]: e.target.value });
  };

  const handleSubmitPassword = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.value}`,
        },
        body: JSON.stringify(
          formDataPassword
        ),
      });
  
      if (!response.ok) {
        const data = await response.json();
        message.error(data.message);
        return;
      }
  
      const data = await response.json(); // Don't forget await here!
      message.success(data.message);
      setEditPassword(false);

    } catch (err) {
      message.error("Something went wrong: " + err.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editPasswordRef.current && !editPasswordRef.current.contains(event.target)) {
        setEditPassword(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!editPassword) {
      setFormDataPassword({
        password: "",
        newPassword: "",
      });
    }
  }, [editPassword, user]);


  return (
    <>
      <div className='flex w-full h-[92vh] gap-6 relative'>

        <div className='left-space h-full w-[220px]'>
        </div>

        <div className={`details-container w-full h-full flex flex-col md:pr-8 md:pl-12 py-4 gap-4 justify-center items-center overflow-y-auto custom-scrollbar ${!user ? "" : "hidden"}`}>
          {/* No login condition - No user in storage condition */}
          <div className="flex justify-center items-center h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="flex gap-4">
                <Link to="/login" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium">
                  Sign In
                </Link>
                <Link to="/register" className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-4 py-2 rounded-lg font-medium">
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={`details-container w-full h-full flex flex-col md:pr-8 md:pl-12 pt-4 pb-16 gap-4 justify-start items-center overflow-y-auto custom-scrollbar ${!user ? "hidden" : ""}`}>
          <p className='flex w-full bg-[#cecece] text-lg sm:text-2xl font-[600] h-[40px] justify-center items-center mb-2'>
            Your Profile
          </p>

          <div className='flex flex-col items-center w-full gap-2'>
            <div className='flex flex-col items-center w-full p-6 rounded-t-lg gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" className='w-20 h-20' viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" /></svg>
              <p className='font-semibold'>{user?.fullName}</p>
            </div>
            <div className='flex flex-col min-w-[300px] w-[90%] lg:w-[50%] rounded-lg border border-gray-500 relative'>
              <svg className='w-5 h-5 absolute top-2 right-2' onClick={() => setEditProfile(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" /></svg>
              <div className='flex w-full p-4'>
                <div className='flex flex-col grow'>
                  <p className='font-bold'>Name</p>
                  <p>{user?.fullName}</p>
                </div>
              </div>
              <div className='flex w-full p-4'>
                <div className='flex flex-col grow'>
                  <p className='font-bold'>Email</p>
                  <p>{user?.email}</p>
                </div>
              </div>

            </div>
            <div className='flex flex-col min-w-[300px] w-[90%] lg:w-[50%] rounded-lg border border-gray-500 relative'>
              <div className='flex w-full p-4'>
                <div className='flex flex-col grow'>
                  <p className='font-bold'>Phone</p>
                  <p>{user?.phoneNo || "Add Now!"}</p>
                </div>
                <div className='flex justify-center items-center'>
                  <button onClick={() => setEditPhonNo(true)} className='text-xs bg-[#FFCE42] py-1 px-4 leading-tight rounded-md'>Change</button>
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
                  <button onClick={() => setEditPassword(true)} className='text-xs bg-[#FFCE42] py-1 px-4 leading-tight rounded-md'>Change</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* // to  change phone No. */}
        <div className={`absolute flex justify-center items-center z-[999] w-[100vw] h-[92vh] ${editPhoneNo ? "" : "hidden"}`} style={{ backdropFilter: "brightness(0.3)" }}>
          <div className='w-[85vw] h-[50vh] md:w-[50vw] bg-white relative flex justify-center items-center' ref={editPhoneNoRef}>
            <svg className='absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8' onClick={() => setEditPhonNo(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
            <form onSubmit={handleSubmitPhone} className="space-y-4 w-full sm:w-[70%] p-6">
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  onChange={handleChangePhoneNo}
                  value={formDataPhone.phoneNo}
                  name="phoneNo"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFCE42] w-full"
                  placeholder="Phone Number..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm Password<span className='text-red-900 text-lg'>*</span></label>
                <Input.Password
                  type="text"
                  name="password"
                  value={formDataPhone.password}
                  onChange={handleChangePhoneNo}
                  className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                  required
                />
              </div>

              <div className='flex w-full justify-end gap-4'>
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  type='submit'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* // to change Name and Email */}
        <div className={`absolute flex justify-center items-center z-[999] w-[100vw] h-[92vh] ${editProfile ? "" : "hidden"}`} style={{ backdropFilter: "brightness(0.3)" }}>
          <div className='w-[85vw] h-[60vh] md:w-[50vw] bg-white relative flex justify-center items-center' ref={editProfileRef}>
            <svg className='absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8' onClick={() => setEditProfile(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
            <form onSubmit={handleSubmit} className="space-y-4 w-full sm:w-[70%] p-6">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm Password<span className='text-red-800 text-lg'>*</span></label>
                <Input.Password
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                  required
                />
              </div>
              <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600'>Update</button>
            </form>
          </div>
        </div>

        {/* Update Password Modal */}
      <div className={`absolute flex justify-center items-center z-[999] w-[100vw] h-[92vh] ${editPassword ? "" : "hidden"}`} style={{ backdropFilter: "brightness(0.3)" }}>
        <div className='w-[85vw] h-[50vh] md:w-[50vw] bg-white relative flex justify-center items-center' ref={editPasswordRef}>
          <svg className='absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8' onClick={() => setEditPassword(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
          <form onSubmit={handleSubmitPassword} className="space-y-4 w-full sm:w-[70%] p-6">
            <div>
              <label className="block text-sm font-medium">Old Password<span className='text-red-900 text-lg'>*</span></label>
              <Input.Password
                type="text"
                name="password"
                value={formDataPassword.password}
                onChange={handleChangePassword}
                className="w-full border rounded-lg p-2 bg-gray-100"
                required
                placeholder="Enter Old Password..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium">New Password<span className='text-red-900 text-lg'>*</span></label>
              <Input.Password
                type="text"
                name="newPassword"
                value={formDataPassword.newPassword}
                onChange={handleChangePassword}
                className="w-full border rounded-lg p-2 bg-gray-100"
                required
                placeholder="Enter New Password..."
              />
            </div>
            <div className='flex w-full justify-end gap-4'>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" type='submit'>
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>

      </div>
    </>
  )
}

export default Profile;