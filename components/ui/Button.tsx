import React from 'react';
import { clsx } from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled = false,
}) => {
  const baseStyles =
    'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer';

  return (
    <button
     disabled={disabled}
      className={clsx(
        baseStyles,
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;