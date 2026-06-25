import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, EyeOff, ShieldAlert, CheckCircle2, ChevronDown, ArrowRight, Star, RefreshCw } from 'lucide-react';

const SerpSandbox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchedName, setSearchedName] = useState('John Doe');
  const [isSearching, setIsSearching] = useState(false);
  const [activeAction, setActiveAction] = useState(null); // { id, type } type: 'deindex' | 'suppress'
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  // Initial list of search engine results
  const [results, setResults] = useState([
    {
      id: 1,
      type: 'positive',
      title: 'John Doe - Official Executive Website',
      url: 'https://johndoe.com',
      snippet: 'Welcome to the official portal of John Doe. Read executive biography, keynote speaking schedules, published works, and contact details.',
      tag: 'Official Portal'
    },
    {
      id: 2,
      type: 'positive',
      title: 'How John Doe Redefined Enterprise Risk Management',
      url: 'https://forbes.com/profiles/john-doe-risk-management',
      snippet: 'Forbes features John Doe on how modern risk assessment frameworks protect billions in enterprise valuation and brand trust across global markets.',
      tag: 'Forbes Feature'
    },
    {
      id: 3,
      type: 'negative',
      title: 'WARNING: Is John Doe a Fraud? Shocking Accusations!',
      url: 'https://scamboard-rumors.net/threads/john-doe-fraud-warning',
      snippet: 'Unverified threads and user reviews claiming John Doe failed to deliver on core agreements. Read comments, complaints, and whistleblowers exposing details.',
      tag: 'Threat: Defamation'
    },
    {
      id: 4,
      type: 'positive',
      title: 'John Doe - Professional Overview | Wikipedia',
      url: 'https://en.wikipedia.org/wiki/John_Doe_Executive',
      snippet: 'John Doe is an American business executive, risk consultant, and author. Best known for leadership strategies and crisis containment frameworks.',
      tag: 'Wiki Profile'
    },
    {
      id: 5,
      type: 'negative',
      title: 'EXPOSED: The Real Truth Behind John Doe\'s Hidden Ventures',
      url: 'https://truthleak-blog.com/posts/exposing-john-doe-ventures',
      snippet: 'An anonymous blog post outlining speculative details, alleged shell entities, and criticisms regarding John Doe\'s corporate portfolio.',
      tag: 'Threat: Smear Post'
    },
    {
      id: 6,
      type: 'positive',
      title: 'John Doe Joins Global Advisory Board as Managing Director',
      url: 'https://bloomberg.com/press-releases/john-doe-joins-advisory-board',
      snippet: 'Bloomberg reports on John Doe\'s latest appointment, detailing corporate growth directions and upcoming expansion targets.',
      tag: 'Bloomberg News'
    }
  ]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setSearchedName(query);
      // Dynamically update titles of mock results to match searched query
      setResults(prev => prev.map(res => {
        const cleanName = query.replace(/[^\w\s]/gi, '');
        const updatedTitle = res.title
          .replace(/John Doe/g, cleanName)
          .replace(/john-doe/g, cleanName.toLowerCase().replace(/\s+/g, '-'));
        const updatedUrl = res.url
          .replace(/johndoe/g, cleanName.toLowerCase().replace(/\s+/g, ''))
          .replace(/john-doe/g, cleanName.toLowerCase().replace(/\s+/g, '-'));
        const updatedSnippet = res.snippet.replace(/John Doe/g, cleanName);
        
        return {
          ...res,
          title: updatedTitle,
          url: updatedUrl,
          snippet: updatedSnippet
        };
      }));
      setIsSearching(false);
    }, 800);
  };

  // Run De-indexing Simulation
  const runDeindex = (id) => {
    setActiveAction({ id, type: 'deindex' });
    setProgress(0);
    setLogs(['Contacting hosting registrar...', 'Filing legal DMCA Notice of Copyright Strike...', 'Submitting platform TOS violation dossier...', 'Host approved removal request.', 'Requesting Google SERP de-indexing cache clear...', 'Link successfully de-indexed.']);

    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Remove link from results completely
          setResults(prev => prev.filter(res => res.id !== id));
          setActiveAction(null);
        }, 600);
      }
    }, 400);
  };

  // Run SEO Suppression Simulation
  const runSuppression = (id) => {
    setActiveAction({ id, type: 'suppress' });
    setProgress(0);
    setLogs(['Analyzing query volume keywords...', 'Deploying authoritative keyword assets...', 'Mapping backlinks to high-authority nodes...', 'Strengthening Wiki, Forbes, and corporate positions...', 'Pushed threat to Position #9...', 'Pushed threat to Page 2 (Suppressed).']);

    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Add a new positive link and move negative to page 2 (remove from active page 1 display list)
          setResults(prev => {
            const index = prev.findIndex(res => res.id === id);
            const filtered = prev.filter(res => res.id !== id);
            
            // Generate a new positive link to replace it
            const newPositive = {
              id: Date.now(),
              type: 'positive',
              title: `${searchedName} - Executive Profile | LinkedIn`,
              url: `https://linkedin.com/in/${searchedName.toLowerCase().replace(/\s+/g, '-')}`,
              snippet: `Connect with ${searchedName} on LinkedIn. View professional experience, career history, education credentials, recommendations, and mutual connections.`,
              tag: 'New Asset'
            };
            
            filtered.splice(index, 0, newPositive);
            return filtered;
          });
          setActiveAction(null);
        }, 600);
      }
    }, 400);
  };

  // Count threat links remaining
  const threatsCount = results.filter(res => res.type === 'negative').length;

  return (
    <div style={{ minHeight: '100vh', paddingTop: '140px', paddingBottom: '6rem', position: 'relative' }}>
      {/* Background elements */}
      <div className="ambient-bg" />
      <div className="grid-overlay" />

      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="tag" style={{ background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.2)', color: 'var(--color-primary)' }}>Interactive Sandbox</div>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            SERP <span className="text-gradient">Sandbox.</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Search a name below and test our de-indexing and suppression tools. Push negative links off page 1 or erase them completely in real time.
          </p>
        </div>

        {/* Sandbox Board */}
        <div className="card" style={{ background: '#090d16', border: '1px solid var(--color-border)', boxShadow: '0 25px 60px rgba(0,0,0,0.7)', borderRadius: '24px', overflow: 'hidden' }}>
          
          {/* Simulated Google Search Header */}
          <div style={{ padding: '1.75rem 2rem', background: '#04070e', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              <span className="text-gradient">SearchEngine.</span>
              <span style={{ fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.2)', color: 'var(--color-primary)', padding: '0.25rem 0.5rem', borderRadius: '5px', fontWeight: 600 }}>SANDBOX MODE</span>
            </div>
            
            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexGrow: 1, maxWidth: '500px', border: '1px solid var(--color-border)', borderRadius: '999px', background: 'rgba(255,255,255,0.02)', padding: '0.25rem 0.5rem', overflow: 'hidden' }}>
              <input 
                type="text" 
                placeholder="Enter a name to simulate audit..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ flexGrow: 1, padding: '0.5rem 1rem', background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem' }}
              />
              <button type="submit" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <Search size={16} />
              </button>
            </form>
          </div>

          {/* Sandbox Info Banner */}
          <div style={{ padding: '1rem 2rem', background: 'rgba(139, 92, 246, 0.05)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600 }}>
              <ShieldAlert size={16} />
              <span>Target Entity Profile: "{searchedName}"</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Threats Remaining on Page 1: <strong style={{ color: threatsCount > 0 ? 'var(--color-danger)' : 'var(--color-success)', fontSize: '1rem' }}>{threatsCount}</strong>
            </div>
          </div>

          {/* Action Log Modal Overlay */}
          <AnimatePresence>
            {activeAction && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.85)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(4px)' }}
              >
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  style={{ width: '100%', maxWidth: '500px', background: '#030712', border: '1px solid var(--color-border)', borderRadius: '20px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <RefreshCw className="scan-pulse" size={20} style={{ color: 'var(--color-primary)', animation: 'spin 2s linear infinite' }} />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {activeAction.type === 'deindex' ? 'Executing Takedown Strike...' : 'Strengthening Search Defenses...'}
                    </h3>
                  </div>
                  
                  {/* Progress bar */}
                  <div style={{ width: '100%', height: '4px', background: 'var(--color-border)', borderRadius: '99px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))', transition: 'width 0.3s' }} />
                  </div>

                  {/* Console logs */}
                  <div className="scan-console" style={{ height: '180px', fontSize: '0.8rem', background: '#020408' }}>
                    {logs.slice(0, Math.ceil((progress / 100) * logs.length)).map((log, index) => (
                      <div key={index} className="scan-console-line" style={{ display: 'flex', gap: '0.5rem', color: log.includes('successfully') || log.includes('Suppressed') ? 'var(--color-success)' : '#cbd5e1' }}>
                        <span style={{ color: '#475569', userSelect: 'none' }}>&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Engine Results Area */}
          <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '400px' }}>
            
            {isSearching ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', gap: '1rem', color: 'var(--color-text-muted)' }}>
                <RefreshCw className="scan-pulse" size={40} style={{ animation: 'spin 1.5s linear infinite', color: 'var(--color-primary)' }} />
                <span>Auditing SERP listings...</span>
              </div>
            ) : (
              <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <AnimatePresence mode="popLayout">
                  
                  {results.map((res) => {
                    const isThreat = res.type === 'negative';
                    
                    return (
                      <motion.div 
                        key={res.id} 
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        style={{ 
                          borderBottom: '1px solid rgba(255,255,255,0.03)', 
                          paddingBottom: '1.75rem',
                          display: 'grid',
                          gridTemplateColumns: '1fr auto',
                          gap: '2rem',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          {/* URL path header */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                            <span>{res.url}</span>
                            <span style={{ color: 'rgba(255,255,255,0.05)' }}>•</span>
                            <span style={{ 
                              color: isThreat ? 'var(--color-danger)' : 'var(--color-primary)', 
                              fontSize: '0.7rem', 
                              fontWeight: 700, 
                              textTransform: 'uppercase', 
                              letterSpacing: '0.05em' 
                            }}>
                              {res.tag}
                            </span>
                          </div>

                          {/* Link Title */}
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: isThreat ? 'rgba(239, 68, 68, 0.95)' : '#3b82f6', marginBottom: '0.5rem', textDecoration: isThreat ? 'none' : 'underline', textUnderlineOffset: '3px' }}>
                            {res.title}
                          </h3>

                          {/* Snippet text */}
                          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5, maxWidth: '750px' }}>
                            {res.snippet}
                          </p>
                        </div>

                        {/* Action buttons (only for negative results) */}
                        {isThreat && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
                            <button 
                              className="btn-primary" 
                              onClick={() => runDeindex(res.id)}
                              style={{ 
                                padding: '0.5rem 1rem', 
                                fontSize: '0.75rem', 
                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)' 
                              }}
                            >
                              <EyeOff size={12} style={{ marginRight: '6px' }} /> De-index Link
                            </button>
                            <button 
                              className="btn-secondary" 
                              onClick={() => runSuppression(res.id)}
                              style={{ 
                                padding: '0.5rem 1rem', 
                                fontSize: '0.75rem', 
                                border: '1px solid var(--color-border)',
                                background: 'rgba(30, 41, 59, 0.4)'
                              }}
                            >
                              <ChevronDown size={12} style={{ marginRight: '6px' }} /> Suppress Link
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                </AnimatePresence>
              </motion.div>
            )}

            {/* Sandbox Complete screen */}
            {threatsCount === 0 && !isSearching && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  textAlign: 'center', 
                  padding: '3rem 2rem', 
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)', 
                  border: '1px solid rgba(16, 185, 129, 0.2)', 
                  borderRadius: '16px',
                  marginTop: '1rem'
                }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', border: '2px solid var(--color-success)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>SERP Cleaned Successfully</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 2rem auto', lineHeight: 1.5 }}>
                  You have successfully removed or suppressed all negative links. Organic search results now display 100% positive references.
                </p>
                <button className="btn-primary" onClick={handleApply}>
                  Secure Your Real Profile <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </button>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SerpSandbox;
