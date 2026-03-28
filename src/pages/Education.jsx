import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import {
  FaGraduationCap, FaUniversity, FaCalendarAlt,
  FaAward, FaBook, FaMapMarkerAlt, FaMedal, FaStar
} from 'react-icons/fa';
import './Education.css';

// ── Framer Motion Variants ────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } }
};

const cardVariants = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

// ── Education Card ────────────────────────────────────────────
const EduCard = ({ edu, index }) => {
  const [hovered, setHovered] = useState(false);

  const cardSpring = useSpring({
    transform: hovered ? 'translateY(-8px)' : 'translateY(0px)',
    config: config.gentle
  });

  const isEven = index % 2 === 0;

  return (
    <motion.div variants={cardVariants} className="edu-card-wrapper">
      <animated.div
        className={`edu-card ${hovered ? 'edu-card--hovered' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={cardSpring}
      >
        {/* Accent top bar */}
        <div className="edu-card-accent" style={{ background: edu.accentGradient }} />

        {/* Glow overlay on hover */}
        <div className={`edu-card-glow ${hovered ? 'edu-card-glow--active' : ''}`}
          style={{ background: edu.glowColor }} />

        {/* ── Card Body ── */}
        <div className="edu-card-body">

          {/* ── Left Column ── */}
          <div className="edu-card-left">
            {/* Icon badge */}
            <div className="edu-icon-badge" style={{ background: edu.iconBg, boxShadow: edu.iconShadow }}>
              <span className="edu-icon-inner" style={{ color: edu.iconColor }}>
                {edu.icon}
              </span>
              <span className="edu-icon-ring" style={{ borderColor: edu.iconColor }} />
            </div>

            {/* Level label */}
            <span className="edu-level-label" style={{ color: edu.accentColor, borderColor: edu.accentColor, background: edu.levelBg }}>
              {edu.level}
            </span>
          </div>

          {/* ── Right Column ── */}
          <div className="edu-card-right">

            {/* Header */}
            <div className="edu-card-header">
              <div className="edu-header-top">
                <h3 className="edu-degree">{edu.degree}</h3>
                <span className="edu-date-badge">
                  <FaCalendarAlt />
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>

              <div className="edu-meta-row">
                <span className="edu-institution">
                  <FaUniversity />
                  <strong>{edu.institution}</strong>
                </span>
                <span className="edu-location">
                  <FaMapMarkerAlt />
                  {edu.location}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="edu-divider" style={{ background: edu.dividerColor }} />

            {/* Stats Row */}
            <div className="edu-stats-row">
              <div className="edu-stat-block">
                <FaMedal className="edu-stat-icon" style={{ color: edu.accentColor }} />
                <div>
                  <span className="edu-stat-label">Achievement</span>
                  <span className="edu-stat-value" style={{ color: edu.accentColor }}>{edu.grade}</span>
                </div>
              </div>
              <div className="edu-stat-block">
                <FaStar className="edu-stat-icon" style={{ color: edu.accentColor }} />
                <div>
                  <span className="edu-stat-label">Stream / Field</span>
                  <span className="edu-stat-value">{edu.stream}</span>
                </div>
              </div>
            </div>

            {/* Highlights as skill-pill tags */}
            <div className="edu-tags-section">
              <span className="edu-tags-label">Key Highlights</span>
              <div className="edu-tags">
                {edu.highlights.map((tag, i) => (
                  <span
                    key={i}
                    className="edu-tag"
                    style={{ borderColor: edu.tagBorderColor, color: edu.tagTextColor, background: edu.tagBg }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom index number */}
        <div className="edu-card-number" style={{ color: edu.accentColor }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </animated.div>
    </motion.div>
  );
};

// ── Main Component ────────────────────────────────────────────
const Education = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true });

  const education = [
    {
      id: 1,
      degree: 'B.Tech — Computer Science & Engineering',
      institution: 'Rai University',
      location: 'Dholka, Ahmedabad',
      startDate: 'Aug 2024',
      endDate: 'Aug 2028',
      grade: '9.62 CGPA — Semester 1',
      stream: 'Computer Science & Engineering',
      level: 'Undergraduate Degree',
      icon: <FaUniversity />,
      highlights: [
        'Full-Stack Web Dev', 'React & Node.js', 'UI/UX Design',
        'Database Management', 'DSA & Algorithms', 'Software Engineering'
      ],
      accentGradient: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
      glowColor: 'radial-gradient(ellipse at top left, rgba(139,92,246,0.12) 0%, transparent 70%)',
      accentColor: '#8b5cf6',
      iconColor: '#8b5cf6',
      iconBg: 'rgba(139,92,246,0.12)',
      iconShadow: '0 0 24px rgba(139,92,246,0.3)',
      levelBg: 'rgba(139,92,246,0.08)',
      dividerColor: 'linear-gradient(90deg, rgba(139,92,246,0.5), rgba(6,182,212,0.3), transparent)',
      tagBg: 'rgba(139,92,246,0.08)',
      tagBorderColor: 'rgba(139,92,246,0.2)',
      tagTextColor: '#a78bfa',
    },
    {
      id: 2,
      degree: 'Higher Secondary Certificate — Science Stream',
      institution: 'Vivekanand Science Academy',
      location: 'Halvad, Dhrangadhra',
      startDate: 'Jun 2022',
      endDate: 'Mar 2024',
      grade: '75.66% — 72 Percentile',
      stream: 'Physics, Chemistry & Mathematics',
      level: 'Higher Secondary (HSC)',
      icon: <FaGraduationCap />,
      highlights: [
        'Physics & Chemistry', 'Mathematics', 'Board Examinations',
        'Science Fairs', 'Problem Solving', 'Analytical Thinking'
      ],
      accentGradient: 'linear-gradient(90deg, #06b6d4, #10b981)',
      glowColor: 'radial-gradient(ellipse at top left, rgba(6,182,212,0.1) 0%, transparent 70%)',
      accentColor: '#06b6d4',
      iconColor: '#06b6d4',
      iconBg: 'rgba(6,182,212,0.12)',
      iconShadow: '0 0 24px rgba(6,182,212,0.3)',
      levelBg: 'rgba(6,182,212,0.08)',
      dividerColor: 'linear-gradient(90deg, rgba(6,182,212,0.5), rgba(16,185,129,0.3), transparent)',
      tagBg: 'rgba(6,182,212,0.08)',
      tagBorderColor: 'rgba(6,182,212,0.2)',
      tagTextColor: '#22d3ee',
    },
    {
      id: 3,
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Sunrise Smart School',
      location: 'Dhrangadhra, Surendranagar',
      startDate: 'Jun 2021',
      endDate: 'Mar 2022',
      grade: '91% — 98.66 Percentile — A1 Grade',
      stream: 'General Science & Mathematics',
      level: 'Secondary School (SSC)',
      icon: <FaBook />,
      highlights: [
        '91% Overall Score', 'A1 Grade', '98.66 Percentile',
        'Mathematics Excellence', 'Science Aptitude', 'Academic Discipline'
      ],
      accentGradient: 'linear-gradient(90deg, #f59e0b, #f97316)',
      glowColor: 'radial-gradient(ellipse at top left, rgba(245,158,11,0.1) 0%, transparent 70%)',
      accentColor: '#f59e0b',
      iconColor: '#f59e0b',
      iconBg: 'rgba(245,158,11,0.12)',
      iconShadow: '0 0 24px rgba(245,158,11,0.3)',
      levelBg: 'rgba(245,158,11,0.08)',
      dividerColor: 'linear-gradient(90deg, rgba(245,158,11,0.5), rgba(249,115,22,0.3), transparent)',
      tagBg: 'rgba(245,158,11,0.08)',
      tagBorderColor: 'rgba(245,158,11,0.2)',
      tagTextColor: '#fbbf24',
    }
  ];

  return (
    <>
      <Helmet>
        <title>Education | Dhruv Sonagra</title>
        <meta name="description" content="Academic background of Dhruv Sonagra — from Computer Science degree to school excellence." />
        <link rel="canonical" href="https://dhruvsonagra.me/education" />
        <meta property="og:url" content="https://dhruvsonagra.me/education" />
      </Helmet>

      <div className="edu-page">
        <div className="container">

          {/* ── Header ──────────────────────────────────── */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="edu-header-section"
          >
            <span className="edu-eyebrow">
              <FaGraduationCap />
              Academic Background
            </span>
            <h1 className="edu-heading">
              Education &{' '}
              <span className="edu-gradient-text">Qualifications</span>
            </h1>
            <p className="edu-subtitle">
              My academic journey — building a strong foundation for every challenge ahead.
            </p>

            {/* Stats bar */}
            <div className="edu-stats-bar">
              {[
                { value: '3+', label: 'Institutions' },
                { value: '9.62', label: 'CGPA (Current)' },
                { value: '2024', label: 'Enrolled Year' },
              ].map((s, i) => (
                <div key={i} className="edu-stats-bar-item">
                  <span className="edu-stats-bar-value">{s.value}</span>
                  <span className="edu-stats-bar-label">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Cards Grid ───────────────────────────────── */}
          <div ref={ref}>
            <motion.div
              className="edu-cards-grid"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {education.map((edu, i) => (
                <EduCard key={edu.id} edu={edu} index={i} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Education;
