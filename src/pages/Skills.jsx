import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
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

/**
 * Skills Page - Constellation Network Visualization
 * Features: Animated skill nodes, category filtering, orbital animation
 */
const Skills = () => {
  const canvasRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const categories = ['All', 'Frontend', 'Backend', 'Tools', 'Problem Solving'];

  const skills = [
    // Frontend
    { 
      category: 'Frontend',
      name: 'HTML/CSS',
      icon: <FaHtml5 />,
      color: '#e34c26'
    },
    { 
      category: 'Frontend',
      name: 'JavaScript',
      icon: <FaJs />,
      color: '#f0db4f'
    },
    { 
      category: 'Frontend',
      name: 'React',
      icon: <FaReact />,
      color: '#61dafb'
    },
    { 
      category: 'Frontend',
      name: 'TypeScript',
      icon: <SiTypescript />,
      color: '#007acc'
    },
    { 
      category: 'Frontend',
      name: 'Angular.js',
      icon: <FaAngular />,
      color: '#dd0031'
    },
    
    // Backend
    { 
      category: 'Backend',
      name: 'Node.js',
      icon: <FaNodeJs />,
      color: '#68a063'
    },
    { 
      category: 'Backend',
      name: 'Express',
      icon: <SiExpress />,
      color: '#828282'
    },
    { 
      category: 'Backend',
      name: 'MongoDB',
      icon: <SiMongodb />,
      color: '#4DB33D'
    },
    { 
      category: 'Backend',
      name: 'SQL',
      icon: <FaDatabase />, // Using generic DB icon for SQL as specific SQL icon might vary or just standard DB
      color: '#F29111'
    },
    { 
      category: 'Backend',
      name: 'Redis',
      icon: <SiRedis />,
      color: '#DC382D'
    },
    
    // Tools
    { 
      category: 'Tools',
      name: 'Git',
      icon: <FaGitAlt />,
      color: '#F05032'
    },
    { 
      category: 'Tools',
      name: 'Docker',
      icon: <FaDocker />,
      color: '#2496ED'
    },
    { 
      category: 'Tools',
      name: 'Figma',
      icon: <FaFigma />,
      color: '#F24E1E'
    },
    { 
      category: 'Tools',
      name: 'Postman',
      icon: <SiPostman />,
      color: '#FF9900'
    },
    // Problem Solving
    { 
      category: 'Problem Solving',
      name: 'C++',
      icon: <SiCplusplus />,
      color: '#00599C'
    },
     { 
      category: 'Problem Solving',
      name: 'DSA',
      icon: <FaCode />,
      color: '#FF9900'
    }
  ];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  // Canvas constellation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
        ctx.fill();

        // Draw connections
        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Skills | Dhruv Sonagra</title>
        <meta name="description" content="Explore my technical skills in frontend, backend, database, DevOps, and development tools." />
      </Helmet>

      <main className="skills" style={{ paddingTop: '120px', position: 'relative', minHeight: '100vh' }}>
        {/* Background Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              color: '#8b5cf6',
              marginBottom: '1.5rem'
            }}>
              My Expertise
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              Technical{' '}
              <span style={{
                background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Skills
              </span>
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#94a3b8',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              A comprehensive overview of my technical toolkit and proficiency levels
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="magnetic"
                style={{
                  padding: '0.625rem 1.25rem',
                  background: activeCategory === category 
                    ? 'linear-gradient(90deg, #00d4ff, #8b5cf6)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: activeCategory === category ? '#fff' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(145deg, rgba(20, 29, 51, 0.6) 0%, rgba(10, 14, 26, 0.8) 100%)',
                  border: `1px solid ${hoveredSkill === skill.name ? skill.color : 'rgba(255, 255, 255, 0.05)'}`,
                  borderRadius: '1rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${skill.color}15`,
                    borderRadius: '12px',
                    fontSize: '1.5rem',
                    color: skill.color
                  }}>
                    {skill.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      marginBottom: '0.25rem'
                    }}>
                      {skill.name}
                    </h3>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {skill.category}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}

              </motion.div>
            ))}
          </motion.div>

          {/* Skill Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              marginTop: '4rem',
              padding: '2rem',
              background: 'linear-gradient(145deg, rgba(20, 29, 51, 0.4) 0%, rgba(10, 14, 26, 0.6) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '1rem',
              textAlign: 'center'
            }}
          >
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              Always Learning
            </h3>
            <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
              Technology evolves rapidly, and I'm committed to continuous learning. 
              Currently exploring AI/ML integration, Web3 technologies, and advanced system design patterns.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Skills;
