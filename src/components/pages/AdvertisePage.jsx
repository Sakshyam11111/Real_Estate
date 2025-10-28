import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Calendar,
  Home,
  TrendingUp,
  Award,
  Users,
  Building2,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

// Correctly import the local images
import Image1 from '../../../public/assets/RoseVilla04.jpeg';
import Image2 from '../../../public/assets/RoseVilla03.jpeg';
import Image3 from '../../../public/assets/RoseVilla05.jpeg';
import Image4 from '../../../public/assets/RoseVilla07.jpeg';

const AdvertisePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const features = [
    { icon: Building2, title: 'Modern Architecture', desc: 'Contemporary design with premium finishes' },
    { icon: Home, title: 'Spacious Interiors', desc: 'Large living spaces with natural lighting' },
    { icon: Award, title: 'Premium Amenities', desc: 'Gym, pool, clubhouse & more' },
    { icon: TrendingUp, title: 'Great Investment', desc: 'High ROI in prime location' },
  ];

  const amenities = [
    '24/7 Security & CCTV',
    'Swimming Pool',
    'Gymnasium',
    "Children's Play Area",
    'Community Hall',
    'Landscaped Gardens',
    'Power Backup',
    'Covered Parking',
    'Elevator',
    'Water Supply',
    'Fire Safety Systems',
    'Jogging Track',
  ];

  // Use the imported images directly (they are strings – the resolved URL)
  const projectImages = [Image1, Image2, Image3, Image4];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.1, 1.3, 1.1], rotate: [0, -90, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles size={18} />
              <span className="text-sm font-semibold">Premium Living Experience</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Emerald Heights
              <span className="block text-3xl md:text-4xl text-emerald-200 mt-2">Luxury Residences</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl">
              Experience unparalleled luxury living in the heart of Kathmandu. Modern apartments with world-class amenities.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
                <div className="text-3xl font-bold">2-4 BHK</div>
                <div className="text-emerald-200 text-sm">Configurations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
                <div className="text-3xl font-bold">NPR 1.5 Cr+</div>
                <div className="text-emerald-200 text-sm">Starting Price</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-emerald-200 text-sm">Completion</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2"
              >
                Schedule a Visit
                <ArrowRight size={20} />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                Download Brochure
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Location */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <MapPin size={20} className="text-emerald-600" />
            <span className="font-semibold">Koteshwor, Kathmandu | Near Ring Road</span>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-6">
              <img
                src={projectImages[selectedImage]}
                alt="Project"
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                {selectedImage + 1} / {projectImages.length}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {projectImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(idx)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${
                    selectedImage === idx ? 'border-emerald-500' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-24 object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose Emerald Heights?
            </h2>
            <p className="text-xl text-gray-600">Premium features that define luxury living</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">
              World-Class Amenities
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenities.map((amenity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl"
                >
                  <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-sm">{amenity}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unit Plans */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">
              Available Units
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { type: '2 BHK', size: '1200 sq.ft', price: 'NPR 1.5 Cr', available: 8 },
                { type: '3 BHK', size: '1800 sq.ft', price: 'NPR 2.2 Cr', available: 5 },
                { type: '4 BHK', size: '2400 sq.ft', price: 'NPR 3.5 Cr', available: 2 },
              ].map((unit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-emerald-500"
                >
                  <div className="text-3xl font-bold text-gray-800 mb-2">{unit.type}</div>
                  <div className="text-gray-600 mb-4">{unit.size}</div>
                  <div className="text-2xl font-bold text-emerald-600 mb-4">{unit.price}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <Users size={16} />
                    <span>{unit.available} units available</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all"
                  >
                    Inquire Now
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Get in Touch</h2>
              <p className="text-xl text-gray-600">
                Schedule a site visit or request more information
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Phone</div>
                      <div className="text-emerald-100">+977 1-5970000</div>
                      <div className="text-emerald-100">+977 9801234567</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <div className="text-emerald-100">info@emeraldheights.com.np</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Location</div>
                      <div className="text-emerald-100">Koteshwor, Kathmandu</div>
                      <div className="text-emerald-100">Near Ring Road Intersection</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Visit Hours</div>
                      <div className="text-emerald-100">Sun - Fri: 10 AM - 6 PM</div>
                      <div className="text-emerald-100">Saturday: By Appointment</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {submitted ? (
                  <div className="bg-emerald-50 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                    <CheckCircle size={64} className="text-emerald-600 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600">We'll contact you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all"
                    >
                      Send Message
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Limited Units Available!</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Don't miss this opportunity to own your dream home in Kathmandu's most sought-after location
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
            >
              Book Your Unit Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AdvertisePage;