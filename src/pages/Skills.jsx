import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker,
  FaAws, FaFigma, FaDatabase, FaHtml5, FaJs, FaAngular, FaCode
} from 'react-icons/fa';
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb,
  SiPostgresql, SiRedis, SiGraphql, SiJest, SiKubernetes,
  SiExpress, SiPostman, SiCplusplus
} from 'react-icons/si';
import './Skills.css';

// ── Motion Variants ───────────────────────────────────────────
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.82, y: 24 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { opacity: 0, scale: 0.82, transition: { duration: 0.2 } }
};

// ── Skill Card with React Spring hover ───────────────────────
const SkillCard = ({ skill }) => {
  const [hovered, setHovered] = useState(false);

  const cardSpring = useSpring({
    transform: hovered ? 'translateY(-10px) scale(1.05)' : 'translateY(0px) scale(1)',
    boxShadow: hovered
      ? `0 20px 40px ${skill.color}22, 0 0 0 1px ${skill.color}35`
      : '0 4px 16px rgba(0,0,0,0.18)',
    config: { tension: 320, friction: 22 }
  });

  const iconSpring = useSpring({
    transform: hovered ? 'scale(1.22) rotate(6deg)' : 'scale(1) rotate(0deg)',
    filter: hovered
      ? `drop-shadow(0 0 14px ${skill.color})`
      : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
    config: config.wobbly
  });

  return (
    <animated.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="sk-card"
      style={{
        ...cardSpring,
        background: hovered
          ? `linear-gradient(145deg, ${skill.color}12, rgba(10,14,26,0.95))`
          : 'linear-gradient(145deg, rgba(20,29,51,0.55), rgba(10,14,26,0.85))',
        border: `1px solid ${hovered ? skill.color + '40' : 'rgba(255,255,255,0.06)'}`,
        transition: 'background 0.35s ease, border-color 0.35s ease'
      }}
    >
      {/* Glow spot on hover */}
      <div
        className="sk-card-glow"
        style={{ background: skill.color, opacity: hovered ? 0.18 : 0 }}
      />

      <animated.div className="sk-icon" style={{ ...iconSpring, color: skill.color }}>
        {skill.icon}
      </animated.div>

      <span className="sk-name">{skill.name}</span>

      {/* Category chip */}
      <span
        className="sk-chip"
        style={{ color: skill.color, borderColor: `${skill.color}30`, background: `${skill.color}0d` }}
      >
        {skill.category}
      </span>
    </animated.div>
  );
};

// ── Category Tab Button ───────────────────────────────────────
const TabButton = ({ label, isActive, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const btnSpring = useSpring({
    scale: hovered && !isActive ? 1.07 : 1,
    config: { tension: 400, friction: 18 }
  });

  return (
    <animated.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`sk-tab${isActive ? ' sk-tab-active' : ''}`}
      style={{ ...btnSpring }}
    >
      {label}
    </animated.button>
  );
};

// ── Main Component ────────────────────────────────────────────
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const categories = ['All', 'Frontend', 'Backend', 'Tools', 'Problem Solving'];

  const skills = [
    { category: 'Frontend', name: 'HTML / CSS', icon: <FaHtml5 />, color: '#e34c26' },
    { category: 'Frontend', name: 'JavaScript', icon: <FaJs />, color: '#f0db4f' },
    { category: 'Frontend', name: 'React', icon: <FaReact />, color: '#61dafb' },
    { category: 'Frontend', name: 'TypeScript', icon: <SiTypescript />, color: '#3178c6' },
    { category: 'Frontend', name: 'Angular', icon: <FaAngular />, color: '#dd0031' },
    { category: 'Frontend', name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38bdf8' },
    { category: 'Backend', name: 'Node.js', icon: <FaNodeJs />, color: '#68a063' },
    { category: 'Backend', name: 'Express', icon: <SiExpress />, color: '#a3a3a3' },
    { category: 'Backend', name: 'MongoDB', icon: <SiMongodb />, color: '#4DB33D' },
    { category: 'Backend', name: 'SQL', icon: <FaDatabase />, color: '#F29111' },
    { category: 'Backend', name: 'Redis', icon: <SiRedis />, color: '#DC382D' },
    { category: 'Tools', name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
    { category: 'Tools', name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
    { category: 'Tools', name: 'Figma', icon: <FaFigma />, color: '#F24E1E' },
    { category: 'Tools', name: 'Postman', icon: <SiPostman />, color: '#FF6C37' },
    { category: 'Problem Solving', name: 'C++', icon: <SiCplusplus />, color: '#00599C' },
    { category: 'Problem Solving', name: 'DSA', icon: <FaCode />, color: '#fbbf24' }
  ];

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Skills | Dhruv Sonagra</title>
        <meta name="description" content="Explore my technical skills in frontend, backend, databases and tools." />
        <link rel="canonical" href="https://dhruvsonagra.me/skills" />
        <meta property="og:url" content="https://dhruvsonagra.me/skills" />
      </Helmet>

      <div className="skills-page" style={{ paddingTop: '120px' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Header ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <span className="skills-eyebrow">Tech Stack</span>
            <h1 className="skills-heading">
              Technical{' '}
              <span className="skills-gradient-text">Skills</span>
            </h1>
            <p className="skills-subtitle">
              Technologies I use to bring ideas to life — from UI to servers.
            </p>
          </motion.div>

          {/* ── Category Tabs ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="sk-tabs"
          >
            {categories.map(cat => (
              <TabButton
                key={cat}
                label={cat}
                isActive={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </motion.div>

          {/* ── Skills Grid ──────────────────────────────────────── */}
          <div ref={ref}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="sk-grid"
                variants={gridVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                exit="hidden"
              >
                {filtered.map((skill) => (
                  <motion.div key={skill.name} variants={cardVariants} layout>
                    <SkillCard skill={skill} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Always Learning Banner ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sk-banner"
          >
            <div className="sk-banner-glow" />
            <div>
              <h3 className="sk-banner-title">Always Learning</h3>
              <p className="sk-banner-desc">
                Currently exploring <strong>AI/ML integration</strong>, <strong>Web3 technologies</strong>,
                and advanced system design patterns.
              </p>
            </div>
            <div className="sk-banner-badge">
              <span className="sk-banner-dot" />
              Growing daily
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default Skills;
