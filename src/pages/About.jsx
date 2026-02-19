import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaCode,
  FaYoutube
} from 'react-icons/fa';
import './About.css';

/**
 * About Page - Simple Profile with Social Links
 * Features: Profile picture, description, resume download, social cards
 */
const About = () => {
  const socialLinks = [
    { 
      icon: <FaGithub />, 
      url: 'https://github.com/dhruv2311-dot', 
      label: 'GitHub', 
      color: '#333',
      description: 'Check out my code'
    },
    { 
      icon: <FaLinkedin />, 
      url: 'https://www.linkedin.com/in/dhruv-sonagra-995144321/', 
      label: 'LinkedIn', 
      color: '#0077b5',
      description: 'Connect professionally'
    },
    { 
      icon: <FaTwitter />, 
      url: 'https://x.com/dhruvvv_23_', 
      label: 'Twitter', 
      color: '#1da1f2',
      description: 'Follow my thoughts'
    },

    { 
      icon: <FaInstagram />, 
      url: 'https://www.instagram.com/dhruvvv_23_/', 
      label: 'Instagram', 
      color: '#e4405f',
      description: 'See my life'
    },
    {
      icon: <FaCode />,
      url: 'https://leetcode.com/u/dhruvvv_23/', 
      label: 'LeetCode',
      color: '#ffa116',
      description: 'Problem solving'
    },
    {
      icon: <FaYoutube />,
      url: 'https://www.youtube.com/@Itz_dhruvv', 
      label: 'YouTube',
      color: '#ff0000',
      description: 'Tech tutorials'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About | Dhruv Sonagra</title>
        <meta name="description" content="Learn about my journey as a Full-Stack Developer and connect with me." />
      </Helmet>

      <main className="about" style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <div className="container">
          {/* Profile Section */}
          <section style={{ marginBottom: '4rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '4rem',
              alignItems: 'center'
            }}>
              {/* Profile Picture */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid rgba(0, 212, 255, 0.3)',
                  boxShadow: '0 0 60px rgba(0, 212, 255, 0.2)'
                }}>
                  <img
                    src="https://res.cloudinary.com/dtkzxbcjx/image/upload/v1770642896/IMG_1208_uxkdnq.png"
                    alt="Dhruv Sonagra"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 25%'
                    }}
                  />
                </div>
                {/* Decorative ring */}
                <div style={{
                  position: 'absolute',
                  inset: '-10px',
                  border: '2px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '50%',
                  animation: 'spin 20s linear infinite'
                }} />
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
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
                  About Me
                </span>

                <h1 style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  marginBottom: '1.5rem'
                }}>
                  Hi, I'm{' '}
                  <span style={{
                    background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Dhruv Sonagra
                  </span>
                </h1>

                <p style={{
                  fontSize: '1.125rem',
                  color: '#94a3b8',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem'
                }}>
                  I'm a passionate Full-Stack Developer with a strong foundation in both frontend and backend technologies. My journey in web development started with a curiosity about how things work on the internet, and it has evolved into a professional pursuit of creating elegant, efficient, and user-friendly applications.
                </p>

                <p style={{
                  fontSize: '1.125rem',
                  color: '#94a3b8',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem'
                }}>
                  My technical interests include:
                </p>

                <ul style={{
                  listStyle: 'disc',
                  paddingLeft: '1.5rem',
                  marginBottom: '1.5rem',
                  color: '#94a3b8',
                  fontSize: '1.125rem',
                  lineHeight: 1.8
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>Building scalable web applications</li>
                  <li style={{ marginBottom: '0.5rem' }}>Creating intuitive user interfaces</li>
                  <li style={{ marginBottom: '0.5rem' }}>Optimizing application performance</li>
                  <li style={{ marginBottom: '0.5rem' }}>Learning new technologies and frameworks</li>
                </ul>

                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.7,
                  marginBottom: '2rem'
                }}>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical blog posts.
                </p>

                {/* Download Resume Button */}
                <motion.a
                  href="https://drive.google.com/file/d/1FjF18VC8QK7bAad8wifswbDqiojUBKXe/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary magnetic"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload />
                  Download Resume
                </motion.a>
              </motion.div>
            </div>
          </section>

          {/* Social Cards Section */}
          <section style={{ paddingBottom: '6rem' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                textAlign: 'center',
                marginBottom: '2rem'
              }}
            >
              Let's Connect
            </motion.h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  style={{
                    padding: '2rem',
                    background: 'linear-gradient(145deg, rgba(20, 29, 51, 0.6) 0%, rgba(10, 14, 26, 0.8) 100%)',
                    border: `1px solid ${social.color}30`,
                    borderRadius: '1rem',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${social.color}15`,
                    borderRadius: '50%',
                    fontSize: '1.75rem',
                    color: social.color,
                    margin: '0 auto 1rem'
                  }}>
                    {social.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    color: '#fff'
                  }}>
                    {social.label}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#64748b'
                  }}>
                    {social.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default About;
