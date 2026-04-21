import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success(`${product.name} added to cart!`);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl hover:shadow-primary/5">
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
              {discount}% OFF
            </div>
          )}
          {product.countInStock === 0 && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col gap-2">
          <div className="flex items-center gap-1 text-accent">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold text-gray-500">{product.rating || 4.5}</span>
            <span className="text-[10px] text-gray-400">({product.numReviews || 12})</span>
          </div>
          
          <h3 className="font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{product.description}</p>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Per 500g</span>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className="w-10 h-10 gradient-primary text-white rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
