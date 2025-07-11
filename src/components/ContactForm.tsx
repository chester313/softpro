import React, { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle, Zap } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'AI & Machine Learning',
    'Mobile Applications',
    'Cloud Architecture',
    'Cybersecurity',
    'Big Data Analytics',
    'Quantum Computing',
    'Custom Software Development',
    'Consulting Services'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus({
        type: 'success',
        message: 'Message sent successfully! Our team will contact you within 24 hours.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-spacing bg-gray-900/50 relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-sm">
                <Zap className="w-4 h-4" />
                <span>GET IN TOUCH</span>
              </div>
              
              <h2 className="section-heading">
                Ready to Build the
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  Future Together?
                </span>
              </h2>
              
              <p className="cyber-text">
                Let's discuss your vision and transform it into reality. Our team of experts 
                is ready to architect solutions that will revolutionize your business.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="cyber-card">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold font-mono">Email Us</h4>
                    <p className="text-cyan-400">hello@cyberforge.dev</p>
                  </div>
                </div>
              </div>

              <div className="cyber-card">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold font-mono">Call Us</h4>
                    <p className="text-purple-400">+1 (555) 123-CYBER</p>
                  </div>
                </div>
              </div>

              <div className="cyber-card">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold font-mono">Response Time</h4>
                    <p className="text-green-400">Within 2 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="cyber-card">
              <h4 className="text-white font-semibold mb-4 font-mono">Our Tech Arsenal</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {['React', 'Node.js', 'Python', 'TensorFlow', 'AWS', 'Docker', 'Kubernetes', 'GraphQL'].map((tech) => (
                  <div key={tech} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
                    <span className="text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div className="cyber-card animate-slide-in-right">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2 font-mono">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/50 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-200 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2 font-mono">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/50 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-200 backdrop-blur-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2 font-mono">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-200 backdrop-blur-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="service" className="block text-white font-medium mb-2 font-mono">
                  Service Interested In *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-4 text-white focus:border-cyan-400 focus:outline-none transition-colors duration-200 backdrop-blur-sm"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service} className="bg-black">
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2 font-mono">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-200 resize-none backdrop-blur-sm"
                  placeholder="Tell us about your project, technical requirements, timeline, and any specific challenges you're facing..."
                />
              </div>

              {/* Status Message */}
              {status.type && (
                <div className={`flex items-center space-x-3 p-4 rounded-xl backdrop-blur-sm ${
                  status.type === 'success' 
                    ? 'bg-green-900/50 border border-green-700/50' 
                    : 'bg-red-900/50 border border-red-700/50'
                }`}>
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                  <p className={`text-sm ${
                    status.type === 'success' ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {status.message}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-cyber flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    <span>TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>

              <p className="text-gray-400 text-sm text-center font-mono">
                // Encrypted transmission • Quantum-secured communication
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;