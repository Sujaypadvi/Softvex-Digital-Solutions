import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const LOGO_URL = logo;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navigateToService = (serviceId: string) => {
    navigate(`/services#${serviceId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-grid">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-gray-200 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center cursor-pointer group"
          >
            <img
              src={LOGO_URL}
              alt="Softvex Logo"
              className="h-8 md:h-10 transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${isActive(item.path) ? 'text-green-600' : 'text-gray-600'}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="voxel-border bg-green-200 px-5 py-2 text-sm font-bold uppercase tracking-wider"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-b border-gray-200 absolute top-full left-0 right-0 py-6 px-4 animate-in slide-in-from-top">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-left text-lg font-medium p-2"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="voxel-border bg-green-200 p-4 text-center font-bold uppercase"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link
                to="/"
                className="flex items-center mb-6 cursor-pointer group"
              >
                <img
                  src={LOGO_URL}
                  alt="Softvex Logo"
                  className="h-10 md:h-12 transition-opacity group-hover:opacity-80"
                />
              </Link>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Empowering businesses with cutting-edge digital infrastructure and creative software solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-gray-100 hover:bg-green-100 transition-colors"><Twitter size={18} /></a>
                <a href="#" className="p-2 bg-gray-100 hover:bg-green-100 transition-colors"><Linkedin size={18} /></a>
                <a href="#" className="p-2 bg-gray-100 hover:bg-green-100 transition-colors"><Github size={18} /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Quick Links</h4>
              <ul className="space-y-4">
                {navItems.map(item => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-gray-600 hover:text-green-600 transition-colors flex items-center group">
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 mr-1" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Services</h4>
              <ul className="space-y-4 text-gray-600">
                <li><button onClick={() => navigateToService('web-dev')} className="hover:text-green-600 transition-colors">Web Development</button></li>
                <li><button onClick={() => navigateToService('app-dev')} className="hover:text-green-600 transition-colors">Mobile Apps</button></li>
                <li><button onClick={() => navigateToService('crm-erp')} className="hover:text-green-600 transition-colors">CRM / ERP</button></li>
                <li><button onClick={() => navigateToService('digital-marketing')} className="hover:text-green-600 transition-colors">Digital Marketing</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Contact</h4>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center space-x-3">
                  <Mail size={16} className="text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Info</span>
                    <a href="mailto:info@softvex.in" className="hover:text-blue-600 transition-colors">info@softvex.in</a>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={16} className="text-green-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Support</span>
                    <a href="mailto:support@softvex.in" className="hover:text-green-600 transition-colors">support@softvex.in</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2026 Softvex Tech Solutions. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link to="/blog" className="hover:text-gray-600">Blog</Link>
              <a href="#" className="hover:text-gray-600">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;