import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaExternalLinkAlt, FaTimes, FaAward, FaCalendar } from 'react-icons/fa';
import { animate } from 'animejs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Certificates.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Certificates Page Component
 * Premium 3D flip cards with Anime.js animations
 * Features: Interactive flip cards, modal viewer, GSAP reveals
 */
const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const gridRef = useRef(null);

  const certificates = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'January 2024',
      description: 'Professional certification for designing distributed systems on AWS',
      image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=AWS+Certified',
      link: 'https://www.credly.com/badges/example',
      skills: ['AWS', 'Cloud', 'EC2', 'S3', 'Lambda'],
      backContent: 'Demonstrated expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.'
    },
    {
      id: 2,
      title: 'Meta Front-End Developer',
      issuer: 'Meta (Facebook)',
      date: 'December 2023',
      description: 'Professional certificate in modern front-end development',
      image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Meta+Certified',
      link: 'https://www.coursera.org/account/accomplishments/example',
      skills: ['React', 'JavaScript', 'CSS', 'HTML5'],
      backContent: 'Comprehensive training in React, responsive design, and modern JavaScript frameworks.'
    },
    {
      id: 3,
      title: 'Google Cloud Professional',
      issuer: 'Google Cloud',
      date: 'November 2023',
      description: 'Cloud architecture and engineering certification',
      image: 'https://via.placeholder.com/400x300/f093fb/ffffff?text=GCP+Certified',
      link: 'https://www.credential.net/example',
      skills: ['GCP', 'Kubernetes', 'Cloud Run', 'BigQuery'],
      backContent: 'Expertise in designing and managing robust, secure, scalable cloud solutions on Google Cloud Platform.'
    },
    {
      id: 4,
      title: 'MongoDB Developer Certification',
      issuer: 'MongoDB University',
      date: 'October 2023',
      description: 'Advanced MongoDB database development and optimization',
      image: 'https://via.placeholder.com/400x300/4facfe/ffffff?text=MongoDB',
      link: 'https://university.mongodb.com/certification/example',
      skills: ['MongoDB', 'NoSQL', 'Aggregation', 'Indexing'],
      backContent: 'Proficiency in MongoDB CRUD operations, aggregation framework, and performance optimization techniques.'
    },
    {
      id: 5,
      title: 'React Advanced Patterns',
      issuer: 'Frontend Masters',
      date: 'September 2023',
      description: 'Advanced React patterns and performance optimization',
      image: 'https://via.placeholder.com/400x300/00f2fe/ffffff?text=React+Advanced',
      link: 'https://frontendmasters.com/certificates/example',
      skills: ['React', 'Hooks', 'Context', 'Performance'],
      backContent: 'Mastery of advanced React patterns including render props, HOCs, compound components, and performance optimization.'
    },
    {
      id: 6,
      title: 'Node.js Application Development',
      issuer: 'Linux Foundation',
      date: 'August 2023',
      description: 'Professional Node.js development and best practices',
      image: 'https://via.placeholder.com/400x300/f5576c/ffffff?text=Node.js',
      link: 'https://training.linuxfoundation.org/certification/example',
      skills: ['Node.js', 'Express', 'REST API', 'Async'],
      backContent: 'Professional-level Node.js development skills including async patterns, streams, and production deployment.'
    },
  ];

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.flip-card');
    
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { 
          opacity: 0, 
          y: 80,
          rotationX: -15
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.1
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Anime.js flip animation handler
  const handleCardFlip = (id) => {
    const isFlipped = flippedCards[id];
    
    animate(`#cert-${id} .flip-card-inner`, {
      rotateY: isFlipped ? 0 : 180,
      duration: 600,
      ease: 'in-out-sine',
    });

    setFlippedCards(prev => ({
      ...prev,
      [id]: !isFlipped
    }));
  };

  const openModal = (cert) => {
    setSelectedCert(cert);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  return (
    <>
      <Helmet>
        <title>Certificates | Your Name - Professional Certifications</title>
        <meta name="description" content="View my professional certifications in web development, cloud computing, and software engineering from leading technology companies." />
        <meta property="og:title" content="Certificates | Your Name" />
        <meta property="og:description" content="Professional certifications in web development and cloud computing" />
        <link rel="canonical" href="https://yourportfolio.com/certificates" />
      </Helmet>

      <main className="certificates">
        <div className="certificates-container">
          {/* Page Header */}
          <motion.div
            className="page-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="gradient-text">Certificates</h1>
            <p className="page-subtitle">Professional certifications and achievements</p>
          </motion.div>

          {/* 3D Flip Cards Grid */}
          <div className="certificates-grid" ref={gridRef}>
            {certificates.map((cert) => (
              <div
                key={cert.id}
                id={`cert-${cert.id}`}
                className="flip-card"
                onClick={() => handleCardFlip(cert.id)}
              >
                <div className="flip-card-inner">
                  {/* Front Face */}
                  <div className="flip-card-front glass-card">
                    <div className="cert-front-image">
                      <img src={cert.image} alt={cert.title} loading="lazy" />
                      <div className="cert-overlay">
                        <FaAward className="award-icon" />
                      </div>
                    </div>
                    <div className="cert-front-info">
                      <h3 className="cert-title">{cert.title}</h3>
                      <p className="cert-issuer">{cert.issuer}</p>
                      <div className="cert-date">
                        <FaCalendar />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                    <div className="flip-hint">Click to flip</div>
                  </div>

                  {/* Back Face */}
                  <div className="flip-card-back glass-card">
                    <div className="cert-back-content">
                      <h4>About This Certification</h4>
                      <p className="back-description">{cert.backContent}</p>
                      
                      <div className="cert-skills">
                        <h5>Skills Covered:</h5>
                        <div className="skill-badges">
                          {cert.skills.map((skill, idx) => (
                            <span key={idx} className="skill-badge">{skill}</span>
                          ))}
                        </div>
                      </div>

                      <div className="cert-actions">
                        <button
                          className="btn-view-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(cert);
                          }}
                        >
                          <FaExternalLinkAlt />
                          View Full Certificate
                        </button>
                      </div>
                    </div>
                    <div className="flip-hint">Click to flip back</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Modal Viewer */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              className="cert-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="cert-modal-content"
                initial={{ scale: 0.8, opacity: 0, rotateX: -20 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={closeModal}>
                  <FaTimes />
                </button>
                
                <div className="modal-header">
                  <h2>{selectedCert.title}</h2>
                  <p className="modal-issuer">{selectedCert.issuer}</p>
                </div>

                <div className="modal-image">
                  <img src={selectedCert.image} alt={selectedCert.title} />
                </div>

                <div className="modal-details">
                  <div className="detail-row">
                    <FaCalendar />
                    <span><strong>Issued:</strong> {selectedCert.date}</span>
                  </div>
                  <p className="modal-description">{selectedCert.description}</p>
                  
                  <div className="modal-skills">
                    <h4>Skills & Technologies:</h4>
                    <div className="skill-badges">
                      {selectedCert.skills.map((skill, idx) => (
                        <span key={idx} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verify-link"
                  >
                    <FaExternalLinkAlt />
                    Verify Certificate
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Certificates;
