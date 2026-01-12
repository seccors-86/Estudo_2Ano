
import React, { useState } from 'react';
import type { CharacterType } from '../types';

interface CharacterSelectionScreenProps {
  onSelectCharacter: (character: CharacterType) => void;
  unlockedCharacters?: CharacterType[];
  onUnlockCharacter?: (password: string) => boolean;
  hasBeenBanned?: boolean;
  onEnterSecretCode?: (code: string) => boolean;
}

const CharacterSelectionScreen: React.FC<CharacterSelectionScreenProps> = ({ 
    onSelectCharacter, 
    unlockedCharacters = ['kitten', 'dog', 'parrot', 'kangaroo', 'cellphone', 'panda'],
    onUnlockCharacter,
    hasBeenBanned = false,
    onEnterSecretCode
}) => {
  const [punishmentAcknowledged, setPunishmentAcknowledged] = useState(false);

  const handleLockedClick = () => {
      if (onUnlockCharacter) {
          const code = prompt("Digite a senha secreta para desbloquear o personagem:");
          if (code) {
              const success = onUnlockCharacter(code);
              if (success) {
                  alert("Personagem desbloqueado!");
              } else {
                  alert("Senha incorreta.");
              }
          }
      }
  };

  const isUnlocked = (type: CharacterType) => unlockedCharacters.includes(type);

  if (hasBeenBanned) {
      if (!punishmentAcknowledged) {
          return (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fade-in border-4 border-red-500 max-w-2xl mx-auto">
                <div 
                    className="text-6xl mb-6 cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => {
                        // Secret way to input code on ban screen
                        if (onEnterSecretCode) {
                            const code = prompt("Digite o código de emergência:");
                            if (code) onEnterSecretCode(code);
                        }
                    }}
                >
                    ⚠️
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">Fim da Linha</h1>
                <p className="text-xl text-gray-700 mb-8 font-semibold">
                    Você abusou do sistema. Não há mais nada a ser feito.<br/>
                    Todas as suas escolhas foram revogadas.
                </p>
                <button 
                    onClick={() => setPunishmentAcknowledged(true)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl text-xl shadow-lg hover:shadow-red-500/50 transition-all transform hover:scale-105"
                >
                    Aceitar Destino
                </button>
            </div>
          );
      }

      return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 text-center animate-fade-in border-4 border-gray-400">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-600 mb-2">Uma Nova Chance?</h1>
            <p className="text-lg text-gray-500 mb-8">Talvez este companheiro possa lhe ensinar a humildade.</p>

            <div className="flex justify-center">
                 {/* Kitten Option - The only one available */}
                <button
                onClick={() => onSelectCharacter('kitten')}
                className="p-6 rounded-xl border-4 border-gray-400 bg-gray-50/50 group text-center transition-all transform hover:-translate-y-1 focus:outline-none hover:shadow-xl"
                >
                <div className="relative w-40 h-40 mx-auto mb-4">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-gray-400 rounded-t-full"></div>
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-28 h-24 bg-gray-400 rounded-full">
                        <div className="absolute top-0 left-2 w-8 h-10 bg-gray-400 rounded-t-full border-t-8 border-r-8 border-gray-500 transform -rotate-12"></div>
                        <div className="absolute top-0 right-2 w-8 h-10 bg-gray-400 rounded-t-full border-t-8 border-l-8 border-gray-500 transform rotate-12"></div>
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-600">Gato Sábio</h2>
                <p className="text-md text-gray-500 font-bold mt-2">Sua única esperança</p>
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 text-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">Bem-vindo(a) ao 'Jogo dos Campeões'!</h1>
      <p className="text-lg text-gray-600 mb-8">Primeiro, escolha seu companheiro de estudos:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
        
        {/* Kitten Option */}
        <button
          onClick={() => onSelectCharacter('kitten')}
          className="p-4 rounded-xl border-4 border-transparent hover:border-gray-400 hover:bg-gray-50/50 group text-center transition-all transform hover:-translate-y-1 focus:outline-none"
        >
          <div className="relative w-40 h-40 mx-auto mb-4">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-gray-400 rounded-t-full"></div>
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-28 h-24 bg-gray-400 rounded-full">
                  <div className="absolute top-0 left-2 w-8 h-10 bg-gray-400 rounded-t-full border-t-8 border-r-8 border-gray-500 transform -rotate-12"></div>
                  <div className="absolute top-0 right-2 w-8 h-10 bg-gray-400 rounded-t-full border-t-8 border-l-8 border-gray-500 transform rotate-12"></div>
              </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-600 group-hover:text-gray-800">Gato esperto</h2>
        </button>
        
        {/* Dog Option */}
        <button
          onClick={() => onSelectCharacter('dog')}
          className="p-4 rounded-xl border-4 border-transparent hover:border-yellow-600 hover:bg-yellow-50/50 group text-center transition-all transform hover:-translate-y-1 focus:outline-none"
        >
          <div className="relative w-40 h-40 mx-auto mb-4">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-yellow-500 rounded-t-full"></div>
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-28 h-24 bg-yellow-500 rounded-t-full">
                  <div className="absolute top-2 left-0 w-10 h-16 bg-yellow-600 rounded-full transform -rotate-12"></div>
                  <div className="absolute top-2 right-0 w-10 h-16 bg-yellow-600 rounded-full transform rotate-12"></div>
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-6 h-5 bg-yellow-800 rounded-b-lg"></div>
              </div>
          </div>
          <h2 className="text-2xl font-bold text-yellow-700 group-hover:text-yellow-800">Cão sabido</h2>
        </button>

        {/* Parrot Option */}
        <button
          onClick={() => onSelectCharacter('parrot')}
          className="p-4 rounded-xl border-4 border-transparent hover:border-red-500 hover:bg-red-50/50 group text-center transition-all transform hover:-translate-y-1 focus:outline-none"
        >
          <div className="relative w-40 h-40 mx-auto mb-4">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-24 bg-red-500 rounded-t-full"></div>
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-red-500 rounded-full">
                  <div className="absolute top-6 left-1 w-6 h-6 bg-white rounded-full"><div className="w-3 h-3 bg-black rounded-full ml-1 mt-1"></div></div>
                  <div className="absolute top-10 left-4 w-10 h-5 bg-yellow-400 rounded-b-full border-2 border-black"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-16 bg-blue-500 rounded-l-full transform -rotate-45 origin-bottom-right"></div>
              </div>
          </div>
          <h2 className="text-2xl font-bold text-red-600 group-hover:text-red-700">Papagaio super inteligente</h2>
        </button>

        {/* Kangaroo Option */}
        <button
          onClick={() => onSelectCharacter('kangaroo')}
          className="p-4 rounded-xl border-4 border-transparent hover:border-amber-700 hover:bg-amber-50/50 group text-center transition-all transform hover:-translate-y-1 focus:outline-none"
        >
          <div className="relative w-40 h-40 mx-auto mb-4">
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
          <h2 className="text-2xl font-bold text-amber-800 group-hover:text-amber-900">Canguru super sabido</h2>
        </button>

        {/* Panda Option */}
        <button
          onClick={() => onSelectCharacter('panda')}
          className="md:col-span-2 w-full max-w-[50%] mx-auto p-4 rounded-xl border-4 border-transparent hover:border-gray-900 hover:bg-gray-50/50 group text-center transition-all transform hover:-translate-y-1 focus:outline-none"
        >
          <div className="relative w-40 h-40 mx-auto mb-4">
               {/* Ears */}
                <div className="absolute top-4 left-6 w-9 h-9 bg-black rounded-full"></div>
                <div className="absolute top-4 right-6 w-9 h-9 bg-black rounded-full"></div>
                {/* Head */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-28 bg-white border-4 border-gray-200 rounded-full">
                    {/* Patches */}
                    <div className="absolute top-8 left-4 w-10 h-8 bg-black rounded-full transform -rotate-12">
                        <div className="absolute top-2 left-3 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute top-8 right-4 w-10 h-8 bg-black rounded-full transform rotate-12">
                        <div className="absolute top-2 right-3 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    {/* Nose */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-5 h-3 bg-black rounded-full"></div>
                </div>
                {/* Body top peeking */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-8 bg-white border-x-4 border-gray-200 rounded-t-xl z-[-1]"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 group-hover:text-black">Panda Zen</h2>
        </button>


        {/* Cellphone Option */}
        <div className="md:col-span-2 flex justify-center gap-6 flex-wrap">
            <button
            onClick={() => onSelectCharacter('cellphone')}
            className="p-4 rounded-xl border-4 border-transparent hover:border-gray-500 hover:bg-gray-50/50 group text-center transition-all transform hover:-translate-y-1 focus:outline-none"
            >
            <div className="relative w-40 h-40 mx-auto mb-4 flex items-center justify-center">
                <div className="w-20 h-32 bg-gray-700 rounded-xl flex items-center justify-center p-1">
                    {/* Screen - CLICKABLE FOR SECRET */}
                    <div 
                        className="w-full h-full bg-black rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
                        title="Clique na tela para hackear"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onUnlockCharacter) {
                                const code = prompt("Digite o código secreto do celular:");
                                if (code) {
                                    if (onUnlockCharacter(code)) {
                                        alert("Sistema hackeado! Novo personagem desbloqueado.");
                                    } else {
                                        alert("Código inválido.");
                                    }
                                }
                            }
                        }}
                    >
                        <div className="text-4xl pointer-events-none">🙂</div>
                    </div>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-600 group-hover:text-gray-800">Celularzinho</h2>
            </button>
            
             {/* Secret Robot Option */}
             <button
                onClick={isUnlocked('robot') ? () => onSelectCharacter('robot') : handleLockedClick}
                className={`p-4 rounded-xl border-4 border-transparent group text-center transition-all transform hover:-translate-y-1 focus:outline-none ${isUnlocked('robot') ? 'hover:border-slate-500 hover:bg-slate-50/50' : 'cursor-pointer'}`}
            >
                <div className="relative w-40 h-40 mx-auto mb-4 flex items-center justify-center">
                    {isUnlocked('robot') ? (
                         <div className="relative w-full h-full">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-slate-300 rounded-lg border-2 border-slate-500 flex items-center justify-center">
                                {/* Chest Plate - CLICKABLE FOR SECRET 564489 */}
                                <div 
                                    className="w-16 h-12 bg-slate-400 rounded border border-slate-500 grid grid-cols-2 gap-1 p-1 cursor-pointer hover:bg-slate-500 transition-colors"
                                    title="Painel de Controle"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onUnlockCharacter) {
                                            const code = prompt("Digite a senha do painel:");
                                            if (code) {
                                                if (onUnlockCharacter(code)) {
                                                    // Unlock handled in App.tsx
                                                } else {
                                                    alert("Acesso negado.");
                                                }
                                            }
                                        }
                                    }}
                                >
                                    <div className="bg-red-500 rounded-sm"></div><div className="bg-yellow-500 rounded-sm"></div>
                                </div>
                            </div>
                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-16 h-14 bg-slate-300 rounded-lg border-2 border-slate-500">
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-black rounded-sm flex gap-1 justify-center items-center"><div className="w-1 h-1 bg-cyan-400"></div><div className="w-1 h-1 bg-cyan-400"></div></div>
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-slate-500"></div>
                            </div>
                         </div>
                    ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-400 flex-col gap-2">
                             <span>🔓</span>
                             <span className="text-sm font-bold">Clique</span>
                        </div>
                    )}
                </div>
                <h2 className="text-2xl font-bold text-slate-600 group-hover:text-slate-800">
                    {isUnlocked('robot') ? 'Robô do Futuro' : '???'}
                </h2>
            </button>

            {/* Secret SixSeven Option */}
            {isUnlocked('sixseven') && (
                <button
                    onClick={() => onSelectCharacter('sixseven')}
                    className="p-4 rounded-xl border-4 border-transparent group text-center transition-all transform hover:-translate-y-1 focus:outline-none hover:border-green-500 hover:bg-green-50/50"
                >
                    <div className="relative w-40 h-40 mx-auto mb-4 flex items-center justify-center">
                         {/* Mini version of the Flying Robot */}
                         <div className="relative w-full h-full animate-bounce" style={{ animationDuration: '3s' }}>
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-16 bg-slate-300 border-2 border-slate-500 rounded-lg flex items-center justify-center">
                                {/* Chest */}
                                <div className="w-16 h-10 bg-slate-800 border border-slate-600 rounded-sm flex items-center justify-center overflow-hidden">
                                     <span className="text-green-400 font-mono text-xl font-bold">6666</span>
                                </div>
                            </div>
                            {/* Head */}
                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-16 h-12 bg-slate-300 border-2 border-slate-500 rounded-md">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-black rounded-sm"></div>
                            </div>
                            {/* Fire */}
                            <div className="absolute bottom-0 left-[30%] w-3 h-8 bg-orange-500 rounded-full blur-sm animate-pulse"></div>
                            <div className="absolute bottom-0 right-[30%] w-3 h-8 bg-orange-500 rounded-full blur-sm animate-pulse delay-75"></div>
                         </div>
                    </div>
                    <h2 className="text-2xl font-bold text-green-600 group-hover:text-green-800">
                        A Entidade 6666
                    </h2>
                </button>
            )}
        </div>

      </div>
    </div>
  );
};

export default CharacterSelectionScreen;
