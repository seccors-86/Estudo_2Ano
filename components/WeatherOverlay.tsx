import React from 'react';

const WeatherOverlay: React.FC = () => {
    const RAIN_COUNT = 150;

    return (
        <div 
            className="fixed inset-0 pointer-events-none" 
            aria-hidden="true"
        >
            {Array.from({ length: RAIN_COUNT }).map((_, i) => {
                const style = {
                    left: `${Math.random() * 100}vw`,
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                    animationDelay: `${Math.random() * 6}s`,
                };
                return <div key={i} className="raindrop" style={style}></div>;
            })}
        </div>
    );
};

export default WeatherOverlay;
