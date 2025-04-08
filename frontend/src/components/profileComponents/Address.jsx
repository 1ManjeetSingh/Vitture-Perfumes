import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Address = () => {
    const [addAddress, setAddAddress] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();
    const token = JSON.parse(localStorage.getItem("token"));

    // Move the selected address to the front
    const selected = user?.address.find(addr => addr.isDefault === true);
    const others = user?.address.filter(addr => addr.isDefault === false);
    const [addressArray, setAddressArray] = useState([selected, ...others]);

    const now = Date.now();


    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);

    const [formData, setFormData] = useState({
        country: "India",
        fullName: "",
        mobileNumber: "",
        pincode: "",
        house: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/addAddress`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.value}`,
                },
                body: JSON.stringify({ formData }), // wrap inside an object
            });

            if (!response.ok) {
                const data = await response.json();
                message.error(data.message);
                return;
            }

            const data = await response.json(); // Don't forget await here!

            message.success(data.message);

            user.address = data.addressArray;

            const User = {
                value: user,
                expiry: now + 3600000, // 1 hour = 3600000 ms
            };

            localStorage.setItem("user", JSON.stringify(User))

            setAddressArray(data.addressArray);
            setAddAddress(false);

        } catch (err) {
            message.error("Something went wrong: " + err.message);
        }

    };

    useEffect(() => {
        if (!addAddress) {
            setFormData({
                country: "India",
                fullName: "",
                mobileNumber: "",
                pincode: "",
                house: "",
                area: "",
                landmark: "",
                city: "",
                state: "",
            })
        }
    }, [addAddress])

    const handleMakeDefault = async (id) => {
        try {
            const updatedAddresses = user.address.map(addr => ({
                ...addr,
                isDefault: addr._id === id
            }));

            // Move the selected address to the front
            const selected = updatedAddresses.find(addr => addr._id === id);
            const others = updatedAddresses.filter(addr => addr._id !== id);
            const reordered = [selected, ...others];

            //   Send to backend to persist change
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/default-address`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token?.value}`
                },
                body: JSON.stringify({ addressId: id })
            });

            if (!response.ok) {
                throw new Error("Failed to update default address");
            }

            setAddressArray(reordered)
            user.address = reordered;
            // Update local state (if needed)
            const User = {
                value: user,
                expiry: Date.now() + 3600000, // 1 hour = 3600000 ms
            };

            localStorage.setItem("user", JSON.stringify(User));

            message.success("Default address updated");

        } catch (error) {
            message.error(error.message || "Something went wrong");
        }
    };

    const dummyAddress = [
        // {
        //     "country": "India",
        //     "fullName": "Rajesh Iyer",
        //     "mobileNumber": "9876001234",
        //     "pincode": "700001",
        //     "house": "Flat No. 9, Sunshine Towers",
        //     "area": "Park Street",
        //     "landmark": "Opposite Flurys Bakery",
        //     "city": "Kolkata",
        //     "state": "West Bengal",
        //     isDefault: false,
        // }
    ];

    return (
        <>
            <div className='flex w-full h-[92vh] gap-6'>

                <div className='left-space h-full w-[220px]'>
                </div>

                <div className='w-full overflow-y-auto h-full md:pl-10 md:pr-6 py-4'>
                    <p className='flex w-full bg-[#cecece] text-lg sm:text-2xl font-[600] h-[40px] justify-center items-center mb-2'>
                        Your Address
                    </p>
                    {addAddress == false ? <div className="flex flex-wrap w-full justify-center p-2 gap-4">
                        <div className="flex flex-col items-center justify-center w-[250px] h-[250px] rounded-md border border-dotted border-gray-400 cursor-pointer" onClick={() => { setAddAddress(true) }}>
                            <p className="text-2xl text-gray-700">Add Address</p>
                            <p className="text-4xl text-gray-700">+</p>
                        </div>
                        {addressArray?.map((address, index) => (
                            <div
                                key={index}
                                className="flex flex-col relative items-start justify-center w-[250px] h-[250px] rounded-md border border-gray-400 p-6 bg-white shadow-md"
                            >
                                <p className="text-lg font-semibold text-gray-800">{address.fullName}</p>
                                <p className="text-sm text-gray-500">{address.house}, {address.area}</p>
                                <p className="text-sm text-gray-500">{address.city}, {address.state}</p>
                                <p className="text-sm text-gray-500">{address.pincode}</p>
                                <p className="text-sm text-gray-900">Phone no. {address.mobileNumber}</p>
                                <div className='absolute bottom-2 right-3 text-md text-[#7796C6] flex gap-2 cursor-default overflow-hidden whitespace-nowrap text-ellipsis'>
                                    <button>Edit</button>
                                    <span>|</span>
                                    <span>Remove</span>
                                </div>
                                <div className='absolute top-2 right-3 text-md text-[#7796C6] flex gap-2 cursor-default overflow-hidden whitespace-nowrap text-ellipsis'>
                                    {address.isDefault == true ? <button>✅</button> :
                                        <button onClick={() => handleMakeDefault(address._id)}>Make Default</button>
                                    }
                                </div>
                            </div>
                        ))}
                    </div> :
                        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                            <h2 className="flex text-2xl font-semibold mb-6 gap-2 items-center">
                                <svg onClick={() => setAddAddress(false)} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                                Shipping Address</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Country */}
                                <div>
                                    <label className="block text-sm font-medium">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        readOnly
                                        className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg p-2"
                                    />
                                </div>

                                {/* Mobile Number */}
                                <div>
                                    <label className="block text-sm font-medium">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]{10}"
                                        className="w-full border rounded-lg p-2"
                                        placeholder="10-digit number"
                                    />
                                </div>

                                {/* Pincode */}
                                <div>
                                    <label className="block text-sm font-medium">Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]{6}"
                                        className="w-full border rounded-lg p-2"
                                        placeholder="6-digit PIN code"
                                    />
                                </div>

                                {/* House/Building */}
                                <div>
                                    <label className="block text-sm font-medium">
                                        Flat, House No., Building, Apartment
                                    </label>
                                    <input
                                        type="text"
                                        name="house"
                                        value={formData.house}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg p-2"
                                    />
                                </div>

                                {/* Area/Street */}
                                <div>
                                    <label className="block text-sm font-medium">Area, Street, Sector, Village</label>
                                    <input
                                        type="text"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg p-2"
                                    />
                                </div>

                                {/* Landmark */}
                                <div>
                                    <label className="block text-sm font-medium">Landmark (Optional)</label>
                                    <input
                                        type="text"
                                        name="landmark"
                                        value={formData.landmark}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-2"
                                        placeholder="E.g. near Apollo Hospital"
                                    />
                                </div>

                                {/* Town/City */}
                                <div>
                                    <label className="block text-sm font-medium">Town/City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg p-2"
                                    />
                                </div>

                                {/* State */}
                                <div>
                                    <label className="block text-sm font-medium">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg p-2"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-[5%]">
                                    <button
                                        type="submit"
                                        className="w-[47%] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => { setAddAddress(false) }}
                                        className="w-[47%] text-black border py-2 rounded-lg"
                                    >
                                        Discard
                                    </button>
                                </div>
                            </form>
                        </div>}
                </div>
            </div>
        </>

    );
};

export default Address;
