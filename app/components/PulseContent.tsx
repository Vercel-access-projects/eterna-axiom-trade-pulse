import React from 'react';
import { Zap, BarChart3, HelpCircle, Grid3x3, TableProperties } from 'lucide-react';
import TokenCard from './TokenCard';

interface ColumnProps {
  title: string;
  count: number;
  badges?: string[];
  tokens: any[];
}

function Column({ title, count, badges = [], tokens }: ColumnProps) {
  return (
    <div className="flex-1 min-w-0 flex flex-col">
      {/* Column Header - Fixed */}
      <div className="flex-shrink-0 pb-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <h2 className="text-white font-semibold">{title}</h2>
            <span className="text-gray-500 text-sm">{count}</span>
          </div>
          <div className="flex items-center gap-2">
            {badges.map((badge, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">
                {badge}
              </span>
            ))}
            <button className="p-1 hover:bg-gray-800 rounded">
              <span className="text-gray-400 text-xs">⚡</span>
            </button>
          </div>
        </div>
      </div>

      {/* Token Cards - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pt-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        {tokens.map((token, idx) => (
          <TokenCard key={idx} {...token} />
        ))}
      </div>
    </div>
  );
}

export default function PulseContent() {
  const newPairsTokens = [
    {
      image: '/api/placeholder/64/64',
      name: '150',
      ticker: '150',
      timeAgo: '4s',
      marketCap: '$33.1K',
      volume: '$0',
      price: '$0',
      holders: 0,
      replies: 0,
      liquidity: '1977/56677',
      percentages: { change1h: 0, change6h: 0, change24h: 0 },
      creator: 's6Go...yBLV',
      txCount: 1
    },
    {
      image: '/api/placeholder/64/64',
      name: 'JBI',
      ticker: 'Just Build It',
      timeAgo: '4s',
      marketCap: '$4.97K',
      volume: '$242',
      price: '$242',
      holders: 1,
      replies: 1,
      liquidity: '0/20',
      percentages: { change1h: 5, change6h: 5, change24h: -5 },
      creator: '2Rij...pump',
      txCount: 2
    },
    {
      image: '/api/placeholder/64/64',
      name: 'CALM',
      ticker: 'C.A.L.M',
      timeAgo: '9s',
      marketCap: '$7.21K',
      volume: '$4K',
      price: '$4K',
      holders: 22,
      replies: 0,
      liquidity: '0/28',
      percentages: { change1h: -22, change6h: 10, change24h: -14 },
      creator: 'AP5h...pump'
    },
    {
      image: '/api/placeholder/64/64',
      name: 'HYPESUI',
      ticker: 'HyperSui',
      timeAgo: '20s',
      marketCap: '$342K',
      volume: '$13K',
      price: '$13K',
      holders: 25,
      replies: 0,
      liquidity: '0/1',
      percentages: { change1h: -18, change6h: 0, change24h: -18 },
      creator: 'GG3K...buSE'
    }
  ];

  const finalStretchTokens = [
    {
      image: '/api/placeholder/64/64',
      name: 'El Jefe',
      ticker: 'El Jefe Pequeno',
      timeAgo: '17h',
      marketCap: '$27.4K',
      volume: '$14K',
      price: '$14K',
      holders: 1,
      replies: 0,
      liquidity: '0/13',
      percentages: { change1h: 0, change6h: 0, change24h: 0 },
      badges: ['fire'],
      creator: 'DfaZ...pump',
      verified: true
    },
    {
      image: '/api/placeholder/64/64',
      name: 'xAI',
      ticker: 'xAI',
      timeAgo: '18h',
      marketCap: '$4.84K',
      volume: '$12K',
      price: '$12K',
      holders: 203,
      replies: 0,
      liquidity: '0/1',
      percentages: { change1h: -44, change6h: -28, change24h: -12 },
      creator: 'HAc4...yMkc',
      verified: true
    },
    {
      image: '/api/placeholder/64/64',
      name: 'Experiment',
      ticker: 'The Mushroom Experime',
      timeAgo: '17h',
      marketCap: '$335K',
      volume: '$12K',
      price: '$12K',
      holders: 3,
      replies: 0,
      liquidity: '20/21',
      percentages: { change1h: -25, change6h: 18, change24h: 4 },
      badges: ['fire'],
      creator: '9byn...7qAn'
    },
    {
      image: '/api/placeholder/64/64',
      name: 'Experiment',
      ticker: 'The Mushroom Experime',
      timeAgo: '17h',
      marketCap: '$25.8K',
      volume: '$14K',
      price: '$14K',
      holders: 3,
      replies: 0,
      liquidity: '20/21',
      percentages: { change1h: -99, change6h: -50, change24h: -50 },
      creator: 'CaJD...T3ev'
    }
  ];

  const migratedTokens = [
    {
      image: '/api/placeholder/64/64',
      name: 'spirit',
      ticker: 'spirit in an air vent',
      timeAgo: '26s',
      marketCap: '$369K',
      volume: '$14K',
      price: '$14K',
      holders: 106,
      replies: 0,
      liquidity: '9/9',
      percentages: { change1h: -100, change6h: 0, change24h: -17 },
      badges: ['graduated'],
      creator: '9jv7...3J38',
      txCount: 206
    },
    {
      image: '/api/placeholder/64/64',
      name: 'crypto guy',
      ticker: 'crypto guy',
      timeAgo: '37s',
      marketCap: '$31.9K',
      volume: '$16K',
      price: '$16K',
      holders: 150,
      replies: 0,
      liquidity: '26/126',
      percentages: { change1h: -9, change6h: 0, change24h: -50 },
      badges: ['graduated'],
      creator: '55eX...4444'
    },
    {
      image: '/api/placeholder/64/64',
      name: 'STIMMY',
      ticker: 'Stimmy Checks',
      timeAgo: '1m',
      marketCap: '$1.16M',
      volume: '$27K',
      price: '$27K',
      holders: 136,
      replies: 0,
      liquidity: '174/183',
      percentages: { change1h: -97, change6h: 0, change24h: -19 },
      badges: ['graduated'],
      creator: '6ejy...DCpo'
    },
    {
      image: '/api/placeholder/64/64',
      name: 'Coconuted',
      ticker: 'Coconuted',
      timeAgo: '1m',
      marketCap: '$83.3K',
      volume: '$86K',
      price: '$86K',
      holders: 286,
      replies: 51,
      liquidity: '1/1',
      percentages: { change1h: -16, change6h: 0, change24h: 0 },
      badges: ['graduated'],
      creator: 'E1Nx...pump'
    }
  ];

  return (
    <div className="fixed top-[60px] bottom-[60px] left-0 right-0 flex flex-col">
      {/* Page Header - Fixed */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-800 bg-[#0a0a0a]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-2xl font-bold flex items-center gap-2">
              Pulse
              <span className="text-blue-500">≡</span>
              <span className="text-yellow-500">🎁</span>
            </h1>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <HelpCircle className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm flex items-center gap-2 transition-colors">
              <BarChart3 className="w-4 h-4" />
              Display
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Grid3x3 className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <TableProperties className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <span className="text-gray-400">🔊</span>
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <span className="text-gray-400">⚙️</span>
            </button>
            <div className="flex items-center gap-1 px-3 py-2 bg-gray-800 rounded-lg">
              <span className="text-white text-sm">1</span>
              <span className="text-blue-500 text-sm">≡</span>
              <span className="text-white text-sm">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Three Column Layout - Scrollable */}
      <div className="flex-1 flex gap-4 px-6 py-4 overflow-hidden">
        <Column title="New Pairs" count={0} badges={['≡', 'P1', 'P2', 'P3', '⚡']} tokens={newPairsTokens} />
        <Column title="Final Stretch" count={0} badges={['≡', 'P1', 'P2', 'P3', '⚡']} tokens={finalStretchTokens} />
        <Column title="Migrated" count={0} badges={['≡', 'P1', 'P2', 'P3', '⚡']} tokens={migratedTokens} />
      </div>
    </div>
  );
}
