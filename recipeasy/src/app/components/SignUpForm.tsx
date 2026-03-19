"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Sign up:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#9CAF88] flex items-center justify-center p-4 relative overflow-hidden">

        {/* Main Card */}
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative z-10">
            {/* Logo/Brand Section */}
            <div className="text-center mb-8">
                <Image
                  src="/recipeasylogo.png"
                  alt="RecipEasy Logo"
                  width={200}
                  height={200}
                  className="mx-auto"
                  priority
                />
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-[#9CAF88] flex-1"></div>
            {/* <Star className="w-3 h-3 fill-[#F4D03F] text-[#F4D03F] mx-3" /> */}
            <div className="h-px bg-[#9CAF88] flex-1"></div>
            </div>

            <h2 className="text-center text-[#4a5240] mb-6">Create Your Account</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="name" className="text-[#4a5240]">Full Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-[#4a5240]">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="text-[#4a5240]">
                Password
                </label>
                <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-[#4a5240]">
                Confirm Password
                </label>
                <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white"
                />
            </div>

            <button type="submit">
                Sign Up
            </button>
            </form>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center my-6">
            <div className="h-px bg-[#9CAF88] flex-1"></div>
            <span className="px-3 text-sm text-[#4a5240]/70">or</span>
            <div className="h-px bg-[#9CAF88] flex-1"></div>
            </div>

            <div className="text-center">
            <p className="text-[#4a5240]/70">
                Already have an account?{" "}
                <Link
                href="/login"
                className="text-[#6B4423] hover:text-[#8B5A2B] font-medium transition-colors"
                >
                Log In
                </Link>
            </p>
            </div>
        </div>
    </div>
  );
}
