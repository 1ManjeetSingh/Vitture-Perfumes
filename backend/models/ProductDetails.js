import mongoose from "mongoose";

const ProductDetailSchema = new mongoose.Schema({
    name: { type: String, required: true },
    flavour: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    description: { type: String, required: true }, // Corrected 'discription' to 'description'
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fs.files' }], // Reference to GridFS files
});

const ProductDetails = mongoose.models.ProductDetails || mongoose.model("ProductDetails", ProductDetailSchema);

export default ProductDetails;
