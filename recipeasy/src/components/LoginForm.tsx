"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    // Mock login functionality
  };

  return (
    <div className="min-h-screen bg-[#9CAF88] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Corner Borders */}
      <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M 10 10 Q 10 10 40 15 Q 60 18 80 12 Q 100 6 110 20 M 110 20 Q 115 30 108 45 Q 100 65 110 80 M 15 10 L 15 110 M 18 15 Q 20 50 15 80 Q 12 100 18 110"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          <circle cx="30" cy="25" r="3" fill="white" opacity="0.6" />
          <circle cx="50" cy="30" r="2" fill="white" opacity="0.6" />
          <circle cx="25" cy="50" r="2" fill="white" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none rotate-90">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M 10 10 Q 10 10 40 15 Q 60 18 80 12 Q 100 6 110 20 M 110 20 Q 115 30 108 45 Q 100 65 110 80 M 15 10 L 15 110 M 18 15 Q 20 50 15 80 Q 12 100 18 110"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          <circle cx="30" cy="25" r="3" fill="white" opacity="0.6" />
          <circle cx="50" cy="30" r="2" fill="white" opacity="0.6" />
          <circle cx="25" cy="50" r="2" fill="white" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none -rotate-90">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M 10 10 Q 10 10 40 15 Q 60 18 80 12 Q 100 6 110 20 M 110 20 Q 115 30 108 45 Q 100 65 110 80 M 15 10 L 15 110 M 18 15 Q 20 50 15 80 Q 12 100 18 110"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          <circle cx="30" cy="25" r="3" fill="white" opacity="0.6" />
          <circle cx="50" cy="30" r="2" fill="white" opacity="0.6" />
          <circle cx="25" cy="50" r="2" fill="white" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M 10 10 Q 10 10 40 15 Q 60 18 80 12 Q 100 6 110 20 M 110 20 Q 115 30 108 45 Q 100 65 110 80 M 15 10 L 15 110 M 18 15 Q 20 50 15 80 Q 12 100 18 110"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          <circle cx="30" cy="25" r="3" fill="white" opacity="0.6" />
          <circle cx="50" cy="30" r="2" fill="white" opacity="0.6" />
          <circle cx="25" cy="50" r="2" fill="white" opacity="0.6" />
        </svg>
      </div>

      {/* Logo/Brand Section */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <Image
            src="/recipeasylogo.png"
            alt="RecipEasy Logo"
            width={200}
            height={200}
            className="w-full h-auto mx-auto"
            priority
        />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative z-10">
        

        <h2 className="text-center text-[#4a5240] mb-6">Log In</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-center text-[#4a5240]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white "
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-center text-[#4a5240]">
              Password
            </Label>
            <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#6B4423] hover:bg-[#8B5A2B] text-white transition-colors"
          >
            Log In
          </Button>
        </form>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="h-px bg-[#9CAF88] flex-1"></div>
          <span className="px-3 text-sm text-[#4a5240]/70">or</span>
          <div className="h-px bg-[#9CAF88] flex-1"></div>
        </div>

        <div className="text-center">
          <p className="text-[#4a5240]/70">
            Don&apos;t have an account?{" "}
            <Link
                href="/signup"
              className="text-[#6B4423] hover:text-[#8B5A2B] font-medium transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}