import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { Plus, Minus, ArrowRight, HelpCircle } from 'lucide-react';

const faqs = [
  { q: "How long does content removal take?", a: "Standard removals via copyright or Terms of Service violations typically take 3-7 business days. Complex legal removals involving foreign jurisdictions or uncooperative hosting providers can take 30-90 days." },
  { q: "Is confidentiality guaranteed?", a: "Absolute discretion is our core foundation. We operate under strict NDAs and utilize encrypted communication channels. We never disclose our client lists or case details." },
  { q: "What happens if the content reappears?", a: "We active-monitor for replication. If removed content is re-uploaded elsewhere, we immediately initiate a secondary takedown sequence at no additional cost during your coverage period." },
  { q: "Can you guarantee account recovery?", a: "While no agency can legally guarantee a third-party platform's internal decision, our direct escalations to platform trust & safety representatives yield a 94% success rate for bans and hacked recovery." }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card" style={{ marginBottom: '1.25rem', border: '1px solid var(--color-border)', background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.2) 0%, rgba(11, 15, 25, 0.5) 100%)', padding: 0 }}>
      <div 
        className="faq-header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: 'transparent' }} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: isOpen ? 'var(--color-primary)' : '#ffffff', transition: 'color 0.3s' }}>{question}</h4>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ color: isOpen ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="faq-answer-container" style={{ borderTop: '1px solid var(--color-border)' }}>
              <p style={{ paddingTop: '1.5rem', color: 'var(--color-text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ServiceRow = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/services/${service.id}`} style={{ display: 'block', marginBottom: '2rem' }}>
      <motion.div 
        className="card service-row-card"
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          background: isHovered ? 'linear-gradient(145deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)' : 'linear-gradient(145deg, rgba(15, 23, 42, 0.2) 0%, rgba(11, 15, 25, 0.6) 100%)',
          borderColor: isHovered ? 'var(--color-primary)' : 'var(--color-border)',
          boxShadow: isHovered ? '0 20px 40px -15px rgba(59, 130, 246, 0.15)' : '0 4px 20px -2px rgba(0, 0, 0, 0.4)'
        }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="service-row-layout">
          <div 
            className="service-icon-wrapper"
            style={{ 
              borderRadius: '18px', 
              background: isHovered ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)', 
              border: isHovered ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid var(--color-border)',
              color: isHovered ? 'var(--color-primary)' : '#cbd5e1', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexShrink: 0,
              transition: 'all 0.3s'
            }}
          >
            {service.icon}
          </div>
          <div>
            <h2 className="service-row-title" style={{ margin: '0 0 0.5rem 0', letterSpacing: '-0.02em', color: isHovered ? 'var(--color-primary)' : '#ffffff', transition: 'color 0.3s', fontWeight: 800 }}>
              {service.title}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', margin: 0, maxWidth: '650px', lineHeight: 1.6 }} className="service-row-desc">
              {service.shortDesc}
            </p>
          </div>
        </div>
        
        <motion.div 
          animate={{ x: isHovered ? 8 : 0, color: isHovered ? '#ffffff' : 'var(--color-text-muted)', borderColor: isHovered ? 'var(--color-primary)' : 'var(--color-border)', backgroundColor: isHovered ? 'var(--color-primary)' : 'rgba(255,255,255,0.01)' }}
          style={{ borderRadius: '50%', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          className="service-row-arrow"
        >
          <ArrowRight size={20} />
        </motion.div>
      </motion.div>
    </Link>
  );
};

const Services = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'relative' }}>
      
      {/* Background patterns */}
      <div className="ambient-bg" />
      <div className="grid-overlay" />

      {/* Header */}
      <section style={{ paddingTop: '200px', paddingBottom: '5rem', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="tag">Capabilities</div>
            <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1.05, fontWeight: 800 }}>
              Strategic <span className="text-gradient">Remediation.</span>
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', lineHeight: 1.6 }}>
              We do not rely on automated scripts. Every case is structurally executed by cyber forensic engineers, legal strategists, and crisis managers.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Card List */}
      <section style={{ paddingBottom: '8rem' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          {servicesData.map((service, idx) => (
            <motion.div 
              key={service.id} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: '-50px' }} 
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <ServiceRow service={service} index={idx} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global FAQ */}
      <section style={{ padding: '8rem 0', backgroundColor: 'rgba(11, 15, 25, 0.4)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <HelpCircle size={40} className="text-gradient" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '3rem', letterSpacing: '-0.03em', fontWeight: 800 }}>Reputation Intelligence</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', marginTop: '0.5rem' }}>Clarity on our workflows, SLA parameters, and operational security frameworks.</p>
          </div>
          <div>
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <FAQItem question={faq.q} answer={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .faq-header {
          padding: 2rem;
        }
        .faq-answer-container {
          padding: 0 2rem 2rem 2rem;
        }
        .service-row-title {
          font-size: 2.15rem;
        }
        .service-icon-wrapper {
          width: 72px;
          height: 72px;
        }
        .service-row-arrow {
          width: 48px;
          height: 48px;
        }

        @media (max-width: 768px) {
          .service-row-layout {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
            width: 100% !important;
          }
          .service-row-desc {
            font-size: 0.95rem !important;
          }
          .service-row-title {
            font-size: 1.5rem !important;
          }
          .service-icon-wrapper {
            width: 56px !important;
            height: 56px !important;
          }
          .service-icon-wrapper svg {
            width: 24px !important;
            height: 24px !important;
          }
          .service-row-arrow {
            width: 40px !important;
            height: 40px !important;
            align-self: flex-end !important;
            margin-top: 0.5rem !important;
          }
          .faq-header {
            padding: 1.25rem !important;
          }
          .faq-header h4 {
            font-size: 1rem !important;
            line-height: 1.4 !important;
          }
          .faq-answer-container {
            padding: 0 1.25rem 1.25rem 1.25rem !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Services;
