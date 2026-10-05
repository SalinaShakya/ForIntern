"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex justify-between items-center relative">

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex flex-1 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#2C3A1E] hover:text-[#3B6B4A] focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-8 text-lg font-medium flex-1">
          <Link href="/" className="text-[#2C3A1E] hover:text-[#3B6B4A] transition">
            Home
          </Link>
          <Link href="/news" className="text-[#2C3A1E] hover:text-[#3B6B4A] transition">
            News
          </Link>
          <Link href="/products" className="text-[#2C3A1E] hover:text-[#3B6B4A] transition">
            Products
          </Link>
          <Link href="/contact" className="text-[#2C3A1E] hover:text-[#3B6B4A] transition">
            Contact
          </Link>
        </div>

        {/* Centered Image Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            <Image
              src="/images/logo1.png"
              alt="Herbal Tea"
              width={600}
              height={450}
              className="h-12 lg:h-16 w-auto object-contain hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Right Logo Text (Desktop Only) */}
        <div className="hidden lg:flex flex-1 justify-end">
          <Link
            href="/"
            className="text-3xl font-bold text-[#3B6B4A] tracking-wide"
          >
            {/* Nepal Tea */}
          </Link>
        </div>

        {/* Invisible spacer for mobile to keep logo perfectly centered */}
        <div className="flex flex-1 justify-end lg:hidden">
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-md py-4 px-4 flex flex-col gap-4 text-center z-40 border-t border-gray-200">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-xl font-medium text-[#2C3A1E] hover:text-[#3B6B4A] py-2">
            Home
          </Link>
          <Link href="/news" onClick={() => setIsOpen(false)} className="text-xl font-medium text-[#2C3A1E] hover:text-[#3B6B4A] py-2">
            News
          </Link>
          <Link href="/products" onClick={() => setIsOpen(false)} className="text-xl font-medium text-[#2C3A1E] hover:text-[#3B6B4A] py-2">
            Products
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-xl font-medium text-[#2C3A1E] hover:text-[#3B6B4A] py-2">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}