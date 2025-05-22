import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  to?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
    xl: 'px-10 py-4 text-xl',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-edizo-red text-white hover:bg-red-600 focus:ring-2 ring-offset-2 ring-edizo-red',
    secondary: 'bg-gray-100 text-edizo-black hover:bg-gray-200 focus:ring-2 ring-offset-2 ring-gray-300',
    outline: 'border border-edizo-red text-edizo-red hover:bg-edizo-red hover:text-white focus:ring-2 ring-offset-2 ring-edizo-red',
    ghost: 'text-edizo-red hover:text-red-600 focus:ring-2 ring-offset-2 ring-edizo-red',
  };

  const combinedClasses = `
    ${variantClasses[variant]} 
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
    rounded-md font-medium transition-all duration-300 ease-in-out flex items-center justify-center gap-2
  `;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {iconLeft && <span>{iconLeft}</span>}
        {children}
        {iconRight && <span>{iconRight}</span>}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
      >
        {iconLeft && <span>{iconLeft}</span>}
        {children}
        {iconRight && <span>{iconRight}</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {iconLeft && <span>{iconLeft}</span>}
      {children}
      {iconRight && <span>{iconRight}</span>}
    </button>
  );
};

export default Button;