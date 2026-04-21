import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { ShoppingBag, Search, ExternalLink, Filter, ChevronDown, CheckCircle2, Clock, Truck, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const { userInfo } = useSelector((state) => state.auth);

  const fetchOrders = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/orders', config);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatusHandler = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, config);
      toast.success(`Order marked as ${status}`);
      fetchOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredOrders = filter === 'All' 
    ? orders 
    : orders.filter(o => o.status === filter);

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <AdminSidebar />
      
      <div className="flex-grow p-10 flex flex-col gap-10">
         <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
               <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
               <p className="text-gray-400 font-medium">Track and update customer orders in real-time.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center bg-white border border-gray-100 rounded-2xl px-4 py-3 gap-3 shadow-sm">
                  <Filter size={18} className="text-gray-400" />
                  <select 
                    className="bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-700 outline-none pr-8"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                     <option>All</option>
                     <option>Pending</option>
                     <option>Confirmed</option>
                     <option>Shipped</option>
                     <option>Delivered</option>
                  </select>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 gap-6">
            {filteredOrders.map((order) => (
               <div key={order._id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="flex flex-col gap-2 min-w-[200px]">
                     <div className="flex items-center gap-2">
                        <span className="text-gray-400 italic text-sm font-bold">#{order._id.substring(18)}</span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                           order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                           order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                           {order.status}
                        </span>
                     </div>
                     <span className="text-lg font-black text-gray-800">{order.customerDetails.name}</span>
                     <span className="text-xs text-gray-400 font-medium">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</span>
                  </div>

                  <div className="flex-grow flex flex-col gap-1">
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Items Detail</span>
                     <div className="flex flex-wrap gap-2 mt-1">
                        {order.orderItems.map((item, i) => (
                           <div key={i} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                              <img src={item.image} className="w-6 h-6 rounded-md object-cover" />
                              <span className="text-xs font-bold text-gray-700">{item.qty}x {item.name}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="flex flex-col gap-1 md:text-right min-w-[150px]">
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Revenue</span>
                     <span className="text-2xl font-black text-primary">₹{order.totalPrice}</span>
                     <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">COD Priority</span>
                  </div>

                  <div className="flex items-center gap-3 md:border-l md:border-gray-50 md:pl-8">
                     <div className="relative group">
                        <button className="gradient-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95">
                           Update <ChevronDown size={18} />
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 py-2 overflow-hidden">
                           {[
                              { label: 'Pending', icon: <Clock size={14} />, color: 'text-yellow-500' },
                              { label: 'Confirmed', icon: <CheckCircle2 size={14} />, color: 'text-blue-500' },
                              { label: 'Shipped', icon: <Truck size={14} />, color: 'text-purple-500' },
                              { label: 'Delivered', icon: <CheckCircle2 size={14} />, color: 'text-green-500' },
                              { label: 'Cancelled', icon: <XCircle size={14} />, color: 'text-red-500' },
                           ].map(st => (
                              <button 
                                 key={st.label}
                                 onClick={() => updateStatusHandler(order._id, st.label)}
                                 className="w-full text-left px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                 <span className={st.color}>{st.icon}</span> {st.label}
                              </button>
                           ))}
                        </div>
                     </div>
                     <button className="p-3 text-accent hover:bg-accent/10 rounded-xl transition-all">
                        <ExternalLink size={20} />
                     </button>
                  </div>
               </div>
            ))}

            {filteredOrders.length === 0 && (
               <div className="py-20 flex flex-col items-center justify-center text-center gap-4 bg-white rounded-[40px] border border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                     <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-400">No orders found in this category</h3>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default AdminOrderList;
