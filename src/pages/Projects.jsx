import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaGithub, FaExternalLinkAlt, FaFigma, FaTimes,
  FaReact, FaNodeJs, FaDatabase, FaAws
} from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiMongodb, SiTailwindcss } from 'react-icons/si';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Projects Page - Horizontal Scroll Gallery
 * Features: Horizontal scroll, 3D card effects, filterable grid
 */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  const categories = ['All', 'HTML/CSS', 'MERN', 'Figma', 'Hackathons'];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'MERN',
      description: 'A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1', // Placeholder for GDrive
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      links: {
        live: 'https://example.com',
        github: 'https://github.com',
        figma: null,
        api: 'https://api.example.com'
      },
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'MERN',
      description: 'Collaborative task management with real-time updates using Socket.io and team workspaces.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1',
      tech: ['MERN', 'Socket.io', 'Redux'],
      links: {
        live: 'https://example.com',
        github: 'https://github.com',
        figma: null,
        api: null
      },
      featured: true
    },
    {
      id: 3,
      title: 'Portfolio Website',
      category: 'HTML/CSS',
      description: 'Responsive portfolio website with modern animations and clean UI.',
      image: 'https://images.unsplash.com/photo-1545665277-509919b38c21?w=800&h=600&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      links: {
        live: 'https://example.com',
        github: 'https://github.com',
        figma: null,
        api: null
      },
      featured: false
    },
    {
      id: 4,
      title: 'Mobile Banking App',
      category: 'Figma',
      description: 'High-fidelity prototype for a modern banking application with comprehensive design system.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1',
      tech: ['Figma', 'Prototyping', 'UI/UX'],
      links: {
        live: null,
        github: null,
        figma: 'https://figma.com',
        api: null
      },
      featured: false
    },
    {
      id: 5,
      title: 'Hackathon Project 2024',
      category: 'Hackathons',
      description: 'Award-winning solution for sustainable energy tracking built in 48 hours.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1',
      tech: ['React', 'Python', 'IoT'],
      links: {
        live: 'https://example.com',
        github: 'https://github.com',
        figma: null,
        api: 'https://api.example.com'
      },
      featured: true
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const featuredProjects = projects.filter(p => p.featured);

  // Helper for hover state
  const [hoveredProject, setHoveredProject] = useState(null);

  // Horizontal scroll animation
  useEffect(() => {
    const container = horizontalRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth - window.innerWidth;

    gsap.to(container, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Projects | Dhruv Sonagra</title>
        <meta name="description" content="Explore my portfolio of web development projects, UI/UX designs, and open source contributions." />
      </Helmet>

      <main className="projects" style={{ paddingTop: '120px' }}>
        {/* Header */}
        <section className="container" style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              color: '#00d4ff',
              marginBottom: '1.5rem'
            }}>
              Portfolio
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              Featured{' '}
              <span style={{
                background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Projects
              </span>
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#94a3b8',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              A collection of my best work, showcasing expertise in full-stack development and design
            </p>
          </motion.div>
        </section>

        {/* Horizontal Scroll Featured Projects */}
        <section ref={containerRef} style={{ marginBottom: '6rem' }}>
          <div 
            ref={horizontalRef}
            style={{
              display: 'flex',
              gap: '2rem',
              padding: '0 4rem'
            }}
          >
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card-featured"
                style={{
                  minWidth: '600px',
                  height: '450px',
                  position: 'relative',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 0%, rgba(10, 14, 26, 0.95) 100%)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.375rem 0.875rem',
                    background: 'rgba(0, 212, 255, 0.2)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    color: '#00d4ff',
                    marginBottom: '1rem',
                    width: 'fit-content'
                  }}>
                    {project.category}
                  </span>
                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    color: '#94a3b8',
                    marginBottom: '1rem',
                    lineHeight: 1.6
                  }}>
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Filter & Grid */}
        <section className="container" style={{ marginBottom: '6rem' }}>
          {/* Filter */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className="magnetic"
                style={{
                  padding: '0.625rem 1.25rem',
                  background: activeFilter === category 
                    ? 'linear-gradient(90deg, #00d4ff, #8b5cf6)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: activeFilter === category ? '#fff' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    background: 'linear-gradient(145deg, rgba(20, 29, 51, 0.6) 0%, rgba(10, 14, 26, 0.8) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  {/* Image/Video Container */}
                  <div style={{ 
                    height: '220px', 
                    overflow: 'hidden', 
                    position: 'relative'
                  }}>
                    {hoveredProject === project.id && project.videoUrl ? (
                      <div style={{ width: '100%', height: '100%' }}>
                        <iframe
                          src={project.videoUrl}
                          title={project.title}
                          style={{ width: '100%', height: '100%', border: 'none' }}
                          allow="autoplay; encrypted-media"
                        />
                        {/* Overlay Controls */}
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          display: 'flex',
                          gap: '0.5rem',
                          zIndex: 10
                        }}>
                          <button style={{
                            background: 'rgba(0,0,0,0.6)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            cursor: 'pointer',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center'
                          }} title="Unmute">
                             🔊
                          </button>
                           <button style={{
                            background: 'rgba(0,0,0,0.6)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            cursor: 'pointer',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center'
                          }} title="Fullscreen">
                             ⛶
                          </button>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          transform: hoveredProject === project.id ? 'scale(1.1)' : 'scale(1)'
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem'
                    }}>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#00d4ff',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {project.category}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem'
                    }}>
                      {project.title}
                    </h3>
                    
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#94a3b8',
                      lineHeight: 1.6,
                      marginBottom: '1rem'
                    }}>
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem', 
                      marginBottom: '1.5rem' 
                    }}>
                      {project.tech.map((t, i) => (
                        <span key={i} style={{
                          fontSize: '0.75rem',
                          background: 'rgba(255,255,255,0.05)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          color: '#cbd5e1'
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.75rem',
                      flexWrap: 'wrap'
                    }}>
                      {project.links.live && (
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer" style={{
                          flex: 1,
                          textAlign: 'center',
                          padding: '0.5rem',
                          background: '#00d4ff',
                          color: '#0a0e1a',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}>
                          Live
                        </a>
                      )}
                       {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={{
                          flex: 1,
                          textAlign: 'center',
                          padding: '0.5rem',
                          background: 'rgba(255,255,255,0.1)',
                          color: '#fff',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}>
                          GitHub
                        </a>
                      )}
                       {project.links.figma && (
                        <a href={project.links.figma} target="_blank" rel="noopener noreferrer" style={{
                          flex: 1,
                          textAlign: 'center',
                          padding: '0.5rem',
                          background: 'rgba(255,255,255,0.1)',
                          color: '#fff',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}>
                          Figma
                        </a>
                      )}
                      {project.links.api && (
                        <a href={project.links.api} target="_blank" rel="noopener noreferrer" style={{
                          flex: 1,
                          textAlign: 'center',
                          padding: '0.5rem',
                          background: 'rgba(255,255,255,0.1)',
                          color: '#fff',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}>
                          API
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

/**
 * Project Modal Component
 */
const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 14, 26, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: 'spring', damping: 25 }}
        style={{
          background: 'linear-gradient(145deg, rgba(20, 29, 51, 0.95) 0%, rgba(10, 14, 26, 0.98) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1.5rem',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.25rem'
          }}
        >
          <FaTimes />
        </button>

        {/* Image */}
        <div style={{ height: '300px', overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.375rem 0.875rem',
            background: 'rgba(0, 212, 255, 0.1)',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            color: '#00d4ff',
            marginBottom: '1rem'
          }}>
            {project.category}
          </span>

          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            {project.title}
          </h2>

          <p style={{
            color: '#94a3b8',
            lineHeight: 1.7,
            marginBottom: '1.5rem'
          }}>
            {project.longDescription}
          </p>

          {/* Stats */}
          {project.stats && (
            <div style={{
              display: 'flex',
              gap: '2rem',
              padding: '1.5rem',
              background: 'rgba(0, 212, 255, 0.05)',
              borderRadius: '1rem',
              marginBottom: '1.5rem'
            }}>
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#00d4ff'
                  }}>
                    {value}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    textTransform: 'capitalize'
                  }}>
                    {key}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
              color: '#64748b'
            }}>
              Technologies
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: '0.375rem 0.875rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    color: '#94a3b8'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <FaExternalLinkAlt style={{ marginRight: '0.5rem' }} />
                Live Demo
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <FaGithub style={{ marginRight: '0.5rem' }} />
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
