import React from 'react';
import type { CharacterType } from '../types';

interface CharacterSelectionScreenProps {
  onSelectCharacter: (character: CharacterType) => void;
}

const CharacterSelectionScreen: React.FC<CharacterSelectionScreenProps> = ({ onSelectCharacter }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 text-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">Bem-vindo(a) aos Campeões da 122!</h1>
      <p className="text-lg text-gray-600 mb-8">Primeiro, escolha seu companheiro de estudos:</p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        {/* Cat Option */}
        <button
          onClick={() => onSelectCharacter('cat')}
          className="p-6 rounded-xl border-4 border-transparent hover:border-orange-400 hover:bg-orange-50/50 group text-center transition-all transform hover:-translate-y-1 focus:outline-none"
        >
          <div className="relative w-40 h-40 mx-auto mb-4">
            {/* Body */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-orange-400 rounded-t-3xl"></div>
            {/* Head */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-28 bg-orange-400 rounded-full">
              {/* Ears */}
              <div className="absolute top-0 left-2 w-0 h-0 border-l-[18px] border-l-transparent border-b-[28px] border-b-orange-400 border-r-[18px] border-r-transparent transform -rotate-12"></div>
              <div className="absolute top-0 right-2 w-0 h-0 border-l-[18px] border-l-transparent border-b-[28px] border-b-orange-400 border-r-[18px] border-r-transparent transform rotate-12"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-orange-600 group-hover:text-orange-700">Gato Esperto</h2>
        </button>

        {/* Dog Option */}
        <button
          onClick={() => onSelectCharacter('dog')}
          className="p-6 rounded-xl border-4 border-transparent hover:border-amber-700 hover:bg-amber-50/50 group text-center transition-all transform hover:-translate-y-1 focus:outline-none"
        >
          <div className="relative w-40 h-40 mx-auto mb-4">
            {/* Body */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-amber-700 rounded-t-3xl"></div>
            {/* Head */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-28 bg-amber-700 rounded-full">
              {/* Ears */}
              <div className="absolute top-4 -left-3 w-8 h-16 bg-amber-800 rounded-b-full rounded-t-md transform -rotate-12"></div>
              <div className="absolute top-4 -right-3 w-8 h-16 bg-amber-800 rounded-b-full rounded-t-md transform rotate-12"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-amber-800 group-hover:text-amber-900">Cachorro Leal</h2>
        </button>
      </div>
    </div>
  );
};

export default CharacterSelectionScreen;
