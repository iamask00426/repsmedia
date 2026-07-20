import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { ShieldAlert, ArrowRight, ShieldCheck, FileText, Settings, UserCheck, Play, ArrowUpRight } from 'lucide-react';
import Counter from '../components/Counter';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// SVG components for 3D floating icons
const InstagramIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="url(#insta-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 15px rgba(225, 48, 108, 0.35))' }}>
    <defs>
      <linearGradient id="insta-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f9ce34" />
        <stop offset="50%" stopColor="#ee2a7b" />
        <stop offset="100%" stopColor="#6228d7" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 15px rgba(24, 119, 242, 0.4))' }}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="65" height="65" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 15px rgba(255, 0, 0, 0.4))' }}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96C5.12 19.08 12 19.08 12 19.08s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.12 29 29 0 0 0-.46-5.12z" />
    <polygon points="9.75 15.02 15.5 11.54 9.75 8.06 9.75 15.02" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="url(#tiktok-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 12px rgba(0, 242, 254, 0.45))' }}>
    <defs>
      <linearGradient id="tiktok-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f2fe" />
        <stop offset="100%" stopColor="#4facfe" />
      </linearGradient>
    </defs>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Home = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Scroll animations values
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const timelineY = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "100%"]);

  // Particle background logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 65;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 0.5;
        this.color = Math.random() > 0.5 ? 'rgba(123, 97, 255, 0.35)' : 'rgba(59, 130, 246, 0.25)';
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Dynamic Animated Particles Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: -2,
        }}
      />

      {/* Grid Overlay */}
      <div className="grid-overlay" />

      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '160px', paddingBottom: '5rem', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            
            {/* Floating 3D SVGs in background */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              style={{ position: 'absolute', left: '-10%', top: '20%', pointerEvents: 'none', opacity: 0.65 }}
              className="hero-floating-icon hide-mobile"
            >
              <InstagramIcon />
            </motion.div>
            <motion.div
              animate={{ y: [0, 18, 0], rotate: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              style={{ position: 'absolute', right: '-12%', top: '10%', pointerEvents: 'none', opacity: 0.55 }}
              className="hero-floating-icon hide-mobile"
            >
              <FacebookIcon />
            </motion.div>
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{ position: 'absolute', left: '-5%', bottom: '-10%', pointerEvents: 'none', opacity: 0.5 }}
              className="hero-floating-icon hide-mobile"
            >
              <YoutubeIcon />
            </motion.div>
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
              style={{ position: 'absolute', right: '-8%', bottom: '-5%', pointerEvents: 'none', opacity: 0.6 }}
              className="hero-floating-icon hide-mobile"
            >
              <TikTokIcon />
            </motion.div>

            {/* Glowing Accent Ring */}
            <div style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(123, 97, 255, 0.09) 0%, transparent 60%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
              zIndex: -1
            }} />

            <motion.div variants={fadeUp} className="tag">
              ⚡ Account Security & Recovery Experts
            </motion.div>

            <motion.h1 
              variants={fadeUp} 
              className="hero-title" 
              style={{ 
                fontSize: 'clamp(2.5rem, 7.5vw, 4.75rem)', 
                letterSpacing: '-0.04em', 
                lineHeight: 1.1, 
                marginBottom: '1.75rem', 
                fontWeight: 900 
              }}
            >
              Recover Disabled <br />
              <span className="text-gradient">Social Media Accounts</span> Professionally.
            </motion.h1>

            <motion.p 
              variants={fadeUp} 
              className="hero-desc"
              style={{ 
                color: 'var(--color-text-muted)', 
                fontSize: '1.25rem', 
                maxWidth: '750px', 
                margin: '0 auto 3rem auto', 
                lineHeight: 1.65,
                fontWeight: 400
              }}
            >
              Trusted by creators and brands worldwide. We bypass automated queues, resolving complex platform bans, hacks, and compromised corporate assets under binding NDA protection.
            </motion.p>

            <motion.div variants={fadeUp} className="hero-buttons-container" style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary hero-btn" style={{ borderRadius: '12px', padding: '1rem 2.5rem', fontSize: '1rem' }}>
                <span>Start Recovery</span> <ArrowRight size={18} style={{ marginLeft: '10px' }} />
              </Link>
              <Link to="/services" className="btn-secondary hero-btn" style={{ borderRadius: '12px', padding: '1rem 2.5rem', fontSize: '1rem' }}>
                Our Capabilities
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics counters section */}
      <section style={{ padding: '6rem 0', position: 'relative', borderTop: '1px solid rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.03)', background: 'rgba(5, 5, 5, 0.5)' }}>
        <div className="container">
          <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
              <h3 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.25rem', color: '#7B61FF' }}>
                <Counter target="1500" suffix="+" />
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Accounts Recovered</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
              <h3 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.25rem', color: '#3B82F6' }}>
                <Counter target="98" suffix="%" />
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Success Rate</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
              <h3 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.25rem', color: '#10b981' }}>
                <Counter target="40" suffix="+" />
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Countries Served</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
              <h3 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.25rem', color: '#f59e0b' }}>
                <Counter target="24" suffix="/7" />
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dedicated Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="capabilities-section" style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }} className="section-header">
            <div className="tag">Services</div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.75rem' }} className="section-title">Professional Remediation</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto' }}>Surgical recovery vectors built for individuals, brands, and public figures.</p>
          </div>
          
          <div className="grid-layout">
            {servicesData.slice(0, 3).map((service) => (
              <div 
                key={service.id} 
                className="glass-card capabilities-card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  minHeight: '340px',
                  borderRadius: '20px'
                }}
              >
                <div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(123, 97, 255, 0.06)', border: '1px solid rgba(123, 97, 255, 0.15)', color: '#7B61FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.75rem' }}>
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: '1.45rem', marginBottom: '0.75rem', fontWeight: 700 }}>{service.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{service.shortDesc}</p>
                </div>
                
                <Link to={`/services/${service.id}`} style={{ color: '#ffffff', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }} className="link-hover-glow">
                  <span>Explore Capabilities</span>
                  <ArrowRight size={16} style={{ color: '#7B61FF' }} />
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/services" className="btn-secondary" style={{ borderRadius: '12px' }}>
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Recovery Process Timeline */}
      <section style={{ padding: '8rem 0', background: 'rgba(10, 10, 15, 0.3)', borderTop: '1px solid rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="tag">Workflow</div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.75rem' }}>Confidential Recovery Flow</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem' }}>How we secure and restore your digital identity step by step.</p>
          </div>

          {/* Timeline Wrapper */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {/* Center Line indicator */}
            <div style={{ position: 'absolute', left: '24px', top: '24px', bottom: '24px', width: '2px', background: 'rgba(255, 255, 255, 0.05)' }} />
            
            {/* Animated glowing fill line */}
            <motion.div 
              style={{ 
                position: 'absolute', 
                left: '24px', 
                top: '24px', 
                height: timelineY, 
                width: '2px', 
                background: 'linear-gradient(to bottom, #7B61FF, #3B82F6)',
                boxShadow: '0 0 10px #7B61FF'
              }} 
            />

            {[
              { id: 1, title: "Submit Case File", icon: <FileText size={20} />, desc: "Complete our secured case form or reach out directly via WhatsApp. Provide target URLs and details of your banned or compromised digital asset." },
              { id: 2, title: "Forensic Policy Review", icon: <ShieldAlert size={20} />, desc: "Our security engineers conduct an audit to analyze the exact terms of service rules, breach vectors, or platform restrictions applied to your account." },
              { id: 3, title: "Internal Direct Escalation", icon: <Settings size={20} />, desc: "We prepare a structured dispute dossier and route it directly bypass standard auto-replies straight to platform integrity managers." },
              { id: 4, title: "Verification & Release", icon: <UserCheck size={20} />, desc: "Upon approval, platform administrators restore complete access. We assist in resetting authentication keys to safeguard credentials." },
              { id: 5, title: "Account Restored & Secured", icon: <ShieldCheck size={20} />, desc: "Full profile restitution. We close the file and apply our optional active security perimeter auditing." }
            ].map((step, idx) => (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                style={{ display: 'flex', gap: '2.5rem', position: 'relative' }}
              >
                {/* Node icon wrapper */}
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  background: 'rgba(15, 15, 25, 0.8)', 
                  border: '2px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.6)',
                  zIndex: 2,
                  flexShrink: 0,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                }}
                className="timeline-node"
                >
                  {step.icon}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '8px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff' }}>{step.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, fontSize: '0.95rem', maxWidth: '700px' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials & Before/After timeline */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="tag">Trust</div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.75rem' }}>Client Proof dossier</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem' }}>Confidential case outcomes and verified recovery statements.</p>
          </div>

          <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {/* Testimonial Card 1 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #7B61FF 0%, #3B82F6 100%)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#ffffff', fontWeight: 700, fontSize: '1.1rem' }}>
                    <div style={{ margin: 'auto' }}>SM</div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Sandra M.</h4>
                    <span style={{ fontSize: '0.75rem', color: '#7B61FF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified Influencer (2.4M)</span>
                  </div>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, italic: 'true' }}>
                  "My verified Instagram was hijacked, and support forms kept failing. The RepsMedia team initiated a case and retrieved the account in less than 48 hours. Exceptional professional standard."
                </p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>● Hacked Account Restored</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>June 2026</span>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#ffffff', fontWeight: 700, fontSize: '1.1rem' }}>
                    <div style={{ margin: 'auto' }}>JD</div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Julian D.</h4>
                    <span style={{ fontSize: '0.75rem', color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fintech Brand Owner</span>
                  </div>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  "Arbitrary bans on Meta Ads put our business operations on hold. RepsMedia directly escalated the compliance issue and reset our accounts. They saved us massive downtime losses."
                </p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>● Corporate Assets Restored</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>May 2026</span>
              </div>
            </div>

            {/* Video Placeholder testimonial */}
            <div className="glass-card" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.03)', padding: 0, minHeight: '320px', borderRadius: '20px' }}>
              <img 
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop" 
                alt="Client Statement" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', opacity: 0.35 }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.3) 100%)', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2, height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', fontWeight: 600 }}>
                  Video Statement
                </div>
                <div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#7B61FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: '1rem', cursor: 'pointer', boxShadow: '0 0 15px rgba(123, 97, 255, 0.5)' }}>
                    <Play size={20} fill="#ffffff" style={{ marginLeft: '2px' }} />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>E-Commerce Founder Review</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Verified Client (Confidentiality Protected)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secure Retainer Call to Action */}
      <section className="secure-cta-section" style={{ padding: '8rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: 'rgba(10, 10, 15, 0.4)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <ShieldAlert size={40} style={{ color: '#7B61FF', marginBottom: '2rem' }} />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.25rem' }} className="cta-title">Secure Confidential Retainer</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.65, marginBottom: '2.75rem' }} className="cta-desc">
            We work under strict operational privacy regulations. Initiate a secure case consultation with our team. File dossier updates directly to get a dedicated recovery partner assigned.
          </p>
          <Link to="/contact" className="btn-primary cta-btn" style={{ borderRadius: '12px', padding: '1rem 3rem' }}>
            Initiate Secure Consultation
          </Link>
        </div>
      </section>

      {/* Floating Call to Action button */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 40 }} className="hide-mobile">
        <Link 
          to="/contact" 
          className="btn-primary" 
          style={{ 
            borderRadius: '99px', 
            padding: '0.85rem 1.75rem', 
            boxShadow: '0 8px 25px rgba(123, 97, 255, 0.4)',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>🚀 Recover My Account</span>
        </Link>
      </div>

      <style>{`
        .hero-section {
          padding-top: 180px;
        }
        .hero-buttons-container {
          display: flex;
          gap: 1.25rem;
          justify-content: center;
        }
        
        .link-hover-glow:hover svg {
          transform: translateX(4px);
          transition: transform 0.3s ease;
        }

        .hero-floating-icon {
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 140px;
            padding-bottom: 3.5rem !important;
          }
          .hero-desc {
            font-size: 1.05rem !important;
            margin-bottom: 2rem !important;
          }
          .hero-buttons-container {
            flex-direction: column;
            gap: 0.85rem;
            align-items: stretch;
            max-width: 320px;
            margin: 0 auto;
          }
          .hero-btn {
            width: 100%;
            text-align: center;
          }
          .section-title {
            font-size: 2.25rem !important;
          }
          .capabilities-section {
            padding: 4.5rem 0 !important;
          }
          .capabilities-card {
            min-height: auto !important;
          }
          .timeline-node {
            width: 40px !important;
            height: 40px !important;
          }
          .timeline-node svg {
            width: 16px !important;
            height: 16px !important;
          }
          .cta-title {
            font-size: 2rem !important;
          }
          .cta-desc {
            font-size: 0.975rem !important;
            margin-bottom: 2rem !important;
          }
          .cta-btn {
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Home;
