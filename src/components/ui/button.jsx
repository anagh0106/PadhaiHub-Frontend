import React from 'react';
import classNames from 'classnames';

export const Button = ({ children, onClick, variant = 'default', className = '' }) => {
    const baseStyles = 'px-4 py-2 rounded-md font-medium transition duration-200';
    const variants = {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border border-gray-400 text-gray-800 hover:bg-gray-200',
    };

    return (
        <button onClick={onClick} className={classNames(baseStyles, variants[variant], className)}>
            {children}
        </button>
    );
};
