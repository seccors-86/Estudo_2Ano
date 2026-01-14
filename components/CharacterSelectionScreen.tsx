
import React, { useState, useEffect } from 'react';
import type { CharacterType } from '../types';
import { adminStorage } from '../services/storageService';

interface CharacterSelectionScreenProps {
  onSelectCharacter: (character: CharacterType) => void;
  unlockedCharacters?: CharacterType[];
  onUnlockCharacter?: (password: string) => boolean;
  hasBeenBanned?: boolean;
  onEnterSecretCode?: (code: string) => boolean;
  onBanComplete?: () => void;
}

const CharacterSelectionScreen: React.FC<CharacterSelectionScreenProps> = ({ 
    onSelectCharacter, 
    unlockedCharacters = [],
    onUnlockCharacter,
    hasBeenBanned = false,
    onEnterSecretCode,
    onBanComplete
}) => {
  const [customChars, setCustomChars] = useState<{id: string, name: string, emoji: string}[]>([]);
  const [banCountdown, setBanCountdown] = useState(5);

  useEffect(() => {
      setCustomChars(adminStorage.getCustomCharacters());
  }, []);

  // Ban Auto-Reset Logic
  useEffect(() => {
      if (hasBeenBanned) {
          const interval = setInterval(() => {
              setBanCountdown(prev => {
                  if (prev <= 1) {
                      clearInterval(interval);
                      if (onBanComplete) onBanComplete();
                      return 0;
                  }
                  return prev - 1;
              });
          }, 1000);
          return () => clearInterval(interval);
      }
  }, [hasBeenBanned, onBanComplete]);

  if (hasBeenBanned) {
      return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fade-in border-4 border-red-600 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-8xl mb-6 animate-pulse">🚫</div>
            <h1 className="text-5xl font-black text-red-600 mb-6 uppercase tracking-wider">BANNED</h1>
            <p className="text-2xl text-gray-800 mb-2 font-bold">
                Your connection was terminated.
            </p>
            <p className="text-lg text-gray-600 mb-8">
                System rebooting in...
            </p>
            <div className="text-6xl font-mono font-bold text-red-500 animate-ping">
                {banCountdown}
            </div>
        </div>
      );
  }

  const renderStandardCharacter = (type: CharacterType) => {
      // Logic for standard SVG characters (Kitten, Dog, etc)
      switch(type) {
          case 'kitten': return (
            <div className="relative w-32 h-32 mx-auto mb-4 scale-90">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-gray-400 rounded-t-full"></div>
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-28 h-24 bg-gray-400 rounded-full">
                  <div className="absolute top-0 left-2 w-8 h-10 bg-gray-400 rounded-t-full border-t-8 border-r-8 border-gray-500 transform -rotate-12"></div>
                  <div className="absolute top-0 right-2 w-8 h-10 bg-gray-400 rounded-t-full border-t-8 border-l-8 border-gray-500 transform rotate-12"></div>
              </div>
            </div>
          );
          case 'dog': return (
            <div className="relative w-32 h-32 mx-auto mb-4 scale-90">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-yellow-500 rounded-t-full"></div>
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-28 h-24 bg-yellow-500 rounded-t-full">
                  <div className="absolute top-2 left-0 w-10 h-16 bg-yellow-600 rounded-full transform -rotate-12"></div>
                  <div className="absolute top-2 right-0 w-10 h-16 bg-yellow-600 rounded-full transform rotate-12"></div>
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-6 h-5 bg-yellow-800 rounded-b-lg"></div>
              </div>
            </div>
          );
          case 'parrot': return (
            <div className="relative w-32 h-32 mx-auto mb-4 scale-90">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-24 bg-red-500 rounded-t-full"></div>
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-red-500 rounded-full">
                  <div className="absolute top-6 left-1 w-6 h-6 bg-white rounded-full"><div className="w-3 h-3 bg-black rounded-full ml-1 mt-1"></div></div>
                  <div className="absolute top-10 left-4 w-10 h-5 bg-yellow-400 rounded-b-full border-2 border-black"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-16 bg-blue-500 rounded-l-full transform -rotate-45 origin-bottom-right"></div>
              </div>
            </div>
          );
          case 'kangaroo': return (
            <div className="relative w-32 h-32 mx-auto mb-4 scale-90">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-amber-700 rounded-t-xl">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-amber-600 rounded-t-md"></div>
                </div>
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-amber-700 rounded-full">
                    <div className="absolute top-0 left-0 w-6 h-10 bg-amber-800 rounded-t-full transform -rotate-12"></div>
                    <div className="absolute top-0 right-0 w-6 h-10 bg-amber-800 rounded-t-full transform rotate-12"></div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-[calc(50%+16px)] w-10 h-6 bg-amber-800 rounded-t-md"></div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-[calc(50%-16px)] w-10 h-6 bg-amber-800 rounded-t-md"></div>
            </div>
          );
          case 'panda': return (
            <div className="relative w-32 h-32 mx-auto mb-4 scale-90">
               <div className="absolute top-4 left-6 w-9 h-9 bg-black rounded-full"></div>
               <div className="absolute top-4 right-6 w-9 h-9 bg-black rounded-full"></div>
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-28 bg-white border-4 border-gray-200 rounded-full">
                    <div className="absolute top-8 left-4 w-10 h-8 bg-black rounded-full transform -rotate-12"></div>
                    <div className="absolute top-8 right-4 w-10 h-8 bg-black rounded-full transform rotate-12"></div>
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-5 h-3 bg-black rounded-full"></div>
                </div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-8 bg-white border-x-4 border-gray-200 rounded-t-xl z-[-1]"></div>
            </div>
          );
          case 'lion': return (
            <div className="relative w-32 h-32 mx-auto mb-4 scale-90">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-700 rounded-full opacity-90"></div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-orange-400 rounded-full border-2 border-orange-500">
                    <div className="absolute top-8 left-4 w-4 h-4 bg-black rounded-full"></div>
                    <div className="absolute top-8 right-4 w-4 h-4 bg-black rounded-full"></div>
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-6 h-6 bg-black rounded-t-lg"></div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-8 bg-orange-400 rounded-t-xl z-[-1]"></div>
            </div>
          );
          case 'monkey': return (
            <div className="relative w-32 h-32 mx-auto mb-4 scale-90">
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-24 bg-amber-800 rounded-full">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-16 bg-amber-200 rounded-full">
                     <div className="absolute top-4 left-3 w-3 h-3 bg-black rounded-full"></div>
                     <div className="absolute top-4 right-3 w-3 h-3 bg-black rounded-full"></div>
                </div>
                <div className="absolute top-8 -left-2 w-6 h-6 bg-amber-200 rounded-full border-2 border-amber-800"></div>
                <div className="absolute top-8 -right-2 w-6 h-6 bg-amber-200 rounded-full border-2 border-amber-800"></div>
             </div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-8 bg-amber-800 rounded-t-xl z-[-1]"></div>
          </div>
          );
          case 'penguin': return (
            <div className="relative w-32 h-32 mx-auto mb-4 scale-90">
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-28 bg-gray-900 rounded-full">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-24 bg-white rounded-full"></div>
                <div className="absolute top-6 left-4 w-4 h-4 bg-white rounded-full"><div className="w-2 h-2 bg-black rounded-full absolute top-1 right-1"></div></div>
                <div className="absolute top-6 right-4 w-4 h-4 bg-white rounded-full"><div className="w-2 h-2 bg-black rounded-full absolute top-1 left-1"></div></div>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-6 h-4 bg-orange-500 rounded-b-full"></div>
             </div>
             <div className="absolute bottom-0 left-4 w-8 h-4 bg-orange-500 rounded-full"></div>
             <div className="absolute bottom-0 right-4 w-8 h-4 bg-orange-500 rounded-full"></div>
          </div>
          );
          default: return null;
      }
  }

  const standardChars = ['kitten', 'dog', 'parrot', 'kangaroo', 'panda', 'lion', 'monkey', 'penguin'];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 text-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">Welcome to Champion's Games!</h1>
      <p className="text-lg text-gray-600 mb-8">First, choose your study companion:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
        
        {standardChars.map(char => (
            <button
                key={char}
                onClick={() => onSelectCharacter(char as CharacterType)}
                className="p-4 rounded-xl border-4 border-transparent hover:border-gray-400 hover:bg-gray-50/50 group text-center transition-all transform hover:-translate-y-1 focus:outline-none"
            >
                {renderStandardCharacter(char as CharacterType)}
                <h2 className="text-2xl font-bold text-gray-600 group-hover:text-gray-800 capitalize">
                    {char === 'kitten' ? 'Kitten' : char === 'dog' ? 'Dog' : char === 'parrot' ? 'Parrot' : char === 'kangaroo' ? 'Kangaroo' : char === 'lion' ? 'Lion' : char === 'monkey' ? 'Monkey' : char === 'penguin' ? 'Penguin' : char}
                </h2>
            </button>
        ))}

        {/* Custom Admin Characters */}
        {customChars.map(char => (
             <button
                key={char.id}
                onClick={() => onSelectCharacter(char.id)}
                className="p-4 rounded-xl border-4 border-transparent hover:border-purple-400 hover:bg-purple-50/50 group text-center transition-all transform hover:-translate-y-1 focus:outline-none"
            >
                <div className="text-[100px] leading-none mb-4">{char.emoji}</div>
                <h2 className="text-2xl font-bold text-purple-600 group-hover:text-purple-800">{char.name}</h2>
            </button>
        ))}

      </div>
    </div>
  );
};

export default CharacterSelectionScreen;
