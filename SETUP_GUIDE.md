# Portfolio Setup Guide

## 🎯 Complete Setup Instructions

Follow these steps to get your portfolio up and running:

### Step 1: Install Frontend Dependencies

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- React Router for navigation
- GSAP for animations
- Framer Motion for page transitions
- React Three Fiber for 3D elements
- Lenis for smooth scrolling
- React Helmet for SEO
- Swiper for carousels
- React Snowfall for effects
- And more...

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- Express.js
- Nodemailer
- CORS
- Helmet (security)
- Rate limiting
- dotenv

### Step 3: Configure Email

1. Copy the environment template:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit `.env` file with your email credentials:

   **For Gmail:**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   RECIPIENT_EMAIL=your.email@gmail.com
   ```

   **Gmail App Password Setup:**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification
   - Go to App Passwords
   - Select "Mail" and generate password
   - Use the 16-character password in .env

   **For Other Providers (Outlook, Yahoo, etc.):**
   Update SMTP settings accordingly.

### Step 4: Customize Your Portfolio

#### Update Personal Information

1. **src/pages/Home.jsx**
   - Line 60: Change "Your Name"
   - Line 66: Change "Full-Stack Developer"
   - Line 71-73: Update description

2. **src/pages/About.jsx**
   - Line 84: Add your profile image URL
   - Line 109-119: Update bio text
   - Line 126: Update resume download link
   - Line 145-157: Update social media links

3. **src/pages/Projects.jsx**
   - Line 23-75: Replace with your actual projects
   - Add project images, videos, links, and tech stacks

4. **src/pages/Certificates.jsx**
   - Line 19-62: Add your certificates
   - Update images and verification links

5. **src/pages/Education.jsx**
   - Line 19-47: Update educational background

6. **src/pages/Contact.jsx**
   - Line 123-137: Update contact information

7. **src/components/Footer.jsx**
   - Line 13-25: Update social links
   - Line 37: Update name

8. **index.html**
   - Line 19-22: Update meta tags
   - Line 31: Update title

### Step 5: Update Theme Colors (Optional)

Edit `src/index.css` starting at line 16:

```css
:root {
  --color-accent-primary: #667eea;  /* Change to your brand color */
  --color-accent-secondary: #764ba2;
  --color-accent-tertiary: #f093fb;
}
```

### Step 6: Add Your Images

Replace placeholder images with your actual images:
- Profile photo in About page
- Project screenshots/thumbnails
- Certificate images

**Recommended image sizes:**
- Profile: 400x400px
- Projects: 600x400px
- Certificates: 400x300px

### Step 7: Run the Application

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on http://localhost:5000

2. **Start Frontend** (Terminal 2):
   ```bash
   npm run dev
   ```
   App runs on http://localhost:3000

### Step 8: Test Contact Form

1. Open http://localhost:3000/contact
2. Fill out the form
3. Submit and check:
   - Form validation works
   - Success message appears
   - You receive email at RECIPIENT_EMAIL
   - Sender receives auto-reply

### Step 9: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

To preview the production build:
```bash
npm run preview
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify:**
   - Connect your GitHub repo
   - Build command: `npm run build`
   - Publish directory: `dist`

### Backend Deployment (Heroku/Railway/Render)

1. **Heroku:**
   ```bash
   cd backend
   heroku create your-portfolio-api
   heroku config:set EMAIL_USER=your.email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   # ... set other env vars
   git push heroku main
   ```

2. **Update Frontend API URL:**
   In `src/pages/Contact.jsx` line 57, change:
   ```javascript
   const response = await fetch('https://your-backend-url.com/api/contact', {
   ```

## 📋 Checklist

Before going live, make sure you've:

- [ ] Installed all dependencies
- [ ] Configured email in backend/.env
- [ ] Updated all personal information
- [ ] Replaced placeholder images
- [ ] Tested contact form
- [ ] Updated social media links
- [ ] Customized theme colors (optional)
- [ ] Updated meta tags for SEO
- [ ] Tested on mobile devices
- [ ] Built production version
- [ ] Deployed backend
- [ ] Deployed frontend
- [ ] Updated API URL in frontend
- [ ] Tested live contact form

## 🐛 Troubleshooting

### Contact Form Not Working

1. Check backend is running on port 5000
2. Verify .env file has correct email credentials
3. Check browser console for CORS errors
4. Test backend directly: http://localhost:5000/api/health

### Animations Not Working

1. Clear browser cache
2. Check console for errors
3. Ensure all dependencies installed correctly

### Build Errors

1. Delete node_modules and package-lock.json
2. Run `npm install` again
3. Check Node.js version (should be v16+)

## 💡 Tips

- Use high-quality images for best results
- Keep descriptions concise and impactful
- Test on multiple browsers
- Optimize images before uploading
- Keep dependencies updated
- Monitor email quota limits

## 📞 Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check that ports 3000 and 5000 are available

---

Happy coding! 🎉
