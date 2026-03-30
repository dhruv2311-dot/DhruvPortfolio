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
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                flex: 1, textAlign: 'center', padding: '0.5rem',
                background: 'rgba(0,212,255,0.12)',
                border: '1px solid rgba(0,212,255,0.3)',
                color: '#00d4ff', borderRadius: '8px',
                fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none'
              }}>
              Demo
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
          {project.links.api && (
            <a href={project.links.api} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                flex: 1, textAlign: 'center', padding: '0.5rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', borderRadius: '8px',
                fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none'
              }}>
              API Docs
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
      id: 5,
      title: 'Eventura (Figma)',
      category: 'Figma',
      description: 'A clean and modern dashboard interface design with white mode support.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1739943406/eventura_tuntzx.png',
      videoUrl: null,
      tech: ['Figma', 'Auto Layout', 'Components', 'Variants'],
      links: {
        live: null,
        github: null,
        figma: 'https://www.figma.com/design/VTpYgGhHaIuRfob33itg2p/codinggita?node-id=124-532&t=vtIPVwzy8GVvCr3a-1',
        api: null
      },
      featured: true
    },
    {
      id: 6,
      title: 'CodingGita (Figma)',
      category: 'Figma',
      description: 'CodingGita is a well-structured and visually appealing website page design.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1740253761/wfdtwsnrsexc4xkkumvw.png',
      videoUrl: null,
      tech: ['Figma', 'Auto Layout', 'Components', 'Variants'],
      links: {
        live: null,
        github: null,
        figma: 'https://www.figma.com/design/VTpYgGhHaIuRfob33itg2p/codinggita?node-id=138-5416&t=vtIPVwzy8GVvCr3a-1',
        api: null
      },
      featured: false
    },
    {
      id: 7,
      title: 'Furnishly (Figma)',
      category: 'Figma',
      description: 'Furnishly features a sleek and intuitive interface with a focus on user experience.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1740253407/j0jnuta7tknmxkfrplka.jpg',
      videoUrl: null,
      tech: ['Figma', 'Auto Layout', 'Components', 'Variants'],
      links: {
        live: null,
        github: null,
        figma: 'https://www.figma.com/design/VTpYgGhHaIuRfob33itg2p/codinggita?node-id=124-532&t=vtIPVwzy8GVvCr3a-1',
        api: null
      },
      featured: false
    },
    {
      id: 8,
      title: 'Farmtrust (Figma)',
      category: 'Figma',
      description: 'FarmTrust is a comprehensive platform for farmers, offering real-time updates, an AI chatbot for assistance, and a user-friendly interface. It connects farmers with buyers, ensuring efficient transactions and support.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1747942311/Screenshot_2025-05-23_005646_qd6hzt.png',
      videoUrl: null,
      tech: ['Figma', 'Auto Layout', 'Components', 'Variants'],
      links: {
        live: null,
        github: null,
        figma: 'https://www.figma.com/design/SNuN8wbnReIue8nUOJhjEG/Untitled?node-id=0-1&t=EmfBEpHrp46N2K5m-1',
        api: null
      },
      featured: false
    },
    {
      id: 9,
      title: 'Purple',
      category: 'HTML/CSS',
      description: 'E-commerce platform with modern UI and seamless shopping experience.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1739943602/bgrat7sxisqwumu4x1vn.png',
      videoUrl: null,
      tech: ['React', 'Tailwind CSS'],
      links: {
        live: 'https://purple21.netlify.app/',
        github: 'https://github.com/dhruv2311-dot/PURPLE',
        figma: null,
        api: null
      },
      featured: true
    },
    {
      id: 10,
      title: 'PharmEasy',
      category: 'HTML/CSS',
      description: 'Online pharmacy platform with medicine delivery system.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1739943561/y4vnpuulvuibf86l0dj9.png',
      videoUrl: null,
      tech: ['HTML', 'CSS', 'JavaScript'],
      links: {
        live: 'https://bespoke-blini-7c10e3.netlify.app/',
        github: 'https://github.com/dhruv2311-dot/pharmeasy',
        figma: null,
        api: null
      },
      featured: false
    },
    {
      id: 11,
      title: 'HireAVilla',
      category: 'HTML/CSS',
      description: 'Property booking platform with advanced filtering and booking system.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1739943420/hireavilla_ag5gso.png',
      videoUrl: null,
      tech: ['HTML', 'CSS', 'JavaScript'],
      links: {
        live: 'https://hireavilla12.netlify.app/',
        github: 'https://github.com/dhruv2311-dot/HIREAVILLA',
        figma: null,
        api: null
      },
      featured: false
    },
    {
      id: 12,
      title: 'Netflix',
      category: 'MERN',
      description: 'A Netflix clone built with React, featuring a responsive design, smooth navigation, and dynamic content loading. It offers a seamless streaming experience with an intuitive user interface.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1747942711/Screenshot_2025-05-23_010754_duojcu.png',
      videoUrl: null,
      tech: ['React', 'Tailwind CSS'],
      links: {
        live: 'https://netflix-u9ng.onrender.com/',
        github: 'https://github.com/dhruv2311-dot/netflix',
        figma: null,
        api: null
      },
      featured: true
    },
    {
      id: 13,
      title: 'Tic-Tac-Toe',
      category: 'MERN',
      description: 'A classic Tic Tac Toe game developed using React, featuring a responsive UI, smooth gameplay, and dynamic state management for an engaging experience.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1740157368/gtsplesiovqz4emqthn2.png',
      videoUrl: null,
      tech: ['React', 'Tailwind CSS'],
      links: {
        live: 'https://tic-tac-toe-sandy-two.vercel.app/',
        github: 'https://github.com/dhruv2311-dot/Tic-Tac-Toe',
        figma: null,
        api: null
      },
      featured: false
    },
    {
      id: 14,
      title: 'Eventura',
      category: 'MERN',
      description: 'Event management platform with real-time updates and interactive features.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1739943406/eventura_tuntzx.png',
      videoUrl: null,
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      links: {
        live: 'https://eventura-23.netlify.app/',
        github: 'https://github.com/dhruv2311-dot/eventura-',
        figma: null,
        api: 'https://documenter.getpostman.com/view/39189509/2sAYX3s4Dc'
      },
      featured: true
    },
    {
      id: 15,
      title: 'Farmtrust',
      category: 'MERN',
      description: 'FarmTrust is a comprehensive platform for farmers, offering real-time updates, an AI chatbot for assistance, and a user-friendly interface. It connects farmers with buyers, ensuring efficient transactions and support.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1747942311/Screenshot_2025-05-23_005646_qd6hzt.png',
      videoUrl: null,
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io', 'AI Chatbot', 'i18n', 'Authentication'],
      links: {
        live: 'https://farmtrust.netlify.app/',
        github: 'https://github.com/dhruv2311-dot/FarmTrust',
        figma: null,
        api: 'https://documenter.getpostman.com/view/39189509/2sAYX3s4Dc'
      },
      featured: true
    },
    {
      id: 16,
      title: 'Youtube',
      category: 'MERN',
      description: 'A dynamic YouTube clone featuring real-time video updates, interactive UI, and seamless streaming. Built with React and Node.js, it integrates a custom YouTube API for personalized content delivery.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1740156747/Screenshot_2025-02-21_221308_uqsfq2.png',
      videoUrl: null,
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      links: {
        live: 'https://youtube-api-lomc.vercel.app/',
        github: 'https://github.com/dhruv2311-dot/Youtube-API',
        figma: null,
        api: null
      },
      featured: false
    },
    {
      id: 17,
      title: 'Spotify',
      category: 'MERN',
      description: 'A sleek Spotify clone built using React with a modular, component-based architecture. It offers seamless music playback, dynamic UI updates, and an interactive user experience.',
      image: 'https://res.cloudinary.com/dtkzxbcjx/image/upload/v1740156966/igvbvpgmgyzkbrthcdma.png',
      videoUrl: null,
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      links: {
        live: 'https://spotify-react-component.vercel.app/',
        github: 'https://github.com/dhruv2311-dot/spotify-react-component',
        figma: null,
        api: null
      },
      featured: false
    },
    {
      id: 18,
      title: 'Smart Emergency Blood Network (SEBN)',
      category: 'Hackathons',
      description: 'Hack The Winter project: a governed emergency blood coordination platform connecting hospitals, blood banks, and NGOs with escalation logic and audit-ready workflows.',
      image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1200&h=800&fit=crop',
      videoUrl: null,
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
      links: {
        live: 'https://hackthewinter.netlify.app/',
        demo: 'https://drive.google.com/drive/folders/1splVdZoQxYmd0r-DX-u-tqTPUxqSP3fD?usp=sharing',
        github: 'https://github.com/dhruv2311-dot/Hack_The_Winter',
        figma: null,
        api: 'https://documenter.getpostman.com/view/39216723/2sBXVbJuPe'
      },
      featured: true
    },
    {
      id: 19,
      title: 'EcoFinds - Sustainable Second-Hand Marketplace',
      category: 'Hackathons',
      description: 'Built for Odoo x NMIT Hackathon 2025, EcoFinds is a full-stack marketplace focused on circular economy by helping users buy and sell pre-owned products securely.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=800&fit=crop',
      videoUrl: null,
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
      links: {
        live: 'https://ecofinds.vercel.app',
        demo: null,
        github: 'https://github.com/dhruv2311-dot/EcoFinds',
        figma: null,
        api: 'https://ecofinds-api.render.com'
      },
      featured: true
    },
    {
      id: 20,
      title: 'Expenseura - Smart Expense Management System',
      category: 'Hackathons',
      description: 'Built during Odoo x Amalthea Hackathon, Expenseura streamlines company expense tracking with OCR receipt extraction, multi-level approvals, and multi-currency support.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop',
      videoUrl: null,
      tech: ['React 18', 'Vite', 'TailwindCSS', 'Supabase', 'PostgreSQL', 'Tesseract.js'],
      links: {
        live: null,
        demo: null,
        github: 'https://github.com/dhruv2311-dot/Expenseura',
        figma: null,
        api: 'https://github.com/dhruv2311-dot/Expenseura/blob/main/Docs/API_DOCUMENTATION.md'
      },
      featured: true
    },
    {
      id: 21,
      title: 'CoreInventory',
      category: 'Hackathons',
      description: 'Built during Odoo x Indus Virtual Hackathon, CoreInventory is an inventory operations platform for products, receipts, deliveries, stock movement, and warehouse/location controls.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
      videoUrl: null,
      tech: ['React', 'Vite', 'Node.js', 'Express', 'Supabase', 'Tailwind CSS', 'React Query', 'Zustand'],
      links: {
        live: 'https://coreinventory.vercel.app',
        demo: 'https://coreinventory.vercel.app',
        github: 'https://github.com/dhruv2311-dot/CoreInventory',
        figma: null,
        api: 'https://coreinventory-api.onrender.com'
      },
      featured: true
    },
    {
      id: 22,
      title: 'ReWear - Sustainable Clothing Exchange Platform',
      category: 'MERN',
      description: 'A full-stack MERN clothing exchange marketplace with real-time chat, secure authentication, admin moderation tools, and sustainability-focused swapping workflows.',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=800&fit=crop',
      videoUrl: null,
      tech: ['React 19', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'Cloudinary'],
      links: {
        live: 'https://rewear.vercel.app',
        demo: 'https://rewear.vercel.app',
        github: 'https://github.com/dhruv2311-dot/ReWear',
        figma: null,
        api: 'https://rewear-api.onrender.com/api/health'
      },
      featured: true
    },
    {
      id: 23,
      title: 'StockMaster - Modular Inventory Control',
      category: 'Hackathons',
      description: 'Built during Odoo x SPIT Hackathon, StockMaster is a role-aware inventory workspace with realtime stock updates, receipts, deliveries, transfers, adjustments, and audit-ready ledger workflows.',
      image: 'https://images.unsplash.com/photo-1586528116493-6d31f57f2f84?w=1200&h=800&fit=crop',
      videoUrl: null,
      tech: ['Next.js 14', 'React 18', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vitest'],
      links: {
        live: 'https://stock-master-phi.vercel.app/',
        demo: 'https://youtu.be/jW3N5y22LoI?si=loHINSVVbZP197BR',
        github: 'https://github.com/dhruv2311-dot/Stock_Master',
        figma: null,
        api: 'https://documenter.getpostman.com/view/39189509/2sBXigMtds'
      },
      featured: true
    },
    {
      id: 24,
      title: 'GlobeTrotter - Full-Stack Travel Planning App',
      category: 'MERN',
      description: 'A premium MERN travel planning platform with trip creation, itinerary management, community sharing, admin analytics, and rich travel discovery workflows.',
      image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&h=800&fit=crop',
      videoUrl: null,
      tech: ['React 18', 'Node.js', 'Express 4', 'MongoDB', 'Mongoose', 'Zustand', 'Framer Motion'],
      links: {
        live: null,
        demo: null,
        github: 'https://github.com/dhruv2311-dot/GlobeTrotter',
        figma: null,
        api: 'https://documenter.getpostman.com/view/39189509/2sBXinGAMV'
      },
      featured: true
    }
  ];

  const categoryOrder = { 'Hackathons': 0, 'MERN': 1, 'HTML/CSS': 2, 'Figma': 3 };

  const filteredProjects = (activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)
  ).slice().sort((a, b) => (categoryOrder[a.category] ?? 99) - (categoryOrder[b.category] ?? 99));

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <>
      <Helmet>
        <title>Projects | Dhruv Sonagra</title>
        <meta name="description" content="Explore my portfolio of web development projects, UI/UX designs, and open source contributions." />
        <link rel="canonical" href="https://dhruvsonagra.me/projects" />
        <meta property="og:url" content="https://dhruvsonagra.me/projects" />
      </Helmet>

      <div className="projects" style={{ paddingTop: '120px' }}>
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
      </div>
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
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <FaPlay style={{ marginRight: '0.5rem' }} />
                Demo Video
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
            {project.links.api && (
              <a
                href={project.links.api}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <FaExternalLinkAlt style={{ marginRight: '0.5rem' }} />
                API Docs
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
