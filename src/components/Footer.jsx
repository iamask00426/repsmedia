import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ padding: '8rem 0 4rem 0', borderTop: '1px solid var(--color-border)', marginTop: 'auto', background: 'var(--color-bg-base)' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '6rem' }}>
        
        {/* Brand & Newsletter */}
        <div style={{ paddingRight: '2rem' }}>
          <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'block', letterSpacing: '-0.02em' }}>
            RepsMedia.
          </Link>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: '350px' }}>
            Elite digital reputation management for individuals and enterprises demanding absolute discretion.
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', marginBottom: '1rem' }}>Private Briefing</h4>
            <div style={{ display: 'flex', border: '1px solid var(--color-border)' }}>
              <input type="email" placeholder="Enter secure email" style={{ flexGrow: 1, padding: '1rem', background: 'transparent', border: 'none', color: 'var(--color-text-main)', outline: 'none', fontFamily: 'inherit' }} />
              <button style={{ padding: '0 1.5rem', background: 'var(--color-primary)', color: 'var(--color-bg-base)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Subscribe</button>
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <h4 style={{ marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}>Capabilities</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            <Link to="/services/content-removal">Content Removal</Link>
            <Link to="/services/account-recovery">Account Recovery</Link>
            <Link to="/services/pr-strategy">PR Strategy</Link>
            <Link to="/services/search-suppression">Search Suppression</Link>
            <Link to="/services/digital-audit">Digital Audit</Link>
            <Link to="/services/crisis-management">Crisis Management</Link>
          </div>
        </div>

        {/* Agency */}
        <div>
          <h4 style={{ marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}>Agency</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            <Link to="/about">Our Philosophy</Link>
            <Link to="/case-studies">Redacted Case Studies</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/press">Press & Media</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}>Legal</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">NDA Frameworks</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>

      </div>
      
      <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        <span>© {new Date().getFullYear()} RepsMedia Agency. All rights reserved.</span>
        <span>New York • London • Dubai</span>
      </div>
    </div>
  </footer>
);

export default Footer;
