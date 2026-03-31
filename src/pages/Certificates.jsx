import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Autoplay } from 'swiper/modules';
import { 
  FaCertificate, FaExternalLinkAlt, FaAward, FaMedal,
  FaGoogle, FaMicrosoft, FaAws, FaReact, FaCloud,
  FaJs, FaTrophy, FaUniversity, FaCode, FaGithub
} from 'react-icons/fa';
import { SiOracle, SiMongodb, SiNodedotjs } from 'react-icons/si';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import './Certificates.css';

/**
 * Certificates Page - Masonry Layout with Holographic Cards
 * Features: Filterable masonry grid, holographic effects, achievement stats
 */
const Certificates = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredCert, setHoveredCert] = useState(null);

  const categories = ['All', 'Certificates', 'Development', 'Cloud', 'Data Science', 'Events'];

  const certificates = [
    {
      id: 1,
      title: "HackTheWinter Participation Certificate",
  issuer: "DreamBuilders",
  date: "December 2025",
  description: "Participated in HackTheWinter organized by DreamBuilders, where we built the project 'Smart Emergency Blood Network'. The event provided hands-on experience in developing impactful real-world solutions while collaborating effectively in a team environment. This experience strengthened my problem-solving, innovation, and execution skills under time constraints.",
  skills: ["Full-Stack Development", "Team Collaboration", "Problem Solving", "Project Execution"],
  image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1772209053/Dhruv_Sonagra_DreamBuilders_certificate_page-0001_es78an.jpg",
  link: "https://www.linkedin.com/posts/dhruvvv23_hackthewinter-dreambuilders-smartemergencybloodnetwork-activity-7423229138368520192-7tHU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFFbQIEBNyvXKq2e2we3ieNXl2L1zznWXvo",
  category: "Certificates",
  icon: <FaCertificate />,
  color: "#FF9800",
  featured: true
    },
    {
      id: 2,
      title: "Generative AI & Machine Learning Certification",
      issuer: "EduSkills Foundation & AICTE (in collaboration with Google)",
      date: "October 2025",
      description: "Successfully completed the Generative AI & Machine Learning Certification through the Google & EduSkills Foundation Program (in collaboration with AICTE). Learned advanced concepts and practical techniques in generative AI and applied ML models. Grateful for the opportunity and excited to implement these skills in real-world projects and innovative solutions.",
      skills: ["Generative AI", "Machine Learning", "AI Applications", "Hands-On Implementation"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1772209397/1760348600191_qiuslz.jpg",
      link: "https://www.linkedin.com/posts/dhruvvv23_generativeai-ai-machinelearning-activity-7383437181127708672-_u7S?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFFbQIEBNyvXKq2e2we3ieNXl2L1zznWXvo",
      category: 'Certificates',
      icon: <FaCertificate />,
      color: '#673AB7',
      featured: true
    },
    {
      id: 3,
      title: "Google AI-ML Virtual Internship Completion",
      issuer: "EduSkills Foundation & AICTE (in collaboration with Google)",
      date: "September 2025",
      description: "Successfully completed the Google AI-ML Virtual Internship through EduSkills Foundation in collaboration with AICTE and the India Edu Program. Gained deep understanding of Artificial Intelligence and Machine Learning with hands-on exposure to real-world applications. Expressed gratitude to Google, EduSkills Foundation, AICTE, and India Edu Program team for this impactful learning experience. Looking forward to applying these skills in practical projects and meaningful innovations.",
      skills: ["Artificial Intelligence", "Machine Learning", "Hands-On Implementation", "Continuous Learning"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1772209028/1758695751122_dmf3nc.jpg",
      link: "https://www.linkedin.com/posts/dhruvvv23_i-am-excited-to-share-that-i-have-successfully-activity-7376504630484279297-9UwA?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFFbQIEBNyvXKq2e2we3ieNXl2L1zznWXvo",
      category: 'Certificates',
      icon: <FaCertificate />,
      color: '#2196F3',
      featured: true
    },
    {
      id: 4,
      title: "Hackathon 2025",
      issuer: "OdooXGujarat Vidhyapith",
      date: "April 2025",
      description: "Participated in a hackathon organized by OdooXGujarat Vidhyapith, showcasing skills in full-stack development.",
      skills: ["Full Stack Development", "Teamwork", "Problem Solving"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1747941112/IMG_6329_o5hsbv.jpg",
      link: "https://www.linkedin.com/posts/dhruvvv23_hackathonjourney-innovation-sustainablefarming-activity-7311297836082438145-4Ws0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFFbQIEBNyvXKq2e2we3ieNXl2L1zznWXvo",
      category: 'Events',
      icon: <FaTrophy />,
      color: '#FFD700',
      featured: true
    },
    {
      id: 5,
      title: "Tech Expo 2025",
      issuer: "Rai University",
      date: "February 2025",
      description: "Participated in a tech expo organized by Rai University, showcasing skills in frontend development.",
      skills: ["Frontend Development", "Teamwork", "Problem Solving"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1747941112/IMG_5893_efxrm2.jpg",
      link: "https://www.linkedin.com/posts/dhruvvv23_techexpo-cse-eventura-activity-7302664635332050944-pF9H?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFFbQIEBNyvXKq2e2we3ieNXl2L1zznWXvo",
      category: 'Events',
      icon: <FaUniversity />,
      color: '#4CAF50',
      featured: true
    },
    {
      id: 6,
      title: "Microsoft PowerBi and Fundamentals",
      issuer: "Rai University",
      date: "April 2025",
      description: "Completed a comprehensive program on Microsoft PowerBi and fundamentals, enhancing data visualization and analysis skills.",
      skills: ["PowerBi", "Data Visualization", "Data Analysis"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1748803319/DHRUV_SONAGRA-1_page-0001_q383yt.jpg",
      link: "https://www.linkedin.com/posts/dhruvvv23_microsoftpowerbi-dataanalysis-activity-7302664635332050944-pF9H?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFFbQIEBNyvXKq2e2we3ieNXl2L1zznWXvo",
      category: 'Data Science',
      icon: <FaMicrosoft />,
      color: '#F2C811',
      featured: false
    },
    {
      id: 7,
      title: "Azure Fundamentals",
      issuer: "Rai University",
      date: "April 2025",
      description: "Completed a comprehensive program on Azure Fundamentals, enhancing cloud computing skills.",
      skills: ["Azure", "Cloud Computing", "Data Management"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1748803319/DHRUV_SONAGRA_page-0001_yfs115.jpg",
      link: "https://simpli-web.app.link/e/pMTJ2cIiATb",
      category: 'Cloud',
      icon: <FaMicrosoft />,
      color: '#0078D4',
      featured: false
    },
    {
      id: 8,
      title: "Introduction to the Basics of Azure Services",
      issuer: "Simplilearn",
      date: "May 2025",
      description: "Comprehensive program covering modern cloud computing concepts and Azure services overview.",
      skills: ["Cloud Computing", "Azure Services"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1747940426/8374205_87113191747897516884_page-0001_rtjmn1.jpg",
      link: "https://simpli-web.app.link/e/pMTJ2cIiATb",
      category: 'Cloud',
      icon: <FaCloud />,
      color: '#0078D4',
      featured: false
    },
    {
      id: 9,
      title: "Node.js (Basic)",
      issuer: "Hackerrank",
      date: "May 2025",
      description: "Validated fundamental knowledge of Node.js concepts including modules, file system, and event loop.",
      skills: ["JavaScript", "Node.js", "Server-side"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1747812857/nodejs_basic_certificate_page-0001_swygmm.jpg",
      link: "https://www.hackerrank.com/certificates/edf3c23f04f1",
      category: 'Development',
      icon: <SiNodedotjs />,
      color: '#339933',
      featured: false
    },
    {
      id: 10,
      title: "React (Basic)",
      issuer: "Hackerrank",
      date: "May 2025",
      description: "Focused on user-centered design principles, component lifecycle, props, and state management.",
      skills: ["React", "JavaScript", "Frontend"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1747812859/react_basic_certificate_page-0001_ebuadr.jpg",
      link: "https://www.hackerrank.com/certificates/29f04f97089f",
      category: 'Development',
      icon: <FaReact />,
      color: '#61DAFB',
      featured: true
    },
    {
      id: 11,
      title: "Javascript (Basic)",
      issuer: "Hackerrank",
      date: "May 2025",
      description: "Validated understanding of JavaScript syntax, data types, control flow, and functions.",
      skills: ["JavaScript", "Programming"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1747812945/javascript_basic_certificate_page-0001_ri3xhc.jpg",
      link: "https://www.hackerrank.com/certificates/a3b280e1ad5b",
      category: 'Development',
      icon: <FaJs />,
      color: '#F7DF1E',
      featured: false
    },
    {
      id: 12,
      title: "Problem Solving (Basic)",
      issuer: "Hackerrank",
      date: "May 2025",
      description: "Introduction to problem-solving techniques, algorithms, and data structures.",
      skills: ["Algorithms", "Data Structures", "Logic"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1747813135/problem_solving_basic_certificate_page-0001_bpwwbx.jpg",
      link: "https://www.hackerrank.com/certificates/62a8fed5cb66",
      category: 'Development',
      icon: <FaCode />,
      color: '#2EC866',
      featured: false
    },
    {
      id: 13,
      title: "Frontend Development (Basic)",
      issuer: "Hackerrank",
      date: "May 2025",
      description: "Introduction to frontend development, covering HTML, CSS, and JavaScript basics.",
      skills: ["HTML", "CSS", "Frontend"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1747813135/frontend_developer_react_certificate_page-0001_x9yc1m.jpg",
      link: "https://www.hackerrank.com/certificates/6f6e8a824ad7",
      category: 'Development',
      icon: <FaCode />,
      color: '#E34F26',
      featured: false
    },
    {
      id: 14,
      title: "Github Copilot Fundamentals",
      issuer: "Simplilearn",
      date: "May 2025",
      description: "Introduction to GitHub Copilot, covering its features, usage, and AI-assisted coding best practices.",
      skills: ["GitHub", "Copilot", "AI Tools"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1747854428/Screenshot_2025-05-22_003626_bgbeec.png",
      link: "https://simpli-web.app.link/e/b81icFwByTb",
      category: 'Development',
      icon: <FaGithub />,
      color: '#181717',
      featured: true
    },
    {
      id: 15,
      title: "Problem Solving (Intermediate)",
      issuer: "Hackerrank",
      date: "May 2025",
      description: "Intermediate problem-solving techniques, focusing on complex algorithms and optimized solutions.",
      skills: ["Advanced Algorithms", "Data Structures"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1748157142/problem_solving_intermediate_certificate_page-0001_h72tfw.jpg",
      link: "https://www.hackerrank.com/certificates/598165441562",
      category: 'Development',
      icon: <FaCode />,
      color: '#2EC866',
      featured: true
    },
    {
      id: 16,
      title: "Javascript (Intermediate)",
      issuer: "Hackerrank",
      date: "June 2025",
      description: "Intermediate JavaScript concepts, including ES6 features, asynchronous programming, and closures.",
      skills: ["JavaScript", "ES6", "Async/Await"],
      image: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1748763239/javascript_intermediate_certificate_page-0001_a3jxf3.jpg",
      link: "https://www.hackerrank.com/certificates/e9dc1c182019",
      category: 'Development',
      icon: <FaJs />,
      color: '#F7DF1E',
      featured: true
    }
  ];

  const filteredCerts = activeFilter === 'All' 
    ? certificates 
    : certificates.filter(c => c.category === activeFilter);

  const featuredCerts = certificates.filter(c => c.featured);

  const stats = [
    { label: 'Total Certificates', value: certificates.length },
    { label: 'Featured', value: featuredCerts.length },
    { label: 'Categories', value: categories.length - 1 }
  ];

  return (
    <>
      <Helmet>
        <title>Certificates | Dhruv Sonagra</title>
        <meta name="description" content="View my professional certifications from AWS, Google, Meta, Microsoft, and more." />
        <link rel="canonical" href="https://dhruvsonagra.me/certificates" />
        <meta property="og:url" content="https://dhruvsonagra.me/certificates" />
      </Helmet>

      <div className="certificates" style={{ paddingTop: '120px' }}>
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
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              color: '#f43f5e',
              marginBottom: '1.5rem'
            }}>
              <FaCertificate style={{ marginRight: '0.5rem', display: 'inline' }} />
              Achievements
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              Professional{' '}
              <span style={{
                background: 'linear-gradient(90deg, #f43f5e, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Certifications
              </span>
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#94a3b8',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Continuous learning and professional development through industry-recognized certifications
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container" style={{ marginBottom: '4rem' }}>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card"
              >
                <div className="stat-value">
                  {stat.value}
                </div>
                <div className="stat-label">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Certificates Carousel */}
        <section className="container" style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '2rem', textAlign: 'center' }}
          >
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              Featured <span style={{
                background: 'linear-gradient(90deg, #f43f5e, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Achievements</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
              Swipe to explore my most recent certifications
            </p>
          </motion.div>

          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Pagination, Autoplay]}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="featured-certs-swiper"
            style={{
              maxWidth: '400px',
              margin: '0 auto',
              paddingBottom: '3rem'
            }}
          >
            {featuredCerts.map((cert) => (
              <SwiperSlide key={cert.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '500px',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    background: 'linear-gradient(145deg, rgba(20, 29, 51, 0.9) 0%, rgba(10, 14, 26, 0.95) 100%)',
                    border: `2px solid ${cert.color}`,
                    boxShadow: `0 20px 60px ${cert.color}40`
                  }}
                >
                  <div style={{
                    height: '60%',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img
                      src={cert.image}
                      alt={cert.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: cert.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: '#fff',
                      boxShadow: `0 0 20px ${cert.color}80`
                    }}>
                      {cert.icon}
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{
                      fontSize: '0.75rem',
                      color: cert.color,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '0.5rem'
                    }}>
                      {cert.issuer} • {cert.date}
                    </div>
                    
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '0.75rem',
                      lineHeight: 1.3
                    }}>
                      {cert.title}
                    </h3>
                    
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#94a3b8',
                      lineHeight: 1.6,
                      marginBottom: '1rem'
                    }}>
                      {cert.description.slice(0, 80)}...
                    </p>
                    
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: cert.color,
                        color: '#fff',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <FaExternalLinkAlt />
                      View Certificate
                    </a>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Filter */}
        <section className="container" style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
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
                    ? 'linear-gradient(90deg, #f43f5e, #8b5cf6)' 
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
        </section>

        {/* Certificates Masonry Grid */}
        <section className="container" style={{ marginBottom: '6rem' }}>
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredCerts.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredCert(cert.id)}
                  onMouseLeave={() => setHoveredCert(null)}
                  style={{
                    position: 'relative',
                    background: 'linear-gradient(145deg, rgba(20, 29, 51, 0.6) 0%, rgba(10, 14, 26, 0.8) 100%)',
                    border: `1px solid ${hoveredCert === cert.id ? cert.color : 'rgba(255, 255, 255, 0.05)'}`,
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    gridRow: cert.featured ? 'span 2' : 'span 1'
                  }}
                >
                  {/* Holographic Effect */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: hoveredCert === cert.id 
                      ? `linear-gradient(135deg, ${cert.color}10 0%, transparent 50%, ${cert.color}05 100%)`
                      : 'transparent',
                    transition: 'all 0.3s ease',
                    pointerEvents: 'none'
                  }} />

                  {/* Shine Effect */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '50%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                      pointerEvents: 'none'
                    }}
                    animate={hoveredCert === cert.id ? { left: '150%' } : { left: '-100%' }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Certificate Image */}
                  <div style={{
                    width: '100%',
                    height: '180px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 60%, rgba(10, 14, 26, 0.8) 100%)'
                    }} />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem', position: 'relative', zIndex: 1 }}>
                    {/* Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${cert.color}15`,
                        borderRadius: '12px',
                        fontSize: '1.75rem',
                        color: cert.color
                      }}>
                        {cert.icon}
                      </div>
                      {cert.featured && (
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          background: 'rgba(244, 63, 94, 0.2)',
                          border: '1px solid rgba(244, 63, 94, 0.3)',
                          borderRadius: '9999px',
                          fontSize: '0.625rem',
                          color: '#f43f5e',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title & Issuer */}
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      lineHeight: 1.4
                    }}>
                      {cert.title}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: cert.color,
                      marginBottom: '0.75rem'
                    }}>
                      {cert.issuer}
                    </p>

                    {/* Description */}
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      lineHeight: 1.6,
                      marginBottom: '1rem'
                    }}>
                      {cert.description}
                    </p>

                    {/* Skills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      {cert.skills.map((skill, i) => (
                        <span key={i} style={{
                          fontSize: '0.75rem',
                          color: '#94a3b8',
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#64748b'
                      }}>
                        {cert.date}
                      </span>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          fontSize: '0.75rem',
                          color: cert.color,
                          transition: 'opacity 0.3s ease'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Verify <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container" style={{ paddingBottom: '6rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: '3rem',
              background: 'linear-gradient(145deg, rgba(20, 29, 51, 0.4) 0%, rgba(10, 14, 26, 0.6) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '1.5rem',
              textAlign: 'center'
            }}
          >
            <FaAward style={{
              fontSize: '3rem',
              color: '#f43f5e',
              marginBottom: '1rem'
            }} />
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '0.75rem'
            }}>
              Always Learning
            </h3>
            <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              Currently pursuing advanced certifications in Machine Learning and Cloud Architecture.
              Check back soon for updates!
            </p>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Certificates;
