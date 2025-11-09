'use client';

import React, { useState, useRef, useEffect } from 'react';

interface PopoverProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Popover({ trigger, children, position = 'bottom' }: PopoverProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                triggerRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleToggle = () => {
        if (!isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const offset = 8;
            
            let x = 0;
            let y = 0;

            switch (position) {
                case 'top':
                    x = rect.left + rect.width / 2;
                    y = rect.top - offset;
                    break;
                case 'bottom':
                    x = rect.left + rect.width / 2;
                    y = rect.bottom + offset;
                    break;
                case 'left':
                    x = rect.left - offset;
                    y = rect.top + rect.height / 2;
                    break;
                case 'right':
                    x = rect.right + offset;
                    y = rect.top + rect.height / 2;
                    break;
            }

            setCoords({ x, y });
        }
        setIsOpen(!isOpen);
    };

    const getPopoverPosition = () => {
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
            <div ref={triggerRef} onClick={handleToggle} className="inline-block cursor-pointer">
                {trigger}
            </div>
            {isOpen && (
                <div
                    ref={popoverRef}
                    className="fixed z-50 animate-in fade-in zoom-in-95 duration-200"
                    style={getPopoverPosition()}
                >
                    <div className="bg-[#0f0f0f] border border-gray-700 rounded shadow-xl">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}
