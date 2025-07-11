// src/components/ui/card.jsx
import React from 'react';

const Card = ({ children, className = '' }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${className}`}>
        {children}
    </div>
);

const CardContent = ({ children, className = '' }) => (
    <div className={className}>{children}</div>
);


export { Card, CardContent };