"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, openAuthModal, signOut } = useAuth();

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex justify-between items-center relative">

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex flex-1 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#2C3A1E] hover:text-[#3B6B4A] focus:outline-none"
            aria-label="Toggle navigation menu"
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

        {/* Desktop Right User Auth Section */}
        <div className="hidden lg:flex flex-1 justify-end items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 bg-white/80 hover:bg-white backdrop-blur-md rounded-full border border-[#2C3A1E]/15 shadow-sm transition cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#3B6B4A] text-white flex items-center justify-center font-bold text-xs uppercase shadow-inner">
                  {user.user_metadata?.full_name?.[0] || user.email?.[0] || "U"}
                </div>
                <span className="max-w-[130px] truncate text-xs font-semibold text-[#2C3A1E]">
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 text-left">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Signed in as</p>
                    <p className="text-xs font-semibold text-gray-800 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      signOut();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal("signin")}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#2C3A1E] bg-white/70 hover:bg-white backdrop-blur-md rounded-full border border-[#2C3A1E]/15 shadow-sm transition hover:scale-105 cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#3B6B4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Right Quick Auth Button */}
        <div className="flex flex-1 justify-end items-center lg:hidden">
          {user ? (
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-8 h-8 rounded-full bg-[#3B6B4A] text-white flex items-center justify-center font-bold text-xs uppercase"
              aria-label="Account menu"
            >
              {user.user_metadata?.full_name?.[0] || user.email?.[0] || "U"}
            </button>
          ) : (
            <button
              onClick={() => openAuthModal("signin")}
              className="p-1.5 text-[#2C3A1E] bg-white/70 rounded-full"
              aria-label="Sign In"
            >
              <svg className="w-5 h-5 text-[#3B6B4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          )}
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

          {/* Mobile Auth Button */}
          <div className="pt-2 border-t border-gray-200">
            {user ? (
              <div className="flex flex-col items-center gap-1">
                <p className="text-xs text-gray-500">Signed in as {user.email}</p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                  className="text-sm font-semibold text-red-600 py-2 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  openAuthModal("signin");
                }}
                className="w-full py-2.5 bg-[#3B6B4A] text-white font-medium rounded-xl text-sm"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}