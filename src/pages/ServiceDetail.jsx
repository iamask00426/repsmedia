import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingTop: '120px', paddingBottom: '6rem' }}>
      <div className="container">
        
        <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <ArrowLeft size={16} /> Back to Services
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
          
          {/* Header */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: '800px' }}>
            <motion.div variants={fadeUp} className="tag">{service.id.replace('-', ' ')}</motion.div>
            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '2rem' }}>{service.title}</motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              {service.fullDesc}
            </motion.p>
          </motion.div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '2rem 0' }} />

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            
            {/* Features */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h3 variants={fadeUp} style={{ fontSize: '2rem', marginBottom: '2rem' }}>Deliverables</motion.h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {service.features.map((feature, idx) => (
                  <motion.div key={idx} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--color-border)' }}>
                    <CheckCircle2 size={20} color="var(--color-accent)" />
                    <span style={{ fontWeight: 500 }}>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Process */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h3 variants={fadeUp} style={{ fontSize: '2rem', marginBottom: '2rem' }}>Our Process</motion.h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {service.process.map((p, idx) => (
                  <motion.div key={idx} variants={fadeUp} style={{ display: 'flex', gap: '1.5rem' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-border)', fontFamily: 'var(--font-display)' }}>
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{p.step}</h4>
                      <p style={{ color: 'var(--color-text-muted)' }}>{p.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: '4rem', padding: '4rem', background: 'var(--color-border)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Require Immediate Action?</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>Contact our specialists for a secure, confidential consultation regarding {service.title.toLowerCase()}.</p>
            <Link to="/contact" className="btn-primary">Initiate Case</Link>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default ServiceDetail;
