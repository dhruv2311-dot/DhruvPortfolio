import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaGithub, FaExternalLinkAlt, FaFigma, FaBook, FaTimes } from 'react-icons/fa';
import { gsap } from 'gsap';
import { Flip } from 'gsap/flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMagneticButton from '../hooks/useMagneticButton';
import './Projects.css';

gsap.registerPlugin(Flip, ScrollTrigger);

/**
 * Projects Page Component with GSAP Flip
 * Filterable project gallery with advanced morphing transitions
 * Features: GSAP Flip morphing, magnetic buttons, scroll animations
 */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  const categories = ['All', 'MERN', 'HTML/CSS', 'Figma', 'Hackathons'];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.',
      category: 'MERN',
      image: 'https://via.placeholder.com/600x400/667eea/ffffff?text=E-Commerce',
      video: null, // Add Google Drive embed link
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      links: {
        live: 'https://example.com',
        github: 'https://github.com/yourusername/project',
        figma: null,
        docs: null,
      },
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates, team collaboration, and analytics dashboard.',
      category: 'MERN',
      image: 'https://via.placeholder.com/600x400/764ba2/ffffff?text=Task+Manager',
      video: null,
      tech: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
      links: {
        live: 'https://example.com',
        github: 'https://github.com/yourusername/project',
        figma: null,
        docs: 'https://docs.example.com',
      },
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Modern portfolio website with smooth animations, dark mode, and responsive design.',
      category: 'HTML/CSS',
      image: 'https://via.placeholder.com/600x400/f093fb/ffffff?text=Portfolio',
      video: null,
      tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
      links: {
        live: 'https://example.com',
        github: 'https://github.com/yourusername/project',
        figma: 'https://figma.com/file/example',
        docs: null,
      },
    },
    {
      id: 4,
      title: 'Mobile App Design',
      description: 'Complete UI/UX design for a fitness tracking mobile application with interactive prototypes.',
      category: 'Figma',
      image: 'https://via.placeholder.com/600x400/4facfe/ffffff?text=Fitness+App',
      video: null,
      tech: ['Figma', 'Prototyping', 'UI/UX'],
      links: {
        live: null,
        github: null,
        figma: 'https://figma.com/file/example',
        docs: null,
      },
    },
    {
      id: 5,
      title: 'Hackathon Winner - AI Chatbot',
      description: 'AI-powered customer service chatbot built during 48-hour hackathon. Won first place.',
      category: 'Hackathons',
      image: 'https://via.placeholder.com/600x400/00f2fe/ffffff?text=AI+Chatbot',
      video: null,
      tech: ['Python', 'TensorFlow', 'React', 'Flask'],
      links: {
        live: 'https://example.com',
        github: 'https://github.com/yourusername/project',
        figma: null,
        docs: 'https://devpost.com/project',
      },
    },
    {
      id: 6,
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with location-based forecasts and interactive maps.',
      category: 'HTML/CSS',
      image: 'https://via.placeholder.com/600x400/f5576c/ffffff?text=Weather+App',
      video: null,
      tech: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
      links: {
        live: 'https://example.com',
        github: 'https://github.com/yourusername/project',
        figma: null,
        docs: null,
      },
    },
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  // Scroll-triggered card animations
  useEffect(() => {
    if (!gridRef.current) return;

    // Small delay to ensure DOM is rendered
    const timer = setTimeout(() => {
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (!cards?.length) return;

      const ctx = gsap.context(() => {
        cards.forEach((card, index) => {
          gsap.fromTo(card,
            { 
              opacity: 0, 
              y: 60,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: 'power3.out',
              delay: index * 0.08,
              scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                toggleActions: 'play none none none'
              },
            }
          );
        });
      }, gridRef);

      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredProjects]);

  return (
    <>
      <Helmet>
        <title>Projects | Your Name - Full-Stack Developer</title>
        <meta name="description" content="Explore my portfolio of web development projects including MERN stack applications, UI/UX designs, and hackathon winners." />
        <meta property="og:title" content="Projects | Your Name" />
        <meta property="og:description" content="Explore my portfolio of web development projects" />
        <link rel="canonical" href="https://yourportfolio.com/projects" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": projects.map((project, index) => ({
              "@type": "CreativeWork",
              "position": index + 1,
              "name": project.title,
              "description": project.description,
              "url": project.links.live || project.links.github
            }))
          })}
        </script>
      </Helmet>

      <main className="projects">
        <div className="projects-container">
          {/* Page Header */}
          <motion.div
            className="page-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="gradient-text">My Projects</h1>
            <p className="page-subtitle">Showcasing my best work</p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            className="project-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="projects-grid" ref={gridRef}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  onClick={() => setSelectedProject(project)} 
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Project Modal */}
          <AnimatePresence>
            {selectedProject && (
              <ProjectModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};

/**
 * Project Modal Component
 * Expanded project view with GSAP Flip morphing animation
 */
const ProjectModal = ({ project, onClose }) => {
  const closeButtonRef = useMagneticButton(0.5);

  return (
    <motion.div
      className="project-modal-overlay"
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal glass-card"
        initial={{ opacity: 0, scale: 0.8, y: 100, rotateX: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 100, rotateX: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn magnetic" ref={closeButtonRef} onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-content">
          <div className="modal-media">
            <img src={project.image} alt={project.title} />
          </div>

          <div className="modal-info">
            <span className="project-category badge badge-primary">
              {project.category}
            </span>
            
            <h2 className="modal-title gradient-text">
              {project.title}
            </h2>
            
            <p className="modal-description">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="modal-tech">
              <h3>Technologies Used</h3>
              <div className="project-tech">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {/* Project Links */}
            <div className="modal-links">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FaGithub /> View Code
                </a>
              )}
              {project.links.figma && (
                <a
                  href={project.links.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FaFigma /> Design
                </a>
              )}
              {project.links.docs && (
                <a
                  href={project.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FaBook /> Documentation
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Project Card Component
 * Individual project card with GSAP Flip morphing and magnetic effects
 */
const ProjectCard = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const image = card.querySelector('.project-image');

    // 3D tilt effect on mouse move
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out'
      });

      gsap.to(image, {
        scale: 1.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="project-card glass-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Project Image */}
      <div className="project-media">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="project-image"
        />
        <motion.div 
          className="project-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="project-links">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
                aria-label="View live demo"
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
                aria-label="View GitHub repository"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub />
              </a>
            )}
            {project.links.figma && (
              <a
                href={project.links.figma}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
                aria-label="View Figma design"
                onClick={(e) => e.stopPropagation()}
              >
                <FaFigma />
              </a>
            )}
            {project.links.docs && (
              <a
                href={project.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
                aria-label="View documentation"
                onClick={(e) => e.stopPropagation()}
              >
                <FaBook />
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Project Info */}
      <div className="project-info">
        <span className="project-category badge badge-primary">
          {project.category}
        </span>
        <h3 className="project-title">
          {project.title}
        </h3>
        <p className="project-description">
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className="project-tech">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
          {project.tech.length > 3 && (
            <span className="tech-tag">+{project.tech.length - 3}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
