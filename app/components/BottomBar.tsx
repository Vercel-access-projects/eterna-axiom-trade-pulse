import React from 'react';
import { Wallet, Twitter, MessageCircle, BarChart2, FileText, MessageSquare } from 'lucide-react';
import SolanaIcon from './SolanaIcon';

export default function BottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-gray-800 z-50">
      <div className="flex items-center justify-between px-6">
        {/* Left side - Presets and Stats */}
        <div className="flex items-center gap-4">
          <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors flex items-center gap-2">
            <span>⚡</span>
            PRESET 1
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded">
            <span className="text-sm text-gray-400">💼</span>
            <span className="text-sm text-white">1</span>
            <SolanaIcon size={12} className="text-purple-500" />
            <span className="text-sm text-white">0</span>
          </div>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
            <span className="text-gray-400 text-sm">⚙️</span>
          </button>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors flex items-center gap-1">
            <Wallet className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-red-500">●</span>
          </button>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
            <Twitter className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-red-500 ml-1">●</span>
          </button>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
            <MessageCircle className="w-4 h-4 text-gray-400" />
          </button>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors flex items-center gap-1">
            <span className="text-gray-400 text-sm">🎮</span>
            <span className="text-xs bg-gray-700 rounded px-1 py-0.5 text-white">2</span>
          </button>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
            <span className="text-gray-400 text-sm">🔔</span>
          </button>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
            <BarChart2 className="w-4 h-4 text-gray-400" />
          </button>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
            <span className="text-gray-400 text-sm">PnL</span>
          </button>
        </div>

        {/* Right side - Global Stats and Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5">
            <SolanaIcon size={14} className="text-purple-500" />
            <span className="text-sm text-green-500">$161.28</span>
          </div>

          <span className="text-gray-600">|</span>

          <button className="px-3 py-1.5 hover:bg-gray-800 rounded transition-colors text-sm text-gray-400 flex items-center gap-1">
            GLOBAL
          </button>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
            <span className="text-gray-400">📊</span>
          </button>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
            <span className="text-gray-400">🔔</span>
          </button>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
            <span className="text-gray-400">💬</span>
          </button>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
            <span className="text-gray-400">💬</span>
          </button>

          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
            <Twitter className="w-4 h-4 text-gray-400" />
          </button>

          <button className="px-3 py-1.5 hover:bg-gray-800 rounded transition-colors text-sm text-gray-400">
            Docs
          </button>
        </div>
      </div>
    </div>
  );
}
