
import React, { useState, useEffect, useCallback } from 'react';

interface SoccerGameScreenProps {
  onGameOver: (playerScore: number, cpuScore: number) => void;
  purchasedFootballCards: number[];
}

const SoccerGameScreen: React.FC<SoccerGameScreenProps> = ({ onGameOver, purchasedFootballCards }) => {
  const [score, setScore] = useState({ player: 0, cpu: 0 });
  const [possession, setPossession] = useState<'player' | 'cpu'>('player');
  const [ballPosition, setBallPosition] = useState(50); // 0 (CPU goal) to 100 (Player goal)
  const [log, setLog] = useState<string[]>(['O juiz apita e a partida começa!']);
  const [turnsLeft, setTurnsLeft] = useState(10); // 5 turns for each player
  const [isAnimating, setIsAnimating] = useState(false);

  // ID 108 is 'Pelé, o Rei'
  const isPele = purchasedFootballCards.includes(108);

  const addToLog = useCallback((message: string) => {
    setLog(prev => [`Turno ${11 - turnsLeft}: ${message}`, ...prev].slice(0, 5));
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
        addToLog('Você driblou o adversário e avançou!');
        setBallPosition(prev => Math.min(prev + 20, 95));
      } else {
        addToLog('Você perdeu a bola ao tentar driblar!');
      }
      endTurn();
    }

    if (action === 'shoot') {
      // If user is Pelé (ID 108), shot is always successful (100% chance)
      const success = isPele || Math.random() > 0.5; 
      
      if (success) {
        if (isPele) {
             addToLog('PELÉ CHUTA DE ONDE ESTAVA... E É UM GOLAÇO INDEFENSÁVEL!');
        } else {
             addToLog('GOOOOL! Você marcou!');
        }
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
        setBallPosition(50); // Reset to midfield
      } else {
        addToLog('Chute para fora! Que chance perdida.');
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
                addToLog('GOL DO ADVERSÁRIO! Eles marcaram.');
                setScore(prev => ({ ...prev, cpu: prev.cpu + 1 }));
                setBallPosition(50);
            } else {
                addToLog('DEFESA! O adversário chutou e você defendeu.');
                setBallPosition(50);
            }
        } else { // CPU is far
            const success = Math.random() > 0.5; // 50% chance to dribble successfully
            if (success) {
                addToLog('O adversário avança com a bola.');
                setBallPosition(prev => Math.max(prev - 20, 5));
            } else {
                addToLog('Você roubou a bola do adversário!');
            }
        }
        endTurn();
    }, 2000);
  }, [ballPosition, endTurn, addToLog]);

  useEffect(() => {
    if (turnsLeft === 0) {
      setIsAnimating(true);
      setTimeout(() => onGameOver(score.player, score.cpu), 2000);
    } else if (possession === 'cpu' && !isAnimating) {
      handleCpuTurn();
    }
  }, [turnsLeft, possession, isAnimating, handleCpuTurn, score, onGameOver]);


  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-3xl mx-auto animate-fade-in-up">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 text-center">Partida de Futebol!</h2>

      {/* Scoreboard */}
      <div className="flex justify-around items-center bg-gray-800 text-white p-4 rounded-lg mb-4 text-center">
        <div>
          <p className="text-lg font-semibold">VOCÊ</p>
          <p className="text-5xl font-bold">{score.player}</p>
        </div>
        <div>
          <p className="text-sm">Turnos Restantes</p>
          <p className="text-2xl font-mono">{Math.ceil(turnsLeft / 2)}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">CPU</p>
          <p className="text-5xl font-bold">{score.cpu}</p>
        </div>
      </div>

      {/* Field */}
      <div className="relative w-full h-24 bg-green-500 border-4 border-white rounded-lg overflow-hidden my-4">
        {/* Midfield line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/50"></div>
        {/* Goals */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-12 bg-white border-2 border-gray-400"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-12 bg-white border-2 border-gray-400"></div>
        {/* Ball */}
        <div 
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 text-2xl transition-all duration-500 ease-in-out"
            style={{ left: `calc(${ballPosition}% - 12px)`}}
        >
            ⚽
        </div>
      </div>

      {/* Player Actions */}
      <div className="text-center my-6">
        <p className="font-bold text-xl mb-3">{possession === 'player' ? 'Sua vez de jogar!' : 'Vez do adversário...'}</p>
        <div className="flex justify-center gap-4">
            <button 
                onClick={() => handlePlayerAction('dribble')}
                disabled={isAnimating || possession !== 'player'}
                className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-wait transition-transform transform hover:scale-105"
            >
                Tentar Driblar
            </button>
            <button 
                onClick={() => handlePlayerAction('shoot')}
                // Pelé (ID 108) can shoot from anywhere. Regular players must be close (ballPosition >= 60)
                disabled={isAnimating || possession !== 'player' || (!isPele && ballPosition < 60)}
                className={`bg-red-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-wait transition-transform transform hover:scale-105 ${isPele ? 'ring-4 ring-yellow-400' : ''}`}
                title={!isPele && ballPosition < 60 ? 'Você precisa avançar mais para chutar!' : 'Chutar agora!'}
            >
                {isPele ? 'Chutaço do Rei 👑' : 'Chutar para o Gol'}
            </button>
        </div>
        {isPele && possession === 'player' && (
            <p className="text-yellow-600 font-bold text-sm mt-2 animate-pulse">Habilidade do Rei Pelé Ativada: Chute de qualquer lugar com 100% de precisão!</p>
        )}
      </div>

      {/* Game Log */}
      <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-lg h-36 overflow-y-auto">
        <h4 className="font-semibold mb-2">Últimos Lances:</h4>
        <ul>
          {log.map((entry, index) => (
            <li key={index} className={`text-sm ${index === 0 ? 'font-bold text-black' : 'text-gray-600'}`}>{entry}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default SoccerGameScreen;
