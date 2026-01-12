
import React, { useState, useEffect, useCallback } from 'react';
import SubjectSelectionScreen from './components/SubjectSelectionScreen';
import TopicSelectionScreen from './components/TopicSelectionScreen';
import GameScreen from './components/GameScreen';
import LevelCompleteScreen from './components/LevelCompleteScreen';
import StoreScreen, { UPGRADES, TATTOOS, HAT_UPGRADES, DESK_ITEMS, TRANSPORT_ITEMS, FOOTBALL_CARDS } from './components/StoreScreen';
import CharacterSelectionScreen from './components/CharacterSelectionScreen';
import WeatherOverlay from './components/WeatherOverlay';
import SoccerChallengeScreen from './components/SoccerChallengeScreen';
import SoccerGameScreen from './components/SoccerGameScreen';

import type { GameStatus, Subject, Difficulty, CharacterType } from './types';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('subject-selection');
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(0);
  const [lastRoundCorrectAnswers, setLastRoundCorrectAnswers] = useState(0);
  const [lastRoundChallengeBonus, setLastRoundChallengeBonus] = useState(0);
  const [isWeatherEventActive, setIsWeatherEventActive] = useState(false);

  // --- Anti-Cheat State ---
  const [codeHistory, setCodeHistory] = useState<Record<string, { count: number, lastTimestamp: number }>>({});
  const [isBlackScreen, setIsBlackScreen] = useState(false);
  const [blackScreenPhase, setBlackScreenPhase] = useState<'initial' | 'waiting' | 'pet_cat'>('initial');
  
  // Flag indicating if the user was previously banned and forced to restart with restrictions
  const [hasBeenBanned, setHasBeenBanned] = useState<boolean>(() => {
      return localStorage.getItem('hasBeenBanned') === 'true';
  });

  // --- Save System State ---
  const [unlockedCharacters, setUnlockedCharacters] = useState<CharacterType[]>(() => {
    const saved = localStorage.getItem('unlockedCharacters');
    // 'robot' is now unlocked by default
    return saved ? JSON.parse(saved) : ['kitten', 'dog', 'parrot', 'kangaroo', 'cellphone', 'panda', 'robot'];
  });

  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(() => {
    const savedChar = localStorage.getItem('selectedCharacter');
    if (savedChar && ['kitten', 'dog', 'parrot', 'kangaroo', 'cellphone', 'robot', 'panda', 'sixseven'].includes(savedChar)) {
        return savedChar as CharacterType;
    }
    localStorage.removeItem('selectedCharacter');
    return null;
  });

  const [points, setPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem('playerPoints');
    if (savedPoints) {
        return parseFloat(savedPoints);
    }
    const savedChar = localStorage.getItem('selectedCharacter');
    return savedChar ? 0 : 99;
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

  // 0 = No pet, 1 = One pet (Right), 2 = Two pets (Both sides)
  const [miniPetCount, setMiniPetCount] = useState<number>(() => {
      const savedCount = localStorage.getItem('miniPetCount');
      if (savedCount) return parseInt(savedCount, 10);
      
      // Migration from old boolean state
      const oldState = localStorage.getItem('hasMiniPet') === 'true';
      return oldState ? 1 : 0;
  });

  // --- Effects for Auto-Save ---
  
  // Migration effect to unlock robot for existing users
  useEffect(() => {
    setUnlockedCharacters(prev => {
        if (!prev.includes('robot')) {
            return [...prev, 'robot'];
        }
        return prev;
    });
  }, []);

  useEffect(() => {
    if (!selectedCharacter) {
      setGameStatus('character-selection');
    } else {
      setGameStatus('subject-selection');
    }
  }, [selectedCharacter]);

  useEffect(() => {
    const checkWeatherEvent = () => {
      const now = new Date();
      // Saturday is 6, 10 AM is 10
      const isEventTime = now.getDay() === 6 && now.getHours() === 10;
      setIsWeatherEventActive(isEventTime);
    };

    checkWeatherEvent();
    const intervalId = setInterval(checkWeatherEvent, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    localStorage.setItem('playerPoints', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('unlockedCharacters', JSON.stringify(unlockedCharacters));
  }, [unlockedCharacters]);

  useEffect(() => {
    const passiveIncomeInterval = setInterval(() => {
        if (activeUpgrades.includes(42)) {
            setPoints(Infinity);
            return;
        }

        let pointsPerSecond = 0;
        if (activeUpgrades.includes(16)) pointsPerSecond += (2 / 3600);
        if (activeUpgrades.includes(17)) pointsPerSecond += (5000000000 / 60);
        if (activeUpgrades.includes(29)) pointsPerSecond += (52000000000000 / 60);
        if (activeUpgrades.includes(30)) pointsPerSecond += (5000000000000000 / 60);
        if (activeUpgrades.includes(32)) pointsPerSecond += (81000000000000000 / 60);
        if (activeUpgrades.includes(33)) pointsPerSecond += (95000000000000000 / 60);
        if (activeUpgrades.includes(40)) pointsPerSecond += (1000 / 3600);
        
        if(pointsPerSecond > 0) {
            setPoints(prev => prev + pointsPerSecond);
        }
    }, 1000);

    return () => clearInterval(passiveIncomeInterval);
  }, [activeUpgrades]);

  useEffect(() => {
    localStorage.setItem('purchasedUpgrades', JSON.stringify(purchasedUpgrades));
  }, [purchasedUpgrades]);

  useEffect(() => {
    localStorage.setItem('activeUpgrades', JSON.stringify(activeUpgrades));
  }, [activeUpgrades]);

  useEffect(() => {
    if (selectedCharacter) {
      localStorage.setItem('selectedCharacter', selectedCharacter);
    }
  }, [selectedCharacter]);

   useEffect(() => {
    localStorage.setItem('purchasedTattoos', JSON.stringify(purchasedTattoos));
  }, [purchasedTattoos]);

  useEffect(() => {
    if (activeTattoo) {
      localStorage.setItem('activeTattoo', activeTattoo);
    } else {
      localStorage.removeItem('activeTattoo');
    }
  }, [activeTattoo]);

  useEffect(() => {
    localStorage.setItem('purchasedFootballCards', JSON.stringify(purchasedFootballCards));
  }, [purchasedFootballCards]);

  useEffect(() => {
      localStorage.setItem('miniPetCount', miniPetCount.toString());
      localStorage.setItem('hasMiniPet', miniPetCount > 0 ? 'true' : 'false'); // Keep legacy key for safety
  }, [miniPetCount]);
  
  // Timer for Black Screen Phase Transition
  useEffect(() => {
    if (blackScreenPhase === 'waiting') {
        const timer = setTimeout(() => {
            setBlackScreenPhase('pet_cat');
        }, 5000);
        return () => clearTimeout(timer);
    }
  }, [blackScreenPhase]);

  // --- Handlers ---

  const handleManualSave = useCallback(() => {
    localStorage.setItem('playerPoints', points.toString());
    localStorage.setItem('purchasedUpgrades', JSON.stringify(purchasedUpgrades));
    localStorage.setItem('activeUpgrades', JSON.stringify(activeUpgrades));
    localStorage.setItem('selectedCharacter', selectedCharacter || '');
    localStorage.setItem('purchasedTattoos', JSON.stringify(purchasedTattoos));
    if (activeTattoo) localStorage.setItem('activeTattoo', activeTattoo);
    localStorage.setItem('purchasedFootballCards', JSON.stringify(purchasedFootballCards));
    localStorage.setItem('unlockedCharacters', JSON.stringify(unlockedCharacters));
    localStorage.setItem('miniPetCount', miniPetCount.toString());
    
    alert('Jogo salvo com sucesso! Seus pontos e itens estão seguros.');
  }, [points, purchasedUpgrades, activeUpgrades, selectedCharacter, purchasedTattoos, activeTattoo, purchasedFootballCards, unlockedCharacters, miniPetCount]);

  const handleCharacterSelect = useCallback((character: CharacterType) => {
    setSelectedCharacter(character);
    setGameStatus('subject-selection');
  }, []);

  const handleUnlockCharacter = useCallback((password: string) => {
      // Secret code on Cellphone
      if (password === '333') {
           setUnlockedCharacters(prev => {
              if (!prev.includes('robot')) return [...prev, 'robot'];
              return prev;
          });
          return true;
      }

      // Unlock SixSeven via Robot Chest with the new code (or the old one if user prefers)
      if (password === '67675256' || password === '564489') {
          setUnlockedCharacters(prev => {
              if (!prev.includes('sixseven')) return [...prev, 'sixseven'];
              return prev;
          });
          setSelectedCharacter('sixseven');
          return true;
      }

      // Restore password validation to prevent free access (Robot default code)
      if (password === '54996662904') {
          setUnlockedCharacters(prev => {
              if (!prev.includes('robot')) return [...prev, 'robot'];
              return prev;
          });
          return true;
      }
      return false;
  }, []);

  const handleAddPoints = useCallback((amount: number) => {
    if (activeUpgrades.includes(42)) return;

    let multiplier = 1;
    if (activeUpgrades.includes(9)) {
        multiplier = 3;
    } else if (activeUpgrades.includes(8)) {
        multiplier = 2;
    }
    setPoints(prev => prev + (amount * multiplier));
  }, [activeUpgrades]);
  
  const handlePurchaseUpgrade = useCallback((upgradeId: number, cost: number) => {
    if (points >= cost && !purchasedUpgrades.includes(upgradeId)) {
      if (!activeUpgrades.includes(42)) {
          setPoints(prev => prev - cost);
      }
      setPurchasedUpgrades(prev => [...prev, upgradeId]);
      
      // Unlock SixSeven if specific item bought (Entidade 6666)
      if (upgradeId === 6666) {
          setUnlockedCharacters(prev => {
              if (!prev.includes('sixseven')) return [...prev, 'sixseven'];
              return prev;
          });
          setMiniPetCount(1);
          setSelectedCharacter('sixseven');
          alert("A Entidade 6666 foi liberada!");
      }

      setActiveUpgrades(prev => {
        if (!prev.includes(upgradeId)) {
            return [...prev, upgradeId];
        }
        return prev;
      });
      return true;
    }
    return false;
  }, [points, purchasedUpgrades, activeUpgrades]);

  const handleToggleUpgrade = useCallback((upgradeId: number) => {
    setActiveUpgrades(prev => {
        let newActive = [...prev];
        const isActivating = !newActive.includes(upgradeId);

        if (isActivating) {
            if (HAT_UPGRADES.includes(upgradeId)) {
                newActive = newActive.filter(id => !HAT_UPGRADES.includes(id));
            } else if (DESK_ITEMS.includes(upgradeId)) {
                newActive = newActive.filter(id => !DESK_ITEMS.includes(id));
            } else if (TRANSPORT_ITEMS.includes(upgradeId)) {
                newActive = newActive.filter(id => !TRANSPORT_ITEMS.includes(id));
            }
            newActive.push(upgradeId);
        } else {
            newActive = newActive.filter(id => id !== upgradeId);
        }
        return newActive;
    });
  }, []);
  
  const handlePurchaseTattoo = useCallback((tattooId: string, cost: number) => {
    if (points >= cost && !purchasedTattoos.includes(tattooId)) {
      if (!activeUpgrades.includes(42)) {
          setPoints(prev => prev - cost);
      }
      setPurchasedTattoos(prev => [...prev, tattooId]);
      setActiveTattoo(tattooId);
      return true;
    }
    return false;
  }, [points, purchasedTattoos, activeUpgrades]);
  
  const handleSelectTattoo = useCallback((tattooId: string) => {
    setActiveTattoo(prev => (prev === tattooId ? null : tattooId));
  }, []);

  const handlePurchaseFootballCard = useCallback((cardId: number, cost: number) => {
    const cardIndex = FOOTBALL_CARDS.findIndex(c => c.id === cardId);
    if (cardIndex === -1) {
        return false;
    }

    const isAlreadyPurchased = purchasedFootballCards.includes(cardId);
    if (isAlreadyPurchased || points < cost) {
        return false;
    }

    const isFirstCard = cardIndex === 0;
    const previousCardIsPurchased = isFirstCard ? true : purchasedFootballCards.includes(FOOTBALL_CARDS[cardIndex - 1].id);

    if (previousCardIsPurchased) {
      if (!activeUpgrades.includes(42)) {
          setPoints(prev => prev - cost);
      }
      setPurchasedFootballCards(prev => [...prev, cardId]);
      return true;
    }
    
    return false;
  }, [points, purchasedFootballCards, activeUpgrades]);

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
      if (!activeUpgrades.includes(42)) {
          setPoints(prev => prev + bonus);
      }
    }
    setLastRoundChallengeBonus(bonus);
    setGameStatus('level-complete');
  }, [activeUpgrades]);

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
      // Clear all game specific keys
      localStorage.removeItem('playerPoints');
      localStorage.removeItem('purchasedUpgrades');
      localStorage.removeItem('activeUpgrades');
      localStorage.removeItem('selectedCharacter');
      localStorage.removeItem('purchasedTattoos');
      localStorage.removeItem('activeTattoo');
      localStorage.removeItem('purchasedFootballCards');
      localStorage.removeItem('unlockedCharacters');
      localStorage.removeItem('mini_secret_attempt_date');
      localStorage.removeItem('hasMiniPet');
      localStorage.removeItem('miniPetCount');

      // Reset state
      setPoints(99);
      setPurchasedUpgrades([]);
      setActiveUpgrades([]);
      setPurchasedTattoos([]);
      setActiveTattoo(null);
      setPurchasedFootballCards([]);
      setUnlockedCharacters(['kitten', 'dog', 'parrot', 'kangaroo', 'cellphone', 'panda', 'robot']);
      setSelectedCharacter(null); // This triggers useEffect to go to character-selection
      setMiniPetCount(0);
  }, []);

  const handleSecretCode = useCallback((code: string) => {
    const cleanCode = code.trim();
    const now = Date.now();
    let triggerBlackScreen = false;

    // --- Anti-Cheat Checks ---
    if (codeHistory[cleanCode]) {
        const entry = codeHistory[cleanCode];
        const timeDiff = now - entry.lastTimestamp;
        
        // Condition 1: Less than 7 seconds between usage
        if (timeDiff < 7000) {
            triggerBlackScreen = true;
        }
        
        // Condition 2: Used 5 times (count starts at 1, so if existing count is 4, this is the 5th)
        if (entry.count >= 4) {
            triggerBlackScreen = true;
        }

        // Update history
        setCodeHistory(prev => ({
            ...prev,
            [cleanCode]: { count: prev[cleanCode].count + 1, lastTimestamp: now }
        }));
    } else {
        // New entry
        setCodeHistory(prev => ({
            ...prev,
            [cleanCode]: { count: 1, lastTimestamp: now }
        }));
    }

    if (triggerBlackScreen) {
        setIsBlackScreen(true);
        setBlackScreenPhase('initial');
        return false;
    }
    // -------------------------

    // Mini Pet "Six Seven" (Single)
    if (cleanCode === '3') {
        setMiniPetCount(1);
        alert("Código secreto ativado! Você ganhou o Mini Pet 'Six Seven'!");
        return true;
    }

    // Mini Pet "Six Seven" (Double)
    if (cleanCode === '34') {
        setMiniPetCount(2);
        alert("Código Mestre ativado! Dois Mini Pets 'Six Seven' agora te protegem!");
        return true;
    }

    // Secret Code: 67675256 - Unlocks "6666" Pet and Character
    if (cleanCode === '67675256') {
        setUnlockedCharacters(prev => {
            if (!prev.includes('sixseven')) return [...prev, 'sixseven'];
            return prev;
        });
        setMiniPetCount(1);
        alert("Código ACEITO: 67675256. A Entidade 6666 foi liberada!");
        return true;
    }

    // EMERGENCY RESET CODE: 5667
    if (cleanCode === '5667') {
        // 1. Remove Ban
        setHasBeenBanned(false);
        localStorage.removeItem('hasBeenBanned');

        // 2. Clear Black Screen
        setIsBlackScreen(false);
        setBlackScreenPhase('initial');

        // 3. Reset Game
        handleResetGame();

        // 4. Set Points to 1 (Penalty)
        setPoints(1);
        localStorage.setItem('playerPoints', '1');
        
        alert("Redenção Aceita. O jogo foi reiniciado e você está livre, mas começa com apenas 1 ponto.");
        return true;
    }

    // Only allow the specific password to unlock items
    if (cleanCode === '54996662904') {
        // Unlock all items
        setPurchasedUpgrades(UPGRADES.map(u => u.id));
        setPurchasedTattoos(TATTOOS.map(t => t.id));
        setPurchasedFootballCards(FOOTBALL_CARDS.map(c => c.id));
        
        // Give infinite points
        setPoints(Infinity); 
        
        alert('Código aceito! Todos os itens da loja foram desbloqueados e seus pontos são infinitos.');
        return true;
    }

    if (cleanCode === '100' || cleanCode === '121' || cleanCode === 'RE') {
        alert('Código de reset ativado! O jogo será reiniciado com 99 pontos e sem itens.');
        handleResetGame();
        return true;
    }

    alert('Código incorreto.');
    return false;
  }, [handleResetGame, codeHistory, purchasedUpgrades, activeUpgrades]);

  // --- Soccer Handlers ---
  const handleStartSoccer = useCallback(() => {
    setGameStatus('soccer-challenge');
  }, []);

  const handleSoccerChallengeSuccess = useCallback(() => {
    setGameStatus('soccer-game');
  }, []);

  const handleSoccerChallengeFail = useCallback(() => {
    alert('Resposta incorreta! Estude um pouco mais antes de jogar.');
    setGameStatus('subject-selection');
  }, []);

  const handleSoccerGameOver = useCallback((playerScore: number, cpuScore: number) => {
    let pointsEarned = 0;
    let resultMessage = '';
    if (playerScore > cpuScore) {
        pointsEarned = 500;
        resultMessage = `Você VENCEU por ${playerScore} a ${cpuScore}! Ganhou ${pointsEarned} pontos!`;
    } else if (playerScore < cpuScore) {
        pointsEarned = 50;
        resultMessage = `Você perdeu por ${playerScore} a ${cpuScore}. Mas ganhou ${pointsEarned} pontos por participar!`;
    } else {
        pointsEarned = 150;
        resultMessage = `EMPATE! ${playerScore} a ${cpuScore}. Você ganhou ${pointsEarned} pontos.`;
    }
    if (!activeUpgrades.includes(42)) {
        setPoints(p => p + pointsEarned);
    }
    alert(resultMessage); 
    setGameStatus('subject-selection');
  }, [activeUpgrades]);
  

  const renderContent = () => {
    if (isBlackScreen) {
        if (blackScreenPhase === 'waiting') {
             return (
                 <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center animate-fade-in">
                     <p className="text-gray-600 font-mono text-sm animate-pulse">Encerrando processos...</p>
                 </div>
             );
        }

        if (blackScreenPhase === 'pet_cat') {
             return (
                 <div className="fixed inset-0 bg-gray-900 z-[100] flex flex-col items-center justify-center text-white p-4 animate-fade-in">
                     <h2 className="text-2xl mb-8 font-mono text-teal-300">O sistema se foi. Só resta ele.</h2>
                     <div 
                        className="cursor-pointer transform hover:scale-110 transition-transform duration-300 relative group"
                        onClick={() => {
                            handleResetGame();
                            // PUNISHMENT: Set the flag so next time they can only pick the cat
                            localStorage.setItem('hasBeenBanned', 'true');
                            window.location.reload();
                        }}
                     >
                        {/* Inline Cat SVG for the Black Screen */}
                        <div className="relative w-48 h-48 mx-auto">
                             <div className="absolute bottom-4 -right-8 w-6 h-20 bg-gray-400 rounded-full transform -rotate-45 origin-bottom-left z-[-1]"></div>
                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-24 bg-gray-500 rounded-t-full"></div>
                             <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-28 bg-gray-500 rounded-full">
                                <div className="absolute -top-2 left-2 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-gray-600 border-r-[20px] border-r-transparent transform -rotate-12"></div>
                                <div className="absolute -top-2 right-2 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-gray-600 border-r-[20px] border-r-transparent transform rotate-12"></div>
                                <div className="absolute top-14 left-8 w-6 h-6 bg-white rounded-full border-2 border-black/80"><div className="w-3 h-3 bg-black rounded-full absolute top-1 right-1"></div></div>
                                <div className="absolute top-14 right-8 w-6 h-6 bg-white rounded-full border-2 border-black/80"><div className="w-3 h-3 bg-black rounded-full absolute top-1 left-1"></div></div>
                                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-4 h-3 bg-pink-300 rounded-b-md"></div>
                                <div className="absolute top-16 -left-2 w-8 h-px bg-black transform -rotate-12"></div>
                                <div className="absolute top-20 -left-2 w-8 h-px bg-black"></div>
                                <div className="absolute top-16 -right-2 w-8 h-px bg-black transform rotate-12 origin-right"></div>
                                <div className="absolute top-20 -right-2 w-8 h-px bg-black origin-right"></div>
                             </div>
                        </div>
                        <p className="mt-8 text-center text-gray-400 group-hover:text-teal-300 text-sm font-bold uppercase tracking-widest animate-pulse">Faça carinho para aceitar</p>
                     </div>
                 </div>
             );
        }

        // Initial phase
        return (
            <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center text-white font-mono p-8 text-center animate-fade-in">
                <div 
                    className="w-24 h-24 text-red-600 mb-6 cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => {
                        // Secret way to input code on black screen
                        const code = prompt("Digite o código de emergência:");
                        if (code) handleSecretCode(code);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-widest text-red-500">SYSTEM FAILURE</h1>
                <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl">
                    Violação de segurança detectada. O sistema foi corrompido devido ao uso excessivo de códigos não autorizados.
                </p>
                <button 
                    onClick={() => {
                        setBlackScreenPhase('waiting');
                    }}
                    className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-4 px-10 rounded text-xl transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] uppercase"
                >
                    NÃO HÁ O QUE FAZER
                </button>
            </div>
        );
    }

    if (!selectedCharacter) {
       return (
        <CharacterSelectionScreen 
            onSelectCharacter={handleCharacterSelect} 
            unlockedCharacters={unlockedCharacters}
            onUnlockCharacter={handleUnlockCharacter}
            hasBeenBanned={hasBeenBanned}
            onEnterSecretCode={handleSecretCode}
        />
       );
    }
    
    switch (gameStatus) {
      case 'character-selection':
         return (
            <CharacterSelectionScreen 
                onSelectCharacter={handleCharacterSelect} 
                unlockedCharacters={unlockedCharacters}
                onUnlockCharacter={handleUnlockCharacter}
                hasBeenBanned={hasBeenBanned}
                onEnterSecretCode={handleSecretCode}
            />
        );
      case 'playing':
        return currentSubject && selectedTopics.length > 0 && selectedDifficulty && selectedQuestionCount > 0 && (
          <GameScreen
            topics={selectedTopics}
            difficulty={selectedDifficulty}
            subject={currentSubject}
            questionCount={selectedQuestionCount}
            onLevelComplete={handleLevelComplete}
            onBackToMenu={handleBackToTopicSelection}
            onAddPoints={handleAddPoints}
          />
        );
      case 'level-complete':
        return (
          <LevelCompleteScreen
            onContinue={handleBackToTopicSelection}
            difficulty={selectedDifficulty!}
            correctAnswers={lastRoundCorrectAnswers}
            questionCount={selectedQuestionCount}
            activeUpgrades={activeUpgrades}
            challengeBonus={lastRoundChallengeBonus}
          />
        );
      case 'topic-selection':
        return currentSubject && (
            <TopicSelectionScreen
                characterType={selectedCharacter}
                purchasedUpgrades={purchasedUpgrades}
                activeUpgrades={activeUpgrades}
                activeTattoo={activeTattoo}
                miniPetCount={miniPetCount}
                onStartGame={handleStartGame}
                subject={currentSubject}
                onBack={handleBackToSubjectSelection}
                points={points}
                onNavigateToStore={handleNavigateToStore}
            />
        );
      case 'store':
        return (
          <StoreScreen
            points={points}
            characterType={selectedCharacter}
            purchasedUpgrades={purchasedUpgrades}
            activeUpgrades={activeUpgrades}
            purchasedTattoos={purchasedTattoos}
            activeTattoo={activeTattoo}
            purchasedFootballCards={purchasedFootballCards}
            miniPetCount={miniPetCount}
            onPurchaseUpgrade={handlePurchaseUpgrade}
            onToggleUpgrade={handleToggleUpgrade}
            onPurchaseTattoo={handlePurchaseTattoo}
            onSelectTattoo={handleSelectTattoo}
            onPurchaseFootballCard={handlePurchaseFootballCard}
            onBack={handleBackToTopicSelection}
          />
        );
      case 'soccer-challenge':
        return (
            <SoccerChallengeScreen 
                onCorrect={handleSoccerChallengeSuccess}
                onIncorrect={handleSoccerChallengeFail}
            />
        );
      case 'soccer-game':
        return <SoccerGameScreen onGameOver={handleSoccerGameOver} purchasedFootballCards={purchasedFootballCards} />;
      case 'subject-selection':
      default:
        return (
          <SubjectSelectionScreen 
            characterType={selectedCharacter}
            purchasedUpgrades={purchasedUpgrades}
            activeUpgrades={activeUpgrades}
            activeTattoo={activeTattoo}
            miniPetCount={miniPetCount}
            onSelectSubject={handleSubjectSelect}
            onStartSoccer={handleStartSoccer}
            onEnterSecretCode={handleSecretCode}
            onManualSave={handleManualSave}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 text-gray-800 font-sans p-4 flex items-center justify-center relative overflow-hidden">
      {isWeatherEventActive && <WeatherOverlay />}
      <div className="w-full max-w-4xl mx-auto relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
