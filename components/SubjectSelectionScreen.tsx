
import React, { useState } from 'react';
import Character from './Character';
import Island from './Island';
import { Subject, CharacterType } from '../types';

interface SubjectSelectionScreenProps {
    characterType: CharacterType;
    purchasedUpgrades: number[];
    activeUpgrades: number[];
    activeTattoo: string | null;
    hasMiniPet?: boolean; // deprecated
    miniPetCount?: number;
    onSelectSubject: (subject: Subject) => void;
    onStartSoccer: () => void;
    onEnterSecretCode?: (code: string) => boolean;
    onManualSave?: () => void;
}

const SubjectSelectionScreen: React.FC<SubjectSelectionScreenProps> = ({ 
    characterType, 
    purchasedUpgrades, 
    activeUpgrades, 
    activeTattoo, 
    hasMiniPet,
    miniPetCount,
    onSelectSubject, 
    onStartSoccer, 
    onEnterSecretCode,
    onManualSave 
}) => {
    const [showSecretModal, setShowSecretModal] = useState(false);
    const [secretCode, setSecretCode] = useState('');

    const handleSecretSubmit = () => {
        if (onEnterSecretCode) {
            onEnterSecretCode(secretCode);
        }
        setShowSecretModal(false);
        setSecretCode('');
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 text-center animate-fade-in relative">
            {/* Top Bar Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
                 {onManualSave && (
                    <button 
                        onClick={onManualSave}
                        className="text-gray-400 hover:text-green-600 transition-colors p-2 font-bold text-xs uppercase"
                        title="Salvar Jogo"
                    >
                        Salvar
                    </button>
                )}
                <button 
                    onClick={() => setShowSecretModal(true)}
                    className="text-gray-300 hover:text-teal-500 transition-colors p-2"
                    title="Painel de Controle"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 100-2z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-teal-600 mb-2">Jogos dos Campeões</h1>
            <p className="text-lg text-gray-600 mb-6">Evolua seu personagem e sua ilha em diferentes matérias!</p>

            <div className="mb-8 relative flex justify-center items-center h-56">
                <div className="absolute bottom-0">
                    <Island purchasedUpgrades={purchasedUpgrades} activeUpgrades={activeUpgrades} />
                </div>
                <div className="absolute bottom-8">
                    <Character type={characterType} activeUpgrades={activeUpgrades} activeTattoo={activeTattoo} hasMiniPet={hasMiniPet} miniPetCount={miniPetCount} />
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Selecione uma matéria ou jogue futebol:</h2>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
                <button
                    onClick={() => onSelectSubject('mathematics')}
                    className="w-full sm:w-56 p-6 rounded-xl text-white font-bold shadow-lg h-32 text-center transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 flex flex-col justify-center items-center"
                >
                    <span className="text-3xl">🧮</span>
                    <span className="text-xl mt-2">Matemática</span>
                </button>
                <button
                    onClick={() => onSelectSubject('portuguese')}
                    className="w-full sm:w-56 p-6 rounded-xl text-white font-bold shadow-lg h-32 text-center transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 bg-red-500 hover:bg-red-600 focus:ring-red-500 flex flex-col justify-center items-center"
                >
                    <span className="text-3xl">📚</span>
                    <span className="text-xl mt-2">Português</span>
                </button>
                <button
                    onClick={() => onSelectSubject('english')}
                    className="w-full sm:w-56 p-6 rounded-xl text-white font-bold shadow-lg h-32 text-center transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 bg-amber-500 hover:bg-amber-600 focus:ring-amber-500 flex flex-col justify-center items-center"
                >
                    <span className="text-3xl">💂</span>
                    <span className="text-xl mt-2">Inglês</span>
                </button>
            </div>
             <div className="mt-4">
                <button
                    onClick={onStartSoccer}
                    className="w-full sm:w-auto max-w-[528px] mx-auto p-6 rounded-xl text-white font-bold shadow-lg h-32 text-center transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 bg-green-500 hover:bg-green-600 focus:ring-green-500 flex flex-col justify-center items-center px-12"
                >
                    <span className="text-3xl">⚽</span>
                    <span className="text-xl mt-2">Jogar Futebol</span>
                </button>
            </div>

            {/* Secret Modal */}
            {showSecretModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white rounded-lg p-6 shadow-xl w-80 animate-zoom-in">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Código Secreto</h3>
                        <p className="text-sm text-gray-500 mb-4">Digite a senha para desbloquear recompensas.</p>
                        
                        <input 
                            type="text"
                            value={secretCode}
                            onChange={(e) => setSecretCode(e.target.value)}
                            placeholder="Digite o código"
                            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <div className="flex gap-2">
                             <button 
                                onClick={() => { setShowSecretModal(false); setSecretCode(''); }}
                                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSecretSubmit}
                                className="flex-1 bg-teal-500 text-white py-2 rounded-lg font-bold hover:bg-teal-600"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubjectSelectionScreen;
