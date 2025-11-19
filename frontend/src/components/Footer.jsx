import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const linkHover = {
    hover: { x: 4, color: '#10b981' }, 
  };

  const iconHover = {
    hover: { scale: 1.2, rotate: 360, transition: { duration: 0.4 } },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className="bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden"
    >
      {/* Background Pattern (optional subtle effect) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <motion.h3
              whileHover={{ scale: 1.05 }}
              onClick={scrollToTop}
              className="text-2xl font-bold mb-4 cursor-pointer bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent"
            >
              Basobaas
            </motion.h3>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner in finding the perfect property in Nepal.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium"
            >
              <ArrowUp size={16} />
              Back to Top
            </motion.button>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-5 text-emerald-400">Quick Links</h4>
            <ul className="space-y-3">
              {['Buy Property', 'Rent Property', 'Post Property', 'Blog'].map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={linkHover}
                  whileHover="hover"
                  className="group"
                >
                  <a
                    href={`/${item.split(' ')[0].toLowerCase()}`}
                    className="text-gray-400 group-hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-5 text-emerald-400">Services</h4>
            <ul className="space-y-3">
              {[
                { name: 'Property Management', path: '#' },
                { name: 'Legal Services', path: '#' },
                { name: 'Home Inspection', path: '#' },
                { name: 'Mortgage Calculator', path: '#' },
              ].map((service, idx) => (
                <motion.li
                  key={idx}
                  variants={linkHover}
                  whileHover="hover"
                  className="group"
                >
                  <a
                    href={service.path}
                    className="text-gray-400 group-hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-5 text-emerald-400">Contact Us</h4>
            <ul className="space-y-4">
              <motion.li
                className="flex items-center group"
                variants={itemVariants}
                whileHover={{ x: 4 }}
              >
                <motion.div variants={iconHover} whileHover="hover">
                  <Phone size={18} className="mr-3 text-emerald-400" />
                </motion.div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  +977 1234567890
                </span>
              </motion.li>

              <motion.li
                className="flex items-center group"
                variants={itemVariants}
                whileHover={{ x: 4 }}
              >
                <motion.div variants={iconHover} whileHover="hover">
                  <Mail size={18} className="mr-3 text-emerald-400" />
                </motion.div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  info@basobaas.com
                </span>
              </motion.li>

              <motion.li
                className="flex items-center group"
                variants={itemVariants}
                whileHover={{ x: 4 }}
              >
                <motion.div variants={iconHover} whileHover="hover">
                  <MapPin size={18} className="mr-3 text-emerald-400" />
                </motion.div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  Kathmandu, Nepal
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm"
        >
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Basobaas. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {['Privacy', 'Terms', 'Cookies'].map((policy) => (
              <motion.a
                key={policy}
                href={`/${policy.toLowerCase()}`}
                whileHover={{ y: -2, color: '#10b981' }}
                className="text-gray-500 hover:text-emerald-400 transition-colors"
              >
                {policy} Policy
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;