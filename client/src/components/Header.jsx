import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '../slices/authSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 glass shadow-sm py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-all">NB</div>
          <span className="text-2xl font-bold tracking-tight text-primary">Nutty<span className="text-accent">Bliss</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/?category=Dates" className="hover:text-accent transition-colors">Dates</Link>
          <Link to="/?category=Nuts" className="hover:text-accent transition-colors">Nuts</Link>
          <Link to="/?category=Makhana" className="hover:text-accent transition-colors">Makhana</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-accent transition-all">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search nuts & dates..." className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-48 outline-none" />
          </div>

          <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-all">
            <ShoppingCart size={24} className="text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="relative group">
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-all">
                <User size={24} className="text-primary" />
                <span className="hidden md:block text-sm font-semibold">{userInfo.name.split(' ')[0]}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 overflow-hidden">
                {userInfo.isAdmin && (
                  <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">Admin Dashboard</Link>
                )}
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">My Profile</Link>
                <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full transition-all">
              <User size={24} className="text-primary" />
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-white shadow-xl py-6 px-8 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-50">Home</Link>
          <Link to="/?category=Dates" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-50">Dates</Link>
          <Link to="/?category=Nuts" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-50">Nuts</Link>
          <Link to="/?category=Makhana" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-50">Makhana</Link>
          {userInfo?.isAdmin && (
             <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 text-accent">Admin Dashboard</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
