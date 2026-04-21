import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Leaf, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: 'Dates', img: 'https://images.unsplash.com/photo-1540327915484-90c897ad1bc7?auto=format&fit=crop&q=80&w=200' },
    { name: 'Nuts', img: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80&w=200' },
    { name: 'Combos', img: 'https://images.unsplash.com/photo-1536627242631-295ff8f4dc3e?auto=format&fit=crop&q=80&w=200' },
    { name: 'Makhana', img: 'https://images.unsplash.com/photo-1626071466175-79aba92ad20b?auto=format&fit=crop&q=80&w=200' },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 pt-8">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-primary-light rounded-[40px] overflow-hidden">
            <div className="p-10 md:p-20 flex flex-col gap-6">
               <div className="flex items-center gap-2 text-accent bg-white/50 w-fit px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                  <Sparkles size={16} /> 100% Natural & Organic
               </div>
               <h1 className="text-5xl md:text-7xl font-bold text-primary leading-tight">
                  Healthy Snacking <br /> 
                  <span className="text-secondary italic">Perfected.</span>
               </h1>
               <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                  Discover our premium collection of hand-picked Dates, crunchy Nuts, and guilt-free snacks. Sourced directly from farms.
               </p>
               <div className="flex gap-4 mt-4">
                  <button className="gradient-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">Shop Now</button>
                  <button className="bg-white text-primary px-8 py-4 rounded-2xl font-bold border border-primary/10 hover:bg-gray-50 transition-all">Learn More</button>
               </div>
            </div>
            <div className="relative h-full flex items-center justify-center p-10">
               <div className="absolute w-[80%] h-[80%] bg-accent/20 rounded-full blur-[100px]"></div>
               <img 
                 src="https://res.cloudinary.com/demo/image/upload/v1652345678/nuts-hero.png" 
                 alt="Premium Nuts" 
                 className="relative z-10 w-full max-w-md drop-shadow-[0_20px_50px_rgba(107,68,35,0.3)] animate-float"
                 onError={(e) => e.target.src = "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80&w=800"}
               />
            </div>
         </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
          <button className="flex items-center gap-2 text-accent font-bold group">
            View All <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/?category=${cat.name}`} className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-white text-xl font-bold">{cat.name}</span>
                <span className="text-white/70 text-sm">Explore Collection</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-12 bg-white rounded-[40px] py-20 border border-gray-50 shadow-2xl shadow-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Bestsellers</h2>
          <p className="text-gray-500">The most loved dates and nuts by our health-conscious community. Guaranteed freshness in every bite.</p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse bg-gray-100 h-80 rounded-3xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter(p => p.isFeatured).map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: <Leaf className="text-green-500" size={32} />, title: "100% Organic", desc: "Sourced directly from certified organic farms" },
          { icon: <Truck className="text-blue-500" size={32} />, title: "Fast Delivery", desc: "Delivering across India within 3-5 business days" },
          { icon: <ShieldCheck className="text-primary" size={32} />, title: "Premium Quality", desc: "Rigorous quality checks for every single pack" },
          { icon: <Sparkles className="text-accent" size={32} />, title: "No Preservatives", desc: "Pure products with absolutely zero additives" },
        ].map((badge, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-4 p-8 bg-white rounded-[40px] shadow-sm border border-gray-50 hover:shadow-xl transition-all hover:scale-105">
            <div className="bg-gray-50 p-4 rounded-2xl">{badge.icon}</div>
            <h3 className="font-bold text-lg">{badge.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{badge.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
