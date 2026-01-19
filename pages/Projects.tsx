import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DEMO_PROJECTS } from '../constants';

const Projects: React.FC = () => {
    return (
        <div className="pb-24">
            <section className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-6xl font-black mb-6">Our Projects</h1>
                    <p className="text-xl text-gray-500">Showcasing our best work and digital innovations.</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {DEMO_PROJECTS.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-white voxel-border overflow-hidden flex flex-col h-full"
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${project.title.includes('Pravasya') ? 'object-left' : 'object-center'}`}
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                <p className="text-gray-500 mb-6 flex-grow">{project.desc}</p>
                                <a
                                    href={project.link}
                                    className="inline-flex items-center text-sm font-bold text-black border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors w-max"
                                >
                                    View Project <ArrowRight size={16} className="ml-2" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
