import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateQtyHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty: Number(qty) }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center gap-6">
        <div className="w-32 h-32 bg-primary-light rounded-full flex items-center justify-center text-primary">
           <ShoppingBag size={64} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Your basket is empty</h2>
        <p className="text-gray-500 max-w-sm">Looks like you haven't added any nutty goodness to your cart yet.</p>
        <Link to="/" className="gradient-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      <h1 className="text-4xl font-bold text-primary mb-10">Your Basket</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex gap-6 p-6 bg-white rounded-3xl border border-gray-100 items-center hover:shadow-lg transition-all group">
              <div className="w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="flex-grow flex flex-col gap-1">
                <Link to={`/product/${item._id}`} className="text-lg font-bold text-gray-800 hover:text-primary transition-colors">{item.name}</Link>
                <span className="text-sm font-bold text-accent uppercase tracking-tighter">{item.category}</span>
                <span className="text-sm text-gray-400 mt-1">₹{item.price} each</span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <button 
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:bg-white rounded-lg transition-all"
                    onClick={() => updateQtyHandler(item, Math.max(1, item.qty - 1))}
                  >-</button>
                  <span className="w-8 text-center font-bold">{item.qty}</span>
                  <button 
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:bg-white rounded-lg transition-all"
                    onClick={() => updateQtyHandler(item, Math.min(item.countInStock, item.qty + 1))}
                  >+</button>
                </div>
                
                <span className="text-xl font-bold text-primary w-20 text-right">₹{item.qty * item.price}</span>
                
                <button 
                  onClick={() => removeFromCartHandler(item._id)}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          <Link to="/" className="flex items-center gap-2 text-primary font-bold mt-4 hover:gap-3 transition-all">
             <ArrowLeft size={20} /> Add more items
          </Link>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-2xl shadow-primary/5 h-fit flex flex-col gap-6">
           <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Summary</h3>
           
           <div className="flex flex-col gap-4 text-gray-600">
              <div className="flex justify-between items-center">
                 <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                 <span className="font-bold text-gray-800">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-green-600">
                 <span>Shipping</span>
                 <span className="font-bold">FREE</span>
              </div>
              <div className="flex justify-between items-center">
                 <span>Tax</span>
                 <span className="font-bold text-gray-800">₹0.00</span>
              </div>
           </div>

           <div className="h-px bg-gray-100 my-2"></div>

           <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Total Price</span>
              <span className="text-2xl font-bold text-primary">₹{subtotal}</span>
           </div>

           <p className="text-xs text-gray-400 leading-relaxed">
             By proceeding to checkout you agree to the Terms of Service and Privacy Policy.
           </p>

           <button 
              onClick={checkoutHandler}
              className="gradient-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              Proceed to Checkout <ChevronRight size={22} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
