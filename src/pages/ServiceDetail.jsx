import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="service-detail-container" style={{ paddingBottom: '6rem', position: 'relative' }}>
      
      {/* Background patterns */}
      <div className="ambient-bg" />
      <div className="grid-overlay" />

      <div className="container">
        
        {/* Back Link */}
        <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', transition: 'color 0.3s' }} className="back-link">
          <ArrowLeft size={16} /> Back to Capabilities
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }} className="detail-main-layout">
          
          {/* Header */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: '900px' }} className="detail-header">
            <motion.div variants={fadeUp} className="tag">{service.id.replace('-', ' ')}</motion.div>
            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)', marginBottom: '2rem', fontWeight: 800 }} className="detail-title">{service.title}</motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.4rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }} className="detail-desc">
              {service.fullDesc}
            </motion.p>
          </motion.div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '1rem 0' }} />

          {/* Details Grid */}
          <div className="grid-12 bento-grid">
            
            {/* Features (Deliverables) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="col-span-6">
              <motion.h3 variants={fadeUp} style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 800 }} className="detail-section-title">Deliverables</motion.h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="deliverables-list">
                {service.features.map((feature, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={fadeUp} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem', 
                      padding: '1.25rem 1.5rem', 
                      background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.2) 0%, rgba(11, 15, 25, 0.5) 100%)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: '16px'
                    }}
                    className="deliverable-item"
                  >
                    <ShieldCheck size={22} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, color: '#cbd5e1', fontSize: '0.95rem' }}>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Process */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="col-span-6">
              <motion.h3 variants={fadeUp} style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 800 }} className="detail-section-title">Our Process</motion.h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="process-list">
                {service.process.map((p, idx) => (
                  <motion.div key={idx} variants={fadeUp} style={{ display: 'flex', gap: '1.5rem' }} className="process-item">
                    <div style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 800, 
                      color: 'var(--color-primary)', 
                      fontFamily: 'var(--font-display)',
                      background: 'rgba(59, 130, 246, 0.08)',
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(59, 130, 246, 0.15)',
                      flexShrink: 0
                    }}
                    className="process-step-num"
                    >
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700, color: '#ffffff' }} className="process-step-title">{p.step}</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }} className="process-step-desc">{p.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* CTA Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            style={{ 
              marginTop: '4rem', 
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)', 
              border: '1px solid rgba(59, 130, 246, 0.15)',
              borderRadius: '28px',
              textAlign: 'center',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)'
            }}
            className="cta-box"
          >
            <Zap size={36} className="text-gradient" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }} className="cta-title">Require Immediate Action?</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.05rem', lineHeight: 1.6 }} className="cta-desc">
              Contact our crisis management team for a secure, confidential consultation regarding {service.title.toLowerCase()}.
            </p>
            <Link to={`/contact?threat=${service.id}`} className="btn-primary cta-btn">
              Initiate Case
            </Link>
          </motion.div>

        </div>
      </div>

      <style>{`
        .service-detail-container {
          padding-top: 180px;
        }
        @media (max-width: 768px) {
          .service-detail-container {
            padding-top: 120px;
            padding-bottom: 3.5rem !important;
          }
          .back-link {
            margin-bottom: 2rem !important;
          }
          .detail-main-layout {
            gap: 2rem !important;
          }
          .detail-header {
            margin-bottom: 0 !important;
          }
          .detail-desc {
            font-size: 1.1rem !important;
            line-height: 1.5 !important;
          }
          .detail-section-title {
            font-size: 1.5rem !important;
            margin-bottom: 1.25rem !important;
          }
          .deliverable-item {
            padding: 1rem 1.25rem !important;
          }
          .deliverable-item span {
            font-size: 0.875rem !important;
          }
          .process-list {
            gap: 1.25rem !important;
          }
          .process-item {
            gap: 1rem !important;
          }
          .process-step-num {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.25rem !important;
            border-radius: 8px !important;
          }
          .process-step-title {
            font-size: 1.1rem !important;
            margin-bottom: 0.25rem !important;
          }
          .process-step-desc {
            font-size: 0.875rem !important;
            line-height: 1.5 !important;
          }
          .cta-box {
            margin-top: 2rem !important;
            border-radius: 16px !important;
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

export default ServiceDetail;
