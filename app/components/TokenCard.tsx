import React from 'react';

export interface TokenCardProps {
    // Basic Info
    image: string;
    name: string;
    ticker?: string;
    timeAgo: string;
    creator?: string;

    // Financial Data
    marketCap: string;
    volume: string;
    price: string;

    // Liquidity & Transaction Info
    liquidity?: string;
    liquidityRatio?: string;
    txCount?: number;

    // Token Stats
    holders?: number;
    replies?: number;
    topHoldersRatio?: string; // e.g., "0/21"

    // Percentage Changes
    change1h?: number;
    change6h?: number;
    change24h?: number;
    timeLabel?: string; // e.g., "3mo", "2mo"

    // Status Badges
    hasGraduated?: boolean;
    hasBonding?: string; // e.g., "DS" for bonding status

    // Icons/Flags
    isVerified?: boolean;
    hasFlag?: boolean;
    badgeIcon?: '✓' | '🔥' | '⚡' | '💎' | '🚀' | '👑'; // Different icon options
}

// Helper function to get random badge icon
const getRandomBadgeIcon = (): string => {
    const icons = ['✓', '🔥', '⚡', '💎', '🚀', '👑'];
    return icons[Math.floor(Math.random() * icons.length)];
};

export default function TokenCard({
    image,
    name,
    ticker,
    timeAgo,
    creator,
    marketCap,
    volume,
    price,
    liquidity,
    liquidityRatio,
    txCount,
    holders = 0,
    replies = 0,
    topHoldersRatio,
    change1h,
    change6h,
    change24h,
    timeLabel,
    hasGraduated,
    hasBonding,
    isVerified,
    hasFlag,
    badgeIcon
}: TokenCardProps) {
    // Use provided icon or get a random one
    const displayIcon = badgeIcon || getRandomBadgeIcon();
    
    return (
        <div className="bg-[#0f0f0f] border-b border-gray-800 hover:bg-[#141414] transition-colors">
            <div className="flex gap-4 p-4">
                {/* Token Image with border */}
                <div className="relative flex-shrink-0">
                    <div className="relative w-[72px] h-[72px] border border-green-500 p-0.5 bg-black rounded">
                        <img src={image} alt={name} className="w-full h-full object-cover" />

                        {/* Bottom right icon - half inside, half outside the border */}
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#0f0f0f] border border-green-500 rounded-full flex items-center justify-center">
                            <span className="text-green-500 text-[8px]">{displayIcon}</span>
                        </div>
                    </div>

                    {/* {hasGraduated && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-[#0f0f0f]">
                            <span className="text-white text-xs">🚫</span>
                        </div>
                    )} */}
                    {/* Creator under image */}
                    {creator && (
                        <div className="text-center text-xs text-gray-500 mt-1 truncate max-w-[72px]">
                            {creator}
                        </div>
                    )}
                </div>

                {/* Token Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                    {/* Top Section - Name and Market Cap */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-white font-bold text-xl">{name}</h3>
                            {ticker && <span className="text-gray-400 text-sm">{ticker}</span>}
                            {isVerified && <span className="text-gray-500">📋</span>}
                        </div>

                        <div className="text-right">
                            <div className="text-xs text-gray-500">
                                MC <span className="text-cyan-400 font-semibold">{marketCap}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                                V <span className="text-white font-semibold">{volume}</span>
                            </div>
                        </div>
                    </div>

                    {/* Middle Section - Time, Icons, Stats */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-green-400">{timeAgo}</span>
                            {hasFlag && <span className="text-red-500">🚩</span>}
                            <span className="text-gray-500">💊</span>
                            <span className="text-gray-500">🔍</span>
                            <span className="text-gray-500 flex items-center gap-1">
                                👥 <span className="text-white">{holders}</span>
                            </span>
                            <span className="text-gray-500 flex items-center gap-1">
                                ⚖️ <span className="text-white">{replies}</span>
                            </span>
                            <span className="text-gray-500 flex items-center gap-1">
                                👑 <span className="text-white">{topHoldersRatio || '0/21'}</span>
                            </span>
                        </div>

                        <div className="text-right">
                            <div className="flex items-center justify-end gap-2 text-xs text-gray-500">
                                <span>F</span>
                                <span className="text-cyan-400">≡</span>
                                <span className="text-white">{liquidity || '0.0₂5'}</span>
                                <span>TX {txCount || 8}</span>
                                <div className="w-8 h-1 bg-gradient-to-r from-red-500 to-green-500"></div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Stats */}
                    <div className="flex items-center gap-4 mt-2 text-sm">
                        {change1h !== undefined && (
                            <div className={`flex items-center gap-1 ${change1h > 0 ? 'text-green-500' : change1h < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                                <span className="text-green-500">👤</span>
                                <span className="font-semibold">{Math.abs(change1h)}%</span>
                            </div>
                        )}
                        {hasBonding && (
                            <div className="flex items-center gap-1 text-blue-500">
                                <span>👨‍🍳</span>
                                <span className="font-semibold">{hasBonding}</span>
                                {timeLabel && <span className="text-yellow-400">◆</span>}
                                {timeLabel && <span className="font-semibold">{timeLabel}</span>}
                            </div>
                        )}
                        {change6h !== undefined && (
                            <div className={`flex items-center gap-1 ${change6h > 0 ? 'text-green-500' : change6h < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                                <span>🎯</span>
                                <span className="font-semibold">{Math.abs(change6h)}%</span>
                            </div>
                        )}
                        {change24h !== undefined && (
                            <div className={`flex items-center gap-1 ${change24h > 0 ? 'text-green-500' : change24h < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                                <span>👻</span>
                                <span className="font-semibold">{Math.abs(change24h)}%</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1 text-gray-500">
                            <span>☣️</span>
                            <span className="font-semibold">0%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
