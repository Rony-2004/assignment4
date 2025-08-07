# 🎓 EdTech Platform

A modern, full-stack EdTech web application built with Next.js, GraphQL, and PostgreSQL. Users can browse courses, enroll as students or professors, and manage their learning experience.

## ✨ Features

### 🎯 Core Functionality
- **Course Browsing**: Browse available courses with detailed information
- **User Authentication**: Mock login system with role-based access
- **Course Enrollment**: Enroll as either a student or professor
- **Role-Based Access**: Different permissions for students and professors
- **Course Management**: Professors can edit course content
- **Responsive Design**: Mobile-first design that works on all devices

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface with dark theme
- **Success Animations**: Visual feedback for successful enrollments
- **Loading States**: Smooth loading indicators throughout the app
- **Responsive Layout**: Perfect alignment and spacing on all screen sizes
- **Interactive Elements**: Hover effects, transitions, and micro-interactions

### 🔧 Technical Features
- **GraphQL API**: Efficient data fetching with Apollo Client
- **PostgreSQL Database**: Robust data storage with Prisma ORM
- **TypeScript**: Type-safe development experience
- **State Management**: Zustand for authentication state
- **Real-time Updates**: Automatic data refresh after mutations

## 🏗️ Architecture

### Frontend (Next.js 14)
```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx         # Home page (course listing)
│   │   ├── login/           # Login page
│   │   ├── courses/[id]/    # Course detail page
│   │   └── dashboard/       # User dashboard
│   ├── components/          # Reusable components
│   ├── graphql/            # GraphQL queries & mutations
│   ├── store/              # Zustand state management
│   ├── types/              # TypeScript type definitions
│   └── lib/                # Utility functions
```

### Backend (Express.js + Apollo Server)
```
backend/
├── src/
│   ├── server-prisma.js    # Main server file
│   ├── schema.js           # GraphQL schema
│   ├── resolvers-prisma.js # GraphQL resolvers
│   ├── database-prisma.js  # Database initialization
│   └── config.js           # Configuration
├── prisma/
│   └── schema.prisma       # Database schema
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd assignment2
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run install:all

# Or install separately:
cd backend && npm install
cd ../frontend && npm install
```

### 3. Environment Setup
Create the following `.env` files:

**Backend (.env)**
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration (Neon PostgreSQL)
DATABASE_URL="postgresql://your-neon-connection-string-here"

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# GraphQL Configuration
GRAPHQL_PATH=/graphql

# Security (for production)
JWT_SECRET=your-super-secret-jwt-key-here
SESSION_SECRET=your-session-secret-here
```

**Frontend (.env)**
```env
# API Configuration
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:5001/graphql
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### 4. Database Setup
```bash
cd backend

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### 5. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start separately:
npm run dev:backend  # Backend on port 5001
npm run dev:frontend # Frontend on port 3000
```

## 📊 Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Courses Table
- `id` (UUID, Primary Key)
- `title` (String)
- `description` (String)
- `level` (Enum: beginner, intermediate, advanced)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Enrollments Table
- `id` (UUID, Primary Key)
- `userId` (UUID, Foreign Key)
- `courseId` (UUID, Foreign Key)
- `role` (Enum: student, professor)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## 🎮 Usage Guide

### For Students
1. **Browse Courses**: Visit the home page to see all available courses
2. **View Course Details**: Click on any course to see detailed information
3. **Enroll**: Click "Enroll as Student" to join the course
4. **Access Dashboard**: View your enrolled courses in the dashboard

### For Professors
1. **Browse Courses**: Same as students
2. **Enroll as Professor**: Choose "Enroll as Professor" when enrolling
3. **Edit Courses**: Professors can edit course content (title, description, level)
4. **Manage Content**: Use the "Edit Course" button to modify course details

### Demo Users
The application comes with pre-configured demo users:
- **John Student** (john@student.com) - Student role
- **Jane Professor** (jane@professor.com) - Professor role  
- **Bob Student** (bob@student.com) - Student role

## 🔧 Available Scripts

### Root Level
```bash
npm run install:all    # Install all dependencies
npm run dev           # Start both servers
npm run dev:backend   # Start backend only
npm run dev:frontend  # Start frontend only
npm run build         # Build for production
npm run start         # Start production servers
```

### Backend
```bash
npm run dev           # Start development server
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:studio     # Open Prisma Studio
```

### Frontend
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
```

## 🌐 Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with build command: `npm install && npx prisma generate`

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables for production
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
# Backend (Render)
DATABASE_URL=your-neon-production-url
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app

# Frontend (Vercel)
NEXT_PUBLIC_GRAPHQL_URL=https://your-backend-domain.onrender.com/graphql
NEXT_PUBLIC_API_URL=https://your-backend-domain.onrender.com
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Apollo Client** - GraphQL client
- **Zustand** - Lightweight state management
- **Lucide React** - Beautiful icons

### Backend
- **Express.js** - Node.js web framework
- **Apollo Server** - GraphQL server
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **Neon** - Serverless PostgreSQL hosting

### Development Tools
- **Nodemon** - Auto-restart development server
- **ESLint** - Code linting
- **TypeScript** - Type checking

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach**
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly buttons** and interactions
- **Optimized layouts** for all screen sizes
- **Consistent spacing** and typography

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Success**: Green (#16a34a)
- **Warning**: Yellow (#ca8a04)
- **Error**: Red (#dc2626)
- **Background**: Dark gradient (gray-900 to blue-900)

### Typography
- **Headings**: Bold, large text for hierarchy
- **Body**: Medium weight for readability
- **Buttons**: Bold text for emphasis

### Components
- **Cards**: Rounded corners, shadows, hover effects
- **Buttons**: Rounded, with hover states and transitions
- **Forms**: Clean inputs with focus states
- **Badges**: Color-coded for different levels

## 🔒 Security Features

- **CORS Configuration** - Proper cross-origin resource sharing
- **Environment Variables** - Secure configuration management
- **Input Validation** - GraphQL schema validation
- **Role-Based Access** - User permission system

## 🚀 Performance Optimizations

- **GraphQL** - Efficient data fetching
- **Code Splitting** - Next.js automatic code splitting
- **Image Optimization** - Next.js image optimization
- **Caching** - Apollo Client caching
- **Lazy Loading** - Component lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your environment variables
3. Ensure the database is properly set up
4. Check that both servers are running

## 🎯 Future Enhancements

- [ ] Real authentication system
- [ ] File upload for course materials
- [ ] Video streaming integration
- [ ] Discussion forums
- [ ] Progress tracking
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Email notifications

---