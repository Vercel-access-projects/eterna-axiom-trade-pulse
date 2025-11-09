'use client';

import React from 'react';
import { Bell, Mail, Search, Star, User } from 'lucide-react';
import SolanaIcon from './SolanaIcon';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-gray-800">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path fill="#000" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Discover
            </a>
            <a href="#" className="text-blue-500 font-medium text-sm flex items-center gap-1">
              Pulse
              {/* <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">≡</span> */}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Trackers
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Perpetuals
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Yield
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Vision
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Portfolio
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Rewards
            </a>
          </nav>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
            <SolanaIcon size={14} className="text-purple-500" />
            <span className="text-sm text-white">SOL</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            Deposit
          </button>

          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Star className="w-5 h-5 text-gray-400" />
          </button>

          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
          </button>

          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-white bg-blue-600 rounded px-1">0</span>
          </button>

          <div className="flex items-center gap-1 px-2 py-1.5 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-xs text-white">0</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <User className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
