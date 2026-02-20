# SkillSphere - React Learning Platform

A comprehensive React application demonstrating modern web development practices, production builds, and bundle analysis.

## 🚀 Features

- **Authentication System**: Login/Register with Redux state management
- **Course Management**: CRUD operations for courses
- **Analytics Dashboard**: Heavy components demonstrating bundle analysis
- **Responsive Design**: Material-UI components
- **Code Splitting**: Lazy loading for performance
- **Environment Configuration**: Multiple environment support

## 🛠 Tech Stack

- **Frontend**: React 19 + Vite
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI
- **HTTP Client**: Axios
- **Backend**: JSON Server (dev) / Mock API (production)
- **Testing**: Vitest
- **Linting**: ESLint

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd skillsphere-app

# Install dependencies
npm install

# Start development server
npm run dev

# Start mock backend (in another terminal)
npm run server
```

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start dev server (port 5173)
npm run server           # Start JSON server backend (port 5000)

# Building
npm run build            # Production build
npm run build:analyze    # Build with bundle analysis report
npm run preview          # Preview production build locally

# Testing & Quality
npm test                 # Run tests
npm run lint             # Run ESLint
```

## 🌍 Environment Configuration

Create `.env` files for different environments:

```bash
# .env (development)
VITE_API_BASE_URL=http://localhost:5000

# .env.production (production)
VITE_API_BASE_URL=https://api.skillsphere.com
```

## 📊 Bundle Analysis

Analyze bundle size and optimize:

```bash
# Generate bundle analysis report
npm run build:analyze

# View report in browser: dist/bundle-analysis.html
```

## 🎯 Teaching Topics

### 1. Building for Production

#### 1.1 Configuring the Production Build

**Key Concepts:**
- Environment Variables
- Build Optimization
- Code Splitting
- Bundle Analysis

#### 1.2 Analyzing and Reducing Bundle Size

**Bundle Analysis Tools:**
- `rollup-plugin-visualizer`
- Webpack Bundle Analyzer

**Optimization Techniques:**
- Code Splitting
- Lazy Loading
- Tree Shaking

### 2. React Application Architecture

- Component Design Patterns
- State Management with Redux
- API Integration
- Error Handling
- Performance Optimization

## 📚 API Design

**Development**: JSON Server with RESTful endpoints
**Production**: Mock API with static data

Endpoints:
- `GET /courses` - List courses
- `POST /courses` - Create course
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course

## 🎓 Learning Outcomes

Students will learn:
- Modern React development practices
- Production build optimization
- Bundle analysis and performance monitoring
- Environment configuration
- Code splitting and lazy loading
- State management patterns
- API integration strategies

---

**Happy Learning! 🎓**
