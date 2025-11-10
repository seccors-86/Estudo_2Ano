import React, { useState, useEffect, useCallback } from 'react';
import SubjectSelectionScreen from './components/SubjectSelectionScreen';
import TopicSelectionScreen from './components/TopicSelectionScreen';
import GameScreen from './components/GameScreen';
import LevelCompleteScreen from './components/LevelCompleteScreen';
import StoreScreen from './components/StoreScreen';
import CharacterSelectionScreen from './components/CharacterSelectionScreen';

import type { GameStatus, Subject, Difficulty, CharacterType } from './types';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('subject-selection');
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(0);

  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(() => {
    return localStorage.getItem('selectedCharacter') as CharacterType | null;
  });

  const [points, setPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem('playerPoints');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

  const [purchasedUpgrades, setPurchasedUpgrades] = useState<number[]>(() => {
    const savedUpgrades = localStorage.getItem('purchasedUpgrades');
    return savedUpgrades ? JSON.parse(savedUpgrades) : [];
  });

  useEffect(() => {
    if (!selectedCharacter) {
      setGameStatus('character-selection');
    } else {
      setGameStatus('subject-selection');
    }
  }, [selectedCharacter]);

  useEffect(() => {
    localStorage.setItem('playerPoints', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('purchasedUpgrades', JSON.stringify(purchasedUpgrades));
  }, [purchasedUpgrades]);

  useEffect(() => {
    if (selectedCharacter) {
      localStorage.setItem('selectedCharacter', selectedCharacter);
    }
  }, [selectedCharacter]);

  const handleCharacterSelect = useCallback((character: CharacterType) => {
    setSelectedCharacter(character);
    setGameStatus('subject-selection');
  }, []);

  const handleAddPoints = useCallback((amount: number) => {
    setPoints(prev => prev + amount);
  }, []);
  
  const handlePurchaseUpgrade = useCallback((upgradeId: number, cost: number) => {
    if (points >= cost && !purchasedUpgrades.includes(upgradeId)) {
      setPoints(prev => prev - cost);
      setPurchasedUpgrades(prev => [...prev, upgradeId]);
      return true;
    }
    return false;
  }, [points, purchasedUpgrades]);

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

  const handleLevelComplete = useCallback(() => {
    setGameStatus('level-complete');
  }, []);

  const handleBackToTopicSelection = useCallback(() => {
    setSelectedTopics([]);
    setSelectedDifficulty(null);
    setSelectedQuestionCount(0);
    setGameStatus('topic-selection');
  }, []);
  
  const handleNavigateToStore = useCallback(() => {
    setGameStatus('store');
  }, []);

  const renderContent = () => {
    if (!selectedCharacter) {
       return <CharacterSelectionScreen onSelectCharacter={handleCharacterSelect} />;
    }
    
    switch (gameStatus) {
      case 'character-selection':
         return <CharacterSelectionScreen onSelectCharacter={handleCharacterSelect} />;
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
            questionCount={selectedQuestionCount}
          />
        );
      case 'topic-selection':
        return currentSubject && (
            <TopicSelectionScreen
                characterType={selectedCharacter}
                purchasedUpgrades={purchasedUpgrades}
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
            onPurchaseUpgrade={handlePurchaseUpgrade}
            onBack={handleBackToTopicSelection}
          />
        );
      case 'subject-selection':
      default:
        return (
          <SubjectSelectionScreen 
            characterType={selectedCharacter}
            purchasedUpgrades={purchasedUpgrades}
            onSelectSubject={handleSubjectSelect}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 text-gray-800 font-sans p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;