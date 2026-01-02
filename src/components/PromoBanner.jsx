'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi';

export default function PromoBanner() {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Generate snowflakes
    const flakes = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: Math.random() * 6 + 4,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white h-[46px] px-3 overflow-hidden"
    >
      {/* Animated background shine */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        animate={{
          x: ['-200%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut',
        }}
      />

      {/* Snowfall Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map((flake) => (
          <motion.div
            key={flake.id}
            className="absolute text-white/60"
            style={{
              left: `${flake.left}%`,
              top: '-10px',
              fontSize: `${flake.size}px`,
            }}
            animate={{
              y: [0, 60],
              x: [0, Math.sin(flake.id) * 10],
              rotate: [0, 360],
              opacity: [0.8, 0.3, 0],
            }}
            transition={{
              duration: flake.duration,
              repeat: Infinity,
              delay: flake.delay,
              ease: 'linear',
            }}
          >
            ❄
          </motion.div>
        ))}
      </div>

      {/* Animated Motorcycle - Left to Right */}
      <motion.div
        className="absolute bottom-1 text-xl"
        animate={{
          x: ['-50px', 'calc(100vw + 50px)'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        🏍️
      </motion.div>

      {/* Animated Motorcycle - Right to Left (smaller, faster) */}
      <motion.div
        className="absolute top-1 text-sm opacity-60"
        animate={{
          x: ['calc(100vw + 30px)', '-30px'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
          delay: 3,
        }}
      >
        🏎️
      </motion.div>

      {/* Speed lines effect */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{
            top: `${15 + i * 8}%`,
            width: '30px',
          }}
          animate={{
            x: ['-50px', 'calc(100vw + 50px)'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center">
        {/* Center - Main Message */}
        <div className="flex items-center gap-2">
          {/* Left decorations */}
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="text-sm hidden sm:block"
          >
            🎄
          </motion.span>
          
          <HiSparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
          
          <div className="flex flex-col items-center">
            <h2 className="text-[10px] sm:text-xs font-bold tracking-wide bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
              YIL SONU ÖZEL
            </h2>
            <p className="text-[8px] sm:text-[10px] font-medium text-white/90 flex items-center gap-1">
              <span className="text-yellow-300">✨</span>
              %45'e varan indirim
              <span className="text-yellow-300">✨</span>
            </p>
          </div>
          
          <HiSparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
          
          {/* Right decorations */}
          <motion.span
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="text-sm hidden sm:block"
          >
            🎅
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
