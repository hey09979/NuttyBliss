import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Plus, Edit2, Trash2, Search, X, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    image: '',
    category: 'Dates',
    countInStock: '',
    isFeatured: false,
  });
  const [uploading, setUploading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      description: '',
      image: '',
      category: 'Dates',
      countInStock: '',
      isFeatured: false,
    });
    setEditingProduct(null);
    setShowModal(false);
  };

  const editHandler = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      description: product.description,
      image: product.image,
      category: product.category,
      countInStock: product.countInStock,
      isFeatured: product.isFeatured,
    });
    setShowModal(true);
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting product');
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData, config);
        toast.success('Product updated');
      } else {
        await axios.post('http://localhost:5000/api/products', formData, config);
        toast.success('Product created');
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving product');
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('http://localhost:5000/api/upload', formDataUpload, config);

      setFormData({ ...formData, image: `http://localhost:5000${data}` });
      setUploading(false);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error('File upload failed');
    }
  };

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <AdminSidebar />
      
      <div className="flex-grow p-10 flex flex-col gap-10">
         <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
               <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
               <p className="text-gray-400 font-medium">Add, edit, or remove products from your catalog.</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="gradient-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all"
            >
              <Plus size={22} /> Add New Product
            </button>
         </div>

         <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden p-8 flex flex-col gap-8">
            <div className="flex items-center bg-gray-50 rounded-2xl px-6 py-4 w-full max-w-md border border-transparent focus-within:border-accent transition-all">
                <Search size={20} className="text-gray-400 outline-none" />
                <input type="text" placeholder="Search product name..." className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-full font-medium" />
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-50 font-bold">
                        <th className="pb-6 px-4">Product</th>
                        <th className="pb-6 px-4">Category</th>
                        <th className="pb-6 px-4">Price</th>
                        <th className="pb-6 px-4">Stock</th>
                        <th className="pb-6 px-4">Featured</th>
                        <th className="pb-6 px-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm">
                     {products.map((product) => (
                        <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                           <td className="py-6 px-4">
                              <div className="flex items-center gap-4">
                                 <img src={product.image} className="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                                 <span className="font-bold text-gray-700">{product.name}</span>
                              </div>
                           </td>
                           <td className="py-6 px-4">
                              <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{product.category}</span>
                           </td>
                           <td className="py-6 px-4">
                              <div className="flex flex-col">
                                 <span className="font-bold text-primary">₹{product.price}</span>
                                 <span className="text-[10px] text-gray-300 line-through">₹{product.originalPrice}</span>
                              </div>
                           </td>
                           <td className="py-6 px-4">
                              <span className={`font-bold ${product.countInStock < 10 ? 'text-red-500' : 'text-gray-600'}`}>{product.countInStock} units</span>
                           </td>
                           <td className="py-6 px-4">
                              <div className={`w-3 h-3 rounded-full ${product.isFeatured ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-gray-200'}`}></div>
                           </td>
                           <td className="py-6 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                 <button onClick={() => editHandler(product)} className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Edit2 size={18} /></button>
                                 <button onClick={() => deleteHandler(product._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      {/* Product Modal */}
      {showModal && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <div className="absolute inset-0 bg-primary-dark/40 backdrop-blur-md" onClick={resetForm}></div>
            <div className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[800px]">
               <div className="w-full md:w-2/5 bg-primary-light flex flex-col items-center justify-center p-12 text-center gap-6">
                  <div 
                     className="w-full aspect-square bg-white rounded-3xl overflow-hidden shadow-lg flex items-center justify-center relative group cursor-pointer border-2 border-dashed border-gray-100 hover:border-primary/20 transition-all"
                     onClick={() => document.getElementById('image-file').click()}
                  >
                     {uploading ? (
                        <div className="flex flex-col items-center gap-2 text-primary animate-pulse">
                           <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                           <p className="text-xs font-bold">Uploading...</p>
                        </div>
                     ) : formData.image ? (
                        <img src={formData.image} className="w-full h-full object-cover" />
                     ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-300">
                           <Camera size={48} />
                           <p className="text-sm font-bold">Upload Image</p>
                        </div>
                     )}
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-all text-xs">
                        {formData.image ? 'Change Image' : 'Select Image'}
                     </div>
                     <input 
                        type="file" 
                        id="image-file" 
                        className="hidden" 
                        onChange={uploadFileHandler} 
                     />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">{editingProduct ? 'Edit Nutty Goodness' : 'Add New Product'}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Ensure all details are accurate for the best shopping experience.</p>
               </div>
               
               <div className="flex-grow p-12 overflow-y-auto no-scrollbar">
                  <div className="flex justify-between items-center mb-10">
                     <h4 className="text-xl font-bold text-gray-800">Product Details</h4>
                     <button onClick={resetForm} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><X size={24} /></button>
                  </div>

                  <form onSubmit={submitHandler} className="grid grid-cols-2 gap-6">
                     <div className="col-span-2 flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Name</label>
                        <input 
                           name="name"
                           value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                           className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/10 outline-none font-bold" 
                           placeholder="Medjool Dates Premium"
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price (₹)</label>
                        <input 
                           type="number"
                           value={formData.price}
                           onChange={(e) => setFormData({...formData, price: e.target.value})}
                           className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/10 outline-none font-bold text-primary" 
                           placeholder="899"
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Original Price (₹)</label>
                        <input 
                           type="number"
                           value={formData.originalPrice}
                           onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                           className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/10 outline-none font-bold text-gray-400" 
                           placeholder="999"
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
                        <select 
                           value={formData.category}
                           onChange={(e) => setFormData({...formData, category: e.target.value})}
                           className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/10 outline-none font-bold"
                        >
                           <option>Dates</option>
                           <option>Nuts</option>
                           <option>Combos</option>
                           <option>Makhana</option>
                        </select>
                     </div>

                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Stock Count</label>
                        <input 
                           type="number"
                           value={formData.countInStock}
                           onChange={(e) => setFormData({...formData, countInStock: e.target.value})}
                           className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/10 outline-none font-bold" 
                           placeholder="50"
                        />
                     </div>

                     <div className="col-span-2 flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Image URL</label>
                        <input 
                           value={formData.image}
                           onChange={(e) => setFormData({...formData, image: e.target.value})}
                           className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/10 outline-none font-bold" 
                           placeholder="https://cloudinary.com/..."
                        />
                     </div>

                     <div className="col-span-2 flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                        <textarea 
                           value={formData.description}
                           onChange={(e) => setFormData({...formData, description: e.target.value})}
                           className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/10 outline-none font-medium h-32 resize-none" 
                           placeholder="Describe the product details..."
                        ></textarea>
                     </div>

                     <div className="col-span-2 flex items-center gap-4 bg-gray-50 p-6 rounded-3xl">
                        <input 
                           type="checkbox" 
                           id="featured"
                           checked={formData.isFeatured}
                           onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                           className="w-6 h-6 rounded-lg text-primary focus:ring-primary"
                        />
                        <label htmlFor="featured" className="font-bold text-gray-700">Display this product on Home Page (Featured)</label>
                     </div>

                     <div className="col-span-2 flex gap-4 mt-6">
                        <button 
                           type="button" 
                           onClick={resetForm}
                           className="flex-grow bg-gray-100 text-gray-500 py-5 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                        >Cancel</button>
                        <button 
                           type="submit" 
                           className="flex-grow-[2] gradient-primary text-white py-5 rounded-2xl font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all"
                        >
                           {editingProduct ? 'Save Changes' : 'Create Product'}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default AdminProductList;
