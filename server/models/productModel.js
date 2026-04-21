const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true }, // URL from Cloudinary
    brand: { type: String, default: 'NuttyBliss' },
    category: { type: String, required: true }, // e.g., Dates, Nuts, Combos, Makhana
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    originalPrice: { type: Number, default: 0 }, // For showing discounts like Farmley
    countInStock: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
