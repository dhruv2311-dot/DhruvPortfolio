# Professional Portfolio Website

A modern, production-ready portfolio website built with React.js featuring advanced animations, 3D elements, and a fully functional contact form backend.

## ✨ Features

### Frontend
- **Modern Tech Stack**: React.js with Vite for blazing-fast development
- **Advanced Animations**: 
  - GSAP with ScrollTrigger for scroll-based animations
  - Framer Motion for page transitions and micro-interactions
  - React Spring for physics-based animations
  - Lottie for lightweight JSON animations
- **3D Elements**: React Three Fiber for subtle 3D background effects
- **Custom Cursor**: Smooth animated cursor with hover effects
- **Smooth Scrolling**: Lenis for buttery-smooth scroll experience
- **Global Effects**: React Snowfall for ambient particles
- **Responsive Design**: Mobile-first approach with breakpoints
- **SEO Optimized**: React Helmet for dynamic meta tags, sitemap, robots.txt
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support

### Backend
- **Express.js** server with RESTful API
- **Nodemailer** for email functionality
- **Security**: Helmet, CORS, rate limiting
- **Form Validation**: Server-side validation and sanitization
- **Auto-Reply**: Automatic confirmation emails to users

### Pages
1. **Home** - Hero section with animated name and CTA buttons
2. **About** - Profile, stats, bio, and social links
3. **Projects** - Filterable project gallery with video previews
4. **Certificates** - Professional certifications with carousel
5. **Education** - Animated timeline of academic background
6. **Contact** - Form with validation and backend integration

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your email credentials
   ```

### Development

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend runs on `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   └── Background3D.jsx
│   ├── pages/            # Route pages
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Certificates.jsx
│   │   ├── Education.jsx
│   │   └── Contact.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useSmoothScroll.js
│   │   ├── useAnimatedCursor.js
│   │   ├── useScrollAnimation.js
│   │   └── useMagneticButton.js
│   ├── utils/            # Utility functions
│   │   └── animations.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── backend/
│   ├── server.js         # Express server
│   ├── package.json
│   └── .env.example      # Environment template
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Customization

### Update Personal Information

1. **Home Page** (`src/pages/Home.jsx`)
   - Update name, role, and description

2. **About Page** (`src/pages/About.jsx`)
   - Add your profile image
   - Update bio and stats
   - Add social media links

3. **Projects** (`src/pages/Projects.jsx`)
   - Add your projects with images and links
   - Update tech stack tags

4. **Certificates** (`src/pages/Certificates.jsx`)
   - Add certificate images and links

5. **Education** (`src/pages/Education.jsx`)
   - Update educational background

6. **Contact** (`src/pages/Contact.jsx`)
   - Update contact information

### Customize Theme

Edit CSS variables in `src/index.css`:
```css
:root {
  --color-accent-primary: #667eea;
  --color-accent-secondary: #764ba2;
  /* ... more variables */
}
```

## 📧 Email Configuration

### Gmail Setup

1. Enable 2-Factor Authentication
2. Generate App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Update `.env`:
   ```
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASS=your-app-password
   ```

### Other Email Providers

Update SMTP settings in `.env`:
```
EMAIL_HOST=smtp.yourprovider.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

## 🔒 Security

- Rate limiting on contact form (5 requests per 15 minutes)
- Input sanitization to prevent XSS
- Helmet.js for security headers
- CORS configuration
- Environment variables for sensitive data

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: 769px - 1024px
- Large Desktop: > 1024px

## 🌐 SEO Features

- Dynamic meta tags with React Helmet
- Open Graph tags for social sharing
- JSON-LD structured data
- Sitemap.xml
- Robots.txt
- Semantic HTML
- Alt attributes on images
- Proper heading hierarchy

## 🎯 Performance Optimizations

- Code splitting with Vite
- Lazy loading for images
- Optimized animations
- Reduced motion support
- Minified production build
- Tree shaking

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Your Name**
- Website: [yourportfolio.com](https://yourportfolio.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

Built with ❤️ using React, GSAP, Framer Motion, and modern web technologies.
