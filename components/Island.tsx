

import React from 'react';

interface IslandProps {
  purchasedUpgrades: number[];
  activeUpgrades?: number[];
}

const Island: React.FC<IslandProps> = ({ purchasedUpgrades, activeUpgrades = [] }) => {
  const cosmeticUpgradeIds = [2, 3, 4, 5, 6, 7];
  const upgradeCount = purchasedUpgrades.filter(id => cosmeticUpgradeIds.includes(id)).length;
  const hasCity = purchasedUpgrades.includes(13);
  const hasGalaxy = purchasedUpgrades.includes(17);
  const hasHouse = purchasedUpgrades.includes(21);
  const hasMansion = purchasedUpgrades.includes(22);
  const hasWorld = purchasedUpgrades.includes(27);
  
  // ID 99 is "Terreno de Terra"
  const isDirt = activeUpgrades.includes(99);
  
  // Styles for the base island
  const baseColorClass = isDirt ? 'bg-amber-800' : 'bg-yellow-300';
  const highlightColorClass = isDirt ? 'bg-amber-700/70' : 'bg-yellow-200/70';

  if (hasGalaxy) {
    return (
        <div className="relative w-[350px] h-56 animate-fade-in flex justify-center items-center overflow-hidden rounded-full bg-gray-900 shadow-2xl shadow-indigo-500/50">
             {/* Stars */}
            <div className="absolute top-[15%] left-[5%] w-1.5 h-1.5 bg-white rounded-full opacity-90 animate-pulse delay-300"></div>
            <div className="absolute top-[20%] left-[85%] w-1 h-1 bg-white rounded-full opacity-70 animate-pulse delay-150"></div>
            <div className="absolute top-[50%] left-[10%] w-1 h-1 bg-white rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute top-[75%] left-[90%] w-2 h-2 bg-white rounded-full opacity-60 animate-pulse delay-75"></div>
            <div className="absolute top-[85%] left-[20%] w-1 h-1 bg-white rounded-full opacity-50 animate-pulse delay-200"></div>
            <div className="absolute top-[5%] left-[50%] w-1 h-1 bg-white rounded-full opacity-80 animate-pulse delay-400"></div>
            <div className="absolute top-[95%] left-[60%] w-1.5 h-1.5 bg-white rounded-full opacity-90 animate-pulse delay-500"></div>
            
            {/* Galaxy Core */}
            <div className="relative w-48 h-48 flex items-center justify-center animate-spin" style={{ animationDuration: '30s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}>
                {/* Arm 1 */}
                <div className="absolute w-24 h-8 bg-gradient-to-r from-purple-400 via-indigo-300 to-transparent rounded-full transform rotate-45 opacity-70"></div>
                {/* Arm 2 */}
                <div className="absolute w-24 h-8 bg-gradient-to-l from-teal-400 via-cyan-300 to-transparent rounded-full transform -rotate-45 opacity-70"></div>
                {/* Arm 3 */}
                <div className="absolute w-32 h-12 bg-gradient-to-r from-purple-400/50 to-transparent rounded-full transform rotate-120 opacity-50"></div>
                {/* Arm 4 */}
                <div className="absolute w-32 h-12 bg-gradient-to-l from-teal-400/50 to-transparent rounded-full transform -rotate-120 opacity-50"></div>
                {/* Center Glow */}
                <div className="w-8 h-8 bg-white rounded-full shadow-[0_0_20px_10px_rgba(255,255,255,0.7)]"></div>
            </div>

            {/* Spaceships */}
            {purchasedUpgrades.includes(12) && (
                <div className="absolute top-8 right-12 text-4xl animate-fade-in transform -rotate-45">🚀</div>
            )}
            {purchasedUpgrades.includes(11) && (
                <div className="absolute bottom-8 left-12 text-4xl animate-fade-in">🛸</div>
            )}
        </div>
    );
  }

  if (hasWorld) {
    return (
        <div className="relative w-[350px] h-56 animate-fade-in flex justify-center items-center">
            {/* Planet Earth */}
            <div className="w-48 h-48 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full shadow-2xl shadow-cyan-500/50 overflow-hidden relative">
                {/* Continents */}
                <div className="absolute top-[20%] left-[10%] w-16 h-12 bg-green-600 rounded-full transform -rotate-45 opacity-80"></div>
                <div className="absolute top-[50%] left-[60%] w-20 h-16 bg-green-500 rounded-full transform rotate-20 opacity-80"></div>
                <div className="absolute bottom-[10%] left-[25%] w-12 h-10 bg-green-700 rounded-full opacity-80"></div>
                 {/* Clouds */}
                <div className="absolute top-[15%] left-[50%] w-12 h-6 bg-white/50 rounded-full animate-pulse"></div>
                <div className="absolute bottom-[25%] left-[10%] w-16 h-8 bg-white/50 rounded-full animate-pulse delay-200"></div>
            </div>
             {/* Spaceships */}
            {purchasedUpgrades.includes(12) && (
                <div className="absolute top-8 right-12 text-4xl animate-fade-in transform -rotate-45">🚀</div>
            )}
            {purchasedUpgrades.includes(11) && (
                <div className="absolute bottom-8 left-12 text-4xl animate-fade-in">🛸</div>
            )}
        </div>
    );
  }

  if (hasMansion) {
    return (
        <div className="relative w-[400px] h-56 animate-fade-in flex justify-center items-end">
            {/* Grounds */}
            <div className="absolute bottom-0 w-full h-20 bg-green-600 rounded-t-full shadow-inner">
                <div className="absolute bottom-0 w-full h-8 bg-green-700/70 rounded-t-xl"></div>
            </div>
            
            {/* Mansion */}
            <div className="relative w-48 h-32 bg-stone-200 border-4 border-stone-400 rounded-t-lg shadow-2xl z-10">
                {/* Main door */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-16 bg-stone-800 rounded-t-full border-4 border-yellow-500"></div>
                {/* Columns */}
                <div className="absolute bottom-0 left-8 w-4 h-24 bg-stone-300 border-x-2 border-stone-400"></div>
                <div className="absolute bottom-0 right-8 w-4 h-24 bg-stone-300 border-x-2 border-stone-400"></div>
                {/* Roof */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[104px] border-l-transparent border-r-[104px] border-r-transparent border-b-[32px] border-b-red-800"></div>
                {/* Windows */}
                <div className="absolute top-4 left-4 w-6 h-8 bg-blue-300 border-2 border-white"></div>
                <div className="absolute top-4 right-4 w-6 h-8 bg-blue-300 border-2 border-white"></div>
            </div>
            
            {/* Fountain */}
            <div className="absolute bottom-8 left-12 w-10 h-6 bg-gray-400 rounded-t-md z-20">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-4 bg-blue-300 animate-pulse"></div>
            </div>

            {/* Plane and Helicopter */}
            {purchasedUpgrades.includes(12) && (
                <div className="absolute top-0 right-0 text-5xl animate-fade-in">✈️</div>
            )}
            {purchasedUpgrades.includes(11) && (
                <div className="absolute top-4 left-0 text-5xl animate-fade-in">🚁</div>
            )}
        </div>
    );
  }

  if (hasCity) {
    return (
        <div className="relative w-[350px] h-40 animate-fade-in">
            {/* Road */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gray-500 rounded-t-full shadow-inner"></div>
            {/* Buildings */}
            <div className="absolute bottom-8 left-[10%] w-12 h-24 bg-gray-300 border-2 border-gray-400"></div>
            <div className="absolute bottom-8 left-[30%] w-16 h-32 bg-blue-200 border-2 border-blue-300"></div>
            <div className="absolute bottom-8 left-[55%] w-12 h-20 bg-gray-300 border-2 border-gray-400"></div>
            <div className="absolute bottom-8 left-[75%] w-14 h-28 bg-blue-200 border-2 border-blue-300"></div>
            {/* Plane flying */}
            {purchasedUpgrades.includes(12) && (
                <div className="absolute top-0 right-0 text-4xl animate-fade-in">✈️</div>
            )}
             {/* Helicopter flying */}
            {purchasedUpgrades.includes(11) && (
                <div className="absolute top-4 left-0 text-4xl animate-fade-in">🚁</div>
            )}
        </div>
    );
  }

  if (hasHouse) {
    return (
        <div className="relative w-80 h-40 animate-fade-in">
            {/* Base Island & Water */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-20 ${baseColorClass} rounded-t-full rounded-b-xl shadow-inner`}>
                <div className={`absolute bottom-0 left-0 w-full h-8 ${highlightColorClass} rounded-b-xl`}></div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-96 h-10 bg-blue-400/50 rounded-full z-[-1]"></div>
            </div>
            {/* Palm Tree */}
            <div className="absolute bottom-16 left-1/4 -translate-x-1/2 w-4 h-12 bg-yellow-800 rounded-t-sm">
                <div className="absolute -top-6 -left-6 w-16 h-16">
                   <div className="absolute top-0 left-0 w-12 h-4 bg-green-600 rounded-full transform -rotate-45 origin-bottom-right"></div>
                   <div className="absolute top-4 -left-4 w-12 h-4 bg-green-600 rounded-full transform rotate-45 origin-bottom-left"></div>
                   <div className="absolute top-2 left-4 w-12 h-4 bg-green-600 rounded-full"></div>
                </div>
            </div>
            {/* House */}
            <div className="absolute bottom-12 right-[30%] w-24 h-20">
                {/* Base */}
                <div className="w-full h-14 bg-white border-2 border-gray-400 rounded-md shadow-lg"></div>
                {/* Roof */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[56px] border-l-transparent border-r-[56px] border-r-transparent border-b-[24px] border-b-red-700"></div>
                {/* Door */}
                <div className="absolute bottom-0 left-4 w-6 h-10 bg-yellow-800 rounded-t-sm border-2 border-yellow-900"></div>
                {/* Window */}
                <div className="absolute top-4 right-4 w-6 h-6 bg-blue-300 border-2 border-white">
                    <div className="w-full h-1/2 border-b-2 border-white"></div>
                    <div className="w-1/2 h-full border-r-2 border-white absolute top-0 left-0"></div>
                </div>
            </div>
            {/* Helicopter */}
            {purchasedUpgrades.includes(11) && (
                <div className="absolute bottom-2 right-4 w-12 h-12 animate-fade-in">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gray-500 border-2 border-gray-700 text-white flex items-center justify-center font-bold text-xl">H</div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-gray-400 rounded-sm"></div>
                </div>
            )}
            {/* Airplane */}
             {purchasedUpgrades.includes(12) && (
                <div className="absolute bottom-12 right-[-40px] w-32 h-4 bg-gray-600 rounded-sm animate-fade-in-up transform -rotate-12">
                     <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-2xl">✈️</div>
                </div>
            )}
        </div>
    );
  }
  
  return (
    <div className="relative w-80 h-40">
      {/* Base Island & Water */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-20 ${baseColorClass} rounded-t-full rounded-b-xl shadow-inner`}>
        <div className={`absolute bottom-0 left-0 w-full h-8 ${highlightColorClass} rounded-b-xl`}></div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-96 h-10 bg-blue-400/50 rounded-full z-[-1]"></div>
      </div>
      
      {/* Stage 0: Palm Tree */}
      <div className="absolute bottom-16 left-1/4 -translate-x-1/2 w-4 h-12 bg-yellow-800 rounded-t-sm">
        <div className="absolute -top-6 -left-6 w-16 h-16">
           <div className="absolute top-0 left-0 w-12 h-4 bg-green-600 rounded-full transform -rotate-45 origin-bottom-right"></div>
           <div className="absolute top-4 -left-4 w-12 h-4 bg-green-600 rounded-full transform rotate-45 origin-bottom-left"></div>
           <div className="absolute top-2 left-4 w-12 h-4 bg-green-600 rounded-full"></div>
        </div>
      </div>

      {/* Stage 1 (1 upgrade): Hut */}
      {upgradeCount >= 1 && (
        <div className="absolute bottom-12 right-1/4 w-16 h-12 animate-fade-in-up">
            <div className="w-full h-8 bg-amber-600 rounded-sm"></div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-700 rounded-t-lg"></div>
        </div>
      )}

      {/* Stage 2 (2 upgrades): Bridge */}
      {upgradeCount >= 2 && (
         <div className="absolute bottom-2 left-[-10px] w-20 h-4 bg-amber-800 rounded-sm animate-fade-in"></div>
      )}

      {/* Stage 3 (3 upgrades): Treasure Chest */}
      {upgradeCount >= 3 && (
        <div className="absolute bottom-6 left-[30%] w-8 h-6 bg-yellow-900 rounded-sm animate-fade-in">
            <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-10 h-3 bg-yellow-600 rounded-t-sm"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-3 bg-yellow-400 rounded-sm"></div>
        </div>
      )}

      {/* Stage 4 (4 upgrades): Flag */}
      {upgradeCount >= 4 && (
        <div className="absolute bottom-24 right-[30%] -translate-x-1/2 w-1 h-10 bg-gray-600 animate-fade-in-up">
            <div className="absolute top-0 right-1 w-6 h-4 bg-teal-500">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-black text-xs">C</div>
            </div>
        </div>
      )}

      {/* Helicopter */}
      {purchasedUpgrades.includes(11) && (
        <div className="absolute bottom-2 right-4 w-12 h-12 animate-fade-in">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gray-500 border-2 border-gray-700 text-white flex items-center justify-center font-bold text-xl">H</div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-gray-400 rounded-sm"></div>
        </div>
      )}

      {/* Airplane */}
       {purchasedUpgrades.includes(12) && (
        <div className="absolute bottom-12 right-[-40px] w-32 h-4 bg-gray-600 rounded-sm animate-fade-in-up transform -rotate-12">
             <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-2xl">✈️</div>
        </div>
      )}

    </div>
  );
};

export default Island;
