import React from 'react';
import Character from './Character';
import { Subject, CharacterType } from '../types';

interface SubjectSelectionScreenProps {
    characterType: CharacterType;
    purchasedUpgrades: number[];
    onSelectSubject: (subject: Subject) => void;
}

const SubjectSelectionScreen: React.FC<SubjectSelectionScreenProps> = ({ characterType, purchasedUpgrades, onSelectSubject }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">Campeões da 122</h1>
            <p className="text-lg text-gray-600 mb-6">Evolua seu personagem em diferentes matérias!</p>

            <div className="mb-8">
                <Character type={characterType} purchasedUpgrades={purchasedUpgrades} />
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Selecione uma matéria:</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => onSelectSubject('mathematics')}
                    className="w-full sm:w-64 p-6 rounded-xl text-white font-bold shadow-lg h-36 text-center transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 flex flex-col justify-center items-center"
                >
                    <span className="text-3xl">🧮</span>
                    <span className="text-2xl mt-2">Matemática</span>
                </button>
                <button
                    onClick={() => onSelectSubject('portuguese')}
                    className="w-full sm:w-64 p-6 rounded-xl text-white font-bold shadow-lg h-36 text-center transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 bg-red-500 hover:bg-red-600 focus:ring-red-500 flex flex-col justify-center items-center"
                >
                    <span className="text-3xl">📚</span>
                    <span className="text-2xl mt-2">Português</span>
                </button>
            </div>
        </div>
    );
};

export default SubjectSelectionScreen;