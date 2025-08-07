const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Course {
    id: ID!
    title: String!
    description: String!
    level: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Enrollment {
    id: ID!
    user: User!
    course: Course!
    role: String!
  }

  type Query {
    courses: [Course!]!
    course(id: ID!): Course
    enrollments: [Enrollment!]!
    enrollment(id: ID!): Enrollment
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    enrollUser(userId: ID!, courseId: ID!, role: String!): Enrollment!
    updateCourse(id: ID!, title: String, description: String, level: String): Course!
  }
`;

module.exports = typeDefs; 