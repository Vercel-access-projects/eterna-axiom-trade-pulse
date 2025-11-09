'use client';

import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    shimmer?: boolean;
}

export function Skeleton({ 
    className = '', 
    variant = 'rectangular', 
    width, 
    height,
    shimmer = true 
}: SkeletonProps) {
    const baseClasses = 'bg-gray-800 animate-pulse';
    const shimmerClasses = shimmer ? 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-700/50 before:to-transparent' : '';
    
    const variantClasses = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded',
    };

    const style = {
        width: width || '100%',
        height: height || (variant === 'text' ? '1rem' : variant === 'circular' ? '40px' : '20px'),
    };

    return (
        <div 
            className={`${baseClasses} ${variantClasses[variant]} ${shimmerClasses} ${className}`}
            style={style}
        />
    );
}

export function TokenCardSkeleton() {
    return (
        <div className="bg-[#0f0f0f] border-b border-gray-800">
            <div className="flex gap-4 p-4">
                {/* Image skeleton */}
                <div className="flex-shrink-0">
                    <Skeleton variant="rectangular" width={72} height={72} className="rounded" />
                    <Skeleton variant="text" width={72} height={12} className="mt-1" />
                </div>

                {/* Content skeleton */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                    {/* Top section */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-baseline gap-2">
                            <Skeleton variant="text" width={120} height={20} />
                            <Skeleton variant="text" width={40} height={14} />
                        </div>
                        <div className="text-right">
                            <Skeleton variant="text" width={60} height={12} className="mb-1" />
                            <Skeleton variant="text" width={60} height={12} />
                        </div>
                    </div>

                    {/* Middle section */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3">
                            <Skeleton variant="text" width={40} height={14} />
                            <Skeleton variant="text" width={30} height={14} />
                            <Skeleton variant="text" width={30} height={14} />
                            <Skeleton variant="text" width={30} height={14} />
                        </div>
                        <Skeleton variant="text" width={100} height={12} />
                    </div>

                    {/* Bottom section */}
                    <div className="flex items-center gap-4 mt-2">
                        <Skeleton variant="text" width={50} height={14} />
                        <Skeleton variant="text" width={50} height={14} />
                        <Skeleton variant="text" width={50} height={14} />
                        <Skeleton variant="text" width={50} height={14} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ColumnSkeleton() {
    return (
        <div className="flex-1">
            {Array.from({ length: 5 }).map((_, index) => (
                <TokenCardSkeleton key={index} />
            ))}
        </div>
    );
}
