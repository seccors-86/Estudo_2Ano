
import React, { useState, useEffect, useCallback } from 'react';

interface SoccerGameScreenProps {
  onGameOver: (playerScore: number, cpuScore: number) => void;
  purchasedFootballCards: number[];
  username: string;
}

const FAKE_OPPONENTS = [
    'SuperStriker99', 'GolDePlaca_BR', 'MartaFan10', 'NeymarJunior_Fake', 
    'CR7_Lover', 'MessiTheGOAT', 'ZicoFlamengo', 'PeléEterno', 
    'RonaldoFenomeno', 'DribladorNato', 'GoleiroMuralha', 'FutebolArte2024'
];

const SoccerGameScreen: React.FC<SoccerGameScreenProps> = ({ onGameOver, purchasedFootballCards, username }) => {
  const [gameState, setGameState] = useState<'matchmaking' | 'playing'>('matchmaking');
  const [opponentName, setOpponentName] = useState('');
  
  const [score, setScore] = useState({ player: 0, cpu: 0 });
  const [possession, setPossession] = useState<'player' | 'cpu'>('player');
  const [ballPosition, setBallPosition] = useState(50); // 0 (CPU goal) to 100 (Player goal)
  const [log, setLog] = useState<string[]>([]);
  const [turnsLeft, setTurnsLeft] = useState(10); // 5 turns for each player
  const [isAnimating, setIsAnimating] = useState(false);

  // ID 108 is 'Pelé, o Rei'
  const isPele = purchasedFootballCards.includes(108);

  // Matchmaking Simulation
  useEffect(() => {
      const randomOpponent = FAKE_OPPONENTS[Math.floor(Math.random() * FAKE_OPPONENTS.length)];
      setOpponentName(randomOpponent);
      
      const timer = setTimeout(() => {
          setGameState('playing');
          setLog([`Match started! ${username} vs ${randomOpponent}`]);
      }, 2500); // 2.5s matchmaking delay

      return () => clearTimeout(timer);
  }, [username]);

  const addToLog = useCallback((message: string) => {
    setLog(prev => [`Turn ${11 - turnsLeft}: ${message}`, ...prev].slice(0, 5));
  }, [turnsLeft]);

  const endTurn = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
        setTurnsLeft(prev => prev - 1);
        setPossession(prev => (prev === 'player' ? 'cpu' : 'player'));
        setIsAnimating(false);
    }, 1500);
  }, []);

  const handlePlayerAction = (action: 'shoot' | 'dribble') => {
    if (isAnimating || possession !== 'player') return;

    if (action === 'dribble') {
      const success = Math.random() > 0.4; // 60% chance to succeed
      if (success) {
        addToLog(`You dribbled past ${opponentName} and advanced!`);
        setBallPosition(prev => Math.min(prev + 20, 95));
      } else {
        addToLog(`You lost the ball while trying to dribble ${opponentName}!`);
      }
      endTurn();
    }

    if (action === 'shoot') {
      // If user is Pelé (ID 108), shot is always successful (100% chance)
      const success = isPele || Math.random() > 0.5; 
      
      if (success) {
        if (isPele) {
             addToLog('PELÉ SHOOTS FROM DISTANCE... GOAL! UNSTOPPABLE!');
        } else {
             addToLog('GOOOOL! You scored!');
        }
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
        setBallPosition(50); // Reset to midfield
      } else {
        addToLog('Missed shot! What a chance lost.');
        setBallPosition(50); // Reset to midfield
      }
      endTurn();
    }
  };
  
  const handleCpuTurn = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
        // AI Logic: If close to player's goal, shoot. Otherwise, dribble.
        if (ballPosition < 40) { // CPU is close
            const success = Math.random() > 0.6; // 40% chance of scoring
            if (success) {
                addToLog(`GOAL BY ${opponentName}! They scored.`);
                setScore(prev => ({ ...prev, cpu: prev.cpu + 1 }));
                setBallPosition(50);
            } else {
                addToLog(`SAVED! ${opponentName} shot but you blocked it.`);
                setBallPosition(50);
            }
        } else { // CPU is far
            const success = Math.random() > 0.5; // 50% chance to dribble successfully
            if (success) {
                addToLog(`${opponentName} advances with the ball.`);
                setBallPosition(prev => Math.max(prev - 20, 5));
            } else {
                addToLog(`You stole the ball from ${opponentName}!`);
            }
        }
        endTurn();
    }, 2000);
  }, [ballPosition, endTurn, addToLog, opponentName]);

  useEffect(() => {
    if (gameState === 'playing') {
        if (turnsLeft === 0) {
        setIsAnimating(true);
        setTimeout(() => onGameOver(score.player, score.cpu), 2000);
        } else if (possession === 'cpu' && !isAnimating) {
        handleCpuTurn();
        }
    }
  }, [turnsLeft, possession, isAnimating, handleCpuTurn, score, onGameOver, gameState]);

  if (gameState === 'matchmaking') {
      return (
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-12 w-full max-w-3xl mx-auto animate-fade-in text-center">
              <h2 className="text-3xl font-bold text-gray-700 mb-8">Searching for Opponent...</h2>
              <div className="flex justify-center items-center gap-8 mb-8">
                  <div className="text-center">
                      <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-2 mx-auto">
                        {username.charAt(0)}
                      </div>
                      <p className="font-bold text-gray-600">{username}</p>
                  </div>
                  <div className="text-2xl font-bold text-gray-400">VS</div>
                  <div className="text-center">
                      <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-2 mx-auto animate-pulse">
                          ?
                      </div>
                      <p className="font-bold text-gray-400 animate-pulse">Searching...</p>
                  </div>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 animate-[width_2s_ease-in-out_infinite]" style={{width: '50%'}}></div>
              </div>
          </div>
      );
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-3xl mx-auto animate-fade-in-up">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 text-center">Ranked Match</h2>

      {/* Scoreboard */}
      <div className="flex justify-around items-center bg-gray-800 text-white p-4 rounded-lg mb-4 text-center">
        <div className="w-1/3">
          <p className="text-lg font-semibold truncate">{username}</p>
          <p className="text-5xl font-bold text-blue-400">{score.player}</p>
        </div>
        <div className="w-1/3">
          <p className="text-xs uppercase tracking-widest text-gray-400">Turns</p>
          <p className="text-2xl font-mono">{Math.ceil(turnsLeft / 2)}</p>
        </div>
        <div className="w-1/3">
          <p className="text-lg font-semibold truncate">{opponentName}</p>
          <p className="text-5xl font-bold text-red-400">{score.cpu}</p>
        </div>
      </div>

      {/* Field */}
      <div className="relative w-full h-24 bg-green-500 border-4 border-white rounded-lg overflow-hidden my-4 shadow-inner">
        {/* Midfield line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/50"></div>
        {/* Goals */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-12 bg-white border-2 border-gray-400"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-12 bg-white border-2 border-gray-400"></div>
        {/* Ball */}
        <div 
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 text-2xl transition-all duration-500 ease-in-out z-10"
            style={{ left: `calc(${ballPosition}% - 12px)`}}
        >
            ⚽
        </div>
        
        {/* Player Avatar on Field */}
        <div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full transition-all duration-500 ease-in-out border border-white shadow-md"
            style={{ left: possession === 'player' ? `calc(${ballPosition}% - 2px)` : '10%' }}
        ></div>
         {/* CPU Avatar on Field */}
        <div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full transition-all duration-500 ease-in-out border border-white shadow-md"
            style={{ left: possession === 'cpu' ? `calc(${ballPosition}% - 2px)` : '90%' }}
        ></div>
      </div>

      {/* Player Actions */}
      <div className="text-center my-6">
        <p className="font-bold text-xl mb-3 text-gray-700">{possession === 'player' ? 'Your turn! What will you do?' : `${opponentName} has the ball...`}</p>
        <div className="flex justify-center gap-4">
            <button 
                onClick={() => handlePlayerAction('dribble')}
                disabled={isAnimating || possession !== 'player'}
                className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-wait transition-transform transform hover:scale-105 shadow-md active:shadow-none"
            >
                Try Dribble
            </button>
            <button 
                onClick={() => handlePlayerAction('shoot')}
                // Pelé (ID 108) can shoot from anywhere. Regular players must be close (ballPosition >= 60)
                disabled={isAnimating || possession !== 'player' || (!isPele && ballPosition < 60)}
                className={`bg-red-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-wait transition-transform transform hover:scale-105 shadow-md active:shadow-none ${isPele ? 'ring-4 ring-yellow-400' : ''}`}
                title={!isPele && ballPosition < 60 ? 'You need to get closer to shoot!' : 'Shoot now!'}
            >
                {isPele ? 'King\'s Shot 👑' : 'Shoot for Goal'}
            </button>
        </div>
        {isPele && possession === 'player' && (
            <p className="text-yellow-600 font-bold text-sm mt-2 animate-pulse">King Pelé Skill Activated: 100% Accuracy Shot from anywhere!</p>
        )}
      </div>

      {/* Game Log */}
      <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-lg h-36 overflow-y-auto shadow-inner">
        <h4 className="font-semibold mb-2 text-gray-700">Commentary:</h4>
        <ul className="space-y-1">
          {log.map((entry, index) => (
            <li key={index} className={`text-sm ${index === 0 ? 'font-bold text-black border-l-4 border-green-500 pl-2' : 'text-gray-500 pl-3'}`}>
                {entry}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default SoccerGameScreen;
