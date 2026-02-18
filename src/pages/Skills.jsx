import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import { 
  FaReact, FaNodeJs, FaJs, FaPython, FaDocker, FaAws, FaGitAlt, 
  FaFigma, FaHtml5, FaCss3Alt, FaDatabase, FaNpm 
} from 'react-icons/fa';
import { 
  SiTypescript, SiMongodb, SiPostgresql, SiRedis, SiGraphql, 
  SiNextdotjs, SiTailwindcss, SiFramer, SiGreensock, SiThreedotjs,
  SiWebgl, SiExpress, SiNestjs, SiPostman, SiVite, SiWebpack
} from 'react-icons/si';
import './Skills.css';

/**
 * Skills Page Component
 * Clean, performant skills showcase using only Framer Motion
 */
const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      category: 'Frontend',
      color: '#667eea',
      skills: [
        { name: 'React', icon: <FaReact />, color: '#61DAFB' },
        { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff' },
        { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
        { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
        { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
        { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
        { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
      ]
    },
    {
      category: 'Backend',
      color: '#764ba2',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
        { name: 'Express', icon: <SiExpress />, color: '#ffffff' },
        { name: 'NestJS', icon: <SiNestjs />, color: '#E0234E' },
        { name: 'Python', icon: <FaPython />, color: '#3776AB' },
        { name: 'GraphQL', icon: <SiGraphql />, color: '#E10098' },
      ]
    },
    {
      category: 'Database',
      color: '#f093fb',
      skills: [
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
        { name: 'Redis', icon: <SiRedis />, color: '#DC382D' },
        { name: 'SQL', icon: <FaDatabase />, color: '#CC2927' },
      ]
    },
    {
      category: 'Animation & 3D',
      color: '#4facfe',
      skills: [
        { name: 'GSAP', icon: <SiGreensock />, color: '#88CE02' },
        { name: 'Framer Motion', icon: <SiFramer />, color: '#0055FF' },
        { name: 'Three.js', icon: <SiThreedotjs />, color: '#ffffff' },
        { name: 'WebGL', icon: <SiWebgl />, color: '#990000' },
      ]
    },
    {
      category: 'DevOps & Tools',
      color: '#667eea',
      skills: [
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
        { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
        { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
        { name: 'Vite', icon: <SiVite />, color: '#646CFF' },
        { name: 'Webpack', icon: <SiWebpack />, color: '#8DD6F9' },
        { name: 'npm', icon: <FaNpm />, color: '#CB3837' },
      ]
    },
    {
      category: 'Design',
      color: '#764ba2',
      skills: [
        { name: 'Figma', icon: <FaFigma />, color: '#F24E1E' },
        { name: 'Postman', icon: <SiPostman />, color: '#FF6C37' },
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Skills | Dhruv Sonagra - Technical Expertise</title>
        <meta name="description" content="Explore my technical skills across frontend, backend, animation, and DevOps technologies." />
      </Helmet>

      <main className="skills">
        <div className="skills-container">
          {/* Page Header */}
          <motion.div
            className="page-header"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="gradient-text">Skills & Expertise</h1>
            <p className="page-subtitle">
              Crafting exceptional digital experiences with cutting-edge technologies
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="skills-sections">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                className="skill-category"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: categoryIndex * 0.08, duration: 0.5, ease: 'easeOut' }}
              >
                <div 
                  className="category-header"
                  style={{ '--category-color': category.color }}
                >
                  <h2>{category.category}</h2>
                  <div className="category-line"></div>
                </div>

                <div className="skills-grid">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="skill-card glass-card"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      whileHover={{ scale: 1.05, y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{ '--skill-color': skill.color }}
                    >
                      <div className="skill-icon-wrapper">
                        <div className="skill-icon" style={{ color: skill.color }}>
                          {skill.icon}
                        </div>
                        {/* Simple glow — NO layoutId to avoid AnimatePresence freeze */}
                        {hoveredSkill === skill.name && (
                          <motion.div
                            className="skill-glow"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            style={{ background: skill.color }}
                          />
                        )}
                      </div>

                      <h3 className="skill-name">{skill.name}</h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            className="skills-stats"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="stat-box glass-card">
              <h3 className="stat-number gradient-text">30+</h3>
              <p>Technologies</p>
            </div>
            <div className="stat-box glass-card">
              <h3 className="stat-number gradient-text">6+</h3>
              <p>Specializations</p>
            </div>
            <div className="stat-box glass-card">
              <h3 className="stat-number gradient-text">100%</h3>
              <p>Passion</p>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Skills;
