import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Facebook, Twitter, Github, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // <-- IMPORT useNavigate

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { useFirebase } from '../Firebase';

const SignInPage = () => {
  const { auth, db } = useFirebase();
  const navigate = useNavigate(); // <-- INITIALIZE useNavigate

  const [isSignUp, setIsSignUp] = useState(false);

  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [signInErrors, setSignInErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);

  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [signUpErrors, setSignUpErrors] = useState({});
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // ... (handleSignInChange, validateSignIn, handleSignUpChange, validateSignUp remain the same)
  const handleSignInChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (signInErrors[name]) {
      setSignInErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateSignIn = () => {
    const err = {};
    if (!signInData.email.trim()) err.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(signInData.email)) err.email = 'Email is invalid';
    if (!signInData.password) err.password = 'Password is required';
    else if (signInData.password.length < 6) err.password = 'Password must be at least 6 characters';
    return err;
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
    if (signUpErrors[name]) {
      setSignUpErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateSignUp = () => {
    const err = {};
    if (!signUpData.name.trim()) err.name = 'Name is required';
    if (!signUpData.email.trim()) err.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(signUpData.email)) err.email = 'Email is invalid';
    if (!signUpData.password) err.password = 'Password is required';
    else if (signUpData.password.length < 6) err.password = 'Password must be at least 6 characters';
    if (signUpData.password !== signUpData.confirmPassword) err.confirmPassword = 'Passwords do not match';
    return err;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const err = validateSignIn();
    if (Object.keys(err).length) {
      setSignInErrors(err);
      return;
    }
    setIsSubmitting(true);
    
    try {
      await signInWithEmailAndPassword(auth, signInData.email, signInData.password);
      setSignInSuccess(true);
      setSignInErrors({});
      
      if (signInData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('email', signInData.email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('email');
      }
      
      // --- UPDATED REDIRECT ---
      setTimeout(() => {
        navigate('/'); // Redirect to home page
      }, 2000);
    } catch (error) {
      let errorMessage = 'An error occurred during sign in.';
      switch (error.code) {
        case 'auth/user-not-found': errorMessage = 'No account found with this email.'; break;
        case 'auth/wrong-password': errorMessage = 'Incorrect password.'; break;
        case 'auth/invalid-email': errorMessage = 'Invalid email address.'; break;
        case 'auth/user-disabled': errorMessage = 'This account has been disabled.'; break;
        case 'auth/too-many-requests': errorMessage = 'Too many failed login attempts. Please try again later.'; break;
        default: errorMessage = error.message;
      }
      setSignInErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const err = validateSignUp();
    if (Object.keys(err).length) {
      setSignUpErrors(err);
      return;
    }
    setIsSignupSubmitting(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password);
      
      await updateProfile(auth.currentUser, {
        displayName: signUpData.name
      });
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: signUpData.name,
        email: signUpData.email,
        createdAt: new Date(),
      });
      
      setSignUpSuccess(true);
      setSignUpErrors({});
      
      // --- UPDATED REDIRECT ---
      setTimeout(() => {
        navigate('/'); // Redirect to home page after signup
      }, 2000);
    } catch (error) {
      let errorMessage = 'An error occurred during account creation.';
      switch (error.code) {
        case 'auth/email-already-in-use': errorMessage = 'This email is already in use.'; break;
        case 'auth/invalid-email': errorMessage = 'Invalid email address.'; break;
        case 'auth/operation-not-allowed': errorMessage = 'Email/password accounts are not enabled.'; break;
        case 'auth/weak-password': errorMessage = 'Password is too weak.'; break;
        default: errorMessage = error.message;
      }
      setSignUpErrors({ general: errorMessage });
    } finally {
      setIsSignupSubmitting(false);
    }
  };

  React.useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe');
    const email = localStorage.getItem('email');
    if (rememberMe === 'true' && email) {
      setSignInData(prev => ({ ...prev, email, rememberMe: true }));
    }
  }, []);

  // Animation Variants
  const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };
  const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };

  // ... (The rest of the JSX remains the same)
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="w-full max-w-3xl">
        <motion.div layout className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <motion.div key={isSignUp ? 'signup-header' : 'signin-header'} {...fadeInUp} transition={{ duration: 0.3 }} className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
            <p className="text-green-100">{isSignUp ? 'Join Basobaas today' : 'Sign in to your Basobaas account'}</p>
          </motion.div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {signInSuccess && !isSignUp && (
                <motion.div key="signin-success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", stiffness: 300 }} className="text-center py-8">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }} className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={40} className="text-green-600" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign In Successful!</h3>
                  <p className="text-gray-600">Redirecting you home...</p>
                </motion.div>
              )}

              {signUpSuccess && isSignUp && (
                <motion.div key="signup-success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", stiffness: 300 }} className="text-center py-8">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }} className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={40} className="text-green-600" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Created!</h3>
                  <p className="text-gray-600">Redirecting you home...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {!isSignUp && !signInSuccess && (
                <motion.form key="signin-form" variants={staggerContainer} initial="initial" animate="animate" exit="exit" onSubmit={handleSignInSubmit} className="space-y-6">
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail size={20} className="text-gray-400" /></div>
                      <input type="email" name="email" value={signInData.email} onChange={handleSignInChange} className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${signInErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`} placeholder="Enter your email" />
                    </div>
                    <AnimatePresence>{signInErrors.email && (<motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{signInErrors.email}</motion.p>)}</AnimatePresence>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock size={20} className="text-gray-400" /></div>
                      <input type={showPassword ? 'text' : 'password'} name="password" value={signInData.password} onChange={handleSignInChange} className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${signInErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`} placeholder="Enter your password" />
                      <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={20} className="text-gray-400 hover:text-gray-600" /> : <Eye size={20} className="text-gray-400 hover:text-gray-600" />}</button>
                    </div>
                    <AnimatePresence>{signInErrors.password && (<motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{signInErrors.password}</motion.p>)}</AnimatePresence>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex items-center justify-between">
                    <label className="flex items-center"><input type="checkbox" name="rememberMe" checked={signInData.rememberMe} onChange={handleSignInChange} className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" /><span className="ml-2 text-sm text-gray-600">Remember me</span></label>
                    <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">Forgot password?</a>
                  </motion.div>

                  <AnimatePresence>{signInErrors.general && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"><p className="flex items-center"><AlertCircle size={16} className="mr-2" />{signInErrors.general}</p></motion.div>)}</AnimatePresence>

                  <motion.button variants={fadeInUp} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? (<span className="flex items-center justify-center"><motion.svg animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></motion.svg>Signing In...</span>) : ('Sign In')}
                  </motion.button>
                </motion.form>
              )}

              {isSignUp && !signUpSuccess && (
                <motion.form key="signup-form" variants={staggerContainer} initial="initial" animate="animate" exit="exit" onSubmit={handleSignUpSubmit} className="space-y-6">
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserPlus size={20} className="text-gray-400" /></div><input type="text" name="name" value={signUpData.name} onChange={handleSignUpChange} className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${signUpErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`} placeholder="Enter your name" /></div>
                    <AnimatePresence>{signUpErrors.name && (<motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{signUpErrors.name}</motion.p>)}</AnimatePresence>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail size={20} className="text-gray-400" /></div><input type="email" name="email" value={signUpData.email} onChange={handleSignUpChange} className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${signUpErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`} placeholder="Enter your email" /></div>
                    <AnimatePresence>{signUpErrors.email && (<motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{signUpErrors.email}</motion.p>)}</AnimatePresence>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock size={20} className="text-gray-400" /></div><input type={showSignupPassword ? 'text' : 'password'} name="password" value={signUpData.password} onChange={handleSignUpChange} className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${signUpErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`} placeholder="Create a password" /><button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowSignupPassword(!showSignupPassword)}>{showSignupPassword ? <EyeOff size={20} className="text-gray-400 hover:text-gray-600" /> : <Eye size={20} className="text-gray-400 hover:text-gray-600" />}</button></div>
                    <AnimatePresence>{signUpErrors.password && (<motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{signUpErrors.password}</motion.p>)}</AnimatePresence>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock size={20} className="text-gray-400" /></div><input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={signUpData.confirmPassword} onChange={handleSignUpChange} className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${signUpErrors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`} placeholder="Confirm your password" /><button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff size={20} className="text-gray-400 hover:text-gray-600" /> : <Eye size={20} className="text-gray-400 hover:text-gray-600" />}</button></div>
                    <AnimatePresence>{signUpErrors.confirmPassword && (<motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{signUpErrors.confirmPassword}</motion.p>)}</AnimatePresence>
                  </motion.div>

                  <AnimatePresence>{signUpErrors.general && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"><p className="flex items-center"><AlertCircle size={16} className="mr-2" />{signUpErrors.general}</p></motion.div>)}</AnimatePresence>

                  <motion.button variants={fadeInUp} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSignupSubmitting} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSignupSubmitting ? (<span className="flex items-center justify-center"><motion.svg animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></motion.svg>Creating Account...</span>) : ('Create Account')}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {(!signInSuccess && !signUpSuccess) && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative my-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
                  <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
                </motion.div>
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-3 gap-3">
                  <motion.button variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"><Facebook size={20} className="text-blue-600" /></motion.button>
                  <motion.button variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"><Twitter size={20} className="text-sky-600" /></motion.button>
                  <motion.button variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"><Github size={20} className="text-gray-800" /></motion.button>
                </motion.div>
              </>
            )}

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mt-6 text-gray-600">
              {isSignUp ? (<>Already have an account? <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" onClick={() => setIsSignUp(false)} className="text-green-600 hover:text-green-700 font-medium ml-1">Sign in</motion.button></>) : (<>Don't have an account? <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" onClick={() => setIsSignUp(true)} className="text-green-600 hover:text-green-700 font-medium ml-1">Sign up</motion.button></>)}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignInPage;