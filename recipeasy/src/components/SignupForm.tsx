"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  */
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    console.log("Sign up:", formData);
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;

      const user = data.user;
      if (!user) {
        throw new Error("User not returned");
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: user.id, // ✅ REQUIRED
          username: formData.email,
          full_name: formData.name,
          email: formData.email,
        });

      if (profileError) throw profileError;
      //FIXME one of these is throwing the following error:
      //Failed to load resource: the server responded with a status of 422 ()
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
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

          <h2 className="text-center text-[#4a5240] mb-6 font-bold">Create Your Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
              <Label htmlFor="name" className="text-[#4a5240]">
                Full Name
              </Label>
              <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white text-black"
              />
          </div>

          <div className="space-y-2">
              <Label htmlFor="email" className="text-[#4a5240]">
                  Email
              </Label>
              <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white text-black"
              />
          </div>

          <div className="space-y-2">
              <Label htmlFor="password" className="text-[#4a5240]">
              Password
              </Label>
              <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white text-black"
              />
          </div>

          <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#4a5240]">
              Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white text-black"
              />
          </div>

          <Button type="submit" className="w-full bg-[#6B4423] hover:bg-[#8B5A2B] text-white transition-colors"  disabled={isLoading}>
              Sign Up
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
