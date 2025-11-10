import React from 'react';
import type { CharacterType } from '../types';

interface CharacterProps {
  type: CharacterType;
  purchasedUpgrades: number[];
}

const CatCharacter: React.FC = () => (
  <>
    {/* Body */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-24 bg-orange-400 rounded-t-3xl"></div>
    {/* Head */}
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-36 h-32 bg-orange-400 rounded-full">
      {/* Ears */}
      <div className="absolute top-0 left-2 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-orange-400 border-r-[20px] border-r-transparent transform -rotate-12"></div>
      <div className="absolute top-0 right-2 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-orange-400 border-r-[20px] border-r-transparent transform rotate-12"></div>
      {/* Eyes */}
      <div className="absolute top-14 left-8 w-6 h-8 bg-white rounded-full border-2 border-black/80">
        <div className="w-3 h-4 bg-black rounded-full absolute top-2 right-1"></div>
      </div>
      <div className="absolute top-14 right-8 w-6 h-8 bg-white rounded-full border-2 border-black/80">
          <div className="w-3 h-4 bg-black rounded-full absolute top-2 left-1"></div>
      </div>
        {/* Nose */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-4 h-3 bg-pink-300 rounded-full border border-black/80"></div>
    </div>
  </>
);

const DogCharacter: React.FC = () => (
  <>
    {/* Body */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-24 bg-amber-700 rounded-t-3xl"></div>
    {/* Head */}
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-36 h-32 bg-amber-700 rounded-full">
       {/* Ears */}
      <div className="absolute top-4 -left-3 w-8 h-20 bg-amber-800 rounded-b-full rounded-t-md transform -rotate-12"></div>
      <div className="absolute top-4 -right-3 w-8 h-20 bg-amber-800 rounded-b-full rounded-t-md transform rotate-12"></div>
      {/* Eyes */}
      <div className="absolute top-14 left-8 w-6 h-8 bg-white rounded-full border-2 border-black/80">
        <div className="w-3 h-4 bg-black rounded-full absolute top-2 right-1"></div>
      </div>
      <div className="absolute top-14 right-8 w-6 h-8 bg-white rounded-full border-2 border-black/80">
          <div className="w-3 h-4 bg-black rounded-full absolute top-2 left-1"></div>
      </div>
        {/* Nose */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-6 h-4 bg-black rounded-full"></div>
    </div>
  </>
);


const Character: React.FC<CharacterProps> = ({ type, purchasedUpgrades }) => {

  return (
    <div className="flex justify-center items-center min-h-[200px] h-auto py-4">
      <div className="relative w-48 h-48 transition-all duration-500 ease-in-out">
        {type === 'cat' ? <CatCharacter /> : <DogCharacter />}

        {/* Stage 2: Collar */}
        {purchasedUpgrades.includes(2) && (
          <div className="absolute bottom-[88px] left-1/2 -translate-x-1/2 w-[118px] h-4 bg-red-500 rounded-full border-2 border-red-700 z-10 animate-fade-in">
             <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full border border-yellow-600"></div>
          </div>
        )}
        
        {/* Stage 3: Hat */}
        {purchasedUpgrades.includes(3) && (
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 h-12 z-20 animate-fade-in-up">
                <div className="absolute bottom-0 left-0 w-full h-4 bg-gray-700 rounded-full"></div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-10 bg-gray-800 rounded-t-lg"></div>
            </div>
        )}

        {/* Stage 4: Glasses */}
        {purchasedUpgrades.includes(4) && (
            <div className="absolute top-[52px] left-1/2 -translate-x-1/2 flex items-center gap-1 z-30 animate-fade-in">
                <div className="w-10 h-10 bg-transparent rounded-full border-4 border-black"></div>
                <div className="w-4 h-1 bg-black"></div>
                <div className="w-10 h-10 bg-transparent rounded-full border-4 border-black"></div>
            </div>
        )}

        {/* Stage 5: Cape */}
        {purchasedUpgrades.includes(5) && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-20 bg-blue-600 rounded-t-xl z-[-1] animate-fade-in">
                <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full text-blue-800 flex items-center justify-center font-black text-sm">S</div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Character;