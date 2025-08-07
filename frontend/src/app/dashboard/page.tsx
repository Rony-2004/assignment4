'use client';

import { useQuery } from '@apollo/client';
import { GET_ENROLLMENTS } from '@/graphql/queries';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, BookOpen, Users, Edit, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_ENROLLMENTS);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
          <span className="text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium mb-2">
            Error loading dashboard
          </div>
          <div className="text-gray-600">
            Please try again later.
          </div>
        </div>
      </div>
    );
  }

  const enrollments = data?.enrollments || [];
  const userEnrollments = enrollments.filter(
    (enrollment: any) => enrollment.user.id === user?.id
  );

  const studentCourses = userEnrollments.filter(
    (enrollment: any) => enrollment.role === 'student'
  );
  const professorCourses = userEnrollments.filter(
    (enrollment: any) => enrollment.role === 'professor'
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <GraduationCap className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Welcome back, {user?.name}! Here's an overview of your courses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student Courses */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">My Learning</h2>
          </div>
          
          {studentCourses.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">You're not enrolled in any courses as a student yet.</p>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {studentCourses.map((enrollment: any) => (
                <div key={enrollment.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{enrollment.course.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(enrollment.course.level)}`}>
                      {enrollment.course.level}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{enrollment.course.description}</p>
                  <Link
                    href={`/courses/${enrollment.course.id}`}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    Continue Learning →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Professor Courses */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Edit className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">My Teaching</h2>
          </div>
          
          {professorCourses.length === 0 ? (
            <div className="text-center py-8">
              <Edit className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">You're not teaching any courses yet.</p>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {professorCourses.map((enrollment: any) => (
                <div key={enrollment.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{enrollment.course.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(enrollment.course.level)}`}>
                      {enrollment.course.level}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{enrollment.course.description}</p>
                  <Link
                    href={`/courses/${enrollment.course.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Manage Course →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 