import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
      <div className="container">
        <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', marginTop: '4rem', marginBottom: '4rem' }}>
          
          <motion.div className="bento-item" initial="hidden" animate="visible" variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}>
            <motion.div variants={fadeUp} className="tag">
              100% Confidential
            </motion.div>
            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Initiate a Case.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', marginBottom: '3rem' }}>
              Submit your inquiry below. A senior strategist will review your situation and contact you via secure channel within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h4 style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Direct Inquiry</h4>
                <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>priority@repsmedia.com</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Global Headquarters</h4>
                <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>New York, NY</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="bento-item" style={{ background: 'var(--color-bg-surface)' }}
          >
            {formStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '6rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>✓</div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Inquiry Secured</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>Your information has been encrypted and transmitted. We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Full Name / Organization</label>
                  <input required type="text" style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', fontFamily: 'inherit', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Secure Email</label>
                  <input required type="email" style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', fontFamily: 'inherit', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Primary Objective</label>
                  <select required style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', fontFamily: 'inherit', appearance: 'none', outline: 'none' }}>
                    <option value="" disabled selected>Select an objective...</option>
                    <option value="removal">Content Removal</option>
                    <option value="recovery">Account Recovery</option>
                    <option value="pr">PR Strategy</option>
                    <option value="suppression">Search Suppression</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Brief Overview</label>
                  <textarea required rows="4" style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', fontFamily: 'inherit', resize: 'vertical', outline: 'none' }}></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={formStatus === 'submitting'}>
                  <span>{formStatus === 'submitting' ? 'Transmitting...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
