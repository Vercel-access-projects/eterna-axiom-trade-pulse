import React from 'react';

interface SolanaIconProps {
  className?: string;
  size?: number;
}

export default function SolanaIcon({ className = '', size = 16 }: SolanaIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 397.7 311.7"
      className={className}
      fill="currentColor"
    >
      <linearGradient id="solana-gradient" x1="360.8791" y1="351.4553" x2="141.213" y2="-69.2936" gradientTransform="matrix(1 0 0 -1 0 314)" gradientUnits="userSpaceOnUse">
        <stop offset="0" style={{ stopColor: '#00FFA3' }} />
        <stop offset="1" style={{ stopColor: '#DC1FFF' }} />
      </linearGradient>
      <path
        fill="url(#solana-gradient)"
        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
      />
      <path
        fill="url(#solana-gradient)"
        d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
      />
      <path
        fill="url(#solana-gradient)"
        d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
      />
    </svg>
  );
}
