
import React from 'react';

const TempleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2L2 7V9H4V18H20V9H22V7L12 2ZM11 16H9V12H11V16ZM15 16H13V12H15V16ZM6 10H8V11H6V10ZM16 10H18V11H16V10ZM12 4.44L17.56 7H6.44L12 4.44Z" />
  </svg>
);

export default TempleIcon;
