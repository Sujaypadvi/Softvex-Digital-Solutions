
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { submitContactForm } from '../firebase';
import FunFactDisplay from '../components/FunFactDisplay';

const Contact: React.FC<{ selectedService?: string | null }> = ({ selectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'web-dev',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitContactForm(formData);
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', service: 'web-dev', message: '' });
  };

  return (
    <div className="pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">Let's <span className="text-green-500">Connect</span>.</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Have a project in mind? Our team is ready to discuss how we can help your business grow.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white voxel-border p-8 md:p-12 relative"
          >
            {/* Loading Overlay */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 voxel-border"
              >
                <div className="text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360, 360]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4 flex justify-center"
                  >
                    <Send size={48} className="text-green-500" />
                  </motion.div>
                  <p className="text-lg font-bold text-gray-700">Sending your message...</p>
                  <p className="text-sm text-gray-500 mt-2">Please wait</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 border-2 border-gray-100 focus:border-black outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-4 border-2 border-gray-100 focus:border-black outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-4 border-2 border-gray-100 focus:border-black outline-none transition-colors"
                    placeholder="Enter your phone"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Interested In</label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="w-full p-4 border-2 border-gray-100 focus:border-black outline-none transition-colors bg-white"
                  >
                    <option value="web-dev">Web Development</option>
                    <option value="app-dev">Mobile Apps</option>
                    <option value="crm-erp">CRM / ERP Solutions</option>
                    <option value="digital-marketing">Digital Marketing</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 border-2 border-gray-100 focus:border-black outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-black text-white p-5 font-bold text-lg voxel-border hover:bg-gray-800 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send size={18} />
                    </motion.div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>

          </motion.div>

          {/* Success Modal Popup */}
          {submitted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 max-w-md w-full voxel-border text-center relative shadow-2xl"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle className="text-green-600 w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black mb-4">Message Sent!</h2>
                <p className="text-gray-500 mb-8">Thank you for reaching out. We've received your details and will get back to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}

          {/* Info Side */}

          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white voxel-border text-center group hover:border-blue-200 transition-colors">
                <div className="flex justify-center mb-3 text-blue-400"><Mail /></div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Inquiries</p>
                <a href="mailto:info@softvex.in" className="text-sm font-medium hover:text-blue-600 transition-colors">info@softvex.in</a>
              </div>
              <div className="p-6 bg-white voxel-border text-center group hover:border-green-200 transition-colors">
                <div className="flex justify-center mb-3 text-green-400"><Mail /></div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Support</p>
                <a href="mailto:support@softvex.in" className="text-sm font-medium hover:text-green-600 transition-colors">support@softvex.in</a>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tight">Tech Trivia</h3>
              <FunFactDisplay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
