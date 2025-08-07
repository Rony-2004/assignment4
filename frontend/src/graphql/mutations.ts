import { gql } from '@apollo/client';

export const ENROLL_USER = gql`
  mutation EnrollUser($userId: ID!, $courseId: ID!, $role: String!) {
    enrollUser(userId: $userId, courseId: $courseId, role: $role) {
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

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $title: String, $description: String, $level: String) {
    updateCourse(id: $id, title: $title, description: $description, level: $level) {
      id
      title
      description
      level
    }
  }
`; 