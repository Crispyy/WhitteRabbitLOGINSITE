import React from 'react';

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  loading = false,
  className = ''
}) {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-all duration-200';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90',
    secondary: 'bg-gray-700/30 text-gray-300 hover:bg-gray-700/50',
    danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}