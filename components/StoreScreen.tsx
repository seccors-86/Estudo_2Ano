import React, { useState } from 'react';
import Character from './Character';
import type { Upgrade, CharacterType } from '../types';

interface StoreScreenProps {
  points: number;
  characterType: CharacterType;
  purchasedUpgrades: number[];
  onPurchaseUpgrade: (id: number, cost: number) => boolean;
  onBack: () => void;
}

const UPGRADES: Upgrade[] = [
  { id: 2, name: 'Coleira Chique', description: 'Uma coleira estilosa para seu campeão.', cost: 100 },
  { id: 3, name: 'Chapéu de Estudante', description: 'Um chapéu que mostra sua inteligência.', cost: 300 },
  { id: 4, name: 'Óculos de Grau', description: 'Para enxergar os problemas com mais clareza.', cost: 600 },
  { id: 5, name: 'Capa do Saber', description: 'O traje final de um super-herói do conhecimento!', cost: 1000 },
];

const StoreScreen: React.FC<StoreScreenProps> = ({ points, characterType, purchasedUpgrades, onPurchaseUpgrade, onBack }) => {
  const [purchaseFeedback, setPurchaseFeedback] = useState('');

  const handlePurchase = (upgrade: Upgrade) => {
    const success = onPurchaseUpgrade(upgrade.id, upgrade.cost);
    if (success) {
      setPurchaseFeedback('Evolução comprada com sucesso!');
      setTimeout(() => setPurchaseFeedback(''), 2000);
    }
  }

  const allUpgradesPurchased = UPGRADES.every(u => purchasedUpgrades.includes(u.id));

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 text-center animate-fade-in w-full max-w-3xl mx-auto">
      <div className="relative mb-4 text-left">
         <button onClick={onBack} className="text-sm text-gray-600 hover:text-teal-500 transition-colors">
          &larr; Voltar
        </button>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">Loja de Evolução</h1>
      <p className="text-lg text-gray-600 mb-4">Use seus pontos para equipar seu campeão!</p>
       <div className="mb-4 inline-block bg-gray-200 text-gray-800 text-xl font-bold px-6 py-2 rounded-full">
            Pontos: {points}
       </div>

      <div className="mb-6">
        <Character type={characterType} purchasedUpgrades={purchasedUpgrades} />
      </div>

      <div className="bg-gray-50 rounded-lg p-6 relative">
        {purchaseFeedback && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white font-bold px-4 py-1 rounded-full text-sm animate-bounce">
            {purchaseFeedback}
          </div>
        )}
        {allUpgradesPurchased ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold text-green-600">Evolução Máxima!</h2>
              <p className="text-gray-600 mt-2">Seu campeão alcançou a forma final. Parabéns!</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {UPGRADES.map(upgrade => {
              const isPurchased = purchasedUpgrades.includes(upgrade.id);
              const canAfford = points >= upgrade.cost;
              return (
                <div key={upgrade.id} className={`p-4 rounded-lg border-2 flex flex-col justify-between ${isPurchased ? 'bg-gray-200 border-gray-300' : 'bg-white'}`}>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{upgrade.name}</h3>
                    <p className="text-sm text-gray-600 my-1">{upgrade.description}</p>
                    <p className="font-semibold text-teal-600">Custo: {upgrade.cost} pontos</p>
                  </div>
                  <button
                    onClick={() => handlePurchase(upgrade)}
                    disabled={isPurchased || !canAfford}
                    className="mt-3 w-full bg-teal-500 text-white font-bold py-2 px-3 rounded-lg text-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isPurchased ? 'Comprado' : (canAfford ? 'Comprar' : 'Pontos Insuficientes')}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreScreen;