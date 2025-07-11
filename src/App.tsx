import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Solutions from './components/Solutions';
import Team from './components/Team';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminPage from './components/admin/AdminPage';

const MainPage = () => (
  <>
    <AnimatedBackground />
    <Header />
    <Hero />
    <About />
    <Services />
    <Solutions />
    <Team />
    <Pricing />
    <ContactForm />
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;