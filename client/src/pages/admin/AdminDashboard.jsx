import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { TrendingUp, Package, ShoppingCart, DollarSign, ArrowUpRight, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data: products } = await axios.get('http://localhost:5000/api/products');
        const { data: orders } = await axios.get('http://localhost:5000/api/orders', config);
        
        setStats({
          products: products.length,
          orders: orders.length,
          revenue: orders.reduce((acc, o) => acc + o.totalPrice, 0),
        });
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userInfo, navigate]);

  const cards = [
    { title: 'Total Revenue', value: `₹${stats.revenue}`, icon: <DollarSign className="text-green-500" />, trend: '+12.5%', color: 'bg-green-50' },
    { title: 'Total Orders', value: stats.orders, icon: <ShoppingCart className="text-blue-500" />, trend: '+5.4%', color: 'bg-blue-50' },
    { title: 'Total Products', value: stats.products, icon: <Package className="text-orange-500" />, trend: 'Active', color: 'bg-orange-50' },
    { title: 'Growth Score', value: '88/100', icon: <TrendingUp className="text-purple-500" />, trend: 'Excellent', color: 'bg-purple-50' },
  ];

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <AdminSidebar />
      
      <div className="flex-grow p-10 flex flex-col gap-10">
         <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-400 font-medium">Welcome back, {userInfo?.name}! Here's what's happening today.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((card, i) => (
               <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-6 hover:shadow-xl hover:shadow-primary/5 transition-all">
                  <div className="flex justify-between items-start">
                     <div className={`${card.color} p-4 rounded-2xl`}>{card.icon}</div>
                     <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${card.trend.includes('+') ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        {card.trend}
                     </span>
                  </div>
                  <div>
                     <p className="text-sm font-bold text-gray-400 mb-1">{card.title}</p>
                     <p className="text-3xl font-black text-primary">{card.value}</p>
                  </div>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 flex flex-col gap-8">
                <div className="flex justify-between items-center">
                   <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <Clock className="text-accent" /> Recent Orders
                   </h3>
                   <button onClick={() => navigate('/admin/orders')} className="text-sm font-bold text-primary hover:underline">View All</button>
                </div>
                
                <div className="overflow-hidden">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-50">
                            <th className="pb-4 pt-4 px-4 font-bold">Order ID</th>
                            <th className="pb-4 pt-4 px-4 font-bold">Customer</th>
                            <th className="pb-4 pt-4 px-4 font-bold">Status</th>
                            <th className="pb-4 pt-4 px-4 font-bold">Total</th>
                            <th className="pb-4 pt-4 px-4 font-bold">Action</th>
                         </tr>
                      </thead>
                      <tbody className="text-sm">
                         {recentOrders.map(order => (
                            <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                               <td className="py-5 px-4 font-bold text-gray-400 italic">#{order._id.substring(18)}</td>
                               <td className="py-5 px-4 font-bold text-gray-700">{order.customerDetails.name}</td>
                               <td className="py-5 px-4">
                                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                                     order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                                     order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                                  }`}>
                                     {order.status}
                                  </span>
                               </td>
                               <td className="py-5 px-4 font-bold text-primary">₹{order.totalPrice}</td>
                               <td className="py-5 px-4">
                                  <button className="text-accent hover:bg-accent/10 p-2 rounded-lg transition-all">
                                     <ArrowUpRight size={18} />
                                  </button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
            </div>

            <div className="bg-primary text-white rounded-[40px] p-8 flex flex-col gap-8">
               <h3 className="text-xl font-bold flex items-center gap-3">
                  <Package className="text-accent" /> Low Stock Alerts
               </h3>
               <div className="flex flex-col gap-4">
                  <div className="p-5 bg-white/10 rounded-3xl border border-white/5">
                     <p className="text-sm font-bold text-white/50 mb-2">Medjool Dates</p>
                     <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold">4 units left</span>
                        <span className="text-[10px] bg-red-500 text-white px-2 py-1 rounded-full font-bold">CRITICAL</span>
                     </div>
                  </div>
                  <div className="p-5 bg-white/10 rounded-3xl border border-white/5">
                     <p className="text-sm font-bold text-white/50 mb-2">Roasted Makhana</p>
                     <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold">12 units left</span>
                        <span className="text-[10px] bg-orange-500 text-white px-2 py-1 rounded-full font-bold">WARNING</span>
                     </div>
                  </div>
               </div>
               <button onClick={() => navigate('/admin/products')} className="mt-auto w-full bg-white text-primary py-4 rounded-2xl font-bold shadow-xl">Manage Inventory</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
