import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav 
      className="glass"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ padding: '1.5rem 0', position: 'fixed', top: 0, width: '100%', zIndex: 50, borderBottom: '1px solid var(--color-border)' }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          RepsMedia.
        </Link>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Link to="/" style={{ color: location.pathname === '/' ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>Home</Link>
          <Link to="/services" style={{ color: location.pathname.includes('/services') ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>Services</Link>
          <Link to="/contact" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Initiate Case</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
