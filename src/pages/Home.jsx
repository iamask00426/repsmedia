import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { ShieldAlert, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'relative' }}>
      
      {/* Background Grids */}
      <div className="ambient-bg" />
      <div className="grid-overlay" />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div variants={fadeUp} className="tag">
              Executive Digital Reputation Recovery
            </motion.div>
            <motion.h1 variants={fadeUp} className="hero-title" style={{ fontSize: 'clamp(2.25rem, 6.5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', fontWeight: 800 }}>
              Definitive Content Removal <br />
              & <span className="text-gradient">Account Unban Services.</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }} className="hero-desc">
              We permanently delete defamatory news articles, recover hacked or banned social accounts (Instagram, Meta, X, LinkedIn), and clean Google Page 1 search results under strict NDA protection.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-buttons-container">
              <Link to="/contact" className="btn-primary hero-btn" style={{ borderRadius: '6px' }}>
                Initiate Confidential Case <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </Link>
              <Link to="/services" className="btn-secondary hero-btn" style={{ borderRadius: '6px' }}>
                Our Capabilities
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="capabilities-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="section-header">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }} className="section-title">Our Capabilities</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Surgical remediation vectors for digital assets and search engines.</p>
          </div>
          
          <div className="grid-layout">
            {servicesData.map((service) => (
              <div 
                key={service.id} 
                className="card capabilities-card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  minHeight: '320px',
                  background: 'var(--color-bg-surface)',
                  borderRadius: '12px'
                }}
              >
                <div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', fontWeight: 700 }}>{service.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{service.shortDesc}</p>
                </div>
                
                <Link to={`/services/${service.id}`} style={{ color: '#ffffff', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <span>Learn more</span>
                  <ArrowRight size={14} style={{ color: 'var(--color-primary)' }} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secure Retainer Call to Action */}
      <section className="secure-cta-section">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <ShieldAlert size={36} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }} className="cta-title">Protect Your Digital Capital</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }} className="cta-desc">
            We work with executives, startup founders, and global public figures under absolute confidentiality. Submit details of your case, and a senior strategist will contact you shortly.
          </p>
          <Link to="/contact" className="btn-primary cta-btn" style={{ borderRadius: '6px' }}>
            Initiate Secure Case Consultation
          </Link>
        </div>
      </section>

      <style>{`
        .hero-section {
          display: flex;
          align-items: center;
          padding-top: 140px;
          padding-bottom: 3.5rem;
        }
        .hero-buttons-container {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .capabilities-section {
          padding: 4.5rem 0 6rem 0;
        }
        .secure-cta-section {
          padding: 6rem 0;
          border-top: 1px solid var(--color-border);
          background-color: rgba(12, 17, 29, 0.4);
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 120px;
            padding-bottom: 2rem;
          }
          .hero-desc {
            font-size: 1rem !important;
            margin-bottom: 1.75rem !important;
          }
          .hero-buttons-container {
            flex-direction: column;
            gap: 0.75rem;
            align-items: stretch;
            max-width: 320px;
            margin: 0 auto;
          }
          .hero-btn {
            width: 100%;
            text-align: center;
          }
          .capabilities-section {
            padding: 3rem 0 4rem 0;
          }
          .section-header {
            margin-bottom: 2.5rem !important;
          }
          .section-title {
            font-size: 2rem !important;
          }
          .capabilities-card {
            min-height: auto !important;
          }
          .secure-cta-section {
            padding: 3.5rem 0;
          }
          .cta-title {
            font-size: 1.75rem !important;
          }
          .cta-desc {
            font-size: 0.95rem !important;
            margin-bottom: 1.5rem !important;
          }
          .cta-btn {
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Home;

