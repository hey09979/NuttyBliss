const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // User might not be logged in for simple guest orders, but user details are required
    },
    customerDetails: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    itemsPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    status: {
      type: String,
      required: true,
      default: 'Pending',
      enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    },
    isPaid: { type: Boolean, required: true, default: false },
    whatsappSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
