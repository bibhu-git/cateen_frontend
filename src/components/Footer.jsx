import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-6 static mt-8 bottom-0">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Info */}
        <div>
          <h2 className="text-2xl font-semibold">Canteen Management</h2>
          <p className="text-gray-400 mt-2">Effortlessly manage canteen meals and records.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
            <li><a href="/menu" className="text-gray-400 hover:text-white transition">Menu</a></li>
            <li><a href="/attendance" className="text-gray-400 hover:text-white transition">Attendance</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-white transition"><Facebook fontSize="large" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><Twitter fontSize="large" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><Instagram fontSize="large" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><LinkedIn fontSize="large" /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Canteen Management. All rights reserved.
      </div>
    </footer>
  );
}
