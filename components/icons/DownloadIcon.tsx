
import React from 'react';

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M5 20H19V18H5V20ZM19 9H15V3H9V9H5L12 16L19 9Z" />
  </svg>
);

export default DownloadIcon;
