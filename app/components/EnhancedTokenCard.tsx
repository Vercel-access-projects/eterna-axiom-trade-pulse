'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TokenCardProps } from './TokenCard';
import Tooltip from './Tooltip';
import Popover from './Popover';
import Modal from './Modal';
import { wsService, PriceUpdate } from '../services/websocket';
import { TrendingUp, TrendingDown, Copy, ExternalLink, Share2, MoreVertical } from 'lucide-react';
import SolanaIcon from './SolanaIcon';

interface EnhancedTokenCardProps extends TokenCardProps {
    tokenId: string;
    columnType?: 'new-pairs' | 'final-stretch' | 'migrated';
    onSelect?: (tokenId: string) => void;
}

export default function EnhancedTokenCard({
    tokenId,
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
    change1h: initialChange1h,
    change6h: initialChange6h,
    change24h: initialChange24h,
    timeLabel,
    hasGraduated,
    hasBonding,
    isVerified,
    hasFlag,
    badgeIcon,
    columnType = 'new-pairs',
    onSelect,
}: EnhancedTokenCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [liveData, setLiveData] = useState({
        marketCap,
        volume,
        price,
        change1h: initialChange1h || 0,
        change6h: initialChange6h || 0,
        change24h: initialChange24h || 0,
        holders,
    });
    const [priceDirection, setPriceDirection] = useState<'up' | 'down' | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const previousPrice = useRef(price);
    const previousMC = useRef(marketCap);

    // Random badge icon
    const displayIcon = badgeIcon || ['✓', '🔥', '⚡', '💎', '🚀', '👑'][Math.floor(Math.random() * 6)];

    // Subscribe to real-time updates
    useEffect(() => {
        console.log(`[WebSocket] Subscribing to token: ${tokenId}`);
        
        const unsubscribe = wsService.subscribe(tokenId, (update: PriceUpdate) => {
            console.log(`[WebSocket] Price update for ${tokenId}:`, update);
            
            // Determine price direction
            const prevPrice = parseFloat(previousPrice.current);
            const newPrice = parseFloat(update.price);
            
            setIsUpdating(true);
            
            if (newPrice > prevPrice) {
                setPriceDirection('up');
                console.log(`[WebSocket] ${tokenId} price UP: ${prevPrice} -> ${newPrice}`);
            } else if (newPrice < prevPrice) {
                setPriceDirection('down');
                console.log(`[WebSocket] ${tokenId} price DOWN: ${prevPrice} -> ${newPrice}`);
            }

            previousPrice.current = update.price;
            previousMC.current = update.marketCap;

            // Update live data
            setLiveData({
                marketCap: update.marketCap,
                volume: update.volume,
                price: update.price,
                change1h: update.change1h,
                change6h: update.change6h,
                change24h: update.change24h,
                holders: update.holders,
            });

            // Clear price direction and updating state after animation
            setTimeout(() => {
                setPriceDirection(null);
                setIsUpdating(false);
            }, 600);
        });

        return () => {
            console.log(`[WebSocket] Unsubscribing from token: ${tokenId}`);
            unsubscribe();
        };
    }, [tokenId]);

    const handleCardClick = () => {
        if (onSelect) {
            onSelect(tokenId);
        }
    };

    const copyAddress = () => {
        navigator.clipboard.writeText(tokenId);
    };

    const getPercentageColor = (value: number) => {
        if (value > 0) return 'text-green-500';
        if (value < 0) return 'text-red-500';
        return 'text-gray-500';
    };

    // Get border gradient based on column type
    const getBorderGradient = () => {
        switch (columnType) {
            case 'new-pairs':
                return 'from-green-400 via-green-500 to-emerald-500';
            case 'final-stretch':
                return 'from-purple-400 via-violet-500 to-purple-600';
            case 'migrated':
                return 'from-yellow-400 via-orange-500 to-orange-600';
            default:
                return 'from-green-400 via-green-500 to-emerald-500';
        }
    };

    // Get badge color based on column type
    const getBadgeColor = () => {
        switch (columnType) {
            case 'new-pairs':
                return 'border-green-500 text-green-500';
            case 'final-stretch':
                return 'border-violet-500 text-violet-500';
            case 'migrated':
                return 'border-orange-500 text-orange-500';
            default:
                return 'border-green-500 text-green-500';
        }
    };

    return (
        <>
            <div 
                className="bg-[#0f0f0f] border-b border-gray-800 hover:bg-[#141414] transition-all duration-200 cursor-pointer group relative overflow-hidden"
                onClick={handleCardClick}
            >
                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex gap-3 p-3 relative z-10">
                    {/* Token Image - compact with gradient border */}
                    <div className="relative flex-shrink-0 group/image">
                        <div className={`relative w-[72px] h-[72px] p-[1px] bg-gradient-to-br ${getBorderGradient()} rounded-sm`}>
                            <div className="w-[70px] h-[70px] bg-black rounded-sm overflow-hidden">
                                <img 
                                    src={image} 
                                    alt={name} 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                            {/* Bottom right badge */}
                            <div className={`absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-[#0f0f0f] border rounded-full flex items-center justify-center ${getBadgeColor()}`}>
                                <span className="text-[7px]">{displayIcon}</span>
                            </div>
                        </div>
                        
                        {/* Large Image Preview - appears on hover */}
                        <div className="absolute left-[-300px] top-0 w-[280px] h-[280px] opacity-0 invisible group-hover/image:opacity-100 group-hover/image:visible transition-all duration-200 z-[100] pointer-events-none">
                            <div className={`w-full h-full p-[2px] bg-gradient-to-br ${getBorderGradient()} rounded-lg shadow-2xl`}>
                                <div className="w-full h-full bg-[#0a0a0a] rounded-lg overflow-hidden relative">
                                    <img 
                                        src={image} 
                                        alt={name} 
                                        className="w-full h-full object-cover" 
                                    />
                                    {/* Info overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3">
                                        <h3 className="text-white font-bold text-base">{name}</h3>
                                        <p className="text-gray-400 text-xs">{ticker}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Creator below */}
                        {creator && (
                            <div className="text-center text-[10px] text-gray-500 mt-0.5 truncate max-w-[60px]">
                                {creator}
                            </div>
                        )}
                    </div>

                    {/* Token Info - Single line compact layout */}
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                        {/* Left side - Name and time */}
                        <div className="flex flex-col gap-1">
                            {/* Name row */}
                            <div className="flex items-center gap-2">
                                <h3 className="text-white font-semibold text-base group-hover:text-cyan-400 transition-colors">
                                    {name}
                                </h3>
                                <span className="text-gray-500 text-xs">{ticker}</span>
                                {isVerified && <span className="text-gray-500 text-xs">📋</span>}
                            </div>
                            
                            {/* Time and icons row */}
                            <div className="flex items-center gap-2 text-xs">
                                <span className="text-green-400">{timeAgo}</span>
                                <span className="text-gray-600">🔗</span>
                                <span className="text-gray-600">🔍</span>
                                <span className="text-gray-500 flex items-center gap-0.5">
                                    👥 <span className="text-white text-[10px]">{liveData.holders}</span>
                                </span>
                                <span className="text-gray-500 flex items-center gap-0.5">
                                    💬 <span className="text-white text-[10px]">{replies}</span>
                                </span>
                                <span className="text-gray-500 flex items-center gap-0.5">
                                    👑 <span className="text-white text-[10px]">{topHoldersRatio || '0/10'}</span>
                                </span>
                            </div>
                            
                            {/* Stats row */}
                            <div className="flex items-center gap-3 text-xs">
                                <div className={`flex items-center gap-0.5 transition-all duration-300 ${
                                    getPercentageColor(liveData.change1h)
                                } ${isUpdating ? 'scale-110' : 'scale-100'}`}>
                                    <span>👤</span>
                                    <span className="font-semibold text-[11px]">{Math.abs(liveData.change1h)}%</span>
                                    {isUpdating && liveData.change1h > 0 && <span className="text-green-400 animate-ping">↑</span>}
                                    {isUpdating && liveData.change1h < 0 && <span className="text-red-400 animate-ping">↓</span>}
                                </div>
                                {hasBonding && (
                                    <div className="flex items-center gap-0.5 text-blue-400">
                                        <span>🔵</span>
                                        <span className="font-semibold text-[11px]">{hasBonding}</span>
                                        {timeLabel && <span className="text-yellow-400 text-[10px]">{timeLabel}</span>}
                                    </div>
                                )}
                                <div className={`flex items-center gap-0.5 transition-all duration-300 ${
                                    getPercentageColor(liveData.change6h)
                                } ${isUpdating ? 'scale-110' : 'scale-100'}`}>
                                    <span>⏱️</span>
                                    <span className="font-semibold text-[11px]">{Math.abs(liveData.change6h)}%</span>
                                </div>
                                <div className={`flex items-center gap-0.5 transition-all duration-300 ${
                                    getPercentageColor(liveData.change24h)
                                } ${isUpdating ? 'scale-110' : 'scale-100'}`}>
                                    <span>📊</span>
                                    <span className="font-semibold text-[11px]">{Math.abs(liveData.change24h)}%</span>
                                </div>
                                <div className="flex items-center gap-0.5 text-gray-500">
                                    <span>☣️</span>
                                    <span className="font-semibold text-[11px]">0%</span>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Market data */}
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            {/* MC and V */}
                            <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                <span>MC</span>
                                <span className={`font-semibold transition-colors duration-300 ${
                                    priceDirection === 'up' 
                                        ? 'text-green-500' 
                                        : priceDirection === 'down' 
                                        ? 'text-red-500' 
                                        : 'text-cyan-400'
                                }`}>
                                    {liveData.marketCap}
                                </span>
                            </div>
                            <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                <span>V</span>
                                <span className="text-white font-semibold">
                                    {liveData.volume}
                                </span>
                            </div>
                            
                            {/* Liquidity bar */}
                            <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                <span>F</span>
                                <SolanaIcon size={10} className="text-cyan-400" />
                                <span className="text-white">{liquidity || '0.015'}</span>
                                <span>TX {txCount || 7}</span>
                                <div className="w-6 h-0.5 bg-gradient-to-r from-red-500 to-green-500 ml-1"></div>
                            </div>
                        </div>

                        {/* Action menu - only visible on hover */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Popover
                                trigger={
                                    <button 
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                                    >
                                        <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
                                    </button>
                                }
                                position="left"
                            >
                                <div className="py-2 w-40">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsModalOpen(true);
                                        }}
                                        className="w-full px-3 py-1.5 text-left text-xs text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        View Details
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            copyAddress();
                                        }}
                                        className="w-full px-3 py-1.5 text-left text-xs text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
                                    >
                                        <Copy className="w-3 h-3" />
                                        Copy Address
                                    </button>
                                    <button 
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full px-3 py-1.5 text-left text-xs text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
                                    >
                                        <Share2 className="w-3 h-3" />
                                        Share
                                    </button>
                                </div>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>

            {/* Token Details Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`${name} (${ticker})`}
                size="lg"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <img src={image} alt={name} className="w-24 h-24 rounded border border-green-500" />
                        <div>
                            <h3 className="text-2xl font-bold text-white">{name}</h3>
                            <p className="text-gray-400">{ticker}</p>
                            {creator && <p className="text-sm text-gray-500">Created by {creator}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0a0a0a] p-4 rounded border border-gray-800">
                            <p className="text-sm text-gray-500">Market Cap</p>
                            <p className="text-xl font-bold text-cyan-400">{liveData.marketCap}</p>
                        </div>
                        <div className="bg-[#0a0a0a] p-4 rounded border border-gray-800">
                            <p className="text-sm text-gray-500">Volume (24h)</p>
                            <p className="text-xl font-bold text-white">{liveData.volume}</p>
                        </div>
                        <div className="bg-[#0a0a0a] p-4 rounded border border-gray-800">
                            <p className="text-sm text-gray-500">Price</p>
                            <p className="text-xl font-bold text-white">{liveData.price}</p>
                        </div>
                        <div className="bg-[#0a0a0a] p-4 rounded border border-gray-800">
                            <p className="text-sm text-gray-500">Holders</p>
                            <p className="text-xl font-bold text-white">{liveData.holders}</p>
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] p-4 rounded border border-gray-800">
                        <h4 className="text-sm font-semibold text-white mb-2">Price Changes</h4>
                        <div className="flex gap-4">
                            <div>
                                <p className="text-xs text-gray-500">1h</p>
                                <p className={`text-lg font-bold ${getPercentageColor(liveData.change1h)}`}>
                                    {liveData.change1h > 0 ? '+' : ''}{liveData.change1h}%
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">6h</p>
                                <p className={`text-lg font-bold ${getPercentageColor(liveData.change6h)}`}>
                                    {liveData.change6h > 0 ? '+' : ''}{liveData.change6h}%
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">24h</p>
                                <p className={`text-lg font-bold ${getPercentageColor(liveData.change24h)}`}>
                                    {liveData.change24h > 0 ? '+' : ''}{liveData.change24h}%
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={copyAddress}
                        className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded transition-colors flex items-center justify-center gap-2"
                    >
                        <Copy className="w-4 h-4" />
                        Copy Token Address
                    </button>
                </div>
            </Modal>
        </>
    );
}
