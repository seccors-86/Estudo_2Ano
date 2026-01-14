
import React from 'react';

interface IslandProps {
  purchasedUpgrades: number[];
  activeUpgrades?: number[];
}

const Island: React.FC<IslandProps> = ({ purchasedUpgrades, activeUpgrades = [] }) => {
  const cosmeticUpgradeIds = [2, 3, 4, 5, 6, 7];
  const upgradeCount = purchasedUpgrades.filter(id => cosmeticUpgradeIds.includes(id)).length;
  const hasCity = purchasedUpgrades.includes(13);
  const hasHouse = purchasedUpgrades.includes(21);
  const hasMansion = purchasedUpgrades.includes(22);
  const hasCastle = purchasedUpgrades.includes(60);
  
  // Level 2 Island: Emerald Fortress (ID 9002)
  const hasEmeraldFortress = activeUpgrades.includes(9002);
  
  // New T-Rexs Islands
  const hasForestTreehouse = activeUpgrades.includes(9004);
  const hasGiantDesert = activeUpgrades.includes(9005);
  
  // ID 99 is "Terreno de Terra"
  const isDirt = activeUpgrades.includes(99);
  
  // Styles for the base island
  const baseColorClass = isDirt ? 'bg-amber-800' : 'bg-yellow-300';
  const highlightColorClass = isDirt ? 'bg-amber-700/70' : 'bg-yellow-200/70';

  if (hasGiantDesert) {
      return (
        <div className="relative w-[600px] h-72 animate-fade-in flex justify-center items-end -mx-20">
            {/* Vast Sand Base */}
            <div className="absolute bottom-0 w-full h-32 bg-orange-200 rounded-[100%] border-t-8 border-orange-300 shadow-xl"></div>
            
            {/* Sand Dunes */}
            <div className="absolute bottom-10 left-0 w-1/2 h-20 bg-orange-300 rounded-tr-full"></div>
            <div className="absolute bottom-10 right-0 w-1/2 h-24 bg-orange-300 rounded-tl-full"></div>
            
            {/* Cactus */}
            <div className="absolute bottom-20 left-[20%] w-6 h-20 bg-green-700 rounded-full border border-green-900">
                <div className="absolute top-6 -left-4 w-4 h-8 bg-green-700 rounded-b-full border border-green-900 border-t-0"></div>
                <div className="absolute top-4 -right-4 w-4 h-6 bg-green-700 rounded-b-full border border-green-900 border-t-0"></div>
            </div>
            
            {/* Another Cactus */}
            <div className="absolute bottom-24 right-[25%] w-4 h-12 bg-green-800 rounded-full"></div>

            {/* Pyramid in background (small) */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[60px] border-b-yellow-600 opacity-80"></div>

            {/* Sun/Heat Haze effect handled globally via filter in App.tsx, but visual props here */}
            {purchasedUpgrades.includes(12) && (
                <div className="absolute top-0 right-10 text-5xl animate-fade-in opacity-80">✈️</div>
            )}
        </div>
      );
  }

  if (hasForestTreehouse) {
      return (
        <div className="relative w-[400px] h-96 animate-fade-in flex justify-center items-end">
            {/* Giant Trunk */}
            <div className="absolute bottom-0 w-24 h-64 bg-amber-900 rounded-lg border-x-4 border-amber-950">
                {/* Roots */}
                <div className="absolute -bottom-2 -left-8 w-12 h-8 bg-amber-900 rounded-full skew-x-12"></div>
                <div className="absolute -bottom-2 -right-8 w-12 h-8 bg-amber-900 rounded-full -skew-x-12"></div>
            </div>

            {/* Canopy */}
            <div className="absolute top-0 w-80 h-48 bg-green-700 rounded-full border-4 border-green-900 shadow-xl z-10 flex justify-center items-center">
                <div className="absolute -top-10 left-10 w-32 h-32 bg-green-600 rounded-full opacity-50"></div>
                <div className="absolute -top-4 right-10 w-40 h-40 bg-green-600 rounded-full opacity-50"></div>
            </div>

            {/* Treehouse */}
            <div className="absolute top-16 z-20 w-32 h-28 bg-amber-700 border-2 border-amber-900 rounded-lg shadow-inner">
                {/* Roof */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-b-[40px] border-b-amber-950"></div>
                {/* Door */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-16 bg-black rounded-t-full"></div>
                {/* Window */}
                <div className="absolute top-4 left-4 w-6 h-6 bg-yellow-200 rounded-full border-2 border-amber-900"></div>
            </div>

            {/* Ladder */}
            <div className="absolute bottom-0 left-[55%] w-6 h-64 border-x-2 border-amber-950 z-0">
                {Array.from({length: 8}).map((_,i) => (
                    <div key={i} className="w-full h-1 bg-amber-950 mt-6"></div>
                ))}
            </div>

            {/* Empress Emeralds */}
            <div className="absolute top-20 -left-12 text-4xl animate-bounce" style={{animationDuration: '2.5s'}}>❇️</div>
            <div className="absolute top-32 -right-12 text-4xl animate-bounce" style={{animationDuration: '3s'}}>❇️</div>
        </div>
      );
  }

  if (hasEmeraldFortress) {
      return (
        <div className="relative w-[450px] h-72 animate-fade-in flex justify-center items-end">
            {/* Floating Base */}
            <div className="absolute bottom-10 w-full h-32 bg-gradient-to-b from-green-900 to-black rounded-[100%] opacity-80 blur-sm animate-pulse"></div>
            <div className="absolute bottom-20 w-[400px] h-20 bg-green-600 rounded-full border-4 border-green-300 shadow-[0_0_50px_rgba(0,255,0,0.5)]"></div>
            
            {/* Crystal Spikes */}
            <div className="absolute bottom-32 left-[20%] w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[80px] border-b-green-400 opacity-80"></div>
            <div className="absolute bottom-32 right-[20%] w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[100px] border-b-green-500 opacity-80"></div>
            
            {/* Main Crystal Tower */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-32 h-64 bg-green-500/90 clip-triangle border-x-2 border-white/50 backdrop-blur-sm">
                {/* Glowing Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full blur-md animate-pulse"></div>
            </div>

            {/* Floating Rocks */}
            <div className="absolute top-0 left-0 w-10 h-8 bg-green-800 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
            <div className="absolute top-10 right-0 w-12 h-10 bg-green-700 rounded-full animate-bounce" style={{animationDuration: '4s'}}></div>

            {/* Flying Vehicle Override */}
            {purchasedUpgrades.includes(12) && (
                <div className="absolute top-0 right-10 text-5xl animate-fade-in">✈️</div>
            )}
        </div>
      );
  }

  if (hasCastle) {
      return (
        <div className="relative w-[420px] h-64 animate-fade-in flex justify-center items-end">
            {/* Moat/Grounds */}
            <div className="absolute bottom-0 w-full h-24 bg-blue-800 rounded-t-[50px] shadow-inner border-t-8 border-gray-600"></div>
            
            {/* Drawbridge */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-24 bg-yellow-900 border-x-4 border-black"></div>

            {/* Castle Main */}
            <div className="relative w-64 h-48 bg-gray-400 border-4 border-gray-600 rounded-t-lg z-10 flex justify-center">
                 {/* Main Gate */}
                 <div className="absolute bottom-0 w-24 h-32 bg-gray-800 rounded-t-full border-4 border-gray-600">
                    <div className="w-full h-full border-2 border-black bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,#000_10px,#000_12px)] opacity-50"></div>
                 </div>
                 
                 {/* Battlements */}
                 <div className="absolute -top-4 w-full h-4 flex justify-between px-2">
                     <div className="w-4 h-6 bg-gray-400 border-2 border-gray-600"></div>
                     <div className="w-4 h-6 bg-gray-400 border-2 border-gray-600"></div>
                     <div className="w-4 h-6 bg-gray-400 border-2 border-gray-600"></div>
                     <div className="w-4 h-6 bg-gray-400 border-2 border-gray-600"></div>
                     <div className="w-4 h-6 bg-gray-400 border-2 border-gray-600"></div>
                 </div>

                 {/* Towers */}
                 <div className="absolute bottom-0 -left-12 w-16 h-64 bg-gray-500 border-4 border-gray-700 rounded-t-lg">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-10 bg-blue-900 clip-triangle"></div>
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-12 bg-black rounded-full"></div>
                 </div>
                 <div className="absolute bottom-0 -right-12 w-16 h-64 bg-gray-500 border-4 border-gray-700 rounded-t-lg">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-10 bg-blue-900 clip-triangle"></div>
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-12 bg-black rounded-full"></div>
                 </div>
            </div>

            {/* Dragon flying (replaces helicopter) */}
            {purchasedUpgrades.includes(11) && (
                <div className="absolute top-0 right-[-20px] text-6xl animate-bounce" style={{animationDuration: '3s'}}>🐉</div>
            )}
            
            {/* Surfboard in water (ID 52) */}
            {activeUpgrades.includes(52) && (
                <div className="absolute bottom-4 left-10 w-16 h-4 bg-yellow-400 rounded-full border-2 border-orange-500 transform rotate-6 animate-wiggle">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-orange-500"></div>
                </div>
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
            
            {/* Surfboard (ID 52) */}
            {activeUpgrades.includes(52) && (
                <div className="absolute bottom-2 left-4 w-12 h-3 bg-yellow-400 rounded-full border border-orange-500 transform -rotate-12 z-20"></div>
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
            
             {/* Surfboard (ID 52) */}
            {activeUpgrades.includes(52) && (
                <div className="absolute bottom-[-10px] left-10 w-16 h-4 bg-yellow-400 rounded-full border-2 border-orange-500 transform rotate-3 animate-wiggle z-20"></div>
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
      
      {/* Surfboard (ID 52) */}
       {activeUpgrades.includes(52) && (
            <div className="absolute bottom-[-10px] left-8 w-14 h-4 bg-yellow-400 rounded-full border-2 border-orange-500 transform rotate-3 animate-wiggle z-20"></div>
        )}

    </div>
  );
};

export default Island;
