'use client';

import { useQuery, useMutation } from '@apollo/client';
import { GET_COURSE, GET_ENROLLMENTS } from '@/graphql/queries';
import { ENROLL_USER, UPDATE_COURSE } from '@/graphql/mutations';
import { useAuthStore } from '@/store/auth-store';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2, BookOpen, Edit, Users, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const { user, isAuthenticated } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    level: ''
  });

  const { loading: courseLoading, error: courseError, data: courseData } = useQuery(GET_COURSE, {
    variables: { id: courseId }
  });

  const { loading: enrollmentsLoading, data: enrollmentsData } = useQuery(GET_ENROLLMENTS);

  const [enrollUser, { loading: enrolling }] = useMutation(ENROLL_USER, {
    refetchQueries: [{ query: GET_ENROLLMENTS }]
  });

  const [updateCourse, { loading: updating }] = useMutation(UPDATE_COURSE, {
    refetchQueries: [{ query: GET_COURSE, variables: { id: courseId } }]
  });

  if (courseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="flex flex-col items-center space-y-4 p-8">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <span className="text-white text-lg">Loading course...</span>
        </div>
      </div>
    );
  }

  if (courseError || !courseData?.course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="text-center p-8 max-w-md">
          <div className="text-red-400 text-xl font-medium mb-3">
            Course not found
          </div>
          <Link href="/" className="text-blue-300 hover:text-white">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const course = courseData.course;
  const enrollments = enrollmentsData?.enrollments || [];
  
  // Check if user is enrolled and their role
  const userEnrollment = enrollments.find(
    (enrollment: { user: { id: string }; course: { id: string }; role: string }) => 
      enrollment.user.id === user?.id && enrollment.course.id === courseId
  );

  const isProfessor = userEnrollment?.role === 'professor';
  const isStudent = userEnrollment?.role === 'student';
  const isEnrolled = isProfessor || isStudent;

  const handleEnroll = async (role: 'student' | 'professor') => {
    if (!isAuthenticated || !user) {
      router.push('/login');
      return;
    }

    try {
      await enrollUser({
        variables: {
          userId: user.id,
          courseId: courseId,
          role: role
        }
      });
      
      // Show success animation
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Enrollment failed:', error);
    }
  };

  const handleEdit = () => {
    setEditForm({
      title: course.title,
      description: course.description,
      level: course.level
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateCourse({
        variables: {
          id: courseId,
          title: editForm.title,
          description: editForm.description,
          level: editForm.level
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-300 hover:text-white text-base sm:text-lg font-bold"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to courses
          </Link>
        </div>

        {/* Course Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-200">
          <div className="p-6 sm:p-8 lg:p-10">
            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 text-base font-medium"
                    placeholder="Enter course title"
                    aria-label="Course title"
                  />
                </div>
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 text-base font-medium"
                    placeholder="Enter course description"
                    aria-label="Course description"
                  />
                </div>
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-2">
                    Level
                  </label>
                  <select
                    value={editForm.level}
                    onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 text-base font-medium"
                    aria-label="Course level"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleSave}
                    disabled={updating}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 font-bold text-base shadow-lg"
                  >
                    {updating ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 font-bold text-base"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Course Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8">
                  <div className="flex items-start space-x-4 mb-6 sm:mb-0">
                    <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                      <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{course.title}</h1>
                      <span className={`inline-block px-4 py-2 rounded-full text-base font-bold ${getLevelColor(course.level)} shadow-md`}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                  {isProfessor && (
                    <button
                      onClick={handleEdit}
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-base shadow-lg"
                    >
                      <Edit className="h-5 w-5" />
                      <span>Edit Course</span>
                    </button>
                  )}
                </div>

                {/* Course Description */}
                <div className="mb-8 sm:mb-10">
                  <p className="text-gray-700 text-lg sm:text-xl leading-relaxed font-medium">{course.description}</p>
                </div>

                {/* Enrollment Section */}
                <div className="border-t-2 border-gray-200 pt-8">
                  {!isAuthenticated ? (
                    <div className="text-center">
                      <p className="text-gray-700 mb-6 text-lg font-medium">Please sign in to enroll in this course.</p>
                      <Link
                        href="/login"
                        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-lg shadow-lg"
                      >
                        Sign In
                      </Link>
                    </div>
                  ) : !isEnrolled ? (
                    <div className="text-center">
                      <p className="text-gray-700 mb-6 text-lg font-medium">Choose your role to enroll in this course:</p>
                      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <button
                          onClick={() => handleEnroll('student')}
                          disabled={enrolling}
                          className="flex items-center justify-center space-x-3 px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 font-bold text-lg shadow-lg transition-all duration-200"
                        >
                          <Users className="h-6 w-6" />
                          <span>Enroll as Student</span>
                        </button>
                        <button
                          onClick={() => handleEnroll('professor')}
                          disabled={enrolling}
                          className="flex items-center justify-center space-x-3 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 font-bold text-lg shadow-lg transition-all duration-200"
                        >
                          <Edit className="h-6 w-6" />
                          <span>Enroll as Professor</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      {showSuccess ? (
                        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-green-500 text-white rounded-full font-bold text-lg shadow-lg animate-pulse">
                          <CheckCircle className="h-6 w-6 animate-bounce" />
                          <span>Successfully Enrolled!</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-green-500 text-white rounded-full font-bold text-lg shadow-lg">
                          <Users className="h-6 w-6" />
                          <span>Enrolled as {userEnrollment?.role}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 