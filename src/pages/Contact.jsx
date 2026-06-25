import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Lock, Mail, MapPin, Loader2, MessageSquare, Send } from 'lucide-react';
import supabase from '../supabaseClient';

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle, transmitting, success, error
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [objective, setObjective] = useState('');
  const [overview, setOverview] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('transmitting');
    setErrorMsg('');

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          { name, email, objective, overview }
        ]);

      if (error) throw error;
      
      setFormStatus('success');
      setName('');
      setEmail('');
      setObjective('');
      setOverview('');
    } catch (err) {
      console.error('Supabase transmission error:', err);
      setErrorMsg(err.message || 'Verification payload could not be dispatched.');
      setFormStatus('error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contact-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
      
      {/* Background patterns */}
      <div className="ambient-bg" />
      <div className="grid-overlay" />

      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="grid-12 contact-grid">
          
          {/* Info text column */}
          <div className="col-span-5 contact-info-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="tag" style={{ width: 'fit-content' }}>
              <Lock size={12} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'text-bottom' }} /> SECURE INTAKE
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Initiate <br />
              <span className="text-gradient">Case File.</span>
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              All inquiries are encrypted and handled directly by senior partners. Consultation and dossier details are protected by binding mutual NDAs.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={16} style={{ color: 'var(--color-primary)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Secure Email</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>priority@repsmedia.in</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MessageSquare size={16} style={{ color: 'var(--color-primary)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>WhatsApp</span>
                  <a href="https://wa.me/918368215537" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', textDecoration: 'underline' }}>+91 83682 15537</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Send size={16} style={{ color: 'var(--color-primary)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Telegram</span>
                  <a href="https://t.me/repsayu" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', textDecoration: 'underline' }}>@repsayu</a>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin size={16} style={{ color: 'var(--color-primary)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Locations</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>New York • London • Dubai</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card column */}
          <div 
            className="col-span-7 form-card contact-form-card"
            style={{ 
              background: 'var(--color-bg-surface)',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '520px'
            }}
          >
            <AnimatePresence mode="wait">
              
              {/* Form Input */}
              {formStatus === 'idle' && (
                <motion.form 
                  key="form-idle"
                  onSubmit={handleSubmit} 
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Full Name / Corporate Brand</label>
                    <input 
                      required 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ width: '100%', padding: '0.85rem 1.15rem', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#ffffff', fontFamily: 'inherit', outline: 'none', fontSize: '0.95rem', transition: 'border-color 0.2s' }} 
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Secure Email Address</label>
                    <input 
                      required 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '0.85rem 1.15rem', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#ffffff', fontFamily: 'inherit', outline: 'none', fontSize: '0.95rem', transition: 'border-color 0.2s' }} 
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Primary Objective</label>
                    <div style={{ position: 'relative' }}>
                      <select 
                        required 
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                        style={{ width: '100%', padding: '0.85rem 1.15rem', background: 'var(--color-bg-base)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#ffffff', fontFamily: 'inherit', outline: 'none', fontSize: '0.95rem', appearance: 'none', cursor: 'pointer', transition: 'border-color 0.2s' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                      >
                        <option value="" disabled>Select an objective...</option>
                        <option value="removal">Content Removal</option>
                        <option value="recovery">Account Recovery</option>
                        <option value="pr">PR Strategy</option>
                        <option value="suppression">Search Suppression</option>
                        <option value="audit">Digital Audit</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                      <div style={{ position: 'absolute', right: '1.15rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '4px solid #94a3b8' }} />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Overview of Threats / URLs</label>
                    <textarea 
                      required 
                      rows="4" 
                      value={overview}
                      onChange={(e) => setOverview(e.target.value)}
                      placeholder="Please list target URLs or usernames. Provide details regarding negative search results or hack info."
                      style={{ width: '100%', padding: '0.85rem 1.15rem', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#ffffff', fontFamily: 'inherit', resize: 'none', outline: 'none', fontSize: '0.95rem', transition: 'border-color 0.2s', lineHeight: 1.5 }} 
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.75rem', borderRadius: '6px', padding: '1rem' }}>
                    <Lock size={14} style={{ marginRight: '8px' }} /> Submit Secured Dossier
                  </button>
                </motion.form>
              )}

              {/* Transmitting Loader */}
              {formStatus === 'transmitting' && (
                <motion.div 
                  key="form-transmitting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', textAlign: 'center' }}
                >
                  <Loader2 className="scan-pulse" size={40} style={{ animation: 'spin 1.5s linear infinite', color: 'var(--color-primary)' }} />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Securing Connection...</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Verifying 256-bit encryption payload & database gateway</p>
                  </div>
                </motion.div>
              )}

              {/* Success state */}
              {formStatus === 'success' && (
                <motion.div 
                  key="form-success"
                  style={{ textAlign: 'center', padding: '2rem 1rem' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.05)', border: '2px solid var(--color-success)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                    <ShieldCheck size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Case File Secured</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                    Your dossier has been securely stored in the Supabase database. A senior strategist will review the files and reach out shortly.
                  </p>
                  <button className="btn-secondary" onClick={() => setFormStatus('idle')} style={{ padding: '0.65rem 1.5rem', borderRadius: '6px' }}>
                    Submit Additional Reference
                  </button>
                </motion.div>
              )}

              {/* Error state */}
              {formStatus === 'error' && (
                <motion.div 
                  key="form-error"
                  style={{ textAlign: 'center', padding: '2rem 1rem' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.05)', border: '2px solid var(--color-danger)', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                    <ShieldAlert size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-danger)' }}>Submission Blocked</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                    {errorMsg || 'Database transmission failed. Please configure your project credentials.'}
                  </p>
                  <button className="btn-secondary" onClick={() => setFormStatus('idle')} style={{ padding: '0.65rem 1.5rem', borderRadius: '6px' }}>
                    Retry Transmission
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>

      <style>{`
        .contact-container {
          padding-top: 160px;
          padding-bottom: 6rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 1024px) {
          .contact-grid {
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 768px) {
          .contact-container {
            padding-top: 100px !important;
            padding-bottom: 3.5rem !important;
            align-items: flex-start !important;
          }
          .contact-info-col {
            margin-bottom: 1rem !important;
            text-align: center !important;
            align-items: center !important;
          }
          .contact-info-col h1 {
            font-size: 2.25rem !important;
          }
          .contact-info-col p {
            font-size: 0.95rem !important;
            margin-bottom: 1.5rem !important;
          }
          .contact-info-col .tag {
            align-self: center !important;
          }
          .contact-info-col > div {
            width: 100% !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .contact-form-card {
            min-height: auto !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Contact;
