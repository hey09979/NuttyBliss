import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setCredentials } from '../slices/authSlice';
import { Lock, Mail, ChevronRight, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      dispatch(setCredentials({ ...data }));
      toast.success('Welcome back!');
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-primary-light/30">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 flex flex-col gap-8">
         <div className="text-center flex flex-col gap-2">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto shadow-xl mb-4">NB</div>
            <h1 className="text-3xl font-bold text-primary">Admin Access</h1>
            <p className="text-gray-400">Sign in to manage your nutty empire</p>
         </div>

         <form onSubmit={submitHandler} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-gray-500 ml-1">Email Address</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@site.com" 
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium" 
                  />
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-gray-500 ml-1">Password</label>
               <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium" 
                  />
               </div>
            </div>

            <button 
              type="submit"
              className="gradient-primary text-white h-16 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all mt-4"
            >
              Sign In <ChevronRight size={22} />
            </button>
         </form>

         <div className="flex flex-col gap-4 text-center mt-4">
            <p className="text-xs text-gray-400 leading-relaxed italic">
               "Nuts about quality. Crazy about freshness."
            </p>
            <p className="text-xs text-gray-300 font-medium">Use admin@site.com / admin123 to login</p>
         </div>
      </div>
    </div>
  );
};

export default LoginPage;
