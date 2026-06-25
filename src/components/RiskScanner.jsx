import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Search, AlertTriangle, Users, Clock, Terminal, ChevronRight, RefreshCw, BarChart2 } from 'lucide-react';

const RiskScanner = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Category, 2: Entity/Severity, 3: Scope/Urgency, 4: Scanning, 5: Results
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [severity, setSeverity] = useState('');
  const [scope, setScope] = useState('');
  const [urgency, setUrgency] = useState('');
  
  // Scanning state
  const [scanLogs, setScanLogs] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);

  // Categories
  const categories = [
    { id: 'removal', title: 'Content Removal', icon: <Shield size={24} />, desc: 'Erase defamatory posts, news articles, or media' },
    { id: 'recovery', title: 'Account Recovery', icon: <Users size={24} />, desc: 'Unban/recover hacked corporate or executive social profiles' },
    { id: 'pr', title: 'PR / Media Crisis', icon: <AlertTriangle size={24} />, desc: 'Mitigate active viral smear campaigns or hostile press' },
    { id: 'suppression', title: 'Search Suppression', icon: <Search size={24} />, desc: 'Push damaging Google Page 1 links out of view' },
    { id: 'audit', title: 'Digital Audit', icon: <BarChart2 size={24} />, desc: 'Audit exposure across clear, deep, and dark web' }
  ];

  // Severities
  const severities = [
    { id: 'individual', title: 'Individual', desc: 'Personal reputation, localized damage or family safety' },
    { id: 'executive', title: 'Executive / Public Figure', desc: 'CEO, VC partner, political figure, or high-profile brand representative' },
    { id: 'corporate', title: 'Corporate Brand / Enterprise', desc: 'Multi-million dollar brand equity, enterprise stock price, or market valuation threat' }
  ];

  // Scope & Urgency options
  const scopeOptions = [
    { id: 'single', title: 'Single Link / Forum Thread', weight: 5 },
    { id: 'multiple', title: 'Multiple Social/News Channels', weight: 15 },
    { id: 'serp', title: 'Google Page 1 Search Results', weight: 25 },
    { id: 'darkweb', title: 'Dark Web Leak / System Breaches', weight: 30 }
  ];

  const urgencyOptions = [
    { id: 'standard', title: 'Standard (Proactive Defence)', weight: 5 },
    { id: 'priority', title: 'Priority (Emerging Pressure)', weight: 15 },
    { id: 'crisis', title: 'Critical (Active / Live Attack)', weight: 30 }
  ];

  // Perform Simulated Forensic Scan
  useEffect(() => {
    if (step !== 4) return;

    setScanLogs([]);
    setScanProgress(0);

    const logs = [
      'Establishing secure shell connection to indexing spiders...',
      `Target Entity parsed: "${name || 'Unnamed Case'}"`,
      `Target Sector: ${category.toUpperCase()} Remediation Protocol`,
      'Spanning distributed queries to Google, Bing, and DuckDuckGo...',
      'Crawling page metadata, site headers, and WHOIS entries...',
      'Cross-referencing leaked credentials and data brokers...',
      'Analysing backlink profile and publisher domain authorities...',
      'Simulating litigation likelihood & terms of service (TOS) loopholes...',
      'Calculating digital sentiment index & velocity coefficients...',
      'Finalizing reputational threat vector matrix...',
      'Forensic Audit Complete. Structuring risk score...'
    ];

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setScanLogs(prev => [...prev, logs[currentLogIndex]]);
        setScanProgress(prev => Math.min(prev + 10, 100));
        currentLogIndex++;
        
        // Auto scroll console
        const consoleEl = document.getElementById('scanner-console');
        if (consoleEl) {
          consoleEl.scrollTop = consoleEl.scrollHeight;
        }
      } else {
        clearInterval(logInterval);
        // Move to results step after delay
        setTimeout(() => {
          setStep(5);
        }, 1000);
      }
    }, 450);

    return () => clearInterval(logInterval);
  }, [step]);

  // Compute Risk Score
  const calculateScore = () => {
    let score = 20; // base score
    
    // Category base
    if (category === 'removal') score += 20;
    else if (category === 'recovery') score += 15;
    else if (category === 'pr') score += 30;
    else if (category === 'suppression') score += 25;
    else if (category === 'audit') score += 5;

    // Severity base
    if (severity === 'individual') score += 5;
    else if (severity === 'executive') score += 15;
    else if (severity === 'corporate') score += 25;

    // Scope & Urgency
    const scopeWeight = scopeOptions.find(o => o.id === scope)?.weight || 0;
    const urgencyWeight = urgencyOptions.find(o => o.id === urgency)?.weight || 0;
    
    score += scopeWeight + urgencyWeight;
    
    // Cap score at 99
    return Math.min(score, 99);
  };

  const score = calculateScore();

  // Get Score Severity Config
  const getScoreConfig = (val) => {
    if (val < 40) return { label: 'LOW RISK', color: 'var(--color-success)', desc: 'Your footprint has vulnerabilities, but poses no immediate existential risk. Proactive defence recommended.' };
    if (val < 70) return { label: 'MODERATE RISK', color: 'var(--color-warning)', desc: 'Elevated threat signals detected. Sources may infect search results if left unchecked. Prompt containment suggested.' };
    if (val < 85) return { label: 'SEVERE RISK', color: 'rgba(245, 158, 11, 0.9)', desc: 'High visibility negative assets online. Immediate tactical suppression or direct removals advised.' };
    return { label: 'CRITICAL THREAT', color: 'var(--color-danger)', desc: 'Active reputation crisis. Viral potential or significant damage to search profile. Professional rapid intervention required.' };
  };

  const scoreConfig = getScoreConfig(score);

  const resetScanner = () => {
    setCategory('');
    setSeverity('');
    setScope('');
    setUrgency('');
    setStep(1);
  };

  const handleApply = () => {
    const searchParams = new URLSearchParams({
      threat: category,
      score: score.toString(),
      name: name,
      urgency: urgency,
      scope: scope
    });
    navigate(`/contact?${searchParams.toString()}`);
  };

  return (
    <div className="card" style={{ padding: '3.5rem', background: 'linear-gradient(135deg, rgba(11, 15, 25, 0.7) 0%, rgba(3, 7, 18, 0.95) 100%)', border: '1px solid rgba(59, 130, 246, 0.15)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(59, 130, 246, 0.05)' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="tag" style={{ background: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.2)', color: 'var(--color-secondary)' }}>Reputation Intelligence</div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>Digital Risk Assessment</h2>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>Run our forensic analyzer to evaluate your profile risk score and generate a direct remediation framework.</p>
      </div>

      {/* Steps Content */}
      <AnimatePresence mode="wait">
        
        {/* Step 1: Target Entity & Category */}
        {step === 1 && (
          <motion.div 
            key="step1" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.75rem' }}>Entity / Organization Name</label>
              <input 
                type="text" 
                placeholder="e.g. John Doe, Brand X, or Anonymous Corp" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: '14px', background: 'rgba(255,255,255,0.02)', color: '#ffffff', outline: 'none', transition: 'border-color 0.3s', fontSize: '1.05rem' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '1rem' }}>Select Core Threat Category</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {categories.map((c) => (
                  <button 
                    key={c.id} 
                    onClick={() => setCategory(c.id)}
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-start', 
                      gap: '1rem', 
                      padding: '1.5rem', 
                      borderRadius: '16px', 
                      border: category === c.id ? '1px solid var(--color-primary)' : '1px solid var(--color-border)', 
                      background: category === c.id ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255,255,255,0.01)', 
                      textAlign: 'left',
                      color: category === c.id ? '#ffffff' : 'var(--color-text-muted)',
                    }}
                  >
                    <div style={{ padding: '0.5rem', borderRadius: '10px', background: category === c.id ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)', color: category === c.id ? 'var(--color-primary)' : 'inherit' }}>
                      {c.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: category === c.id ? '#ffffff' : '#e2e8f0', marginBottom: '0.25rem' }}>{c.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>{c.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button 
                className="btn-primary" 
                disabled={!name || !category} 
                onClick={() => setStep(2)}
                style={{ opacity: (!name || !category) ? 0.5 : 1, cursor: (!name || !category) ? 'not-allowed' : 'pointer' }}
              >
                Proceed to Impact Level <ChevronRight size={18} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Impact / Severity Level */}
        {step === 2 && (
          <motion.div 
            key="step2" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '1rem' }}>Select Target/Impact Level</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {severities.map((s) => (
                  <button 
                    key={s.id} 
                    onClick={() => setSeverity(s.id)}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.5rem 2rem', 
                      borderRadius: '16px', 
                      border: severity === s.id ? '1px solid var(--color-primary)' : '1px solid var(--color-border)', 
                      background: severity === s.id ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255,255,255,0.01)', 
                      textAlign: 'left',
                      color: severity === s.id ? '#ffffff' : 'var(--color-text-muted)',
                      width: '100%'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: severity === s.id ? '#ffffff' : '#e2e8f0', marginBottom: '0.25rem' }}>{s.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{s.desc}</p>
                    </div>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: severity === s.id ? 'var(--color-primary)' : 'transparent' }}>
                      {severity === s.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff' }} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
              <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button 
                className="btn-primary" 
                disabled={!severity} 
                onClick={() => setStep(3)}
                style={{ opacity: !severity ? 0.5 : 1, cursor: !severity ? 'not-allowed' : 'pointer' }}
              >
                Proceed to Exposure Scope <ChevronRight size={18} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Scope and Urgency */}
        {step === 3 && (
          <motion.div 
            key="step3" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="bento-grid">
              
              {/* Exposure Scope */}
              <div style={{ gridColumn: 'span 6' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '1rem' }}>Scope of Exposure</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {scopeOptions.map((o) => (
                    <button 
                      key={o.id} 
                      onClick={() => setScope(o.id)}
                      style={{ 
                        padding: '1.25rem', 
                        borderRadius: '12px', 
                        border: scope === o.id ? '1px solid var(--color-primary)' : '1px solid var(--color-border)', 
                        background: scope === o.id ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255,255,255,0.01)', 
                        textAlign: 'left',
                        color: scope === o.id ? '#ffffff' : 'var(--color-text-muted)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        width: '100%'
                      }}
                    >
                      {o.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency */}
              <div style={{ gridColumn: 'span 6' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '1rem' }}>Required Response Window</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {urgencyOptions.map((o) => (
                    <button 
                      key={o.id} 
                      onClick={() => setUrgency(o.id)}
                      style={{ 
                        padding: '1.25rem', 
                        borderRadius: '12px', 
                        border: urgency === o.id ? '1px solid var(--color-primary)' : '1px solid var(--color-border)', 
                        background: urgency === o.id ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255,255,255,0.01)', 
                        textAlign: 'left',
                        color: urgency === o.id ? '#ffffff' : 'var(--color-text-muted)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        width: '100%'
                      }}
                    >
                      {o.title}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
              <button className="btn-secondary" onClick={() => setStep(2)}>Back</button>
              <button 
                className="btn-primary" 
                disabled={!scope || !urgency} 
                onClick={() => setStep(4)}
                style={{ opacity: (!scope || !urgency) ? 0.5 : 1, cursor: (!scope || !urgency) ? 'not-allowed' : 'pointer' }}
              >
                Execute Forensic Scan <ChevronRight size={18} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Scan Simulation */}
        {step === 4 && (
          <motion.div 
            key="step4" 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.98 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Animated Scanning Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <RefreshCw className="scan-pulse" size={20} style={{ color: 'var(--color-primary)', animation: 'spin 2s linear infinite' }} />
              <span style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>Scanning networks: {scanProgress}%</span>
            </div>
            
            <div style={{ width: '100%', height: '4px', background: 'var(--color-border)', borderRadius: '99px', overflow: 'hidden' }}>
              <motion.div 
                style={{ height: '100%', background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }} 
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Console */}
            <div id="scanner-console" className="scan-console" style={{ height: '280px', background: '#02040a', border: '1px solid rgba(255,255,255,0.05)' }}>
              {scanLogs.map((log, index) => (
                <div key={index} className="scan-console-line" style={{ display: 'flex', gap: '0.5rem', color: log.includes('Complete') ? 'var(--color-success)' : '#cbd5e1' }}>
                  <span style={{ color: '#475569', userSelect: 'none' }}>&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 5: Score Dashboard */}
        {step === 5 && (
          <motion.div 
            key="step5" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}
            className="bento-grid"
          >
            {/* Speedometer Gauges */}
            <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.01)', borderRadius: '20px', border: '1px solid var(--color-border)' }}>
              <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* SVG circular track */}
                <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="100" cy="100" r="85" stroke="rgba(255,255,255,0.03)" strokeWidth="12" fill="transparent" />
                  <motion.circle 
                    cx="100" 
                    cy="100" 
                    r="85" 
                    stroke={scoreConfig.color} 
                    strokeWidth="12" 
                    fill="transparent" 
                    strokeDasharray={2 * Math.PI * 85}
                    initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
                    animate={{ strokeDashoffset: (2 * Math.PI * 85) * (1 - score / 100) }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    strokeLinecap="round"
                  />
                </svg>

                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <motion.span 
                    style={{ fontSize: '4.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', lineHeight: 1 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {score}
                  </motion.span>
                  <span style={{ fontSize: '0.75rem', letterSpacing: '0.15rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Risk Rating</span>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: scoreConfig.color }}>{scoreConfig.label}</h3>
              </div>
            </div>

            {/* Recommendations List */}
            <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Analysis Verdict</h4>
                <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: 1.6 }}>{scoreConfig.desc}</p>
              </div>

              <div style={{ borderLeft: `3px solid ${scoreConfig.color}`, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>Recommended Vector:</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
                  {category === 'removal' && 'File legal metadata and server strikes under the DMCA / Copyright framework for swift takedowns.'}
                  {category === 'recovery' && 'Escalate support tokens directly through our platform agency reps to unlock the credentials.'}
                  {category === 'pr' && 'Initiate a coordinated digital shield with positive earned media positioning and statements.'}
                  {category === 'suppression' && 'Build negative-keyword defenses using high-authority domains to displace Google page 1 contents.'}
                  {category === 'audit' && 'Run database opt-outs to remove exposed private information records and data-broker entries.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button className="btn-secondary" onClick={resetScanner} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><RefreshCw size={16} /> Re-scan</button>
                <button className="btn-primary" onClick={handleApply} style={{ flexGrow: 1 }}>Initiate Remediation Case</button>
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default RiskScanner;
