import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HabitContext = createContext();

export const useHabits = () => useContext(HabitContext);

export const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);
    const [user, setUser] = useState({ xp: 0, level: 1 });
    const [loading, setLoading] = useState(true);

    // Load data from storage
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedHabits = await AsyncStorage.getItem('habits');
                const storedUser = await AsyncStorage.getItem('user');

                if (storedHabits) setHabits(JSON.parse(storedHabits));
                if (storedUser) setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to load data", e);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Save data to storage whenever it changes
    useEffect(() => {
        const saveData = async () => {
            try {
                await AsyncStorage.setItem('habits', JSON.stringify(habits));
                await AsyncStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.error("Failed to save data", e);
            }
        };
        if (!loading) {
            saveData();
        }
    }, [habits, user, loading]);

    const addHabit = (title) => {
        const newHabit = {
            id: Date.now().toString(),
            title,
            streak: 0,
            completedDates: [], // Array of ISO date strings YYYY-MM-DD
            xpReward: 10,
        };
        setHabits([...habits, newHabit]);
    };

    const deleteHabit = (id) => {
        setHabits(habits.filter(h => h.id !== id));
    };

    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    const completeHabit = (id) => {
        const today = getTodayDate();

        setHabits(prevHabits => {
            return prevHabits.map(habit => {
                if (habit.id === id) {
                    if (habit.completedDates.includes(today)) return habit; // Already completed

                    const isStreak = habit.completedDates.includes(getYesterdayDate());
                    const newStreak = isStreak ? habit.streak + 1 : 1;

                    // Award XP
                    addXp(habit.xpReward);

                    return {
                        ...habit,
                        streak: newStreak,
                        completedDates: [...habit.completedDates, today]
                    };
                }
                return habit;
            });
        });
    };

    const getYesterdayDate = () => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date.toISOString().split('T')[0];
    };

    const addXp = (amount) => {
        setUser(prev => {
            const newXp = prev.xp + amount;
            const nextLevelXp = prev.level * 100; // Simple level curve
            if (newXp >= nextLevelXp) {
                return { xp: newXp - nextLevelXp, level: prev.level + 1 };
            }
            return { ...prev, xp: newXp };
        });
    };

    return (
        <HabitContext.Provider value={{ habits, user, addHabit, deleteHabit, completeHabit, loading }}>
            {children}
        </HabitContext.Provider>
    );
};
