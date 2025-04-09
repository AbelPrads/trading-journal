import React from 'react';

export const renderDirection = (direction) => {
    
    const tradeDirection = direction.toUpperCase();

    if (tradeDirection === 'LONG') {
        return (
            <p className= "text-[10px] font-albert font-light tracking-wide text-[#86FF8C]">
                LONG
            </p>
        )
    } else {
        return (
            <p className= "text-[10px] font-albert font-light tracking-wide text-[#FF5F5F]">
                SHORT
            </p>
        )
    }
};

export default renderDirection;