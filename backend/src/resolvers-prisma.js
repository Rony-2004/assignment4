const { v4: uuidv4 } = require('uuid');
const { prisma } = require('./database-prisma');

const resolvers = {
  Query: {
    courses: async () => {
      return await prisma.course.findMany();
    },

    course: async (_, { id }) => {
      return await prisma.course.findUnique({
        where: { id }
      });
    },

    users: async () => {
      return await prisma.user.findMany();
    },

    user: async (_, { id }) => {
      return await prisma.user.findUnique({
        where: { id }
      });
    },

    enrollments: async () => {
      return await prisma.enrollment.findMany({
        include: {
          user: true,
          course: true
        }
      });
    },

    enrollment: async (_, { id }) => {
      return await prisma.enrollment.findUnique({
        where: { id },
        include: {
          user: true,
          course: true
        }
      });
    }
  },

  Mutation: {
    enrollUser: async (_, { userId, courseId, role }) => {
      return await prisma.enrollment.create({
        data: {
          userId,
          courseId,
          role
        },
        include: {
          user: true,
          course: true
        }
      });
    },

    updateCourse: async (_, { id, title, description, level }) => {
      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (level !== undefined) updateData.level = level;

      return await prisma.course.update({
        where: { id },
        data: updateData
      });
    }
  }
};

module.exports = resolvers; 