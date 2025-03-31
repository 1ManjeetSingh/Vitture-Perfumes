import React, { useState } from 'react';
import axios from 'axios';
import '../styles/productlisting.css';
import imageCompression from 'browser-image-compression';


const ProductListing = () => {
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        flavour: '',
        price: '',
        discount: '',
        description: '',
    });

    const handleImageChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        const compressedImages = [];

        for (const file of selectedFiles) {
            const options = {
                maxSizeMB: 1,               // Maximum size of the image (1MB)
                maxWidthOrHeight: 1024,     // Resize to max 1024px width or height
                useWebWorker: true,
            };

            try {
                const compressedFile = await imageCompression(file, options);
                compressedImages.push(compressedFile);
            } catch (error) {
                console.error('Error compressing image:', error);
            }
        }

        setImages(compressedImages);  // Set compressed images to state
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Append text fields to FormData
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        // Append images to FormData
        images.forEach((image) => data.append('images', image));

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/upload/upload-product`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Upload response:', response.data);
            // Clear form and images after successful upload
            setImages([]);
            setFormData({
                name: '',
                flavour: '',
                price: '',
                discount: '',
                description: '',
            });
        } catch (error) {
            console.error('Error uploading product:', error.response?.data || error.message);
        }
    };

    return (
        <>
            <div className='flex w-full h-[92vh] gap-6'>

                <div className='left-space h-full w-[220px]'>
                </div>

                <div className="product-listing-container w-full h-full flex flex-col md:pr-8 md:pl-12 py-4 gap-4 justify-start items-center overflow-y-auto custom-scrollbar">
                    <p className='flex w-full bg-[#cecece] text-lg sm:text-2xl font-[600] h-[40px] justify-center items-center mb-2'>
                        Add New Product
                    </p>
                    <form onSubmit={handleSubmit} className="product-form w-[80%] md:w-[50%]">
                        <label htmlFor="name">Product Name</label>
                        <input id="name" type="text" value={formData.name} onChange={handleInputChange} required />

                        <label htmlFor="flavour">Fragrance Type</label>
                        <input id="flavour" type="text" value={formData.flavour} onChange={handleInputChange} required />

                        <label htmlFor="price">Price</label>
                        <input id="price" type="number" value={formData.price} onChange={handleInputChange} required />

                        <label htmlFor="discount">Discount (%)</label>
                        <input id="discount" type="number" value={formData.discount} onChange={handleInputChange} />

                        <label htmlFor="description">Description</label>
                        <textarea id="description" value={formData.description} onChange={handleInputChange} rows="4" required></textarea>

                        <label htmlFor="imageUpload">Product Images</label>
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            required
                        />

                        {/* Display selected images */}
                        <div className="image-preview">
                            {images.length > 0 && images.map((image, index) => (
                                <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="preview-image" />
                            ))}
                        </div>

                        <button type="submit" className="submit-button">Submit Product</button>
                    </form>
                </div>

            </div>
        </>

    );
};

export default ProductListing;
