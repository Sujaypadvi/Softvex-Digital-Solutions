
import React from 'react';
import { motion } from 'framer-motion';

const VoxelBackground: React.FC = () => {
  const blocks = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {blocks.map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10 bg-gradient-to-br from-green-300 to-blue-300 border border-black"
          style={{
            width: Math.random() * 40 + 20,
            height: Math.random() * 40 + 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default VoxelBackground;
