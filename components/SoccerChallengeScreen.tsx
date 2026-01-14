
import React, { useState, useEffect } from 'react';
import { getQuestions } from '../services/questionService';
import { TOPIC_DATA } from '../data/topics';
import type { Problem, Subject } from '../types';

interface SoccerChallengeScreenProps {
  onCorrect: () => void;
  onIncorrect: () => void;
}

const SoccerChallengeScreen: React.FC<SoccerChallengeScreenProps> = ({ onCorrect, onIncorrect }) => {
  const [question, setQuestion] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const loadQuestion = () => {
      setIsLoading(true);
      const subject: Subject = Math.random() > 0.5 ? 'mathematics' : 'portuguese';
      const allTopics = TOPIC_DATA[subject].map(t => t.id);
      const questions = getQuestions(allTopics, 'Eu me Viro', subject, 1);
      
      if (questions.length > 0) {
        setQuestion(questions[0]);
      } else {
        // Failsafe in case no question is returned
        onIncorrect();
      }
      setIsLoading(false);
    };
    loadQuestion();
  }, [onIncorrect]);

  const handleOptionSelect = (option: string | number) => {
    if (isAnswered || !question) return;

    setIsAnswered(true);
    setSelectedAnswer(option);

    const isCorrect = option.toString().toLowerCase() === question.answer.toString().toLowerCase();

    setTimeout(() => {
      if (isCorrect) {
        onCorrect();
      } else {
        onIncorrect();
      }
    }, isCorrect ? 1500 : 2000);
  };

  const getButtonClass = (option: string | number) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-teal-100 border-gray-300';
    }
    const isCorrectAnswer = option.toString().toLowerCase() === question?.answer.toString().toLowerCase();
    const isSelectedAnswer = option.toString().toLowerCase() === selectedAnswer?.toString().toLowerCase();

    if (isCorrectAnswer) {
      return 'bg-green-500 text-white border-green-700 animate-pulse';
    }
    if (isSelectedAnswer) {
      return 'bg-red-500 text-white border-red-700 animate-shake';
    }
    return 'bg-gray-200 border-gray-300 text-gray-500 opacity-70';
  };

  const renderContent = () => {
    if (isLoading || !question) {
      return (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>
      );
    }
    return (
      <>
        <div className="bg-gray-50 rounded-lg p-4 md:p-6 min-h-[120px] flex items-center justify-center text-center mb-6">
          <p className="text-2xl md:text-3xl font-mono text-gray-700">{question.problem}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {question.options.map((option, index) => (
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
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-2xl mx-auto animate-fade-in-up">
      <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 mb-2 text-center">Entry Challenge!</h2>
      <p className="text-gray-600 mb-6 text-center">Answer correctly to start the soccer match.</p>
      {renderContent()}
    </div>
  );
};

export default SoccerChallengeScreen;
