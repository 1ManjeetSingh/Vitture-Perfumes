import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ }, // Ensures 10-digit number
    pincode: { type: String, required: true, match: /^[0-9]{6}$/ }, // Indian 6-digit pincode validation
    house: { type: String, required: true }, // House/Flat Number
    area: { type: String, required: true }, // Area or locality
    landmark: { type: String }, // Optional field
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true, default: "India" }, // Default to India
    isDefault: { type: Boolean, default: false }, // Default address flag
});

const Address = mongoose.models.Address || mongoose.model("Address", AddressSchema);

export default Address;
