"use client";

import { useState } from "react";
import { Star, Edit2, Save, X, ChefHat } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from 'react';


export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "[password changing not implemented]",
    bio: "",
  });

  useEffect(() => {
    // This code runs once after the initial render
    console.log("Page has loaded on the client!");
    
    const loadUser = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession()
        const userID = session?.user?.id; //does display expected id, that is the primary key of an entry in the profiles table
        console.log(`userID = ${userID}`);
        const { data, error } = await supabase //FIXME AccountPage.tsx:32 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'user')
          .from('profiles')
          .select()
          .eq('id', userID)
          .single();
        if (error) throw error;
        if (!data) {
          throw new Error("User not returned");
        }
        const user = data;
        setProfile({
          username: user.username,
          email: user.email,
          fullName: user.full_name,
          password: profile.password,
          bio: user.bio
        });
        console.log("user data loaded")
      } catch (err) {
        console.error("Update failed:", err);
      }
    };
    loadUser();
  }, []); // Empty dependency array ensures it only runs once

  const [editedProfile, setEditedProfile] = useState(profile);

  // Placeholder recipes
  const userRecipes = [
    {
      id: 1,
      title: "Classic Chocolate Chip Cookies",
      category: "Dessert",
      prepTime: "15 min",
      image: "/chocolate-chip-cookies.png",
    },
    {
      id: 2,
      title: "Homemade Pasta Carbonara",
      category: "Main Course",
      prepTime: "30 min",
      image: "/carbonara.jpg",
    },
    {
      id: 3,
      title: "Fresh Garden Salad",
      category: "Salad",
      prepTime: "10 min",
      image: "/salad.jpg",
    },
    {
      id: 4,
      title: "Lemon Herb Roasted Chicken",
      category: "Main Course",
      prepTime: "1 hour",
      image: "/roasted-chicken.jpg",
    },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = async () => {
    setProfile(editedProfile);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession()
      const userId = session?.user?.id
      const { error } = await supabase
        .from('profiles')
        .update({ username: profile.username, full_name: profile.fullName, bio: profile.bio, email: profile.email })
        .eq('id', userId)
      if (error) throw error;
    } catch (err) {
      console.error("Update failed:", err);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    if (field != 'password') //TODO remove once password changing is implemented
      setEditedProfile({ ...editedProfile, [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#9CAF88] relative overflow-hidden">
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-[#9CAF88] rounded-full flex items-center justify-center">
                <ChefHat className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl text-[#4a5240] mb-1">
                  {isEditing ? editedProfile.username : profile.username}
                </h1>
                <p className="text-[#6B4423]">{profile.email}</p>
              </div>
            </div>
            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="bg-[#6B4423] hover:bg-[#8B5A2B] text-white"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-[#6B4423] hover:bg-[#8B5A2B] text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-[#6B4423] text-[#6B4423] hover:bg-[#6B4423]/10"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-[#9CAF88] flex-1"></div>
            <Star className="w-3 h-3 fill-[#F4D03F] text-[#F4D03F] mx-3" />
            <div className="h-px bg-[#9CAF88] flex-1"></div>
          </div>

          {/* Profile Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#4a5240]">
                Username
              </Label>
              <Input
                id="username"
                value={isEditing ? editedProfile.username : profile.username}
                onChange={(e) => handleChange("username", e.target.value)}
                disabled={!isEditing}
                className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white disabled:opacity-100 disabled:cursor-default text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#4a5240]">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={isEditing ? editedProfile.fullName : profile.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                disabled={!isEditing}
                className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white disabled:opacity-100 disabled:cursor-default text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#4a5240]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={isEditing ? editedProfile.email : profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={!isEditing}
                className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white disabled:opacity-100 disabled:cursor-default text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#4a5240]">
                Password
              </Label>
              <Input
                id="password"
                type="text" //TODO change this back to "password" once password changing works
                value={isEditing ? editedProfile.password : profile.password}
                onChange={(e) => handleChange("password", e.target.value)}
                disabled={!isEditing}
                className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white disabled:opacity-100 disabled:cursor-default text-black"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio" className="text-[#4a5240]">
                Bio
              </Label>
              <Input
                id="bio"
                value={isEditing ? editedProfile.bio : profile.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                disabled={!isEditing}
                className="border-[#9CAF88] focus:border-[#6B4423] focus:ring-[#6B4423]/20 bg-white disabled:opacity-100 disabled:cursor-default text-black"
              />
            </div>
          </div>
        </div>

        {/* My Recipes Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#4a5240]">My Recipes</h2>
            <div className="flex items-center gap-2 text-[#6B4423]">
              <span className="text-sm">{userRecipes.length} recipes</span>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-[#9CAF88] flex-1"></div>
            <Star className="w-3 h-3 fill-[#F4D03F] text-[#F4D03F] mx-3" />
            <div className="h-px bg-[#9CAF88] flex-1"></div>
          </div>

          {/* Recipe Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="overflow-hidden border-2 border-[#9CAF88] hover:border-[#6B4423] transition-colors cursor-pointer group"
              >
                <div className="aspect-square bg-[#9CAF88]/20 overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={100}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-[#4a5240] mb-2">{recipe.title}</h3>
                  <div className="flex items-center justify-between text-sm text-[#6B4423]">
                    <span>{recipe.category}</span>
                    <span>{recipe.prepTime}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}