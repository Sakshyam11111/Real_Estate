// pages/BlogPage.jsx
import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Mail, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Updated 2025 Nepal real estate blog posts
  const blogPosts = [
    {
      id: 1,
      title: "How to Buy Property in Nepal Without a Loan in 2025",
      excerpt: "Smart saving strategies, government schemes, and co-ownership models for loan-free homeownership in Kathmandu, Pokhara & Chitwan.",
      author: "Ramesh Sharma",
      date: "March 18, 2025",
      image: "https://imgs.search.brave.com/YPWnYGrSZ-eMR9Hp33SW7MT06edsKufXJ7qEZlVOFQc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2hhcmdoYWRlcmku/Y29tL2ltYWdlcy90/aHVtYl8yNTEyNTEx/ODEyLmpwZWc",
      category: "Buying Guide",
      readTime: "8 min"
    },
    {
      id: 2,
      title: "New Land Registration Rules 2082: What Every Buyer Must Know",
      excerpt: "Updated land ceiling, digital malpot system, and anti-benami laws explained with real examples from Lalitpur and Bhaktapur.",
      author: "Sita Thapa",
      date: "March 10, 2025",
      image: "https://imgs.search.brave.com/sLDLfsAL6nhf8GdhGNh-l_Qli3jZOrWm-o3FtJoR0cA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zYXZl/bWF4LmluL2Jsb2dz/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI0/LzAxL1JlZ2lzdGVy/LVByb3BlcnR5LWlu/LUluZGlhLmpwZw",
      category: "Legal",
      readTime: "12 min"
    },
    {
      id: 3,
      title: "Top 7 Emerging Real Estate Hotspots Outside Ring Road",
      excerpt: "Siddharthanagar, Hetauda, Damauli, and Itahari — why investors are moving beyond Kathmandu Valley in 2025.",
      author: "Prakash Gurung",
      date: "February 28, 2025",
      image: "https://imgs.search.brave.com/OldDbfpS4dTv2qXkX9i5PtUUFHq4yIQ_dYD0wy9KGYw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9saDMu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tLzZr/QlMtUkx4NHpyeEt4/VDlQcXVzYkNEeHJX/R2xpOGZSdmxpei1t/bVk1d0JSbHFGajhG/eVN1Y1d2WmdjdnVK/RU9nZHNDb2UyQlZS/NDh3eGJlVW1NdlQw/Tk52enpBbEV2VkV3/PXczODQwLWgyMTYw/LWMtcnctdjM",
      category: "Investment",
      readTime: "10 min"
    },
    {
      id: 4,
      title: "Home Staging Secrets That Sell 40% Faster in Nepal",
      excerpt: "Low-cost staging tips using local furniture, lighting, and cultural touches that appeal to Nepali buyers.",
      author: "Anita Magar",
      date: "February 20, 2025",
      image: "https://imgs.search.brave.com/ny81uQOa_sH8slA_RwzwaVI6c8KvyEJTxwRV95-amcM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudG9paW1nLmNv/bS90aHVtYi9pbWdz/aXplLTIzNDU2LG1z/aWQtODIzNjgxMDYs/d2lkdGgtNjAwLHJl/c2l6ZW1vZGUtNC84/MjM2ODEwNi5qcGc",
      category: "Selling Tips",
      readTime: "6 min"
    },
    {
      id: 5,
      title: "Rental Yield Report 2025: Kathmandu vs Pokhara vs Biratnagar",
      excerpt: "Latest data shows 8.2% average yield in Pokhara — is it still the best rental market in Nepal?",
      author: "Bikash Lama",
      date: "February 15, 2025",
      image: "https://reall.net/wp-content/uploads/2020/03/DSC_2833-scaled.jpg",
      category: "Market Analysis",
      readTime: "9 min"
    },
    {
      id: 6,
      title: "Green Homes in Nepal: Solar, Rainwater & Earthquake-Resistant Design",
      excerpt: "How new building codes and subsidies are making eco-friendly homes affordable and mandatory by 2027.",
      author: "Meera Karki",
      date: "February 8, 2025",
      image: "https://imgs.search.brave.com/I1eLLU9zBkCnP_MWUeQFOC6R8p_138mB68i_vNUUHP8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zeW5l/cGFsLmNvbS91cGxv/YWQvMzA3YWNhODA1/ZC5qcGc",
      category: "Sustainability",
      readTime: "11 min"
    }
  ];

  const categories = ["All", "Buying Guide", "Selling Tips", "Investment", "Legal", "Market Analysis", "Sustainability"];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  // Enhanced Animation Variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: 0.25 
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.7, delay: 0.4, type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            <Leaf size={16} />
            Nepal Real Estate Insights
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
            Property Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert guides, market trends, and legal updates for property buyers, sellers, and investors in Nepal.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category, i) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              whileHover={{ 
                scale: 1.08, 
                boxShadow: "0 8px 25px rgba(34, 197, 94, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-green-400 hover:shadow-md'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                layout
                variants={item}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-green-100"
              >
                <div className="relative overflow-hidden h-56">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  />
                  
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-4 left-4"
                  >
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {post.category}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {post.readTime} read
                  </motion.div>
                </div>

                <div className="p-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4 text-sm text-gray-500 mb-3"
                  >
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-green-600" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <User size={14} className="mr-1 text-emerald-600" />
                      {post.author}
                    </div>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors line-clamp-2"
                  >
                    {post.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-600 mb-4 line-clamp-3"
                  >
                    {post.excerpt}
                  </motion.p>

                  <motion.button
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-green-600 hover:text-emerald-700 font-semibold text-sm group"
                  >
                    Read Article
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      <ArrowRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
                    </motion.div>
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-1 shadow-2xl"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4"
              >
                <Mail size={16} />
                Stay Updated
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4"
              >
                Get Nepal's Latest Property News
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 mb-8"
              >
                Weekly insights on land laws, investment zones, rental yields, and green building trends.
              </motion.p>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-700 placeholder-gray-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Subscribe Now
                </motion.button>
              </motion.form>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-xs text-gray-500 mt-4"
              >
                No spam. Unsubscribe anytime. 12,000+ readers trust us.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;