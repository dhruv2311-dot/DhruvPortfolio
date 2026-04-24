import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';

const isPostmanDocUrl = (url) => typeof url === 'string' && /(^https?:\/\/)?(www\.)?documenter\.getpostman\.com\//i.test(url);

const ProjectCard = ({ project, onSelect, isFocused }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Mouse position tracking slightly smoothed
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 20, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Minimal 3D tilt effect (rotateX and rotateY)
  const rotateX = useTransform(mouseYSpring, [0, 1], [4, -4]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-4, 4]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      layout
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ 
        opacity: isFocused && !isHovered ? 0.4 : 1, 
        y: 0, 
        scale: 1,
        filter: isFocused && !isHovered ? 'blur(2px)' : 'blur(0px)'
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 1000,
        position: 'relative',
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        cursor: 'pointer',
        borderRadius: '24px',
        backgroundColor: 'rgba(11, 18, 32, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s ease-out',
        boxShadow: isHovered 
          ? '0 20px 40px -15px rgba(0,212,255,0.15)' 
          : 'none',
        zIndex: isHovered ? 20 : 10,
        backdropFilter: 'blur(12px)',
        overflow: 'hidden'
      }}
    >
      {/* Background glass gloss */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        pointerEvents: 'none'
      }} />

      {/* Noise Texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.25,
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
        backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`
      }} />
      
      {/* Spotlight glow inside card from top-left */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom right, rgba(59,130,246,0.1), transparent, rgba(168,85,247,0.05))',
        opacity: isHovered ? 1 : 0.4,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none'
      }} />

      {/* Animated gradient border on hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '24px',
        padding: '1px',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.8), rgba(168,85,247,0.8), rgba(6,182,212,0.8))',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude'
      }} />

      {/* Image Area */}
      <div style={{
        position: 'relative',
        height: '240px',
        width: '100%',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <motion.img 
          src={project.image} 
          alt={project.title} 
          loading="lazy" 
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover'
          }}
        />
        {/* Gradient overlay for depth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(11,18,32,1), rgba(11,18,32,0.2), transparent)',
          zIndex: 10
        }} />
        
        {/* Category Badge over image */}
        {project.category && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            zIndex: 20
          }}>
            <span style={{
              borderRadius: '9999px',
              border: '1px solid rgba(6,182,212,0.3)',
              backgroundColor: 'rgba(0,0,0,0.4)',
              padding: '0.375rem 0.75rem',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#4ade80',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 6px -1px rgba(6,182,212,0.2)',
              pointerEvents: 'none'
            }}>
              {project.category}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: '1rem 1.5rem 1.5rem 1.5rem'
      }}>
        {/* Title */}
        <h3 style={{
          marginBottom: '0.5rem',
          fontSize: '1.25rem',
          fontWeight: 800,
          color: isHovered ? '#67e8f9' : '#fff',
          transition: 'color 0.3s ease',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          {project.title}
        </h3>
        
        {/* Description */}
        <p style={{
          marginBottom: '1.25rem',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          color: '#9ca3af',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div style={{
          marginBottom: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {project.tech.map((tech, i) => (
            <motion.span 
              key={i} 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(6,182,212,0.15)', borderColor: 'rgba(6,182,212,0.3)' }}
              style={{
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '0.375rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#d1d5db',
                transition: 'colors 0.3s ease',
                cursor: 'default',
                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          {project.links.live && (
            <motion.a 
              href={project.links.live} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={e => e.stopPropagation()}
              whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 25px rgba(168,85,247,0.45)' }}
              style={{
                display: 'flex',
                flex: 1,
                minWidth: '100px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(to right, #2563eb, #9333ea)',
                padding: '0.625rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#fff',
                boxShadow: '0 0 15px rgba(59,130,246,0.25)',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
            >
              <FaExternalLinkAlt size={13} /> Live
            </motion.a>
          )}
          
          {project.links.demo && (
            <motion.a 
              href={project.links.demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={e => e.stopPropagation()}
              whileHover={{ y: -4, scale: 1.02, backgroundColor: 'rgba(59,130,246,0.2)', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
              style={{
                display: 'flex',
                flex: 1,
                minWidth: '100px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(59,130,246,0.3)',
                backgroundColor: 'rgba(59,130,246,0.1)',
                padding: '0.625rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#93c5fd',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
            >
              <FaPlay size={12} /> Demo
            </motion.a>
          )}

          {project.links.github && (
            <motion.a 
              href={project.links.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={e => e.stopPropagation()}
              whileHover={{ y: -4, scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
              style={{
                display: 'flex',
                flex: 1,
                minWidth: '100px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '0.625rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#e5e7eb',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
            >
              <FaGithub size={15} /> Code
            </motion.a>
          )}

          {isPostmanDocUrl(project.links.api) && (
            <motion.a 
              href={project.links.api} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={e => e.stopPropagation()}
              whileHover={{ y: -4, scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
              style={{
                display: 'flex',
                flex: 1,
                minWidth: '100px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '0.625rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#e5e7eb',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
            >
              <FaExternalLinkAlt size={13} /> API
            </motion.a>
          )}

          {project.links.figma && (
            <motion.a 
              href={project.links.figma} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={e => e.stopPropagation()}
              whileHover={{ y: -4, scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
              style={{
                display: 'flex',
                flex: 1,
                minWidth: '100px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '0.625rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#e5e7eb',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
            >
              <FaExternalLinkAlt size={13} /> Figma
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
