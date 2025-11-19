// pages/ContactPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock, MessageCircle, CheckCircle, AlertCircle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const formItemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setErrors({});
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have questions about our properties or services? We're here to help and answer any question you might have.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {/* Contact Information */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.h2 
                className="text-2xl font-semibold mb-6 text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Get in Touch
              </motion.h2>
              <motion.div 
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3
                    }
                  }
                }}
              >
                {[
                  { icon: Phone, label: "Phone", details: ["+977 1234567890", "+977 9876543210"] },
                  { icon: Mail, label: "Email", details: ["info@basobaas.com", "support@basobaas.com"] },
                  { icon: MapPin, label: "Office Address", details: ["Kamaladi, Kathmandu", "Nepal 44600"] },
                  { icon: Clock, label: "Business Hours", details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"] }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start group"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div 
                      className="bg-green-100 p-3 rounded-lg mr-4 group-hover:bg-green-200 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <item.icon size={20} className="text-green-600" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="font-medium text-gray-800">{item.label}</p>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">{detail}</p>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Social Media Links */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <motion.h3 
                className="text-xl font-semibold mb-4 text-gray-800"
                variants={itemVariants}
              >
                Follow Us
              </motion.h3>
              <motion.div 
                className="flex space-x-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                {[
                  { icon: Facebook, color: "text-blue-600", bg: "bg-blue-100", hover: "bg-blue-200" },
                  { icon: Twitter, color: "text-sky-600", bg: "bg-sky-100", hover: "bg-sky-200" },
                  { icon: Instagram, color: "text-pink-600", bg: "bg-pink-100", hover: "bg-pink-200" },
                  { icon: Linkedin, color: "text-blue-700", bg: "bg-blue-100", hover: "bg-blue-200" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`${social.bg} p-3 rounded-lg hover:${social.hover} transition-colors`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <social.icon size={20} className={social.color} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Quick Contact Card */}
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <motion.h3 className="text-xl font-semibold mb-3" variants={itemVariants}>
                Need Quick Assistance?
              </motion.h3>
              <motion.p className="mb-4" variants={itemVariants}>
                Our customer support team is ready to help you with any questions.
              </motion.p>
              <motion.button 
                className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={18} className="mr-2" />
                Start Live Chat
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100"
              whileHover={{ y: -2 }}
            >
              <motion.h2 
                className="text-2xl font-semibold mb-6 text-gray-800"
                variants={itemVariants}
              >
                Send us a Message
              </motion.h2>
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 1,
                        ease: "easeInOut"
                      }}
                    >
                      <CheckCircle size={40} className="text-green-600" />
                    </motion.div>
                    <motion.h3 
                      className="text-2xl font-semibold text-gray-800 mb-3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Message Sent Successfully!
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 max-w-md mx-auto"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Thank you for reaching out. We'll get back to you as soon as possible, usually within 24 hours.
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95 }}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.2
                        }
                      }
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {[
                        { name: "name", label: "Your Name *", type: "text" },
                        { name: "email", label: "Email Address *", type: "email" }
                      ].map((field, index) => (
                        <motion.div key={field.name} variants={formItemVariants}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {field.label}
                          </label>
                          <input 
                            type={field.type} 
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors[field.name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
                            required
                            whileFocus={{ scale: 1.02 }}
                          />
                          <AnimatePresence>
                            {errors[field.name] && (
                              <motion.p 
                                className="mt-1 text-sm text-red-600 flex items-center"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                              >
                                <AlertCircle size={14} className="mr-1" />
                                {errors[field.name]}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <motion.div variants={formItemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </motion.div>
                      <motion.div variants={formItemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                        <input 
                          type="text" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
                          required
                          whileFocus={{ scale: 1.02 }}
                        />
                        <AnimatePresence>
                          {errors.subject && (
                            <motion.p 
                              className="mt-1 text-sm text-red-600 flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                            >
                              <AlertCircle size={14} className="mr-1" />
                              {errors.subject}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                    
                    <motion.div className="mb-6" variants={formItemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="5"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
                        required
                        whileFocus={{ scale: 1.02 }}
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p 
                            className="mt-1 text-sm text-red-600 flex items-center"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                          >
                            <AlertCircle size={14} className="mr-1" />
                            {errors.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between"
                      variants={itemVariants}
                    >
                      <p className="text-sm text-gray-500">* Required fields</p>
                      <motion.button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.svg 
                              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" 
                              viewBox="0 0 24 24"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </motion.svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;