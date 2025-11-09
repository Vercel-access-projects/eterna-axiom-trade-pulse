'use client';

import React, { useEffect } from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info' | 'price-up' | 'price-down';
    duration?: number;
    onClose: () => void;
}

export default function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500/10 border-green-500/50 text-green-400';
            case 'error':
                return 'bg-red-500/10 border-red-500/50 text-red-400';
            case 'price-up':
                return 'bg-green-500/10 border-green-500/50 text-green-400';
            case 'price-down':
                return 'bg-red-500/10 border-red-500/50 text-red-400';
            default:
                return 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'price-up':
                return <TrendingUp className="w-4 h-4" />;
            case 'price-down':
                return <TrendingDown className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm ${getTypeStyles()} animate-slideIn shadow-lg`}>
            {getIcon()}
            <span className="text-sm font-medium flex-1">{message}</span>
            <button 
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded transition-colors"
            >
                <X className="w-3 h-3" />
            </button>
        </div>
    );
}

interface ToastContainerProps {
    children: React.ReactNode;
}

export function ToastContainer({ children }: ToastContainerProps) {
    return (
        <div className="fixed top-20 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
            <div className="pointer-events-auto">
                {children}
            </div>
        </div>
    );
}
