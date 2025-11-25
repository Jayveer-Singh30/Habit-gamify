import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHabits } from '../context/HabitContext';
import { colors, spacing, typography } from '../utils/theme';

const StatsScreen = () => {
    const { user, habits } = useHabits();

    const totalCompletions = habits.reduce((acc, habit) => acc + habit.completedDates.length, 0);
    const bestStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Hero Stats</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.statCard}>
                    <Ionicons name="trophy" size={40} color="#FFD700" />
                    <Text style={styles.statValue}>{user.level}</Text>
                    <Text style={styles.statLabel}>Current Level</Text>
                </View>

                <View style={styles.row}>
                    <View style={[styles.statCard, styles.halfCard]}>
                        <Ionicons name="star" size={32} color={colors.primary} />
                        <Text style={styles.statValue}>{user.xp}</Text>
                        <Text style={styles.statLabel}>Total XP</Text>
                    </View>

                    <View style={[styles.statCard, styles.halfCard]}>
                        <Ionicons name="flame" size={32} color={colors.secondary} />
                        <Text style={styles.statValue}>{bestStreak}</Text>
                        <Text style={styles.statLabel}>Best Streak</Text>
                    </View>
                </View>

                <View style={styles.statCard}>
                    <Ionicons name="checkmark-circle" size={40} color={colors.success} />
                    <Text style={styles.statValue}>{totalCompletions}</Text>
                    <Text style={styles.statLabel}>Total Quests Completed</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: spacing.l,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    headerTitle: {
        ...typography.header,
    },
    content: {
        padding: spacing.l,
    },
    statCard: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: spacing.l,
        alignItems: 'center',
        marginBottom: spacing.m,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfCard: {
        width: '48%',
    },
    statValue: {
        ...typography.header,
        fontSize: 32,
        marginTop: spacing.s,
        marginBottom: 4,
    },
    statLabel: {
        ...typography.body,
        fontSize: 14,
    },
});

export default StatsScreen;
