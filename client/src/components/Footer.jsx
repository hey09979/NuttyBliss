const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold tracking-tight">Nutty<span className="text-accent">Bliss</span></span>
          <p className="text-sm text-gray-300 leading-relaxed">
            Premium dates and nuts sourced from the finest orchards across the globe. Bringing health and happiness to your doorstep.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
            <li><a href="/shop" className="hover:text-accent transition-colors">Shop All</a></li>
            <li><a href="/track" className="hover:text-accent transition-colors">Track Order</a></li>
            <li><a href="/about" className="hover:text-accent transition-colors">Our Story</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Policies</h4>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li><a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a></li>
            <li><a href="/refund" className="hover:text-accent transition-colors">Refund Policy</a></li>
            <li><a href="/shipping" className="hover:text-accent transition-colors">Shipping Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Contact Us</h4>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li>Email: support@nuttybliss.com</li>
            <li>Phone: +91 70738 54751</li>
            <li>Address: Jaipur, Rajasthan, India</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} NuttyBliss. All rights reserved. Built with ❤️ for healthy snacking.
      </div>
    </footer>
  );
};

export default Footer;
