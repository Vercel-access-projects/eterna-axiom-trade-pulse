'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
    content: string | React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
}

export default function Tooltip({ content, children, position = 'top', delay = 200 }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            if (targetRef.current) {
                const rect = targetRef.current.getBoundingClientRect();
                const tooltipOffset = 8;
                
                let x = 0;
                let y = 0;

                switch (position) {
                    case 'top':
                        x = rect.left + rect.width / 2;
                        y = rect.top - tooltipOffset;
                        break;
                    case 'bottom':
                        x = rect.left + rect.width / 2;
                        y = rect.bottom + tooltipOffset;
                        break;
                    case 'left':
                        x = rect.left - tooltipOffset;
                        y = rect.top + rect.height / 2;
                        break;
                    case 'right':
                        x = rect.right + tooltipOffset;
                        y = rect.top + rect.height / 2;
                        break;
                }

                setCoords({ x, y });
                setIsVisible(true);
            }
        }, delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const getTooltipPosition = () => {
        switch (position) {
            case 'top':
                return {
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                    transform: 'translate(-50%, -100%)',
                };
            case 'bottom':
                return {
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                    transform: 'translate(-50%, 0)',
                };
            case 'left':
                return {
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                    transform: 'translate(-100%, -50%)',
                };
            case 'right':
                return {
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                    transform: 'translate(0, -50%)',
                };
        }
    };

    return (
        <>
            <div
                ref={targetRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="inline-block"
            >
                {children}
            </div>
            {isVisible && (
                <div
                    className="fixed z-50 pointer-events-none animate-in fade-in duration-150"
                    style={getTooltipPosition()}
                >
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded border border-gray-700 shadow-lg whitespace-nowrap">
                        {content}
                    </div>
                </div>
            )}
        </>
    );
}
