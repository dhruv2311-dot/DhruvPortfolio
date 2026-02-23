import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub,
  FaLinkedin, FaTwitter, FaInstagram, FaPaperPlane,
  FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa';
import './Contact.css';

// ── Framer Motion Variants ────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

const fieldVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const fieldContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } }
};

// ── Info Card ─────────────────────────────────────────────────
const InfoCard = ({ info }) => {
  const [hovered, setHovered] = useState(false);

  const spring = useSpring({
    transform: hovered ? 'translateX(6px)' : 'translateX(0px)',
    boxShadow: hovered
      ? `0 12px 32px ${info.color}20, 0 0 0 1px ${info.color}28`
      : '0 2px 12px rgba(0,0,0,0.18)',
    config: config.gentle
  });

  return (
    <animated.a
      href={info.link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="ct-info-card"
      style={{
        ...spring,
        border: `1px solid ${hovered ? info.color + '35' : 'rgba(255,255,255,0.06)'}`,
        textDecoration: 'none',
        transition: 'border-color 0.3s ease'
      }}
    >
      <div className="ct-info-icon" style={{ background: `${info.color}18`, color: info.color }}>
        {info.icon}
      </div>
      <div>
        <div className="ct-info-label">{info.label}</div>
        <div className="ct-info-value">{info.value}</div>
      </div>
    </animated.a>
  );
};

// ── Social Link ───────────────────────────────────────────────
const SocialLink = ({ social }) => {
  const [hovered, setHovered] = useState(false);

  const spring = useSpring({
    scale: hovered ? 1.15 : 1,
    color: hovered ? social.color : '#4b6080',
    config: config.wobbly
  });

  return (
    <animated.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="ct-social-link"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...spring,
        border: `1px solid ${hovered ? social.color + '55' : 'rgba(255,255,255,0.1)'}`,
        transition: 'border-color 0.3s ease'
      }}
      title={social.label}
    >
      {social.icon}
    </animated.a>
  );
};

// ── Main Component ────────────────────────────────────────────
const Contact = () => {
  const [formData, setFormData]     = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const { ref: leftRef,   inView: leftInView   } = useInView({ threshold: 0.12, triggerOnce: true });
  const { ref: rightRef,  inView: rightInView  } = useInView({ threshold: 0.12, triggerOnce: true });
  const { ref: bannerRef, inView: bannerInView } = useInView({ threshold: 0.2,  triggerOnce: true });

  const contactInfo = [
    { icon: <FaEnvelope />,     label: 'Email',    value: 'dhruv.sonagra.cg@gmail.com', link: 'mailto:dhruv.sonagra.cg@gmail.com', color: '#00d4ff' },
    { icon: <FaPhone />,        label: 'Phone',    value: '+91 88492 77382',             link: 'tel:+918849277382',                  color: '#10b981' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Ahmedabad, India',            link: '#',                                 color: '#f43f5e' }
  ];

  const socialLinks = [
    { icon: <FaGithub />,    url: 'https://github.com/dhruv2311-dot',                       label: 'GitHub',    color: '#a78bfa' },
    { icon: <FaLinkedin />,  url: 'https://www.linkedin.com/in/dhruv-sonagra-995144321/',   label: 'LinkedIn',  color: '#0ea5e9' },
    { icon: <FaTwitter />,   url: 'https://x.com/dhruvvv_23_',                              label: 'Twitter',   color: '#38bdf8' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/dhruvvv_23_/',                 label: 'Instagram', color: '#f472b6' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch('https://formspree.io/f/mldleroq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitStatus(res.ok ? 'success' : 'error');
      if (res.ok) setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // React Spring for submit button
  const btnSpring = useSpring({
    scale:   isSubmitting ? 0.96 : 1,
    opacity: isSubmitting ? 0.75 : 1,
    config: config.wobbly
  });

  // React Spring for status messages
  const successSpring = useSpring({
    opacity:   submitStatus === 'success' ? 1 : 0,
    transform: submitStatus === 'success' ? 'translateY(0)' : 'translateY(-16px)',
    config: config.gentle
  });
  const errorSpring = useSpring({
    opacity:   submitStatus === 'error' ? 1 : 0,
    transform: submitStatus === 'error' ? 'translateY(0)' : 'translateY(-16px)',
    config: config.wobbly
  });

  return (
    <>
      <Helmet>
        <title>Contact | Dhruv Sonagra</title>
        <meta name="description" content="Get in touch with Dhruv Sonagra for collaborations or opportunities." />
      </Helmet>

      <main className="ct-page" style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <div className="container">

          {/* ── Header ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: '5rem' }}
          >
            <span className="ct-eyebrow">Get In Touch</span>
            <h1 className="ct-heading">
              Let's <span className="ct-gradient-text">Connect</span>
            </h1>
            <p className="ct-subtitle">
              Have a project in mind, a collaboration idea, or just want to say hi?
              My inbox is always open.
            </p>
          </motion.div>

          {/* ── Two Column Grid ──────────────────────────── */}
          <div className="ct-grid">

            {/* ── Left: Info ──────────────────────────────── */}
            <motion.div
              ref={leftRef}
              variants={containerVariants}
              initial="hidden"
              animate={leftInView ? 'visible' : 'hidden'}
              className="ct-left"
            >
              <motion.h2 variants={itemVariants} className="ct-left-title">
                Contact Information
              </motion.h2>
              <motion.p variants={itemVariants} className="ct-left-desc">
                Feel free to reach out through any channel.
                I'm always open to discussing new projects and opportunities.
              </motion.p>

              {/* Info cards */}
              <motion.div variants={itemVariants} className="ct-info-list">
                {contactInfo.map((info) => (
                  <InfoCard key={info.label} info={info} />
                ))}
              </motion.div>

              <div className="ct-divider" />

              {/* Social */}
              <motion.div variants={itemVariants}>
                <p className="ct-social-label">Find me on</p>
                <div className="ct-social-row">
                  {socialLinks.map((s) => (
                    <SocialLink key={s.label} social={s} />
                  ))}
                </div>
              </motion.div>

              {/* Availability */}
              <motion.div variants={itemVariants} className="ct-avail">
                <span className="ct-avail-dot" />
                <span>
                  <strong>Available for freelance work</strong>
                  <br />
                  <span>Currently accepting new projects</span>
                </span>
              </motion.div>
            </motion.div>

            {/* ── Right: Form ─────────────────────────────── */}
            <motion.div
              ref={rightRef}
              initial={{ opacity: 0, x: 36 }}
              animate={rightInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="ct-form-wrap"
            >
              {/* Form fields — framer-motion stagger */}
              <motion.form
                onSubmit={handleSubmit}
                noValidate
                variants={fieldContainerVariants}
                initial="hidden"
                animate={rightInView ? 'visible' : 'hidden'}
              >
                {/* Name + Email row */}
                <motion.div variants={fieldVariants} className="ct-fields-row" style={{ marginBottom: '1.5rem' }}>
                  <div className="ct-field-group">
                    <label className="ct-label" style={{ color: focusedField === 'name' ? '#00d4ff' : '' }}>
                      Your Name
                    </label>
                    <input
                      type="text" name="name" value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required placeholder="John Doe" className="ct-input"
                      style={{ borderColor: focusedField === 'name' ? 'rgba(0,212,255,0.5)' : '' }}
                    />
                  </div>
                  <div className="ct-field-group">
                    <label className="ct-label" style={{ color: focusedField === 'email' ? '#00d4ff' : '' }}>
                      Email Address
                    </label>
                    <input
                      type="email" name="email" value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required placeholder="john@example.com" className="ct-input"
                      style={{ borderColor: focusedField === 'email' ? 'rgba(0,212,255,0.5)' : '' }}
                    />
                  </div>
                </motion.div>

                {/* Subject */}
                <motion.div variants={fieldVariants} style={{ marginBottom: '1.5rem' }}>
                  <label className="ct-label" style={{ color: focusedField === 'subject' ? '#00d4ff' : '' }}>
                    Subject
                  </label>
                  <input
                    type="text" name="subject" value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required placeholder="Project Collaboration" className="ct-input"
                    style={{ borderColor: focusedField === 'subject' ? 'rgba(0,212,255,0.5)' : '' }}
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={fieldVariants} style={{ marginBottom: '1.5rem' }}>
                  <label className="ct-label" style={{ color: focusedField === 'message' ? '#00d4ff' : '' }}>
                    Message
                  </label>
                  <textarea
                    name="message" value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required rows={5} placeholder="Tell me about your project..."
                    className="ct-input ct-textarea"
                    style={{ borderColor: focusedField === 'message' ? 'rgba(0,212,255,0.5)' : '' }}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={fieldVariants}>
                  <animated.button
                    type="submit"
                    disabled={isSubmitting}
                    className="ct-submit"
                    style={btnSpring}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                          className="ct-spinner"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </animated.button>
                </motion.div>

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <animated.div className="ct-status ct-status-success" style={successSpring}>
                    <FaCheckCircle />
                    Message sent! I'll get back to you shortly.
                  </animated.div>
                )}
                {submitStatus === 'error' && (
                  <animated.div className="ct-status ct-status-error" style={errorSpring}>
                    <FaExclamationCircle />
                    Something went wrong. Please try again.
                  </animated.div>
                )}
              </motion.form>
            </motion.div>
          </div>

          {/* ── Footer Banner ────────────────────────────── */}
          <motion.div
            ref={bannerRef}
            initial={{ opacity: 0, y: 28 }}
            animate={bannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="ct-banner"
          >
            <div className="ct-banner-left">
              <div className="ct-banner-dot-wrap">
                <span className="ct-banner-pulse" />
                <span className="ct-banner-dot-inner" />
              </div>
              <div>
                <h3 className="ct-banner-title">Available for freelance work</h3>
                <p className="ct-banner-sub">Let's build something great together.</p>
              </div>
            </div>
            <a href="mailto:dhruv.sonagra.cg@gmail.com" className="ct-banner-btn">
              Schedule a Call
            </a>
          </motion.div>

        </div>
      </main>
    </>
  );
};

export default Contact;
