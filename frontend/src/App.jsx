// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import BuyPage from './components/pages/BuyPage';
import RentPage from './components/pages/RentPage';
import AdvertisePage from './components/pages/AdvertisePage';
import ToolsPage from './components/pages/ToolsPage';
import BlogPage from './components/pages/BlogPage';
import ContactPage from './components/pages/ContactPage';
import PropertyDetails from './components/pages/PropertyDetails';
import SignInPage from './components/pages/SignInPage';
import PostPropertyPage from './components/pages/PostPropertyPage';
import ToolPage from './components/pages/ToolPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <HomePage />
              <ContactPage/>
            </>
          } />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/advertise" element={<AdvertisePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/postpropertypage" element={<PostPropertyPage />} />
          <Route path="/toolpage" element={<ToolPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;