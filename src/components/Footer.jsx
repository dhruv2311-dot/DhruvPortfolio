import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaInstagram,
  FaHeart, FaArrowUp
} from 'react-icons/fa';
import './Footer.css';

/**
 * Footer Component
 * Professional footer with navigation, social links, and back to top
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Skills', path: '/skills' },
      { label: 'Projects', path: '/projects' }
    ],
    resources: [
      { label: 'Certificates', path: '/certificates' },
      { label: 'Education', path: '/education' },
      { label: 'Contact', path: '/contact' },
      { label: 'Resume', path: '/resume.pdf' }
    ]
  };

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      position: 'relative',
      zIndex: 10,
      background: 'linear-gradient(180deg, transparent 0%, rgba(10, 14, 26, 0.8) 100%)',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '4rem 0 2rem'
    }}>
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <Link to="/" style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <span style={{ 
                width: '10px', 
                height: '10px', 
                background: '#00d4ff', 
                borderRadius: '50%' 
              }} />
              DS
            </Link>
            <p style={{
              color: '#64748b',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              maxWidth: '300px'
            }}>
              Full-Stack Developer crafting digital experiences with modern technologies. 
              Let's build something amazing together.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic"
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#94a3b8',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    borderColor: '#00d4ff',
                    color: '#00d4ff',
                    scale: 1.1
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#fff',
              marginBottom: '1.25rem'
            }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    style={{
                      color: '#64748b',
                      fontSize: '0.875rem',
                      transition: 'color 0.3s ease'
                    }}
                    className="hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#fff',
              marginBottom: '1.25rem'
            }}>
              Resources
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path}
                    style={{
                      color: '#64748b',
                      fontSize: '0.875rem',
                      transition: 'color 0.3s ease'
                    }}
                    className="hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#fff',
              marginBottom: '1.25rem'
            }}>
              Get In Touch
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <a 
                  href="mailto:dhruv.sonagra@example.com"
                  style={{
                    color: '#64748b',
                    fontSize: '0.875rem',
                    transition: 'color 0.3s ease'
                  }}
                >
                  dhruv.sonagra@example.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919876543210"
                  style={{
                    color: '#64748b',
                    fontSize: '0.875rem',
                    transition: 'color 0.3s ease'
                  }}
                >
                  +91 98765 43210
                </a>
              </li>
              <li style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p style={{
            fontSize: '0.875rem',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            © {currentYear} Dhruv Sonagra. Made with 
            <FaHeart style={{ color: '#f43f5e', fontSize: '0.75rem' }} /> 
            and lots of coffee
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="magnetic"
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'transparent',
              color: '#94a3b8',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            whileHover={{
              borderColor: '#00d4ff',
              color: '#00d4ff',
              scale: 1.1
            }}
            aria-label="Back to top"
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
