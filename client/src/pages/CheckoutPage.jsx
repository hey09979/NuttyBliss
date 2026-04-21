import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart, saveCustomerDetails } from '../slices/cartSlice';
import { openWhatsApp } from '../utils/wa';
import { Send, MapPin, Phone, User as UserIcon, Receipt, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    postalCode: '',
  });

  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.postalCode) {
      toast.error('Please fill all details');
      return;
    }

    try {
      const order = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        customerDetails: formData,
        itemsPrice: totalPrice,
        shippingPrice: 0,
        totalPrice: totalPrice,
      };

      const { data } = await axios.post('http://localhost:5000/api/orders', order);
      
      toast.success('Order placed successfully!');
      
      // Send WhatsApp message
      // The admin phone is hardcoded here or could be fetched from server
      openWhatsApp(data, '+917073854751');
      
      dispatch(clearCart());
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error placing order');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      <h1 className="text-4xl font-bold text-primary mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <div className="flex flex-col gap-8">
           <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                 <MapPin className="text-accent" /> Shipping Details
              </h2>

              <form onSubmit={placeOrderHandler} className="flex flex-col gap-6">
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-500 ml-1">Full Name</label>
                    <div className="relative">
                       <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                       <input 
                         name="name"
                         placeholder="John Doe" 
                         onChange={handleChange}
                         className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-accent outline-none font-medium" 
                       />
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-500 ml-1">Phone Number</label>
                    <div className="relative">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                       <input 
                         name="phone"
                         placeholder="+91 00000 00000" 
                         onChange={handleChange}
                         className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-accent outline-none font-medium" 
                       />
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-500 ml-1">Detailed Address</label>
                    <textarea 
                      name="address"
                      placeholder="Street, Landmark, Apartment" 
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-accent outline-none font-medium h-32 resize-none"
                    ></textarea>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-500 ml-1">Zip / Postal Code</label>
                    <input 
                      name="postalCode"
                      placeholder="302012" 
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-accent outline-none font-medium" 
                    />
                 </div>

                 <div className="mt-4 p-5 bg-accent/5 rounded-2xl flex items-start gap-4 border border-accent/10">
                    <ShieldCheck className="text-accent flex-shrink-0" size={24} />
                    <p className="text-xs text-accent font-medium leading-relaxed">
                       Your order will be processed immediately. You will be redirected to WhatsApp to confirm the order with our team.
                    </p>
                 </div>
              </form>
           </div>
        </div>

        {/* Bill Summary */}
        <div className="flex flex-col gap-8 h-fit lg:sticky lg:top-32">
           <div className="p-8 bg-primary text-white rounded-[40px] shadow-2xl shadow-primary/20">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                 <Receipt className="text-accent" /> Order Summary
              </h2>

              <div className="flex flex-col gap-4 mb-8 max-h-60 overflow-y-auto no-scrollbar">
                 {cartItems.map(item => (
                   <div key={item._id} className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white/10 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={item.image} className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                            <p className="text-xs text-white/50">{item.qty} x ₹{item.price}</p>
                         </div>
                      </div>
                      <span className="font-bold">₹{item.qty * item.price}</span>
                   </div>
                 ))}
              </div>

              <div className="h-px bg-white/10 my-6"></div>

              <div className="flex flex-col gap-4">
                 <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                 </div>
                 <div className="flex justify-between text-green-400">
                    <span>Shipping</span>
                    <span>FREE</span>
                 </div>
                 <div className="flex justify-between text-2xl font-bold mt-2">
                    <span>To Pay</span>
                    <span className="text-accent">₹{totalPrice}</span>
                 </div>
              </div>

              <button 
                 onClick={placeOrderHandler}
                 className="w-full mt-10 gradient-accent text-primary-dark h-16 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
              >
                 <Send size={20} /> Place Order via WhatsApp
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
