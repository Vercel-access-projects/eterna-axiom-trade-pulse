'use client';

import React, { useState, useMemo } from 'react';
import { Zap, ArrowUpDown, Clock, DollarSign, TrendingUp, Users, BarChart3, Grid3x3, TableProperties, Menu, Plus, Filter, SlidersHorizontal } from 'lucide-react';
import EnhancedTokenCard from './EnhancedTokenCard';
import { TokenCardSkeleton } from './Skeleton';
import ErrorBoundary from './ErrorBoundary';
import Tooltip from './Tooltip';
import Popover from './Popover';
import SolanaIcon from './SolanaIcon';

type SortOption = 'time' | 'marketCap' | 'volume' | 'holders' | 'change1h' | 'change24h';
type SortDirection = 'asc' | 'desc';

interface ColumnProps {
  title: string;
  count: number;
  badges?: string[];
  tokens: any[];
  isLoading?: boolean;
  columnType: 'new-pairs' | 'final-stretch' | 'migrated';
}

function Column({ title, count, badges = [], tokens, isLoading = false, columnType }: ColumnProps) {
  const [sortBy, setSortBy] = useState<SortOption>('time');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedTokens = useMemo(() => {
    const sorted = [...tokens].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'time':
          const parseTime = (time: string) => {
            const num = parseInt(time);
            if (time.includes('s')) return num;
            if (time.includes('m')) return num * 60;
            if (time.includes('h')) return num * 3600;
            if (time.includes('d')) return num * 86400;
            return 0;
          };
          aValue = parseTime(a.timeAgo);
          bValue = parseTime(b.timeAgo);
          break;

        case 'marketCap':
          const parseMC = (mc: string) => {
            const num = parseFloat(mc.replace(/[$,K]/g, ''));
            if (mc.includes('M')) return num * 1000000;
            if (mc.includes('K')) return num * 1000;
            return num;
          };
          aValue = parseMC(a.marketCap);
          bValue = parseMC(b.marketCap);
          break;

        case 'volume':
          const parseVol = (vol: string) => {
            const num = parseFloat(vol.replace(/[$,K]/g, ''));
            if (vol.includes('M')) return num * 1000000;
            if (vol.includes('K')) return num * 1000;
            return num;
          };
          aValue = parseVol(a.volume);
          bValue = parseVol(b.volume);
          break;

        case 'holders':
          aValue = a.holders || 0;
          bValue = b.holders || 0;
          break;

        case 'change1h':
          aValue = a.change1h || 0;
          bValue = b.change1h || 0;
          break;

        case 'change24h':
          aValue = a.change24h || 0;
          bValue = b.change24h || 0;
          break;

        default:
          return 0;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  }, [tokens, sortBy, sortDirection]);

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('desc');
    }
  };
  return (
    <div className="flex-1 min-w-0 flex flex-col border-r border-gray-800 last:border-r-0">
      {/* Column Header - Fixed */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-800 relative">
        {/* Loading shimmer overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-shimmer" />
        )}
        
        <div className="flex items-center justify-between gap-3 relative z-10">
          {/* Left side - Title */}
          <div className="flex items-center gap-2">
            <h2 className="text-white font-semibold text-lg">{title}</h2>
          </div>
          
          {/* Right side - Controls */}
          <div className="flex items-center gap-2">
            {/* Main pill container - transparent background with 2 sections */}
            <div className="flex items-center border border-gray-700 rounded-full overflow-hidden hover:bg-gray-800/30 transition-colors">
              {/* Left section - Count and Sort */}
              <div className="flex items-center gap-3 px-3 py-1.5">
                {/* Count with icon */}
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-sm">{count}</span>
                </div>
                
                {/* Sort Button with Popover */}
                <Popover
                  trigger={
                    <div className="cursor-pointer hover:opacity-80 transition-opacity">
                      <Tooltip content="Sort tokens">
                        <SolanaIcon size={14} className="text-blue-500" />
                      </Tooltip>
                    </div>
                  }
                  position="bottom"
                >
                  <div className="py-2 w-48">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Sort by</div>
                    {[
                      { value: 'time' as SortOption, label: 'Time', icon: <Clock className="w-3 h-3" /> },
                      { value: 'marketCap' as SortOption, label: 'Market Cap', icon: <DollarSign className="w-3 h-3" /> },
                      { value: 'volume' as SortOption, label: 'Volume', icon: <TrendingUp className="w-3 h-3" /> },
                      { value: 'holders' as SortOption, label: 'Holders', icon: <Users className="w-3 h-3" /> },
                      { value: 'change1h' as SortOption, label: '1h Change', icon: <ArrowUpDown className="w-3 h-3" /> },
                      { value: 'change24h' as SortOption, label: '24h Change', icon: <ArrowUpDown className="w-3 h-3" /> },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSort(option.value)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-colors flex items-center justify-between ${
                          sortBy === option.value ? 'text-cyan-400' : 'text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {option.icon}
                          <span>{option.label}</span>
                        </div>
                        {sortBy === option.value && (
                          <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </Popover>
              </div>

              {/* Vertical divider */}
              <div className="h-6 w-px bg-gray-700"></div>

              {/* Right section - Priority badges */}
              <div className="flex items-center gap-2 px-3 py-1.5">
                <Tooltip content="Priority 1">
                  <span className="text-blue-500 text-sm font-semibold cursor-pointer hover:text-cyan-400 transition-colors">P1</span>
                </Tooltip>
                <Tooltip content="Priority 2">
                  <span className="text-gray-400 text-sm font-semibold cursor-pointer hover:text-cyan-400 transition-colors">P2</span>
                </Tooltip>
                <Tooltip content="Priority 3">
                  <span className="text-gray-400 text-sm font-semibold cursor-pointer hover:text-cyan-400 transition-colors">P3</span>
                </Tooltip>
              </div>
            </div>

            {/* Filter button - OUTSIDE the pill */}
            <Tooltip content="Filter tokens">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Token Cards - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        <ErrorBoundary>
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, idx) => (
                <div 
                  key={idx}
                  className="progressive-load"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <TokenCardSkeleton />
                </div>
              ))}
            </>
          ) : (
            sortedTokens.map((token, idx) => (
              <div
                key={`${token.name}-${idx}`}
                className="progressive-load"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <EnhancedTokenCard 
                  tokenId={`${token.name.toLowerCase()}-${idx}`}
                  columnType={columnType}
                  {...token} 
                />
              </div>
            ))
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default function PulseContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate progressive loading
  React.useEffect(() => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    // Progressive loading animation
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  const newPairsTokens = [
    {
      image: 'https://picsum.photos/seed/pcc1/80/80',
      name: 'PCC1',
      ticker: 'grapeseed compound, PCC1',
      timeAgo: '1m',
      marketCap: '$4.84K',
      volume: '$477',
      price: '477',
      liquidity: '0.025',
      liquidityRatio: '0.025',
      txCount: 8,
      holders: 1,
      replies: 0,
      topHoldersRatio: '0/21',
      change1h: 4,
      hasBonding: 'DS',
      timeLabel: '3mo',
      change6h: 0,
      change24h: 0,
      isVerified: true,
      hasFlag: true,
      creator: 'FgLB...LSoe'
    },
    {
      image: 'https://picsum.photos/seed/nvidia/80/80',
      name: 'NVIDIA',
      ticker: 'NVIDIA MEME Token',
      timeAgo: '39s',
      marketCap: '$145K',
      volume: '$7K',
      price: '7K',
      liquidity: '0.022',
      liquidityRatio: '224/248',
      txCount: 64,
      holders: 47,
      replies: 0,
      topHoldersRatio: '0/20',
      change1h: -15,
      change6h: 0,
      timeLabel: '2d',
      change24h: 14,
      creator: 'FWX5...nkWg'
    },
    {
      image: 'https://picsum.photos/seed/spirit/80/80',
      name: 'spirit',
      ticker: 'spirit in an air vent',
      timeAgo: '59s',
      marketCap: '$335K',
      volume: '$13K',
      price: '13K',
      liquidity: '0.024',
      liquidityRatio: '10/11',
      txCount: 122,
      holders: 107,
      replies: 1,
      topHoldersRatio: '0/28',
      change1h: -17,
      change6h: 0,
      timeLabel: '2mo',
      creator: '8yPa...8YKr'
    },
    {
      image: 'https://picsum.photos/seed/pumprun/80/80',
      name: 'PumpRun',
      ticker: 'PumpRun',
      timeAgo: '1m',
      marketCap: '$4.5K',
      volume: '$2K',
      price: '2K',
      liquidity: '0.017',
      liquidityRatio: '0/20',
      txCount: 9,
      holders: 0,
      replies: 0,
      topHoldersRatio: '0/20',
      change1h: 0,
      hasBonding: 'DS',
      timeLabel: '1m',
      creator: '9ouG...pump'
    },
    {
      image: 'https://picsum.photos/seed/doge420/80/80',
      name: 'DOGE420',
      ticker: 'Doge 420 Blaze It',
      timeAgo: '2m',
      marketCap: '$89K',
      volume: '$5.2K',
      price: '5.2K',
      liquidity: '0.0₃1',
      liquidityRatio: '45/120',
      txCount: 34,
      holders: 23,
      replies: 2,
      topHoldersRatio: '5/45',
      change1h: 12,
      change6h: -3,
      timeLabel: '4h',
      change24h: 8,
      creator: 'Kj8X...mPko'
    },
    {
      image: 'https://picsum.photos/seed/moonshot/80/80',
      name: 'MOONSHOT',
      ticker: 'To The Moon',
      timeAgo: '3m',
      marketCap: '$12.3K',
      volume: '$890',
      price: '890',
      liquidity: '0.028',
      liquidityRatio: '12/50',
      txCount: 15,
      holders: 8,
      replies: 0,
      topHoldersRatio: '2/12',
      change1h: -5,
      hasBonding: 'DS',
      timeLabel: '2h',
      creator: 'Lm9Y...pTvq'
    },
    {
      image: 'https://picsum.photos/seed/pepe2024/80/80',
      name: 'PEPE2024',
      ticker: 'Pepe Election',
      timeAgo: '4m',
      marketCap: '$234K',
      volume: '$18K',
      price: '18K',
      liquidity: '0.023',
      liquidityRatio: '156/200',
      txCount: 89,
      holders: 134,
      replies: 5,
      topHoldersRatio: '12/156',
      change1h: 25,
      change6h: 15,
      timeLabel: '6h',
      change24h: 45,
      isVerified: true,
      creator: 'Nm4P...kLwd'
    },
    {
      image: 'https://picsum.photos/seed/solcat/80/80',
      name: 'SOLCAT',
      ticker: 'Solana Cat',
      timeAgo: '5m',
      marketCap: '$67K',
      volume: '$3.4K',
      price: '3.4K',
      liquidity: '0.026',
      liquidityRatio: '78/150',
      txCount: 42,
      holders: 56,
      replies: 1,
      topHoldersRatio: '8/78',
      change1h: -8,
      change6h: 2,
      timeLabel: '5h',
      creator: 'Op2R...nBvx'
    },
    {
      image: 'https://picsum.photos/seed/wagmi/80/80',
      name: 'WAGMI',
      ticker: 'We All Gonna Make It',
      timeAgo: '6m',
      marketCap: '$156K',
      volume: '$9.8K',
      price: '9.8K',
      liquidity: '0.021',
      liquidityRatio: '234/300',
      txCount: 67,
      holders: 89,
      replies: 3,
      topHoldersRatio: '15/234',
      change1h: 18,
      hasBonding: 'DS',
      timeLabel: '8h',
      change24h: 22,
      creator: 'Pq7S...mXyz'
    },
    {
      image: 'https://picsum.photos/seed/bonk2/80/80',
      name: 'BONK2',
      ticker: 'Bonk Second Coming',
      timeAgo: '7m',
      marketCap: '$445K',
      volume: '$28K',
      price: '28K',
      liquidity: '0.019',
      liquidityRatio: '567/600',
      txCount: 156,
      holders: 234,
      replies: 8,
      topHoldersRatio: '23/567',
      change1h: -12,
      change6h: 5,
      timeLabel: '12h',
      change24h: -3,
      hasFlag: true,
      creator: 'Qr8T...nCde'
    }
  ];

  const finalStretchTokens = [
    {
      image: 'https://picsum.photos/seed/eljefe/80/80',
      name: 'El Jefe',
      ticker: 'El Jefe Pequeno',
      timeAgo: '17h',
      marketCap: '$27.4K',
      volume: '$14K',
      price: '14K',
      liquidity: '0.025',
      liquidityRatio: '0/13',
      txCount: 2,
      holders: 1,
      replies: 0,
      topHoldersRatio: '0/13',
      change1h: 0,
      change6h: 0,
      timeLabel: '6d',
      creator: 'DfaZ...pump',
      hasFlag: true
    },
    {
      image: 'https://picsum.photos/seed/xai/80/80',
      name: 'xAI',
      ticker: 'xAI',
      timeAgo: '18h',
      marketCap: '$4.83K',
      volume: '$12K',
      price: '12K',
      liquidity: '0.022',
      liquidityRatio: '0/1',
      txCount: 2,
      holders: 203,
      replies: 0,
      change1h: -44,
      change6h: -28,
      timeLabel: '18h',
      change24h: -12,
      creator: 'HAc4...yMkc'
    },
    {
      image: 'https://picsum.photos/seed/shroom/80/80',
      name: 'SHROOM',
      ticker: 'Magic Mushroom',
      timeAgo: '19h',
      marketCap: '$335K',
      volume: '$23K',
      price: '23K',
      liquidity: '0.024',
      liquidityRatio: '20/21',
      txCount: 5,
      holders: 3,
      replies: 1,
      topHoldersRatio: '3/20',
      change1h: -25,
      change6h: 18,
      timeLabel: '1d',
      change24h: 4,
      creator: '9byn...7qAn'
    },
    {
      image: 'https://picsum.photos/seed/rocket/80/80',
      name: 'ROCKET',
      ticker: 'Rocket To Mars',
      timeAgo: '20h',
      marketCap: '$189K',
      volume: '$16K',
      price: '16K',
      liquidity: '0.027',
      liquidityRatio: '15/18',
      txCount: 8,
      holders: 12,
      replies: 2,
      topHoldersRatio: '4/15',
      change1h: -15,
      change6h: -8,
      timeLabel: '1d',
      change24h: -22,
      creator: 'Rw3V...kPmn'
    },
    {
      image: 'https://picsum.photos/seed/diamond/80/80',
      name: 'DIAMOND',
      ticker: 'Diamond Hands',
      timeAgo: '21h',
      marketCap: '$567K',
      volume: '$45K',
      price: '45K',
      liquidity: '0.018',
      liquidityRatio: '34/35',
      txCount: 12,
      holders: 45,
      replies: 4,
      topHoldersRatio: '8/34',
      change1h: -10,
      change6h: 15,
      timeLabel: '2d',
      change24h: 5,
      hasFlag: true,
      creator: 'Sx4W...mQrs'
    },
    {
      image: 'https://picsum.photos/seed/lambo/80/80',
      name: 'LAMBO',
      ticker: 'When Lambo',
      timeAgo: '22h',
      marketCap: '$234K',
      volume: '$19K',
      price: '19K',
      liquidity: '0.023',
      liquidityRatio: '22/25',
      txCount: 6,
      holders: 28,
      replies: 1,
      topHoldersRatio: '5/22',
      change1h: -8,
      change6h: -12,
      timeLabel: '2d',
      change24h: -18,
      creator: 'Ty5X...nTuv'
    },
    {
      image: 'https://picsum.photos/seed/ape/80/80',
      name: 'APE',
      ticker: 'Ape Together Strong',
      timeAgo: '23h',
      marketCap: '$890K',
      volume: '$67K',
      price: '67K',
      liquidity: '0.015',
      liquidityRatio: '45/48',
      txCount: 18,
      holders: 89,
      replies: 6,
      topHoldersRatio: '12/45',
      change1h: 22,
      change6h: 30,
      timeLabel: '3d',
      change24h: 45,
      isVerified: true,
      creator: 'Uz6Y...kWxy'
    },
    {
      image: 'https://picsum.photos/seed/moon/80/80',
      name: 'MOON',
      ticker: 'Moon Token',
      timeAgo: '1d',
      marketCap: '$445K',
      volume: '$34K',
      price: '34K',
      liquidity: '0.021',
      liquidityRatio: '28/30',
      txCount: 9,
      holders: 56,
      replies: 3,
      topHoldersRatio: '7/28',
      change1h: -5,
      change6h: 8,
      timeLabel: '3d',
      change24h: 3,
      creator: 'Vw7Z...mYza'
    },
    {
      image: 'https://picsum.photos/seed/safemoon/80/80',
      name: 'SAFEMOON',
      ticker: 'Safe Moon V2',
      timeAgo: '1d',
      marketCap: '$678K',
      volume: '$52K',
      price: '52K',
      liquidity: '0.017',
      liquidityRatio: '38/40',
      txCount: 15,
      holders: 123,
      replies: 7,
      topHoldersRatio: '15/38',
      change1h: -18,
      change6h: -25,
      timeLabel: '4d',
      change24h: -35,
      hasFlag: true,
      creator: 'Wx8A...nZab'
    },
    {
      image: 'https://picsum.photos/seed/hodl/80/80',
      name: 'HODL',
      ticker: 'Hold On For Dear Life',
      timeAgo: '1d',
      marketCap: '$312K',
      volume: '$26K',
      price: '26K',
      liquidity: '0.022',
      liquidityRatio: '25/28',
      txCount: 7,
      holders: 67,
      replies: 2,
      topHoldersRatio: '9/25',
      change1h: 12,
      change6h: 18,
      timeLabel: '4d',
      change24h: 25,
      creator: 'Xy9B...kAbc'
    }
  ];

  const migratedTokens = [
    {
      image: 'https://picsum.photos/seed/solpunks/80/80',
      name: 'SolPunks',
      ticker: 'Sol Punks',
      timeAgo: '7s',
      marketCap: '$276K',
      volume: '$14K',
      price: '14K',
      liquidity: '0.021',
      liquidityRatio: '1/1',
      txCount: 11,
      holders: 7,
      replies: 0,
      topHoldersRatio: '0/1',
      change1h: 0,
      change6h: 0,
      change24h: -50,
      hasGraduated: true,
      creator: '7vVX...ZbdO'
    },
    {
      image: 'https://picsum.photos/seed/inter/80/80',
      name: 'Inter',
      ticker: 'InterServer',
      timeAgo: '51s',
      marketCap: '$1.74M',
      volume: '$34K',
      price: '34K',
      liquidity: '0.015',
      liquidityRatio: '1/1',
      txCount: 305,
      holders: 152,
      replies: 1,
      topHoldersRatio: '1/1',
      change1h: -98,
      change6h: 0,
      timeLabel: '3m',
      change24h: -20,
      hasGraduated: true,
      creator: 'OvyM...nBN8'
    },
    {
      image: 'https://picsum.photos/seed/tesla/80/80',
      name: 'TESLA AI',
      ticker: 'Tesla Coin',
      timeAgo: '1m',
      marketCap: '$42.3K',
      volume: '$11K',
      price: '11K',
      liquidity: '0.017',
      liquidityRatio: '1/1',
      txCount: 129,
      holders: 142,
      replies: 0,
      topHoldersRatio: '1/1',
      change1h: 9,
      change6h: 0,
      timeLabel: '2m',
      change24h: -76,
      hasGraduated: true,
      creator: 'FXjD...KMcc'
    },
    {
      image: 'https://picsum.photos/seed/stimmy/80/80',
      name: 'STIMMY',
      ticker: 'Stimmy Checks',
      timeAgo: '2m',
      marketCap: '$1.16M',
      volume: '$27K',
      price: '27K',
      liquidity: '0.014',
      liquidityRatio: '174/183',
      txCount: 282,
      holders: 136,
      replies: 0,
      topHoldersRatio: '174/183',
      change1h: -97,
      change6h: 0,
      timeLabel: '4d',
      change24h: -19,
      hasGraduated: true,
      creator: '6ejy...DCpo'
    },
    {
      image: 'https://picsum.photos/seed/coconut/80/80',
      name: 'Coconuted',
      ticker: 'Coconuted',
      timeAgo: '3m',
      marketCap: '$83.3K',
      volume: '$86K',
      price: '86K',
      liquidity: '0.012',
      liquidityRatio: '1/1',
      txCount: 803,
      holders: 286,
      replies: 51,
      topHoldersRatio: '1/1',
      change1h: -16,
      change6h: 0,
      change24h: 0,
      hasGraduated: true,
      creator: 'E1Nx...pump'
    },
    {
      image: 'https://picsum.photos/seed/cryptoguy/80/80',
      name: 'crypto guy',
      ticker: 'crypto guy',
      timeAgo: '4m',
      marketCap: '$31.9K',
      volume: '$16K',
      price: '16K',
      liquidity: '0.022',
      liquidityRatio: '26/126',
      txCount: 65,
      holders: 150,
      replies: 0,
      topHoldersRatio: '26/126',
      change1h: -9,
      change6h: 0,
      timeLabel: '3mo',
      change24h: -50,
      hasGraduated: true,
      creator: '55eX...4444'
    },
    {
      image: 'https://picsum.photos/seed/wojak/80/80',
      name: 'WOJAK',
      ticker: 'Wojak Meme',
      timeAgo: '5m',
      marketCap: '$567K',
      volume: '$45K',
      price: '45K',
      liquidity: '0.018',
      liquidityRatio: '1/1',
      txCount: 234,
      holders: 189,
      replies: 12,
      topHoldersRatio: '1/1',
      change1h: 15,
      change6h: 22,
      timeLabel: '1h',
      change24h: 38,
      hasGraduated: true,
      creator: 'Gz2C...eFgh'
    },
    {
      image: 'https://picsum.photos/seed/chad/80/80',
      name: 'CHAD',
      ticker: 'Chad Token',
      timeAgo: '6m',
      marketCap: '$892K',
      volume: '$67K',
      price: '67K',
      liquidity: '0.013',
      liquidityRatio: '1/1',
      txCount: 456,
      holders: 234,
      replies: 8,
      topHoldersRatio: '1/1',
      change1h: -22,
      change6h: -15,
      timeLabel: '2h',
      change24h: -28,
      hasGraduated: true,
      creator: 'Hz3D...fIjk'
    },
    {
      image: 'https://picsum.photos/seed/shiba2/80/80',
      name: 'SHIBA2',
      ticker: 'Shiba Inu 2.0',
      timeAgo: '7m',
      marketCap: '$1.23M',
      volume: '$89K',
      price: '89K',
      liquidity: '0.011',
      liquidityRatio: '1/1',
      txCount: 567,
      holders: 345,
      replies: 15,
      topHoldersRatio: '1/1',
      change1h: 8,
      change6h: 12,
      timeLabel: '3h',
      change24h: 18,
      hasGraduated: true,
      creator: 'Iz4E...gKlm'
    },
    {
      image: 'https://picsum.photos/seed/floki/80/80',
      name: 'FLOKI',
      ticker: 'Floki Viking',
      timeAgo: '8m',
      marketCap: '$445K',
      volume: '$38K',
      price: '38K',
      liquidity: '0.016',
      liquidityRatio: '1/1',
      txCount: 198,
      holders: 167,
      replies: 5,
      topHoldersRatio: '1/1',
      change1h: -12,
      change6h: 5,
      timeLabel: '4h',
      change24h: -8,
      hasGraduated: true,
      creator: 'Jz5F...hMno'
    }
  ];

  return (
    <div className="fixed top-[60px] bottom-[60px] left-0 right-0 flex flex-col">
      {/* Loading Progress Bar */}
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-900 z-50">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      )}
      
      {/* Page Header - Fixed */}
      {/* <div className="flex-shrink-0 px-6 py-4 border-b border-gray-800 bg-[#0a0a0a]"> */}
      <div className="flex-shrink-0 px-6 py-4  bg-[#0a0a0a]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-2xl font-bold flex items-center gap-2">
              Pulse
              <SolanaIcon size={20} className="text-purple-500" />
              {/* <span className="text-yellow-500">🎁</span> */}
            </h1>
            {/* <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <HelpCircle className="w-5 h-5 text-gray-400" />
            </button> */}
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
              <SolanaIcon size={12} className="text-purple-500" />
              <span className="text-white text-sm">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Three Column Layout - Scrollable */}
      <div className="flex-1 flex mx-6 mb-4 border border-gray-800 overflow-hidden rounded">
        <Column 
          title="New Pairs" 
          count={newPairsTokens.length} 
          badges={['SOL', 'P1', 'P2', 'P3', '⚡']} 
          tokens={newPairsTokens} 
          isLoading={isLoading}
          columnType="new-pairs"
        />
        <Column 
          title="Final Stretch" 
          count={finalStretchTokens.length} 
          badges={['SOL', 'P1', 'P2', 'P3', '⚡']} 
          tokens={finalStretchTokens} 
          isLoading={isLoading}
          columnType="final-stretch"
        />
        <Column 
          title="Migrated" 
          count={migratedTokens.length} 
          badges={['SOL', 'P1', 'P2', 'P3', '⚡']} 
          tokens={migratedTokens} 
          isLoading={isLoading}
          columnType="migrated"
        />
      </div>
    </div>
  );
}
