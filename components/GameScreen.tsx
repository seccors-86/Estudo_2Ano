
import React, { useState, useEffect } from 'react';
import { getQuestions } from '../services/questionService';

import type { Problem, Subject, Difficulty } from '../types';

interface GameScreenProps {
  topics: string[];
  difficulty: Difficulty;
  subject: Subject;
  questionCount: number;
  onLevelComplete: (correctAnswers: number, subject: Subject, difficulty: Difficulty) => void;
  onBackToMenu: () => void;
  onAddPoints: (points: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ topics, difficulty, subject, questionCount, onLevelComplete, onBackToMenu, onAddPoints }) => {
  const [questionPool, setQuestionPool] = useState<Problem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const problem = questionPool[currentQuestionIndex] || null;

  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Scoring Logic based on User Request
  // Difficult: +20 for Correct, -5 for Wrong.
  // 5 Questions Correct = 100 pts.
  // 3 Questions Correct (2 Wrong) = (3*20) - (2*5) = 60 - 10 = 50 pts.
  const getPointsDelta = (isCorrect: boolean) => {
      if (difficulty === 'Desafiador') {
          return isCorrect ? 20 : -5;
      } else if (difficulty === 'Eu me Viro') {
          return isCorrect ? 15 : 0;
      } else {
          return isCorrect ? 10 : 0;
      }
  };

  useEffect(() => {
    const loadQuestions = () => {
      setIsLoading(true);
      const questions = getQuestions(topics, difficulty, subject, questionCount);
      setQuestionPool(questions);
      setCurrentQuestionIndex(0);
      setCorrectAnswers(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsLoading(false);
    };
    loadQuestions();
  }, [topics, difficulty, subject, questionCount]);
  
  const loadNextProblem = () => {
     if (currentQuestionIndex + 1 >= questionPool.length) {
        onLevelComplete(correctAnswers, subject, difficulty);
        return;
    }
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleOptionSelect = (option: string | number) => {
    if (isAnswered || !problem) return;

    setIsAnswered(true);
    setSelectedAnswer(option);

    const isCorrect = option.toString().toLowerCase() === problem.answer.toString().toLowerCase();

    // Apply points immediately (Positive or Negative)
    const pointsToAdd = getPointsDelta(isCorrect);
    onAddPoints(pointsToAdd);

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    setTimeout(() => {
      loadNextProblem();
    }, isCorrect ? 1500 : 2000);
  };
  
  const getButtonClass = (option: string | number) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-teal-100 border-gray-300';
    }
    const isCorrectAnswer = option.toString().toLowerCase() === problem?.answer.toString().toLowerCase();
    const isSelectedAnswer = option.toString().toLowerCase() === selectedAnswer?.toString().toLowerCase();

    if (isCorrectAnswer) {
      return 'bg-green-500 text-white border-green-700 animate-pulse';
    }
    if (isSelectedAnswer) {
      return 'bg-red-500 text-white border-red-700 animate-shake';
    }
    return 'bg-gray-200 border-gray-300 text-gray-500 opacity-70';
  };


  let subjectTitle = '';
  switch (subject) {
      case 'mathematics': subjectTitle = 'Mathematics'; break;
      case 'portuguese': subjectTitle = 'Portuguese'; break;
      case 'english': subjectTitle = 'English'; break;
  }
  
  // Translating Difficulty Display only
  let diffDisplay: string = difficulty;
  if(difficulty === 'Fichinha') diffDisplay = 'Easy';
  if(difficulty === 'Eu me Viro') diffDisplay = 'Medium';
  if(difficulty === 'Desafiador') diffDisplay = 'Hard';

  const renderContent = () => {
    if (isLoading) {
      return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div>;
    }
    if (questionPool.length === 0) {
      return <p className="text-xl text-gray-600">Ops! No questions found for this topic/difficulty.</p>;
    }
    if (!problem) {
      return <p className="text-xl text-gray-600">Loading...</p>;
    }
    return (
      <>
        <div className="bg-gray-50 rounded-lg p-4 md:p-6 min-h-[120px] flex items-center justify-center text-center mb-6">
            <p className="text-2xl md:text-3xl font-mono text-gray-700">{problem.problem}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {problem.options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isAnswered}
                    className={`w-full p-4 text-lg md:text-xl rounded-lg border-2 font-semibold text-center transition-all duration-300 transform active:scale-95 disabled:cursor-not-allowed ${getButtonClass(option)}`}
                >
                    {option}
                </button>
            ))}
        </div>
      </>
    );
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-teal-600">{subjectTitle} - <span className="text-gray-600">{diffDisplay}</span></h2>
        <button onClick={onBackToMenu} className="text-sm text-gray-600 hover:text-teal-500 transition-colors">
          &larr; Back
        </button>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-teal-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${((currentQuestionIndex) / questionPool.length) * 100}%` }}></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">Question: {currentQuestionIndex + 1} / {questionPool.length}</p>
        <p className="text-center text-xs text-gray-400">
            {difficulty === 'Desafiador' ? 'Warning: Wrong answers deduct points!' : 'Good luck!'}
        </p>
      </div>

      {renderContent()}
    </div>
  );
};

export default GameScreen;
