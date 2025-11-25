import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../utils/theme';

const XPBar = ({ user }) => {
    const maxXp = user.level * 100;
    const progress = Math.min(user.xp / maxXp, 1);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.levelText}>Level {user.level}</Text>
                <Text style={styles.xpText}>{user.xp} / {maxXp} XP</Text>
            </View>
            <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: spacing.m,
        width: '100%',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.s,
    },
    levelText: {
        ...typography.subheader,
        color: colors.primary,
    },
    xpText: {
        ...typography.body,
        fontWeight: 'bold',
    },
    barBackground: {
        height: 12,
        backgroundColor: colors.surface,
        borderRadius: 6,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 6,
    },
});

export default XPBar;
