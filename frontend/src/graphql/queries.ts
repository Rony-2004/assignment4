import { gql } from '@apollo/client';

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      title
      description
      level
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      id
      title
      description
      level
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export const GET_ENROLLMENTS = gql`
  query GetEnrollments {
    enrollments {
      id
      role
      user {
        id
        name
        email
      }
      course {
        id
        title
        description
        level
      }
    }
  }
`;

export const GET_ENROLLMENT = gql`
  query GetEnrollment($id: ID!) {
    enrollment(id: $id) {
      id
      role
      user {
        id
        name
        email
      }
      course {
        id
        title
        description
        level
      }
    }
  }
`; 