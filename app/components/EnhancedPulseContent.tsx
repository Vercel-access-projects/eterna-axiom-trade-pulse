'use client';

import React, { useState, useMemo } from 'react';
import { Zap, ArrowUpDown, TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import EnhancedTokenCard from './EnhancedTokenCard';
import { TokenCardSkeleton } from './Skeleton';
import ErrorBoundary from './ErrorBoundary';
import Tooltip from './Tooltip';
import Popover from './Popover';

type SortOption = 'time' | 'marketCap' | 'volume' | 'holders' | 'change1h' | 'change24h';
type SortDirection = 'asc' | 'desc';

interface ColumnProps {
  title: string;
  count: number;
  tokens: any[];
  isLoading?: boolean;
}

function Column({ title, count, tokens, isLoading = false }: ColumnProps) {
  const [sortBy, setSortBy] = useState<SortOption>('time');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedTokens = useMemo(() => {
    const sorted = [...tokens].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'time':
          // Parse time strings like "1m", "39s", "1h"
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
          // Parse market cap strings like "$4.84K", "$145K", "$1.2M"
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
      // Toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (option: SortOption) => {
    switch (option) {
      case 'time':
        return <Clock className="w-3 h-3" />;
      case 'marketCap':
        return <DollarSign className="w-3 h-3" />;
      case 'volume':
        return <TrendingUp className="w-3 h-3" />;
      case 'holders':
        return <Users className="w-3 h-3" />;
      default:
        return <ArrowUpDown className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col border-r border-gray-800 last:border-r-0">
      {/* Column Header - Fixed */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-white font-semibold text-lg">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-gray-700 rounded-full">
              <Zap className="w-4 h-4 text-gray-400" />
              <span className="text-white text-sm">{count}</span>
            </div>
            
            {/* Sort Popover */}
            <Popover
              trigger={
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-gray-700 rounded-full cursor-pointer hover:border-cyan-500 transition-colors">
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
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

            <div className="flex items-center gap-1 px-3 py-1.5 bg-[#1a1a1a] border border-gray-700 rounded-full">
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
            <Tooltip content="Quick actions">
              <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
                <span className="text-gray-400 text-sm">⚡</span>
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
                <TokenCardSkeleton key={idx} />
              ))}
            </>
          ) : (
            sortedTokens.map((token, idx) => (
              <EnhancedTokenCard 
                key={`${token.name}-${idx}`} 
                tokenId={`${token.name.toLowerCase()}-${idx}`}
                {...token} 
              />
            ))
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default function EnhancedPulseContent() {
  const [isLoading, setIsLoading] = useState(false);

  // Simulate progressive loading
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
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
      liquidity: '0.0₂5',
      liquidityRatio: '0.0₂5',
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
      liquidity: '0.0₂2',
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
      marketCap: '$85.2K',
      volume: '$4.2K',
      price: '4.2K',
      liquidity: '0.0₂3',
      txCount: 42,
      holders: 28,
      replies: 3,
      topHoldersRatio: '0/20',
      change1h: 8,
      change6h: 12,
      change24h: -5,
      creator: 'Abc1...XyZ9'
    },
    {
      image: 'https://picsum.photos/seed/crypto1/80/80',
      name: 'MOONSHOT',
      ticker: 'To the moon!',
      timeAgo: '2m',
      marketCap: '$520K',
      volume: '$25K',
      price: '25K',
      liquidity: '0.0₁8',
      txCount: 156,
      holders: 89,
      replies: 12,
      topHoldersRatio: '2/20',
      change1h: 45,
      change6h: 78,
      change24h: 120,
      hasBonding: 'VT',
      timeLabel: '1d',
      creator: 'Moon...Shot1'
    },
    {
      image: 'https://picsum.photos/seed/crypto2/80/80',
      name: 'HODL',
      ticker: 'Hold On for Dear Life',
      timeAgo: '5m',
      marketCap: '$2.1M',
      volume: '$180K',
      price: '180K',
      liquidity: '0.0₁5',
      txCount: 842,
      holders: 456,
      replies: 67,
      topHoldersRatio: '5/20',
      change1h: -8,
      change6h: -15,
      change24h: 35,
      isVerified: true,
      creator: 'HODL...4EVR'
    },
    {
      image: 'https://picsum.photos/seed/crypto3/80/80',
      name: 'SAFU',
      ticker: 'Funds are SAFU',
      timeAgo: '8m',
      marketCap: '$780K',
      volume: '$65K',
      price: '65K',
      liquidity: '0.0₁9',
      txCount: 234,
      holders: 178,
      replies: 23,
      topHoldersRatio: '3/20',
      change1h: 12,
      change6h: 8,
      change24h: 25,
      creator: 'Safu...Safe'
    },
    {
      image: 'https://picsum.photos/seed/crypto4/80/80',
      name: 'DEGEN',
      ticker: 'Degenerate Trader',
      timeAgo: '12m',
      marketCap: '$340K',
      volume: '$42K',
      price: '42K',
      liquidity: '0.0₂1',
      txCount: 167,
      holders: 92,
      replies: 8,
      topHoldersRatio: '1/20',
      change1h: -5,
      change6h: 15,
      change24h: -12,
      hasFlag: true,
      creator: 'Degen...100x'
    },
    {
      image: 'https://picsum.photos/seed/crypto5/80/80',
      name: 'WAGMI',
      ticker: 'We are all gonna make it',
      timeAgo: '15m',
      marketCap: '$1.5M',
      volume: '$120K',
      price: '120K',
      liquidity: '0.0₁6',
      txCount: 567,
      holders: 234,
      replies: 45,
      topHoldersRatio: '4/20',
      change1h: 18,
      change6h: 32,
      change24h: 58,
      isVerified: true,
      hasBonding: 'LP',
      timeLabel: '5d',
      creator: 'WAGMI...Moon'
    },
    {
      image: 'https://picsum.photos/seed/crypto6/80/80',
      name: 'PEPE',
      ticker: 'Rare Pepe',
      timeAgo: '18m',
      marketCap: '$890K',
      volume: '$78K',
      price: '78K',
      liquidity: '0.0₁7',
      txCount: 345,
      holders: 156,
      replies: 34,
      topHoldersRatio: '2/20',
      change1h: 22,
      change6h: 18,
      change24h: 42,
      creator: 'Pepe...Rare'
    },
    {
      image: 'https://picsum.photos/seed/crypto7/80/80',
      name: 'SHIB',
      ticker: 'Shiba Inu Killer',
      timeAgo: '25m',
      marketCap: '$3.2M',
      volume: '$250K',
      price: '250K',
      liquidity: '0.0₁4',
      txCount: 1234,
      holders: 789,
      replies: 123,
      topHoldersRatio: '8/20',
      change1h: -3,
      change6h: 5,
      change24h: 15,
      isVerified: true,
      creator: 'Shib...Army'
    },
  ];

  const finalStretchTokens = newPairsTokens.map((token, idx) => ({
    ...token,
    image: `https://picsum.photos/seed/final${idx}/80/80`,
    name: `${token.name}F`,
    timeAgo: `${idx + 1}h`,
  }));

  const migratedTokens = newPairsTokens.map((token, idx) => ({
    ...token,
    image: `https://picsum.photos/seed/migrated${idx}/80/80`,
    name: `${token.name}M`,
    timeAgo: `${idx + 1}d`,
  }));

  return (
    <div className="flex flex-1 overflow-hidden">
      <Column 
        title="New Pairs" 
        count={newPairsTokens.length} 
        tokens={newPairsTokens}
        isLoading={isLoading}
      />
      <Column 
        title="Final Stretch" 
        count={finalStretchTokens.length} 
        tokens={finalStretchTokens}
        isLoading={isLoading}
      />
      <Column 
        title="Migrated" 
        count={migratedTokens.length} 
        tokens={migratedTokens}
        isLoading={isLoading}
      />
    </div>
  );
}
