import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Verification Script (ESM Version)
 * Run this to check if all imports are working correctly
 * Usage: node verify-imports.js
 */

console.log('🔍 Verifying Portfolio Project...\n');

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

// Check if required files exist
const requiredFiles = [
  'src/App.jsx',
  'src/main.jsx',
  'src/index.css',
  'src/hooks/useSmoothScroll.js',
  'src/hooks/useScrollAnimation.js',
  'src/hooks/useMagneticButton.js',
  'src/components/Navigation.jsx',
  'src/components/Footer.jsx',
  'src/components/Loader.jsx',
  'src/components/Background3D.jsx',
  'src/components/Cursor.jsx',
  'src/pages/Home.jsx',
  'src/pages/About.jsx',
  'src/pages/Projects.jsx',
  'src/pages/Certificates.jsx',
  'src/pages/Education.jsx',
  'src/pages/Contact.jsx',
  'src/utils/animations.js',
  'backend/server.js',
  'backend/.env',
  'package.json',
  'vite.config.js',
  'index.html'
];

console.log('📁 Checking Required Files...\n');

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
    checks.passed++;
  } else {
    console.log(`❌ ${file} - MISSING`);
    checks.failed++;
  }
});

console.log('\n📦 Checking package.json dependencies...\n');

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  const requiredDeps = [
    'react',
    'react-dom',
    'react-router-dom',
    'gsap',
    'framer-motion',
    '@react-spring/web',
    '@react-three/fiber',
    '@react-three/drei',
    'lenis',
    'react-helmet-async',
    'react-icons',
    'react-snowfall',
    'swiper',
    'three'
  ];

  requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
      console.log(`✅ ${dep} - ${packageJson.dependencies[dep]}`);
      checks.passed++;
    } else {
      console.log(`❌ ${dep} - MISSING`);
      checks.failed++;
    }
  });
} catch (error) {
  console.log(`❌ Error reading package.json: ${error.message}`);
  checks.failed++;
}

console.log('\n🔧 Checking Backend...\n');

try {
  const backendPackageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend/package.json'), 'utf8'));
  const backendDeps = ['express', 'nodemailer', 'cors', 'helmet', 'dotenv'];

  backendDeps.forEach(dep => {
    if (backendPackageJson.dependencies[dep]) {
      console.log(`✅ ${dep} - ${backendPackageJson.dependencies[dep]}`);
      checks.passed++;
    } else {
      console.log(`❌ ${dep} - MISSING`);
      checks.failed++;
    }
  });
} catch (error) {
  console.log(`❌ Error reading backend/package.json: ${error.message}`);
  checks.failed++;
}

console.log('\n⚙️ Checking .env configuration...\n');

try {
  const envPath = path.join(__dirname, 'backend/.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const requiredEnvVars = [
      'EMAIL_HOST',
      'EMAIL_PORT',
      'EMAIL_USER',
      'EMAIL_PASS',
      'RECIPIENT_EMAIL'
    ];

    requiredEnvVars.forEach(envVar => {
      if (envContent.includes(envVar)) {
        const value = envContent.split('\n').find(line => line.startsWith(envVar));
        if (value && value.includes('your.email@gmail.com')) {
          console.log(`⚠️  ${envVar} - NEEDS CONFIGURATION`);
          checks.warnings++;
        } else {
          console.log(`✅ ${envVar} - Configured`);
          checks.passed++;
        }
      } else {
        console.log(`❌ ${envVar} - MISSING`);
        checks.failed++;
      }
    });
  } else {
    console.log(`⚠️  .env file not found at ${envPath}`);
    console.log(`   Run: cd backend && cp .env.example .env`);
    checks.warnings++;
  }
} catch (error) {
  console.log(`❌ Error checking .env: ${error.message}`);
  checks.failed++;
}

console.log('\n' + '='.repeat(50));
console.log('\n📊 VERIFICATION SUMMARY\n');
console.log(`✅ Passed: ${checks.passed}`);
console.log(`❌ Failed: ${checks.failed}`);
console.log(`⚠️  Warnings: ${checks.warnings}`);

if (checks.failed === 0 && checks.warnings === 0) {
  console.log('\n🎉 All checks passed! Your portfolio is ready to run!');
  console.log('\nNext steps:');
  console.log('1. Configure backend/.env with your email credentials');
  console.log('2. Run: npm run dev (frontend)');
  console.log('3. Run: cd backend && npm run dev (backend)');
} else if (checks.failed === 0) {
  console.log('\n✅ All critical checks passed!');
  console.log('⚠️  Please address the warnings above.');
} else {
  console.log('\n❌ Some checks failed. Please fix the issues above.');
}

console.log('\n' + '='.repeat(50) + '\n');
