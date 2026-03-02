import React from 'react';
import { motion } from 'framer-motion';

const ContactVisual: React.FC = () => {
    // Generate a grid of "voxels"
    const voxels = Array.from({ length: 42 });

    return (
        <div className="w-full h-80 bg-gray-50 voxel-border overflow-hidden relative flex items-center justify-center">
            <div className="absolute inset-0 bg-grid opacity-10" />

            {/* Central pulsating core */}
            <motion.div
                className="w-24 h-24 bg-gradient-to-tr from-green-400 to-blue-500 blur-2xl absolute"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="grid grid-cols-7 gap-2 relative z-10 p-8">
                {voxels.map((_, i) => (
                    <motion.div
                        key={i}
                        className={`w-8 h-8 ${i % 2 === 0 ? 'bg-black' : 'bg-green-500'} voxel-border opacity-80`}
                        initial={{ scale: 0 }}
                        animate={{
                            scale: [0, 1, 0.5, 1],
                            rotate: [0, 90, 180, 270, 0],
                            borderRadius: ["0%", "20%", "50%", "0%"]
                        }}
                        transition={{
                            duration: 3,
                            delay: i * 0.05,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`p-${i}`}
                    className="absolute w-2 h-2 bg-blue-500"
                    animate={{
                        x: [0, Math.random() * 200 - 100],
                        y: [0, Math.random() * 200 - 100],
                        opacity: [1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                    style={{
                        left: '50%',
                        top: '50%'
                    }}
                />
            ))}
        </div>
    );
};

export default ContactVisual;
