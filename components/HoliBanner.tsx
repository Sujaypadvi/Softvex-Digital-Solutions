import React from 'react';
import { motion } from 'framer-motion';

const ColorBlast = ({ color, delay, className }: { color: string, delay: number, className?: string }) => (
  <motion.svg
    width="120"
    height="120"
    viewBox="0 0 100 100"
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1.4, 1.8],
      opacity: [1, 0.4, 0]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay: delay,
      ease: "easeOut"
    }}
    className={`absolute pointer-events-none drop-shadow-md ${className}`}
  >
    {/* Central main core blast blob - uneven shape */}
    <path
      d="M50 35C55 25 70 30 75 40C80 50 70 65 55 70C40 75 25 65 20 50C15 35 30 25 50 35Z"
      fill={color}
    />
    {/* Splattered droplets around the blast - irregular */}
    {[...Array(6)].map((_, i) => {
      const angle = (i * 60 * Math.PI) / 180;
      const dist = 35 + Math.random() * 15;
      const x = 50 + Math.cos(angle) * dist;
      const y = 50 + Math.sin(angle) * dist;
      const rx = 4 + Math.random() * 6;
      const ry = 4 + Math.random() * 6;
      return (
        <motion.path
          key={i}
          d={`M${x} ${y - ry}C${x + rx} ${y - ry} ${x + rx} ${y + ry} ${x} ${y + ry}C${x - rx} ${y + ry} ${x - rx} ${y - ry} ${x} ${y - ry}Z`}
          fill={color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0.5], x: [0, Math.cos(angle) * 10] }}
          transition={{ duration: 2, repeat: Infinity, delay: delay + i * 0.1 }}
        />
      );
    })}
  </motion.svg>
);

const ColorDrop = ({ color, delay, className }: { color: string, delay: number, className?: string }) => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    initial={{ y: -20, opacity: 0, rotate: 0 }}
    animate={{
      y: [0, 20, 40],
      opacity: [0, 0.7, 0],
      scale: [1, 1.4, 1.8],
      rotate: [0, 15, -15, 0]
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      delay: delay,
      ease: "linear"
    }}
    className={`absolute pointer-events-none ${className}`}
  >
    <path
      d="M20 5C25 5 35 15 35 25C35 35 25 40 20 40C15 40 5 35 5 25C5 15 15 5 20 5Z"
      fill={color}
      className="blur-[1px] opacity-70"
    />
  </motion.svg>
);

const HoliBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 h-14 sm:h-16 overflow-hidden z-[100] border-b border-white/20 select-none bg-white"
    >
      {/* Abstract Color Smoke/Cloud Background */}
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-10, 10, -10],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-50%] left-[-10%] w-[70%] h-[200%] bg-gradient-radial from-pink-300/40 via-purple-200/20 to-transparent blur-[80px]"
        />
        <motion.div
          animate={{
            x: [20, -20, 20],
            y: [10, -10, 10],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-30%] right-[-10%] w-[60%] h-[180%] bg-gradient-radial from-blue-300/40 via-cyan-200/20 to-transparent blur-[90px]"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[30%] w-[40%] h-[150%] bg-gradient-radial from-yellow-200/30 via-green-100/10 to-transparent blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-between gap-4">
        {/* Left Side Blasts */}
        <div className="relative w-24 h-full hidden md:block shrink-0">
          <ColorBlast color="#FF1493" delay={0} className="top-[-20px] left-[-20px]" />
          <ColorBlast color="#32CD32" delay={1.5} className="bottom-[-10px] right-0" />
          <ColorDrop color="#FF1493" delay={0.5} className="top-2 left-4" />
          <ColorDrop color="#9400D3" delay={2.5} className="top-6 left-12" />
        </div>

        {/* Center Text Section */}
        <div className="flex flex-col items-center justify-center flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#9400D3] font-black uppercase tracking-[0.25em] text-[9px] sm:text-[11px] drop-shadow-sm">
              ✨ Happy Holi Special Offer ✨
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 text-center">
            <span className="text-slate-900 font-extrabold text-xs sm:text-base lg:text-lg whitespace-nowrap tracking-tight">
              Start Your Project with Just <span className="bg-[#FF1493] text-white px-3 py-0.5 rounded-full font-black italic shadow-sm">40%</span>
            </span>
            <span className="hidden lg:inline text-slate-300 font-light text-xl">/</span>
            <span className="text-slate-800 font-bold text-[10px] sm:text-sm lg:text-base whitespace-nowrap">
              Pay Remaining in <span className="underline decoration-[#32CD32] decoration-[3px] underline-offset-4">2 Easy Steps</span>
            </span>
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [-1, 1, -1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-red-50 text-red-600 px-3 py-1 rounded-md border border-red-200 flex items-center shadow-sm"
            >
              <span className="font-black text-[8px] sm:text-[10px] uppercase tracking-tighter">
                Limited Slots Available
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right Side Blasts */}
        <div className="relative w-24 h-full hidden md:block shrink-0">
          <ColorBlast color="#00BFFF" delay={0.7} className="top-[-10px] right-[-20px]" />
          <ColorBlast color="#FFD700" delay={2.2} className="bottom-[-20px] left-0" />
          <ColorDrop color="#00BFFF" delay={1.2} className="top-4 right-4" />
          <ColorDrop color="#FFD700" delay={3.2} className="top-8 right-12" />
        </div>
      </div>

      {/* Background Floating/Flowing Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 50],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
            className="absolute rounded-full blur-[4px]"
            style={{
              width: Math.random() * 15 + 5,
              height: Math.random() * 15 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#FF1493', '#9400D3', '#00BFFF', '#32CD32', '#FFD700'][i % 5]
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HoliBanner;
