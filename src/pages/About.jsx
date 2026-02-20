import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import {
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaCode,
  FaYoutube,
  FaArrowRight
} from 'react-icons/fa';
import './About.css';

// ── Framer Motion Variants ────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const traitVariants = {
  hidden:  { opacity: 0, y: 16, scale: 0.88 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
};

// ── Spring Social Card ────────────────────────────────────────
const SocialCard = ({ social }) => {
  const [hovered, setHovered] = useState(false);

  const cardSpring = useSpring({
    transform: hovered ? 'translateY(-10px) scale(1.03)' : 'translateY(0px) scale(1)',
    boxShadow: hovered
      ? `0 24px 48px ${social.color}28, 0 0 0 1px ${social.color}40`
      : '0 2px 16px rgba(0,0,0,0.25)',
    config: config.wobbly
  });

  const iconSpring = useSpring({
    transform: hovered ? 'scale(1.25) rotate(8deg)' : 'scale(1) rotate(0deg)',
    config: { tension: 320, friction: 10 }
  });

  return (
    <animated.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="about-social-card"
      style={{
        ...cardSpring,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1.5rem',
        background: 'linear-gradient(145deg, rgba(20,29,51,0.7) 0%, rgba(10,14,26,0.9) 100%)',
        borderRadius: '1.25rem',
        textDecoration: 'none',
        border: `1px solid ${hovered ? social.color + '35' : 'rgba(255,255,255,0.06)'}`,
        backdropFilter: 'blur(12px)',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease'
      }}
    >
      <animated.div
        style={{
          ...iconSpring,
          width: '62px',
          height: '62px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `${social.color}18`,
          borderRadius: '50%',
          fontSize: '1.8rem',
          color: social.color,
          marginBottom: '1rem'
        }}
      >
        {social.icon}
      </animated.div>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>
        {social.label}
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
        {social.description}
      </p>
    </animated.a>
  );
};

// ── Trait Badge ───────────────────────────────────────────────
const TraitBadge = ({ text, color = '#00d4ff' }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.45rem 1rem',
      background: `${color}12`,
      border: `1px solid ${color}30`,
      borderRadius: '999px',
      fontSize: '0.85rem',
      color: '#cbd5e1',
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }}
  >
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
    {text}
  </span>
);

// ── Main Component ────────────────────────────────────────────
const About = () => {
  const { ref: sectionRef, inView }       = useInView({ threshold: 0.12, triggerOnce: true });
  const { ref: socialRef,  inView: socialInView } = useInView({ threshold: 0.08, triggerOnce: true });

  const socialLinks = [
    { icon: <FaGithub />,   url: 'https://github.com/dhruv2311-dot',                       label: 'GitHub',     color: '#a78bfa', description: 'Open source & projects' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/dhruv-sonagra-995144321/',   label: 'LinkedIn',   color: '#0ea5e9', description: 'Professional network' },
    { icon: <FaTwitter />,  url: 'https://x.com/dhruvvv_23_',                              label: 'Twitter / X',color: '#38bdf8', description: 'Thoughts & updates' },
    { icon: <FaInstagram />,url: 'https://www.instagram.com/dhruvvv_23_/',                 label: 'Instagram',  color: '#f472b6', description: 'Behind the scenes' },
    { icon: <FaCode />,     url: 'https://leetcode.com/u/dhruvvv_23/',                     label: 'LeetCode',   color: '#fbbf24', description: 'DSA problem solving' },
    { icon: <FaYoutube />,  url: 'https://www.youtube.com/@Itz_dhruvv',                    label: 'YouTube',    color: '#f87171', description: 'Tech tutorials' }
  ];

  const traits = [
    { text: 'Full-Stack Development',    color: '#00d4ff' },
    { text: 'Scalable Web Apps',         color: '#8b5cf6' },
    { text: 'Intuitive UI/UX',           color: '#10b981' },
    { text: 'Performance Optimization',  color: '#f59e0b' },
    { text: 'Open Source Contribution',  color: '#f43f5e' },
    { text: 'Continuous Learning',       color: '#6366f1' }
  ];

  return (
    <>
      <Helmet>
        <title>About | Dhruv Sonagra</title>
        <meta name="description" content="Dhruv Sonagra — Full-Stack Developer passionate about building scalable, elegant web experiences." />
      </Helmet>

      <main className="about" style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <div className="container">

          {/* ── Profile Row ───────────────────────────────── */}
          <section ref={sectionRef} style={{ marginBottom: '6rem' }}>
            <div className="about-profile-grid">

              {/* Photo Column */}
              <motion.div
                className="about-photo-col"
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="about-photo-glow" />
                <div className="about-orbit about-orbit-1" />
                <div className="about-orbit about-orbit-2" />
                <div className="about-photo-frame">
                  <img
                    src="https://res.cloudinary.com/dtkzxbcjx/image/upload/v1770642896/IMG_1208_uxkdnq.png"
                    alt="Dhruv Sonagra"
                    className="about-photo-img"
                  />
                </div>
                <motion.div
                  className="about-status-badge"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="about-status-dot" />
                  Open to Opportunities
                </motion.div>
              </motion.div>

              {/* Text Column — framer stagger */}
              <motion.div
                className="about-text-col"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <motion.span variants={itemVariants} className="about-eyebrow">
                  About Me
                </motion.span>

                <motion.h1 variants={itemVariants} className="about-heading">
                  Hi, I'm{' '}
                  <span className="about-name-gradient">Dhruv Sonagra</span>
                </motion.h1>

                <motion.p variants={itemVariants} className="about-bio-text">
                  I'm a passionate{' '}
                  <strong style={{ color: '#e2e8f0' }}>Full-Stack Developer</strong> with a
                  strong foundation in both frontend and backend technologies. My journey started
                  with curiosity about how the internet works and has evolved into a professional
                  pursuit of crafting{' '}
                  <strong style={{ color: '#e2e8f0' }}>elegant, scalable, and user-centric</strong>{' '}
                  applications.
                </motion.p>

                <motion.p variants={itemVariants} className="about-bio-sub">
                  When I'm not building things, I'm exploring new tech, solving problems on
                  LeetCode, or contributing to open-source. I believe clean code and great design
                  go hand in hand.
                </motion.p>

                {/* Trait badges — stagger via containerVariants child */}
                <motion.div
                  variants={containerVariants}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '2.5rem' }}
                >
                  {traits.map((t, i) => (
                    <motion.span key={i} variants={traitVariants}>
                      <TraitBadge text={t.text} color={t.color} />
                    </motion.span>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
                >
                  <motion.a
                    href="https://drive.google.com/file/d/1FjF18VC8QK7bAad8wifswbDqiojUBKXe/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-btn-primary"
                    whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,212,255,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaDownload />
                    Download Resume
                  </motion.a>
                  <motion.a
                    href="#connect"
                    className="about-btn-ghost"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Let's Connect
                    <FaArrowRight style={{ marginLeft: '0.4rem' }} />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ── Divider ───────────────────────────────────── */}
          <div className="about-section-divider" />

          {/* ── Social / Connect Section ──────────────────── */}
          <section id="connect" ref={socialRef} style={{ paddingBottom: '7rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={socialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
              <span className="about-eyebrow">Social</span>
              <h2 className="about-section-heading">
                Let's <span className="about-name-gradient">Connect</span>
              </h2>
              <p style={{ color: '#64748b', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
                Whether it's a project, collaboration, or just a chat about tech — I'm always reachable.
              </p>
            </motion.div>

            <motion.div
              className="about-social-grid"
              variants={containerVariants}
              initial="hidden"
              animate={socialInView ? 'visible' : 'hidden'}
            >
              {socialLinks.map((social) => (
                <motion.div key={social.label} variants={itemVariants}>
                  <SocialCard social={social} />
                </motion.div>
              ))}
            </motion.div>
          </section>

        </div>
      </main>
    </>
  );
};

export default About;
