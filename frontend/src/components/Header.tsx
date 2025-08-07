'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { LogOut, User, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-2xl border-b-2 border-blue-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">EdTech</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 px-4 py-3 rounded-lg text-base font-bold transition-colors duration-200 hover:bg-blue-50"
            >
              Courses
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 px-4 py-3 rounded-lg text-base font-bold transition-colors duration-200 hover:bg-blue-50"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-base font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
                  <User className="h-5 w-5" />
                  <span className="max-w-32 truncate">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg text-base font-bold transition-colors duration-200 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-bold hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 p-3 rounded-lg hover:bg-blue-50"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-blue-200 bg-white shadow-lg">
            <div className="px-4 pt-4 pb-4 space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 rounded-lg text-lg font-bold transition-colors duration-200 hover:bg-blue-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Courses
              </Link>
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 rounded-lg text-lg font-bold transition-colors duration-200 hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>
            
            {/* Mobile User Menu */}
            <div className="px-4 pt-2 pb-4 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg">
                    <User className="h-5 w-5" />
                    <span className="text-base font-bold">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 text-gray-700 hover:text-red-600 px-4 py-3 rounded-lg text-lg font-bold transition-colors duration-200 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block w-full text-center bg-blue-600 text-white px-6 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 