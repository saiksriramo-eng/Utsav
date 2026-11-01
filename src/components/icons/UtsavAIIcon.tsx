import React from 'react';

interface UtsavAIIconProps {
  className?: string;
  size?: number;
}

export const UtsavAIIcon: React.FC<UtsavAIIconProps> = ({
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
      {/* Central 4-pointed rounded star/sparkle */}
      <path
        d="M12 3.5C12 7.2 9.2 10 5.5 11.5C9.2 13 12 15.8 12 19.5C12 15.8 14.8 13 18.5 11.5C14.8 10 12 7.2 12 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top right small cross / plus */}
      <path
        d="M19.5 4.5V8M17.8 6.25H21.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Bottom left small hollow circle */}
      <circle
        cx="5.8"
        cy="18.2"
        r="1.8"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

export default UtsavAIIcon;

