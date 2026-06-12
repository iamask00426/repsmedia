import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { Plus, Minus, ArrowRight } from 'lucide-react';

const faqs = [
  { q: "How long does content removal take?", a: "Standard removals via copyright or TOS violations typically take 3-7 business days. Complex legal removals involving foreign jurisdictions or uncooperative hosts can take 30-90 days." },
  { q: "Is confidentiality guaranteed?", a: "Absolute discretion is our foundation. We operate under strict NDAs and utilize encrypted communication channels. We never disclose our client list." },
  { q: "What happens if the content reappears?", a: "We actively monitor for replication. If removed content is re-uploaded elsewhere, we immediately initiate a secondary takedown sequence at no additional cost during your coverage period." },
  { q: "Can you guarantee account recovery?", a: "While no agency can legally 'guarantee' a platform's internal decision, our direct escalations to platform representatives yield a 94% success rate for unbanning and recovery." }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card" style={{ marginBottom: '1rem', border: 'none' }}>
      <div 
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '2rem', background: 'var(--color-bg-surface)' }} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0, color: isOpen ? 'var(--color-primary)' : 'inherit' }}>{question}</h4>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ color: isOpen ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', background: 'var(--color-bg-base)' }}>
            <div style={{ padding: '0 2rem 2rem 2rem', borderTop: '1px solid var(--color-border)' }}>
              <p style={{ paddingTop: '1.5rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{answer}</p>
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
        className="card"
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
        style={{ padding: '3rem', position: 'relative', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center', background: isHovered ? 'var(--color-bg-surface)' : 'var(--color-bg-base)' }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(37,99,235,0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {service.icon}
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em', color: isHovered ? 'var(--color-primary)' : 'var(--color-text-main)' }}>
              <strong>{service.title}</strong>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', margin: 0, maxWidth: '600px' }}>
              {service.shortDesc}
            </p>
          </div>
        </div>
        
        <motion.div 
          animate={{ x: isHovered ? 10 : 0, color: isHovered ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
          style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-bg-base)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <ArrowRight size={24} />
        </motion.div>
      </motion.div>
    </Link>
  );
};

const Services = () => {
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const headerY = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ backgroundColor: 'var(--color-bg-surface)' }}>
      {/* Scroll-Driven Header */}
      <motion.section 
        style={{ paddingTop: '200px', paddingBottom: '6rem', opacity: headerOpacity, y: headerY, textAlign: 'center' }}
      >
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="tag">Capabilities</div>
            <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>
              <strong>Strategic Remediation.</strong>
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem' }}>
              We do not rely on automated software. Our operations are executed by legal experts, technical engineers, and seasoned crisis managers.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Floating Card List */}
      <section style={{ paddingBottom: '8rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          {servicesData.map((service, idx) => (
            <motion.div 
              key={service.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: idx * 0.1 }}
            >
              <ServiceRow service={service} index={idx} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global FAQ */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--color-bg-base)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', letterSpacing: '-0.03em' }}><strong>Intelligence.</strong></h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Clarity on our processes, timelines, and operational security measures.</p>
          </div>
          <div>
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <FAQItem question={faq.q} answer={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;
