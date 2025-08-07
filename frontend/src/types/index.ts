export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Enrollment {
  id: string;
  user: User;
  course: Course;
  role: 'student' | 'professor';
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface CourseFormData {
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
} 