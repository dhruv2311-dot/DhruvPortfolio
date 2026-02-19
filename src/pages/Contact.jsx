import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub,
  FaLinkedin, FaTwitter, FaInstagram, FaPaperPlane,
  FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa';
import './Contact.css';

/**
 * Contact Page - Interactive Form with Particle Effects
 * Features: Magnetic inputs, particle animations, form validation
 */
const Contact = () => {
  const canvasRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'dhruv.sonagra@example.com',
      link: 'mailto:dhruv.sonagra@example.com',
      color: '#00d4ff'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+91 98765 43210',
      link: 'tel:+919876543210',
      color: '#10b981'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Mumbai, India',
      link: '#',
      color: '#f43f5e'
    }
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com', label: 'GitHub', color: '#333' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn', color: '#0077b5' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter', color: '#1da1f2' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram', color: '#e4405f' }
  ];

  // Particle animation for canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        color: ['#00d4ff', '#8b5cf6', '#f43f5e'][Math.floor(Math.random() * 3)]
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '40';
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/mldleroq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contact | Dhruv Sonagra</title>
        <meta name="description" content="Get in touch for collaborations, opportunities, or just to say hello." />
      </Helmet>

      <main className="contact" style={{ paddingTop: '120px' }}>
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
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              color: '#10b981',
              marginBottom: '1.5rem'
            }}>
              Get In Touch
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              Let's{' '}
              <span style={{
                background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Connect
              </span>
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#94a3b8',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
          </motion.div>
        </section>

        {/* Contact Grid */}
        <section className="container" style={{ marginBottom: '6rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: '4rem'
          }}>
            {/* Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem'
                }}>
                  Contact Information
                </h2>
                <p style={{
                  color: '#64748b',
                  marginBottom: '2rem',
                  lineHeight: 1.7
                }}>
                  Feel free to reach out through any of these channels. 
                  I'm always open to discussing new projects and opportunities.
                </p>

                {/* Contact Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.link}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="magnetic"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1.25rem',
                        background: 'linear-gradient(145deg, rgba(20, 29, 51, 0.6) 0%, rgba(10, 14, 26, 0.8) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${info.color}15`,
                        borderRadius: '12px',
                        fontSize: '1.25rem',
                        color: info.color
                      }}>
                        {info.icon}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#64748b',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          marginBottom: '0.25rem'
                        }}>
                          {info.label}
                        </div>
                        <div style={{ fontWeight: 500 }}>
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    color: '#64748b'
                  }}>
                    Follow Me
                  </h3>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="magnetic"
                        style={{
                          width: '44px',
                          height: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#94a3b8',
                          fontSize: '1.125rem',
                          transition: 'all 0.3s ease'
                        }}
                        whileHover={{
                          borderColor: social.color,
                          color: social.color,
                          scale: 1.1
                        }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                position: 'relative',
                padding: '2.5rem',
                background: 'linear-gradient(145deg, rgba(20, 29, 51, 0.6) 0%, rgba(10, 14, 26, 0.8) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '1.5rem',
                overflow: 'hidden'
              }}
            >
              {/* Particle Canvas */}
              <canvas
                ref={canvasRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  opacity: 0.5
                }}
              />

              <form ref={formRef} onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  {/* Name Field */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                      color: focusedField === 'name' ? '#00d4ff' : '#94a3b8',
                      transition: 'color 0.3s ease'
                    }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="magnetic"
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        background: 'rgba(10, 14, 26, 0.5)',
                        border: `1px solid ${focusedField === 'name' ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: '0.75rem',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                      color: focusedField === 'email' ? '#00d4ff' : '#94a3b8',
                      transition: 'color 0.3s ease'
                    }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="magnetic"
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        background: 'rgba(10, 14, 26, 0.5)',
                        border: `1px solid ${focusedField === 'email' ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: '0.75rem',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                    color: focusedField === 'subject' ? '#00d4ff' : '#94a3b8',
                    transition: 'color 0.3s ease'
                  }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="magnetic"
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      background: 'rgba(10, 14, 26, 0.5)',
                      border: `1px solid ${focusedField === 'subject' ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '0.75rem',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="Project Collaboration"
                  />
                </div>

                {/* Message Field */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                    color: focusedField === 'message' ? '#00d4ff' : '#94a3b8',
                    transition: 'color 0.3s ease'
                  }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="magnetic"
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      background: 'rgba(10, 14, 26, 0.5)',
                      border: `1px solid ${focusedField === 'message' ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '0.75rem',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '150px',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary magnetic"
                  style={{
                    width: '100%',
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid transparent',
                          borderTopColor: '#fff',
                          borderRadius: '50%'
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      background: submitStatus === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                      border: `1px solid ${submitStatus === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: submitStatus === 'success' ? '#10b981' : '#f43f5e'
                    }}
                  >
                    {submitStatus === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                    {submitStatus === 'success' 
                      ? 'Message sent successfully! I\'ll get back to you soon.' 
                      : 'Something went wrong. Please try again.'}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </section>

        {/* Availability Banner */}
        <section className="container" style={{ paddingBottom: '6rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: '2rem',
              background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.1), rgba(139, 92, 246, 0.1))',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '12px',
                height: '12px',
                background: '#10b981',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }} />
              <div>
                <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                  Available for freelance work
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Currently accepting new projects for Q1 2025
                </p>
              </div>
            </div>
            <a href="mailto:dhruv.sonagra@example.com" className="btn btn-primary">
              Schedule a Call
            </a>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default Contact;
