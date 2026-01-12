
import React from 'react';
import Character from './Character';
import Island from './Island';
import type { Upgrade, CharacterType, Tattoo } from '../types';

interface StoreScreenProps {
  points: number;
  characterType: CharacterType;
  purchasedUpgrades: number[];
  activeUpgrades: number[];
  purchasedTattoos: string[];
  activeTattoo: string | null;
  purchasedFootballCards: number[];
  hasMiniPet?: boolean; // deprecated
  miniPetCount?: number;
  onPurchaseUpgrade: (id: number, cost: number) => boolean;
  onToggleUpgrade: (id: number) => void;
  onPurchaseTattoo: (id: string, cost: number) => boolean;
  onSelectTattoo: (id: string) => void;
  onPurchaseFootballCard: (id: number, cost: number) => boolean;
  onBack: () => void;
}

export const UPGRADES: Upgrade[] = [
  // Character cosmetics
  { id: 2, name: 'Coleira de Couro', description: 'Uma coleira de couro com uma plaquinha dourada.', cost: 100 },
  { id: 3, name: 'Capelo de Formando', description: 'O chapéu dos sábios e estudiosos.', cost: 300 },
  { id: 4, name: 'Óculos de Sabichão', description: 'Para enxergar os problemas com mais clareza.', cost: 600 },
  { id: 5, name: 'Capa de Campeão', description: 'O traje final de um super-herói do conhecimento!', cost: 1000 },
  { id: 26, name: 'Nariz de Palhaço', description: 'Um nariz colorido para pular o Carnaval.', cost: 5 },
  { id: 23, name: 'Gorro de Papai Noel', description: 'Um gorro vermelho para celebrar o Natal.', cost: 6 },
  { id: 24, name: 'Chapéu de Bruxa', description: 'Um chapéu de bruxa para o Halloween.', cost: 6 },
  { id: 25, name: 'Orelhas de Coelho', description: 'Um par de orelhas de coelho para a Páscoa.', cost: 7 },
  { id: 18, name: 'Celular Moderno', description: 'Para se conectar com o mundo do saber.', cost: 1000 },
  { id: 19, name: 'Tablet de Estudos', description: 'Uma tela maior para maiores aprendizados.', cost: 1080 },
  { id: 20, name: 'Notebook para Estudar', description: 'Potência e portabilidade para o conhecimento.', cost: 1600 },
  { id: 40, name: 'Boneco do Homem de Ferro', description: 'Uma armadura tecnológica que dispara 1.000 pontos por hora.', cost: 3500 },
  { id: 6, name: 'Skate Profissional', description: 'Para manobras incríveis de conhecimento.', cost: 2500 },
  { id: 7, name: 'Bicicleta de Corrida', description: 'Para chegar mais rápido às respostas.', cost: 5000 },
  { id: 28, name: 'Carro Esportivo', description: 'Velocidade e estilo para o campeão moderno.', cost: 15000 },
  { id: 10, name: 'Computador de Ponta', description: 'Para trabalhar e ganhar mais conhecimento.', cost: 8000 },
  { id: 6666, name: 'Entidade 6666', description: 'Desbloqueia a lendária Entidade 6666 e seu poder oculto.', cost: 123456789012333333333366755867676767 },
  
  // Island Upgrades
  { id: 99, name: 'Terreno de Terra', description: 'Transforme o chão da sua ilha de areia em terra firme.', cost: 1 },
  { id: 21, name: 'Casa na Ilha', description: 'Uma bela casa para seu campeão morar.', cost: 1000000 },
  { id: 11, name: 'Helicóptero', description: 'Explore os céus da sua ilha.', cost: 7000000 },
  { id: 12, name: 'Avião a Jato', description: 'Viaje pelo mundo do conhecimento.', cost: 10000000 },
  { id: 13, name: 'Cidade', description: 'Transforme sua ilha numa metrópole.', cost: 31000000 },
  { id: 22, name: 'Mansão Luxuosa', description: 'O auge do conforto e do status na sua ilha.', cost: 51000000 },
  { id: 27, name: 'Dono do Mundo', description: 'O mundo está a seus pés. Sua ilha agora é um planeta.', cost: 199000000000000 },
  { id: 31, name: 'Jet Ski', description: 'Navegue pelos mares da sua ilha com estilo.', cost: 100000000 },

  // Utility / Feature unlocks
  { id: 16, name: 'Renda Passiva', description: 'Ganha 2 pontos por hora, automaticamente.', cost: 200 },
  // { id: 15, name: 'Código Premiado', description: 'Desbloqueie o terminal para inserir um código secreto a cada 2 horas e ganhar pontos.', cost: 362 }, // REMOVED
  { id: 14, name: 'Estúdio de Tatuagem', description: 'Desbloqueie o acesso a tatuagens estilosas.', cost: 500 },
  { id: 8, name: 'Experiência em Dobro', description: 'Ganha 2x mais pontos em todas as atividades.', cost: 1000000 },
  { id: 9, name: 'Atividade Tripla', description: 'Ganha 3x mais pontos em todas as atividades.', cost: 5000000 },
  { id: 17, name: 'Dono da Galáxia', description: 'A galáxia está em suas mãos. Ganhe 5 bilhões de pontos por minuto.', cost: 31000000000 },
  { id: 29, name: 'Admin', description: 'Ganhe 52 trilhões de pontos por minuto e o respeito de todos.', cost: 1000000000000 },
  { id: 30, name: 'ADM', description: 'Torne-se um ADM e ganhe um poder inimaginável. Bônus massivo de pontos.', cost: 5000000000000 },
  { id: 32, name: 'Rei', description: 'Você consegue fazer quase tudo com ele. Bônus de 81 quatrilhões de pontos por minuto.', cost: 100000000000000 },
  { id: 33, name: 'Super Construir', description: 'Ganha 95 quatrilhões de pontos por minuto.', cost: 160000000000000 },
  { id: 42, name: 'Dinheiro Infinito', description: 'Seus pontos se tornam infinitos. Compre tudo sem se preocupar!', cost: 99999999999999999999999999999999 },
];

export const TATTOOS: Tattoo[] = [
    { id: 'star', name: 'Estrela da Sabedoria', cost: 250 },
    { id: 'anchor', name: 'Âncora da Firmeza', cost: 250 },
    { id: 'heart', name: 'Coração Valente', cost: 250 },
];

export const FOOTBALL_CARDS: Upgrade[] = [
  { id: 101, name: 'Jogador de Várzea', description: 'O início da jornada, jogando nos campos de terra.', cost: 100 },
  { id: 102, name: 'Promessa da Base', description: 'Seu talento foi notado por um grande clube.', cost: 1000 },
  { id: 103, name: 'Jogador Profissional', description: 'O sonho virou realidade: o primeiro contrato profissional.', cost: 50000 },
  { id: 104, name: 'Destaque do Campeonato', description: 'Você é o nome do momento no futebol nacional.', cost: 1000000 },
  { id: 105, name: 'Craque da Seleção', description: 'Vestindo a camisa amarela e representando o país.', cost: 100000000 },
  { id: 106, name: 'Melhor do Mundo', description: 'A honra máxima, o reconhecimento global.', cost: 10000000000000 },
  { id: 107, name: 'Lenda do Esporte', description: 'Seu nome está gravado para sempre na história.', cost: 35000000000000 },
  { id: 108, name: 'Pelé, o Rei', description: 'Insuperável. O maior de todos os tempos. O Atleta do Século.', cost: 60000000000000 },
];

// --- Exclusive Item Groups ---
export const HAT_UPGRADES = [3, 23, 24, 25];
export const DESK_ITEMS = [10, 20];
export const TRANSPORT_ITEMS = [7, 28];
// -----------------------------


// FIX: Add explicit type to UPGRADE_CATEGORIES to make 'note' property optional
const UPGRADE_CATEGORIES: {
    [key: string]: {
        title: string;
        ids: number[];
        note?: string;
    }
} = {
    characterCosmetics: {
        title: 'Cosméticos para Personagem',
        ids: [2, 3, 4, 5, 26, 23, 24, 25, 18, 19, 20, 40, 6, 7, 28, 10, 6666],
        note: 'Apenas um item de cada tipo (chapéu, veículo, etc.) pode ser equipado por vez.'
    },
    islandUpgrades: {
        title: 'Melhorias para Ilha',
        ids: [99, 21, 11, 12, 13, 22, 27, 31]
    },
    utilities: {
        title: 'Utilidades e Bônus',
        // Removed 15 from ids
        ids: [16, 14, 8, 9, 17, 29, 30, 32, 33, 42]
    }
};

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const StoreScreen: React.FC<StoreScreenProps> = ({
  points,
  characterType,
  purchasedUpgrades,
  activeUpgrades,
  purchasedTattoos,
  activeTattoo,
  purchasedFootballCards,
  hasMiniPet,
  miniPetCount,
  onPurchaseUpgrade,
  onToggleUpgrade,
  onPurchaseTattoo,
  onSelectTattoo,
  onPurchaseFootballCard,
  onBack,
}) => {

  const isPurchased = (id: number) => purchasedUpgrades.includes(id);
  const isActive = (id: number) => activeUpgrades.includes(id);
  const isTattooPurchased = (id: string) => purchasedTattoos.includes(id);
  const isTattooActive = (id: string) => activeTattoo === id;
  const isActivatable = (id: number) => ![14, 6666].includes(id); // Removed 15 and 6666 (unlock only) from check

  const handleItemClick = (upgrade: Upgrade) => {
    if (isPurchased(upgrade.id)) {
      if (isActivatable(upgrade.id)) {
        onToggleUpgrade(upgrade.id);
      }
    } else {
      onPurchaseUpgrade(upgrade.id, upgrade.cost);
    }
  };

  const handleTattooClick = (tattoo: Tattoo) => {
    if (isTattooPurchased(tattoo.id)) {
      onSelectTattoo(tattoo.id);
    } else {
      onPurchaseTattoo(tattoo.id, tattoo.cost);
    }
  };

  const UpgradeItem: React.FC<{ upgrade: Upgrade }> = ({ upgrade }) => {
    const purchased = isPurchased(upgrade.id);
    const active = isActive(upgrade.id);
    const canAfford = points >= upgrade.cost;
    const activatable = isActivatable(upgrade.id);

    return (
      <button
        key={upgrade.id}
        onClick={() => handleItemClick(upgrade)}
        disabled={!canAfford && !purchased}
        className={`flex flex-col text-left p-4 rounded-lg border-2 transition-all duration-200 h-full ${
          purchased
            ? 'bg-teal-50 border-teal-200'
            : canAfford
            ? 'bg-white hover:border-teal-400 hover:bg-teal-50/50'
            : 'bg-gray-100 border-gray-200 text-gray-500'
        } disabled:cursor-not-allowed`}
        aria-label={`${upgrade.name}. Custo: ${upgrade.cost} pontos. ${upgrade.description}`}
      >
        <h4 className="text-lg font-bold">{upgrade.name}</h4>
        <p className="text-sm flex-grow">{upgrade.description}</p>
        <div className="mt-auto pt-2 text-right">
          {purchased ? (
            activatable ? (
              <span
                className={`font-bold py-2 px-4 rounded-full text-sm ${
                  active ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                {active ? 'Ativado' : 'Desativado'}
              </span>
            ) : (
              <span className="font-bold py-2 px-4 rounded-full text-sm bg-blue-500 text-white">
                Adquirido
              </span>
            )
          ) : (
            <span
              className={`font-bold py-2 px-4 rounded-full text-sm ${
                canAfford ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {upgrade.cost === Infinity ? 'Infinito' : `${upgrade.cost.toLocaleString('pt-BR')} Pts`}
            </span>
          )}
        </div>
      </button>
    );
  };
  
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 w-full animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-sm text-gray-600 hover:text-teal-500 transition-colors">
          &larr; Voltar
        </button>
        <div className="text-right">
          <h1 className="text-4xl font-bold text-teal-600">Loja</h1>
          <div className="inline-block bg-gray-200 text-gray-800 text-lg font-bold px-4 py-1 rounded-full mt-1">
             Pontos: {points === Infinity ? 'Infinito' : Math.floor(points).toLocaleString('pt-BR')}
          </div>
        </div>
      </div>
      
      <div className="mb-6 h-48 -my-4 scale-75 flex justify-center items-center relative">
         <div className="absolute bottom-0">
             <Island purchasedUpgrades={purchasedUpgrades} activeUpgrades={activeUpgrades} />
         </div>
         <div className="absolute bottom-8">
             <Character type={characterType} activeUpgrades={activeUpgrades} activeTattoo={activeTattoo} hasMiniPet={hasMiniPet} miniPetCount={miniPetCount} />
         </div>
      </div>

      <div className="space-y-8">
        {Object.values(UPGRADE_CATEGORIES).map(category => (
            <div key={category.title}>
                <div className="text-left border-b-2 border-gray-200 pb-2 mb-4">
                    <h3 className="text-2xl font-bold text-gray-700">{category.title}</h3>
                    {category.note && <p className="text-sm text-gray-500">{category.note}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {UPGRADES.filter(u => category.ids.includes(u.id)).map(upgrade => (
                        <UpgradeItem key={upgrade.id} upgrade={upgrade} />
                    ))}
                </div>
            </div>
        ))}

        <div className="mt-8">
            <div className="text-left border-b-2 border-gray-200 pb-2 mb-4">
                <h3 className="text-2xl font-bold text-gray-700">Evolução do Futebol</h3>
                <p className="text-sm text-gray-500">Compre as cartas em sequência para evoluir a carreira do seu jogador, do campinho ao estrelato mundial!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FOOTBALL_CARDS.map((card, index) => {
                    const isCardPurchased = purchasedFootballCards.includes(card.id);
                    const isUnlocked = index === 0 || purchasedFootballCards.includes(FOOTBALL_CARDS[index - 1].id);
                    const canAfford = points >= card.cost;

                    return (
                        <button
                            key={card.id}
                            onClick={() => onPurchaseFootballCard(card.id, card.cost)}
                            disabled={isCardPurchased || !isUnlocked || !canAfford}
                            className={`flex flex-col text-left p-4 rounded-lg border-2 transition-all duration-200 h-full relative ${
                                isCardPurchased
                                    ? 'bg-blue-50 border-blue-200'
                                    : isUnlocked && canAfford
                                    ? 'bg-white hover:border-teal-400 hover:bg-teal-50/50'
                                    : 'bg-gray-100 border-gray-200 text-gray-500'
                            } disabled:cursor-not-allowed`}
                             aria-label={`${card.name}. Custo: ${card.cost} pontos. ${card.description}`}
                        >
                            {!isUnlocked && !isCardPurchased && (
                                <div className="absolute top-2 right-2 text-gray-400" title="Compre o item anterior para desbloquear">
                                    <LockIcon />
                                </div>
                            )}
                            <h4 className="text-lg font-bold">{card.name}</h4>
                            <p className="text-sm flex-grow">{card.description}</p>
                            <div className="mt-auto pt-2 text-right">
                                {isCardPurchased ? (
                                    <span className="font-bold py-2 px-4 rounded-full text-sm bg-blue-500 text-white">
                                        Adquirido
                                    </span>
                                ) : (
                                    <span className={`font-bold py-2 px-4 rounded-full text-sm ${
                                        isUnlocked && canAfford ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-300 text-gray-700'
                                    }`}>
                                        {card.cost.toLocaleString('pt-BR')} Pts
                                    </span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>

      </div>
      
      {purchasedUpgrades.includes(14) && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-4 text-left border-b-2 border-gray-200 pb-2">Estúdio de Tatuagem</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TATTOOS.map(tattoo => (
              <button
                key={tattoo.id}
                onClick={() => handleTattooClick(tattoo)}
                disabled={!isTattooPurchased(tattoo.id) && points < tattoo.cost}
                className={`flex flex-col text-left p-4 rounded-lg border-2 transition-all duration-200 h-full ${
                    isTattooPurchased(tattoo.id)
                    ? 'bg-teal-50 border-teal-200'
                    : points >= tattoo.cost
                    ? 'bg-white hover:border-teal-400 hover:bg-teal-50/50'
                    : 'bg-gray-100 border-gray-200 text-gray-500'
                } disabled:cursor-not-allowed`}
              >
                <h4 className="text-lg font-bold">{tattoo.name}</h4>
                <div className="mt-auto pt-2 text-right">
                  {isTattooPurchased(tattoo.id) ? (
                    <span className={`font-bold py-2 px-4 rounded-full text-sm ${isTattooActive(tattoo.id) ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                      {isTattooActive(tattoo.id) ? 'Equipada' : 'Equipar'}
                    </span>
                  ) : (
                    <span className={`font-bold py-2 px-4 rounded-full text-sm ${points >= tattoo.cost ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-300 text-gray-700'}`}>
                      {tattoo.cost.toLocaleString('pt-BR')} Pts
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreScreen;
