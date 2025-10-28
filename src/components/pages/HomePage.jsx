import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Heart,
  ArrowRight,
  Filter,
  PhoneCall,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import properties from '../data/properties';

const HomePage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [savedProperties, setSavedProperties] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  const formatPrice = (amount, type = 'standard') => {
    const formatter = new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    if (type === 'onwards') return `${formatter.format(amount)} Onwards`;
    if (type === 'perAnna') return `${formatter.format(amount)} Per Anna`;
    if (type === 'startingFrom') return `${formatter.format(amount)} Starting From`;
    return formatter.format(amount);
  };

  const handleSaveProperty = (propertyId) => {
    setSavedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'all' || property.type === filterType;

    const matchesPrice =
      priceRange === 'all' ||
      (priceRange === 'low' && property.price < 10000000) ||
      (priceRange === 'medium' && property.price >= 10000000 && property.price < 50000000) ||
      (priceRange === 'high' && property.price >= 50000000);

    return matchesSearch && matchesType && matchesPrice;
  });

  // Category data
  const categories = [
    { name: 'House', icon: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=100&h=100&fit=crop' },
    { name: 'Land', icon: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop' },
    { name: 'Flat', icon: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=100&fit=crop' },
    { name: 'Apartment', icon: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&h=100&fit=crop' },
    { name: 'Business', icon: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop' },
    { name: 'Office Space', icon: 'https://i.pinimg.com/736x/1c/8b/65/1c8b65341e984b0f8ba411c6c22d6b1a.jpg' },
    { name: 'Hostel', icon: 'https://i.pinimg.com/736x/67/dc/19/67dc19749c36138eec9a7dc4318b32da.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/2 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Housing & Apartment Projects Nepal
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-green-100">
              Browse thousands of listings in Nepalese Rupees
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-2xl shadow-2xl p-4"
            >
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by city, neighborhood, or address..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold"
                >
                  <Filter size={20} />
                  <span className="hidden md:inline">Filters</span>
                </button>
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold">
                  Search
                </button>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-700 bg-gray-50"
                        value={filterType}
                        onChange={e => setFilterType(e.target.value)}
                      >
                        <option value="all">All Types</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                        <option value="land">Land</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range (NPR)</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-gray-700 bg-gray-50"
                        value={priceRange}
                        onChange={e => setPriceRange(e.target.value)}
                      >
                        <option value="all">All Prices</option>
                        <option value="low">Under 1 Crore</option>
                        <option value="medium">1 Crore - 5 Crore</option>
                        <option value="high">Above 5 Crore</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-12"
            >
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">100+</div>
                <div className="text-green-200 text-sm uppercase tracking-wide">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">50+</div>
                <div className="text-green-200 text-sm uppercase tracking-wide">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">24/7</div>
                <div className="text-green-200 text-sm uppercase tracking-wide">Support</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Real Estate in Nepal</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer"
              >
                <div className="bg-gray-50 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-all">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-green-500 transition-colors">
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                    {cat.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Properties Section */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl font-semibold flex items-center gap-2"
          >
            <span>VIEW ALL</span>
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>

        {/* Property Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 md:h-52 object-cover"
                  />

                  {property.featured && (
                    <div className="absolute top-2 left-2">
                      <div className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        Star
                      </div>
                    </div>
                  )}

                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <span className="text-xs">Checkmark</span>
                    SALE
                  </div>

                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                    {property.type.toUpperCase()}
                  </div>

                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSaveProperty(property.id)}
                      className={`p-1.5 rounded-full shadow-lg transition-all ${savedProperties.includes(property.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/90 text-gray-700 hover:bg-white'
                        }`}
                    >
                      <Heart size={16} fill={savedProperties.includes(property.id) ? 'currentColor' : 'none'} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all"
                    >
                      <PhoneCall size={16} />
                    </motion.button>
                  </div>

                  <div className="absolute bottom-2 right-4 text-xs text-white bg-black/50 px-2 py-1 rounded">
                    1/5
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-gray-800 mb-2"
                  >
                    {formatPrice(property.price, property.priceType)}
                  </motion.div>

                  <h3 className="text-sm font-semibold text-gray-800 mb-3 line-clamp-2 leading-tight">
                    {property.title}
                  </h3>

                  <p className="text-xs text-gray-600 mb-3 flex items-center gap-1">
                    <MapPin size={12} className="text-green-600" />
                    {property.location}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <span className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">H</span>
                      {property.beds || 'N/A'}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">S</span>
                      {property.baths || 'N/A'}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">K</span>
                      1 Kitchen
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/property/${property.id}`)} // <-- NAVIGATE
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2 rounded-lg text-sm font-semibold transition-all"
                    >
                      VIEW DETAILS
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full border border-green-500 text-green-600 hover:bg-green-50 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1"
                    >
                      <PhoneCall size={14} />
                      Call Agent
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProperties.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <Search size={48} className="text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">No properties found</h3>
              <p className="text-gray-600 text-lg mb-8">
                Try adjusting your search filters to see more results
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                  setPriceRange('all');
                }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default HomePage;