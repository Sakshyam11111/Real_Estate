
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Calculator, TrendingUp, Map, FileText } from 'lucide-react';

const ToolsPage = () => {
  const [activeTool, setActiveTool] = useState('calculator');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;
    
    if (principal && rate && term) {
      const payment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      setMonthlyPayment(payment.toFixed(2));
    }
  };

  // Animation Variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const navItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
  };

  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const cardVariants = {
    hover: { y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-8"
      >
        Real Estate Tools
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tool Navigation */}
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-semibold mb-4"
            >
              Tools
            </motion.h3>
            <nav className="space-y-2">
              {[
                { id: 'calculator', label: 'Mortgage Calculator', icon: Calculator },
                { id: 'valuation', label: 'Property Valuation', icon: TrendingUp },
                { id: 'guides', label: 'Area Guides', icon: Map },
                { id: 'documents', label: 'Document Templates', icon: FileText }
              ].map((tool, i) => (
                <motion.button
                  key={tool.id}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTool(tool.id)}
                  className={`w-full text-left px-3 py-2 rounded flex items-center transition-all ${
                    activeTool === tool.id 
                      ? 'bg-indigo-100 text-indigo-600 shadow-sm' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <tool.icon size={18} className="mr-2" />
                  {tool.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Tool Content */}
        <div className="md:col-span-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <AnimatePresence mode="wait">
              {activeTool === 'calculator' && (
                <motion.div
                  key="calculator"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold mb-6">Mortgage Calculator</h2>
                  <div className="space-y-4">
                    <motion.div whileHover={{ x: 2 }}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (NPR)</label>
                      <motion.input 
                        whileFocus={{ scale: 1.01, borderColor: '#6366f1' }}
                        type="number" 
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="1000000"
                      />
                    </motion.div>
                    <motion.div whileHover={{ x: 2 }}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                      <motion.input 
                        whileFocus={{ scale: 1.01 }}
                        type="number" 
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="8.5"
                      />
                    </motion.div>
                    <motion.div whileHover={{ x: 2 }}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Years)</label>
                      <motion.input 
                        whileFocus={{ scale: 1.01 }}
                        type="number" 
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="20"
                      />
                    </motion.div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={calculateMortgage}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
                    >
                      Calculate
                    </motion.button>
                    <AnimatePresence>
                      {monthlyPayment && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200"
                        >
                          <p className="text-lg font-semibold text-indigo-600">
                            Monthly Payment: NPR {monthlyPayment}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {activeTool === 'valuation' && (
                <motion.div
                  key="valuation"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h2 className="text-2xl font-semibold mb-6">Property Valuation</h2>
                  <p className="text-gray-600 mb-4">Get an estimated value for your property based on current market trends.</p>
                  <div className="space-y-4">
                    <motion.div whileHover={{ x: 2 }}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Location</label>
                      <motion.input 
                        whileFocus={{ scale: 1.01 }}
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter location"
                      />
                    </motion.div>
                    <motion.div whileHover={{ x: 2 }}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                      <motion.select 
                        whileFocus={{ scale: 1.01 }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option>Apartment</option>
                        <option>House</option>
                        <option>Villa</option>
                        <option>Commercial</option>
                      </motion.select>
                    </motion.div>
                    <motion.div whileHover={{ x: 2 }}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq ft)</label>
                      <motion.input 
                        whileFocus={{ scale: 1.01 }}
                        type="number" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="1200"
                      />
                    </motion.div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
                    >
                      Get Valuation
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeTool === 'guides' && (
                <motion.div
                  key="guides"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h2 className="text-2xl font-semibold mb-6">Area Guides</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "Kathmandu", desc: "Complete guide to living and investing in Kathmandu." },
                      { title: "Pokhara", desc: "Explore property options in the beautiful city of Pokhara." },
                      { title: "Lalitpur", desc: "Discover real estate opportunities in Lalitpur." },
                      { title: "Bhaktapur", desc: "Learn about property market in historic Bhaktapur." }
                    ].map((area, i) => (
                      <motion.div
                        key={area.title}
                        variants={cardVariants}
                        whileHover="hover"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border rounded-lg p-4 transition-all cursor-pointer"
                      >
                        <h3 className="font-semibold mb-2">{area.title}</h3>
                        <p className="text-gray-600 text-sm">{area.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTool === 'documents' && (
                <motion.div
                  key="documents"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h2 className="text-2xl font-semibold mb-6">Document Templates</h2>
                  <div className="space-y-4">
                    {[
                      { title: "Rental Agreement Template", desc: "Standard rental agreement for residential properties" },
                      { title: "Sale Agreement Template", desc: "Comprehensive sale agreement for property transactions" },
                      { title: "Property Inspection Checklist", desc: "Detailed checklist for property inspection" }
                    ].map((doc, i) => (
                      <motion.div
                        key={doc.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border rounded-lg p-4 flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-semibold">{doc.title}</h3>
                          <p className="text-gray-600 text-sm">{doc.desc}</p>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-all"
                        >
                          Download
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolsPage;