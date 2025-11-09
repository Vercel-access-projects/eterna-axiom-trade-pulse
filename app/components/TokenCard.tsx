import React from 'react';
import { ArrowUp, ArrowDown, Lock, MessageCircle, Users, Eye, Flame, Zap } from 'lucide-react';

interface TokenCardProps {
  image: string;
  name: string;
  ticker: string;
  timeAgo: string;
  marketCap: string;
  volume: string;
  price: string;
  holders: number;
  replies: number;
  freezeAuthority?: boolean;
  mintAuthority?: boolean;
  liquidity?: string;
  percentages: {
    change1h?: number;
    change6h?: number;
    change24h?: number;
  };
  badges?: Array<'king' | 'fire' | 'zap' | 'graduated'>;
  verified?: boolean;
  creator?: string;
  txCount?: number;
}

export default function TokenCard({
  image,
  name,
  ticker,
  timeAgo,
  marketCap,
  volume,
  price,
  holders,
  replies,
  freezeAuthority,
  mintAuthority,
  liquidity,
  percentages,
  badges = [],
  verified,
  creator,
  txCount
}: TokenCardProps) {
  const isPositive = (val?: number) => val !== undefined && val > 0;
  const isNegative = (val?: number) => val !== undefined && val < 0;

  return (
    <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
      <div className="flex gap-3">
        {/* Token Image */}
        <div className="relative">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          {badges.includes('graduated') && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-[#0f0f0f]">
              <span className="text-xs">✓</span>
            </div>
          )}
        </div>

        {/* Token Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-semibold text-base truncate">{name}</h3>
                {verified && (
                  <span className="text-gray-400 text-sm">{ticker}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{timeAgo}</span>
                {freezeAuthority && (
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                  </span>
                )}
                {mintAuthority && (
                  <span>🔒</span>
                )}
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {replies}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {holders}
                </span>
                {liquidity && (
                  <span>💧{liquidity}</span>
                )}
              </div>
            </div>
            
            {/* Market Cap and Volume */}
            <div className="text-right ml-2">
              <div className="text-xs text-gray-500 mb-0.5">
                MC <span className="text-blue-400">{marketCap}</span>
              </div>
              <div className="text-xs text-gray-500">
                V <span className="text-white">{volume}</span>
              </div>
            </div>
          </div>

          {/* Price and Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {badges.map((badge, idx) => (
                <span key={idx} className="text-yellow-500">
                  {badge === 'king' && '👑'}
                  {badge === 'fire' && '🔥'}
                  {badge === 'zap' && '⚡'}
                </span>
              ))}
            </div>
            
            <div className="text-right">
              <div className="text-green-400 text-sm font-medium mb-1">${price}</div>
              {txCount && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>F ≡ {liquidity}</span>
                  <span>TX {txCount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Percentage Changes */}
          <div className="flex items-center gap-3 mt-3 text-xs">
            {percentages.change1h !== undefined && (
              <div className={`flex items-center gap-1 ${isPositive(percentages.change1h) ? 'text-green-500' : isNegative(percentages.change1h) ? 'text-red-500' : 'text-gray-500'}`}>
                {isPositive(percentages.change1h) && <ArrowUp className="w-3 h-3" />}
                {isNegative(percentages.change1h) && <ArrowDown className="w-3 h-3" />}
                <span>{Math.abs(percentages.change1h)}%</span>
              </div>
            )}
            {percentages.change6h !== undefined && (
              <div className={`flex items-center gap-1 ${isPositive(percentages.change6h) ? 'text-green-500' : isNegative(percentages.change6h) ? 'text-red-500' : 'text-gray-500'}`}>
                {isPositive(percentages.change6h) && <ArrowUp className="w-3 h-3" />}
                {isNegative(percentages.change6h) && <ArrowDown className="w-3 h-3" />}
                <span>{Math.abs(percentages.change6h)}% 6d</span>
              </div>
            )}
            {percentages.change24h !== undefined && (
              <div className={`flex items-center gap-1 ${isPositive(percentages.change24h) ? 'text-green-500' : isNegative(percentages.change24h) ? 'text-red-500' : 'text-gray-500'}`}>
                {isPositive(percentages.change24h) && <ArrowUp className="w-3 h-3" />}
                {isNegative(percentages.change24h) && <ArrowDown className="w-3 h-3" />}
                <span>{Math.abs(percentages.change24h)}%</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-green-500">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>0%</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <span>🔒 0%</span>
            </div>
            <div className="flex items-center gap-1 text-green-500">
              <Users className="w-3 h-3" />
              <span>0%</span>
            </div>
          </div>

          {/* Creator Info */}
          {creator && (
            <div className="mt-2 text-xs text-gray-500">
              {creator}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
