"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ChefHat, X } from "lucide-react";

export default function MenuBar() {
    return (
        <div className="bg-[#9CB688] backdrop-blur-sm shadow-md border-b-2 border-[#6B4423]/20">
            <div className="px-4 py-4 flex items-center justify-between">
                <Image src="/recipeasylogo.png" alt="RecipEasy Logo" className="h-16 w-auto" width="500" height="0"/>
                <nav className="flex items-center gap-6">
                <Link
                    href="/search"
                    className="flex items-center gap-2 text-[#6B4423] hover:text-[#8B5A2B] transition-colors"
                >
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                </Link>
                <Link
                    href="/account"
                    className="flex items-center gap-2 text-[#6B4423] hover:text-[#8B5A2B] transition-colors"
                >
                    <ChefHat className="w-5 h-5" />
                    <span>Account</span>
                </Link>
                <Link
                    href="/login"
                    className="flex items-center gap-2 text-[#6B4423] hover:text-[#8B5A2B] transition-colors"
                >
                    <X className="w-5 h-5" />
                    <span>Sign Out</span>
                </Link>
                </nav>
            </div>
        </div>
    )
}
    