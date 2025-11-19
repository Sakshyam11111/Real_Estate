// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X, Home, Search, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const NavLink = ({ to, children, onClick }) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
        className={`relative font-medium transition-all duration-300 group ${
          isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
        }`}
      >
        {children}
        <span
          className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transform origin-left transition-transform duration-300 ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        ></span>
      </Link>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 group"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
                <Home size={20} className="text-white" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 font-bold text-2xl">
                Basobaas
              </span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8 ml-12">
              <NavLink to="/buy">Buy</NavLink>
              <NavLink to="/rent">Rent</NavLink>
              <NavLink to="/advertise">Advertise</NavLink>
              <NavLink to="/toolpage">Tools</NavLink>
              <NavLink to="/blog">Blog</NavLink>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <button className="hidden md:flex p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300">
              <Search size={20} />
            </button>
            <button className="hidden md:flex p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            <Link
              to="/postpropertypage"
              className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 font-medium"
            >
              <span>POST PROPERTY</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">FREE</span>
            </Link>

            {user ? (
              <div className="hidden lg:flex items-center space-x-3">
                <button className="flex items-center space-x-2 border-2 border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-all duration-300 font-medium">
                  <User size={18} />
                  <span>{user.name || 'Profile'}</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 border-2 border-red-200 text-red-600 px-5 py-2.5 rounded-lg hover:border-red-600 hover:bg-red-50 transition-all duration-300 font-medium"
                >
                  <LogOut size={18} />
                  <span>SIGN OUT</span>
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="hidden lg:flex items-center space-x-2 border-2 border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-all duration-300 font-medium"
              >
                <User size={18} />
                <span>SIGN IN / SIGN UP</span>
              </Link>
            )}

            <button
              className="lg:hidden p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 px-4 py-4 space-y-1">
          <Link
            to="/buy"
            className="block py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
          >
            Buy
          </Link>
          <Link
            to="/rent"
            className="block py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
          >
            Rent
          </Link>
          <Link
            to="/advertise"
            className="block py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
          >
            Advertise
          </Link>
          <Link
            to="/toolpage"
            className="block py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
          >
            Tools
          </Link>
          <Link
            to="/blog"
            className="block py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
          >
            Blog
          </Link>

          <div className="pt-4 space-y-2 border-t border-gray-200">
            <Link
              to="/postpropertypage"
              className="w-full block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-center"
            >
              POST PROPERTY - FREE
            </Link>
            
            {user ? (
              <div className="w-full text-center space-y-2">
                <button className="w-full flex items-center justify-center space-x-2 border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-all duration-300 font-medium">
                  <User size={18} />
                  <span>{user.name || 'Profile'}</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center space-x-2 border-2 border-red-200 text-red-600 px-4 py-3 rounded-lg hover:border-red-600 hover:bg-red-50 transition-all duration-300 font-medium"
                >
                  <LogOut size={18} />
                  <span>SIGN OUT</span>
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="w-full flex items-center justify-center space-x-2 border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-all duration-300 font-medium"
              >
                <User size={18} />
                <span>SIGN IN / SIGN UP</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;