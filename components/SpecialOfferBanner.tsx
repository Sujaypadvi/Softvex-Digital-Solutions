import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Timer } from 'lucide-react';

const SpecialOfferBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 h-14 sm:h-16 overflow-hidden z-[100] border-b border-white/10 select-none bg-black"
    >
      {/* Subtle Premium Background Gradient */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,_rgba(59,130,246,0.3),transparent_50%),radial-gradient(circle_at_80%_50%,_rgba(34,197,94,0.3),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center gap-4">
        {/* Center Text Section */}
        <div className="flex flex-col items-center justify-center flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-blue-400 font-black uppercase tracking-[0.25em] text-[8px] sm:text-[10px]">
              Special Limited Time Offer
            </span>
            <Sparkles size={14} className="text-blue-400" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 text-center">
            <span className="text-white font-extrabold text-xs sm:text-base lg:text-lg whitespace-nowrap tracking-tight">
              Start Your Project with Just <span className="text-green-400 italic">40%</span>
            </span>
            <span className="hidden lg:inline text-gray-700 font-light text-xl">/</span>
            <span className="text-gray-200 font-bold text-[10px] sm:text-sm lg:text-base whitespace-nowrap">
              Pay Remaining in <span className="text-blue-400">2 Easy Steps</span>
            </span>
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-400/20 flex items-center gap-2"
            >
              <Timer size={12} />
              <span className="font-bold text-[8px] sm:text-[10px] uppercase tracking-wider">
                Limited Slots
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle Scanline Animation */}
      <motion.div 
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
      />
    </motion.div>
  );
};

export default SpecialOfferBanner;
