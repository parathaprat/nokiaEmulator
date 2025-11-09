import React from 'react';

interface PhoneShellProps {
  children?: React.ReactNode;
}

export const PhoneShell: React.FC<PhoneShellProps> = ({ children }) => {
  return (
    <div className="phone-shell-container">
      <div className="phone-shell" role="application" aria-label="Nokia 3310 Emulator">
        {children}
      </div>
    </div>
  );
};
