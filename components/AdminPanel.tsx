
import React, { useState, useEffect } from 'react';
import { adminStorage } from '../services/storageService';
import { Upgrade, Subject, Difficulty, GameEvent, CharacterType, AccountType } from '../types';
import { TOPIC_DATA } from '../data/topics';
import { UPGRADES } from './StoreScreen';

interface AdminPanelProps {
    onClose: () => void;
    currentPoints: number;
    onUpdatePoints: (points: number) => void;
    onResetGame: () => void;
    isBanned: boolean;
    onSetBan: (banned: boolean) => void;
    currentAccountType: AccountType;
    onUpdateAccountType: (type: AccountType) => void;
    onForceCharacterChange: (char: CharacterType) => void;
    currentUsername: string;
    onGrantItem: (id: number) => void;
    onRevokeItem: (id: number) => void;
    onUpdateMiniPets: (count: number) => void;
    currentMiniPets: number;
    onLoginAs?: (username: string, password?: string) => void;
    isFlying: boolean;
    onSetFlying: (flying: boolean) => void;
    adminImmunity: boolean;
    onSetAdminImmunity: (active: boolean) => void;
    onUnlockAllCharacters?: () => void;
    activeUpgrades?: number[];
    isAdminMoney?: boolean;
    onSetAdminMoney?: (value: boolean) => void;
}

const STANDARD_CHARS: CharacterType[] = ['kitten', 'dog', 'parrot', 'kangaroo', 'panda', 'lion', 'monkey', 'penguin', 'fox', 'robot', 'alien', 'zombie', 'hamster', 'tiger', 'unicorn', 'dragon', 'rabbit', 'bear', 'mouse', 'pig'];

interface DBUser {
    username: string;
    pass: string;
    role: AccountType;
    status: 'Ativo' | 'Banido';
    points: number; // Simulated points
    isInfinite: boolean; // Simulating Infinite X state
}

// Initial Fake Database
const INITIAL_FAKE_DB: DBUser[] = [
    { username: 'MestreYoda_22', pass: '***', role: 'VIP', status: 'Ativo', points: 95000000000000000, isInfinite: false },
    { username: 'SuperAna', pass: '***', role: 'Jogador', status: 'Ativo', points: 45000000000000, isInfinite: false },
    { username: 'DrMatematica', pass: '***', role: 'Admin', status: 'Ativo', points: 1200000000, isInfinite: false },
    { username: 'ReiDoFutebol', pass: '***', role: 'Jogador', status: 'Banido', points: 500000, isInfinite: false },
    { username: 'Novato123', pass: '***', role: 'Jogador', status: 'Ativo', points: 1500, isInfinite: false },
];

const AdminPanel: React.FC<AdminPanelProps> = ({ 
    onClose, 
    currentPoints, 
    onUpdatePoints, 
    onResetGame, 
    isBanned, 
    onSetBan,
    currentAccountType, 
    onUpdateAccountType,
    onForceCharacterChange,
    currentUsername,
    onGrantItem,
    onRevokeItem,
    onUpdateMiniPets,
    currentMiniPets,
    onLoginAs,
    isFlying,
    onSetFlying,
    adminImmunity,
    onSetAdminImmunity,
    onUnlockAllCharacters,
    activeUpgrades = [],
    isAdminMoney = false,
    onSetAdminMoney
}) => {
    const [activeTab, setActiveTab] = useState<'jogadores' | 'dinheiro' | 'loja' | 'vestiario' | 'questoes' | 'eventos' | 'pets' | 'sistema' | 'testes'>('jogadores');
    
    // Shop State
    const [shopItems, setShopItems] = useState<Upgrade[]>([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', cost: 0, emoji: '' });
    
    // Direct Transfer State
    const [transferTarget, setTransferTarget] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [transferItemId, setTransferItemId] = useState('');

    // Users State
    const [dbUsers, setDbUsers] = useState<DBUser[]>(INITIAL_FAKE_DB);
    
    // Management Modal State
    const [manageUser, setManageUser] = useState<DBUser | null>(null); // For Fake Users
    const [isManagingSelf, setIsManagingSelf] = useState(false); // Flag if managing current user

    // Questions State
    const [newQuestion, setNewQuestion] = useState({
        subject: 'mathematics' as Subject,
        topic: '',
        difficulty: 'Fichinha' as Difficulty,
        problem: '',
        correctAnswer: '',
        wrong1: '',
        wrong2: '',
        wrong3: ''
    });

    // Events State
    const [events, setEvents] = useState<GameEvent[]>([]);
    const [newEvent, setNewEvent] = useState<Partial<GameEvent>>({ 
        name: '', 
        multiplier: 2, 
        daysOfWeek: [], 
        startHour: 0, 
        endHour: 23,
        isRedScreen: false,
        isSuperParty: false
    });

    useEffect(() => {
        setShopItems(adminStorage.getShopItems());
        setEvents(adminStorage.getEvents());
    }, []);

    // --- Shop Handlers ---
    const handlePriceChange = (id: number, newPrice: string) => {
        const price = parseInt(newPrice);
        if (!isNaN(price)) {
            adminStorage.updateItemPrice(id, price);
            setShopItems(adminStorage.getShopItems());
        }
    };

    const handleAddItem = () => {
        if (!newItem.name || newItem.cost <= 0) return alert('Invalid Data');
        const id = Math.floor(Math.random() * 10000) + 2000; // Random ID > 2000
        const item: Upgrade = { ...newItem, id, isCustom: true };
        adminStorage.addCustomItem(item);
        setShopItems(adminStorage.getShopItems());
        setNewItem({ name: '', description: '', cost: 0, emoji: '' });
        alert('Item added!');
    };
    
    // --- Direct Transfer Handler ---
    const handleDirectTransfer = (type: 'add' | 'remove') => {
        if (!transferTarget) return alert("Enter player name.");
        
        let successMsg = "";
        const isSelf = transferTarget === currentUsername;
        
        // Handle Money
        if (transferAmount) {
            const amount = parseFloat(transferAmount);
            if (!isNaN(amount)) {
                if (isSelf) {
                    if (currentPoints !== Infinity) {
                        const newPoints = type === 'add' ? currentPoints + amount : Math.max(0, currentPoints - amount);
                        onUpdatePoints(newPoints);
                    }
                } 
                // In a real backend, we would update the user record here. 
                // For simulated DB users:
                setDbUsers(prev => prev.map(u => {
                    if (u.username === transferTarget) {
                        const newP = type === 'add' ? u.points + amount : Math.max(0, u.points - amount);
                        return { ...u, points: newP };
                    }
                    return u;
                }));

                successMsg += type === 'add' ? `Sent $${amount} ` : `Withdrew $${amount} `;
            }
        }

        // Handle Item (Only add supported via this quick panel for now)
        if (transferItemId && type === 'add') {
            const id = parseInt(transferItemId);
            if (!isNaN(id)) {
                if (isSelf) {
                    onGrantItem(id);
                }
                successMsg += `+ Item #${id} `;
            }
        }

        if (successMsg) {
            alert(`SUCCESS! ${successMsg} ${type === 'add' ? 'to' : 'from'} ${transferTarget}.`);
            setTransferAmount('');
            setTransferItemId('');
        } else {
            alert("Enter amount or item ID.");
        }
    };

    // --- Management Modal Handlers ---
    const openManageSelf = () => {
        setIsManagingSelf(true);
        setManageUser({
            username: currentUsername,
            pass: '***',
            role: currentAccountType,
            status: isBanned ? 'Banido' : 'Ativo',
            points: currentPoints,
            isInfinite: currentPoints === Infinity
        });
    };

    const openManageUser = (user: DBUser) => {
        setIsManagingSelf(false);
        setManageUser(user);
    };

    const closeManageModal = () => {
        setManageUser(null);
        setIsManagingSelf(false);
    };

    const handleToggleBan = () => {
        if (!manageUser) return;
        const newStatus = manageUser.status === 'Ativo' ? 'Banido' : 'Ativo';
        
        if (isManagingSelf) {
            onSetBan(newStatus === 'Banido');
            setManageUser({ ...manageUser, status: newStatus });
        } else {
            setDbUsers(prev => prev.map(u => u.username === manageUser.username ? { ...u, status: newStatus } : u));
            setManageUser({ ...manageUser, status: newStatus });
        }
    };

    // New: Toggle Infinite Money X
    const handleToggleInfinite = () => {
        if (!manageUser) return;
        const newState = !manageUser.isInfinite;
        
        if (isManagingSelf) {
            onUpdatePoints(newState ? Infinity : 0);
            if (newState) onGrantItem(999);
            setManageUser({ ...manageUser, isInfinite: newState, points: newState ? Infinity : 0 });
        } else {
            setDbUsers(prev => prev.map(u => u.username === manageUser.username ? { ...u, isInfinite: newState, points: newState ? Infinity : 0 } : u));
            setManageUser({ ...manageUser, isInfinite: newState, points: newState ? Infinity : 0 });
        }
    };

    // New: Game Passes
    const handleGrantPass = (role: AccountType) => {
        if (!manageUser) return;
        if (isManagingSelf) {
            onUpdateAccountType(role);
            setManageUser({ ...manageUser, role: role });
        } else {
            setDbUsers(prev => prev.map(u => u.username === manageUser.username ? { ...u, role: role } : u));
            setManageUser({ ...manageUser, role: role });
        }
    };

    // --- Question Handlers ---
    const handleAddQuestion = () => {
        if (!newQuestion.problem || !newQuestion.correctAnswer || !newQuestion.topic) return alert('Fill all fields');
        
        const problem = {
            problem: newQuestion.problem,
            answer: newQuestion.correctAnswer,
            options: [newQuestion.correctAnswer, newQuestion.wrong1, newQuestion.wrong2, newQuestion.wrong3],
            topic: newQuestion.topic,
            difficulty: newQuestion.difficulty
        };
        
        adminStorage.addQuestion(problem);
        alert('Question added to DB!');
        setNewQuestion({ ...newQuestion, problem: '', correctAnswer: '', wrong1: '', wrong2: '', wrong3: '' });
    };

    // --- Event Handlers ---
    const handleAddEvent = () => {
        if(!newEvent.name) return;
        const evt: GameEvent = {
            id: Date.now().toString(),
            name: newEvent.name,
            multiplier: newEvent.multiplier || 1,
            active: true, // Default to active for immediate feedback in this context
            daysOfWeek: newEvent.daysOfWeek || [],
            startHour: newEvent.startHour || 0,
            endHour: newEvent.endHour || 23,
            isRedScreen: newEvent.isRedScreen || false,
            isSuperParty: newEvent.isSuperParty || false
        };
        const updated = [...events, evt];
        setEvents(updated);
        adminStorage.saveEvents(updated);
        setNewEvent({ name: '', multiplier: 2, daysOfWeek: [], startHour: 0, endHour: 23, isRedScreen: false, isSuperParty: false });
    };

    const createPresetEvent = (type: 'gold' | 'xp' | 'party' | 'sale' | 'time' | 'apoc' | 'rain') => {
        const id = Date.now().toString();
        let evt: GameEvent;
        
        if (type === 'gold') {
            evt = { id, name: 'Gold Rain', multiplier: 10, active: true, isRedScreen: false, isSuperParty: false };
        } else if (type === 'xp') {
            evt = { id, name: 'Insane XP', multiplier: 5, active: true, isRedScreen: false, isSuperParty: false };
        } else if (type === 'party') {
            evt = { id, name: 'Super Party', multiplier: 2, active: true, isRedScreen: false, isSuperParty: true };
        } else if (type === 'sale') {
            evt = { id, name: 'Cheap Shop', multiplier: 1, active: true, isRedScreen: true, isSuperParty: false };
        } else if (type === 'time') {
            evt = { id, name: 'Frozen Time', multiplier: 0, active: true, isRedScreen: false, isSuperParty: false };
        } else if (type === 'apoc') {
            evt = { id, name: 'Apocalypse', multiplier: 100, active: true, isRedScreen: true, isSuperParty: false };
        } else {
            evt = { id, name: 'Points Storm', multiplier: 20, active: true, isRedScreen: false, isSuperParty: false };
        }
        
        const updated = [...events, evt];
        setEvents(updated);
        adminStorage.saveEvents(updated);
    };

    const toggleEvent = (id: string) => {
        const updated = events.map(e => e.id === id ? { ...e, active: !e.active } : e);
        setEvents(updated);
        adminStorage.saveEvents(updated);
    };

    const deleteEvent = (id: string) => {
        const updated = events.filter(e => e.id !== id);
        setEvents(updated);
        adminStorage.saveEvents(updated);
    };

    const toggleDay = (dayIndex: number) => {
        setNewEvent(prev => {
            const currentDays = prev.daysOfWeek || [];
            if (currentDays.includes(dayIndex)) {
                return { ...prev, daysOfWeek: currentDays.filter(d => d !== dayIndex) };
            } else {
                return { ...prev, daysOfWeek: [...currentDays, dayIndex] };
            }
        });
    };

    // Island Handling
    const spawnHouse = (id: number) => {
        // Remove conflicting houses first to ensure clean swap (though game handles multiple, it looks better)
        const houseIds = [21, 13, 22, 60, 61, 62];
        houseIds.forEach(hid => {
            if (hid !== id) onRevokeItem(hid);
        });
        onGrantItem(id);
        alert(`Structure ID #${id} spawned!`);
    };

    const handleUnlockEverything = () => {
        UPGRADES.forEach(item => {
            onGrantItem(item.id);
        });
        onUpdatePoints(Infinity);
        onUpdateAccountType('Deus');
        alert("God Mode Activated! All items bought and infinite money.");
    };

    const handleToggleSpecialPet = (id: number) => {
        if (activeUpgrades.includes(id)) {
            onRevokeItem(id);
        } else {
            onGrantItem(id);
        }
    };

    const handleToggleInfinitePoints = () => {
        if (currentPoints === Infinity) {
            onUpdatePoints(0);
        } else {
            onUpdatePoints(Infinity);
        }
    };

    const handleAddSpecificPoints = (amount: number) => {
        if (currentPoints === Infinity || isAdminMoney) return;
        onUpdatePoints(currentPoints + amount);
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col p-6 overflow-hidden text-white font-mono">
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                <h1 className="text-3xl text-green-500 font-bold">ADMIN PANEL</h1>
                <button onClick={onClose} className="text-red-500 hover:text-red-400 font-bold text-xl">[ EXIT ]</button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-56 flex flex-col gap-2 border-r border-gray-700 pr-4 overflow-y-auto">
                    <button onClick={() => setActiveTab('jogadores')} className={`p-4 text-left hover:bg-gray-800 transition-colors font-bold ${activeTab === 'jogadores' ? 'bg-gray-800 text-green-400 border-l-4 border-green-500' : 'text-gray-400'}`}>👤 PLAYERS</button>
                    <button onClick={() => setActiveTab('dinheiro')} className={`p-4 text-left hover:bg-gray-800 transition-colors font-bold ${activeTab === 'dinheiro' ? 'bg-gray-800 text-yellow-400 border-l-4 border-yellow-500' : 'text-gray-400'}`}>💸 MONEY</button>
                    <button onClick={() => setActiveTab('testes')} className={`p-4 text-left hover:bg-gray-800 transition-colors font-bold ${activeTab === 'testes' ? 'bg-gray-800 text-orange-400 border-l-4 border-orange-500' : 'text-gray-400'}`}>🧪 TESTS & COMMANDS</button>
                    <button onClick={() => setActiveTab('loja')} className={`p-4 text-left hover:bg-gray-800 transition-colors font-bold ${activeTab === 'loja' ? 'bg-gray-800 text-green-400 border-l-4 border-green-500' : 'text-gray-400'}`}>🛒 SHOP</button>
                    <button onClick={() => setActiveTab('vestiario')} className={`p-4 text-left hover:bg-gray-800 transition-colors font-bold ${activeTab === 'vestiario' ? 'bg-gray-800 text-green-400 border-l-4 border-green-500' : 'text-gray-400'}`}>👔 WARDROBE (FREE)</button>
                    <button onClick={() => setActiveTab('questoes')} className={`p-4 text-left hover:bg-gray-800 transition-colors font-bold ${activeTab === 'questoes' ? 'bg-gray-800 text-green-400 border-l-4 border-green-500' : 'text-gray-400'}`}>❓ QUESTIONS</button>
                    <button onClick={() => setActiveTab('eventos')} className={`p-4 text-left hover:bg-gray-800 transition-colors font-bold ${activeTab === 'eventos' ? 'bg-gray-800 text-green-400 border-l-4 border-green-500' : 'text-gray-400'}`}>🎉 EVENTS</button>
                    <button onClick={() => setActiveTab('pets')} className={`p-4 text-left hover:bg-gray-800 transition-colors font-bold ${activeTab === 'pets' ? 'bg-gray-800 text-green-400 border-l-4 border-green-500' : 'text-gray-400'}`}>🐾 PETS</button>
                    <button onClick={() => setActiveTab('sistema')} className={`p-4 text-left hover:bg-gray-800 transition-colors font-bold ${activeTab === 'sistema' ? 'bg-gray-800 text-green-400 border-l-4 border-green-500' : 'text-gray-400'}`}>⚙️ SYSTEM</button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto pl-8">
                    
                    {/* JOGADORES */}
                    {activeTab === 'jogadores' && (
                        // ... existing code for jogadores tab
                        <div className="space-y-6">
                            
                            {/* Direct Transfer (Envio Rápido) */}
                            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-lg border border-blue-500 shadow-lg mb-8">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    🚀 Quick Transfer / Withdraw
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                    <div>
                                        <label className="text-xs text-blue-300 block mb-1">Player Name</label>
                                        <input 
                                            type="text" 
                                            value={transferTarget}
                                            onChange={(e) => setTransferTarget(e.target.value)}
                                            placeholder="Ex: MestreYoda_22"
                                            className="w-full bg-black/50 border border-blue-500/50 rounded p-2 text-white placeholder-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-blue-300 block mb-1">Amount or Item ID</label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="number" 
                                                value={transferAmount}
                                                onChange={(e) => setTransferAmount(e.target.value)}
                                                placeholder="$ Money"
                                                className="w-1/2 bg-black/50 border border-blue-500/50 rounded p-2 text-white"
                                            />
                                            <input 
                                                type="number" 
                                                value={transferItemId}
                                                onChange={(e) => setTransferItemId(e.target.value)}
                                                placeholder="# Item ID"
                                                className="w-1/2 bg-black/50 border border-blue-500/50 rounded p-2 text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleDirectTransfer('add')}
                                            className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded shadow-lg transition-transform active:scale-95 text-xs"
                                        >
                                            SEND (Add)
                                        </button>
                                        <button 
                                            onClick={() => handleDirectTransfer('remove')}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded shadow-lg transition-transform active:scale-95 text-xs"
                                        >
                                            WITHDRAW (Remove)
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-2xl text-white mb-4 border-b border-gray-700 pb-2">Player List</h2>
                            
                            {/* Current User Card */}
                            <div className="bg-gray-800 p-6 rounded-lg border border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-teal-400">{currentUsername} (You)</h3>
                                        <span className={`text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 mt-1 inline-block`}>Status: {isBanned ? 'BANNED' : 'ONLINE'}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-400 text-sm">Current Balance</p>
                                        <p className="text-2xl font-bold text-yellow-500">
                                            {isAdminMoney ? 'ADMIN' : currentPoints === Infinity ? '∞' : currentPoints.toLocaleString('pt-BR')}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button onClick={openManageSelf} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg border border-blue-400">
                                        🛠️ MANAGE ACCOUNT
                                    </button>
                                    <button 
                                        onClick={handleUnlockEverything}
                                        className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white font-bold py-2 rounded shadow-[0_0_15px_rgba(236,72,153,0.6)] animate-pulse"
                                    >
                                        👑 UNLOCK ALL
                                    </button>
                                </div>
                            </div>

                            {/* Database View */}
                            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-gray-300">Account Database</h3>
                                </div>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-400">
                                        <thead className="bg-gray-900 text-gray-200 uppercase font-bold">
                                            <tr>
                                                <th className="p-3">User</th>
                                                <th className="p-3">Role</th>
                                                <th className="p-3">Status</th>
                                                <th className="p-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            <tr className="bg-gray-800/50 border-l-4 border-green-500">
                                                <td className="p-3 font-bold text-green-400">{currentUsername} (You)</td>
                                                <td className="p-3">{currentAccountType}</td>
                                                <td className="p-3">{isBanned ? 'BANNED' : 'Online'}</td>
                                                <td className="p-3">
                                                    <button onClick={openManageSelf} className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs font-bold">
                                                        Manage
                                                    </button>
                                                </td>
                                            </tr>
                                            {dbUsers.map((user, idx) => (
                                                <tr key={idx} className={`hover:bg-gray-700/50 transition-colors ${user.status === 'Banido' ? 'opacity-50' : ''}`}>
                                                    <td className="p-3">{user.username}</td>
                                                    <td className="p-3">{user.role}</td>
                                                    <td className="p-3">
                                                        <span className={`px-2 py-0.5 rounded text-xs ${user.status === 'Banido' ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 flex gap-2">
                                                        <button 
                                                            onClick={() => openManageUser(user)}
                                                            className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs font-bold"
                                                        >
                                                            Manage
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DINHEIRO TAB (New) */}
                    {activeTab === 'dinheiro' && (
                        <div className="flex flex-col items-center justify-center h-full animate-fade-in">
                            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-4 border-yellow-500 rounded-3xl p-8 shadow-2xl w-full max-w-lg text-center relative">
                                {/* App Header Simulation */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-600 rounded-full"></div>
                                
                                <h2 className="text-3xl font-black text-yellow-400 mb-2 mt-4 uppercase tracking-wider">Money App</h2>
                                <p className="text-gray-300 text-lg mb-8 font-bold">Do you want unlimited money?</p>

                                {/* Admin Money Toggle */}
                                {onSetAdminMoney && (
                                    <button 
                                        onClick={() => onSetAdminMoney(!isAdminMoney)}
                                        className={`w-full py-4 rounded-xl font-black text-xl shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all transform active:scale-95 mb-4 border-4 
                                        ${isAdminMoney 
                                            ? 'bg-gradient-to-r from-red-600 to-purple-600 border-purple-400 text-white animate-pulse' 
                                            : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'
                                        }`}
                                    >
                                        {isAdminMoney ? 'ACTIVATED: ADMIN MONEY (SUPREME)' : 'DISABLED: ADMIN MONEY'}
                                    </button>
                                )}

                                {/* Infinite Toggle */}
                                <button 
                                    onClick={handleToggleInfinitePoints}
                                    disabled={isAdminMoney}
                                    className={`w-full py-6 rounded-xl font-black text-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all transform active:scale-95 mb-8 border-4 
                                    ${currentPoints === Infinity && !isAdminMoney
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 text-white animate-pulse' 
                                        : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'
                                    } ${isAdminMoney ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {currentPoints === Infinity ? 'ACTIVATED: INFINITE X' : 'DISABLED: INFINITE X'}
                                </button>

                                {/* Quick Add Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => handleAddSpecificPoints(1)}
                                        disabled={isAdminMoney || currentPoints === Infinity}
                                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg shadow-lg border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        + 1
                                    </button>
                                    <button 
                                        onClick={() => handleAddSpecificPoints(1000)}
                                        disabled={isAdminMoney || currentPoints === Infinity}
                                        className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-lg shadow-lg border-b-4 border-purple-800 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        + 1,000
                                    </button>
                                    <button 
                                        onClick={() => handleAddSpecificPoints(1000000)}
                                        disabled={isAdminMoney || currentPoints === Infinity}
                                        className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-lg shadow-lg border-b-4 border-orange-800 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        + 1 Million
                                    </button>
                                    <button 
                                        onClick={() => handleAddSpecificPoints(1000000000)}
                                        disabled={isAdminMoney || currentPoints === Infinity}
                                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-lg shadow-lg border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        + 1 Billion
                                    </button>
                                </div>
                                
                                <p className="text-xs text-gray-500 mt-6 uppercase tracking-widest">Administrative Financial System v9.0</p>
                            </div>
                        </div>
                    )}

                    {/* TESTES & COMANDOS (New Tab) */}
                    {activeTab === 'testes' && (
                        <div className="space-y-8 animate-fade-in">
                            <h2 className="text-2xl text-orange-400 mb-4 border-b border-gray-700 pb-2 font-bold">Test & Commands Area</h2>
                            
                            {/* House Spawner */}
                            <div className="bg-gray-800 p-6 rounded border border-orange-600/50">
                                <h3 className="text-xl font-bold text-orange-300 mb-4 flex items-center gap-2">
                                    🏠 Spawn Structures (Houses)
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">Click to force a structure to appear on the player's island.</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <button onClick={() => spawnHouse(21)} className="bg-gray-700 hover:bg-orange-600 text-white py-3 rounded font-bold transition-colors">Basic House</button>
                                    <button onClick={() => spawnHouse(13)} className="bg-gray-700 hover:bg-orange-600 text-white py-3 rounded font-bold transition-colors">City</button>
                                    <button onClick={() => spawnHouse(22)} className="bg-gray-700 hover:bg-orange-600 text-white py-3 rounded font-bold transition-colors">Mansion</button>
                                    <button onClick={() => spawnHouse(60)} className="bg-gray-700 hover:bg-orange-600 text-white py-3 rounded font-bold transition-colors">Castle</button>
                                    <button onClick={() => spawnHouse(61)} className="bg-gray-700 hover:bg-orange-600 text-white py-3 rounded font-bold transition-colors">Floating Island</button>
                                    <button onClick={() => spawnHouse(62)} className="bg-gray-700 hover:bg-orange-600 text-white py-3 rounded font-bold transition-colors">NASA Rocket</button>
                                    <button onClick={() => spawnHouse(124)} className="bg-gray-700 hover:bg-orange-600 text-white py-3 rounded font-bold transition-colors">Theme Park</button>
                                    <button onClick={() => onRevokeItem(99)} className="bg-gray-700 hover:bg-red-600 text-white py-3 rounded font-bold transition-colors border border-red-500">Reset Terrain</button>
                                </div>
                            </div>

                            {/* Event Spawner (Quick Access) */}
                            <div className="bg-gray-800 p-6 rounded border border-purple-600/50">
                                <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                                    ⚡ Spawn Special Events
                                </h3>
                                <div className="flex gap-2 flex-wrap">
                                    <button onClick={() => createPresetEvent('apoc')} className="flex-1 min-w-[150px] bg-red-900/80 hover:bg-red-700 text-white py-3 px-4 rounded font-bold border border-red-500 animate-pulse">
                                        🔥 APOCALYPSE
                                    </button>
                                    <button onClick={() => createPresetEvent('rain')} className="flex-1 min-w-[150px] bg-blue-900/80 hover:bg-blue-700 text-white py-3 px-4 rounded font-bold border border-blue-500">
                                        ⛈️ STORM
                                    </button>
                                    <button onClick={() => createPresetEvent('party')} className="flex-1 min-w-[150px] bg-pink-900/80 hover:bg-pink-700 text-white py-3 px-4 rounded font-bold border border-pink-500">
                                        🎉 SUPER PARTY
                                    </button>
                                    <button onClick={() => createPresetEvent('gold')} className="flex-1 min-w-[150px] bg-yellow-900/80 hover:bg-yellow-700 text-white py-3 px-4 rounded font-bold border border-yellow-500">
                                        💰 GOLD RAIN
                                    </button>
                                </div>
                            </div>

                            {/* Debug Commands */}
                            <div className="bg-gray-800 p-6 rounded border border-gray-600">
                                <h3 className="text-xl font-bold text-gray-300 mb-4 flex items-center gap-2">
                                    💻 Debug Commands
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button 
                                        onClick={onUnlockAllCharacters}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded font-bold shadow-lg"
                                    >
                                        🔓 Unlock All Characters
                                    </button>
                                    <button 
                                        onClick={() => { onUpdatePoints(0); onUpdateAccountType('Jogador'); }}
                                        className="bg-red-900 hover:bg-red-800 text-white py-3 px-6 rounded font-bold shadow-lg border border-red-700"
                                    >
                                        🧹 Clear Money & Rank
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VESTIARIO (FREE SHOP) */}
                    {activeTab === 'vestiario' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl text-white mb-4 border-b border-gray-700 pb-2">Admin Wardrobe (All Free)</h2>
                            <p className="text-gray-400 mb-4">Grab any item without spending points. Only for administration.</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {shopItems.map(item => (
                                    <button 
                                        key={item.id}
                                        onClick={() => {
                                            onGrantItem(item.id);
                                            alert(`Item ${item.name} added!`);
                                        }}
                                        className="bg-gray-800 p-3 rounded border border-gray-600 hover:border-green-500 hover:bg-gray-700 text-left transition-colors group"
                                    >
                                        <div className="text-xs text-gray-500">#{item.id}</div>
                                        <div className="font-bold text-white group-hover:text-green-400">{item.name}</div>
                                        <div className="text-xs text-green-500 font-bold mt-1">FREE (ADMIN)</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PETS */}
                    {activeTab === 'pets' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl text-white mb-4 border-b border-gray-700 pb-2">Pet Spawner</h2>
                            
                            <div className="bg-gray-800 p-6 rounded border border-purple-500 shadow-lg">
                                <h3 className="text-xl font-bold text-purple-300 mb-4">Manage Mini Pets</h3>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-gray-300">Current Amount:</span>
                                    <span className="text-3xl font-bold text-white bg-purple-900 px-4 py-2 rounded">{currentMiniPets}</span>
                                </div>
                                <input 
                                    type="range" min="0" max="10" 
                                    value={currentMiniPets}
                                    onChange={(e) => onUpdateMiniPets(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 mb-6"
                                />
                                <div className="flex gap-4">
                                    <button onClick={() => onUpdateMiniPets(currentMiniPets + 1)} className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded font-bold">+ Spawn Pet</button>
                                    <button onClick={() => onUpdateMiniPets(0)} className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-bold">Reset</button>
                                </div>
                            </div>

                            {/* SPECIAL PETS SECTION */}
                            <div className="bg-gray-800 p-6 rounded border border-blue-500 shadow-lg">
                                <h3 className="text-xl font-bold text-blue-300 mb-4">Special Pets (Admin)</h3>
                                <p className="text-gray-400 text-sm mb-4">Choose an exclusive pet to accompany the player.</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button 
                                        onClick={() => handleToggleSpecialPet(66666)}
                                        className={`py-4 rounded-lg font-bold border-2 transition-all ${activeUpgrades.includes(66666) ? 'bg-red-900 border-red-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'}`}
                                    >
                                        <div className="text-2xl mb-2">👹</div>
                                        Pet 66666
                                    </button>
                                    <button 
                                        onClick={() => handleToggleSpecialPet(6667)}
                                        className={`py-4 rounded-lg font-bold border-2 transition-all ${activeUpgrades.includes(6667) ? 'bg-cyan-900 border-cyan-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'}`}
                                    >
                                        <div className="text-2xl mb-2">🤖</div>
                                        Pet 6667
                                    </button>
                                    <button 
                                        onClick={() => handleToggleSpecialPet(9000)}
                                        className={`py-4 rounded-lg font-bold border-2 transition-all ${activeUpgrades.includes(9000) ? 'bg-blue-900 border-red-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'}`}
                                    >
                                        <div className="text-2xl mb-2">🍄</div>
                                        Pet Mario
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SISTEMA */}
                    {activeTab === 'sistema' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl text-white mb-4 border-b border-gray-700 pb-2">System Settings</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Admin Powers */}
                                <div className="bg-gray-800 p-4 rounded border border-indigo-500">
                                    <h3 className="text-lg mb-4 text-indigo-400 font-bold">Admin Powers</h3>
                                    
                                    <label className="flex items-center justify-between p-3 bg-gray-900 rounded mb-2 cursor-pointer hover:bg-gray-700">
                                        <span className="text-white">Flight Mode (Character)</span>
                                        <input 
                                            type="checkbox" 
                                            checked={isFlying} 
                                            onChange={(e) => onSetFlying(e.target.checked)} 
                                            className="w-6 h-6 accent-indigo-500"
                                        />
                                    </label>

                                    <label className="flex items-center justify-between p-3 bg-gray-900 rounded mb-2 cursor-pointer hover:bg-gray-700">
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold">Max Security</span>
                                            <span className="text-xs text-gray-500">Prevents you from being banned</span>
                                        </div>
                                        <input 
                                            type="checkbox" 
                                            checked={adminImmunity} 
                                            onChange={(e) => onSetAdminImmunity(e.target.checked)} 
                                            className="w-6 h-6 accent-green-500"
                                        />
                                    </label>
                                </div>

                                <div className="bg-gray-800 p-4 rounded border border-gray-700">
                                    <h3 className="text-lg mb-2 text-orange-400">Character Control</h3>
                                    <label className="block text-gray-400 mb-1 text-sm">Force current player character:</label>
                                    <select onChange={(e) => onForceCharacterChange(e.target.value as CharacterType)} className="bg-gray-900 border border-gray-600 p-2 rounded w-full mb-2">
                                        <option value="">Select...</option>
                                        {STANDARD_CHARS.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="bg-red-900/20 p-4 rounded border border-red-800 mt-8">
                                <h3 className="text-red-500 font-bold mb-2">⚠️ DANGER ZONE</h3>
                                <button onClick={onResetGame} className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded font-bold w-full">RESET FULL GAME</button>
                            </div>
                        </div>
                    )}

                    {/* LOJA (Edit Prices) */}
                    {activeTab === 'loja' && (
                         <div className="space-y-8">
                            <h2 className="text-2xl text-white mb-4 border-b border-gray-700 pb-2">Manage Shop</h2>
                            <div className="bg-gray-800 p-4 rounded border border-gray-700">
                                <h3 className="text-xl mb-4 text-yellow-400">Add New Product</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <input placeholder="Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="bg-gray-900 p-2 rounded border border-gray-600" />
                                    <input placeholder="Description" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} className="bg-gray-900 p-2 rounded border border-gray-600" />
                                    <input type="number" placeholder="Cost" value={newItem.cost || ''} onChange={e => setNewItem({...newItem, cost: parseFloat(e.target.value)})} className="bg-gray-900 p-2 rounded border border-gray-600" />
                                    <input placeholder="Emoji (optional)" value={newItem.emoji} onChange={e => setNewItem({...newItem, emoji: e.target.value})} className="bg-gray-900 p-2 rounded border border-gray-600" />
                                </div>
                                <button onClick={handleAddItem} className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold">Create Item</button>
                            </div>
                            <div>
                                <h3 className="text-xl mb-4 text-gray-400">Edit Existing Prices</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {shopItems.map(item => (
                                        <div key={item.id} className="bg-gray-800 p-3 rounded flex flex-col gap-2 border border-gray-700">
                                            <div className="flex justify-between items-center"><div className="font-bold text-sm truncate">{item.name} <span className="text-gray-500 text-xs">#{item.id}</span></div></div>
                                            <div className="flex items-center gap-2 mt-auto">
                                                <span className="text-yellow-500 text-sm">$</span>
                                                <input type="number" value={item.cost} onChange={(e) => handlePriceChange(item.id, e.target.value)} className="bg-gray-900 w-full p-1 text-sm rounded border border-gray-600"/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* QUESTÕES */}
                    {activeTab === 'questoes' && (
                        <div className="bg-gray-800 p-6 rounded border border-gray-700 max-w-2xl">
                             <h3 className="text-xl mb-6 text-blue-400">Create New Question</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <select value={newQuestion.subject} onChange={e => setNewQuestion({...newQuestion, subject: e.target.value as Subject, topic: ''})} className="bg-gray-900 p-2 rounded border border-gray-600">
                                        <option value="mathematics">Mathematics</option>
                                        <option value="portuguese">Portuguese</option>
                                        <option value="english">English</option>
                                    </select>
                                    <select value={newQuestion.difficulty} onChange={e => setNewQuestion({...newQuestion, difficulty: e.target.value as Difficulty})} className="bg-gray-900 p-2 rounded border border-gray-600">
                                        <option value="Fichinha">Easy</option>
                                        <option value="Eu me Viro">Medium</option>
                                        <option value="Desafiador">Hard</option>
                                    </select>
                                </div>
                                <select value={newQuestion.topic} onChange={e => setNewQuestion({...newQuestion, topic: e.target.value})} className="w-full bg-gray-900 p-2 rounded border border-gray-600">
                                    <option value="">Select Topic...</option>
                                    {TOPIC_DATA[newQuestion.subject].map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                                </select>
                                <textarea placeholder="Question Text" value={newQuestion.problem} onChange={e => setNewQuestion({...newQuestion, problem: e.target.value})} className="w-full bg-gray-900 p-2 rounded border border-gray-600 h-24"/>
                                <div className="grid grid-cols-2 gap-4">
                                    <input placeholder="Correct Answer" value={newQuestion.correctAnswer} onChange={e => setNewQuestion({...newQuestion, correctAnswer: e.target.value})} className="bg-green-900/30 border-green-700 bg-gray-900 p-2 rounded border" />
                                    <input placeholder="Wrong 1" value={newQuestion.wrong1} onChange={e => setNewQuestion({...newQuestion, wrong1: e.target.value})} className="bg-red-900/30 border-red-700 bg-gray-900 p-2 rounded border" />
                                    <input placeholder="Wrong 2" value={newQuestion.wrong2} onChange={e => setNewQuestion({...newQuestion, wrong2: e.target.value})} className="bg-red-900/30 border-red-700 bg-gray-900 p-2 rounded border" />
                                    <input placeholder="Wrong 3" value={newQuestion.wrong3} onChange={e => setNewQuestion({...newQuestion, wrong3: e.target.value})} className="bg-red-900/30 border-red-700 bg-gray-900 p-2 rounded border" />
                                </div>
                                <button onClick={handleAddQuestion} className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-bold">Save Question</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* MANAGEMENT MODAL */}
            {manageUser && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[110] animate-fade-in backdrop-blur-sm">
                    <div className="bg-gray-800 border-2 border-gray-600 rounded-xl p-6 w-full max-w-lg shadow-2xl relative overflow-y-auto max-h-[90vh]">
                        <button onClick={closeManageModal} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold">X</button>
                        
                        <h2 className="text-2xl font-bold text-white mb-1">Manage: <span className="text-teal-400">{manageUser.username}</span></h2>
                        <p className="text-xs text-gray-500 mb-6 font-mono uppercase tracking-widest">{isManagingSelf ? '(Your Account)' : '(Simulated DB)'}</p>

                        <div className="space-y-6">
                            
                            {/* Bank Account */}
                            <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-xl border border-yellow-600 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-20 text-6xl text-yellow-500">🏦</div>
                                <h3 className="text-yellow-500 text-sm font-bold uppercase tracking-wider mb-1">Bank Account</h3>
                                <p className="text-3xl text-white font-mono font-bold mb-4">
                                    {isAdminMoney && isManagingSelf ? 'ADMIN' : manageUser.points === Infinity ? '∞ INFINITE' : manageUser.points.toLocaleString('pt-BR')}
                                </p>
                                <div className="flex gap-2 text-xs">
                                    <span className="bg-gray-800 px-2 py-1 rounded text-gray-400">ID: {Math.floor(Math.random()*99999)}</span>
                                    <span className="bg-gray-800 px-2 py-1 rounded text-gray-400">Status: {manageUser.status}</span>
                                </div>
                            </div>

                            {/* Passes and Powers */}
                            <div className="bg-gray-900/50 p-4 rounded border border-gray-700">
                                <h3 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
                                    🔮 Passes and Powers
                                </h3>
                                
                                {/* Infinite Money Toggle */}
                                <div className="flex justify-between items-center mb-4 p-2 bg-gray-800 rounded">
                                    <span className="text-sm text-yellow-300 font-bold">Infinite Money X</span>
                                    <button 
                                        onClick={handleToggleInfinite}
                                        className={`px-4 py-1 rounded font-bold text-xs ${manageUser.isInfinite ? 'bg-green-500 text-black' : 'bg-red-900 text-red-300'}`}
                                    >
                                        {manageUser.isInfinite ? 'ACTIVATED' : 'DISABLED'}
                                    </button>
                                </div>

                                {/* Game Passes */}
                                <div className="grid grid-cols-2 gap-2">
                                    <button 
                                        onClick={() => handleGrantPass('VIP')} 
                                        className={`py-2 rounded border border-yellow-600 text-yellow-500 font-bold hover:bg-yellow-900/50 ${manageUser.role === 'VIP' ? 'bg-yellow-900/80 ring-2 ring-yellow-500' : ''}`}
                                    >
                                        Grant VIP
                                    </button>
                                    <button 
                                        onClick={() => handleGrantPass('Admin')} 
                                        className={`py-2 rounded border border-red-600 text-red-500 font-bold hover:bg-red-900/50 ${manageUser.role === 'Admin' ? 'bg-red-900/80 ring-2 ring-red-500' : ''}`}
                                    >
                                        Grant Admin
                                    </button>
                                </div>
                            </div>

                            {/* Punishments */}
                            <div className="bg-red-900/20 p-4 rounded border border-red-800">
                                <h3 className="text-red-500 font-bold mb-3">⚖️ Punishments</h3>
                                <button 
                                    onClick={handleToggleBan}
                                    className={`w-full py-3 rounded font-bold transition-colors ${manageUser.status === 'Ativo' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                                >
                                    {manageUser.status === 'Ativo' ? 'BAN PLAYER' : 'REMOVE BAN'}
                                </button>
                                {manageUser.status === 'Ativo' && (
                                    <p className="text-xs text-red-400 mt-2 text-center">
                                        This action will prevent access to the account immediately.
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
