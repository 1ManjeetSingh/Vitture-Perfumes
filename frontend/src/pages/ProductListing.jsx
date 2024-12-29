import React, { useState } from 'react';
import axios from 'axios';
import '../styles/productlisting.css';

const ProductListing = () => {
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        flavour: '',
        price: '',
        discount: '',
        description: '',
    });

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages(selectedFiles);
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
        <div className="product-listing-container">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="product-form">
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
    );
};

export default ProductListing;
