
import React, { useState } from 'react';
import Character from './Character';
import Island from './Island';
import type { Upgrade, CharacterType, Tattoo } from '../types';

interface StoreScreenProps {
  points: number;
  emeralds: number;
  onConvertEmeralds: (amount: number) => boolean;
  onPurchaseLevelTwo: () => boolean;
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
  isAdminMoney?: boolean;
}

export const UPGRADES: Upgrade[] = [
  // Level 2 Items (Unlockable via bundle)
  { id: 9001, name: 'Emerald Dragon', description: 'Rare Pet. A guardian of the crystal realm.', cost: 0 },
  { id: 9002, name: 'Emerald Fortress', description: 'Level 2 Island. A floating crystal base.', cost: 0 },
  { id: 9003, name: 'Emerald Guardian', description: 'Level 2 Skin. Armor forged from pure energy.', cost: 0 },

  // New High-End Islands (T-Rexs Store additions)
  { id: 9004, name: 'Forest Treehouse', description: 'Island on a tree with two Empress Emeralds. Grants a 7s Event!', cost: 31000 },
  { id: 9005, name: 'Giant Desert', description: 'A massive desert scenario. Takes half the space. Comes with a filter.', cost: 67000 },

  // Character cosmetics
  { id: 2, name: 'Leather Collar', description: 'A leather collar with a golden tag.', cost: 100 },
  { id: 3, name: 'Graduation Cap', description: 'The hat of scholars and wise ones.', cost: 300 },
  { id: 4, name: 'Smart Glasses', description: 'To see problems more clearly.', cost: 600 },
  { id: 51, name: 'Gamer Headset', description: 'Study while listening to lo-fi beats.', cost: 800 },
  { id: 5, name: 'Champion Cape', description: 'The ultimate outfit for a knowledge superhero!', cost: 1000 },
  { id: 50, name: 'King\'s Crown', description: 'A golden crown fit for royalty.', cost: 5000 },
  { id: 121, name: 'Angel Wings', description: 'Fly high with purity and wisdom.', cost: 8000 },
  { id: 26, name: 'Clown Nose', description: 'A colorful nose for Carnival.', cost: 5 },
  { id: 23, name: 'Santa Hat', description: 'A red hat to celebrate Christmas.', cost: 6 },
  { id: 24, name: 'Witch Hat', description: 'A witch hat for Halloween.', cost: 6 },
  { id: 25, name: 'Rabbit Ears', description: 'A pair of ears for Easter.', cost: 7 },
  { id: 120, name: 'Snowman', description: 'A frosty companion for Christmas.', cost: 800 },
  
  // Pets and Companions (New)
  { id: 201, name: 'Loyal Dog', description: 'A loyal companion for your adventures.', cost: 50000 },
  { id: 202, name: 'Cuddly Cat', description: 'Always purring by your side.', cost: 50000 },
  { id: 203, name: 'Talking Parrot', description: 'Repeats the correct answers (sometimes).', cost: 75000 },
  { id: 204, name: 'Baby Dragon', description: 'A mythical creature to protect you.', cost: 500000 },

  // Food & Fun (New)
  { id: 70, name: 'Giant Burger', description: 'For when hunger strikes.', cost: 500 },
  { id: 71, name: 'Pepperoni Pizza', description: 'Everyone\'s favorite.', cost: 800 },
  { id: 72, name: 'Infinite Soda', description: 'The fizz never ends!', cost: 1500 },
  { id: 73, name: 'Acoustic Guitar', description: 'Play a tune to relax.', cost: 12000 },
  { id: 74, name: 'Golden Ball', description: 'A collector\'s item for your shelf.', cost: 1000000 },

  // Tech & Gadgets (New Low Cost Items)
  { id: 55, name: 'Latest Smartphone', description: 'Stay connected with the world.', cost: 25000 },
  { id: 56, name: 'Smartwatch', description: 'Count your steps and check the time.', cost: 15000 },
  { id: 57, name: 'Magic Tablet', description: 'Study and play anywhere.', cost: 40000 },
  { id: 58, name: 'Gamer Laptop', description: 'Maximum power for your studies.', cost: 80000 },
  { id: 59, name: 'Bluetooth Earbuds', description: 'Wireless music for more freedom.', cost: 5000 },
  
  // Vehicles
  { id: 6, name: 'Pro Skateboard', description: 'For awesome knowledge tricks.', cost: 2500 },
  { id: 52, name: 'Surfboard', description: 'Catch the best waves on the island.', cost: 3000 },
  { id: 7, name: 'Racing Bike', description: 'Get to the answers faster.', cost: 5000 },
  { id: 28, name: 'Sports Car', description: 'Speed and style for the modern champion.', cost: 15000 },
  { id: 130, name: 'Jetpack', description: 'Fly low with style.', cost: 120000 },
  { id: 53, name: 'Magic Carpet', description: 'Fly high with the power of imagination.', cost: 50000 },
  { id: 122, name: 'Futuristic Bike', description: 'A hovering bike. The future is here!', cost: 75000 },
  { id: 123, name: 'UFO', description: 'Explore the galaxy with alien tech.', cost: 150000 },
  
  // Island Upgrades
  { id: 99, name: 'Dirt Terrain', description: 'Transform your island ground from sand to dirt.', cost: 1 },
  { id: 21, name: 'Island House', description: 'A beautiful house for your champion.', cost: 1000000 },
  { id: 11, name: 'Helicopter', description: 'Explore the skies above your island.', cost: 7000000 },
  { id: 12, name: 'Jet Plane', description: 'Travel the world of knowledge.', cost: 10000000 },
  { id: 13, name: 'City', description: 'Transform your island into a metropolis.', cost: 31000000 },
  { id: 22, name: 'Luxury Mansion', description: 'The peak of comfort and status on your island.', cost: 51000000 },
  { id: 60, name: 'Medieval Castle', description: 'An impenetrable fortress for the king of the island.', cost: 100000000 },
  { id: 61, name: 'Floating Island', description: 'Your island now floats in the sky among the clouds.', cost: 500000000 },
  { id: 62, name: 'NASA Rocket', description: 'Ready to explore new planets.', cost: 750000000 },
  { id: 31, name: 'Jet Ski', description: 'Navigate the seas of your island with style.', cost: 120000000 },
  { id: 124, name: 'Amusement Park', description: 'Your island now has a roller coaster!', cost: 200000000 },

  // Utility / Feature unlocks
  { id: 200, name: 'Secret Gem', description: 'Unlocks secret characters (Unicorn and Dragon).', cost: 5000000 },
  { id: 16, name: 'Passive Income', description: 'Earn 2 points per hour, automatically.', cost: 200 },
  { id: 14, name: 'Tattoo Studio', description: 'Unlock access to stylish tattoos.', cost: 500 },
  { id: 8, name: 'Double XP', description: 'Earn 2x more points in all activities.', cost: 1000000 },
  { id: 9, name: 'Triple Activity', description: 'Earn 3x more points in all activities.', cost: 5000000 },
  { id: 29, name: 'Admin', description: 'Earn 52 trillion points per minute and everyone\'s respect.', cost: 1000000000000 },
  { id: 30, name: 'ADM', description: 'Become an ADM and gain unimaginable power. Massive points bonus.', cost: 5000000000000 },
  { id: 32, name: 'King', description: 'You can do almost anything. Bonus of 81 quadrillion points per minute.', cost: 100000000000000 },
  { id: 33, name: 'Super Builder', description: 'Earn 95 quadrillion points per minute.', cost: 160000000000000 },
  { id: 42, name: 'Infinite Money', description: 'Your points become infinite. Buy everything without worry!', cost: 99999999999999999999999999999999 },
];

export const TATTOOS: Tattoo[] = [
    { id: 'star', name: 'Star of Wisdom', cost: 250 },
    { id: 'anchor', name: 'Anchor of Strength', cost: 250 },
    { id: 'heart', name: 'Brave Heart', cost: 250 },
];

export const FOOTBALL_CARDS: Upgrade[] = [
  { id: 101, name: 'Rookie Player', description: 'The start of the journey, playing on dirt fields.', cost: 100 },
  { id: 102, name: 'Academy Promise', description: 'Your talent has been noticed by a big club.', cost: 1000 },
  { id: 103, name: 'Pro Player', description: 'The dream came true: your first professional contract.', cost: 50000 },
  { id: 104, name: 'League Star', description: 'You are the name of the moment in national football.', cost: 1000000 },
  { id: 105, name: 'National Hero', description: 'Wearing the yellow jersey and representing the country.', cost: 100000000 },
  { id: 106, name: 'World\'s Best', description: 'The highest honor, global recognition.', cost: 10000000000000 },
  { id: 107, name: 'Sport Legend', description: 'Your name is engraved forever in history.', cost: 35000000000000 },
  { id: 108, name: 'Pelé, The King', description: 'Unsurpassable. The greatest of all time. Athlete of the Century.', cost: 60000000000000 },
];

// --- Exclusive Item Groups ---
export const HAT_UPGRADES = [3, 23, 24, 25, 50, 51];
export const DESK_ITEMS = [55, 56, 57, 58, 59, 73]; 
export const TRANSPORT_ITEMS = [7, 28, 6, 52, 53, 122, 123, 130];
// -----------------------------


// FIX: Add explicit type to UPGRADE_CATEGORIES to make 'note' property optional
const UPGRADE_CATEGORIES: {
    [key: string]: {
        title: string;
        ids: number[];
        note?: string;
    }
} = {
    pets: {
        title: 'Pets & Companions',
        ids: [201, 202, 203, 204],
        note: 'Your new best friends! They appear by your side.'
    },
    characterCosmetics: {
        title: 'Character Cosmetics',
        ids: [2, 3, 50, 4, 51, 5, 121, 26, 23, 24, 25, 120, 6, 52, 7, 28, 130, 53, 122, 123, 55, 56, 57, 58, 59, 73],
        note: 'Only one item of each type (hat, vehicle, gadget) can be equipped at a time.'
    },
    fun: {
        title: 'Food & Fun',
        ids: [70, 71, 72, 74],
    },
    islandUpgrades: {
        title: 'Island Upgrades',
        ids: [99, 21, 11, 12, 13, 22, 60, 61, 62, 31, 124, 9004, 9005]
    },
    utilities: {
        title: 'Utilities & Bonuses',
        ids: [200, 16, 14, 8, 9, 29, 30, 32, 33, 42]
    }
};

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const StoreScreen: React.FC<StoreScreenProps> = ({
  points,
  emeralds,
  onConvertEmeralds,
  onPurchaseLevelTwo,
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
  isAdminMoney
}) => {

  const isPurchased = (id: number) => purchasedUpgrades.includes(id);
  const isActive = (id: number) => activeUpgrades.includes(id);
  const isTattooPurchased = (id: string) => purchasedTattoos.includes(id);
  const isTattooActive = (id: string) => activeTattoo === id;
  const isActivatable = (id: number) => ![14, 200, 9001, 9002, 9003].includes(id); // Gem (200) is passive unlock, lvl2 items are usually auto-equipped

  // Level 2 Items check
  const hasLevelTwo = isPurchased(9001) && isPurchased(9002) && isPurchased(9003);

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
    const canAfford = (points >= upgrade.cost) || isAdminMoney;
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
        aria-label={`${upgrade.name}. Cost: ${upgrade.cost} points. ${upgrade.description}`}
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
                {active ? 'Equipped' : 'Unequipped'}
              </span>
            ) : (
              <span className="font-bold py-2 px-4 rounded-full text-sm bg-blue-500 text-white">
                Purchased
              </span>
            )
          ) : (
            <span
              className={`font-bold py-2 px-4 rounded-full text-sm ${
                canAfford ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {upgrade.cost === Infinity ? 'Infinite' : `${upgrade.cost.toLocaleString('pt-BR')} Pts`}
            </span>
          )}
        </div>
      </button>
    );
  };
  
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 w-full animate-fade-in-up">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b pb-4">
        <button onClick={onBack} className="text-sm text-gray-600 hover:text-teal-500 transition-colors self-start mb-4 md:mb-0">
          &larr; Back
        </button>
        <div className="text-right flex flex-col items-end">
          <h1 className="text-4xl font-bold text-teal-600">Shop</h1>
          <div className="flex gap-2 mt-2">
             <div className={`text-lg font-bold px-4 py-1 rounded-full border ${isAdminMoney ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-gray-200 border-gray-300 text-gray-800'}`}>
                💰 {isAdminMoney ? 'ADMIN' : points === Infinity ? 'Infinite' : Math.floor(points).toLocaleString('pt-BR') + ' Pts'}
             </div>
             <div className="bg-green-100 text-green-800 text-lg font-bold px-4 py-1 rounded-full border border-green-300 flex items-center gap-1">
                ❇️ {emeralds.toLocaleString('pt-BR')} Emeralds
             </div>
          </div>
        </div>
      </div>
      
      {/* Visual Preview */}
      <div className="mb-6 h-48 -my-4 scale-75 flex justify-center items-center relative">
         <div className="absolute bottom-0">
             <Island purchasedUpgrades={purchasedUpgrades} activeUpgrades={activeUpgrades} />
         </div>
         <div className="absolute bottom-8">
             <Character type={characterType} activeUpgrades={activeUpgrades} activeTattoo={activeTattoo} hasMiniPet={hasMiniPet} miniPetCount={miniPetCount} />
         </div>
      </div>

      {/* Emerald Exchange & Level 2 Section */}
      <div className="bg-gradient-to-r from-emerald-900 to-green-800 p-6 rounded-xl border-4 border-green-400 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">💎</div>
          
          <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
              <span className="text-4xl">❇️</span> The Emerald Exchange
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Conversion */}
              <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h3 className="text-green-300 font-bold mb-2">Convert Points to Emeralds</h3>
                  <p className="text-gray-300 text-sm mb-4">Rate: 10,000 Points = 1 Emerald</p>
                  
                  <div className="flex gap-2">
                      <button 
                        onClick={() => onConvertEmeralds(1)}
                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded shadow disabled:opacity-50"
                        disabled={points < 10000}
                      >
                          Buy 1 (10k Pts)
                      </button>
                      <button 
                        onClick={() => onConvertEmeralds(10)}
                        className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow disabled:opacity-50"
                        disabled={points < 100000}
                      >
                          Buy 10 (100k Pts)
                      </button>
                      <button 
                        onClick={() => onConvertEmeralds(100)}
                        className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow disabled:opacity-50"
                        disabled={points < 1000000}
                      >
                          Buy 100 (1M Pts)
                      </button>
                  </div>
              </div>

              {/* Level 2 Bundle */}
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-4 rounded-lg border-2 border-yellow-300 shadow-lg text-white relative">
                  {hasLevelTwo ? (
                      <div className="flex flex-col items-center justify-center h-full">
                          <div className="text-6xl mb-2">🏆</div>
                          <h3 className="text-2xl font-black">LEVEL 2 UNLOCKED!</h3>
                          <p className="text-sm opacity-90">You own the Emerald Realm.</p>
                      </div>
                  ) : (
                      <>
                        <h3 className="text-2xl font-black mb-1">LEVEL 2 BUNDLE</h3>
                        <p className="text-sm mb-3 text-yellow-100">Unlock the Rare Emerald Dragon, Crystal Island, and Guardian Skin!</p>
                        
                        <div className="flex justify-between items-end">
                            <ul className="text-xs list-disc list-inside opacity-90 space-y-1">
                                <li>Rare Pet: Emerald Dragon</li>
                                <li>Island: Floating Fortress</li>
                                <li>Skin: Emerald Guardian</li>
                                <li>Bonus: 5s 100x Event!</li>
                            </ul>
                            <button 
                                onClick={onPurchaseLevelTwo}
                                className="bg-black/40 hover:bg-black/60 border-2 border-white text-white font-black py-3 px-6 rounded-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={emeralds < 10000}
                            >
                                BUY (10,000 ❇️)
                            </button>
                        </div>
                      </>
                  )}
              </div>
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
                    {UPGRADES.filter(u => category.ids.includes(u.id) && ![9001,9002,9003].includes(u.id)).map(upgrade => (
                        <UpgradeItem key={upgrade.id} upgrade={upgrade} />
                    ))}
                </div>
            </div>
        ))}

        <div className="mt-8">
            <div className="text-left border-b-2 border-gray-200 pb-2 mb-4">
                <h3 className="text-2xl font-bold text-gray-700">Football Evolution</h3>
                <p className="text-sm text-gray-500">Buy cards in sequence to evolve your player's career, from the dirt field to world stardom!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FOOTBALL_CARDS.map((card, index) => {
                    const isCardPurchased = purchasedFootballCards.includes(card.id);
                    const isUnlocked = index === 0 || purchasedFootballCards.includes(FOOTBALL_CARDS[index - 1].id);
                    const canAfford = (points >= card.cost) || isAdminMoney;

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
                             aria-label={`${card.name}. Cost: ${card.cost} points. ${card.description}`}
                        >
                            {!isUnlocked && !isCardPurchased && (
                                <div className="absolute top-2 right-2 text-gray-400" title="Buy previous item to unlock">
                                    <LockIcon />
                                </div>
                            )}
                            <h4 className="text-lg font-bold">{card.name}</h4>
                            <p className="text-sm flex-grow">{card.description}</p>
                            <div className="mt-auto pt-2 text-right">
                                {isCardPurchased ? (
                                    <span className="font-bold py-2 px-4 rounded-full text-sm bg-blue-500 text-white">
                                        Purchased
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
          <h3 className="text-2xl font-bold text-gray-700 mb-4 text-left border-b-2 border-gray-200 pb-2">Tattoo Studio</h3>
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
                      {isTattooActive(tattoo.id) ? 'Equipped' : 'Equip'}
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
