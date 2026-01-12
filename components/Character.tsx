
import React from 'react';
import type { CharacterType } from '../types';

interface CharacterProps {
  type: CharacterType;
  activeUpgrades: number[];
  activeTattoo: string | null;
  hasMiniPet?: boolean; // Kept for backward compat if needed, but miniPetCount is preferred
  miniPetCount?: number;
}

const KittenCharacter: React.FC = () => (
    <>
        {/* Tail */}
        <div className="absolute bottom-4 -right-8 w-6 h-20 bg-gray-400 rounded-full transform -rotate-45 origin-bottom-left z-[-1]"></div>
        {/* Body */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-24 bg-gray-500 rounded-t-full"></div>
        {/* Head */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-28 bg-gray-500 rounded-full">
            {/* Ears */}
            <div className="absolute -top-2 left-2 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-gray-600 border-r-[20px] border-r-transparent transform -rotate-12"></div>
            <div className="absolute -top-2 right-2 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-gray-600 border-r-[20px] border-r-transparent transform rotate-12"></div>
            {/* Eyes */}
            <div className="absolute top-14 left-8 w-6 h-6 bg-white rounded-full border-2 border-black/80"><div className="w-3 h-3 bg-black rounded-full absolute top-1 right-1"></div></div>
            <div className="absolute top-14 right-8 w-6 h-6 bg-white rounded-full border-2 border-black/80"><div className="w-3 h-3 bg-black rounded-full absolute top-1 left-1"></div></div>
            {/* Nose */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-4 h-3 bg-pink-300 rounded-b-md"></div>
            {/* Whiskers */}
            <div className="absolute top-16 -left-2 w-8 h-px bg-black transform -rotate-12"></div>
            <div className="absolute top-20 -left-2 w-8 h-px bg-black"></div>
            <div className="absolute top-16 -right-2 w-8 h-px bg-black transform rotate-12 origin-right"></div>
            <div className="absolute top-20 -right-2 w-8 h-px bg-black origin-right"></div>
        </div>
    </>
);

const DogCharacter: React.FC = () => (
    <>
        {/* Tail */}
        <div className="absolute bottom-6 -right-6 w-8 h-8 bg-amber-600 rounded-l-full transform rotate-45 animate-wiggle origin-bottom-left z-[-1]"></div>
        {/* Body */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-28 bg-amber-500 rounded-t-3xl"></div>
        {/* Head */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-36 h-32 bg-amber-500 rounded-t-full">
            {/* Ears */}
            <div className="absolute -top-1 -left-2 w-12 h-20 bg-amber-600 rounded-2xl transform -rotate-12"></div>
            <div className="absolute -top-1 -right-2 w-12 h-20 bg-amber-600 rounded-2xl transform rotate-12"></div>
            {/* Eyes */}
            <div className="absolute top-14 left-8 w-5 h-5 bg-black rounded-full"></div>
            <div className="absolute top-14 right-8 w-5 h-5 bg-black rounded-full"></div>
            {/* Snout */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-16 h-12 bg-amber-400 rounded-t-xl">
                 {/* Nose */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-5 bg-black rounded-md"></div>
                {/* Mouth */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-1 h-4 bg-black"></div>
                <div className="absolute top-8 left-1/2 -translate-x-full w-4 h-4 border-b-2 border-l-2 border-black rounded-bl-full"></div>
                <div className="absolute top-8 left-1/2 w-4 h-4 border-b-2 border-r-2 border-black rounded-br-full"></div>
            </div>
        </div>
    </>
);

const ParrotCharacter: React.FC = () => (
    <>
        {/* Perch */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-4 bg-yellow-900 rounded-full border-2 border-yellow-950"></div>
        {/* Feet */}
        <div className="absolute bottom-2 left-1/2 -translate-x-4 w-4 h-4 bg-yellow-500 rounded-b-md border-2 border-yellow-600"></div>
        <div className="absolute bottom-2 left-1/2 w-4 h-4 bg-yellow-500 rounded-b-md border-2 border-yellow-600"></div>
        {/* Body */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-28 bg-red-600 rounded-t-full"></div>
        {/* Wing */}
        <div className="absolute bottom-8 left-1/2 -translate-x-[90%] w-10 h-16 bg-blue-500 rounded-t-full rounded-b-lg transform -rotate-12"></div>
        {/* Head */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-20 h-20 bg-red-600 rounded-full">
            {/* Eye */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 w-6 h-6 bg-white rounded-full border-2 border-black"><div className="w-3 h-3 bg-black rounded-full ml-1 mt-1"></div></div>
            {/* Beak */}
            <div className="absolute top-1/2 left-14 w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-yellow-400 border-b-[15px] border-b-transparent"></div>
        </div>
    </>
);

const KangarooCharacter: React.FC = () => (
    <>
        {/* Tail */}
        <div className="absolute bottom-0 -right-12 w-12 h-24 bg-amber-800 rounded-t-full rounded-b-lg transform -rotate-45 origin-bottom-left z-[-1]"></div>
        {/* Feet */}
        <div className="absolute bottom-0 left-1/2 -translate-x-[120%] w-16 h-8 bg-amber-800 rounded-t-lg"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-[-20%] w-16 h-8 bg-amber-800 rounded-t-lg"></div>
        {/* Body */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-700 rounded-t-full">
            {/* Pouch */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-10 bg-amber-600 rounded-t-full"></div>
        </div>
        {/* Head */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-24 h-28 bg-amber-700 rounded-t-full">
            {/* Ears */}
            <div className="absolute -top-4 -left-2 w-10 h-16 bg-amber-800 rounded-t-full transform -rotate-12"></div>
            <div className="absolute -top-4 -right-2 w-10 h-16 bg-amber-800 rounded-t-full transform rotate-12"></div>
            {/* Eyes */}
            <div className="absolute top-12 left-6 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute top-12 right-6 w-4 h-4 bg-black rounded-full"></div>
            {/* Muzzle */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-12 h-10 bg-amber-600 rounded-t-lg">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-5 h-4 bg-black rounded-md"></div>
            </div>
        </div>
    </>
);

const CellphoneCharacter: React.FC = () => (
    <>
        {/* Body */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-40 bg-gray-700 border-4 border-gray-900 rounded-2xl shadow-lg">
            {/* Screen */}
            <div className="absolute inset-2 bg-gray-900 rounded-lg flex flex-col items-center justify-center">
                {/* Eyes */}
                <div className="flex gap-4">
                    <div className="w-5 h-5 bg-cyan-300 rounded-full animate-pulse"></div>
                    <div className="w-5 h-5 bg-cyan-300 rounded-full animate-pulse delay-150"></div>
                </div>
                {/* Mouth */}
                <div className="mt-4 w-8 h-4 border-b-4 border-l-4 border-r-4 border-cyan-300 rounded-b-full"></div>
            </div>
            {/* Camera */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-gray-800 rounded-full"></div>
            {/* Side buttons */}
            <div className="absolute top-12 -left-2 w-1 h-6 bg-gray-800 rounded-l-md"></div>
            <div className="absolute top-20 -left-2 w-1 h-4 bg-gray-800 rounded-l-md"></div>
        </div>
    </>
);

const RobotCharacter: React.FC = () => (
    <>
        {/* Legs */}
        <div className="absolute bottom-0 left-[35%] w-8 h-16 bg-slate-400 border-2 border-slate-600 rounded-b-lg"></div>
        <div className="absolute bottom-0 right-[35%] w-8 h-16 bg-slate-400 border-2 border-slate-600 rounded-b-lg"></div>
        
        {/* Body */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-28 bg-slate-300 border-4 border-slate-500 rounded-xl flex items-center justify-center">
             {/* Chest Plate - Now with 67 */}
             <div className="w-20 h-16 bg-slate-800 border-2 border-slate-600 rounded-md flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>
                 {/* Scanlines */}
                 <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                 <span className="text-green-400 font-mono text-4xl font-bold tracking-tighter drop-shadow-[0_0_5px_rgba(74,222,128,0.8)] z-10">67</span>
             </div>
        </div>

        {/* Arms */}
        <div className="absolute bottom-24 -left-4 w-8 h-20 bg-slate-400 border-2 border-slate-600 rounded-full transform rotate-12 origin-top"></div>
        <div className="absolute bottom-24 -right-4 w-8 h-20 bg-slate-400 border-2 border-slate-600 rounded-full transform -rotate-12 origin-top"></div>

        {/* Head */}
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-24 h-20 bg-slate-300 border-4 border-slate-500 rounded-lg">
             {/* Eyes visor */}
             <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-sm border border-slate-600 flex items-center justify-center gap-4">
                  <div className="w-4 h-2 bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,1)] animate-pulse"></div>
                  <div className="w-4 h-2 bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,1)] animate-pulse"></div>
             </div>
             {/* Antenna */}
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-6 bg-slate-500"></div>
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        </div>
    </>
);

const PandaCharacter: React.FC = () => (
    <>
         {/* Ears */}
        <div className="absolute top-16 left-8 w-9 h-9 bg-black rounded-full z-[-1]"></div>
        <div className="absolute top-16 right-8 w-9 h-9 bg-black rounded-full z-[-1]"></div>
        
        {/* Legs/Arms */}
        <div className="absolute bottom-6 left-8 w-8 h-12 bg-black rounded-full transform rotate-12 z-[-1]"></div>
        <div className="absolute bottom-6 right-8 w-8 h-12 bg-black rounded-full transform -rotate-12 z-[-1]"></div>
        
        {/* Body */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-28 bg-white border-2 border-gray-200 rounded-t-3xl"></div>
        
        {/* Head */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-36 h-30 bg-white border-2 border-gray-200 rounded-full">
            {/* Eye Patches */}
            <div className="absolute top-10 left-6 w-10 h-8 bg-black rounded-full transform -rotate-12">
                 {/* Eyes */}
                <div className="absolute top-2 left-3 w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-10 right-6 w-10 h-8 bg-black rounded-full transform rotate-12">
                 {/* Eyes */}
                <div className="absolute top-2 right-3 w-3 h-3 bg-white rounded-full"></div>
            </div>
            
            {/* Nose */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-5 h-3 bg-black rounded-full"></div>
        </div>
    </>
);


const TattooRenderer: React.FC<{ tattooId: string }> = ({ tattooId }) => {
  switch (tattooId) {
    case 'star':
      return <div className="text-2xl text-yellow-400" style={{ textShadow: '0 0 5px black' }}>★</div>;
    case 'anchor':
       return <div className="text-2xl text-gray-700" style={{ textShadow: '0 0 3px white' }}>⚓</div>;
    case 'heart':
        return <div className="text-2xl text-red-500" style={{ textShadow: '0 0 3px black' }}>♥</div>;
    default:
      return null;
  }
};

const MiniPetSixSeven: React.FC<{ styleClass?: string }> = ({ styleClass }) => (
    <div className={`w-10 h-10 animate-bounce ${styleClass}`} style={{ animationDuration: '2s' }}>
        {/* Body */}
        <div className="relative w-full h-full bg-gradient-to-tr from-purple-600 to-indigo-400 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)] border-2 border-white flex items-center justify-center z-10">
            <span className="text-white font-bold text-[8px] tracking-tighter">6666</span>
        </div>
        {/* Wings */}
        <div className="absolute top-2 -left-3 w-4 h-3 bg-purple-300 rounded-full transform -rotate-12 opacity-80 animate-wiggle"></div>
        <div className="absolute top-2 -right-3 w-4 h-3 bg-purple-300 rounded-full transform rotate-12 opacity-80 animate-wiggle"></div>
        {/* Glow */}
        <div className="absolute inset-0 bg-purple-400 blur-md opacity-40 rounded-full animate-pulse"></div>
    </div>
);

const SixSevenCharacter: React.FC = () => (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" style={{ animationDuration: '3s' }}>
        {/* Fire/Thrust Effects */}
        <div className="absolute -bottom-8 left-[30%] -translate-x-1/2 w-6 h-12 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute -bottom-8 right-[30%] translate-x-1/2 w-6 h-12 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 rounded-full blur-sm animate-pulse delay-75"></div>

        {/* Legs (Shortened/Thrusters) */}
        <div className="absolute bottom-0 left-[35%] w-8 h-8 bg-slate-400 border-2 border-slate-600 rounded-b-lg"></div>
        <div className="absolute bottom-0 right-[35%] w-8 h-8 bg-slate-400 border-2 border-slate-600 rounded-b-lg"></div>

        {/* Body */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-28 bg-slate-300 border-4 border-slate-500 rounded-xl flex items-center justify-center">
             {/* Chest Plate - With 6666 */}
             <div className="w-24 h-16 bg-slate-800 border-2 border-slate-600 rounded-md flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>
                 {/* Scanlines */}
                 <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                 <span className="text-green-400 font-mono text-3xl font-bold tracking-tighter drop-shadow-[0_0_5px_rgba(74,222,128,0.8)] z-10">6666</span>
             </div>
        </div>

        {/* Arms */}
        <div className="absolute bottom-16 -left-4 w-8 h-20 bg-slate-400 border-2 border-slate-600 rounded-full transform rotate-12 origin-top"></div>
        <div className="absolute bottom-16 -right-4 w-8 h-20 bg-slate-400 border-2 border-slate-600 rounded-full transform -rotate-12 origin-top"></div>

        {/* Head */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-24 h-20 bg-slate-300 border-4 border-slate-500 rounded-lg">
             {/* Eyes visor */}
             <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-sm border border-slate-600 flex items-center justify-center gap-4">
                  <div className="w-4 h-2 bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,1)] animate-pulse"></div>
                  <div className="w-4 h-2 bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,1)] animate-pulse"></div>
             </div>
             {/* Antenna */}
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-6 bg-slate-500"></div>
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        </div>
    </div>
);


const Character: React.FC<CharacterProps> = ({ type, activeUpgrades, activeTattoo, hasMiniPet, miniPetCount = 0 }) => {
  
  // Backward compatibility check
  const actualMiniPetCount = miniPetCount > 0 ? miniPetCount : (hasMiniPet ? 1 : 0);

  const renderCharacter = () => {
    switch (type) {
      case 'kitten': return <KittenCharacter />;
      case 'dog': return <DogCharacter />;
      case 'parrot': return <ParrotCharacter />;
      case 'kangaroo': return <KangarooCharacter />;
      case 'cellphone': return <CellphoneCharacter />;
      case 'robot': return <RobotCharacter />;
      case 'panda': return <PandaCharacter />;
      case 'sixseven': return <SixSevenCharacter />;
      default: return null;
    }
  };

  const getUpgradePosition = (upgradeId: number) => {
    // [top, left] positions
    const positions: { [key in CharacterType]: { [key: number]: [string, string] } } = {
        kitten: {
            2: ['top-[76px]', 'left-1/2'], // Collar
            3: ['top-[-20px]', 'left-1/2'], // Hat
            4: ['top-[50px]', 'left-1/2'], // Glasses
        },
        dog: {
            2: ['top-[92px]', 'left-1/2'], // Collar
            3: ['top-[-8px]', 'left-1/2'], // Hat
            4: ['top-[50px]', 'left-1/2'], // Glasses
        },
        parrot: {
            2: ['top-[80px]', 'left-[55%]'], // Bow tie
            3: ['top-[-10px]', 'left-1/2'], // Hat
            4: ['top-[45px]', 'left-[40%]'], // Glasses
        },
        kangaroo: {
            2: ['top-[100px]', 'left-1/2'], // Collar
            3: ['top-[-12px]', 'left-1/2'], // Hat
            4: ['top-[42px]', 'left-1/2'], // Glasses
        },
        cellphone: {
            2: ['bottom-[-10px]', 'left-1/4'], // "Collar" as a phone charm/strap
            3: ['top-[10px]', 'left-1/2'], // Hat
            4: ['top-[55px]', 'left-1/2'], // Glasses
        },
        robot: {
            2: ['top-[110px]', 'left-1/2'], // Collar
            3: ['top-[-20px]', 'left-1/2'], // Hat
            4: ['top-[30px]', 'left-1/2'], // Glasses
        },
        panda: {
            2: ['top-[90px]', 'left-1/2'], // Collar
            3: ['top-[-10px]', 'left-1/2'], // Hat
            4: ['top-[50px]', 'left-1/2'], // Glasses
        },
        sixseven: {
             2: ['top-[100px]', 'left-1/2'],
             3: ['top-[-30px]', 'left-1/2'],
             4: ['top-[20px]', 'left-1/2'],
        } 
    };
    const pos = positions[type]?.[upgradeId];
    return pos ? `${pos[0]} ${pos[1]} -translate-x-1/2` : '';
  };
  
   const getTattooPosition = () => {
    const positions: { [key in CharacterType]: [string, string] } = {
        kitten: ['top-[90px]', 'left-[35%]'],
        dog: ['top-[100px]', 'left-[30%]'],
        parrot: ['top-[110px]', 'left-[40%]'],
        kangaroo: ['top-[120px]', 'left-[35%]'],
        cellphone: ['bottom-[20px]', 'left-[50%]'],
        robot: ['top-[110px]', 'left-[30%]'],
        panda: ['top-[100px]', 'left-[30%]'],
        sixseven: ['top-[100px]', 'left-[30%]'],
    };
    const pos = positions[type];
    return pos ? `${pos[0]} ${pos[1]} -translate-x-1/2` : '';
  };
  
  const getNosePosition = () => {
    // [top, left] positions for a clown nose
    const positions: { [key in CharacterType]: [string, string] } = {
        kitten: ['top-[80px]', 'left-1/2'],
        dog: ['top-[70px]', 'left-1/2'],
        parrot: ['top-[60px]', 'left-[65%]'],
        kangaroo: ['top-[60px]', 'left-1/2'],
        cellphone: ['top-[75px]', 'left-1/2'],
        robot: ['top-[45px]', 'left-1/2'],
        panda: ['top-[78px]', 'left-1/2'],
        sixseven: ['top-[35px]', 'left-1/2'],
    };
    const pos = positions[type];
    return pos ? `${pos[0]} ${pos[1]} -translate-x-1/2` : '';
  };


  return (
    <div className="flex justify-center items-center min-h-[200px] h-auto py-4">
      <div className="relative w-48 h-48 transition-all duration-500 ease-in-out">
        {renderCharacter()}

        {/* Render Pets based on count */}
        {actualMiniPetCount >= 1 && <MiniPetSixSeven styleClass="absolute top-[30%] -right-12" />}
        {actualMiniPetCount >= 2 && <MiniPetSixSeven styleClass="absolute top-[30%] -left-12" />}
        
        {/* Render accessories for ALL characters including SixSeven */}
        <>
            {activeTattoo && (
                <div className={`absolute ${getTattooPosition()} z-10 animate-fade-in transform`}>
                    <TattooRenderer tattooId={activeTattoo} />
                </div>
            )}

            {/* Stage 2: Collar / Bow Tie */}
            {activeUpgrades.includes(2) && (
                type === 'parrot' ? (
                    <div className={`absolute ${getUpgradePosition(2)} w-8 h-8 z-20 animate-fade-in`}>
                        <div className="absolute w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-black -translate-x-full"></div>
                        <div className="absolute w-0 h-0 border-y-[10px] border-y-transparent border-r-[16px] border-r-black"></div>
                    </div>
                ) : type === 'cellphone' ? (
                    <div className={`absolute ${getUpgradePosition(2)} w-10 h-10 z-20 animate-fade-in`}>
                        <div className="w-2 h-8 bg-gray-500 rounded-full transform -rotate-45 absolute bottom-0 left-0"></div>
                        <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center text-xs font-bold">★</div>
                    </div>
                ) : (
                    <div className={`absolute ${getUpgradePosition(2)} w-24 h-5 bg-blue-700 rounded-full border-2 border-blue-900 z-10 animate-fade-in`}>
                        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border border-yellow-600"></div>
                    </div>
                )
            )}
            
            {/* Stage 3: Hat */}
            {activeUpgrades.includes(3) && (
                <div className={`absolute ${getUpgradePosition(3)} w-20 z-20 animate-fade-in-up`}>
                    <div className="absolute bottom-0 left-0 w-full h-3 bg-black rounded-t-sm"></div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-2 bg-black"></div>
                    {/* Tassel */}
                    <div className="absolute -top-4 right-0 w-1 h-5 bg-yellow-500"></div>
                    <div className="absolute -top-1 right-[-2px] w-2 h-2 bg-yellow-500 rounded-full"></div>
                </div>
            )}

            {/* Gorro de Papai Noel (ID 23) */}
            {activeUpgrades.includes(23) && (
                <div className={`absolute ${getUpgradePosition(3)} w-20 h-16 z-20 animate-fade-in-up`}>
                    {/* Main hat shape */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-12 bg-red-600 rounded-t-full transform -rotate-[25deg] origin-bottom-right"></div>
                    {/* Brim */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-white rounded-full"></div>
                    {/* Pom-pom */}
                    <div className="absolute top-0 left-1 w-5 h-5 bg-white rounded-full"></div>
                </div>
            )}

            {/* Halloween Hat (ID 24) */}
            {activeUpgrades.includes(24) && (
                <div className={`absolute ${getUpgradePosition(3)} w-24 z-20 animate-fade-in-up`}>
                    {/* Hat Cone */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[35px] border-l-transparent border-r-[35px] border-r-transparent border-t-[60px] border-t-gray-800"></div>
                    {/* Hat Brim */}
                    <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-24 h-2 bg-gray-800 rounded-full"></div>
                </div>
            )}

            {/* Easter Bunny Ears (ID 25) */}
            {activeUpgrades.includes(25) && (
                <div className={`absolute ${getUpgradePosition(3)} w-24 z-0 animate-fade-in`}>
                    {/* Left Ear */}
                    <div className="absolute bottom-0 -left-2 w-6 h-16 bg-white border-2 border-gray-300 rounded-t-full transform -rotate-12">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-12 bg-pink-200 rounded-t-full"></div>
                    </div>
                    {/* Right Ear */}
                    <div className="absolute bottom-0 -right-2 w-6 h-16 bg-white border-2 border-gray-300 rounded-t-full transform rotate-12">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-12 bg-pink-200 rounded-t-full"></div>
                    </div>
                </div>
            )}


            {/* Stage 4: Glasses */}
            {activeUpgrades.includes(4) && (
                <div className={`absolute ${getUpgradePosition(4)} flex items-center gap-1 z-30 animate-fade-in`}>
                    <div className="w-8 h-8 bg-transparent rounded-full border-4 border-black"></div>
                    <div className="w-2 h-1 bg-black"></div>
                    <div className="w-8 h-8 bg-transparent rounded-full border-4 border-black"></div>
                </div>
            )}
            
            {/* Nariz de Palhaço (ID 26) */}
            {activeUpgrades.includes(26) && (
                <div className={`absolute ${getNosePosition()} w-6 h-6 bg-red-500 rounded-full border-2 border-red-700 z-30 animate-fade-in`}>
                </div>
            )}


            {/* Cellphone (ID 18) */}
            {activeUpgrades.includes(18) && (
                <div className="absolute bottom-12 right-[-50px] w-6 h-10 bg-gray-800 border-2 border-black rounded-md animate-fade-in z-20">
                    <div className="absolute inset-0.5 bg-gradient-to-b from-blue-400 to-teal-400 rounded-sm"></div>
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-black rounded-full"></div>
                </div>
            )}

            {/* Tablet (ID 19) */}
            {activeUpgrades.includes(19) && (
                <div className="absolute bottom-16 left-[-60px] w-10 h-14 bg-gray-100 border-2 border-gray-400 rounded-lg animate-fade-in z-20 transform -rotate-12">
                    <div className="absolute inset-1 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-md"></div>
                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                </div>
            )}
            
            {/* Iron Man Figurine (ID 40) */}
            {activeUpgrades.includes(40) && (
                <div className="absolute bottom-24 right-[-60px] w-12 h-16 animate-bounce z-20">
                    {/* Body */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-10 bg-red-700 rounded-lg border-2 border-yellow-500"></div>
                    {/* Head */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-12 bg-red-700 rounded-t-xl border-2 border-yellow-500">
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-8 bg-yellow-400 rounded-b-lg border border-red-800"></div>
                        {/* Eyes */}
                        <div className="absolute top-4 left-3 w-2 h-1 bg-cyan-200 shadow-[0_0_5px_rgba(165,243,252,1)]"></div>
                        <div className="absolute top-4 right-3 w-2 h-1 bg-cyan-200 shadow-[0_0_5px_rgba(165,243,252,1)]"></div>
                    </div>
                    {/* Arc Reactor */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,1)] border border-white"></div>
                    {/* Arms */}
                    <div className="absolute top-4 -left-2 w-3 h-8 bg-red-700 rounded-full border border-yellow-500 transform rotate-12"></div>
                    <div className="absolute top-4 -right-2 w-3 h-8 bg-red-700 rounded-full border border-yellow-500 transform -rotate-12"></div>
                </div>
            )}

            {/* Stage 5: Cape */}
            {activeUpgrades.includes(5) && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-20 bg-red-600 rounded-t-xl z-[-1] animate-fade-in">
                    <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full text-red-800 flex items-center justify-center font-black text-sm">C</div>
                </div>
            )}

            {/* Stage 6: Skateboard */}
            {activeUpgrades.includes(6) && (
                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-40 h-5 bg-gray-800 rounded-md border-b-4 border-black animate-fade-in z-[-1]">
                    <div className="absolute top-0 left-4 w-4 h-2 bg-gray-600 rounded-b-sm"></div>
                    <div className="absolute top-0 right-4 w-4 h-2 bg-gray-600 rounded-b-sm"></div>
                    <div className="absolute -bottom-1 left-6 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    <div className="absolute -bottom-1 right-6 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
            )}

            {/* Stage 7: Bicycle */}
            {activeUpgrades.includes(7) && (
                <div className="absolute bottom-0 right-[-80px] w-36 h-24 animate-fade-in-up z-[-2]">
                    {/* Wheels */}
                    <div className="absolute bottom-0 left-0 w-12 h-12 rounded-full border-4 border-gray-700 bg-white/50 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-gray-400"></div></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 rounded-full border-4 border-gray-700 bg-white/50 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-gray-400"></div></div>
                    {/* Frame */}
                    <div className="absolute bottom-6 left-6 w-16 h-1 bg-red-500 transform -rotate-[30deg] origin-left"></div>
                    <div className="absolute bottom-6 left-[46px] w-12 h-1 bg-red-500 transform rotate-[45deg] origin-left"></div>
                    <div className="absolute bottom-6 left-[46px] w-12 h-1 bg-red-500 transform -rotate-[45deg] origin-left"></div>
                    {/* Handlebars & Seat */}
                    <div className="absolute top-2 left-[78px] w-6 h-1 bg-gray-700"></div>
                    <div className="absolute top-4 left-[38px] w-5 h-2 bg-black rounded-sm"></div>
                </div>
            )}

            {/* Carro Esportivo (ID 28) */}
            {activeUpgrades.includes(28) && (
                <div className="absolute bottom-[-5px] right-[-100px] w-32 h-16 animate-fade-in-up z-[-2]">
                    {/* Car Body */}
                    <div className="absolute bottom-4 left-0 w-full h-8 bg-red-600 rounded-t-lg border-2 border-red-800 shadow-lg">
                        {/* Window */}
                        <div className="absolute top-1 left-4 w-12 h-5 bg-blue-300/70 rounded-t-sm border border-black/20"></div>
                    </div>
                    {/* Wheels */}
                    <div className="absolute bottom-2 left-4 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-500"></div>
                    <div className="absolute bottom-2 right-4 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-500"></div>
                </div>
            )}

            {/* Computer */}
            {activeUpgrades.includes(10) && (
                <div className="absolute bottom-0 left-[-80px] w-16 h-12 animate-fade-in-up z-[-2]">
                    {/* Desk */}
                    <div className="absolute bottom-0 left-0 w-full h-3 bg-yellow-900"></div>
                    <div className="absolute bottom-3 left-1 w-1 h-5 bg-yellow-900"></div>
                    <div className="absolute bottom-3 right-1 w-1 h-5 bg-yellow-900"></div>
                    {/* PC */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-8 bg-gray-300 rounded-t-sm border-2 border-gray-400">
                        <div className="w-full h-full bg-blue-500/50 flex items-center justify-center text-white text-xs">ON</div>
                    </div>
                </div>
            )}
            
            {/* Notebook (ID 20) */}
            {!activeUpgrades.includes(10) && activeUpgrades.includes(20) && (
                <div className="absolute bottom-0 left-[-80px] w-16 h-12 animate-fade-in-up z-[-2]">
                    {/* Desk */}
                    <div className="absolute bottom-0 left-0 w-full h-3 bg-yellow-900"></div>
                    <div className="absolute bottom-3 left-1 w-1 h-5 bg-yellow-900"></div>
                    <div className="absolute bottom-3 right-1 w-1 h-5 bg-yellow-900"></div>
                    {/* Laptop */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-8">
                        <div className="absolute bottom-0 w-full h-1 bg-gray-700 rounded-b-sm"></div> {/* Keyboard base */}
                        <div className="absolute bottom-1 w-full h-7 bg-gray-800 rounded-t-sm"> {/* Screen */}
                            <div className="absolute inset-1 bg-blue-400 rounded-sm"></div>
                        </div>
                    </div>
                </div>
            )}
        </>

      </div>
    </div>
  );
};

export default Character;
