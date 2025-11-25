import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../utils/theme';

const HabitItem = ({ habit, onComplete }) => {
    const today = new Date().toISOString().split('T')[0];
    const isCompleted = habit.completedDates.includes(today);

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.title}>{habit.title}</Text>
                <View style={styles.streakContainer}>
                    <Ionicons name="flame" size={16} color={colors.secondary} />
                    <Text style={styles.streakText}>{habit.streak} days</Text>
                </View>
            </View>

            <TouchableOpacity
                style={[styles.checkbox, isCompleted && styles.checked]}
                onPress={() => onComplete(habit.id)}
                disabled={isCompleted}
            >
                {isCompleted && <Ionicons name="checkmark" size={20} color="#FFF" />}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: spacing.m,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.m,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    info: {
        flex: 1,
    },
    title: {
        ...typography.subheader,
        marginBottom: 4,
    },
    streakContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    streakText: {
        ...typography.body,
        marginLeft: 4,
        fontSize: 14,
    },
    checkbox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        backgroundColor: colors.primary,
    },
});

export default HabitItem;
