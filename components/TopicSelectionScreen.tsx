import React, { useState, useMemo } from 'react';
import Character from './Character';
import StoreIcon from './icons/StoreIcon';
import type { Topic, Subject, Difficulty, CharacterType } from '../types';

const TOPIC_DATA: { [key in Subject]: Topic[] } = {
  mathematics: [
    { id: 'solidos_geometricos', label: 'Sólidos Geométricos' },
    { id: 'adicao_subtracao', label: 'Adição e Subtração' },
    { id: 'multiplicacao', label: 'Noções de Multiplicação' },
    { id: 'divisao', label: 'Noções de Divisão' },
  ],
  portuguese: [
    { id: 'sinonimos_antonimos', label: 'Sinônimos e Antônimos' },
    { id: 'substantivos', label: 'Substantivos Comuns/Próprios' },
    { id: 'genero', label: 'Gênero Masculino/Feminino' },
    { id: 'ortografia_r_s', label: 'Uso do R/RR e S/SS' },
    { id: 'fabula', label: 'Gênero Textual Fábula' },
    { id: 'singular_plural', label: 'Singular e Plural' },
    { id: 'aumentativo_diminutivo', label: 'Aumentativo e Diminutivo' },
    { id: 'uso_m_p_b', label: 'Uso do M antes de P e B' },
    { id: 'interpretacao_texto', label: 'Leitura e Interpretação' },
  ]
};

const DIFFICULTIES: Difficulty[] = ['Fichinha', 'Eu me Viro', 'Desafiador'];
const QUESTION_COUNTS = [5, 10, 15];


interface TopicSelectionScreenProps {
  characterType: CharacterType;
  purchasedUpgrades: number[];
  subject: Subject;
  points: number;
  onStartGame: (topics: string[], difficulty: Difficulty, questionCount: number) => void;
  onBack: () => void;
  onNavigateToStore: () => void;
}

const TopicSelectionScreen: React.FC<TopicSelectionScreenProps> = ({
  characterType, purchasedUpgrades, subject, points, onStartGame, onBack, onNavigateToStore
}) => {
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number | null>(null);

  const currentTopics = TOPIC_DATA[subject];
  const subjectTitle = subject === 'mathematics' ? "Matemática" : "Português";

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedTopics.size === currentTopics.length) {
      setSelectedTopics(new Set());
    } else {
      setSelectedTopics(new Set(currentTopics.map(t => t.id)));
    }
  };

  const canStart = selectedTopics.size > 0 && selectedDifficulty !== null && selectedQuestionCount !== null;

  const handleSubmit = () => {
    if (canStart) {
      const topicIds = Array.from(selectedTopics);
      onStartGame(topicIds, selectedDifficulty!, selectedQuestionCount!);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 text-center animate-fade-in">
      <div className="flex justify-between items-center mb-4">
         <button onClick={onBack} className="text-sm text-gray-600 hover:text-teal-500 transition-colors">
          &larr; Trocar Matéria
        </button>
        <button onClick={onNavigateToStore} className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <StoreIcon className="w-5 h-5" />
          Loja
        </button>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">{subjectTitle}</h1>
      <div className="mb-4">
        <Character type={characterType} purchasedUpgrades={purchasedUpgrades} />
         <div className="inline-block bg-gray-200 text-gray-800 text-lg font-bold px-4 py-1 rounded-full">
            Pontos: {points}
         </div>
      </div>

      {/* Topic Selection */}
      <div className="mb-6 text-left">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-semibold text-gray-700">1. Escolha os Tópicos:</h2>
            <button onClick={handleSelectAll} className="text-sm font-semibold text-teal-600 hover:text-teal-800">
                {selectedTopics.size === currentTopics.length ? 'Limpar Seleção' : 'Selecionar Todos'}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {currentTopics.map(topic => (
                <button
                    key={topic.id}
                    onClick={() => handleTopicToggle(topic.id)}
                    className={`p-3 rounded-lg text-sm text-center border-2 transition-all duration-200 ${selectedTopics.has(topic.id) ? 'bg-teal-500 border-teal-600 text-white font-bold' : 'bg-gray-100 border-gray-200 hover:border-teal-400 text-gray-700'}`}
                >
                    {topic.label}
                </button>
            ))}
          </div>
      </div>

      {/* Difficulty Selection */}
      <div className="mb-6 text-left">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">2. Escolha a Dificuldade:</h2>
          <div className="grid grid-cols-3 gap-4">
              {DIFFICULTIES.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`p-4 rounded-lg font-bold border-2 transition-all duration-200 ${selectedDifficulty === diff ? 'bg-yellow-400 border-yellow-500 text-yellow-900 ring-2 ring-yellow-300' : 'bg-gray-100 border-gray-200 hover:border-yellow-400'}`}
                  >
                      {diff}
                  </button>
              ))}
          </div>
      </div>

      {/* Question Count Selection */}
      <div className="mb-8 text-left">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">3. Quantidade de Questões:</h2>
          <div className="grid grid-cols-3 gap-4">
              {QUESTION_COUNTS.map(count => (
                  <button
                    key={count}
                    onClick={() => setSelectedQuestionCount(count)}
                    className={`p-4 rounded-lg font-bold border-2 transition-all duration-200 ${selectedQuestionCount === count ? 'bg-blue-400 border-blue-500 text-white ring-2 ring-blue-300' : 'bg-gray-100 border-gray-200 hover:border-blue-400'}`}
                  >
                      {count}
                  </button>
              ))}
          </div>
      </div>


      {/* Start Button */}
      <button
        onClick={handleSubmit}
        disabled={!canStart}
        className="w-full max-w-md mx-auto bg-green-500 text-white font-bold py-4 px-4 rounded-lg text-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
      >
        Começar Desafio!
      </button>

    </div>
  );
};

export default TopicSelectionScreen;