// pages/PostPropertyPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';   // <-- ADDED
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Check, ChevronLeft, ChevronRight, X, Building, Phone} from 'lucide-react';

const PostPropertyPage = () => {
  const navigate = useNavigate();   // <-- ADDED

  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    propertyType: 'house',
    purpose: 'sell',
    title: '',
    price: '',
    description: '',

    // Step 2: Location
    city: '',
    locality: '',
    address: '',
    latitude: '',
    longitude: '',

    // Step 3: Details
    bedrooms: '',
    bathrooms: '',
    area: '',
    areaUnit: 'sqft',
    floors: '',
    yearBuilt: '',
    furnished: 'unfurnished',

    // Step 4: Amenities
    amenities: [],

    // Step 5: Contact
    name: '',
    phone: '',
    email: ''
  });

  const totalSteps = 5;

  const amenitiesList = [
    'Parking', 'Garden', 'Balcony', 'Security', 'Lift', 
    'Gym', 'Swimming Pool', 'Servant Quarter', 'Store Room',
    'Solar Power', 'Water Supply', 'Earthquake Resistant'
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  // MODIFIED: navigate instead of alert
  const handleSubmit = () => {
    // alert('Property posted successfully!');   // <-- REMOVED
    navigate('/');                              // <-- ADDED
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Post Your Property
          </h1>
          <p className="text-lg text-gray-600">
            List your property for free and reach thousands of buyers & renters
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div
                key={i}
                className={`flex items-center ${i < totalSteps - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    i < step
                      ? 'bg-green-600 text-white'
                      : i === step - 1
                      ? 'bg-green-600 text-white ring-4 ring-green-200'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {i < step ? <Check size={18} /> : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      i < step - 1 ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600 text-center">
            Step {step} of {totalSteps}
          </div>
        </div>

        {/* Form Container */}
        <motion.div
          layout
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Information</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['house', 'apartment', 'land', 'commercial'].map(type => (
                        <motion.button
                          key={type}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData(prev => ({ ...prev, propertyType: type }))}
                          className={`p-4 rounded-xl border-2 transition-all capitalize ${
                            formData.propertyType === type
                              ? 'border-green-600 bg-green-50 text-green-700'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          <Building size={24} className="mx-auto mb-2" />
                          {type}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purpose
                      </label>
                      <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="sell">For Sale</option>
                        <option value="rent">For Rent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (NPR)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="e.g. 25000000"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. 3 BHK House in Budhanilkantha"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Describe your property..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Location</h2>
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select City</option>
                        <option>Kathmandu</option>
                        <option>Pokhara</option>
                        <option>Biratnagar</option>
                        <option>Lalitpur</option>
                        <option>Bharatpur</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Locality/Area
                      </label>
                      <input
                        type="text"
                        name="locality"
                        value={formData.locality}
                        onChange={handleInputChange}
                        placeholder="e.g. Budhanilkantha, Lakeside"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street, Ward No, Tole"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Latitude (optional)
                      </label>
                      <input
                        type="text"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        placeholder="27.7172"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Longitude (optional)
                      </label>
                      <input
                        type="text"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        placeholder="85.3240"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Property Details</h2>
                <div className="space-y-5">
                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bedrooms
                      </label>
                      <select
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select</option>
                        {[1,2,3,4,5,6,7,8].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                        <option value="8+">8+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bathrooms
                      </label>
                      <select
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select</option>
                        {[1,2,3,4,5].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                        <option value="5+">5+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Area
                      </label>
                      <div className="flex">
                        <input
                          type="number"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          placeholder="500"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <select
                          name="areaUnit"
                          value={formData.areaUnit}
                          onChange={handleInputChange}
                          className="px-3 py-3 border border-l-0 border-gray-300 rounded-r-xl"
                        >
                          <option value="sqft">sqft</option>
                          <option value="aana">aana</option>
                          <option value="ropani">ropani</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Floors
                      </label>
                      <input
                        type="number"
                        name="floors"
                        value={formData.floors}
                        onChange={handleInputChange}
                        placeholder="2.5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year Built
                      </label>
                      <input
                        type="number"
                        name="yearBuilt"
                        value={formData.yearBuilt}
                        onChange={handleInputChange}
                        placeholder="2075 BS"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Furnished Status
                      </label>
                      <select
                        name="furnished"
                        value={formData.furnished}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="unfurnished">Unfurnished</option>
                        <option value="semi">Semi-Furnished</option>
                        <option value="full">Fully Furnished</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Amenities & Images</h2>
                
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Amenities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {amenitiesList.map(amenity => (
                      <label
                        key={amenity}
                        className="flex items-center p-3 rounded-xl border cursor-pointer transition-all"
                        style={{
                          backgroundColor: formData.amenities.includes(amenity) ? '#f0fdf4' : '',
                          borderColor: formData.amenities.includes(amenity) ? '#22c55e' : '#d1d5db'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {amenity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Upload Images (up to 10)
                  </label>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                      dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
                    }`}
                  >
                    <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-2">
                      Drag & drop images here, or click to select
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block px-6 py-3 bg-green-600 text-white rounded-xl cursor-pointer hover:bg-green-700 transition-colors"
                    >
                      Choose Files
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((img, i) => (
                        <div key={i} className="relative group">
                          <img
                            src={img.preview}
                            alt={`Upload ${i + 1}`}
                            className="w-full h-32 object-cover rounded-xl"
                          />
                          <button
                            onClick={() => removeImage(i)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Submit</h2>
                <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                      />
                      <div className="relative">
                        <Phone size={20} className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="98XXXXXXXX"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email (optional)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 md:col-span-2"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Summary</h3>
                    <div className="text-sm space-y-2 text-gray-600">
                      <p><strong>Title:</strong> {formData.title || 'Not set'}</p>
                      <p><strong>Price:</strong> NPR {formData.price ? parseInt(formData.price).toLocaleString() : 'Not set'}</p>
                      <p><strong>Location:</strong> {formData.locality}, {formData.city}</p>
                      <p><strong>Type:</strong> {formData.propertyType} • {formData.bedrooms} bed • {formData.area} {formData.areaUnit}</p>
                      <p><strong>Amenities:</strong> {formData.amenities.join(', ') || 'None'}</p>
                      <p><strong>Images:</strong> {images.length} uploaded</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrev}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:border-green-500 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
              Previous
            </motion.button>

            {step < totalSteps ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                Next
                <ChevronRight size={20} />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg font-semibold"
              >
                <Check size={20} />
                Post Property
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostPropertyPage;