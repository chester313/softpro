import React from 'react';
import { Github, Twitter, Linkedin, Mail, Code, Zap, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Team', href: '#team' },
      { label: 'Careers', href: '#careers' },
      { label: 'News', href: '#news' }
    ],
    services: [
      { label: 'AI & ML', href: '#ai' },
      { label: 'Mobile Apps', href: '#mobile' },
      { label: 'Cloud Solutions', href: '#cloud' },
      { label: 'Cybersecurity', href: '#security' }
    ],
    resources: [
      { label: 'Documentation', href: '#docs' },
      { label: 'API Reference', href: '#api' },
      { label: 'Case Studies', href: '#cases' },
      { label: 'Tech Blog', href: '#blog' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Security', href: '#security-policy' },
      { label: 'Compliance', href: '#compliance' }
    ]
  };

  const socialLinks = [
    { icon: Github, href: '#github', label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Twitter, href: '#twitter', label: 'Twitter', color: 'hover:text-cyan-400' },
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Mail, href: '#email', label: 'Email', color: 'hover:text-purple-400' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-gray-800/50 relative">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
      >
        <ArrowUp className="w-6 h-6 text-white group-hover:translate-y-[-2px] transition-transform" />
      </button>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <Code className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white font-mono">
                <span className="text-cyan-400">Cyber</span>
                <span className="text-purple-400">Forge</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed">
              Pioneering the future of technology through innovative software solutions. 
              We transform visionary ideas into cutting-edge digital realities.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@cyberforge.dev</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <span className="text-sm font-mono">// Available 24/7 for critical support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`w-10 h-10 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:border-current`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-6 font-mono">Company</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-6 font-mono">Services</h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-6 font-mono">Resources</h4>
              <ul className="space-y-4">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-pink-400 transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-6 font-mono">Legal</h4>
              <ul className="space-y-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50 bg-gray-900/20 backdrop-blur-sm">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm font-mono">
              © {currentYear} CyberForge. All rights reserved. // Built with ⚡ and 🧠
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="font-mono">Status: All systems operational</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-mono">99.99% uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;