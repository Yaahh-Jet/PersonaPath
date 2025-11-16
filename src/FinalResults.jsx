import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinalResults.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';

const MBTI_DETAILS = {
  I: { 
    letter: 'I', 
    full: 'Introversion', 
    desc: 'You recharge through quiet solitude and internal reflection. Introverts process thoughts internally before sharing them, preferring deep one-on-one conversations over large group settings. You likely find too much social interaction draining and need alone time to restore your energy. This doesn\'t mean you\'re shy—rather, you\'re energized by your inner world of ideas and emotions.'
  },
  E: { 
    letter: 'E', 
    full: 'Extraversion', 
    desc: 'You gain energy from external interactions and social engagement. Extraverts think out loud, processing ideas through conversation and action. You thrive in dynamic environments with lots of people and activity. Social interaction energizes you rather than drains you, and you often seek out opportunities to connect with others and be part of group activities.'
  },
  S: { 
    letter: 'S', 
    full: 'Sensing', 
    desc: 'You focus on tangible reality and concrete information gathered through your five senses. Sensors trust facts, details, and practical experience over abstract theories. You prefer step-by-step instructions and proven methods, excelling at working with what is real and present. You\'re observant of your physical surroundings and tend to be realistic and grounded in the here-and-now.'
  },
  N: { 
    letter: 'N', 
    full: 'Intuition', 
    desc: 'You focus on patterns, possibilities, and the big picture rather than concrete details. Intuitives trust hunches and read between the lines, seeing connections others might miss. You\'re drawn to innovation and imagination, often thinking about future potential and what could be. You enjoy complex theories and abstract concepts, preferring to understand underlying meanings rather than surface-level facts.'
  },
  T: { 
    letter: 'T', 
    full: 'Thinking', 
    desc: 'You make decisions through logical analysis and objective reasoning. Thinkers prioritize truth and fairness over harmony, valuing consistency and principles. You naturally critique and analyze, seeking to understand cause and effect. In conflicts, you focus on solving the problem rather than managing feelings, and you believe the most rational solution is usually the best one, even if it\'s not the most popular.'
  },
  F: { 
    letter: 'F', 
    full: 'Feeling', 
    desc: 'You make decisions based on personal values and their impact on people. Feelers prioritize harmony and empathy, considering how choices affect everyone involved. You\'re naturally attuned to others\' emotions and seek to maintain positive relationships. You believe the right decision should honor people\'s values and create emotional well-being, not just logical efficiency. Compassion and authenticity guide your choices.'
  },
  J: { 
    letter: 'J', 
    full: 'Judging', 
    desc: 'You prefer structure, organization, and having things decided. Judgers like making plans and sticking to them, finding comfort in schedules and closure. You work steadily toward goals, preferring to finish projects before starting new ones. Deadlines motivate you rather than stress you, and you feel most at ease when life is organized and predictable. You like to have control over your environment and future.'
  },
  P: { 
    letter: 'P', 
    full: 'Perceiving', 
    desc: 'You prefer flexibility, spontaneity, and keeping options open. Perceivers adapt easily to changing circumstances and enjoy exploring multiple possibilities. You work in bursts of energy and may start many projects, energized by new beginnings. Deadlines might motivate you only at the last minute, and you prefer to gather more information rather than making premature decisions. You thrive on freedom and variety.'
  }
};

const MBTI_CAREERS = {
  INTJ: ['Strategic Consultant', 'Software Architect', 'Research Scientist', 'Systems Analyst', 'Investment Banker', 'University Professor', 'Chief Technology Officer'],
  INTP: ['Data Scientist', 'Software Developer', 'Theoretical Physicist', 'Philosophy Professor', 'Research Analyst', 'Computer Programmer', 'Forensic Analyst'],
  ENTJ: ['CEO/Executive', 'Corporate Lawyer', 'Management Consultant', 'Entrepreneur', 'Investment Banker', 'Judge', 'Political Strategist'],
  ENTP: ['Innovation Consultant', 'Venture Capitalist', 'Marketing Director', 'Patent Attorney', 'Systems Analyst', 'Creative Director', 'Startup Founder'],
  INFJ: ['Clinical Psychologist', 'Counselor', 'Human Rights Lawyer', 'Creative Writer', 'Religious Leader', 'Life Coach', 'Art Director'],
  INFP: ['Creative Writer', 'Therapist', 'Graphic Designer', 'Social Worker', 'Museum Curator', 'Film Editor', 'Human Rights Advocate'],
  ENFJ: ['High School Teacher', 'HR Director', 'Public Relations Manager', 'Life Coach', 'Event Coordinator', 'Counselor', 'Sales Manager'],
  ENFP: ['Creative Director', 'Journalist', 'Brand Strategist', 'Psychologist', 'Social Media Manager', 'Recruiter', 'Artist'],
  ISTJ: ['Accountant', 'Project Manager', 'Database Administrator', 'Auditor', 'Military Officer', 'Lawyer', 'Civil Engineer'],
  ISFJ: ['Registered Nurse', 'Elementary Teacher', 'Librarian', 'Office Manager', 'Interior Designer', 'Counselor', 'Healthcare Administrator'],
  ESTJ: ['Operations Manager', 'Financial Officer', 'Real Estate Agent', 'Sales Manager', 'Police Officer', 'Judge', 'Construction Manager'],
  ESFJ: ['Event Planner', 'Elementary Teacher', 'Healthcare Administrator', 'Sales Representative', 'Office Manager', 'Receptionist', 'Social Worker'],
  ISTP: ['Mechanical Engineer', 'Pilot', 'Forensic Scientist', 'Carpenter', 'Athletic Trainer', 'Emergency Paramedic', 'Chef'],
  ISFP: ['Artist', 'Interior Designer', 'Veterinarian', 'Chef', 'Fashion Designer', 'Physical Therapist', 'Musician'],
  ESTP: ['Entrepreneur', 'Sales Manager', 'Paramedic', 'Real Estate Broker', 'Marketing Manager', 'Athletic Coach', 'Detective'],
  ESFP: ['Performer', 'Event Planner', 'Flight Attendant', 'Personal Trainer', 'Photographer', 'Public Relations Specialist', 'Recreation Worker']
};

const MBTI_LOVE = {
  INTJ: 'In relationships, you value intellectual partnership and mutual respect for independence. You seek a partner who can engage in deep, meaningful conversations and share your vision for the future. While you may not be overtly romantic, you show love through loyalty, problem-solving, and helping your partner achieve their goals. You need a relationship that stimulates your mind and allows personal growth space.',
  INTP: 'You appreciate partners who understand your need for intellectual exploration and alone time. You express love through sharing ideas, solving problems together, and engaging in philosophical discussions. While you may struggle with emotional expression, you\'re deeply loyal once committed. You need a relationship that respects your independence while providing mental stimulation and genuine understanding.',
  ENTJ: 'You seek ambitious, competent partners who can keep up with your driven nature. You value direct communication, shared goals, and mutual growth. While you may prioritize career success, you\'re deeply committed when you choose a partner. You show love through taking action, planning your future together, and helping your partner succeed. You need a relationship based on respect, honesty, and shared vision.',
  ENTP: 'You thrive with partners who can match your wit and enjoy intellectual sparring. You need variety, spontaneity, and mental stimulation in relationships. While commitment may scare you initially, you\'re devoted once you find the right person. You express love through playful debates, trying new experiences together, and constant growth. You need a partner who won\'t be intimidated by your love of challenge.',
  INFJ: 'You seek deep, authentic connection and emotional intimacy. You\'re highly selective about partners, but once committed, you\'re intensely loyal and nurturing. You show love through understanding, support, and helping your partner become their best self. You need a relationship with depth, meaning, and mutual emotional vulnerability. Superficial connections don\'t satisfy you.',
  INFP: 'You\'re a true romantic who seeks soulmate-level connection. You need authenticity, emotional depth, and shared values in relationships. You express love through creative gestures, quality time, and deep emotional support. While you may idealize partners initially, you\'re accepting of flaws once you commit. You need a relationship that honors your sensitivity and encourages creative expression.',
  ENFJ: 'You\'re warm, supportive, and naturally attuned to your partner\'s needs. You seek harmony and emotional connection, often putting your partner\'s needs before your own. You show love through acts of service, affirmation, and creating shared experiences. You need a relationship with emotional openness, mutual support, and appreciation for your caring nature. Conflict and coldness drain you.',
  ENFP: 'You bring enthusiasm, warmth, and spontaneity to relationships. You seek authentic connection and emotional intensity. You express love through affection, adventure, and inspiring your partner to grow. While you may struggle with routine, you\'re deeply devoted when truly connected. You need a partner who appreciates your passion and can handle your emotional depth.',
  ISTJ: 'You value commitment, loyalty, and practical partnership. You show love through reliable action, keeping promises, and providing stability. While not overtly romantic, you\'re deeply devoted and express care through traditional gestures. You need a partner who appreciates your dependability and shares your values about responsibility and tradition.',
  ISFJ: 'You\'re nurturing, devoted, and highly attentive to your partner\'s needs. You express love through acts of service, remembering important details, and creating a harmonious home. You value loyalty, tradition, and long-term commitment. You need a partner who appreciates your caring nature and reciprocates your devotion.',
  ESTJ: 'You approach relationships with the same directness you apply elsewhere. You value honesty, shared responsibilities, and traditional partnership. You show love through providing, protecting, and organizing your shared life. You need a partner who appreciates your reliability and shares your practical approach to life.',
  ESFJ: 'You\'re warm, social, and naturally caring in relationships. You express love through attentiveness, social connection, and creating shared experiences. You value harmony and work hard to maintain it. You need a partner who appreciates your nurturing nature and shares your social and family values.',
  ISTP: 'You value independence and show love through actions rather than words. You express care by fixing things, sharing experiences, and being present in practical ways. While not emotionally expressive, you\'re loyal and protective. You need a partner who respects your need for space and appreciates your hands-on approach to life.',
  ISFP: 'You\'re gentle, caring, and express love through creativity and quality time. You value harmony and show affection through thoughtful gestures. While you may avoid conflict, you feel deeply. You need a partner who appreciates your sensitivity and artistic nature.',
  ESTP: 'You bring excitement, spontaneity, and fun to relationships. You express love through shared adventures and living in the moment. While commitment may take time, you\'re loyal when you find the right match. You need a partner who can keep up with your energetic lifestyle.',
  ESFP: 'You\'re warm, entertaining, and bring joy to relationships. You express love through enthusiasm, physical affection, and creating memorable experiences. You need a partner who appreciates your spontaneity and shares your zest for life.'
};

const INTEGRATED_ANALYSIS = {
  INTJ: {
    strengths: 'Your strategic mind combined with your determination makes you exceptional at long-term planning and execution. You see patterns others miss and have the discipline to turn visions into reality.',
    challenges: 'You may struggle with emotional expression and can appear cold or dismissive. Learning to value feelings alongside logic will strengthen your relationships.',
    growth: 'Practice patience with those who don\'t share your vision immediately. Your ideas are brilliant, but people need time to understand them. Develop your emotional intelligence to complement your intellectual strength.'
  },
  INTP: {
    strengths: 'Your analytical genius and love of understanding complex systems make you an innovative problem-solver. You excel at seeing logical flaws and creating elegant solutions.',
    challenges: 'You may get lost in theory at the expense of action. Your tendency to debate everything can frustrate others who just want decisions made.',
    growth: 'Challenge yourself to apply your brilliant ideas practically. Not everything needs to be perfectly understood before action. Balance analysis with execution.'
  },
  ENTJ: {
    strengths: 'Your natural leadership and strategic thinking make you exceptionally effective at organizing people and resources toward ambitious goals. You see potential and make it happen.',
    challenges: 'Your directness can seem harsh, and you may bulldoze others\' feelings in pursuit of efficiency. Not everyone shares your pace or priorities.',
    growth: 'Slow down and listen. Your vision is powerful, but bringing people along requires understanding their perspectives and emotions, not just their logical agreement.'
  },
  ENTP: {
    strengths: 'Your quick wit and love of intellectual challenge make you an innovative force. You spot possibilities others miss and excel at thinking outside the box.',
    challenges: 'You may start more than you finish and can argue for argument\'s sake. Your love of debate can alienate those seeking harmony.',
    growth: 'Practice follow-through. Your ideas are brilliant, but implementation matters. Learn when to debate and when to build consensus.'
  },
  INFJ: {
    strengths: 'Your deep insight into people and situations, combined with your idealism, makes you a powerful force for positive change. You understand what motivates people.',
    challenges: 'You may set impossibly high standards and burn out trying to save everyone. Your sensitivity can lead to taking things too personally.',
    growth: 'Set boundaries. You can\'t help everyone, and that\'s okay. Your vision for a better world is beautiful, but remember to care for yourself too.'
  },
  INFP: {
    strengths: 'Your authenticity, creativity, and deep values make you a unique and inspiring presence. You see beauty and meaning others overlook.',
    challenges: 'You may struggle with practical matters and can get lost in idealism. Your sensitivity can make criticism feel devastating.',
    growth: 'Ground your ideals in action. Your vision is beautiful, but it needs practical steps to manifest. Remember that constructive feedback helps you grow.'
  },
  ENFJ: {
    strengths: 'Your natural charisma and genuine care for others make you an inspiring leader and supportive friend. You bring out the best in people.',
    challenges: 'You may neglect your own needs while caring for others. Your desire for harmony can make you avoid necessary conflicts.',
    growth: 'Remember that you matter too. It\'s not selfish to have boundaries. Sometimes conflict is necessary for authentic growth.'
  },
  ENFP: {
    strengths: 'Your enthusiasm, creativity, and ability to connect with people make you a catalyst for positive change. You inspire others with your passion.',
    challenges: 'You may scatter your energy across too many interests and struggle with routine tasks. Your idealism can lead to disappointment.',
    growth: 'Focus your abundant energy on fewer projects to see them through. Structure isn\'t your enemy—it\'s the framework that lets your creativity flourish.'
  },
  ISTJ: {
    strengths: 'Your reliability, attention to detail, and commitment to duty make you the backbone of any organization. People know they can count on you.',
    challenges: 'You may resist change and new methods, even when they\'d be more efficient. Your focus on tradition can seem rigid.',
    growth: 'Stay open to innovation. Just because something has worked doesn\'t mean it can\'t be improved. Your stability is valuable, but so is flexibility.'
  },
  ISFJ: {
    strengths: 'Your caring nature, attention to detail, and commitment to others make you an invaluable support to those around you. You remember what matters to people.',
    challenges: 'You may have difficulty saying no and can be taken advantage of. Your humility means your contributions often go unrecognized.',
    growth: 'Advocate for yourself. Your needs matter as much as others\'. It\'s okay to receive help, not just give it.'
  },
  ESTJ: {
    strengths: 'Your organizational skills, decisiveness, and practical approach make you exceptionally effective at getting things done. You create order from chaos.',
    challenges: 'Your directness can seem bossy, and you may dismiss ideas that don\'t fit your practical framework. Emotions may seem illogical to you.',
    growth: 'Remember that different doesn\'t mean wrong. People-focused approaches can be just as valid as task-focused ones. Listen before deciding.'
  },
  ESFJ: {
    strengths: 'Your warmth, organizational ability, and attentiveness to others create harmonious, well-functioning environments. You make people feel valued.',
    challenges: 'You may take criticism too personally and can be overly concerned with others\' opinions. Your need for harmony might avoid necessary conflicts.',
    growth: 'Your worth isn\'t determined by others\' approval. It\'s okay if not everyone likes you. Stand firm in your values even when it creates tension.'
  },
  ISTP: {
    strengths: 'Your hands-on problem-solving ability and calm in crisis make you invaluable in practical situations. You understand how things work.',
    challenges: 'You may seem emotionally distant and can be too impulsive. Your need for independence can make commitment difficult.',
    growth: 'Open up emotionally. Vulnerability isn\'t weakness. Your logical approach is valuable, but so are emotions and long-term planning.'
  },
  ISFP: {
    strengths: 'Your artistic sensibility, gentle nature, and authentic approach to life create beauty and harmony. You live your values quietly.',
    challenges: 'You may avoid conflict too much and struggle with long-term planning. Your quiet nature can mean your contributions go unnoticed.',
    growth: 'Speak up for yourself and your needs. Your perspective is valuable. Don\'t let others take advantage of your gentle nature.'
  },
  ESTP: {
    strengths: 'Your quick thinking, adaptability, and action-oriented approach make you excel in dynamic situations. You live fully in the present.',
    challenges: 'You may act before thinking and struggle with long-term planning. Your bluntness can hurt others\' feelings.',
    growth: 'Pause before acting. Consider long-term consequences alongside immediate rewards. Your boldness is an asset, but so is thoughtfulness.'
  },
  ESFP: {
    strengths: 'Your warmth, spontaneity, and ability to enjoy life make you a joy to be around. You help others appreciate the present moment.',
    challenges: 'You may avoid difficult realities and struggle with planning ahead. Your need for excitement can lead to poor decisions.',
    growth: 'Balance fun with responsibility. Planning for the future doesn\'t mean you can\'t enjoy today. Some structure enhances freedom.'
  }
};

const PALM_INSIGHTS = {
  'Head Line': {
    meaning: 'Your palm reveals a balanced approach to life, with natural intuition guiding your decisions. The lines suggest someone who thinks deeply and acts deliberately.',
    characteristics: [
      'Strong analytical abilities and logical thinking',
      'You process information methodically before making decisions',
      'Natural problem-solver who enjoys intellectual challenges',
      'Tendency to overthink situations, which can lead to analysis paralysis',
      'Creative thinking balanced with practical considerations'
    ],
    lifeAdvice: 'Trust your analytical mind, but don\'t let overthinking prevent action. Your mental clarity is a gift—use it to solve problems, but remember that not everything needs to be perfectly understood before moving forward.'
  },
  'Heart Line': {
    meaning: 'Your heart line indicates deep emotional capacity and strong connections with others. You feel things intensely and form lasting bonds.',
    characteristics: [
      'Highly empathetic and emotionally intelligent',
      'You form deep, meaningful relationships',
      'Strong intuition about people and their motivations',
      'May take emotional wounds deeply and need time to heal',
      'Natural ability to understand and support others emotionally'
    ],
    lifeAdvice: 'Your emotional depth is your superpower. While it can make you vulnerable, it also allows you to connect with others in profound ways. Protect your heart, but don\'t close it off—the world needs your compassion.'
  },
  'Life Line': {
    meaning: 'A strong life line suggests vitality, resilience, and a robust approach to life\'s challenges. You have natural endurance and recovery ability.',
    characteristics: [
      'Strong physical vitality and energy levels',
      'Resilient in the face of adversity',
      'Natural ability to bounce back from setbacks',
      'Interest in health, wellness, and longevity',
      'Tendency to push through challenges rather than avoid them'
    ],
    lifeAdvice: 'Your strength and resilience are remarkable, but remember that rest is not weakness. Your ability to endure is impressive, but balance is key. Take time to recharge so you can maintain your vitality long-term.'
  },
  'Fate Line': {
    meaning: 'Your fate line indicates a strong sense of purpose and direction. You\'re driven by goals and have a clear vision of where you\'re heading.',
    characteristics: [
      'Strong sense of purpose and life direction',
      'Career-oriented with clear professional goals',
      'Natural leadership abilities and ambition',
      'May feel pressure to constantly achieve',
      'Tendency to measure success by external accomplishments'
    ],
    lifeAdvice: 'Your ambition and drive will take you far, but remember that the journey matters as much as the destination. Success isn\'t just about achievements—it\'s also about growth, relationships, and personal fulfillment.'
  }
};

export default function FinalResults() {
  const navigate = useNavigate();
  const [mbtiType, setMbtiType] = useState('');
  const [horoscope, setHoroscope] = useState(null);
  const [palmResult, setPalmResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const hasSaved = useRef(false);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const answers = localStorage.getItem('mbtiAnswers');
      const horo = localStorage.getItem('horoscope');
      const palm = localStorage.getItem('palmResult');

      if (horo) setHoroscope(JSON.parse(horo));
      if (palm) setPalmResult(JSON.parse(palm));

      if (answers) {
        const parsedAnswers = JSON.parse(answers);
        const type = calculateMBTI(parsedAnswers);
        setMbtiType(type);
        
        if (!hasSaved.current) {
          hasSaved.current = true;
          await saveResults(type, horo ? JSON.parse(horo) : null, palm ? JSON.parse(palm) : null);
        }
      }
    } catch (e) {
      console.error('Error loading results:', e);
    }
  };

  const calculateMBTI = (answers) => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    answers.forEach((answer, idx) => {
      if (!answer) return;
      const dimension = Math.floor(idx / 15);
      const value = answer - 3;
      
      if (dimension === 0) {
        if (value > 0) scores.E += value;
        else scores.I += Math.abs(value);
      } else if (dimension === 1) {
        if (value > 0) scores.N += value;
        else scores.S += Math.abs(value);
      } else if (dimension === 2) {
        if (value > 0) scores.T += value;
        else scores.F += Math.abs(value);
      } else if (dimension === 3) {
        if (value > 0) scores.J += value;
        else scores.P += Math.abs(value);
      }
    });

    const type = 
      (scores.E > scores.I ? 'E' : 'I') +
      (scores.S > scores.N ? 'S' : 'N') +
      (scores.T > scores.F ? 'T' : 'F') +
      (scores.J > scores.P ? 'J' : 'P');

    return type;
  };

  const saveResults = async (type, horo, palm) => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      
      const res = await fetch(`${API_BASE}/api/results/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({
          mbtiType: type,
          horoscope: horo,
          palmReading: palm,
          timestamp: new Date().toISOString()
        })
      });

      if (res.ok) {
        const data = await res.json();
        setSaved(data.saved !== false);
        console.log('Results saved:', data);
      }
    } catch (e) {
      console.error('Error saving results:', e);
    } finally {
      setSaving(false);
    }
  };

  const letters = mbtiType.split('');
  const analysis = INTEGRATED_ANALYSIS[mbtiType];
  const palmInsight = palmResult?.lineType ? PALM_INSIGHTS[palmResult.lineType] : null;

  return (
    <div className="final-results-root">
      <div className="final-results-container">
        <header className="results-hero">
          <button onClick={() => navigate('/landing_test')} className="back-link">← Dashboard</button>
          <h1 className="results-title">Your Complete Personality Profile</h1>
          {saved && <span className="saved-badge">✓ Saved</span>}
        </header>

        {/* Integrated Analysis - FIRST AND PROMINENT */}
        {mbtiType && analysis && (
          <section className="hero-analysis">
            <div className="hero-type-display">{mbtiType}</div>
            <h2 className="hero-subtitle">Your Unique Personality Blueprint</h2>
            
            <div className="analysis-grid">
              <div className="analysis-card strengths">
                <div className="card-icon">💪</div>
                <h3>Your Superpowers</h3>
                <p>{analysis.strengths}</p>
              </div>
              
              <div className="analysis-card challenges">
                <div className="card-icon">⚡</div>
                <h3>Growth Areas</h3>
                <p>{analysis.challenges}</p>
              </div>
              
              <div className="analysis-card growth">
                <div className="card-icon">🌱</div>
                <h3>Path Forward</h3>
                <p>{analysis.growth}</p>
              </div>
            </div>

            {/* Horoscope Integration */}
            {horoscope && (
              <div className="cosmic-blend">
                <h3>🌟 Your Cosmic Identity</h3>
                <p className="blend-text">
                  As an <strong>{mbtiType}</strong> born under <strong>{horoscope.sign}</strong>, 
                  you embody a rare combination of {MBTI_DETAILS[letters[0]].full.toLowerCase()} 
                  paired with the {horoscope.sign} energy. This creates someone who is both 
                  {MBTI_DETAILS[letters[0]].desc.split('.')[0].toLowerCase()} and carries the 
                  distinctive {horoscope.sign} qualities. Your personality is enriched by this 
                  astrological influence, adding depth to how you experience and express yourself 
                  in the world.
                </p>
              </div>
            )}
          </section>
        )}

        {/* MBTI Breakdown */}
        {mbtiType && (
          <section className="mbti-deep-dive">
            <h2 className="section-title">Understanding Your Type</h2>
            <div className="letters-breakdown">
              {letters.map((letter, idx) => (
                <div key={idx} className="letter-detail-card">
                  <div className="letter-header">
                    <span className="letter-big">{letter}</span>
                    <span className="letter-full-name">{MBTI_DETAILS[letter].full}</span>
                  </div>
                  <p className="letter-explanation">{MBTI_DETAILS[letter].desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Career Paths */}
        {mbtiType && MBTI_CAREERS[mbtiType] && (
          <section className="careers-section">
            <h2 className="section-title">Career Paths That Align With You</h2>
            <p className="section-subtitle">
              These careers leverage your natural strengths and preferences:
            </p>
            <div className="career-grid-new">
              {MBTI_CAREERS[mbtiType].map((career, idx) => (
                <div key={idx} className="career-item">
                  <span className="career-icon">💼</span>
                  <span className="career-name">{career}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Relationships */}
        {mbtiType && MBTI_LOVE[mbtiType] && (
          <section className="relationships-section">
            <h2 className="section-title">In Love & Relationships</h2>
            <div className="love-content">
              <div className="love-icon-large">💕</div>
              <p className="love-text">{MBTI_LOVE[mbtiType]}</p>
            </div>
          </section>
        )}

        {/* Palm Reading - EXPANDED */}
        {palmResult && !palmResult.skipped && (
          <section className="palm-section">
            <h2 className="section-title">Palm Reading Insights</h2>
            <div className="palm-content">
              <div className="palm-icon-large">🖐️</div>
              <div className="palm-details-new">
                <h3 className="palm-line-name">
                  {palmResult.lineType || 'Life Line Analysis'}
                </h3>
                <p className="palm-meaning">
                  {palmInsight?.meaning || palmResult.prediction || palmResult.message || 
                   'Your palm reveals a balanced approach to life, with natural intuition guiding your decisions. The lines suggest someone who thinks deeply and acts deliberately.'}
                </p>
                
                {palmInsight && (
                  <>
                    <div style={{ marginTop: '32px' }}>
                      <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#6fd98b', marginBottom: '16px' }}>
                        What This Reveals About You:
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '24px', fontSize: '16px', lineHeight: '1.9', color: 'rgba(255,255,255,0.9)' }}>
                        {palmInsight.characteristics.map((char, idx) => (
                          <li key={idx} style={{ marginBottom: '12px' }}>{char}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div style={{ 
                      marginTop: '32px', 
                      padding: '24px', 
                      background: 'rgba(111,217,139,0.1)', 
                      borderRadius: '16px',
                      borderLeft: '4px solid #6fd98b'
                    }}>
                      <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#6fd98b', marginBottom: '12px' }}>
                        💡 Life Guidance
                      </h4>
                      <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.8', color: 'rgba(255,255,255,0.95)' }}>
                        {palmInsight.lifeAdvice}
                      </p>
                    </div>
                  </>
                )}
                
                <div style={{ marginTop: '32px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
                    <strong>Note:</strong> Palm reading is an ancient practice that offers insights into personality traits and life patterns. 
                    While these interpretations are based on traditional palmistry, remember that you have the power to shape your own destiny. 
                    Use these insights as guidance, not limitations.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="actions-footer">
          <button onClick={() => navigate('/newtest')} className="btn-retake">
            Take Another Test
          </button>
          <button onClick={() => navigate('/landing_test')} className="btn-history">
            View History
          </button>
        </div>
      </div>
    </div>
  );
}