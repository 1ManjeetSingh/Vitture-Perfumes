import React from 'react'
import { Form, message, Input } from 'antd';
import { RiLoginCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }
      )

      if (!response.ok) {
        const errorData = await response.json();
        message.error(errorData.message || "Invalid credentials");
        return;
      }
      
      const data = await response.json();

      login(data);
      
      message.success(data.message);

      setTimeout(() => {
        navigate(-1);
      }, 1000);

    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gradient-to-r from-black via-gray-900 to-yellow-500">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-[400px]">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-white flex items-center gap-2">
            LOGIN <RiLoginCircleLine className="text-yellow-400" />
          </h1>
          <div className="border-b-2 border-gray-400 my-3"></div>

          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item name="email" label={<span className="text-white">Email / Phone No.</span>}>
              <Input type="text" className="p-2 rounded-md" placeholder="Enter your email / phone" />
            </Form.Item>

            <Form.Item name="password" label={<span className="text-white">Password</span>}>
              <Input.Password className="p-2 rounded-md" placeholder="Enter your password" />
            </Form.Item>

            <div className="flex flex-col gap-3 mt-2">
              <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold p-2 rounded-lg">
                Login
              </button>
              <Link to="/register" className="text-yellow-300 hover:text-yellow-400 text-center">
                Not a member? Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;