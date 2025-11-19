import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Bed, Bath, Square, Heart, Home, DollarSign, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import rentData from '../../../src/components/data/rentData.json';

const RentPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rentRange, setRentRange] = useState([0, 200000]);
  const [propertyType, setPropertyType] = useState("all");
  const [bedrooms, setBedrooms] = useState("any");
  const [activeFilters, setActiveFilters] = useState({
    searchQuery: "",
    rentRange: [0, 200000],
    propertyType: "all",
    bedrooms: "any"
  });
  const [savedProperties, setSavedProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showFilterBadge, setShowFilterBadge] = useState(false);

  // Transform JSON data
  const properties = rentData.map(item => ({
    id: item.id,
    title: item.title,
    price: item.price,
    type: item.type,
    beds: item.beds,
    baths: item.baths,
    area: parseInt(item.area),
    location: item.location,
    image: item.image,
    status: item.status,
    featured: item.featured,
    details: {
      description: item.details.description,
      amenities: item.details.amenities || []
    }
  }));

  useEffect(() => {
    setFilteredProperties(properties);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [activeFilters]);

  const applyFilters = () => {
    let filtered = properties;

    if (activeFilters.searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(activeFilters.searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(activeFilters.searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(p =>
      p.price >= activeFilters.rentRange[0] && p.price <= activeFilters.rentRange[1]
    );

    if (activeFilters.propertyType !== "all") {
      filtered = filtered.filter(p => p.type === activeFilters.propertyType);
    }

    if (activeFilters.bedrooms !== "any") {
      const minBeds = parseInt(activeFilters.bedrooms);
      filtered = filtered.filter(p => p.beds >= minBeds);
    }

    setFilteredProperties(filtered);
  };

  const handleApplyFilters = () => {
    setActiveFilters({ searchQuery, rentRange, propertyType, bedrooms });
    setShowFilterBadge(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setRentRange([0, 200000]);
    setPropertyType("all");
    setBedrooms("any");
    setActiveFilters({
      searchQuery: "",
      rentRange: [0, 200000],
      propertyType: "all",
      bedrooms: "any"
    });
    setShowFilterBadge(false);
  };

  const hasActiveFilters = () => {
    return activeFilters.searchQuery !== "" ||
           activeFilters.rentRange[1] < 200000 ||
           activeFilters.propertyType !== "all" ||
           activeFilters.bedrooms !== "any";
  };

  const handleSaveProperty = (id) => {
    setSavedProperties(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const formatPrice = (price) => `NPR ${price.toLocaleString()}/mo`;

  const handleImageError = (e) => {
    e.target.src = `https://picsum.photos/seed/rentfallback${e.target.dataset.id}/800/600.jpg`;
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-purple-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Find a Place to Rent</h1>
          <p className="text-gray-600">Discover comfortable homes and apartments for rent across Nepal</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search location or title..."
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="studio">Studio</option>
            </select>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Max Rent:</span>
              <input
                type="range"
                min="0"
                max="200000"
                step="10000"
                value={rentRange[1]}
                onChange={(e) => setRentRange([rentRange[0], parseInt(e.target.value)])}
                className="flex-1 accent-green-600"
              />
              <span className="text-gray-600 whitespace-nowrap">{formatPrice(rentRange[1])}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApplyFilters}
              className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center relative"
            >
              <Filter size={18} className="mr-2" />
              Apply Filters
              {hasActiveFilters() && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  !
                </motion.span>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Active Filters */}
        <AnimatePresence>
          {hasActiveFilters() && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-purple-800">Active Filters:</span>
                  {activeFilters.searchQuery && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      Search: {activeFilters.searchQuery}
                    </motion.span>
                  )}
                  {activeFilters.propertyType !== "all" && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      Type: {activeFilters.propertyType}
                    </motion.span>
                  )}
                  {activeFilters.rentRange[1] < 200000 && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      Max: {formatPrice(activeFilters.rentRange[1])}
                    </motion.span>
                  )}
                  {activeFilters.bedrooms !== "any" && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      {activeFilters.bedrooms}+ Beds
                    </motion.span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetFilters}
                  className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1"
                >
                  <X size={16} />
                  Clear All
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex justify-between items-center"
        >
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-800">{filteredProperties.length}</span> properties
            {hasActiveFilters() && (
              <span className="text-sm text-gray-500 ml-2">
                (filtered from {properties.length})
              </span>
            )}
          </p>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </motion.div>

        {/* Main Layout */}
        {filteredProperties.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row gap-6"
          >
            {/* Property Cards */}
            <div className="flex-1 space-y-6">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative md:w-1/3 h-64 md:h-auto overflow-hidden">
                      <motion.img
                        src={property.image}
                        alt={property.title}
                        data-id={property.id}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={handleImageError}
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                        >
                          FOR RENT
                        </motion.div>
                        {property.featured && (
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                          >
                            FEATURED
                          </motion.div>
                        )}
                      </div>

                      {/* Save Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSaveProperty(property.id)}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                          savedProperties.includes(property.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={savedProperties.includes(property.id) ? 'white' : 'none'}
                          className="transition-all"
                        />
                      </motion.button>

                      {/* Price */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-4 left-4"
                      >
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2">
                          <p className="text-green-600 font-bold text-xl">{formatPrice(property.price)}</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl font-bold text-gray-800 mb-2"
                      >
                        {property.title}
                      </motion.h3>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        className="flex items-center text-gray-600 mb-3"
                      >
                        <MapPin size={16} className="mr-2 text-green-600" />
                        <span className="text-sm">{property.location}</span>
                      </motion.div>

                      {/* Stats */}
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-3 gap-3 mb-4"
                      >
                        {[
                          { icon: Bed, value: property.beds },
                          { icon: Bath, value: property.baths },
                          { icon: Square, value: `${property.area} sqft` }
                        ].map((stat, i) => (
                          <motion.div
                            key={i}
                            variants={itemVariants}
                            className="flex items-center bg-gray-50 rounded-lg py-2 px-3"
                          >
                            <stat.icon size={16} className="mr-1 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">{stat.value}</span>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-600 text-sm mb-4 line-clamp-2"
                      >
                        {property.details.description}
                      </motion.p>

                      {/* Amenities */}
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-wrap gap-2 mb-4"
                      >
                        {property.details.amenities.slice(0, 4).map((a, i) => (
                          <motion.span
                            key={i}
                            variants={itemVariants}
                            className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                          >
                            {a}
                          </motion.span>
                        ))}
                        {property.details.amenities.length > 4 && (
                          <motion.span
                            variants={itemVariants}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                          >
                            +{property.details.amenities.length - 4} more
                          </motion.span>
                        )}
                      </motion.div>

                      {/* Actions */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-3"
                      >
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                        >
                          View Details
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, backgroundColor: '#f0fdf4' }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                        >
                          <Phone size={16} />
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:w-80 space-y-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Filters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                    >
                      <option value="any">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                    </select>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApplyFilters}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </div>

              {/* Saved Properties */}
              <AnimatePresence>
                {savedProperties.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Saved Properties</h3>
                    <p className="text-green-600 font-medium">{savedProperties.length} saved</p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-3 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition-colors font-medium text-sm"
                    >
                      View All Saved
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <Home size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No rental properties found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResetFilters}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Reset Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RentPage;