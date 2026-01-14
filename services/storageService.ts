
import { Upgrade, Problem, GameEvent, CharacterType } from '../types';
import { UPGRADES as DEFAULT_UPGRADES } from '../components/StoreScreen';

const KEYS = {
    CUSTOM_QUESTIONS: 'admin_custom_questions',
    SHOP_OVERRIDES: 'admin_shop_overrides', // Changes to prices
    CUSTOM_ITEMS: 'admin_custom_items', // New items
    CUSTOM_EVENTS: 'admin_custom_events',
    CUSTOM_CHARACTERS: 'admin_custom_characters'
};

export const adminStorage = {
    // --- Questions ---
    getCustomQuestions: (): Problem[] => {
        const data = localStorage.getItem(KEYS.CUSTOM_QUESTIONS);
        return data ? JSON.parse(data) : [];
    },
    addQuestion: (question: Problem) => {
        const current = adminStorage.getCustomQuestions();
        const updated = [...current, question];
        localStorage.setItem(KEYS.CUSTOM_QUESTIONS, JSON.stringify(updated));
    },

    // --- Shop ---
    getShopItems: (): Upgrade[] => {
        // 1. Get Default
        let items = [...DEFAULT_UPGRADES];
        
        // 2. Apply Overrides (Price changes)
        const overrides = JSON.parse(localStorage.getItem(KEYS.SHOP_OVERRIDES) || '{}');
        items = items.map(item => {
            if (overrides[item.id] !== undefined) {
                return { ...item, cost: overrides[item.id] };
            }
            return item;
        });

        // 3. Add Custom Items
        const customItems = JSON.parse(localStorage.getItem(KEYS.CUSTOM_ITEMS) || '[]');
        return [...items, ...customItems];
    },
    updateItemPrice: (id: number, newCost: number) => {
        const overrides = JSON.parse(localStorage.getItem(KEYS.SHOP_OVERRIDES) || '{}');
        overrides[id] = newCost;
        localStorage.setItem(KEYS.SHOP_OVERRIDES, JSON.stringify(overrides));
    },
    addCustomItem: (item: Upgrade) => {
        const customItems = JSON.parse(localStorage.getItem(KEYS.CUSTOM_ITEMS) || '[]');
        localStorage.setItem(KEYS.CUSTOM_ITEMS, JSON.stringify([...customItems, item]));
    },

    // --- Events ---
    getEvents: (): GameEvent[] => {
        return JSON.parse(localStorage.getItem(KEYS.CUSTOM_EVENTS) || '[]');
    },
    saveEvents: (events: GameEvent[]) => {
        localStorage.setItem(KEYS.CUSTOM_EVENTS, JSON.stringify(events));
    },

    // --- Characters ---
    getCustomCharacters: (): { id: string, name: string, emoji: string }[] => {
        return JSON.parse(localStorage.getItem(KEYS.CUSTOM_CHARACTERS) || '[]');
    },
    addCustomCharacter: (char: { id: string, name: string, emoji: string }) => {
        const current = adminStorage.getCustomCharacters();
        localStorage.setItem(KEYS.CUSTOM_CHARACTERS, JSON.stringify([...current, char]));
    }
};
