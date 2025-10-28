// src/components/pages/PropertyDetails.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  PhoneCall,
  Heart,
  Home,
  Bed,
  Bath,
  Maximize,
  Compass,
  Check,
  MapPinned,
  User,
  Mail,
  MessageSquare,
  Send,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import propertiesData from '../data/properties';

const PropertyDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('idle'); 
  const navigate = useNavigate();
  const { id } = useParams();

  // ---------- Google Maps ----------
  const API_KEY = 'AIzaSyDry_E67GRVmcpgJ5YexbtHOy62M2nnxos';
  const GOOGLE_MAPS_URL = 'https://www.google.com/maps?q=27.7733889,85.3561111';
  const MAP_EMBED_URL = `https://www.google.com/maps/embed/v1/view?key=${API_KEY}&center=27.7733889,85.3561111&zoom=18`;

  // ---------- Helpers ----------
  const formatPrice = (amount) => {
    const crores = Math.floor(amount / 10000000);
    const lakhs = Math.floor((amount % 10000000) / 100000);
    let formatted = '';
    if (crores > 0) formatted += `${crores} Crore `;
    if (lakhs > 0) formatted += `${lakhs} Lakhs`;
    return formatted.trim() || '0';
  };

  const calculateEMI = (principal, rate, tenure) => {
    if (!rate || rate === 0) return Math.round(principal / tenure);
    const monthlyRate = rate / 12 / 100;
    const power = Math.pow(1 + monthlyRate, tenure);
    const emi = (principal * monthlyRate * power) / (power - 1);
    return Math.round(emi);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'location', label: 'Location' },
  ];

  // ---------- Load property ----------
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id) {
      const found = propertiesData.find((p) => p.id === parseInt(id));
      if (found) {
        const { loanAmount, interestRate, tenureMonths } = found.details.emi;
        const monthlyEMI = calculateEMI(loanAmount, interestRate || 8.5, tenureMonths);
        
        // Handle images - ensure we have an array
        const images = Array.isArray(found.images) 
          ? found.images 
          : (found.image ? [found.image] : []);
        
        setProperty({
          ...found,
          images,
          details: {
            ...found.details,
            emi: { ...found.details.emi, monthlyEMI },
          },
        });
      } else {
        navigate('/not-found', { replace: true });
      }
    }
  }, [id, navigate]);

  // ---------- Handle Form ----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      if (formData.name && formData.email && formData.phone && formData.message) {
        setFormStatus('success');
        setTimeout(() => {
          setFormStatus('idle');
          setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    }, 1500);
  };

  // ---------- Image Navigation ----------
  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </motion.div>
      </div>
    );
  }

  // ---------- Render full features ----------
  const renderFullFeatures = () => {
    return property.details.fullFeatures.map((feature, i) => {
      const updated = feature.replace(
        /<a[^>]*>Click Here for Google Map Location<\/a>/g,
        `<a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener noreferrer" class="text-green-600 hover:underline font-medium">Click Here for Google Map Location</a>`
      );
      return (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: updated }}
        />
      );
    });
  };

  // ---------- Animation Variants ----------
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  const tabContentVariants = {
    enter: { opacity: 0, y: 10 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50"
    >
      {/* HERO */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative h-[500px] overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToPreviousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </motion.button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-white w-8' 
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:bg-white transition flex items-center gap-2 text-gray-800"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back</span>
        </motion.button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute top-6 right-6"
        >
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1 ${
              property.status === 'available' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {property.status === 'available' ? 'Available' : 'Sold'}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-0 left-0 right-0 p-8 text-white"
        >
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-3">{property.title}</h1>
            <div className="flex items-center gap-2 text-lg mb-4">
              <MapPin size={20} />
              <span>{property.location}</span>
            </div>
            <div className="text-5xl font-bold">Rs {formatPrice(property.price)}</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Image Thumbnails */}
      {property.images.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto px-6 mt-6"
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {property.images.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectImage(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ${
                  index === currentImageIndex ? 'ring-2 ring-green-600' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${property.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 mt-8 relative z-10">
        {/* QUICK STATS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-2xl p-6 mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: Bed, label: 'Bedrooms', value: property.beds },
              { icon: Bath, label: 'Bathrooms', value: property.baths },
              { icon: Maximize, label: 'Built-up Area', value: property.details.builtUpArea },
              { icon: Home, label: 'Land Area', value: property.details.landArea },
              { icon: Compass, label: 'Facing', value: property.details.direction },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    i === 0
                      ? 'bg-blue-100'
                      : i === 1
                      ? 'bg-purple-100'
                      : i === 2
                      ? 'bg-green-100'
                      : i === 3
                      ? 'bg-orange-100'
                      : 'bg-red-100'
                  }`}
                >
                  <stat.icon
                    className={`${
                      i === 0
                        ? 'text-blue-600'
                        : i === 1
                        ? 'text-purple-600'
                        : i === 2
                        ? 'text-green-600'
                        : i === 3
                        ? 'text-orange-600'
                        : 'text-red-600'
                    }`}
                    size={24}
                  />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-4 mt-6 pt-6 border-t">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                isFavorite
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <motion.div
                animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              </motion.div>
              {isFavorite ? 'Saved' : 'Save Property'}
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${property.phone}`}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <PhoneCall size={20} />
              Contact Agent
            </motion.a>
          </div>
        </motion.div>

        {/* TABS + SIDEBAR */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* LEFT – TABS */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="flex border-b">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ backgroundColor: 'rgb(240, 249, 255)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 font-semibold transition ${
                      activeTab === tab.id
                        ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      variants={tabContentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{property.details.description}</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Key Highlights</h3>
                        <div className="space-y-3">
                          {property.details.highlights.map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-3 bg-green-50 p-4 rounded-lg"
                            >
                              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="text-white" size={16} />
                              </div>
                              <p className="text-gray-700">{h}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Complete Features</h3>
                        <ul className="space-y-2 list-disc list-inside text-gray-700">
                          {renderFullFeatures()}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 'details' && (
                    <motion.div
                      key="details"
                      variants={tabContentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="grid md:grid-cols-2 gap-4"
                    >
                      {Object.entries(property.details.construction).map(([k, v], i) => (
                        <motion.div
                          key={k}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="text-sm text-gray-500 mb-1 capitalize">
                            {k.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="font-semibold text-gray-800">{v}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  {activeTab === 'amenities' && (
                    <motion.div
                      key="amenities"
                      variants={tabContentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="grid grid-cols-2 md:grid-cols-3 gap-4"
                    >
                      {property.details.amenities.map((a, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-3 bg-green-50 p-3 rounded-lg cursor-default"
                        >
                          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                            <Check className="text-white" size={16} />
                          </div>
                          <span className="text-gray-700 font-medium">{a}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  {activeTab === 'location' && (
                    <motion.div
                      key="location"
                      variants={tabContentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Exact Location</h3>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative overflow-hidden rounded-xl shadow-md h-64 md:h-80"
                      >
                        <iframe
                          src={MAP_EMBED_URL}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Property Location"
                          className="rounded-xl"
                        />
                      </motion.div>
                      <div className="flex items-center justify-center mt-4">
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={GOOGLE_MAPS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                        >
                          <MapPinned size={18} />
                          Open in Google Maps
                        </motion.a>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-800 mb-3">Nearby Landmarks</h4>
                        <div className="space-y-3">
                          {property.details.locationHighlights.map((loc, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-3 bg-orange-50 p-4 rounded-lg"
                            >
                              <MapPinned className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
                              <p className="text-gray-700">{loc}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* RIGHT – SIDEBAR */}
          <div className="space-y-6">
            {/* CONTACT */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Agent</h3>
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                >
                  {property.agent[0]}
                </motion.div>
                <div>
                  <div className="font-semibold text-gray-800">{property.agent}</div>
                  <div className="text-sm text-gray-500">Licensed Agent</div>
                </div>
              </div>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${property.phone}`}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <PhoneCall size={18} />
                {property.phone}
              </motion.a>
            </motion.div>

            {/* EMI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-4">EMI Calculator</h3>
              <div className="space-y-4">
                {[
                  { label: 'Loan Amount', value: `Rs ${formatPrice(property.details.emi.loanAmount)}` },
                  { label: 'Interest Rate', value: `${property.details.emi.interestRate}% p.a.` },
                  { label: 'Tenure', value: `${property.details.emi.tenureMonths / 12} years` },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="bg-white/20 backdrop-blur-sm rounded-lg p-4"
                  >
                    <div className="text-sm opacity-90 mb-1">{item.label}</div>
                    <div className="text-xl font-bold">{item.value}</div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="bg-white rounded-lg p-4 text-green-700"
                >
                  <div className="text-sm mb-1">Monthly EMI</div>
                  <div className="text-2xl font-bold">
                    Rs {formatPrice(property.details.emi.monthlyEMI || 0)}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* LEAVE US A MESSAGE FORM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MessageSquare size={20} />
                Leave Us a Message
              </h3>

              <form onSubmit={handleSubmitMessage} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="relative">
                    <PhoneCall className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
                    placeholder="I'm interested in this property..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                    formStatus === 'submitting'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : formStatus === 'success'
                      ? 'bg-green-600'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  <AnimatePresence mode="wait">
                    {formStatus === 'submitting' && (
                      <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </motion.div>
                    )}
                    {formStatus === 'success' && (
                      <motion.div
                        key="success"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={18} />
                        Sent Successfully!
                      </motion.div>
                    )}
                    {formStatus === 'error' && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-red-600 bg-white px-3 py-1 rounded"
                      >
                        Please fill all fields
                      </motion.div>
                    )}
                    {formStatus === 'idle' && (
                      <motion.div
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Send size={18} />
                        Send Message
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;