import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Heart,
  ArrowRight,
  Filter,
  PhoneCall,
  MessageSquare,
  Send,
  Star,
  ThumbsUp,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle,
  Clock,
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

  // Feedback State
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: '',
    feedbackType: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: 'Rajesh Sharma',
      rating: 5,
      date: '2024-11-10',
      type: 'property',
      comment: 'Excellent service! Found my dream apartment in Kathmandu within a week.',
      status: 'resolved',
      likes: 12
    },
    {
      id: 2,
      name: 'Sita Devi',
      rating: 4,
      date: '2024-11-12',
      type: 'service',
      comment: 'Good platform with many listings. Would appreciate more filter options.',
      status: 'pending',
      likes: 8
    },
    {
      id: 3,
      name: 'Amit Kumar',
      rating: 5,
      date: '2024-11-14',
      type: 'general',
      comment: 'Amazing experience! The virtual tours feature is fantastic.',
      status: 'resolved',
      likes: 15
    }
  ]);

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

  const categories = [
    { name: 'House', icon: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=100&h=100&fit=crop' },
    { name: 'Land', icon: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop' },
    { name: 'Flat', icon: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=100&fit=crop' },
    { name: 'Apartment', icon: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&h=100&fit=crop' },
    { name: 'Business', icon: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop' },
    { name: 'Office Space', icon: 'https://i.pinimg.com/736x/1c/8b/65/1c8b65341e984b0f8ba411c6c22d6b1a.jpg' },
    { name: 'Hostel', icon: 'https://i.pinimg.com/736x/67/dc/19/67dc19749c36138eec9a7dc4318b32da.jpg' },
  ];

  // Feedback Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      id: feedbacks.length + 1,
      name: formData.name,
      rating,
      date: new Date().toISOString().split('T')[0],
      type: formData.feedbackType,
      comment: formData.message,
      status: 'pending',
      likes: 0
    };
    setFeedbacks([newFeedback, ...feedbacks]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', propertyInterest: '', feedbackType: 'general', message: '' });
      setRating(0);
    }, 3000);
  };

  const handleLike = (id) => {
    setFeedbacks(prev => prev.map(fb => fb.id === id ? { ...fb, likes: fb.likes + 1 } : fb));
  };

  const filteredFeedbacks = activeFilter === 'all' 
    ? feedbacks 
    : feedbacks.filter(fb => fb.type === activeFilter);

  const feedbackTypes = [
    { value: 'general', label: 'General Feedback', icon: MessageSquare },
    { value: 'property', label: 'Property Related', icon: Building },
    { value: 'service', label: 'Service Quality', icon: Star },
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

      {/* Properties Section */}
      <main className="container mx-auto px-4 py-12">
        <motion.div className="flex justify-end mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl font-semibold flex items-center gap-2"
          >
            <span>VIEW ALL</span>
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                      <div className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        Featured
                      </div>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
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
                      className={`p-1.5 rounded-full shadow-lg transition-all ${
                        savedProperties.includes(property.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/90 text-gray-700 hover:bg-white'
                      }`}
                    >
                      <Heart size={16} fill={savedProperties.includes(property.id) ? 'currentColor' : 'none'} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
                    >
                      <PhoneCall size={16} />
                    </motion.button>
                  </div>
                  <div className="absolute bottom-2 right-4 text-xs text-white bg-black/50 px-2 py-1 rounded">
                    1/5
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    {formatPrice(property.price, property.priceType)}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3 line-clamp-2">
                    {property.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3 flex items-center gap-1">
                    <MapPin size={12} className="text-green-600" />
                    {property.location}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <span className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">B</span>
                      {property.beds || 'N/A'}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">B</span>
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
                      onClick={() => navigate(`/property/${property.id}`)}
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

      {/* FEEDBACK SECTION */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-extrabold mb-4">Share Your Feedback</h2>
            <p className="text-xl text-green-100">Help us improve your experience</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Feedback Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Send className="text-green-600" size={28} />
                Leave a Review
              </h3>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-50 border border-green-500 rounded-xl p-4 mb-6 flex items-center gap-3"
                  >
                    <CheckCircle className="text-green-600" size={24} />
                    <p className="font-semibold text-green-800">Thank you! Your feedback has been submitted.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        size={36}
                        className={`transition-colors ${
                          star <= (hoverRating || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="tel"
                    placeholder="Phone (Optional)"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {feedbackTypes.map(type => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, feedbackType: type.value })}
                      className={`py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1 ${
                        formData.feedbackType === type.value
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <type.icon size={16} />
                      {type.label}
                    </button>
                  ))}
                </div>

                <textarea
                  required
                  rows={4}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none text-black"
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Submit Feedback
                </motion.button>
              </form>
            </motion.div>

            {/* Recent Reviews */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Reviews</h3>

              <div className="flex gap-2 mb-6 flex-wrap">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  All
                </button>
                {feedbackTypes.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setActiveFilter(t.value)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeFilter === t.value ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                <AnimatePresence>
                  {filteredFeedbacks.map((fb, i) => (
                    <motion.div
                      key={fb.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-r from-gray-50 to-green-50 rounded-xl p-5 border"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                            {fb.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{fb.name}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(fb.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          fb.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {fb.status === 'resolved' ? 'Resolved' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < fb.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 text-sm mb-3">{fb.comment}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {feedbackTypes.find(t => t.value === fb.type)?.label}
                        </span>
                        <button
                          onClick={() => handleLike(fb.id)}
                          className="flex items-center gap-1 text-gray-600 hover:text-green-600 text-sm"
                        >
                          <ThumbsUp size={14} />
                          {fb.likes}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;