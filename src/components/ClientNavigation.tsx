'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';

export default function ClientNavigation() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/explorer', label: 'Explorer' },
    { href: '/search', label: 'Responses' },
    { href: '/physics', label: 'Physics' },
    { href: '/favorites', label: 'Favorites' },
  ];

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold uppercase tracking-wide text-black dark:text-white">
              QUICK RESPONSE BACK
              <span className="inline-block w-2 h-2 bg-red-600 ml-2"></span>
            </div>
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold uppercase tracking-wide text-black dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
            QUICK RESPONSE BACK
            <span className="inline-block w-2 h-2 bg-red-600 ml-2"></span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                      isActive 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
