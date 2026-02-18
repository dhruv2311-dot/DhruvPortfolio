import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from 'react-icons/fa';
import { gsap } from 'gsap';
import Matter from 'matter-js';
import useMagneticButton from '../hooks/useMagneticButton';
import './About.css';

/**
 * About Page Component with Matter.js Physics
 * Features: Physics-based floating profile image, interactive floating bubbles, animated stats
 */
const About = () => {
  const downloadButtonRef = useMagneticButton(0.4);
  const statsRef = useRef(null);
  const physicsCanvasRef = useRef(null);
  const physicsEngineRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/yourusername',
      color: '#333',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://linkedin.com/in/yourusername',
      color: '#0077b5',
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: 'https://twitter.com/yourusername',
      color: '#1da1f2',
    },
  ];

  // Matter.js Physics Engine Setup
  useEffect(() => {
    if (!physicsCanvasRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 0.3, scale: 0.001 }
    });
    physicsEngineRef.current = engine;

    // Create renderer
    const render = Render.create({
      canvas: physicsCanvasRef.current,
      engine: engine,
      options: {
        width: 400,
        height: 500,
        wireframes: false,
        background: 'transparent'
      }
    });

    // Create boundaries (invisible walls)
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(200, 510, 400, 20, wallOptions);
    const leftWall = Bodies.rectangle(-10, 250, 20, 500, wallOptions);
    const rightWall = Bodies.rectangle(410, 250, 20, 500, wallOptions);
    const ceiling = Bodies.rectangle(200, -10, 400, 20, wallOptions);

    // Create decorative floating bubbles
    const bubbles = [];
    const bubbleColors = [
      '#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b'
    ];
    
    // Create multiple small bubbles
    for (let i = 0; i < 12; i++) {
      const x = 60 + Math.random() * 280;
      const y = 50 + Math.random() * 400;
      const radius = 15 + Math.random() * 20;
      const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
      
      const bubble = Bodies.circle(x, y, radius, {
        restitution: 0.9,
        friction: 0.001,
        density: 0.0008,
        render: {
          fillStyle: color + '15',
          strokeStyle: color,
          lineWidth: 2
        }
      });
      bubbles.push(bubble);
    }

    // Add profile image as physics body (larger circle in center)
    const profileBody = Bodies.circle(200, 200, 65, {
      restitution: 0.95,
      friction: 0.005,
      density: 0.003,
      render: {
        fillStyle: '#667eea30',
        strokeStyle: '#667eea',
        lineWidth: 4
      },
      isProfile: true
    });
    bubbles.push(profileBody);

    // Add all bodies to world
    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling, ...bubbles]);

    // Mouse constraint for interactions
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(engine.world, mouseConstraint);

    // Track mouse position for custom rendering
    Events.on(mouseConstraint, 'mousemove', (event) => {
      const { x, y } = event.mouse.position;
      setMousePosition({ x, y });
    });

    // Apply random forces periodically for floating effect
    const applyFloatingForces = () => {
      bubbles.forEach(bubble => {
        const forceMagnitude = 0.0002;
        Matter.Body.applyForce(bubble, bubble.position, {
          x: (Math.random() - 0.5) * forceMagnitude,
          y: (Math.random() - 0.5) * forceMagnitude
        });
      });
    };

    const forceInterval = setInterval(applyFloatingForces, 100);

    // Run engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Cleanup
    return () => {
      clearInterval(forceInterval);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  // Animate stats counters with GSAP
  useEffect(() => {
    // Animate stats counters
    if (statsRef.current) {
      const statNumbers = statsRef.current.querySelectorAll('.stat-number');
      statNumbers.forEach((stat, index) => {
        const targetValue = parseInt(stat.getAttribute('data-value'));
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2,
            delay: index * 0.2,
            snap: { innerText: 1 },
          }
        );
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>About | Your Name - Full-Stack Developer</title>
        <meta name="description" content="Learn more about my journey as a full-stack developer, my skills, and my passion for creating innovative web solutions." />
        <meta property="og:title" content="About | Your Name" />
        <meta property="og:description" content="Learn more about my journey as a full-stack developer" />
        <link rel="canonical" href="https://yourportfolio.com/about" />
      </Helmet>

      <main className="about">
        <div className="about-container">
          {/* Page Header */}
          <motion.div
            className="page-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="gradient-text">About Me</h1>
            <p className="page-subtitle">Get to know me better</p>
          </motion.div>

          {/* About Content */}
          <div className="about-content">
            {/* Physics Profile Section */}
            <div className="about-profile">
              <motion.div 
                className="physics-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <canvas ref={physicsCanvasRef} className="physics-canvas" />
                
                {/* Overlay profile image on physics body */}
                <div className="profile-image-wrapper">
                  <div className="profile-image">
                    <img
                      src="https://via.placeholder.com/130x130/667eea/ffffff?text=You"
                      alt="Your Name - Full-Stack Developer"
                      loading="lazy"
                    />
                    <div className="profile-glow"></div>
                  </div>
                </div>

                {/* Physics interaction hint */}
                <div className="physics-hint">
                  <p>Drag and interact with the bubbles!</p>
                </div>
              </motion.div>

              {/* Stats */}
              <div ref={statsRef} className="about-stats">
                <motion.div 
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="stat-number gradient-text" data-value="50">0+</h3>
                  <p className="stat-label">Projects</p>
                </motion.div>
                <motion.div 
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="stat-number gradient-text" data-value="3">0+</h3>
                  <p className="stat-label">Years Experience</p>
                </motion.div>
                <motion.div 
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h3 className="stat-number gradient-text" data-value="15">0+</h3>
                  <p className="stat-label">Certificates</p>
                </motion.div>
              </div>
            </div>

            {/* Bio Section */}
            <motion.div 
              className="about-bio"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2>My Journey</h2>
              <p>
                I'm a passionate full-stack developer with a love for creating elegant solutions
                to complex problems. My journey in web development started with a curiosity about
                how websites work, and it has evolved into a career dedicated to building
                exceptional digital experiences.
              </p>
              <p>
                With expertise in modern web technologies including React, Node.js, and cloud
                platforms, I specialize in creating scalable, performant applications that
                deliver real value to users. I believe in writing clean, maintainable code and
                following best practices to ensure long-term project success.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to
                open-source projects, or sharing my knowledge through technical writing and
                mentoring.
              </p>

              {/* Resume Download */}
              <button ref={downloadButtonRef} className="btn btn-primary btn-magnetic download-btn">
                <FaDownload />
                Download Resume
              </button>
            </motion.div>
          </div>

          {/* Social Cards */}
          <div className="social-cards">
            <h2 className="section-title">Let's Connect</h2>
            <div className="social-cards-grid">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="social-card-icon" style={{ color: social.color }}>
                    {social.icon}
                  </div>
                  <h3>{social.name}</h3>
                  <p>Follow me on {social.name}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
