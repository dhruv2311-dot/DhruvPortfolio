import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===================================
// MIDDLEWARE
// ===================================

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // 5 requests per window
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ===================================
// EMAIL CONFIGURATION
// ===================================

/**
 * Create Nodemailer transporter
 * Configure with your email service credentials
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// ===================================
// VALIDATION FUNCTIONS
// ===================================

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate contact form data
 */
const validateContactForm = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.push('Subject is required');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return errors;
};

/**
 * Sanitize input to prevent XSS
 */
const sanitizeInput = (input) => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// ===================================
// ROUTES
// ===================================

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Contact form submission endpoint
 * POST /api/contact
 */
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    const validationErrors = validateContactForm(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name.trim()),
      email: email.trim().toLowerCase(),
      subject: sanitizeInput(subject.trim()),
      message: sanitizeInput(message.trim()),
    };

    // Create email transporter
    const transporter = createTransporter();

    // Email to you (recipient)
    const mailOptionsToYou = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Portfolio Contact: ${sanitizedData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .value { margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From:</div>
                <div class="value">${sanitizedData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${sanitizedData.email}</div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${sanitizedData.subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${sanitizedData.message.replace(/\n/g, '<br>')}</div>
              </div>
              <hr>
              <p style="color: #666; font-size: 12px;">
                Sent from your portfolio contact form on ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      replyTo: sanitizedData.email,
    };

    // Auto-reply to sender
    const mailOptionsToSender = {
      from: `"Your Name" <${process.env.EMAIL_USER}>`,
      to: sanitizedData.email,
      subject: 'Thank you for contacting me!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Reaching Out!</h2>
            </div>
            <div class="content">
              <p>Hi ${sanitizedData.name},</p>
              <p>Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible.</p>
              <p>Here's a copy of what you sent:</p>
              <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
              <p><strong>Message:</strong><br>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
              <hr>
              <p>Best regards,<br>Your Name</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send emails
    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToSender);

    // Success response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully! Check your email for confirmation.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// ===================================
// ERROR HANDLING
// ===================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : undefined,
  });
});

// ===================================
// START SERVER
// ===================================

app.listen(PORT, () => {
  console.log(`
    ╔════════════════════════════════════════╗
    ║   Portfolio Backend Server Running     ║
    ╠════════════════════════════════════════╣
    ║   Port: ${PORT.toString().padEnd(30)} ║
    ║   Environment: ${(process.env.NODE_ENV || 'development').padEnd(23)} ║
    ║   Time: ${new Date().toLocaleTimeString().padEnd(30)} ║
    ╚════════════════════════════════════════╝
  `);
});

export default app;
