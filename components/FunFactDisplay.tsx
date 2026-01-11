import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Terminal, Cpu, Globe } from 'lucide-react';

const FACTS = [
    "The first computer bug was an actual bug—a moth trapped in a relay of the Harvard Mark II in 1947.",
    "The first domain name ever registered was Symbolics.com on March 15, 1985.",
    "More than 3.5 billion searches are performed on Google every single day.",
    "The QWERTY keyboard layout was designed to slow down typists to prevent typewriter jams.",
    "Linux powers 100% of the world's top 500 supercomputers.",
    "The Apollo 11 guidance computer had less processing power than a modern toaster.",
    "Email was invented before the World Wide Web.",
    "The first 1GB hard drive, announced by IBM in 1980, weighed over 500 pounds and cost $40,000."
];

const FunFactDisplay: React.FC = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % FACTS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-80 bg-white voxel-border relative overflow-hidden flex flex-col items-center justify-center p-8 text-center text-black border-2 border-black">
            {/* Background Matrix Effect */}
            <div className="absolute inset-0 opacity-5 font-mono text-xs overflow-hidden leading-3 pointer-events-none text-black break-all select-none">
                {Array(2000).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
            </div>

            <div className="relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-200">
                        {index % 4 === 0 && <Lightbulb size={32} className="text-yellow-500" />}
                        {index % 4 === 1 && <Terminal size={32} className="text-green-600" />}
                        {index % 4 === 2 && <Cpu size={32} className="text-blue-600" />}
                        {index % 4 === 3 && <Globe size={32} className="text-purple-600" />}
                    </div>
                </div>

                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Did You Know?</h3>

                <div className="h-32 flex items-center justify-center max-w-sm mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-xl md:text-2xl font-bold leading-tight"
                        >
                            "{FACTS[index]}"
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Progress indicators */}
                <div className="flex justify-center space-x-2 mt-4">
                    {FACTS.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-black' : 'w-2 bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FunFactDisplay;
