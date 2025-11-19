// pages/ToolPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Calendar, Percent, Home, Info } from 'lucide-react';

const ToolPage = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // EMI Formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
  useEffect(() => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const tenure = parseFloat(tenureYears) * 12;

    if (principal > 0 && rate > 0 && tenure > 0) {
      const emiValue = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
      const totalPayable = emiValue * tenure;
      const interestPayable = totalPayable - principal;

      setEmi(Math.round(emiValue));
      setTotalAmount(Math.round(totalPayable));
      setTotalInterest(Math.round(interestPayable));
    } else {
      setEmi(0);
      setTotalAmount(0);
      setTotalInterest(0);
    }
  }, [loanAmount, interestRate, tenureYears]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Calculator size={18} />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 Thyroid mb-3">
            EMI Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your monthly home loan EMI instantly. Plan your budget with real-time results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Home className="text-green-600" />
              Loan Details
            </h2>

            {/* Loan Amount */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={18} />
                Loan Amount (NPR)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                min="100000"
                step="10000"
              />
              <input
                type="range"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                min="500000"
                max="50000000"
                step="100000"
                className="w-full mt-3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>NPR 5 Lakh</span>
                <span>NPR 5 Crore</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Percent size={18} />
                Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                min="1"
                max="20"
                step="0.1"
              />
              <input
                type="range"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                min="5"
                max="15"
                step="0.1"
                className="w-full mt-3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar size={18} />
                Loan Tenure (Years)
              </label>
              <input
                type="number"
                value={tenureYears}
                onChange={(e) => setTenureYears(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                min="1"
                max="30"
                step="1"
              />
              <input
                type="range"
                value={tenureYears}
                onChange={(e) => setTenureYears(e.target.value)}
                min="1"
                max="30"
                step="1"
                className="w-full mt-3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
              <p className="text-sm text-green-700 flex items-start gap-2">
                <Info size={16} className="mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Tip:</strong> Even a 0.5% lower interest rate can save you lakhs over 20 years!
                </span>
              </p>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* EMI Result */}
            <motion.div
              layout
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <p className="text-green-100 text-sm mb-1">Monthly EMI</p>
              <motion.p
                key={emi}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-5xl font-extrabold"
              >
                {emi > 0 ? formatCurrency(emi) : 'NPR 0'}
              </motion.p>
              <p className="text-green-100 text-sm mt-2">per month</p>
            </motion.div>

            {/* Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Principal Amount</span>
                  <span className="font-semibold text-gray-800">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="font-semibold text-red-600">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-gray-800 font-semibold">Total Amount Payable</span>
                  <span className="font-bold text-green-600 text-lg">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Pie Chart Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Cost Breakdown</h3>
              <div className="relative h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {totalAmount > 0 ? Math.round((loanAmount / totalAmount) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">Principal</div>
                  </div>
                </div>
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray={`${(loanAmount / totalAmount) * 100}, 100`}
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeDasharray={`${(totalInterest / totalAmount) * 100}, 100`}
                    strokeDashoffset={-(loanAmount / totalAmount) * 100}
                  />
                </svg>
              </div>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Principal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Interest</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { title: "Save with Lower Rates", desc: "Compare bank offers — 1% less can save NPR 5+ lakh!" },
            { title: "Longer Tenure = Lower EMI", desc: "But you pay more interest over time." },
            { title: "Prepay to Save", desc: "Pay extra anytime to reduce interest burden." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-md border border-green-100"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Info size={20} className="text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Slider Style */}
      <style jsx>{`
        .slider-green::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #10b981;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.3);
          transition: all 0.2s;
        }
        .slider-green::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 8px rgba(16, 185, 129, 0.2);
        }
        .slider-green::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #10b981;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default ToolPage;