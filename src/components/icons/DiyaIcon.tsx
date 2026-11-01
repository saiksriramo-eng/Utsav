import React from 'react';

interface DiyaIconProps {
  className?: string;
  size?: number;
}

export const DiyaIcon: React.FC<DiyaIconProps> = ({
  className = 'w-5 h-5',
  size = 24,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Flame (Golden Amber / Terracotta) */}
      <path
        d="M12 2C12 2 15 5.5 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 5.5 12 2 12 2Z"
        fill="#E59852"
      />
      {/* Inner Flame Glow (Warm Gold) */}
      <path
        d="M12 4.5C12 4.5 13.8 6.5 13.8 8C13.8 9 13 9.8 12 9.8C11 9.8 10.2 9 10.2 8C10.2 6.5 12 4.5 12 4.5Z"
        fill="#FDD835"
      />
      {/* Diya Base / Oil Lamp Body (Earthen Terracotta curve) */}
      <path
        d="M3.5 12.5C4.5 12.5 5.5 13 6.5 13.5C8 14.2 10 14.8 12 14.8C14 14.8 16 14.2 17.5 13.5C18.5 13 19.5 12.5 20.5 12.5C21.2 12.5 21.6 13.2 21.2 13.8C19.8 16.5 16.2 19.5 12 19.5C7.8 19.5 4.2 16.5 2.8 13.8C2.4 13.2 2.8 12.5 3.5 12.5Z"
        fill="currentColor"
      />
      {/* Diya Lamp Base Pedestal */}
      <path
        d="M9 19.5C9.5 20.5 10.6 21.2 12 21.2C13.4 21.2 14.5 20.5 15 19.5H9Z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Rim Highlight / Oil Surface */}
      <path
        d="M5 13.2C7 14 9.4 14.5 12 14.5C14.6 14.5 17 14 19 13.2"
        stroke="#E59852"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DiyaIcon;
