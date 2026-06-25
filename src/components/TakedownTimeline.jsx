import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileText, Send, CheckCircle2, RotateCcw, Terminal, Search } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Audit & Scanning',
    desc: 'Perform forensic analysis on target URLs, harvesting host IPs and indexing metadata.',
    icon: <Search size={20} />,
    color: '#3b82f6',
    logs: [
      'Initializing secure node connection...',
      'Target URL: https://redacted-site.com/defamatory-post-982',
      'Scraping page metadata & headers...',
      'Analyzing WHOIS records and hosting provider info...',
      'Found host: Cloudflare, Inc. (IP: 104.21.32.109)',
      'Threat analyzed. Vulnerability identified: TOS Section 4 violation.'
    ]
  },
  {
    id: 2,
    title: 'Dossier Preparation',
    desc: 'Draft comprehensive DMCA takedown demands and platform policy violation complaints.',
    icon: <FileText size={20} />,
    color: '#8b5cf6',
    logs: [
      'Compiling copyright & defamation evidence...',
      'Drafting legal Cease & Desist documentation...',
      'Structuring Platform Terms of Service violation claim...',
      'Applying official RepsMedia Legal Agency signature...',
      'Securing case payload with SHA-256 encryption.',
      'Takedown dossier successfully prepared.'
    ]
  },
  {
    id: 3,
    title: 'Transmitting Escalation',
    desc: 'Submit notices directly to host trust & safety teams and publisher channels.',
    icon: <Send size={20} />,
    color: '#f59e0b',
    logs: [
      'Connecting to publisher secure API gateway...',
      'Notice dispatched to Cloudflare Legal Escalation desk...',
      'Direct notification routed to domain administrator...',
      'Ping back received: Notice received, Ticket #RM-908234-A created.',
      'Awaiting platform compliance reply...'
    ]
  },
  {
    id: 4,
    title: 'De-indexing Verification',
    desc: 'Verify that Google, Bing, and source domains have permanently removed the content.',
    icon: <CheckCircle2 size={20} />,
    color: '#10b981',
    logs: [
      'Platform response received: Request approved.',
      'Verifying source URL removal... Status code: 404 (Not Found).',
      'Filing Google Webmaster cache de-indexing request...',
      'Verifying Google SERP listing removal...',
      'Target content permanently erased from the index.',
      'SUCCESS: Case closed and archived.'
    ]
  }
];

const TakedownTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [logIndex, setLogIndex] = useState(0);

  // Cycle steps automatically
  useEffect(() => {
    if (!isRunning) return;

    // Load step logs one by one
    const currentStepObj = steps[activeStep];
    const logTimer = setInterval(() => {
      if (logIndex < currentStepObj.logs.length) {
        setConsoleLogs(prev => [...prev, currentStepObj.logs[logIndex]]);
        setLogIndex(prev => prev + 1);
        
        // Auto scroll console
        const consoleEl = document.getElementById('timeline-console');
        if (consoleEl) {
          consoleEl.scrollTop = consoleEl.scrollHeight;
        }
      } else {
        clearInterval(logTimer);
        // Move to next step after a short pause
        const nextStepTimer = setTimeout(() => {
          if (activeStep < steps.length - 1) {
            setActiveStep(prev => prev + 1);
            setLogIndex(0);
          } else {
            // Loop back after 4 seconds at the end
            const loopTimer = setTimeout(() => {
              setActiveStep(0);
              setLogIndex(0);
              setConsoleLogs(['System rebooted. Initializing new scan...']);
            }, 4000);
            return () => clearTimeout(loopTimer);
          }
        }, 1500);
        return () => clearTimeout(nextStepTimer);
      }
    }, 450); // Speed of logs printing

    return () => clearInterval(logTimer);
  }, [activeStep, isRunning, logIndex]);

  const restartTimeline = () => {
    setActiveStep(0);
    setLogIndex(0);
    setConsoleLogs(['System manual restart. Scan initiating...']);
    setIsRunning(true);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'stretch' }} className="bento-grid">
      {/* Left side: Animated Step Checklist */}
      <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Remediation Timeline</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Real-time execution of our removal protocols</p>
          </div>
          <button 
            onClick={restartTimeline}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '999px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--color-border)', 
              color: 'var(--color-text-main)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            <RotateCcw size={14} /> Restart
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
          {/* Vertical connecting line */}
          <div style={{ 
            position: 'absolute', 
            left: '24px', 
            top: '30px', 
            bottom: '30px', 
            width: '2px', 
            background: 'var(--color-border)', 
            zIndex: 0 
          }} />

          {/* Glowing active line overlay */}
          <motion.div 
            style={{ 
              position: 'absolute', 
              left: '24px', 
              top: '30px', 
              width: '2px', 
              background: 'linear-gradient(to bottom, var(--color-primary), var(--color-secondary))', 
              zIndex: 1 
            }}
            animate={{ 
              height: `${(activeStep / (steps.length - 1)) * 80}%` 
            }}
            transition={{ duration: 0.8 }}
          />

          {steps.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;
            
            return (
              <div 
                key={step.id} 
                style={{ 
                  display: 'flex', 
                  gap: '1.5rem', 
                  padding: '1.25rem', 
                  borderRadius: '16px', 
                  background: isActive ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                  border: isActive ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'all 0.3s'
                }}
              >
                {/* Step Circle */}
                <motion.div 
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '50%', 
                    background: isCompleted ? 'var(--color-success)' : isActive ? step.color : 'var(--color-bg-base)',
                    border: `2px solid ${isCompleted ? 'var(--color-success)' : isActive ? step.color : 'var(--color-border)'}`,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: isCompleted || isActive ? '#ffffff' : 'var(--color-text-muted)',
                    flexShrink: 0
                  }}
                  animate={isActive ? { scale: [1, 1.1, 1], boxShadow: `0 0 15px ${step.color}` } : { scale: 1 }}
                  transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                >
                  {isCompleted ? <CheckCircle2 size={20} /> : step.icon}
                </motion.div>

                <div>
                  <h4 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 700, 
                    color: isActive ? '#ffffff' : isCompleted ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                    marginBottom: '0.25rem'
                  }}>
                    {step.title}
                  </h4>
                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: isActive ? 'var(--color-text-main)' : 'var(--color-text-muted)', 
                    lineHeight: 1.4 
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side: Encrypted Terminal Console Logs */}
      <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
          <Terminal size={18} style={{ color: 'var(--color-primary)' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>Secure Operation Logs</h4>
          <span style={{ 
            marginLeft: 'auto', 
            padding: '0.25rem 0.6rem', 
            borderRadius: '999px', 
            background: 'rgba(16, 185, 129, 0.1)', 
            border: '1px solid rgba(16, 185, 129, 0.2)', 
            color: 'var(--color-success)',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600
          }}>
            {isRunning ? 'ACTIVE SESSION' : 'PAUSED'}
          </span>
        </div>

        <div 
          id="timeline-console" 
          className="scan-console" 
          style={{ 
            height: '350px',
            boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.05)',
            background: '#02040a'
          }}
        >
          <AnimatePresence>
            {consoleLogs.map((log, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="scan-console-line"
                style={{ 
                  color: log.includes('SUCCESS') ? 'var(--color-success)' : log.includes('Threat') ? 'var(--color-danger)' : log.includes('Target') ? '#38bdf8' : '#cbd5e1',
                  display: 'flex',
                  gap: '0.5rem'
                }}
              >
                <span style={{ color: '#475569', userSelect: 'none' }}>&gt;</span>
                <span>{log}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {consoleLogs.length === 0 && (
            <div style={{ color: '#475569', fontStyle: 'italic' }}>Initializing secure shell connection...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakedownTimeline;
