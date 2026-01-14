
import React, { useState, useEffect, useCallback, useRef } from 'react';
import SubjectSelectionScreen from './components/SubjectSelectionScreen';
import TopicSelectionScreen from './components/TopicSelectionScreen';
import GameScreen from './components/GameScreen';
import LevelCompleteScreen from './components/LevelCompleteScreen';
import StoreScreen, { FOOTBALL_CARDS, TATTOOS } from './components/StoreScreen';
import CharacterSelectionScreen from './components/CharacterSelectionScreen';
import WeatherOverlay from './components/WeatherOverlay';
import SoccerChallengeScreen from './components/SoccerChallengeScreen';
import SoccerGameScreen from './components/SoccerGameScreen';
import AdminPanel from './components/AdminPanel';
import ExitModal from './components/ExitModal';
import { adminStorage } from './services/storageService';

import type { GameStatus, Subject, Difficulty, CharacterType, AccountType, GameEvent } from './types';

const App: React.FC = () => {
  // --- User Identity ---
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('username') || 'Campeão');
  const [password, setPassword] = useState<string | null>(() => localStorage.getItem('password') || 'nopass');
  const [accountType, setAccountType] = useState<AccountType>(() => (localStorage.getItem('accountType') as AccountType) || 'Jogador');

  const [tempUsername, setTempUsername] = useState('');
  const [tempPassword, setTempPassword] = useState('');

  const [gameStatus, setGameStatus] = useState<GameStatus>('subject-selection');
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(0);
  const [lastRoundCorrectAnswers, setLastRoundCorrectAnswers] = useState(0);
  const [lastRoundChallengeBonus, setLastRoundChallengeBonus] = useState(0);
  
  // Event States
  const [timeMultiplier, setTimeMultiplier] = useState(1);
  const [isWeatherEventActive, setIsWeatherEventActive] = useState(false);
  const [isRedScreenActive, setIsRedScreenActive] = useState(false);
  const [isSuperPartyActive, setIsSuperPartyActive] = useState(false);
  const [isLevelTwoEventActive, setIsLevelTwoEventActive] = useState(false); // New 5s Event
  const [isTreeEventActive, setIsTreeEventActive] = useState(false); // New 7s Event (Forest)
  
  // Global Notification State
  const [globalNotification, setGlobalNotification] = useState<string | null>(null);
  const lastActiveEventIds = useRef<string[]>([]);

  const [showAdmin, setShowAdmin] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // --- Anti-Cheat & Admin Powers ---
  const [codeHistory, setCodeHistory] = useState<Record<string, { count: number, lastTimestamp: number }>>({});
  const [isBlackScreen, setIsBlackScreen] = useState(false);
  const [blackScreenPhase, setBlackScreenPhase] = useState<'initial' | 'waiting' | 'pet_cat'>('initial');
  
  // Admin Fun Features
  const [isFlying, setIsFlying] = useState(false);
  const [adminImmunity, setAdminImmunity] = useState(false);
  const [isAdminMoney, setIsAdminMoney] = useState<boolean>(() => {
      return localStorage.getItem('isAdminMoney') === 'true';
  });
  
  // Ban state is now session-only (resets on refresh)
  const [hasBeenBanned, setHasBeenBanned] = useState<boolean>(false);

  // --- Save System State ---
  const [unlockedCharacters, setUnlockedCharacters] = useState<CharacterType[]>(() => {
    const saved = localStorage.getItem('unlockedCharacters');
    return saved ? JSON.parse(saved) : ['kitten', 'dog', 'parrot', 'kangaroo', 'panda', 'lion', 'monkey', 'penguin', 'fox', 'robot', 'alien', 'zombie', 'hamster', 'tiger'];
  });

  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(() => {
    const savedChar = localStorage.getItem('selectedCharacter');
    if (savedChar) return savedChar as CharacterType;
    return null;
  });

  const [points, setPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem('playerPoints');
    if (savedPoints) return parseFloat(savedPoints);
    const savedChar = localStorage.getItem('selectedCharacter');
    return savedChar ? 0 : 99;
  });

  // NEW: Emeralds State
  const [emeralds, setEmeralds] = useState<number>(() => {
    const saved = localStorage.getItem('playerEmeralds');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [purchasedUpgrades, setPurchasedUpgrades] = useState<number[]>(() => {
    const savedUpgrades = localStorage.getItem('purchasedUpgrades');
    return savedUpgrades ? JSON.parse(savedUpgrades) : [];
  });
  
  const [activeUpgrades, setActiveUpgrades] = useState<number[]>(() => {
    const savedActive = localStorage.getItem('activeUpgrades');
    if (savedActive) return JSON.parse(savedActive);
    const savedPurchased = localStorage.getItem('purchasedUpgrades');
    if (savedPurchased) return JSON.parse(savedPurchased);
    return [];
  });

  const [purchasedTattoos, setPurchasedTattoos] = useState<string[]>(() => {
    const savedTattoos = localStorage.getItem('purchasedTattoos');
    return savedTattoos ? JSON.parse(savedTattoos) : [];
  });

  const [activeTattoo, setActiveTattoo] = useState<string | null>(() => {
    return localStorage.getItem('activeTattoo');
  });

  const [purchasedFootballCards, setPurchasedFootballCards] = useState<number[]>(() => {
    const saved = localStorage.getItem('purchasedFootballCards');
    return saved ? JSON.parse(saved) : [];
  });

  const [miniPetCount, setMiniPetCount] = useState<number>(() => {
      const savedCount = localStorage.getItem('miniPetCount');
      if (savedCount) return parseInt(savedCount, 10);
      const oldState = localStorage.getItem('hasMiniPet') === 'true';
      return oldState ? 1 : 0;
  });

  // --- Effects ---
  
  useEffect(() => {
    if (!selectedCharacter) {
      setGameStatus('character-selection');
    } else if (gameStatus !== 'admin') {
      setGameStatus('subject-selection');
    }
  }, [selectedCharacter]);

  // Handle Unlocking Secret Chars if Gem (ID 200) is purchased
  useEffect(() => {
      if (purchasedUpgrades.includes(200)) {
          setUnlockedCharacters(prev => {
              if (!prev.includes('unicorn')) {
                  const newChars = [...prev, 'unicorn', 'dragon'];
                  return newChars;
              }
              return prev;
          });
      }
  }, [purchasedUpgrades]);

  // Global Event Loop
  useEffect(() => {
    const checkEvents = () => {
      const events = adminStorage.getEvents();
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay(); // 0-6

      let activeMult = 1;
      let redScreen = false;
      let superParty = false;
      let weatherActive = false;
      
      const currentActiveEventIds: string[] = [];

      // Level Two Event Override (The 5-second burst)
      if (isLevelTwoEventActive) {
          activeMult = 100; // Massive multiplier
          setTimeMultiplier(100);
          return; // Skip other checks
      }

      // Forest Tree Event Override (The 7-second burst)
      if (isTreeEventActive) {
          activeMult = 50; // High multiplier
          setTimeMultiplier(50);
          return; 
      }

      // Check Custom Events
      for (const evt of events) {
          if (!evt.active) continue;
          
          // Time constraints
          const dayMatch = !evt.daysOfWeek || evt.daysOfWeek.length === 0 || evt.daysOfWeek.includes(day);
          const timeMatch = (evt.startHour === undefined || hour >= evt.startHour) && (evt.endHour === undefined || hour <= evt.endHour);

          if (dayMatch && timeMatch) {
              currentActiveEventIds.push(evt.id);
              if (evt.multiplier > activeMult) activeMult = evt.multiplier;
              if (evt.isRedScreen) redScreen = true;
              if (evt.isSuperParty) superParty = true;
              
              // Notification Logic: If this event was NOT active last check, notify
              if (!lastActiveEventIds.current.includes(evt.id)) {
                  setGlobalNotification(`EVENT STARTED: ${evt.name.toUpperCase()}`);
                  setTimeout(() => setGlobalNotification(null), 5000);
              }
          }
      }

      // Hardcoded Weekend Event (Legacy support)
      if ((day === 0 || day === 6) && (hour === 10 || hour === 11)) {
           if (activeMult < 4) activeMult = 4;
           weatherActive = true;
      }
      if (hour === 9) {
           if (activeMult < 2) activeMult = 2;
      }

      // Update refs and state
      lastActiveEventIds.current = currentActiveEventIds;

      setTimeMultiplier(activeMult);
      setIsRedScreenActive(redScreen);
      setIsSuperPartyActive(superParty);
      setIsWeatherEventActive(weatherActive);
    };

    checkEvents();
    const intervalId = setInterval(checkEvents, 1000); // Check every 1s
    return () => clearInterval(intervalId);
  }, [isLevelTwoEventActive, isTreeEventActive]);

  // Save State Effects
  useEffect(() => { localStorage.setItem('playerPoints', points.toString()); }, [points]);
  useEffect(() => { localStorage.setItem('playerEmeralds', emeralds.toString()); }, [emeralds]);
  useEffect(() => { localStorage.setItem('unlockedCharacters', JSON.stringify(unlockedCharacters)); }, [unlockedCharacters]);
  useEffect(() => { localStorage.setItem('purchasedUpgrades', JSON.stringify(purchasedUpgrades)); }, [purchasedUpgrades]);
  useEffect(() => { localStorage.setItem('activeUpgrades', JSON.stringify(activeUpgrades)); }, [activeUpgrades]);
  useEffect(() => { if (selectedCharacter) localStorage.setItem('selectedCharacter', selectedCharacter); }, [selectedCharacter]);
  useEffect(() => { localStorage.setItem('purchasedTattoos', JSON.stringify(purchasedTattoos)); }, [purchasedTattoos]);
  useEffect(() => { if (activeTattoo) localStorage.setItem('activeTattoo', activeTattoo); else localStorage.removeItem('activeTattoo'); }, [activeTattoo]);
  useEffect(() => { localStorage.setItem('purchasedFootballCards', JSON.stringify(purchasedFootballCards)); }, [purchasedFootballCards]);
  useEffect(() => { localStorage.setItem('miniPetCount', miniPetCount.toString()); }, [miniPetCount]);
  useEffect(() => { localStorage.setItem('accountType', accountType); }, [accountType]);
  useEffect(() => { localStorage.setItem('isAdminMoney', String(isAdminMoney)); }, [isAdminMoney]);

  // Passive Income
  useEffect(() => {
    const passiveIncomeInterval = setInterval(() => {
        if (isAdminMoney) {
            // Do nothing to points visual, it's handled by display components
            return; 
        }
        if (activeUpgrades.includes(42)) {
            setPoints(Infinity);
            return;
        }
        let pointsPerSecond = 0;
        if (activeUpgrades.includes(16)) pointsPerSecond += (2 / 3600);
        if (activeUpgrades.includes(29)) pointsPerSecond += (52000000000000 / 60);
        if (activeUpgrades.includes(30)) pointsPerSecond += (5000000000000000 / 60);
        if (activeUpgrades.includes(32)) pointsPerSecond += (81000000000000000 / 60);
        if (activeUpgrades.includes(33)) pointsPerSecond += (95000000000000000 / 60);
        
        if(pointsPerSecond > 0) {
            setPoints(prev => prev + (pointsPerSecond * timeMultiplier));
        }
    }, 1000);
    return () => clearInterval(passiveIncomeInterval);
  }, [activeUpgrades, timeMultiplier, isAdminMoney]);

  // --- Handlers ---

  const handleSaveData = useCallback(() => {
    localStorage.setItem('username', username || '');
    localStorage.setItem('password', password || '');
    localStorage.setItem('accountType', accountType);
    // ... rest of saves handled by effects
    handleManualSave(); // Trigger UI feedback if needed
  }, [username, password, accountType]);

  const handleManualSave = useCallback(() => {
    setShowExitModal(true);
  }, []);

  const handleSaveAndExit = () => {
    handleSaveData();
    setShowExitModal(false);
    window.location.reload();
  };
  
  const handleExitWithoutSaving = () => {
      window.location.reload();
  };

  const handleLoginSubmit = () => {
      if (tempUsername.trim().length > 0) {
          setUsername(tempUsername.trim());
          const pass = tempPassword.trim() || 'none';
          setPassword(pass);
          localStorage.setItem('username', tempUsername.trim());
          localStorage.setItem('password', pass);
      }
  };

  const handleCharacterSelect = useCallback((character: CharacterType) => {
    setSelectedCharacter(character);
    setGameStatus('subject-selection');
  }, []);

  const handleUnlockCharacter = useCallback((password: string) => false, []);

  const handleUnlockAllCharacters = useCallback(() => {
      const allChars: CharacterType[] = ['kitten', 'dog', 'parrot', 'kangaroo', 'panda', 'lion', 'monkey', 'penguin', 'fox', 'robot', 'alien', 'zombie', 'hamster', 'tiger', 'unicorn', 'dragon', 'rabbit', 'bear', 'mouse', 'pig'];
      setUnlockedCharacters(allChars);
      alert("Test Command: All characters unlocked!");
  }, []);

  const handleAddPoints = useCallback((amount: number) => {
    if (activeUpgrades.includes(42) || isAdminMoney) return;
    let upgradeMultiplier = 1;
    if (activeUpgrades.includes(9)) upgradeMultiplier = 3;
    else if (activeUpgrades.includes(8)) upgradeMultiplier = 2;
    
    // Apply time multiplier (Events) to everything
    setPoints(prev => {
        const newPoints = prev + (amount * upgradeMultiplier * timeMultiplier);
        return newPoints < 0 ? 0 : newPoints; // Prevent negative total score
    });
  }, [activeUpgrades, timeMultiplier, isAdminMoney]);
  
  // EMERALD SYSTEM
  const handleConvertPointsToEmeralds = useCallback((emeraldsToBuy: number) => {
      const cost = emeraldsToBuy * 10000;
      if (points >= cost) {
          setPoints(prev => prev - cost);
          setEmeralds(prev => prev + emeraldsToBuy);
          return true;
      }
      return false;
  }, [points]);

  const handlePurchaseLevelTwo = useCallback(() => {
      const COST = 10000; // 10,000 Emeralds
      if (emeralds >= COST) {
          setEmeralds(prev => prev - COST);
          
          // Grant Bundle Items
          // 9001: Rare Pet (Emerald Dragon)
          // 9002: Island (Emerald Fortress)
          // 9003: Skin (Emerald Guardian)
          const newItems = [9001, 9002, 9003];
          
          setPurchasedUpgrades(prev => {
              const unique = new Set([...prev, ...newItems]);
              return Array.from(unique);
          });
          
          setActiveUpgrades(prev => {
              // Auto equip level 2 items
              // Remove conflicting island/pet/skin items might be complex, so we just push these to top
              return [...prev, ...newItems]; 
          });

          // Trigger 5-Second Event
          setIsLevelTwoEventActive(true);
          setGlobalNotification("LEVEL 2 ACTIVATED! 100x POINTS FOR 5 SECONDS!");
          setTimeout(() => {
              setIsLevelTwoEventActive(false);
              setGlobalNotification(null);
          }, 5000);

          return true;
      }
      return false;
  }, [emeralds]);

  const handlePurchaseUpgrade = useCallback((upgradeId: number, cost: number) => {
    if ((points >= cost || isAdminMoney) && !purchasedUpgrades.includes(upgradeId)) {
      if (!activeUpgrades.includes(42) && !isAdminMoney) setPoints(prev => prev - cost);
      setPurchasedUpgrades(prev => [...prev, upgradeId]);
      setActiveUpgrades(prev => {
        if (!prev.includes(upgradeId)) return [...prev, upgradeId];
        return prev;
      });

      // Special 31,000 T-Rex Island Event (Forest Treehouse - ID 9004)
      if (upgradeId === 9004) {
          setIsTreeEventActive(true);
          setGlobalNotification("FOREST AWAKENING! 50x POINTS FOR 7 SECONDS!");
          setTimeout(() => {
              setIsTreeEventActive(false);
              setGlobalNotification(null);
          }, 7000);
      }

      return true;
    }
    return false;
  }, [points, purchasedUpgrades, activeUpgrades, isAdminMoney]);

  const handleGrantItem = useCallback((id: number) => {
    if (!purchasedUpgrades.includes(id)) {
        setPurchasedUpgrades(prev => [...prev, id]);
        setActiveUpgrades(prev => [...prev, id]); // Auto-equip when granted via admin
    }
  }, [purchasedUpgrades]);

  const handleRevokeItem = useCallback((id: number) => {
    setPurchasedUpgrades(prev => prev.filter(i => i !== id));
    setActiveUpgrades(prev => prev.filter(i => i !== id));
  }, []);

  const handleToggleUpgrade = useCallback((upgradeId: number) => {
    setActiveUpgrades(prev => {
        let newActive = [...prev];
        const isActivating = !newActive.includes(upgradeId);
        if (isActivating) {
            const HAT_UPGRADES = [3, 23, 24, 25, 50, 51];
            const TRANSPORT_ITEMS = [7, 28, 6, 52, 53, 122, 123, 130];
            const DESK_ITEMS: number[] = []; // Cellphone (55) is in StoreScreen DESK_ITEMS but treated as cosmetic group
            // If item 55 (phone) is equipped, maybe unequip other hand items? Currently not strictly enforced but good practice.
            
            if (HAT_UPGRADES.includes(upgradeId)) newActive = newActive.filter(id => !HAT_UPGRADES.includes(id));
            else if (DESK_ITEMS.includes(upgradeId)) newActive = newActive.filter(id => !DESK_ITEMS.includes(id));
            else if (TRANSPORT_ITEMS.includes(upgradeId)) newActive = newActive.filter(id => !TRANSPORT_ITEMS.includes(id));
            
            // Level 2 & Island Toggles (Remove other islands to avoid stacking)
            if (upgradeId === 9002 || upgradeId === 9004 || upgradeId === 9005) {
                 const ISLANDS = [21, 13, 22, 60, 61, 62, 124, 99, 9002, 9004, 9005];
                 newActive = newActive.filter(id => !ISLANDS.includes(id));
            }

            newActive.push(upgradeId);
        } else {
            newActive = newActive.filter(id => id !== upgradeId);
        }
        return newActive;
    });
  }, []);
  
  const handlePurchaseTattoo = useCallback((tattooId: string, cost: number) => {
    if ((points >= cost || isAdminMoney) && !purchasedTattoos.includes(tattooId)) {
      if (!activeUpgrades.includes(42) && !isAdminMoney) setPoints(prev => prev - cost);
      setPurchasedTattoos(prev => [...prev, tattooId]);
      setActiveTattoo(tattooId);
      return true;
    }
    return false;
  }, [points, purchasedTattoos, activeUpgrades, isAdminMoney]);
  
  const handleSelectTattoo = useCallback((tattooId: string) => {
    setActiveTattoo(prev => (prev === tattooId ? null : tattooId));
  }, []);

  const handlePurchaseFootballCard = useCallback((cardId: number, cost: number) => {
    const cardIndex = FOOTBALL_CARDS.findIndex(c => c.id === cardId);
    if (cardIndex === -1) return false;
    const isAlreadyPurchased = purchasedFootballCards.includes(cardId);
    if (isAlreadyPurchased || (points < cost && !isAdminMoney)) return false;
    const isFirstCard = cardIndex === 0;
    const previousCardIsPurchased = isFirstCard ? true : purchasedFootballCards.includes(FOOTBALL_CARDS[cardIndex - 1].id);

    if (previousCardIsPurchased) {
      if (!activeUpgrades.includes(42) && !isAdminMoney) setPoints(prev => prev - cost);
      setPurchasedFootballCards(prev => [...prev, cardId]);
      return true;
    }
    return false;
  }, [points, purchasedFootballCards, activeUpgrades, isAdminMoney]);

  const handleSubjectSelect = useCallback((subject: Subject) => {
    setCurrentSubject(subject);
    setGameStatus('topic-selection');
  }, []);

  const handleStartGame = useCallback((topics: string[], difficulty: Difficulty, questionCount: number) => {
    setSelectedTopics(topics);
    setSelectedDifficulty(difficulty);
    setSelectedQuestionCount(questionCount);
    setGameStatus('playing');
  }, []);
  
  const handleBackToSubjectSelection = useCallback(() => {
    setCurrentSubject(null);
    setSelectedTopics([]);
    setSelectedDifficulty(null);
    setSelectedQuestionCount(0);
    setGameStatus('subject-selection');
  }, []);

  const handleLevelComplete = useCallback((correctCount: number, subject: Subject, difficulty: Difficulty) => {
    setLastRoundCorrectAnswers(correctCount);
    let bonus = 0;
    if (subject === 'mathematics' && difficulty === 'Desafiador') {
      bonus = 5000000000;
      if (!activeUpgrades.includes(42) && !isAdminMoney) {
          setPoints(prev => prev + (bonus * timeMultiplier));
      }
    }
    setLastRoundChallengeBonus(bonus);
    setGameStatus('level-complete');
  }, [activeUpgrades, timeMultiplier, isAdminMoney]);

  const handleBackToTopicSelection = useCallback(() => {
    setSelectedTopics([]);
    setSelectedDifficulty(null);
    setSelectedQuestionCount(0);
    setGameStatus('topic-selection');
  }, []);
  
  const handleNavigateToStore = useCallback(() => {
    setGameStatus('store');
  }, []);

  const handleResetGame = useCallback(() => {
      localStorage.clear();
      window.location.reload();
  }, []);

  const handleSecretCode = useCallback((code: string) => {
    const cleanCode = code.trim();
    
    // Admin Panel Access (UI)
    if (cleanCode === 'ADMIN_MODE_ACCESS_123') {
        setShowAdmin(true);
        return true;
    }

    // THE MASTER PASSWORDS
    if (cleanCode === '56405499662904' || cleanCode === '5640098') {
        setAccountType('Admin');
        localStorage.setItem('accountType', 'Admin');
        setShowAdmin(true);
        alert('ACCESS GRANTED: You are now an Administrator.');
        return true;
    }
    
    // ONLY ONE SECRET CODE: JH117
    if (cleanCode === 'JH117') {
        if (!purchasedUpgrades.includes(29)) {
            setPurchasedUpgrades(prev => [...prev, 29]);
            setActiveUpgrades(prev => {
                if(!prev.includes(29)) return [...prev, 29];
                return prev;
            });
        }
        if (!purchasedUpgrades.includes(30)) {
             setPurchasedUpgrades(prev => [...prev, 30]);
        }

        if(!isAdminMoney) setPoints(prev => prev + 5000000000000); 
        alert('Code JH117 accepted! You got Store Admin and lots of points.');
        return true;
    }

    // Rank #1 Code
    if (cleanCode === '@33342') {
        // MestreYoda_22 has 95,000,000,000,000,000
        // We set to 96,000,000,000,000,000 to be #1
        const rank1Score = 96000000000000000;
        if(!isAdminMoney) setPoints(current => current > rank1Score ? current : rank1Score);
        alert('Code @33342 accepted! You are now Top 1.');
        return true;
    }
    
    alert('Incorrect code.');
    return false;
  }, [purchasedUpgrades, isAdminMoney]);

  const handleStartSoccer = useCallback(() => setGameStatus('soccer-challenge'), []);
  const handleSoccerChallengeSuccess = useCallback(() => setGameStatus('soccer-game'), []);
  const handleSoccerChallengeFail = useCallback(() => {
    alert('Wrong!');
    setGameStatus('subject-selection');
  }, []);
  
  const handleSoccerGameOver = useCallback((playerScore: number, cpuScore: number) => {
    let pointsEarned = 0;
    if (playerScore > cpuScore) pointsEarned = 500;
    else if (playerScore < cpuScore) pointsEarned = 50;
    else pointsEarned = 150;
    if (!activeUpgrades.includes(42) && !isAdminMoney) setPoints(p => p + (pointsEarned * timeMultiplier));
    alert('Game Over!'); 
    setGameStatus('subject-selection');
  }, [activeUpgrades, timeMultiplier, isAdminMoney]);

  const handleSetBan = (banned: boolean) => {
      if (adminImmunity && banned) {
          alert("🛡️ ADMIN PROTECTION: Ban blocked!");
          return;
      }
      setHasBeenBanned(banned);
      // NOTE: We do NOT force reload here anymore immediately.
      // We wait for the countdown in CharacterSelectionScreen.
  };

  const handleLoginAs = (user: string, pass?: string) => {
      setUsername(user);
      if(pass) setPassword(pass);
      localStorage.setItem('username', user);
      if(pass) localStorage.setItem('password', pass);
      alert(`Logged in as ${user}. Session will change now.`);
  };

  // Check if Desert Filter should be active (ID 9005)
  const isDesertActive = activeUpgrades.includes(9005);

  // Rendering
  const renderContent = () => {
    if (isBlackScreen) { /* ... Black screen logic (kept simple here) ... */ return <div className="bg-black fixed inset-0 z-50 text-white flex items-center justify-center">SYSTEM FAILURE</div>; }
    
    // Auto-login handles default user/admin state, so login screen is effectively skipped
    // unless someone manually clears state to null.
    if (!username || !password) {
        return (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fade-in max-w-lg mx-auto">
                 <h1 className="text-4xl font-bold text-teal-600 mb-6">Champion's Games</h1>
                 <p className="text-lg text-gray-600 mb-6">Enter your name to play.</p>
                 
                 <input 
                    type="text" 
                    placeholder="Player Name"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="w-full p-4 text-xl border-2 border-teal-300 rounded-xl mb-4 text-center"
                 />
                 <input 
                    type="password" 
                    placeholder="Password (Optional)"
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                    className="w-full p-4 text-xl border-2 border-teal-300 rounded-xl mb-6 text-center"
                 />

                 <button 
                    onClick={handleLoginSubmit}
                    className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl text-xl hover:bg-teal-700 transition-transform transform active:scale-95"
                 >
                     Start Game
                 </button>
            </div>
        );
    }

    if (!selectedCharacter) {
       return <CharacterSelectionScreen onSelectCharacter={handleCharacterSelect} unlockedCharacters={unlockedCharacters} onUnlockCharacter={handleUnlockCharacter} hasBeenBanned={hasBeenBanned} onEnterSecretCode={handleSecretCode} onBanComplete={handleResetGame} />;
    }
    
    switch (gameStatus) {
      case 'character-selection': return <CharacterSelectionScreen onSelectCharacter={handleCharacterSelect} unlockedCharacters={unlockedCharacters} onUnlockCharacter={handleUnlockCharacter} hasBeenBanned={hasBeenBanned} onEnterSecretCode={handleSecretCode} onBanComplete={handleResetGame} />;
      case 'playing': return currentSubject && <GameScreen topics={selectedTopics} difficulty={selectedDifficulty!} subject={currentSubject} questionCount={selectedQuestionCount} onLevelComplete={handleLevelComplete} onBackToMenu={handleBackToTopicSelection} onAddPoints={handleAddPoints} />;
      case 'level-complete': return <LevelCompleteScreen onContinue={handleBackToTopicSelection} difficulty={selectedDifficulty!} correctAnswers={lastRoundCorrectAnswers} questionCount={selectedQuestionCount} activeUpgrades={activeUpgrades} challengeBonus={lastRoundChallengeBonus} />;
      case 'topic-selection': return <TopicSelectionScreen characterType={selectedCharacter} purchasedUpgrades={purchasedUpgrades} activeUpgrades={activeUpgrades} activeTattoo={activeTattoo} miniPetCount={miniPetCount} onStartGame={handleStartGame} subject={currentSubject!} onBack={handleBackToSubjectSelection} points={points} onNavigateToStore={handleNavigateToStore} isAdminMoney={isAdminMoney} />;
      case 'store': return <StoreScreen points={points} emeralds={emeralds} onConvertEmeralds={handleConvertPointsToEmeralds} onPurchaseLevelTwo={handlePurchaseLevelTwo} characterType={selectedCharacter} purchasedUpgrades={purchasedUpgrades} activeUpgrades={activeUpgrades} purchasedTattoos={purchasedTattoos} activeTattoo={activeTattoo} purchasedFootballCards={purchasedFootballCards} miniPetCount={miniPetCount} onPurchaseUpgrade={handlePurchaseUpgrade} onToggleUpgrade={handleToggleUpgrade} onPurchaseTattoo={handlePurchaseTattoo} onSelectTattoo={handleSelectTattoo} onPurchaseFootballCard={handlePurchaseFootballCard} onBack={handleBackToTopicSelection} isAdminMoney={isAdminMoney} />;
      case 'soccer-challenge': return <SoccerChallengeScreen onCorrect={handleSoccerChallengeSuccess} onIncorrect={handleSoccerChallengeFail} />;
      case 'soccer-game': return <SoccerGameScreen onGameOver={handleSoccerGameOver} purchasedFootballCards={purchasedFootballCards} username={username} />;
      case 'subject-selection': default:
        return <SubjectSelectionScreen 
                characterType={selectedCharacter} 
                purchasedUpgrades={purchasedUpgrades} 
                activeUpgrades={activeUpgrades} 
                activeTattoo={activeTattoo} 
                miniPetCount={miniPetCount} 
                onSelectSubject={handleSubjectSelect} 
                onStartSoccer={handleStartSoccer} 
                onEnterSecretCode={handleSecretCode} 
                onManualSave={handleManualSave}
                points={points}
                username={username}
                isFlying={isFlying} // Pass fly state
                onUpdatePoints={setPoints} // Pass setPoints
                isAdminMoney={isAdminMoney}
               />;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-200 to-green-200 text-gray-800 font-sans p-4 flex items-center justify-center relative overflow-hidden transition-all duration-1000 
      ${isRedScreenActive ? 'grayscale-0' : isLevelTwoEventActive ? 'bg-green-900 mix-blend-color-burn' : ''} 
      ${isDesertActive ? 'sepia brightness-110 contrast-125 saturate-50' : ''}
    `}>
      
      {/* Global Event Notification */}
      {globalNotification && (
          <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-8 pointer-events-none">
              <div className="bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 text-white font-black text-2xl md:text-4xl px-8 py-4 rounded-full shadow-[0_0_30px_rgba(255,200,0,0.8)] border-4 border-yellow-200 animate-bounce text-center uppercase tracking-widest">
                  {globalNotification}
              </div>
          </div>
      )}

      {/* Visual Effects Overlays */}
      {isRedScreenActive && (
          <div className="fixed inset-0 bg-red-600 mix-blend-multiply opacity-60 z-[60] pointer-events-none animate-pulse"></div>
      )}
      
      {/* Level Two Event Overlay */}
      {isLevelTwoEventActive && (
          <div className="fixed inset-0 z-[60] pointer-events-none">
              <div className="absolute inset-0 bg-green-500 opacity-30 animate-pulse"></div>
              {Array.from({length: 30}).map((_,i) => (
                   <div key={i} className="absolute text-4xl animate-bounce" style={{
                       top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, animationDuration: `${0.3 + Math.random()}s`
                   }}>❇️</div>
               ))}
          </div>
      )}

      {/* 31k Forest Tree Event Overlay (7 seconds) */}
      {isTreeEventActive && (
          <div className="fixed inset-0 z-[60] pointer-events-none">
              {Array.from({length: 50}).map((_,i) => (
                   <div key={i} className="absolute text-4xl animate-bounce text-green-700 opacity-70" style={{
                       top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, animationDuration: `${1 + Math.random()}s`
                   }}>🍃</div>
               ))}
          </div>
      )}

      {isSuperPartyActive && (
          <div className="fixed inset-0 z-[55] pointer-events-none mix-blend-overlay">
               <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500 opacity-50 animate-pulse"></div>
               {Array.from({length: 20}).map((_,i) => (
                   <div key={i} className="absolute w-4 h-4 rounded-full bg-white animate-bounce" style={{
                       top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, animationDuration: `${0.5 + Math.random()}s`
                   }}></div>
               ))}
          </div>
      )}

      {/* Account Type Badge (Hidden on SubjectSelection because it's integrated into the layout there now) */}
      {username && !showAdmin && !isBlackScreen && !hasBeenBanned && gameStatus !== 'subject-selection' && (
          <div className="fixed top-4 right-16 z-40 flex flex-col items-end gap-1">
              <div className="bg-white/50 backdrop-blur px-4 py-2 rounded-full border border-white text-sm font-bold text-gray-700 shadow-sm">
                  👤 {username}
              </div>
              <div className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider text-white shadow-sm
                  ${accountType === 'Admin' || accountType === 'Deus' ? 'bg-red-500' : accountType === 'VIP' ? 'bg-yellow-500' : 'bg-blue-400'}
              `}>
                  {accountType}
              </div>
          </div>
      )}

      {/* Admin Panel */}
      {showAdmin && (
          <AdminPanel 
            onClose={() => setShowAdmin(false)}
            currentPoints={points}
            onUpdatePoints={setPoints}
            onResetGame={() => { handleResetGame(); setShowAdmin(false); }}
            isBanned={hasBeenBanned}
            onSetBan={handleSetBan}
            currentAccountType={accountType}
            onUpdateAccountType={setAccountType}
            onForceCharacterChange={setSelectedCharacter}
            currentUsername={username || 'Player'}
            onGrantItem={handleGrantItem}
            onRevokeItem={handleRevokeItem}
            onUpdateMiniPets={setMiniPetCount}
            currentMiniPets={miniPetCount}
            onLoginAs={handleLoginAs}
            isFlying={isFlying}
            onSetFlying={setIsFlying}
            adminImmunity={adminImmunity}
            onSetAdminImmunity={setAdminImmunity}
            onUnlockAllCharacters={handleUnlockAllCharacters}
            activeUpgrades={activeUpgrades}
            isAdminMoney={isAdminMoney}
            onSetAdminMoney={setIsAdminMoney}
          />
      )}

      {/* Exit Modal */}
      {showExitModal && (
          <ExitModal onSaveAndExit={handleSaveAndExit} onExitWithoutSaving={handleExitWithoutSaving} onCancel={() => setShowExitModal(false)} />
      )}

      {isWeatherEventActive && <WeatherOverlay />}
      <div className="w-full max-w-4xl mx-auto relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
