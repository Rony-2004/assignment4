'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { useAuthStore } from '@/store/auth-store';
import { User } from '@/types';
import { GET_USERS } from '@/graphql/queries';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      setIsLoading(true);
      const user = usersData?.users?.find((u: User) => u.id === selectedUser);
      if (user) {
        login(user);
        // Redirect to courses page after successful login
        router.push('/');
      }
      setIsLoading(false);
    }
  };

  if (usersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="flex flex-col items-center space-y-4 p-8">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <span className="text-white text-lg">Loading users...</span>
        </div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="text-center p-8 max-w-md">
          <div className="text-red-400 text-xl font-medium mb-3">
            Error loading users
          </div>
          <div className="text-gray-300">
            Please try again later or check your connection.
          </div>
        </div>
      </div>
    );
  }

  const users: User[] = usersData?.users || [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md space-y-6 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-blue-200">
        <div>
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-600 mb-6 shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Welcome Back
          </h2>
          <p className="text-center text-base text-gray-700 font-medium">
            Select a user to continue to EdTech Platform
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="user-select" className="block text-base font-bold text-gray-900 mb-3">
              Choose User Account
            </label>
            <select
              id="user-select"
              name="user"
              required
              className="block w-full px-4 py-4 border-2 border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-base font-bold transition duration-150 ease-in-out bg-white text-black"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              style={{
                color: 'black',
                backgroundColor: 'white'
              }}
            >
              <option value="" className="text-gray-500 font-medium">Select a user...</option>
              {users.map((user) => (
                <option 
                  key={user.id} 
                  value={user.id}
                  className="text-black font-bold bg-white hover:bg-blue-100"
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={!selectedUser || isLoading}
              className="group relative w-full flex justify-center py-4 px-6 border-2 border-transparent text-lg font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out transform hover:scale-105 shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="hidden sm:inline">Signing in...</span>
                  <span className="sm:hidden">Signing...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium">
            This is a demo application. Select any user to explore the platform.
          </p>
        </div>
      </div>
    </div>
  );
} 