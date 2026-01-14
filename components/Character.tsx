
import React, { useMemo } from 'react';
import type { CharacterType } from '../types';
import { adminStorage } from '../services/storageService';

interface CharacterProps {
  type: CharacterType;
  activeUpgrades: number[];
  activeTattoo: string | null;
  hasMiniPet?: boolean;
  miniPetCount?: number;
  onClick?: () => void;
  isFlying?: boolean;
}

// ... (Existing standard character components: KittenCharacter, DogCharacter, etc. - keeping them abbreviated for brevity as they don't change, but ensuring the new logic is inserted correctly below) ...
const KittenCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-4 -right-8 w-6 h-20 bg-gray-400 rounded-full transform -rotate-45 origin-bottom-left z-[-1]"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-24 bg-gray-500 rounded-t-full"></div>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-28 h-24 bg-gray-400 rounded-full">
            <div className="absolute top-0 left-2 w-8 h-10 bg-gray-400 rounded-t-full border-t-8 border-r-8 border-gray-500 transform -rotate-12"></div>
            <div className="absolute top-0 right-2 w-8 h-10 bg-gray-400 rounded-t-full border-t-8 border-l-8 border-gray-500 transform rotate-12"></div>
            <div className="absolute top-14 left-8 w-6 h-6 bg-white rounded-full border-2 border-black/80"><div className="w-3 h-3 bg-black rounded-full absolute top-1 right-1"></div></div>
            <div className="absolute top-14 right-8 w-6 h-6 bg-white rounded-full border-2 border-black/80"><div className="w-3 h-3 bg-black rounded-full absolute top-1 left-1"></div></div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-4 h-3 bg-pink-300 rounded-b-md"></div>
            <div className="absolute top-16 -left-2 w-8 h-px bg-black transform -rotate-12"></div>
            <div className="absolute top-20 -left-2 w-8 h-px bg-black"></div>
            <div className="absolute top-16 -right-2 w-8 h-px bg-black transform rotate-12 origin-right"></div>
            <div className="absolute top-20 -right-2 w-8 h-px bg-black origin-right"></div>
        </div>
    </>
);

const DogCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-6 -right-6 w-8 h-8 bg-amber-600 rounded-l-full transform rotate-45 animate-wiggle origin-bottom-left z-[-1]"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-28 bg-amber-500 rounded-t-3xl"></div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-36 h-32 bg-amber-500 rounded-t-full">
            <div className="absolute -top-1 -left-2 w-12 h-20 bg-amber-600 rounded-2xl transform -rotate-12"></div>
            <div className="absolute -top-1 -right-2 w-12 h-20 bg-amber-600 rounded-2xl transform rotate-12"></div>
            <div className="absolute top-14 left-8 w-5 h-5 bg-black rounded-full"></div>
            <div className="absolute top-14 right-8 w-5 h-5 bg-black rounded-full"></div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-16 h-12 bg-amber-400 rounded-t-xl">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-5 bg-black rounded-md"></div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-1 h-4 bg-black"></div>
                <div className="absolute top-8 left-1/2 -translate-x-full w-4 h-4 border-b-2 border-l-2 border-black rounded-bl-full"></div>
                <div className="absolute top-8 left-1/2 w-4 h-4 border-b-2 border-r-2 border-black rounded-br-full"></div>
            </div>
        </div>
    </>
);

const ParrotCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-24 bg-red-500 rounded-t-full"></div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-red-500 rounded-full">
            <div className="absolute top-6 left-1 w-6 h-6 bg-white rounded-full"><div className="w-3 h-3 bg-black rounded-full ml-1 mt-1"></div></div>
            <div className="absolute top-10 left-4 w-10 h-5 bg-yellow-400 rounded-b-full border-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-12 h-16 bg-blue-500 rounded-l-full transform -rotate-45 origin-bottom-right"></div>
        </div>
    </>
);

const KangarooCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-amber-700 rounded-t-xl">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-amber-600 rounded-t-md"></div>
        </div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-amber-700 rounded-full">
            <div className="absolute top-0 left-0 w-6 h-10 bg-amber-800 rounded-t-full transform -rotate-12"></div>
            <div className="absolute top-0 right-0 w-6 h-10 bg-amber-800 rounded-t-full transform rotate-12"></div>
            <div className="absolute top-8 left-5 w-3 h-3 bg-black rounded-full"></div>
            <div className="absolute top-8 right-5 w-3 h-3 bg-black rounded-full"></div>
        </div>
    </>
);

const PandaCharacter: React.FC = () => (
    <>
       <div className="absolute top-4 left-6 w-9 h-9 bg-black rounded-full z-[-1]"></div>
       <div className="absolute top-4 right-6 w-9 h-9 bg-black rounded-full z-[-1]"></div>
       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-28 bg-white border-4 border-gray-200 rounded-full">
            <div className="absolute top-8 left-4 w-10 h-8 bg-black rounded-full transform -rotate-12"></div>
            <div className="absolute top-8 right-4 w-10 h-8 bg-black rounded-full transform rotate-12"></div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-5 h-3 bg-black rounded-full"></div>
        </div>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-8 bg-white border-x-4 border-gray-200 rounded-t-xl z-[-1]"></div>
    </>
);

const LionCharacter: React.FC = () => (
    <>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-700 rounded-full opacity-90 z-[-1]"></div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-orange-400 rounded-full border-2 border-orange-500">
            <div className="absolute top-8 left-4 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute top-8 right-4 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-6 h-6 bg-black rounded-t-lg"></div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-8 bg-orange-400 rounded-t-xl z-[-1]"></div>
    </>
);

const MonkeyCharacter: React.FC = () => (
    <>
     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-24 bg-amber-800 rounded-full">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-16 bg-amber-200 rounded-full">
             <div className="absolute top-4 left-3 w-3 h-3 bg-black rounded-full"></div>
             <div className="absolute top-4 right-3 w-3 h-3 bg-black rounded-full"></div>
        </div>
        <div className="absolute top-8 -left-2 w-6 h-6 bg-amber-200 rounded-full border-2 border-amber-800"></div>
        <div className="absolute top-8 -right-2 w-6 h-6 bg-amber-200 rounded-full border-2 border-amber-800"></div>
     </div>
     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-8 bg-amber-800 rounded-t-xl z-[-1]"></div>
  </>
);

const PenguinCharacter: React.FC = () => (
    <>
     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-28 bg-gray-900 rounded-full">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-24 bg-white rounded-full"></div>
        <div className="absolute top-6 left-4 w-4 h-4 bg-white rounded-full"><div className="w-2 h-2 bg-black rounded-full absolute top-1 right-1"></div></div>
        <div className="absolute top-6 right-4 w-4 h-4 bg-white rounded-full"><div className="w-2 h-2 bg-black rounded-full absolute top-1 left-1"></div></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-6 h-4 bg-orange-500 rounded-b-full"></div>
     </div>
     <div className="absolute bottom-0 left-4 w-8 h-4 bg-orange-500 rounded-full"></div>
     <div className="absolute bottom-0 right-4 w-8 h-4 bg-orange-500 rounded-full"></div>
  </>
);

const FoxCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-4 -right-10 w-12 h-28 bg-orange-600 rounded-full transform -rotate-45 origin-bottom-left z-[-1] border-4 border-orange-700">
            <div className="absolute top-0 right-0 w-6 h-10 bg-white rounded-full"></div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-24 bg-orange-500 rounded-t-full">
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-t-full"></div>
        </div>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-28 bg-orange-500 rounded-full">
            <div className="absolute -top-4 left-0 w-10 h-16 bg-orange-600 rounded-t-full transform -rotate-12 border-2 border-orange-700"></div>
            <div className="absolute -top-4 right-0 w-10 h-16 bg-orange-600 rounded-t-full transform rotate-12 border-2 border-orange-700"></div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-28 h-16 bg-white rounded-b-full"></div>
            <div className="absolute top-14 left-8 w-6 h-6 bg-black rounded-full border-2 border-white"><div className="w-2 h-2 bg-white rounded-full absolute top-1 right-1"></div></div>
            <div className="absolute top-14 right-8 w-6 h-6 bg-black rounded-full border-2 border-white"><div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div></div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-6 h-5 bg-black rounded-full"></div>
        </div>
    </>
);

const RobotCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-gray-300 border-4 border-gray-500 rounded-lg">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-gray-200 border-2 border-gray-400 grid grid-cols-2 gap-1 p-1">
                <div className="bg-blue-400 animate-pulse"></div><div className="bg-red-400 animate-pulse" style={{animationDelay:'0.5s'}}></div>
                <div className="bg-green-400 animate-pulse" style={{animationDelay:'1s'}}></div><div className="bg-yellow-400 animate-pulse" style={{animationDelay:'1.5s'}}></div>
            </div>
        </div>
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-32 h-24 bg-gray-300 border-4 border-gray-500 rounded-t-xl">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-8 bg-gray-600"></div>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full"></div>
            
            <div className="absolute top-6 left-6 w-8 h-8 bg-black rounded-full border-2 border-white flex items-center justify-center"><div className="w-2 h-2 bg-red-500 rounded-full"></div></div>
            <div className="absolute top-6 right-6 w-8 h-8 bg-black rounded-full border-2 border-white flex items-center justify-center"><div className="w-2 h-2 bg-red-500 rounded-full"></div></div>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full overflow-hidden">
                <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#333_4px,#333_6px)]"></div>
            </div>
        </div>
    </>
);

const AlienCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-32 bg-green-500 rounded-xl"></div>
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-500 rounded-full border-4 border-green-600">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-14 bg-black rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full absolute right-4"></div>
            </div>
            <div className="absolute -top-4 left-4 w-4 h-12 bg-green-600 rotate-[-20deg]">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute -top-4 right-4 w-4 h-12 bg-green-600 rotate-[20deg]">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
            </div>
        </div>
        <div className="absolute bottom-12 -left-8 w-8 h-20 bg-green-500 rounded-full rotate-45"></div>
        <div className="absolute bottom-12 -right-8 w-8 h-20 bg-green-500 rounded-full -rotate-45"></div>
    </>
);

const ZombieCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-32 bg-teal-800 rounded-t-xl border-4 border-teal-900">
            <div className="absolute top-10 left-4 w-6 h-6 bg-red-800 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-32 h-32 bg-teal-600 rounded-lg border-4 border-teal-800">
            <div className="absolute top-8 left-4 w-8 h-8 bg-white rounded-full border-2 border-black"><div className="w-1 h-1 bg-black rounded-full absolute top-3 left-3"></div></div>
            <div className="absolute top-8 right-4 w-10 h-10 bg-black rounded-full border-2 border-red-500">
                <div className="w-2 h-2 bg-red-500 absolute top-4 left-4">X</div>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-2 bg-black rotate-3"></div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-2 h-4 bg-yellow-200 ml-2"></div>
        </div>
        <div className="absolute bottom-16 -left-10 w-32 h-8 bg-teal-600 rounded-full rotate-12 border-4 border-teal-800"></div>
        <div className="absolute bottom-16 -right-10 w-32 h-8 bg-teal-600 rounded-full -rotate-12 border-4 border-teal-800"></div>
    </>
);

const HamsterCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-32 bg-orange-300 rounded-full border-4 border-orange-400"></div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-28 bg-orange-300 rounded-full border-4 border-orange-400">
            <div className="absolute top-0 -left-2 w-8 h-8 bg-orange-400 rounded-full"></div>
            <div className="absolute top-0 -right-2 w-8 h-8 bg-orange-400 rounded-full"></div>
            <div className="absolute top-10 left-6 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute top-10 right-6 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-3 bg-pink-400 rounded-t-lg"></div>
            <div className="absolute top-16 left-2 w-6 h-6 bg-pink-200 rounded-full opacity-50"></div>
            <div className="absolute top-16 right-2 w-6 h-6 bg-pink-200 rounded-full opacity-50"></div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-b-xl border-t-2 border-black"></div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-1 h-4 bg-black"></div>
        </div>
    </>
);

const TigerCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-36 bg-orange-500 rounded-t-3xl border-4 border-orange-700 overflow-hidden">
             <div className="absolute top-10 -left-2 w-10 h-4 bg-black rounded-r-full"></div>
             <div className="absolute top-20 -left-2 w-12 h-4 bg-black rounded-r-full"></div>
             <div className="absolute top-10 -right-2 w-10 h-4 bg-black rounded-l-full"></div>
             <div className="absolute top-20 -right-2 w-12 h-4 bg-black rounded-l-full"></div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-16 bg-white rounded-t-full"></div>
        </div>
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-36 h-32 bg-orange-500 rounded-full border-4 border-orange-700">
            <div className="absolute -top-2 left-2 w-8 h-8 bg-orange-600 rounded-full border-2 border-black"></div>
            <div className="absolute -top-2 right-2 w-8 h-8 bg-orange-600 rounded-full border-2 border-black"></div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-8 bg-black rounded-b-full"></div>
            <div className="absolute top-12 left-6 w-6 h-6 bg-white rounded-full border-2 border-black"><div className="w-2 h-2 bg-black rounded-full absolute top-2 right-1"></div></div>
            <div className="absolute top-12 right-6 w-6 h-6 bg-white rounded-full border-2 border-black"><div className="w-2 h-2 bg-black rounded-full absolute top-2 left-1"></div></div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-12 h-10 bg-white rounded-full border border-gray-300"></div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-6 h-4 bg-black rounded-b-lg"></div>
        </div>
    </>
);

const UnicornCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-36 bg-white rounded-t-3xl border-4 border-pink-200"></div>
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-32 h-36 bg-white rounded-full border-4 border-pink-200">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-6 h-16 bg-gradient-to-t from-yellow-300 to-pink-400 rounded-t-full clip-triangle"></div>
            <div className="absolute top-0 -left-6 w-10 h-32 bg-pink-400 rounded-l-full -z-10"></div>
            <div className="absolute top-12 left-6 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute top-12 right-6 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-12 bg-pink-100 rounded-full">
                <div className="absolute top-4 left-4 w-2 h-2 bg-pink-400 rounded-full"></div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full"></div>
            </div>
        </div>
    </>
);

const DragonCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-10 -left-16 w-24 h-32 bg-red-700 rounded-tl-full transform rotate-12 -z-10 border-2 border-black"></div>
        <div className="absolute bottom-10 -right-16 w-24 h-32 bg-red-700 rounded-tr-full transform -rotate-12 -z-10 border-2 border-black"></div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-36 bg-red-600 rounded-t-3xl border-4 border-red-800">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-24 bg-yellow-400 rounded-t-full opacity-50"></div>
        </div>
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-36 h-32 bg-red-600 rounded-full border-4 border-red-800">
            <div className="absolute top-10 left-8 w-6 h-8 bg-yellow-300 rounded-full border-2 border-black"><div className="w-1 h-3 bg-black absolute top-2 left-2"></div></div>
            <div className="absolute top-10 right-8 w-6 h-8 bg-yellow-300 rounded-full border-2 border-black"><div className="w-1 h-3 bg-black absolute top-2 left-2"></div></div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-10 bg-red-800 rounded-full">
                <div className="absolute top-2 left-3 w-3 h-3 bg-black rounded-full"></div>
                <div className="absolute top-2 right-3 w-3 h-3 bg-black rounded-full"></div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-8 bg-orange-500 animate-pulse rounded-t-full"></div>
            </div>
            <div className="absolute -top-4 left-4 w-4 h-10 bg-white rounded-t-full"></div>
            <div className="absolute -top-4 right-4 w-4 h-10 bg-white rounded-t-full"></div>
        </div>
    </>
);

const RabbitCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-24 bg-gray-200 rounded-t-full"></div>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-28 bg-gray-200 rounded-full">
            <div className="absolute -top-12 left-2 w-8 h-24 bg-gray-200 rounded-full border-2 border-gray-300">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-16 bg-pink-200 rounded-full"></div>
            </div>
            <div className="absolute -top-12 right-2 w-8 h-24 bg-gray-200 rounded-full border-2 border-gray-300">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-16 bg-pink-200 rounded-full"></div>
            </div>
            <div className="absolute top-12 left-8 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute top-12 right-8 w-4 h-4 bg-black rounded-full"></div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-3 bg-pink-400 rounded-b-md"></div>
             <div className="absolute top-16 left-2 w-8 h-px bg-gray-400 rotate-12"></div>
             <div className="absolute top-18 left-2 w-8 h-px bg-gray-400"></div>
             <div className="absolute top-16 right-2 w-8 h-px bg-gray-400 -rotate-12"></div>
             <div className="absolute top-18 right-2 w-8 h-px bg-gray-400"></div>
        </div>
    </>
);

const BearCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-800 rounded-t-3xl"></div>
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-32 h-28 bg-amber-800 rounded-full">
             <div className="absolute -top-2 left-0 w-8 h-8 bg-amber-900 rounded-full"></div>
             <div className="absolute -top-2 right-0 w-8 h-8 bg-amber-900 rounded-full"></div>
             <div className="absolute top-8 left-8 w-4 h-4 bg-black rounded-full"></div>
             <div className="absolute top-8 right-8 w-4 h-4 bg-black rounded-full"></div>
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-10 bg-amber-200 rounded-full">
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-black rounded-full"></div>
             </div>
        </div>
    </>
);

const MouseCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-gray-400 rounded-t-full"></div>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-24 bg-gray-400 rounded-full">
             <div className="absolute -top-4 -left-4 w-12 h-12 bg-gray-400 rounded-full border-2 border-gray-500">
                 <div className="absolute top-2 left-2 w-8 h-8 bg-pink-200 rounded-full"></div>
             </div>
             <div className="absolute -top-4 -right-4 w-12 h-12 bg-gray-400 rounded-full border-2 border-gray-500">
                 <div className="absolute top-2 left-2 w-8 h-8 bg-pink-200 rounded-full"></div>
             </div>
             <div className="absolute top-10 left-6 w-3 h-3 bg-black rounded-full"></div>
             <div className="absolute top-10 right-6 w-3 h-3 bg-black rounded-full"></div>
             <div className="absolute top-14 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full"></div>
             <div className="absolute top-16 left-2 w-6 h-px bg-black rotate-12"></div>
             <div className="absolute top-16 right-2 w-6 h-px bg-black -rotate-12"></div>
        </div>
    </>
);

const PigCharacter: React.FC = () => (
    <>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-pink-400 rounded-t-3xl"></div>
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-28 h-24 bg-pink-400 rounded-full">
             <div className="absolute -top-2 left-2 w-6 h-8 bg-pink-500 rounded-t-full rotate-[-20deg]"></div>
             <div className="absolute -top-2 right-2 w-6 h-8 bg-pink-500 rounded-t-full rotate-[20deg]"></div>
             <div className="absolute top-8 left-6 w-4 h-4 bg-black rounded-full"></div>
             <div className="absolute top-8 right-6 w-4 h-4 bg-black rounded-full"></div>
             <div className="absolute top-12 left-1/2 -translate-x-1/2 w-10 h-8 bg-pink-300 rounded-full border-2 border-pink-500">
                 <div className="absolute top-3 left-2 w-2 h-2 bg-black rounded-full"></div>
                 <div className="absolute top-3 right-2 w-2 h-2 bg-black rounded-full"></div>
             </div>
        </div>
    </>
);

const Character: React.FC<CharacterProps> = ({ 
    type, 
    activeUpgrades, 
    activeTattoo, 
    hasMiniPet, 
    miniPetCount = 0,
    onClick,
    isFlying = false
}) => {
  const customCharacters = useMemo(() => adminStorage.getCustomCharacters(), []);
  
  const renderCharacter = () => {
    // Check for custom character first
    const customChar = customCharacters.find(c => c.id === type);
    if (customChar) {
        return <div className="text-[120px] leading-none select-none">{customChar.emoji}</div>;
    }

    switch (type) {
      case 'kitten': return <KittenCharacter />;
      case 'dog': return <DogCharacter />;
      case 'parrot': return <ParrotCharacter />;
      case 'kangaroo': return <KangarooCharacter />;
      case 'panda': return <PandaCharacter />;
      case 'lion': return <LionCharacter />;
      case 'monkey': return <MonkeyCharacter />;
      case 'penguin': return <PenguinCharacter />;
      case 'fox': return <FoxCharacter />;
      case 'robot': return <RobotCharacter />;
      case 'alien': return <AlienCharacter />;
      case 'zombie': return <ZombieCharacter />;
      case 'hamster': return <HamsterCharacter />;
      case 'tiger': return <TigerCharacter />;
      case 'unicorn': return <UnicornCharacter />;
      case 'dragon': return <DragonCharacter />;
      case 'rabbit': return <RabbitCharacter />;
      case 'bear': return <BearCharacter />;
      case 'mouse': return <MouseCharacter />;
      case 'pig': return <PigCharacter />;
      default: return <KittenCharacter />; // Fallback
    }
  };

  const renderAccessory = (id: number) => {
    // ID 9003: Emerald Guardian Skin (Level 2)
    if (id === 9003) {
        return (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 -z-10 pointer-events-none">
                {/* Glowing Aura */}
                <div className="absolute inset-0 bg-green-400 rounded-full opacity-30 animate-pulse blur-xl"></div>
                {/* Crystal Armor Plates */}
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-green-800 to-transparent opacity-80 rounded-b-3xl"></div>
                <div className="absolute -left-4 bottom-10 w-8 h-20 bg-green-500 rounded-lg transform rotate-12 border-2 border-green-300"></div>
                <div className="absolute -right-4 bottom-10 w-8 h-20 bg-green-500 rounded-lg transform -rotate-12 border-2 border-green-300"></div>
                {/* Floating Crystals */}
                <div className="absolute -top-10 left-0 text-3xl animate-bounce" style={{animationDuration:'2s'}}>❇️</div>
                <div className="absolute -top-10 right-0 text-3xl animate-bounce" style={{animationDuration:'3s'}}>❇️</div>
            </div>
        );
    }

    // Hat Position (Top of head)
    if ([3, 23, 24, 25, 50, 51, 120].includes(id)) {
        let content = null;
        if (id === 3) content = <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rotate-[-5deg]"><div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-black rotate-45"></div><div className="absolute top-2 right-0 w-1 h-8 bg-yellow-500"></div></div>;
        if (id === 23) content = <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-red-600 rounded-t-full"><div className="absolute bottom-0 w-full h-4 bg-white"></div><div className="absolute -top-2 right-0 w-4 h-4 bg-white rounded-full"></div></div>;
        if (id === 24) content = <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-20 h-20 border-b-[20px] border-black"><div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[60px] border-b-black"></div></div>;
        if (id === 25) content = <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-10"><div className="absolute -top-8 left-2 w-4 h-12 bg-pink-200 rounded-full border-2 border-white"></div><div className="absolute -top-8 right-2 w-4 h-12 bg-pink-200 rounded-full border-2 border-white"></div></div>;
        if (id === 50) content = <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl">👑</div>;
        if (id === 51) content = <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-28 h-12 border-t-8 border-gray-800 rounded-t-full"><div className="absolute top-6 left-0 w-6 h-8 bg-gray-800 rounded-md"></div><div className="absolute top-6 right-0 w-6 h-8 bg-gray-800 rounded-md"></div></div>;
        if (id === 120) content = <div className="absolute -top-12 -left-12 text-5xl">⛄</div>; // Snowman companion
        return content;
    }

    // Face (Eyes/Nose)
    if ([4, 26].includes(id)) {
        if (id === 4) return <div className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-8 flex justify-between"><div className="w-8 h-8 border-4 border-black rounded-full"></div><div className="w-2 h-1 bg-black mt-4"></div><div className="w-8 h-8 border-4 border-black rounded-full"></div></div>;
        if (id === 26) return <div className="absolute top-16 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full"></div>;
    }

    // Neck/Back
    if ([2, 5, 121].includes(id)) {
        if (id === 2) return <div className="absolute top-24 left-1/2 -translate-x-1/2 w-16 h-2 bg-red-600"></div>;
        if (id === 5) return <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-700 rounded-b-xl -z-20"></div>; // Cape
        if (id === 121) return <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-24 flex justify-between -z-20"><div className="w-20 h-full bg-white rounded-tl-full opacity-80"></div><div className="w-20 h-full bg-white rounded-tr-full opacity-80"></div></div>; // Wings
    }

    // Hand Items
    if ([55, 56, 57, 58, 59, 73].includes(id)) {
        if (id === 55) return <div className="absolute bottom-10 -right-8 text-3xl">📱</div>;
        if (id === 56) return <div className="absolute bottom-10 -left-6 text-2xl">⌚</div>;
        if (id === 57) return <div className="absolute bottom-10 -right-10 text-4xl">📟</div>;
        if (id === 58) return <div className="absolute bottom-0 -right-12 text-4xl">💻</div>;
        if (id === 59) return <div className="absolute top-10 -right-8 text-3xl">🎧</div>;
        if (id === 73) return <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-5xl z-20">🎸</div>;
    }
    
    // Fun/Food
    if ([70, 71, 72, 74].includes(id)) {
        if (id === 70) return <div className="absolute bottom-0 -left-12 text-4xl">🍔</div>;
        if (id === 71) return <div className="absolute bottom-0 -right-12 text-4xl">🍕</div>;
        if (id === 72) return <div className="absolute bottom-10 -right-12 text-4xl">🥤</div>;
        if (id === 74) return <div className="absolute bottom-0 right-0 text-4xl z-20">⚽</div>; // Gold Ball
    }

    return null;
  };

  const renderVehicles = () => {
    const vIds = activeUpgrades.filter(id => [6, 52, 7, 28, 130, 53, 122, 123].includes(id));
    if (vIds.length === 0) return null;
    const id = vIds[vIds.length-1]; // Last active vehicle wins

    if (id === 6) return <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-gray-800 rounded-full border-2 border-black flex justify-between px-4"><div className="w-2 h-2 bg-white rounded-full"></div><div className="w-2 h-2 bg-white rounded-full"></div></div>;
    if (id === 52) return <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-36 h-8 bg-yellow-400 rounded-full border-2 border-orange-500 z-10 transform rotate-[-5deg]"></div>;
    if (id === 7) return <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-6xl z-10">🚲</div>;
    if (id === 28) return <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-6xl z-10">🏎️</div>;
    if (id === 130) return <div className="absolute top-10 -left-12 text-5xl -z-10">🚀</div>;
    if (id === 53) return <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-10 bg-purple-600 rounded-lg animate-pulse z-[-1] border-4 border-yellow-400"></div>;
    if (id === 122) return <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-6xl z-10">🏍️</div>;
    if (id === 123) return <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-7xl z-[-1]">🛸</div>;
    return null;
  };

  const renderTattoo = () => {
      if (!activeTattoo) return null;
      if (activeTattoo === 'star') return <div className="absolute top-20 left-1/2 -translate-x-1/2 text-xl opacity-80">⭐</div>;
      if (activeTattoo === 'anchor') return <div className="absolute top-20 left-1/2 -translate-x-1/2 text-xl opacity-80">⚓</div>;
      if (activeTattoo === 'heart') return <div className="absolute top-20 left-1/2 -translate-x-1/2 text-xl opacity-80 text-red-600">❤️</div>;
      return null;
  };

  // Determine actual pet count. Use new logic (miniPetCount) but fallback to old bool if count is 0/undefined for legacy.
  const actualPetCount = (miniPetCount !== undefined && miniPetCount > 0) ? miniPetCount : (hasMiniPet ? 1 : 0);

  return (
    <div 
        className={`relative w-32 h-32 select-none transition-transform duration-1000 ${isFlying ? 'animate-bounce' : ''}`} 
        onClick={onClick}
        style={{ transform: isFlying ? 'translateY(-50px)' : 'none' }}
    >
      {/* Vehicle Layer */}
      {renderVehicles()}
      
      {/* Base Character */}
      {renderCharacter()}
      
      {/* Tattoos */}
      {renderTattoo()}

      {/* Accessories */}
      {activeUpgrades.map(id => (
          <React.Fragment key={id}>{renderAccessory(id)}</React.Fragment>
      ))}

      {/* Mini Pets */}
      {actualPetCount > 0 && Array.from({ length: actualPetCount }).map((_, i) => (
          <div 
            key={i} 
            className="absolute bottom-0 w-8 h-8 text-2xl animate-bounce"
            style={{ 
                right: `${-(i + 1) * 30}px`, 
                animationDelay: `${i * 0.2}s` 
            }}
          >
            🐾
          </div>
      ))}
      
      {/* Special Pets (Admin Items) */}
      {activeUpgrades.includes(66666) && <div className="absolute top-0 -right-20 text-4xl animate-pulse">👹</div>}
      {activeUpgrades.includes(6667) && <div className="absolute top-10 -left-20 text-4xl animate-bounce">🤖</div>}
      {activeUpgrades.includes(9000) && <div className="absolute -bottom-4 -left-16 text-4xl">🍄</div>}
      {/* Level 2 Pet (Emerald Dragon) - ID 9001 */}
      {activeUpgrades.includes(9001) && <div className="absolute top-0 -left-24 text-6xl animate-bounce" style={{animationDuration: '3s'}}>🐉</div>}
      
      {/* Default Store Pets */}
      {activeUpgrades.includes(201) && <div className="absolute bottom-0 -right-12 text-3xl">🐶</div>}
      {activeUpgrades.includes(202) && <div className="absolute bottom-0 -left-12 text-3xl">🐱</div>}
      {activeUpgrades.includes(203) && <div className="absolute top-0 -right-10 text-3xl">🦜</div>}
      {activeUpgrades.includes(204) && <div className="absolute top-0 -left-16 text-4xl">🐉</div>}
    </div>
  );
};

export default Character;
