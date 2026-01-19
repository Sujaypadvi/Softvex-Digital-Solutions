
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { SERVICES_DATA } from '../constants';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  useEffect(() => {
    if (serviceId) {
      const element = document.getElementById(serviceId);
      if (element) {
        // Add a small delay/timeout to ensure layout is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [serviceId]);

  // Also handle hash-based navigation from footer links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="pb-24">
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">Our <span className="text-blue-500">Solutions</span></h1>
          <p className="text-xl text-gray-500 pl-2">Comprehensive digital services tailored for the modern enterprise.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-24">
        {SERVICES_DATA.map((service, idx) => (
          <motion.div
            id={service.id}
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
          >
            <div className="flex-1 w-full">
              <div className={`p-10 voxel-border ${idx % 2 === 0 ? 'bg-green-50' : 'bg-blue-50'}`}>
                <h2 className="text-3xl font-black mb-4">{service.title}</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">{service.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Core Features</h4>
                    <ul className="space-y-2">
                      {service.features.map(f => (
                        <li key={f} className="flex items-center text-sm font-medium">
                          <span className="w-2 h-2 bg-black mr-3" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Tech We Use</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.tools.map(t => (
                        <span key={t} className="px-3 py-1 bg-white border border-gray-200 text-xs font-bold">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Key Benefits</h4>
                  <div className="flex flex-wrap gap-4">
                    {service.benefits.map(b => (
                      <div key={b} className="flex items-center text-sm bg-black/5 px-4 py-2 font-medium italic">
                        "{b}"
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/contact/${service.id}`)}
                  className="w-full md:w-auto bg-black text-white px-10 py-4 font-bold voxel-border hover:bg-gray-800 transition-colors"
                >
                  Request Quote
                </button>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="aspect-video voxel-border overflow-hidden bg-gray-100 relative group">
                <div className="absolute inset-0 bg-blue-500 mix-blend-overlay opacity-20 group-hover:opacity-0 transition-opacity duration-500" />
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
