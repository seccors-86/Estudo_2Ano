import React from 'react';
import { Difficulty } from '../types';

interface LevelCompleteScreenProps {
  onContinue: () => void;
  difficulty: Difficulty;
  questionCount: number;
}

const LevelCompleteScreen: React.FC<LevelCompleteScreenProps> = ({ onContinue, difficulty, questionCount }) => {
  const pointsPerAnswer = {
    'Fichinha': 10,
    'Eu me Viro': 20,
    'Desafiador': 35,
  }[difficulty];

  // Assuming player gets points for all questions in the round for simplicity
  // A more complex implementation could pass the number of correct answers
  const totalPoints = questionCount * pointsPerAnswer;
  
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center animate-fade-in-up">
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">Parabéns!</h1>
      <p className="text-lg text-gray-600 mb-6">Você completou o desafio!</p>
      
      <div className="my-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md">
        <p className="font-bold text-xl">Você ganhou {totalPoints} pontos!</p>
        <p className="mt-1">Use seus pontos na Loja para deixar seu personagem mais estiloso.</p>
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