import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  const processSteps = [
    { title: 'Analysis', desc: 'Deep dive into requirements and business goals.' },
    { title: 'Planning', desc: 'Architecting the roadmap and technical stack.' },
    { title: 'Design', desc: 'Crafting pixel-perfect user experiences.' },
    { title: 'Development', desc: 'Agile coding with high standards.' },
    { title: 'Testing', desc: 'Rigorous QA and performance benchmarking.' },
    { title: 'Launch', desc: 'Seamless deployment and ongoing support.' },
  ];

  return (
    <div className="pb-24">
      {/* Intro */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-8">We are <span className="text-blue-500">architects</span> of the modern web.</h1>
            <p className="text-2xl text-gray-500 leading-relaxed mb-12">
              Softvex was founded on the principle that technology should be a multiplier for business, not a bottleneck. We combine engineering excellence with creative vision to deliver software that matters.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-green-50 voxel-border">
                <h3 className="text-xl font-bold mb-4 italic">Our Mission</h3>
                <p className="text-gray-600">To empower organizations through scalable, secure, and user-centric digital transformation.</p>
              </div>
              <div className="p-8 bg-blue-50 voxel-border">
                <h3 className="text-xl font-bold mb-4 italic">Our Vision</h3>
                <p className="text-gray-600">To be the global benchmark for digital craftsmanship and strategic innovation.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Flow - Vertical Timeline Style */}
      <section className="py-24 px-4 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">Our Methodology</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A transparent, results-driven process from the first handshake to the final release.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Center Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-1/2"></div>

            <div className="space-y-0">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center md:justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-5/12"></div>

                  {/* Center Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-2 border-black rounded-full z-20 md:-translate-x-1/2 top-8 md:top-1/2 md:-translate-y-1/2 shadow-[0_0_0_4px_white]"></div>

                  {/* Content Card Side */}
                  <div className="w-full pl-20 md:pl-0 md:w-5/12 py-8">
                    <div className="bg-white voxel-border p-8 hover:translate-y-[-5px] transition-transform duration-300 relative group z-10">

                      {/* Horizontal Connector Line (Desktop) - Adjusted for perfect center connection */}
                      <div
                        className={`hidden md:block absolute top-1/2 h-0.5 bg-black w-[calc(20%+2px)] -z-10
                          ${idx % 2 === 0 ? '-right-[20%]' : '-left-[20%]'}
                          `}
                      ></div>
                      {/* Connector endpoint circle on the card side */}
                      <div className={`hidden md:block absolute top-1/2 w-2 h-2 bg-black rounded-full -translate-y-1/2 
                          ${idx % 2 === 0 ? '-right-1' : '-left-1'}
                        `}></div>

                      {/* Mobile Connector */}
                      <div className="md:hidden absolute top-8 left-[-3rem] w-12 h-0.5 bg-black"></div>

                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold relative z-10">{step.title}</h4>
                        <div className="text-4xl font-black text-gray-100 group-hover:text-black/5 transition-colors leading-none">0{idx + 1}</div>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed relative z-10">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" className="voxel-border w-full aspect-square object-cover" alt="Modern Development" />
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" className="voxel-border w-full aspect-square object-cover mt-8" alt="Digital Innovation" />
          </div>
          <div>
            <h2 className="text-4xl font-black mb-8 uppercase tracking-tight">Built on solid values</h2>
            <div className="space-y-6">
              {[
                'Absolute transparency in communication',
                'Uncompromising quality of code',
                'Human-centric design approach',
                'Continuous learning and adaptation',
                'Long-term partnership focus'
              ].map((val, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <CheckCircle2 className="text-green-500" />
                  <span className="text-xl font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
