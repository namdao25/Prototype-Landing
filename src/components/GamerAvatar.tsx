/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface GamerAvatarProps {
  seed: string;
  size?: number;
  bgColor?: string;
  className?: string;
}

export const GamerAvatar: React.FC<GamerAvatarProps> = ({
  seed,
  size = 64,
  bgColor = "#DF5834",
  className = ""
}) => {
  // Simple deterministic engine to choose cute retro features based on seed
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const code = hashCode(seed);
  const faceType = code % 4; // 0: happy, 1: focus goggles, 2: retro sunglasses, 3: mask
  const hairStyle = (code >> 2) % 4; // hair/helmet variety
  const headsetColor = (code >> 4) % 2 === 0 ? "#2C0B12" : "#FAF6EE";

  return (
    <div
      className={`relative inline-flex items-center justify-center border-wood shadow-wood-sm rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: bgColor,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Face Contour Base */}
        <circle cx="50" cy="54" r="28" fill="#ECE2D0" stroke="#2C0B12" strokeWidth="4.5" />

        {/* Head/Hair/Cap styles */}
        {hairStyle === 0 && (
          // Cap backwards
          <path d="M22 46 C22 30, 78 30, 78 46 L78 35 C78 22, 22 22, 22 35 Z" fill="#2C0B12" stroke="#2C0B12" strokeWidth="4" />
        )}
        {hairStyle === 1 && (
          // Spiky gaming hair
          <path d="M20 40 L30 20 L42 30 L50 15 L58 30 L70 20 L80 40 Z" fill="#2C0B12" stroke="#2C0B12" strokeWidth="4.5" />
        )}
        {hairStyle === 2 && (
          // Side Swept
          <path d="M22 42 C22 24, 60 14, 78 34 C64 26, 36 30, 22 42 Z" fill="#2C0B12" stroke="#2C0B12" strokeWidth="4" />
        )}
        {hairStyle === 3 && (
          // Bandana
          <>
            <path d="M21 39 C35 30, 65 30, 79 39 L78 32 C65 24, 35 24, 22 32 Z" fill="#EA9F3E" stroke="#2C0B12" strokeWidth="4" />
            <rect x="42" y="27" width="16" height="6" rx="2" fill="#FAF6EE" stroke="#2C0B12" strokeWidth="3" />
          </>
        )}

        {/* Eye/Face Facial Features */}
        {faceType === 0 && (
          // Happy Gamer
          <>
            {/* Eyes */}
            <circle cx="40" cy="52" r="4.5" fill="#2C0B12" />
            <circle cx="60" cy="52" r="4.5" fill="#2C0B12" />
            {/* Smile */}
            <path d="M42 64 Q50 72 58 64" stroke="#2C0B12" strokeWidth="4.5" strokeLinecap="round" />
            {/* Blush */}
            <ellipse cx="32" cy="59" rx="3.5" ry="2" fill="#DF5834" opacity="0.6" />
            <ellipse cx="68" cy="59" rx="3.5" ry="2" fill="#DF5834" opacity="0.6" />
          </>
        )}

        {faceType === 1 && (
          // Gamer VR Goggles / Focus Visor
          <>
            <rect x="28" y="44" width="44" height="15" rx="5" fill="#2C0B12" stroke="#2C0B12" strokeWidth="4.5" />
            <line x1="33" y1="51.5" x2="67" y2="51.5" stroke="#EA9F3E" strokeWidth="3.5" strokeLinecap="round" />
            {/* Laser glow */}
            <circle cx="50" cy="51.5" r="3" fill="#FAF6EE" />
            <path d="M44 67 Q50 71 56 67" stroke="#2C0B12" strokeWidth="4.5" strokeLinecap="round" />
          </>
        )}

        {faceType === 2 && (
          // Retro Sunglasses
          <>
            <path d="M26 46 L46 46 L42 58 L28 58 Z" fill="#2C0B12" stroke="#2C0B12" strokeWidth="4" />
            <path d="M54 46 L74 46 L72 58 L58 58 Z" fill="#2C0B12" stroke="#2C0B12" strokeWidth="4" />
            <line x1="45" y1="46" x2="55" y2="46" stroke="#2C0B12" strokeWidth="4.5" />
            {/* Glare line */}
            <line x1="31" y1="49" x2="35" y2="55" stroke="#FAF6EE" strokeWidth="2.5" />
            <line x1="59" y1="49" x2="63" y2="55" stroke="#FAF6EE" strokeWidth="2.5" />
            {/* Smirk */}
            <path d="M45 66 Q52 64 57 66" stroke="#2C0B12" strokeWidth="4" strokeLinecap="round" />
          </>
        )}

        {faceType === 3 && (
          // Tactical Mask
          <>
            {/* Narrow Focused Eyes */}
            <path d="M34 49 Q40 45 44 49" stroke="#2C0B12" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M56 49 Q60 45 66 49" stroke="#2C0B12" strokeWidth="5.5" strokeLinecap="round" />
            {/* Mask plate covering mouth/nose */}
            <path d="M27 60 C27 75, 73 75, 73 60 L70 54 L30 54 Z" fill="#2C0B12" />
            <line x1="44" y1="60" x2="44" y2="68" stroke="#ECE2D0" strokeWidth="3.5" />
            <line x1="50" y1="60" x2="50" y2="68" stroke="#ECE2D0" strokeWidth="3.5" />
            <line x1="56" y1="60" x2="56" y2="68" stroke="#ECE2D0" strokeWidth="3.5" />
          </>
        )}

        {/* Vintage Gaming Headset */}
        <path
          d="M23 54 C23 32, 77 32, 77 54"
          stroke={headsetColor}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Headset wire details */}
        <path
          d="M21 54 C21 30, 79 30, 79 54"
          stroke="#2C0B12"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Earcups */}
        <rect
          x="12"
          y="46"
          width="12"
          height="20"
          rx="4"
          fill={headsetColor}
          stroke="#2C0B12"
          strokeWidth="4"
        />
        <rect
          x="76"
          y="46"
          width="12"
          height="20"
          rx="4"
          fill={headsetColor}
          stroke="#2C0B12"
          strokeWidth="4"
        />

        {/* Mic boom coming out of left earcup */}
        <path d="M18 64 Q22 78 36 78" stroke="#2C0B12" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="36" cy="78" r="4.5" fill="#DF5834" stroke="#2C0B12" strokeWidth="2.5" />
      </svg>
    </div>
  );
};
