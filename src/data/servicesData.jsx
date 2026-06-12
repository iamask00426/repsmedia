import { Shield, Unlock, TrendingUp, Search, Users, Globe } from 'lucide-react';
import React from 'react';

export const servicesData = [
  {
    id: 'content-removal',
    title: 'Content Removal',
    shortDesc: 'We permanently erase defamatory and unauthorized content from the internet.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Abstract dark glass
    icon: <Shield size={32} />,
    fullDesc: 'Negative articles, revenge porn, and defamatory forum posts cost businesses and individuals millions in lost revenue and reputation. We do not bury content—we remove it permanently. Leveraging direct legal channels, DMCA copyright frameworks, and platform-specific TOS violations, we secure the deletion of damaging links from Google search results and source websites.',
    features: [
      'Google Search Index De-indexing',
      'Defamatory News Article Takedowns',
      'Social Media Impersonator Removal',
      'Image and Video Copyright Strikes'
    ],
    process: [
      { step: 'Audit', detail: 'We map the exact locations of the offending content and assess the most effective removal vector.' },
      { step: 'Execution', detail: 'Our legal and technical teams file targeted takedown notices directly to publishers and hosts.' },
      { step: 'Verification', detail: 'We monitor search engines to ensure the content drops from the index completely.' }
    ]
  },
  {
    id: 'account-recovery',
    title: 'Account Recovery',
    shortDesc: 'Regain access to locked, banned, or compromised digital assets.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', // Abstract geometric code
    icon: <Unlock size={32} />,
    fullDesc: 'Losing access to a verified Instagram, corporate LinkedIn, or primary communication channel halts your business. Our team works directly with internal platform contacts to bypass automated support loops. We recover accounts lost to hackers, arbitrary bans, or lost credentials.',
    features: [
      'Instagram & Meta Account Unbans',
      'Hacked Account Restitution',
      'Blue Check / Verification Assistance',
      'Enterprise Two-Factor Reset'
    ],
    process: [
      { step: 'Assessment', detail: 'We review the nature of the ban or compromise to determine the exact policy violated.' },
      { step: 'Escalation', detail: 'We prepare an appeal dossier and route it directly to our internal agency reps at the platform.' },
      { step: 'Security Lock', detail: 'Upon recovery, we audit your security settings to prevent future breaches.' }
    ]
  },
  {
    id: 'pr-strategy',
    title: 'PR & Media Strategy',
    shortDesc: 'Control your narrative with guaranteed placements in top-tier publications.',
    image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2574&auto=format&fit=crop', // Dark rain/abstract movement
    icon: <TrendingUp size={32} />,
    fullDesc: 'Reputation isn\'t just about removing the bad—it\'s about dominating the conversation with the good. We secure earned and paid placements in major publications to establish you as an industry authority. We build a moat of positive press that protects against future attacks.',
    features: [
      'Tier 1 Publication Features (Forbes, WSJ, etc.)',
      'Crisis Communications Management',
      'Executive Profile Building',
      'Wikipedia Page Creation & Editing'
    ],
    process: [
      { step: 'Narrative Design', detail: 'We define the core message and angles that reporters actually want to cover.' },
      { step: 'Pitching', detail: 'We leverage our Rolodex of editors and journalists to place your stories.' },
      { step: 'SEO Amplification', detail: 'We use technical SEO to ensure these positive articles rank #1 for your name.' }
    ]
  },
  {
    id: 'search-suppression',
    title: 'Search Suppression',
    shortDesc: 'Push negative links off the first page of Google.',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?q=80&w=2670&auto=format&fit=crop', // Abstract topography / waves
    icon: <Globe size={32} />,
    fullDesc: 'When direct removal is impossible (e.g., government databases or major news syndicates), we engineer the search results to push the negative links to page 2 and beyond. We build a wall of high-authority, positive digital assets that outrank the negative content.',
    features: [
      'Personal & Corporate SEO',
      'High-Authority Domain Network Creation',
      'Positive Review Generation',
      'Long-Term Keyword Defense'
    ],
    process: [
      { step: 'Keyword Mapping', detail: 'We analyze the search terms showing the negative content and the difficulty to outrank them.' },
      { step: 'Asset Creation', detail: 'We build websites, social profiles, and articles optimized for those exact keywords.' },
      { step: 'Link Building', detail: 'We drive massive authority to the new positive assets to force the negative ones down.' }
    ]
  },
  {
    id: 'digital-audit',
    title: 'Digital Footprint Audit',
    shortDesc: 'Forensic analysis of your online presence to identify hidden risks.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop', // Abstract circuitry
    icon: <Search size={32} />,
    fullDesc: 'A comprehensive, forensic analysis of your online presence across the dark web, public databases, and search indices to identify hidden risks before they become crises. We provide actionable intelligence to secure your digital footprint.',
    features: [
      'Dark Web Monitoring',
      'Public Record Scrubbing',
      'Data Broker Opt-Outs',
      'Vulnerability Assessments'
    ],
    process: [
      { step: 'Reconnaissance', detail: 'We sweep the clear, deep, and dark web for any exposed PII or negative mentions.' },
      { step: 'Analysis', detail: 'We categorize threats by severity and likelihood of exposure.' },
      { step: 'Remediation Plan', detail: 'We deliver a step-by-step roadmap to harden your digital perimeter.' }
    ]
  },
  {
    id: 'crisis-management',
    title: 'Crisis Management',
    shortDesc: 'Rapid-response reputation defense for individuals and corporations.',
    image: 'https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Dark fluid structure
    icon: <Users size={32} />,
    fullDesc: 'When a crisis hits, seconds matter. We provide rapid-response reputation defense for individuals and corporations facing acute public relations crises, targeted harassment, or viral misinformation. We deploy a multi-disciplinary team to stop the bleeding and regain control of the narrative.',
    features: [
      '24/7 Rapid Response Unit',
      'Media Monitoring & Alerting',
      'Statement & Press Release Drafting',
      'Coordinated Multi-Channel Defense'
    ],
    process: [
      { step: 'Containment', detail: 'We immediately lock down vulnerable assets and issue holding statements to control the narrative.' },
      { step: 'Counter-Offensive', detail: 'We deploy positive assets and legal takedowns simultaneously to suppress the crisis.' },
      { step: 'Post-Crisis Recovery', detail: 'We rebuild the damaged search results and fortify the brand against future attacks.' }
    ]
  }
];
