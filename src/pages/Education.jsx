import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Education.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Education Page Component
 * Animated vertical timeline of educational background
 * Features: SVG path drawing animation, scroll-triggered reveals
 */
const Education = () => {
  const timelineRef = useRef(null);
  const svgPathRef = useRef(null);

  const education = [
    {
      id: 1,
      degree: 'Bachelor of Science in Computer Science',
      university: 'University Name',
      duration: '2018 - 2022',
      highlights: [
        'GPA: 3.8/4.0',
        'Dean\'s List all semesters',
        'President of Computer Science Club',
        'Research in Machine Learning and AI',
      ],
    },
    {
      id: 2,
      degree: 'Full-Stack Web Development Bootcamp',
      university: 'Coding Academy',
      duration: '2022',
      highlights: [
        'Intensive 12-week program',
        'Built 10+ full-stack applications',
        'Learned MERN stack and modern frameworks',
        'Graduated with honors',
      ],
    },
    {
      id: 3,
      degree: 'AWS Solutions Architect Certification',
      university: 'Amazon Web Services',
      duration: '2023',
      highlights: [
        'Cloud architecture and design',
        'Serverless computing',
        'Database and storage solutions',
        'Security and compliance',
      ],
    },
  ];

  useEffect(() => {
    // Animate SVG path drawing using stroke-dasharray technique
    if (svgPathRef.current) {
      const pathLength = svgPathRef.current.getTotalLength();
      
      // Set initial dash array
      gsap.set(svgPathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
      
      // Animate the drawing
      gsap.to(svgPathRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      // Animate dots appearing
      const dots = document.querySelectorAll('.timeline-dot');
      dots.forEach((dot, index) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    // Animate timeline items
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Education | Your Name - Academic Background</title>
        <meta name="description" content="Explore my educational background including degrees, certifications, and academic achievements in computer science and web development." />
        <meta property="og:title" content="Education | Your Name" />
        <meta property="og:description" content="Academic background and educational achievements" />
        <link rel="canonical" href="https://yourportfolio.com/education" />
      </Helmet>

      <main className="education">
        <div className="education-container">
          {/* Page Header */}
          <motion.div
            className="page-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="gradient-text">Education</h1>
            <p className="page-subtitle">My academic journey</p>
          </motion.div>

          {/* Timeline */}
          <div ref={timelineRef} className="timeline">
            {/* Timeline SVG Path */}
            <svg className="timeline-svg" viewBox="0 0 4 800" preserveAspectRatio="none">
              <path
                ref={svgPathRef}
                d="M 2 0 L 2 800"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="50%" stopColor="#764ba2" />
                  <stop offset="100%" stopColor="#f093fb" />
                </linearGradient>
              </defs>
            </svg>

            {/* Timeline Items */}
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              >
                {/* Timeline Dot */}
                <div className="timeline-dot">
                  <div className="timeline-dot-inner"></div>
                </div>

                {/* Timeline Content */}
                <div className="timeline-content glass-card">
                  <span className="timeline-duration badge badge-primary">
                    {edu.duration}
                  </span>
                  <h3 className="timeline-degree">{edu.degree}</h3>
                  <p className="timeline-university">{edu.university}</p>
                  
                  <ul className="timeline-highlights">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Education;
