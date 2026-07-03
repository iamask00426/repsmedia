import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Send, Mail, MessageSquare, Shield } from 'lucide-react';

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer style={{ padding: '6rem 0 3.5rem 0', borderTop: '1px solid var(--color-border)', marginTop: 'auto', background: 'var(--color-bg-surface)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glow overlay */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.02) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', marginBottom: '5rem' }} className="footer-grid">
          
          {/* Column 1: Brand & Info (Span 4) */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="footer-col">
            <Link 
              to="/" 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.75rem', 
                fontWeight: 800, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                letterSpacing: '-0.02em',
                color: '#ffffff'
              }}
            >
              <ShieldAlert size={26} style={{ color: 'var(--color-primary)' }} />
              <span>RepsMedia<span style={{ color: 'var(--color-primary)' }}>.</span></span>
            </Link>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '320px' }}>
              Elite digital reputation intelligence and rapid-response crisis remediation for individuals and enterprises demanding absolute discretion.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#10b981', fontWeight: 600, marginTop: '0.5rem' }}>
              <Shield size={14} />
              <span>100% NDA Protected & Encrypted</span>
            </div>
          </div>

          {/* Column 2: Capabilities (Span 3) */}
          <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="footer-col">
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: '#ffffff', fontWeight: 700 }}>Capabilities</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              <Link to="/services/content-removal" style={{ transition: 'color 0.2s' }}>Content Removal</Link>
              <Link to="/services/account-recovery" style={{ transition: 'color 0.2s' }}>Account Recovery</Link>
              <Link to="/services/search-suppression" style={{ transition: 'color 0.2s' }}>Search Suppression</Link>
              <Link to="/services/pr-strategy" style={{ transition: 'color 0.2s' }}>PR & Media Strategy</Link>
              <Link to="/services/crisis-management" style={{ transition: 'color 0.2s' }}>Crisis Management</Link>
            </div>
          </div>

          {/* Column 3: Secure Channels (Span 2) */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="footer-col">
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: '#ffffff', fontWeight: 700 }}>Secure Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} style={{ color: 'var(--color-primary)' }} />
                <a href="mailto:priority@repsmedia.in" style={{ transition: 'color 0.2s' }}>Email</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={14} style={{ color: 'var(--color-primary)' }} />
                <a href="https://wa.me/918368215537" target="_blank" rel="noopener noreferrer" style={{ transition: 'color 0.2s' }}>WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Column 4: Private Briefing (Span 3) */}
          <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="footer-col">
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: '#ffffff', fontWeight: 700 }}>Private Briefing</h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Subscribe to receive encrypted updates on digital security issues.
            </p>
            {subscribed ? (
              <div style={{ color: 'var(--color-success)', fontSize: '0.8rem', fontWeight: 600, padding: '0.75rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '6px' }}>
                ✓ Secure subscription active.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: '6px', background: 'rgba(255,255,255,0.01)', overflow: 'hidden', padding: '0.15rem' }}>
                <input 
                  required 
                  type="email" 
                  placeholder="secure@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flexGrow: 1, padding: '0.5rem 0.75rem', background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontFamily: 'inherit', fontSize: '0.8rem' }} 
                />
                <button type="submit" style={{ padding: '0 0.85rem', background: 'var(--color-primary)', color: '#ffffff', borderRadius: '4px', fontWeight: 600, fontSize: '0.75rem' }}>
                  Join
                </button>
              </form>
            )}
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', flexWrap: 'wrap', gap: '1.5rem' }} className="footer-bottom-bar">
          <span>© {new Date().getFullYear()} RepsMedia Agency. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.25rem', fontWeight: 600 }} className="footer-links">
            <a href="#">NDA Framework</a>
            <span style={{ color: 'var(--color-border)' }}>•</span>
            <a href="#">Privacy Policy</a>
            <span style={{ color: 'var(--color-border)' }}>•</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .footer-col {
            grid-column: span 12 !important;
          }
        }
        @media (max-width: 768px) {
          .footer-bottom-bar {
            flex-direction: column !important;
            text-align: center !important;
            align-items: center !important;
            gap: 1rem !important;
          }
          .footer-links {
            justify-content: center !important;
            flex-wrap: wrap !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

