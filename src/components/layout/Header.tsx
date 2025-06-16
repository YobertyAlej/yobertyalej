"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Menu, X, Sun, Moon } from '../ui/Icons';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Aquí puedes agregar la lógica para cambiar el tema
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* LOGO - Mobile First */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-lg sm:text-xl font-bold text-white hover:text-orange-400 transition-colors"
              onClick={closeMenu}
            >
              Portfolio<span className="text-orange-500">.</span>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Inicio
            </Link>
            <Link 
              href="/about" 
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Sobre Mí
            </Link>
            <Link 
              href="/about#contact" 
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Contacto
            </Link>
          </nav>

          {/* RIGHT SECTION - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-300 hover:text-white transition-colors"
              aria-label="Cambiar tema"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Button 
              variant="outline" 
              size="sm" 
              className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
            >
              Versión 1.0.0
            </Button>
          </div>

          {/* MOBILE RIGHT SECTION */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-800 focus:outline-none text-slate-300 hover:text-white transition-colors"
              aria-label="Cambiar tema"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-300 hover:text-white transition-colors"
              aria-label="Abrir menú"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU - Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-900/98 backdrop-blur-sm">
            <nav className="py-4 space-y-2">
              <Link 
                href="/" 
                className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all font-medium"
                onClick={closeMenu}
              >
                Inicio
              </Link>
              <Link 
                href="/about" 
                className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all font-medium"
                onClick={closeMenu}
              >
                Sobre Mí
              </Link>
              <Link 
                href="/about#contact" 
                className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all font-medium"
                onClick={closeMenu}
              >
                Contacto
              </Link>
              
              {/* Version Badge Mobile */}
              <div className="px-4 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
                >
                  Versión 1.0.0
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}