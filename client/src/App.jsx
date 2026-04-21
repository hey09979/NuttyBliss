import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductList from './pages/admin/AdminProductList';
import AdminOrderList from './pages/admin/AdminOrderList';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProductList />} />
            <Route path="/admin/orders" element={<AdminOrderList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
