'use client';

import { useQuery } from '@apollo/client';
import { GET_COURSES } from '@/graphql/queries';
import CourseCard from '@/components/CourseCard';
import { Course } from '@/types';
import { Loader2, BookOpen } from 'lucide-react';

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="flex flex-col items-center space-y-4 p-8">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <span className="text-white text-lg">Loading courses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="text-center p-8 max-w-md">
          <div className="text-red-400 text-xl font-medium mb-3">
            Error loading courses
          </div>
          <div className="text-gray-300">
            Please try again later or check your connection.
          </div>
        </div>
      </div>
    );
  }

  const courses: Course[] = data?.courses || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Available Courses
              </h1>
            </div>
          </div>
          <p className="text-blue-100 text-lg sm:text-xl max-w-3xl font-medium">
            Discover and enroll in our comprehensive selection of courses designed to help you grow your skills.
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="p-4 bg-gray-700 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No courses available</h3>
            <p className="text-gray-300">Check back later for new courses.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 auto-rows-fr">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
