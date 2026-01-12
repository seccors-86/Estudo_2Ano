import React from 'react';
import { Difficulty } from '../types';

interface LevelCompleteScreenProps {
  onContinue: () => void;
  difficulty: Difficulty;
  correctAnswers: number;
  questionCount: number;
  activeUpgrades: number[];
  challengeBonus: number;
}

const LevelCompleteScreen: React.FC<LevelCompleteScreenProps> = ({ onContinue, difficulty, correctAnswers, questionCount, activeUpgrades, challengeBonus }) => {
  const pointsPerAnswer = {
    'Fichinha': 10,
    'Eu me Viro': 20,
    'Desafiador': 35,
  }[difficulty];

  const basePoints = correctAnswers * pointsPerAnswer;
  
  let multiplier = 1;
  let bonusText = '';
  if (activeUpgrades.includes(9)) {
    multiplier = 3;
    bonusText = 'Bônus de Atividade Tripla ATIVADO!';
  } else if (activeUpgrades.includes(8)) {
    multiplier = 2;
    bonusText = 'Bônus de Experiência em Dobro ATIVADO!';
  }
  
  const activityPoints = basePoints * multiplier;
  const multiplierBonus = activityPoints - basePoints;
  const totalPoints = activityPoints + challengeBonus;
  
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center animate-fade-in-up">
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">Parabéns!</h1>
      <p className="text-lg text-gray-600 mb-6">Você completou o desafio acertando {correctAnswers} de {questionCount} questões!</p>
      
      {challengeBonus > 0 && (
          <div className="my-6 bg-violet-100 border-l-4 border-violet-500 text-violet-800 p-4 rounded-md animate-pulse">
            <p className="font-bold text-xl">BÔNUS ESPECIAL</p>
            <p>Por completar um desafio de Matemática na dificuldade Desafiador, você ganhou:</p>
            <p className="font-black text-2xl mt-2">+5 Bilhões de pontos!</p>
          </div>
      )}
      
      <div className="my-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md">
        <p className="font-bold text-xl">Você ganhou um total de {new Intl.NumberFormat('pt-BR').format(totalPoints)} pontos nesta rodada!</p>
        {multiplierBonus > 0 && (
          <p className="font-semibold text-lg text-green-600 mt-2">
            ({basePoints} base + {multiplierBonus} bônus!)
            <span className="block text-sm text-green-700">{bonusText}</span>
          </p>
        )}
        <p className="mt-2">Use seus pontos na Loja para deixar seu campeão mais estiloso.</p>
      </div>

      <button
        onClick={onContinue}
        className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105"
      >
        Continuar
      </button>
    </div>
  );
};

export default LevelCompleteScreen;