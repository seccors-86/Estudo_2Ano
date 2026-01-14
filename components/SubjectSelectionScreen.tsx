
import React, { useState, useMemo } from 'react';
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
    points?: number; // Added to show on leaderboard
    username?: string; // Added to show on leaderboard
    isFlying?: boolean;
    onUpdatePoints?: (points: number) => void; // Kept for interface compatibility but unused locally now
    isAdminMoney?: boolean;
}

// Fake static leaderboard data
const FAKE_LEADERBOARD = [
    { name: 'MestreYoda_22', points: 95000000000000000 },
    { name: 'SuperAna', points: 45000000000000 },
    { name: 'DrMatematica', points: 1200000000 },
    { name: 'ReiDoFutebol', points: 500000 },
    { name: 'Novato123', points: 1500 }
];

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
    onManualSave,
    points = 0,
    username = "You",
    isFlying = false,
    onUpdatePoints,
    isAdminMoney = false
}) => {
    const [showSecretModal, setShowSecretModal] = useState(false);
    const [secretCode, setSecretCode] = useState('');
    
    // New Black Screen State
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [adminPasswordInput, setAdminPasswordInput] = useState('');

    const handleSecretSubmit = () => {
        if (onEnterSecretCode) {
            onEnterSecretCode(secretCode);
        }
        setShowSecretModal(false);
        setSecretCode('');
    };

    const handleAdminClick = () => {
        // Trigger Black Screen
        setShowAdminLogin(true);
    };

    const handleAdminLoginSubmit = () => {
        if (onEnterSecretCode && onEnterSecretCode(adminPasswordInput)) {
            setShowAdminLogin(false);
            setAdminPasswordInput('');
        } else {
            // Shake effect or just clear
            setAdminPasswordInput('');
        }
    };

    const sortedLeaderboard = useMemo(() => {
        const currentUser = { name: username, points: points };
        let allUsers = [...FAKE_LEADERBOARD, currentUser];
        
        // Sort normally first
        allUsers.sort((a, b) => {
            if (a.points === Infinity) return -1;
            if (b.points === Infinity) return 1;
            return b.points - a.points;
        });

        // Filter out current user from normal list if admin money is active
        // because we will prepend them at Rank 0 manually
        if (isAdminMoney) {
            allUsers = allUsers.filter(u => u.name !== username);
        }

        return allUsers.slice(0, 5); // Top 5
    }, [points, username, isAdminMoney]);

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 text-center animate-fade-in relative max-h-[90vh] overflow-y-auto">
            
            {/* Top Right Control Column */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-50">
                {/* 1. Player Name */}
                <div className="bg-white/80 border border-gray-200 px-4 py-2 rounded shadow-sm font-bold text-gray-700 text-xs w-32 text-right truncate">
                    👤 {username}
                </div>
                
                {/* 2. Score */}
                <div 
                    className={`border px-4 py-2 rounded shadow-sm font-bold text-xs w-32 text-right ${isAdminMoney ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-green-100 border-green-300 text-green-800'}`}
                    title="Your Points"
                >
                    💰 {isAdminMoney ? 'ADMIN' : points === Infinity ? '∞' : Math.floor(points).toLocaleString('pt-BR', { notation: "compact", maximumFractionDigits: 1 })}
                </div>

                {/* 3. Chaves (Keys) */}
                <button 
                    onClick={() => setShowSecretModal(true)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 transition-colors px-4 py-2 rounded shadow-md font-bold text-xs uppercase flex items-center justify-end gap-2 w-32"
                    title="Enter Secret Code"
                >
                    Keys
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 100-2z" clipRule="evenodd" />
                    </svg>
                </button>

                 {/* 4. Sair (Exit) */}
                 {onManualSave && (
                    <button 
                        onClick={onManualSave}
                        className="bg-red-500 hover:bg-red-600 text-white transition-colors px-4 py-2 rounded shadow-md font-bold text-xs uppercase flex items-center justify-end gap-2 w-32"
                        title="Save and Exit"
                    >
                        Exit
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                )}

                {/* 5. Admin */}
                <button 
                    onClick={handleAdminClick}
                    className="bg-gray-800 hover:bg-gray-700 text-white transition-colors px-4 py-2 rounded shadow-md font-bold text-xs uppercase flex items-center justify-end gap-2 w-32 border border-gray-600"
                    title="Administrative Panel"
                >
                    Admin
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-teal-600 mb-2 mt-8 md:mt-0">Champion's Games</h1>
            <p className="text-lg text-gray-600 mb-6">Evolve your character and your island in different subjects!</p>

            <div className="mb-8 relative flex justify-center items-center h-56">
                <div className="absolute bottom-0">
                    <Island purchasedUpgrades={purchasedUpgrades} activeUpgrades={activeUpgrades} />
                </div>
                <div className="absolute bottom-8">
                    <Character 
                        type={characterType} 
                        activeUpgrades={activeUpgrades} 
                        activeTattoo={activeTattoo} 
                        hasMiniPet={hasMiniPet} 
                        miniPetCount={miniPetCount} 
                        isFlying={isFlying}
                    />
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Select a subject or play soccer:</h2>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
                <button
                    onClick={() => onSelectSubject('mathematics')}
                    className="w-full sm:w-56 p-6 rounded-xl text-white font-bold shadow-lg h-32 text-center transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 flex flex-col justify-center items-center"
                >
                    <span className="text-3xl">🧮</span>
                    <span className="text-xl mt-2">Mathematics</span>
                </button>
                <button
                    onClick={() => onSelectSubject('portuguese')}
                    className="w-full sm:w-56 p-6 rounded-xl text-white font-bold shadow-lg h-32 text-center transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 bg-red-500 hover:bg-red-600 focus:ring-red-500 flex flex-col justify-center items-center"
                >
                    <span className="text-3xl">📚</span>
                    <span className="text-xl mt-2">Portuguese</span>
                </button>
                <button
                    onClick={() => onSelectSubject('english')}
                    className="w-full sm:w-56 p-6 rounded-xl text-white font-bold shadow-lg h-32 text-center transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 bg-amber-500 hover:bg-amber-600 focus:ring-amber-500 flex flex-col justify-center items-center"
                >
                    <span className="text-3xl">💂</span>
                    <span className="text-xl mt-2">English</span>
                </button>
            </div>
             <div className="mt-4">
                <button
                    onClick={onStartSoccer}
                    className="w-full sm:w-auto max-w-[528px] mx-auto p-6 rounded-xl text-white font-bold shadow-lg h-32 text-center transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 bg-green-500 hover:bg-green-600 focus:ring-green-500 flex flex-col justify-center items-center px-12"
                >
                    <span className="text-3xl">⚽</span>
                    <span className="text-xl mt-2">Play Soccer</span>
                </button>
            </div>

            {/* Leaderboard */}
            <div className="mt-8 bg-gray-100 rounded-xl p-4 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-700 mb-3 flex items-center justify-center gap-2">
                    <span className="text-yellow-500">🏆</span> Global Leaderboard
                </h3>
                <div className="space-y-2">
                    {sortedLeaderboard.map((user, index) => {
                         const isMe = user.name === username;
                         let rankEmoji = '🏅';
                         if (index === 0) rankEmoji = '🥇';
                         if (index === 1) rankEmoji = '🥈';
                         if (index === 2) rankEmoji = '🥉';

                         return (
                            <div key={index} className={`flex justify-between items-center p-2 rounded ${isMe ? 'bg-yellow-100 border border-yellow-300' : 'bg-white'}`}>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg w-8 text-center">{rankEmoji}</span>
                                    <span className={`font-bold ${isMe ? 'text-gray-900' : 'text-gray-600'}`}>{user.name} {isMe && '(You)'}</span>
                                </div>
                                <span className="font-mono font-bold text-teal-600">
                                    {isAdminMoney && isMe ? 'ADMIN' : user.points === Infinity ? '∞' : user.points.toLocaleString('pt-BR', { notation: "compact", maximumFractionDigits: 1 })} pts
                                </span>
                            </div>
                         );
                    })}
                </div>
            </div>

            {/* Secret Code Modal */}
            {showSecretModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] backdrop-blur-sm animate-fade-in">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-80 animate-zoom-in">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Secret Code</h3>
                        <input
                            type="text"
                            value={secretCode}
                            onChange={(e) => setSecretCode(e.target.value)}
                            className="w-full border-2 border-gray-300 p-2 rounded-lg mb-4 text-center uppercase font-mono tracking-widest"
                            placeholder="TYPE HERE"
                        />
                        <div className="flex gap-2">
                            <button onClick={() => setShowSecretModal(false)} className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-400">
                                Cancel
                            </button>
                            <button onClick={handleSecretSubmit} className="flex-1 bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Admin Black Screen Login */}
            {showAdminLogin && (
                <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center animate-fade-in">
                    <p className="text-white font-mono text-xl mb-4 lowercase tracking-widest animate-pulse">bote a senha</p>
                    <input
                        type="password"
                        value={adminPasswordInput}
                        onChange={e => setAdminPasswordInput(e.target.value)}
                        className="bg-black border-b border-white text-white text-center outline-none font-mono text-xl w-64 p-2 focus:border-green-500 transition-colors"
                        autoFocus
                        onKeyDown={e => e.key === 'Enter' && handleAdminLoginSubmit()}
                    />
                    <button 
                        onClick={() => setShowAdminLogin(false)} 
                        className="mt-12 text-gray-600 text-xs hover:text-white uppercase tracking-widest transition-colors"
                    >
                        [ Abort Sequence ]
                    </button>
                </div>
            )}

        </div>
    );
};

export default SubjectSelectionScreen;
