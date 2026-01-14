
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
  const wrongAnswers = questionCount - correctAnswers;
  
  let pointsPerAnswer = 0;
  let penaltyPerWrong = 0;

  if (difficulty === 'Desafiador') {
      pointsPerAnswer = 20;
      penaltyPerWrong = 5;
  } else if (difficulty === 'Eu me Viro') {
      pointsPerAnswer = 15;
  } else {
      pointsPerAnswer = 10;
  }

  const positivePoints = correctAnswers * pointsPerAnswer;
  const penaltyPoints = wrongAnswers * penaltyPerWrong;
  const basePoints = Math.max(0, positivePoints - penaltyPoints);
  
  let multiplier = 1;
  let bonusText = '';
  if (activeUpgrades.includes(9)) {
    multiplier = 3;
    bonusText = 'Triple Activity Bonus ACTIVE!';
  } else if (activeUpgrades.includes(8)) {
    multiplier = 2;
    bonusText = 'Double XP Bonus ACTIVE!';
  }
  
  const activityPoints = basePoints * multiplier;
  const multiplierBonus = activityPoints - basePoints;
  const totalPoints = activityPoints + challengeBonus;
  
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center animate-fade-in-up">
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">Congratulations!</h1>
      <p className="text-lg text-gray-600 mb-6">You completed the challenge getting {correctAnswers} out of {questionCount} correct!</p>
      
      {challengeBonus > 0 && (
          <div className="my-6 bg-violet-100 border-l-4 border-violet-500 text-violet-800 p-4 rounded-md animate-pulse">
            <p className="font-bold text-xl">SPECIAL BONUS</p>
            <p>For completing a Math challenge on Hard difficulty, you earned:</p>
            <p className="font-black text-2xl mt-2">+5 Billion points!</p>
          </div>
      )}
      
      <div className="my-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md">
        <div className="text-sm mb-2 space-y-1">
            <p>Correct: {correctAnswers} x {pointsPerAnswer} = <span className="font-bold text-green-600">+{positivePoints}</span></p>
            {penaltyPoints > 0 && (
                <p>Wrong: {wrongAnswers} x {penaltyPerWrong} = <span className="font-bold text-red-600">-{penaltyPoints}</span></p>
            )}
        </div>
        <div className="border-t border-yellow-300 pt-2 mt-2">
            <p className="font-bold text-xl">You earned a total of {new Intl.NumberFormat('pt-BR').format(totalPoints)} points this round!</p>
        </div>
        
        {multiplierBonus > 0 && (
          <p className="font-semibold text-lg text-green-600 mt-2">
            ({basePoints} base + {multiplierBonus} bonus!)
            <span className="block text-sm text-green-700">{bonusText}</span>
          </p>
        )}
        <p className="mt-2 text-sm text-gray-600">If there is an active event, your points were multiplied when answering!</p>
      </div>

      <button
        onClick={onContinue}
        className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105"
      >
        Continue
      </button>
    </div>
  );
};

export default LevelCompleteScreen;
