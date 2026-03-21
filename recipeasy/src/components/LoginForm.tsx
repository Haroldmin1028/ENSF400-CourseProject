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

      {/* Main Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative z-10">
        {/* Logo/Brand Section */}
        <div className="flex items-center justify-center text-center mb-8">
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
          <div className="h-px bg-[#9CAF88] flex-1"></div>
        </div>

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