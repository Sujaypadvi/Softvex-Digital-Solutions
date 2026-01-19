
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Layout, Smartphone, Settings, TrendingUp } from 'lucide-react';
import { SERVICES_DATA, TECHNOLOGIES, WHY_CHOOSE_US, DEMO_PROJECTS } from '../constants';
import VoxelBackground from '../components/VoxelBackground';

// Helper to map icon string names to Lucide icon components
const IconMap: Record<string, React.ElementType> = {
  Layout,
  Smartphone,
  Settings,
  TrendingUp,
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-32 sm:px-6 lg:px-8 overflow-hidden">
        <VoxelBackground />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-4 mb-6 text-sm font-bold bg-blue-100 text-blue-700 uppercase tracking-widest border border-blue-200">
              Innovation at Scale
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              Building Smart <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
                Digital Solutions
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-12">
              Softvex bridges the gap between imagination and reality with robust, scalable software architecture and premium user experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => navigate('/services')}
                className="w-full sm:w-auto voxel-border bg-black text-white px-8 py-4 font-bold text-lg flex items-center justify-center group"
              >
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto voxel-border bg-white text-black px-8 py-4 font-bold text-lg"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Bar */}
      <section className="bg-white border-y border-gray-200 py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Powering Enterprises with Modern Tech</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {TECHNOLOGIES.map((tech) => (
              <div key={tech.name} className="flex items-center space-x-3 group cursor-default">
                <img
                  src={tech.icon as string}
                  alt={`${tech.name} logo`}
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-bold text-xl text-gray-400 group-hover:text-black transition-colors duration-300">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Our Expertise</h2>
            <div className="w-24 h-2 bg-green-300"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES_DATA.map((service, idx) => {
              // Fix: Correctly get the icon component from the map based on the service icon string
              const ServiceIcon = IconMap[service.icon] || Layout;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white voxel-border p-8 flex flex-col h-full"
                >
                  <div className="w-12 h-12 bg-blue-100 flex items-center justify-center mb-6">
                    <div className="text-blue-600">
                      {/* Fix: Use the mapped icon component instead of trying to use an array member as a JSX tag directly */}
                      <ServiceIcon size={24} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-500 flex-grow mb-8">{service.description}</p>
                  <button
                    onClick={() => navigate('/services')}
                    className="text-sm font-bold text-green-600 flex items-center hover:underline"
                  >
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Projects Section */}
      <section className="py-24 px-4 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Our Work</h2>
            <div className="w-24 h-2 bg-blue-300 mx-auto"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Explore some of our recent projects and see how we help businesses transform their digital presence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {DEMO_PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white voxel-border overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${project.title.includes('Pravasya') ? 'object-left' : 'object-center'}`}
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-500 mb-6 line-clamp-3">{project.desc}</p>
                  <button
                    onClick={() => navigate('/projects')}
                    className="inline-flex items-center text-sm font-bold text-black border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors"
                  >
                    View Project <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors border-b-2 border-transparent hover:border-blue-800"
            >
              View All Projects <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Softvex */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8">Why Choose <span className="text-green-500">Softvex</span>?</h2>
              <div className="space-y-12">
                {WHY_CHOOSE_US.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-50 voxel-border flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-blue-50 voxel-border relative overflow-hidden">
                <img src="https://picsum.photos/800/800?grayscale" alt="Team working" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-tr from-green-200/40 to-blue-200/40" />
                <div className="absolute bottom-6 left-6 right-6 bg-white voxel-border p-6 shadow-xl">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 text-center">Our Promise</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 flex items-center justify-center text-blue-600 rounded-lg">
                        <Star size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Rapid Delivery</p>
                        <p className="text-xs text-gray-400">MVP in weeks, not months</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 flex items-center justify-center text-green-600 rounded-lg">
                        <TrendingUp size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Future-Proof Tech</p>
                        <p className="text-xs text-gray-400">Built with modern standards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-black p-12 md:p-20 voxel-border text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to Build the Future?</h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            Our engineers are ready to turn your complex problems into elegant digital solutions. Let's talk strategy.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-green-300 text-black px-10 py-5 font-bold text-xl voxel-border hover:bg-green-400"
          >
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
