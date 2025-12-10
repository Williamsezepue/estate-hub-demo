"use client";


import { Heart, Home } from "lucide-react";
import { provider } from "@/app/components/provider";

export default function Navbar() {
  const { cart, favorites } = provider();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-linear-to-br from-blue-600 to-purple-600 p-2 w-10 h-10 flex items-center justify-center shadow-lg">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Estate Hub</div>
            <div className="text-xs text-gray-500">Premium Properties</div>
          </div>
        </div>

        <nav className="hidden mdlg:flex gap-6 text-sm">
          <a href="#properties" className="hover:text-blue-600 transition">Featured</a>
          <a href="#market" className="hover:text-blue-600 transition">Market</a>
          <a href="#agents" className="hover:text-blue-600 transition">Agents</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </nav>

        <div className="flex justify-end sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition">
                <Heart className="w-5 h-5" />
              </button>
              {favorites.size > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{favorites.size}</span>
              )}
            </div>
            <a href="#contact" className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition">
              Inquire Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

