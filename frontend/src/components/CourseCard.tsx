'use client';

import { Course } from '@/types';
import { BookOpen, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'bg-green-500 text-white';
    case 'intermediate':
      return 'bg-yellow-500 text-white';
    case 'advanced':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-blue-300 group transform hover:scale-105 h-full flex flex-col">
      <div className="p-6 sm:p-8 flex flex-col h-full">
        {/* Header with level badge */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-xl group-hover:bg-blue-700 transition-colors shadow-lg">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${getLevelColor(course.level)} shadow-md`}>
              {course.level}
            </span>
          </div>
        </div>
        
        {/* Course title */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors">
          {course.title}
        </h3>
        
        {/* Course description */}
        <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 line-clamp-3 leading-relaxed font-medium flex-grow">
          {course.description}
        </p>
        
        {/* Footer with action - Fixed alignment */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mt-auto">
          <div className="flex items-center space-x-2 text-gray-600 text-sm font-medium">
            <Users className="h-5 w-5" />
            <span>Open for enrollment</span>
          </div>
          
          <Link
            href={`/courses/${course.id}`}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-base font-bold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            <span className="hidden sm:inline">View Course</span>
            <span className="sm:hidden">View</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
} 