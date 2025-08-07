const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Initialize database with sample data
const initializeDatabase = async () => {
  try {
    // Check if data already exists
    const userCount = await prisma.user.count();
    
    if (userCount === 0) {
      console.log('Initializing database with sample data...');
      
      // Create sample users
      const users = await Promise.all([
        prisma.user.create({
          data: {
            name: 'John Student',
            email: 'john@student.com'
          }
        }),
        prisma.user.create({
          data: {
            name: 'Jane Professor',
            email: 'jane@professor.com'
          }
        }),
        prisma.user.create({
          data: {
            name: 'Bob Student',
            email: 'bob@student.com'
          }
        })
      ]);

      // Create sample courses
      const courses = await Promise.all([
        prisma.course.create({
          data: {
            title: 'Introduction to Web Development',
            description: 'Learn the basics of HTML, CSS, and JavaScript',
            level: 'beginner'
          }
        }),
        prisma.course.create({
          data: {
            title: 'Advanced React Patterns',
            description: 'Master advanced React concepts and patterns',
            level: 'advanced'
          }
        }),
        prisma.course.create({
          data: {
            title: 'GraphQL Fundamentals',
            description: 'Learn GraphQL from basics to advanced concepts',
            level: 'intermediate'
          }
        })
      ]);

      // Create sample enrollments
      await Promise.all([
        prisma.enrollment.create({
          data: {
            userId: users[0].id,
            courseId: courses[0].id,
            role: 'student'
          }
        }),
        prisma.enrollment.create({
          data: {
            userId: users[1].id,
            courseId: courses[0].id,
            role: 'professor'
          }
        }),
        prisma.enrollment.create({
          data: {
            userId: users[0].id,
            courseId: courses[1].id,
            role: 'student'
          }
        }),
        prisma.enrollment.create({
          data: {
            userId: users[1].id,
            courseId: courses[1].id,
            role: 'professor'
          }
        }),
        prisma.enrollment.create({
          data: {
            userId: users[2].id,
            courseId: courses[2].id,
            role: 'student'
          }
        })
      ]);

      console.log('Database initialized with sample data');
    } else {
      console.log('Database already contains data, skipping initialization');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

module.exports = { prisma, initializeDatabase }; 