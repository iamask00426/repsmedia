import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldAlert } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.nav 
      className="glass"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ 
        padding: '1rem 0', 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        zIndex: 50, 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(5, 5, 5, 0.75)'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        
        {/* Logo */}
        <Link 
          to="/" 
          onClick={closeMenu}
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.5rem', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <ShieldAlert size={24} style={{ color: 'var(--color-primary)' }} />
          <span>RepsMedia<span style={{ color: 'var(--color-primary)' }}>.</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav-menu">
          {navLinks.map((link) => {
            const isActive = link.path === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(link.path);

            if (link.name === 'Contact') return null;

            return (
              <Link 
                key={link.name}
                to={link.path} 
                style={{ 
                  color: isActive ? '#ffffff' : 'var(--color-text-muted)',
                  fontSize: '0.85rem', 
                  fontWeight: 600, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em',
                  position: 'relative',
                  padding: '0.5rem 0'
                }}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      right: 0, 
                      height: '2px', 
                      background: 'var(--color-primary)',
                      borderRadius: '99px'
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          
          <Link to="/contact" className="btn-primary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem', borderRadius: '6px' }}>
            Initiate Case
          </Link>
        </div>

        {/* Mobile Hamburguer Toggle */}
        <button 
          onClick={toggleMenu} 
          style={{ 
            display: 'none', 
            color: '#ffffff', 
            padding: '0.5rem' 
          }} 
          className="mobile-nav-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ 
              position: 'absolute', 
              top: '100%', 
              left: 0, 
              width: '100%', 
              background: '#050505',
              borderBottom: '1px solid var(--color-border)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem 2rem',
              gap: '1.25rem',
              zIndex: 49
            }}
          >
            {navLinks.map((link) => {
              const isActive = link.path === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(link.path);

              if (link.name === 'Contact') return null;

              return (
                <Link 
                  key={link.name}
                  to={link.path} 
                  onClick={closeMenu}
                  style={{ 
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    fontSize: '1.15rem', 
                    fontWeight: 700, 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.02)',
                    paddingBottom: '0.5rem'
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link 
              to="/contact" 
              onClick={closeMenu}
              className="btn-primary" 
              style={{ width: '100%', padding: '0.85rem', textAlign: 'center', marginTop: '0.5rem', borderRadius: '6px' }}
            >
              Initiate Case
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav-menu {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
