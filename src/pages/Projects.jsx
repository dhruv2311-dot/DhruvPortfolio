import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import {
  FaGithub, FaExternalLinkAlt, FaFigma, FaTimes,
  FaPlay, FaVolumeMute, FaVolumeUp
} from 'react-icons/fa';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

// ── Helper: build iframe src with correct mute param ──────────
const buildVideoSrc = (url, muted) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    u.searchParams.set('autoplay', '1');
    u.searchParams.set('mute', muted ? '1' : '0');
    u.searchParams.set('controls', '1');
    u.searchParams.set('modestbranding', '1');
    u.searchParams.set('rel', '0');
    return u.toString();
  } catch {
    // fallback: raw append
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}autoplay=1&mute=${muted ? 1 : 0}&controls=1`;
  }
};

// ── VideoProjectCard ──────────────────────────────────────────
const VideoProjectCard = ({ project, onSelect }) => {
  const [hovered, setHovered]   = useState(false);
  const [muted, setMuted]       = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const hoverTimerRef           = useRef(null);
  const hasVideo                = Boolean(project.videoUrl);

  // Slight delay before showing iframe so accidental mouse-overs don't flash it
  const handleMouseEnter = () => {
    setHovered(true);
    if (hasVideo) {
      hoverTimerRef.current = setTimeout(() => setShowVideo(true), 200);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    clearTimeout(hoverTimerRef.current);
    setShowVideo(false);
    setMuted(true); // reset mute when card leaves
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setMuted(prev => !prev);
  };

  // Build current iframe src (key changes force re-render = new mute state)
  const iframeSrc = buildVideoSrc(project.videoUrl, muted);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{
        background: 'linear-gradient(145deg, rgba(20,29,51,0.6) 0%, rgba(10,14,26,0.8) 100%)',
        border: `1px solid ${hovered ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: '1rem',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.45)' : '0 4px 20px rgba(0,0,0,0.25)',
        position: 'relative'
      }}
    >
      {/* ── Media area ──────────────────────────────────── */}
      <div style={{ height: '220px', overflow: 'hidden', position: 'relative', background: '#0a0e1a' }}>

        {/* Always show the image underneath */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease, opacity 0.35s ease',
            transform: hovered && !hasVideo ? 'scale(1.07)' : 'scale(1)',
            opacity: showVideo ? 0 : 1,
            position: showVideo ? 'absolute' : 'relative',
            inset: 0
          }}
        />

        {/* Iframe — only when video URL exists AND hover started */}
        {hasVideo && showVideo && (
          <iframe
            key={`${project.id}-${muted}`} /* remount when mute flips */
            src={iframeSrc}
            title={project.title}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
            }}
          />
        )}

        {/* Play badge — shown on hover when video exists and iframe not yet ready */}
        {hasVideo && hovered && !showVideo && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(2px)'
          }}>
            <div style={{
              width: '48px', height: '48px',
              borderRadius: '50%',
              background: 'rgba(0,212,255,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(0,212,255,0.5)'
            }}>
              <FaPlay style={{ color: '#0a0e1a', fontSize: '1rem', marginLeft: '3px' }} />
            </div>
          </div>
        )}

        {/* Mute / Unmute button — only when video is playing */}
        {hasVideo && showVideo && (
          <button
            onClick={toggleMute}
            title={muted ? 'Unmute' : 'Mute'}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 20,
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              backdropFilter: 'blur(4px)',
              transition: 'background 0.2s ease, transform 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,255,0.8)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.7)'}
          >
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        )}

        {/* Video indicator chip — shown when no hover, for cards that have video */}
        {hasVideo && !hovered && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.28rem 0.65rem',
            background: 'rgba(0,0,0,0.65)',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: '999px',
            backdropFilter: 'blur(4px)'
          }}>
            <FaPlay style={{ fontSize: '0.6rem', color: '#00d4ff' }} />
            <span style={{ fontSize: '0.68rem', color: '#00d4ff', fontWeight: 600 }}>Preview</span>
          </div>
        )}
      </div>

      {/* ── Card Content ─────────────────────────────── */}
      <div style={{ padding: '1.5rem' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {project.category}
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          {project.title}
        </h3>

        <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1rem' }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {project.tech.map((t, i) => (
            <span key={i} style={{
              fontSize: '0.72rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '0.22rem 0.55rem',
              borderRadius: '4px',
              color: '#cbd5e1'
            }}>{t}</span>
          ))}
        </div>

        {/* Action links */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                flex: 1, textAlign: 'center', padding: '0.5rem',
                background: 'linear-gradient(90deg,#00d4ff,#8b5cf6)',
                color: '#fff', borderRadius: '8px',
                fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none'
              }}>
              Live
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                flex: 1, textAlign: 'center', padding: '0.5rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', borderRadius: '8px',
                fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none'
              }}>
              GitHub
            </a>
          )}
          {project.links.figma && (
            <a href={project.links.figma} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                flex: 1, textAlign: 'center', padding: '0.5rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', borderRadius: '8px',
                fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none'
              }}>
              Figma
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Projects Page - Horizontal Scroll Gallery
 * Features: Horizontal scroll, 3D card effects, filterable grid
 */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'HTML/CSS', 'MERN', 'Figma', 'Hackathons'];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'MERN',
      description: 'A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // replace with your real video embed URL
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
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // replace with your real video embed URL
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
      videoUrl: null, // no video — image only
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
      videoUrl: null, // no video — image only
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
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // replace with your real video embed URL
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

        {/* Featured Projects Carousel - Swiper */}
        <section style={{ marginBottom: '6rem', padding: '0 2rem' }}>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="featured-projects-swiper"
            style={{
              paddingBottom: '3rem'
            }}
          >
            {featuredProjects.map((project) => (
              <SwiperSlide 
                key={project.id}
                style={{
                  maxWidth: '600px',
                  height: '450px',
                }}
              >
                <motion.div
                  className="project-card-featured"
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
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
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {project.tech.slice(0, 4).map((tech, i) => (
                        <span key={i} style={{
                          fontSize: '0.7rem',
                          background: 'rgba(255,255,255,0.1)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          color: '#cbd5e1'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
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
              {filteredProjects.map((project) => (
                <VideoProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
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
