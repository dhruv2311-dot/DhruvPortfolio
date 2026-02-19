import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FaGraduationCap, FaUniversity, FaCalendarAlt, 
  FaAward, FaBook, FaCode
} from 'react-icons/fa';
import './Education.css';

/**
 * Education Page - Academic Background & Courses
 * Features: Timeline layout, course cards, achievement highlights
 */
const Education = () => {
  const education = [
    {
      id: 1,
      degree: "Computer Science",
      institution: "Rai University",
      location: "Dholka, Ahmedabad, India",
      startDate: "Aug 2024",
      endDate: "Aug 2028",
      highlights: [
        "Strong foundation in both Frontend and Backend Web Development",
        "Proficient in full-stack development with hands-on experience in HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB",
        "Skilled in basic problem solving, UI/UX design, and database management",
        "Secured 9.62 CGPA in the first semester",
        "Actively learning advanced web technologies and software engineering principles"
      ],
      icon: <FaUniversity />
    },
    {
      id: 2,
      degree: "Higher Secondary Education (Science)",
      institution: "Vivekanand Science Academy",
      location: "Halvad, Dhrangadhra, India",
      startDate: "Jun 2022",
      endDate: "Mar 2024",
      highlights: [
        "Completed 12th grade with Science stream focusing on Physics, Chemistry, and Mathematics",
        "Achieved 75.66% and secured a 72 percentile in board examinations",
        "Built a strong academic foundation for engineering and computer science",
        "Participated in various science fairs and school tech activities"
      ],
      icon: <FaGraduationCap />
    },
    {
      id: 3,
      degree: "Secondary School Certificate (SSC)",
      institution: "Sunrise Smart School",
      location: "Dhrangadhra, Surendranagar, India",
      startDate: "Jun 2021",
      endDate: "Mar 2022",
      highlights: [
        "Achieved outstanding academic results with 91% and 98.66 percentile",
        "Awarded A1 grade for exceptional performance in all subjects",
        "Demonstrated strong aptitude in Mathematics and Science",
        "Recognized for discipline and consistent academic excellence"
      ],
      icon: <FaBook />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Education | Dhruv Sonagra</title>
        <meta name="description" content="My academic background, degrees, and continuous learning through online courses." />
      </Helmet>

      <main className="education" style={{ paddingTop: '120px' }}>
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
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              color: '#8b5cf6',
              marginBottom: '1.5rem'
            }}>
              <FaGraduationCap style={{ marginRight: '0.5rem', display: 'inline' }} />
              Academic Background
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              Education &{' '}
              <span style={{
                background: 'linear-gradient(90deg, #8b5cf6, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Learning
              </span>
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#94a3b8',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              My academic journey and continuous learning through courses and certifications
            </p>
          </motion.div>
        </section>

        {/* Education Timeline */}
        <section className="container" style={{ marginBottom: '6rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <FaUniversity style={{ color: '#8b5cf6' }} />
            Formal Education
          </h2>

          <div style={{ position: 'relative' }}>
            {/* Timeline Line */}
            <div style={{
              position: 'absolute',
              left: '24px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, #8b5cf6, #00d4ff)'
            }} />

            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                style={{
                  position: 'relative',
                  paddingLeft: '80px',
                  paddingBottom: '2rem'
                }}
              >
                {/* Timeline Dot */}
                <div style={{
                  position: 'absolute',
                  left: '10px',
                  top: '4px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: '#8b5cf6',
                  border: '4px solid #0a0e1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '0.75rem'
                }}>
                  {edu.icon}
                </div>

                {/* Content Card */}
                <div style={{
                  padding: '2rem',
                  background: 'linear-gradient(145deg, rgba(20, 29, 51, 0.6) 0%, rgba(10, 14, 26, 0.8) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        marginBottom: '0.5rem'
                      }}>
                        {edu.degree}
                      </h3>
                      <p style={{ color: '#8b5cf6', fontWeight: 500 }}>
                        {edu.institution}, {edu.location}
                      </p>
                    </div>
                    <span style={{
                      padding: '0.375rem 0.875rem',
                      background: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      color: '#8b5cf6',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem'
                    }}>
                      <FaCalendarAlt />
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>

                  <div>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#64748b',
                      marginBottom: '0.75rem'
                    }}>
                      Highlights
                    </h4>
                    <ul style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      {edu.highlights.map((highlight, i) => (
                        <li 
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            color: '#94a3b8'
                          }}
                        >
                          <span style={{ color: '#10b981' }}>✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Education;
