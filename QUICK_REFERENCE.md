# 🚀 Quick Reference - Portfolio Commands

## 📦 Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
npm run dev
```
App: http://localhost:3000

### Production Mode

```bash
# Build
npm run build

# Preview
npm run preview
```

## 🔧 Backend Setup

```bash
# Create .env file
cd backend
cp .env.example .env

# Edit .env with your credentials
# For Gmail: Use App Password from Google Account Security
```

## 📝 Customization Checklist

- [ ] Update name in `src/pages/Home.jsx`
- [ ] Update bio in `src/pages/About.jsx`
- [ ] Add projects in `src/pages/Projects.jsx`
- [ ] Add certificates in `src/pages/Certificates.jsx`
- [ ] Update education in `src/pages/Education.jsx`
- [ ] Update contact info in `src/pages/Contact.jsx`
- [ ] Update social links in `src/components/Footer.jsx`
- [ ] Configure email in `backend/.env`
- [ ] Replace placeholder images
- [ ] Update meta tags in `index.html`

## 🎨 Theme Customization

Edit colors in `src/index.css`:
```css
:root {
  --color-accent-primary: #667eea;
  --color-accent-secondary: #764ba2;
  --color-accent-tertiary: #f093fb;
}
```

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test contact form
# Use the UI at http://localhost:3000/contact
```

## 📦 Deployment

### Frontend (Vercel)
```bash
npm install -g vercel
vercel
```

### Backend (Heroku)
```bash
cd backend
heroku create your-portfolio-api
heroku config:set EMAIL_USER=your.email@gmail.com
heroku config:set EMAIL_PASS=your-app-password
heroku config:set RECIPIENT_EMAIL=your.email@gmail.com
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
git push heroku main
```

### Update API URL
In `src/pages/Contact.jsx` line 57:
```javascript
const response = await fetch('https://your-backend.herokuapp.com/api/contact', {
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with routing |
| `src/index.css` | Global styles & theme |
| `backend/server.js` | Express server |
| `backend/.env` | Email configuration |
| `vite.config.js` | Build configuration |

## 🐛 Common Issues

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Change port in vite.config.js
```

### Email Not Sending
1. Check `backend/.env` credentials
2. Enable "Less secure app access" or use App Password
3. Check SMTP settings for your provider

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 Project Structure

```
portfolio/
├── backend/          # Express API
├── public/           # Static files
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Route pages
│   ├── hooks/        # Custom hooks
│   └── utils/        # Utilities
└── dist/             # Production build
```

## 🔑 Environment Variables

```env
# Backend (.env)
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=your.email@gmail.com
FRONTEND_URL=http://localhost:3000
```

## 📚 Documentation

- **README.md** - Project overview
- **SETUP_GUIDE.md** - Detailed setup
- **PROJECT_SUMMARY.md** - Complete feature list
- **QUICK_REFERENCE.md** - This file

## 🎯 Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About |
| `/projects` | Projects |
| `/certificates` | Certificates |
| `/education` | Education |
| `/contact` | Contact |

## 🌐 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Send contact form |

## 💡 Pro Tips

1. **Gmail**: Use App Password, not regular password
2. **Images**: Optimize before uploading (use TinyPNG)
3. **Testing**: Test on Chrome, Firefox, Safari
4. **Mobile**: Test on real devices, not just DevTools
5. **Performance**: Run Lighthouse audit before deploying

## 🚀 Ready to Launch?

1. ✅ All dependencies installed
2. ✅ Email configured
3. ✅ Content updated
4. ✅ Images replaced
5. ✅ Tested locally
6. ✅ Backend deployed
7. ✅ Frontend deployed
8. ✅ API URL updated
9. ✅ Live testing complete

**You're ready to go! 🎉**

---

Need help? Check the other documentation files or review the inline code comments.
