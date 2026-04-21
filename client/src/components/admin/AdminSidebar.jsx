import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';

const AdminSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const links = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 h-[calc(100vh-80px)] sticky top-20">
      <div className="flex flex-col gap-2 mb-10 text-xs font-bold text-gray-400 uppercase tracking-widest px-4">
         Main Menu
      </div>
      
      <div className="flex flex-col gap-2 flex-grow">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
              location.pathname === link.path
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
            }`}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </div>

      <div className="pt-8 border-t border-gray-50 flex flex-col gap-4">
        <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 font-bold hover:text-accent transition-all">
           <Settings size={20} /> Store Front
        </Link>
        <button 
          onClick={() => dispatch(logout())}
          className="flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
