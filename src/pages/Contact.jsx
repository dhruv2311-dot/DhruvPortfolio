import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';
import useMagneticButton from '../hooks/useMagneticButton';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Contact Page Component with Premium Animations
 * Contact form with GSAP and Anime.js animations
 * Features: form validation, animated inputs, success feedback
 */
const Contact = () => {
  const submitButtonRef = useMagneticButton(0.3);
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // GSAP form animations on mount
  useEffect(() => {
    if (!formRef.current) return;

    const inputs = formRef.current.querySelectorAll('.form-group');
    const contactCards = document.querySelectorAll('.contact-info-card');

    // Animate form inputs
    gsap.fromTo(inputs, 
      { 
        opacity: 0, 
        y: 50,
        rotationX: -15 
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate contact info cards
    gsap.fromTo(contactCards,
      {
        opacity: 0,
        x: -50,
        scale: 0.9
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Anime.js input focus animations
  const handleInputFocus = (e) => {
    animate(e.target, {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
      scale: 1.01,
      duration: 300,
      ease: 'out-cubic'
    });
  };

  const handleInputBlur = (e) => {
    animate(e.target, {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 0 0 0px rgba(102, 126, 234, 0)',
      scale: 1,
      duration: 300,
      ease: 'out-cubic'
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Success animation
        const successMsg = document.querySelector('.success-message');
        if (successMsg) {
          animate(successMsg, {
            scale: [0, 1],
            opacity: [0, 1],
            duration: 500,
            ease: 'out-elastic(1, 0.5)'
          });
        }
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error: error.message || 'Failed to send message. Please try again.',
      });
      
      // Error shake animation
      if (formRef.current) {
        animate(formRef.current, {
          translateX: [0, -10, 10, -10, 10, 0],
          duration: 500,
          ease: 'in-out-sine'
        });
      }
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'your.email@example.com',
      link: 'mailto:your.email@example.com',
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+1 (234) 567-8900',
      link: 'tel:+12345678900',
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'City, Country',
      link: null,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact | Your Name - Get In Touch</title>
        <meta name="description" content="Get in touch with me for collaboration opportunities, project inquiries, or just to say hello. I'm always open to discussing new projects." />
        <meta property="og:title" content="Contact | Your Name" />
        <meta property="og:description" content="Get in touch for collaboration opportunities" />
        <link rel="canonical" href="https://yourportfolio.com/contact" />
      </Helmet>

      <main className="contact">
        <div className="contact-container">
          {/* Page Header */}
          <motion.div
            className="page-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="gradient-text">Get In Touch</h1>
            <p className="page-subtitle">Let's work together on your next project</p>
          </motion.div>

          {/* Contact Content */}
          <div className="contact-content">
            {/* Contact Form */}
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="contact-form" ref={formRef}>
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className={`form-input ${formErrors.name ? 'error' : ''}`}
                    placeholder="Your name"
                  />
                  {formErrors.name && (
                    <span className="form-error">{formErrors.name}</span>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && (
                    <span className="form-error">{formErrors.email}</span>
                  )}
                </div>

                {/* Subject Field */}
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className={`form-input ${formErrors.subject ? 'error' : ''}`}
                    placeholder="What's this about?"
                  />
                  {formErrors.subject && (
                    <span className="form-error">{formErrors.subject}</span>
                  )}
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className={`form-textarea ${formErrors.message ? 'error' : ''}`}
                    placeholder="Your message..."
                    rows="6"
                  />
                  {formErrors.message && (
                    <span className="form-error">{formErrors.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  ref={submitButtonRef}
                  type="submit"
                  className="btn btn-primary btn-magnetic submit-btn"
                  disabled={formStatus.loading}
                >
                  {formStatus.loading ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success Message */}
                {formStatus.success && (
                  <motion.div
                    className="form-success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {/* Error Message */}
                {formStatus.error && (
                  <motion.div
                    className="form-error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✗ {formStatus.error}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="contact-info-container"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="contact-info-cards">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    className="contact-info-card glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="contact-info-icon">{info.icon}</div>
                    <h3>{info.label}</h3>
                    {info.link ? (
                      <a href={info.link} className="contact-info-value">
                        {info.value}
                      </a>
                    ) : (
                      <p className="contact-info-value">{info.value}</p>
                    )}
                  </motion.div>
                ))}

                {/* Availability Badge */}
                <motion.div
                  className="availability-badge glass-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="availability-indicator pulse"></div>
                  <div>
                    <h4>Currently Available</h4>
                    <p>Open for new opportunities</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
