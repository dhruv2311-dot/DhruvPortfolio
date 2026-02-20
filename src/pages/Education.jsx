import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import {
  FaGraduationCap, FaUniversity, FaCalendarAlt,
  FaAward, FaBook, FaCheckCircle
} from 'react-icons/fa';
import './Education.css';

// ── Framer Motion Variants ────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

const cardVariants = {
  hidden:  { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

const highlightVariants = {
  hidden:  { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
};

const highlightContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } }
};

// ── Timeline Card ─────────────────────────────────────────────
const TimelineCard = ({ edu }) => {
  const [hovered, setHovered] = useState(false);

  const cardSpring = useSpring({
    transform: hovered ? 'translateY(-6px)' : 'translateY(0px)',
    boxShadow: hovered
      ? '0 24px 56px rgba(139,92,246,0.22), 0 0 0 1px rgba(139,92,246,0.22)'
      : '0 4px 24px rgba(0,0,0,0.18)',
    config: config.gentle
  });

  return (
    <motion.div variants={cardVariants} className="edu-item">
      {/* Timeline dot */}
      <div className="edu-dot-col">
        <div className="edu-dot">
          <span className="edu-dot-icon">{edu.icon}</span>
          <div className="edu-dot-pulse" />
        </div>
      </div>

      {/* Card */}
      <animated.div
        className="edu-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...cardSpring,
          border: `1px solid ${hovered ? 'rgba(139,92,246,0.28)' : 'rgba(255,255,255,0.06)'}`,
          transition: 'border-color 0.3s ease'
        }}
      >
        {/* Card header */}
        <div className="edu-card-header">
          <div>
            <h3 className="edu-degree">{edu.degree}</h3>
            <p className="edu-institution">
              <FaUniversity style={{ marginRight: '0.4rem', opacity: 0.7 }} />
              {edu.institution}
              <span className="edu-location">, {edu.location}</span>
            </p>
          </div>
          <span className="edu-date-badge">
            <FaCalendarAlt style={{ opacity: 0.7 }} />
            {edu.startDate} – {edu.endDate}
          </span>
        </div>

        {/* Grade */}
        {edu.grade && (
          <div className="edu-grade-badge">
            <FaAward />
            {edu.grade}
          </div>
        )}

        {/* Highlights — framer stagger */}
        <motion.ul
          className="edu-highlights"
          variants={highlightContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {edu.highlights.map((h, i) => (
            <motion.li key={i} variants={highlightVariants}>
              <FaCheckCircle className="edu-check" />
              {h}
            </motion.li>
          ))}
        </motion.ul>
      </animated.div>
    </motion.div>
  );
};

// ── Timeline Line (CSS-only draw animation) ───────────────────
const TimelineLine = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <div
      ref={ref}
      className="edu-timeline-line"
      style={{
        transform: inView ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'transform 1.6s cubic-bezier(0.76, 0, 0.24, 1)'
      }}
    />
  );
};

// ── Main Component ────────────────────────────────────────────
const Education = () => {
  const { ref, inView } = useInView({ threshold: 0.06, triggerOnce: true });
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.3, triggerOnce: true });

  const education = [
    {
      id: 1,
      degree: 'B.Tech — Computer Science',
      institution: 'Rai University',
      location: 'Dholka, Ahmedabad',
      startDate: 'Aug 2024',
      endDate: 'Aug 2028',
      grade: '9.62 CGPA — Semester 1',
      highlights: [
        'Strong foundation in both Frontend and Backend Web Development',
        'Full-stack expertise: HTML, CSS, JavaScript, React, Node.js, Express, MongoDB',
        'UI/UX design, problem solving & database management',
        'Active learner of advanced web technologies & software engineering principles'
      ],
      icon: <FaUniversity />
    },
    {
      id: 2,
      degree: 'Higher Secondary — Science Stream',
      institution: 'Vivekanand Science Academy',
      location: 'Halvad, Dhrangadhra',
      startDate: 'Jun 2022',
      endDate: 'Mar 2024',
      grade: '75.66% — 72 Percentile',
      highlights: [
        'Science stream: Physics, Chemistry & Mathematics',
        'Secured 75.66% and 72 percentile in board examinations',
        'Strong academic foundation for Engineering and CS',
        'Participated in science fairs and school tech events'
      ],
      icon: <FaGraduationCap />
    },
    {
      id: 3,
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Sunrise Smart School',
      location: 'Dhrangadhra, Surendranagar',
      startDate: 'Jun 2021',
      endDate: 'Mar 2022',
      grade: '91% — 98.66 Percentile — A1 Grade',
      highlights: [
        'Outstanding academic results: 91% with 98.66 percentile',
        'Awarded A1 grade — exceptional performance in all subjects',
        'Strong aptitude in Mathematics and Science',
        'Recognized for discipline and consistent academic excellence'
      ],
      icon: <FaBook />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Education | Dhruv Sonagra</title>
        <meta name="description" content="Academic background of Dhruv Sonagra — from Computer Science degree to school excellence." />
      </Helmet>

      <main className="edu-page" style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <div className="container">

          {/* ── Header ──────────────────────────────────── */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: '5rem' }}
          >
            <span className="edu-eyebrow">
              <FaGraduationCap style={{ marginRight: '0.5rem', display: 'inline' }} />
              Academic Background
            </span>
            <h1 className="edu-heading">
              Education &{' '}
              <span className="edu-gradient-text">Learning</span>
            </h1>
            <p className="edu-subtitle">
              My academic journey — building a strong foundation for every challenge ahead.
            </p>
          </motion.div>

          {/* ── Timeline ────────────────────────────────── */}
          <div ref={ref}>
            <div className="edu-timeline">
              {/* CSS-powered animated line */}
              <TimelineLine />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                {education.map((edu) => (
                  <TimelineCard key={edu.id} edu={edu} />
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default Education;
