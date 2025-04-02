import React from 'react'
import { Form, message, Input } from 'antd';
import { RiLoginCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/createUser`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                }
            )

            if (!response.ok) {
                console.log("Failed to register"); 
            }

            const data = await response.json();
            if(data.success){
                message.success("Registration successful");
                setTimeout(()=>{
                    navigate("/login");
                },500)
            }
            else message.error(data.message);
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen w-screen bg-gradient-to-r from-black via-gray-900 to-yellow-500">
            <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-[400px]">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-white flex items-center gap-2">
                        REGISTER <RiLoginCircleLine className="text-yellow-400" />
                    </h1>
                    <div className="border-b-2 border-gray-400 my-3"></div>

                    <Form layout="vertical" className="mt-2" onFinish={onFinish}>
                        <Form.Item name="name" label={<span className="text-white">Name</span>}>
                            <Input type="text" className="p-2 rounded-md" placeholder="Enter your Name" />
                        </Form.Item>

                        <Form.Item name="email" label={<span className="text-white">Email</span>}>
                            <Input type="text" className="p-2 rounded-md" placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item name="password" label={<span className="text-white">Password</span>}>
                            <Input.Password className="p-2 rounded-md" placeholder="Enter your password" />
                        </Form.Item>

                        <div className="flex flex-col gap-3 mt-2">
                            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold p-2 rounded-lg">
                                Register
                            </button>
                            <Link to="/login" className="text-yellow-300 hover:text-yellow-400 text-center">
                                Already a member? Login
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register;