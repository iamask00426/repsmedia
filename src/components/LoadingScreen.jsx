import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';

const LoadingScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has already seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem('repsmedia_seen_loader');
    if (hasSeenLoader) {
      setLoading(false);
      return;
    }

    // Simulate progress increments
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('repsmedia_seen_loader', 'true');
          }, 600);
          return 100;
        }
        // Random incremental steps
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: '#050505',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem'
            }}
          >
            {/* Ambient Background Glows */}
            <div style={{
              position: 'absolute',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(123, 97, 255, 0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              zIndex: -1
            }} />

            {/* Shield Logo Wrapper */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '24px',
                background: 'rgba(123, 97, 255, 0.05)',
                border: '1px solid rgba(123, 97, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7B61FF',
                marginBottom: '2rem',
                position: 'relative',
                boxShadow: '0 0 30px rgba(123, 97, 255, 0.15)'
              }}
            >
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '28px',
                  border: '2px dashed rgba(123, 97, 255, 0.3)',
                  pointerEvents: 'none'
                }}
              />
              <Shield size={42} />
            </motion.div>

            {/* Loading text */}
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '0.05em',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>Loading Reps Media</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ...
              </motion.span>
            </motion.h2>

            {/* Custom Progress Bar */}
            <div
              style={{
                width: '240px',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '99px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #7B61FF 0%, #3B82F6 100%)',
                  borderRadius: '99px',
                  boxShadow: '0 0 8px #7B61FF'
                }}
              />
            </div>

            {/* Percentage indicator */}
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                marginTop: '0.75rem',
                fontWeight: 500
              }}
            >
              {progress}% Securing Gateway
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render the actual app once loading transitions out */}
      <motion.div
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default LoadingScreen;
