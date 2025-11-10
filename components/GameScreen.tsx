import React, { useState, useEffect } from 'react';
import { getQuestions } from '../services/questionService';

import type { Problem, Subject, Difficulty } from '../types';

interface GameScreenProps {
  topics: string[];
  difficulty: Difficulty;
  subject: Subject;
  questionCount: number;
  onLevelComplete: () => void;
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

  const pointsPerAnswer = {
    'Fichinha': 10,
    'Eu me Viro': 20,
    'Desafiador': 35,
  }[difficulty];

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
        onLevelComplete();
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

    if (isCorrect) {
      onAddPoints(pointsPerAnswer);
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


  const subjectTitle = subject === 'mathematics' ? 'Matemática' : 'Português';

  const renderContent = () => {
    if (isLoading) {
      return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div>;
    }
    if (questionPool.length === 0) {
      return <p className="text-xl text-gray-600">Ops! Não encontramos questões para os tópicos e dificuldade selecionados. Tente outra combinação.</p>;
    }
    if (!problem) {
      return <p className="text-xl text-gray-600">Carregando...</p>;
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
        <h2 className="text-xl sm:text-2xl font-bold text-teal-600">{subjectTitle} - <span className="text-gray-600">{difficulty}</span></h2>
        <button onClick={onBackToMenu} className="text-sm text-gray-600 hover:text-teal-500 transition-colors">
          &larr; Voltar
        </button>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-teal-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${((currentQuestionIndex) / questionPool.length) * 100}%` }}></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">Questão: {currentQuestionIndex + 1} / {questionPool.length}</p>
      </div>

      {renderContent()}
    </div>
  );
};

export default GameScreen;