import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Clean, Bright Hero Section */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '100px', background: 'radial-gradient(circle at top right, rgba(37,99,235,0.05) 0%, transparent 40%)' }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div variants={fadeUp} className="tag">Enterprise Digital Protection</motion.div>
            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '2rem' }}>
              Take Control of Your <br />
              <span className="text-gradient">Digital Narrative.</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem auto', fontWeight: 400 }}>
              Definitive crisis management and rapid content removal for individuals and enterprises demanding absolute discretion.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Initiate Case <ArrowRight size={18} style={{ marginLeft: '8px' }} /></Link>
              <Link to="/services" className="btn-secondary">View Capabilities</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section style={{ padding: '3rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', fontWeight: 600 }}>
            <span>Trusted By Fortune 500s</span>
            <span>Venture Capital Firms</span>
            <span>Global Public Figures</span>
            <span>Family Offices</span>
          </div>
        </div>
      </section>

      {/* Widget/Card Services Grid */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}><strong>Specialized Capabilities</strong></h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem' }}>Advanced solutions for modern digital threats.</p>
            </motion.div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {servicesData.map((service) => (
                <motion.div key={service.id} variants={fadeUp} className="card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(37,99,235,0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}><strong>{service.title}</strong></h3>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', flexGrow: 1 }}>{service.shortDesc}</p>
                  <Link to={`/services/${service.id}`} style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    Learn more <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div variants={fadeUp}>
              <div className="tag">Our Methodology</div>
              <h2 style={{ fontSize: '3.5rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}><strong>Surgical Precision, <br/>Absolute Discretion.</strong></h2>
            </motion.div>
            <motion.div variants={fadeUp}>
              <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                The internet does not forget, and it does not forgive. A single defamatory article or unauthorized image can destroy decades of brand equity overnight.
              </p>
              <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                We exist to rebalance the scales. RepsMedia operates at the intersection of international law, advanced technical SEO, and platform engineering to ensure that your digital footprint reflects reality.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* By The Numbers / Stats */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4rem', textAlign: 'center', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', borderRadius: '24px', padding: '4rem', color: '#ffffff', boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)' }}>
            <motion.div variants={fadeUp} style={{ flex: 1 }}>
              <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>98%</div>
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', opacity: 0.9 }}>Removal Success Rate</div>
            </motion.div>
            <motion.div variants={fadeUp} style={{ flex: 1 }}>
              <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>$50B+</div>
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', opacity: 0.9 }}>Client Value Protected</div>
            </motion.div>
            <motion.div variants={fadeUp} style={{ flex: 1 }}>
              <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>24/7</div>
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', opacity: 0.9 }}>Rapid Response</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
};

export default Home;
