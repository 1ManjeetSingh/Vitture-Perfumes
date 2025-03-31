import { useState } from "react";

const Address = () => {
    const [addAddress, setAddAddress] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    const dummyAddress = [
        {
            "country": "India",
            "fullName": "Rahul Sharma",
            "mobileNumber": "9876543210",
            "pincode": "110001",
            "house": "Flat 12B, Tower 5",
            "area": "Connaught Place",
            "landmark": "Near Central Park",
            "city": "New Delhi",
            "state": "Delhi",
            isDefault: true,
        },
        {
            "country": "India",
            "fullName": "Priya Mehta",
            "mobileNumber": "9823456789",
            "pincode": "400001",
            "house": "House No. 25, Green Residency",
            "area": "Marine Drive",
            "landmark": "Opposite Oberoi Hotel",
            "city": "Mumbai",
            "state": "Maharashtra",
            isDefault: false,
        },
        {
            "country": "India",
            "fullName": "Amit Kumar",
            "mobileNumber": "9900123456",
            "pincode": "560001",
            "house": "Apartment 3C, Blue Horizon",
            "area": "MG Road",
            "landmark": "Near Brigade Towers",
            "city": "Bangalore",
            "state": "Karnataka",
            isDefault: false,
        },
        {
            "country": "India",
            "fullName": "Sanya Verma",
            "mobileNumber": "9811122334",
            "pincode": "600001",
            "house": "Villa 22, Orchid Enclave",
            "area": "Anna Nagar",
            "landmark": "Near Tower Park",
            "city": "Chennai",
            "state": "Tamil Nadu",
            isDefault: false,
        },
        {
            "country": "India",
            "fullName": "Rajesh Iyer",
            "mobileNumber": "9876001234",
            "pincode": "700001",
            "house": "Flat No. 9, Sunshine Towers",
            "area": "Park Street",
            "landmark": "Opposite Flurys Bakery",
            "city": "Kolkata",
            "state": "West Bengal",
            isDefault: false,
        }
    ]

    return (
        <>
            <div className='flex w-full h-[92vh] gap-6'>

                <div className='left-space h-full w-[220px]'>
                </div>

                <div className='w-full overflow-y-auto h-full px-10'>
                    {addAddress == false ? <div className="flex flex-wrap w-full p-2 gap-4">
                        <div className="flex flex-col items-center justify-center w-[250px] h-[250px] rounded-md border border-dotted border-gray-400 cursor-pointer" onClick={() => { setAddAddress(true) }}>
                            <p className="text-2xl text-gray-700">Add Address</p>
                            <p className="text-4xl text-gray-700">+</p>
                        </div>
                        {dummyAddress.map((address, index) => (
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
                                {!address.isDefault==false ? <button>✅</button> :
                                    <button>Make Default</button>
                                }
                                </div>
                            </div>
                        ))}
                    </div> :
                        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Country */}
                                <div>
                                    <label className="block text-sm font-medium">Country/Region</label>
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
