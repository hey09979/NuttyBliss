import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { ChevronLeft, ShoppingCart, Star, Heart, Share2, ShieldCheck, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Added to cart!');
    navigate('/cart');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all">
        <ChevronLeft size={20} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="relative group">
          <div className="aspect-square bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-xl p-4">
             <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="absolute top-8 right-8 flex flex-col gap-4">
             <button className="p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-gray-400 hover:text-red-500 hover:scale-110 transition-all"><Heart size={24} /></button>
             <button className="p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-gray-400 hover:text-primary hover:scale-110 transition-all"><Share2 size={24} /></button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="bg-primary-light text-primary font-bold px-4 py-1 rounded-full text-xs w-fit uppercase tracking-wider">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1 text-accent">
                 <Star size={18} fill="currentColor" />
                 <Star size={18} fill="currentColor" />
                 <Star size={18} fill="currentColor" />
                 <Star size={18} fill="currentColor" />
                 <Star size={18} fill="currentColor" />
                 <span className="text-gray-900 font-bold ml-2">5.0</span>
               </div>
               <span className="text-gray-400 text-sm">{product.numReviews} Global Reviews</span>
            </div>
          </div>

          <div className="flex items-end gap-4 border-y border-gray-100 py-6">
            <span className="text-4xl font-bold text-primary">₹{product.price}</span>
            {product.originalPrice > product.price && (
               <span className="text-xl text-gray-400 line-through mb-1">₹{product.originalPrice}</span>
            )}
            <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-lg text-sm mb-1">
              Save ₹{product.originalPrice - product.price}
            </span>
          </div>

          <p className="text-gray-500 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="text-green-500" />
                <div>
                   <h5 className="font-bold text-sm">Quality Guaranteed</h5>
                   <p className="text-[10px] text-gray-400">100% replacement available</p>
                </div>
             </div>
             <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                <MapPin className="text-blue-500" />
                <div>
                   <h5 className="font-bold text-sm">Ready to Ship</h5>
                   <p className="text-[10px] text-gray-400">Directly from farm to you</p>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center bg-gray-100 rounded-2xl p-1">
              <button 
                className="w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-white rounded-xl transition-all"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >-</button>
              <span className="w-10 text-center font-bold text-lg">{qty}</span>
              <button 
                className="w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-white rounded-xl transition-all"
                onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
              >+</button>
            </div>

            <button 
              className="flex-grow gradient-primary text-white h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              <ShoppingCart size={22} /> Add to Cart
            </button>
          </div>

          {product.countInStock > 0 ? (
            <p className="text-green-600 text-sm font-bold flex items-center gap-2">
               <span className="w-2 h-2 bg-green-600 rounded-full animate-ping"></span> In Stock - Available for delivery
            </p>
          ) : (
            <p className="text-red-500 text-sm font-bold">Out of Stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
