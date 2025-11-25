import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHabits } from '../context/HabitContext';
import { colors, spacing, typography } from '../utils/theme';

const HabitsScreen = () => {
    const { habits, deleteHabit } = useHabits();

    const confirmDelete = (id) => {
        Alert.alert(
            "Delete Quest",
            "Are you sure you want to abandon this quest?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => deleteHabit(id) }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.stats}>Current Streak: {item.streak} days</Text>
            </View>
            <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={24} color={colors.error} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Quest Log</Text>
            </View>

            <FlatList
                data={habits}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No quests found.</Text>
                }
            />
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
    listContent: {
        padding: spacing.l,
    },
    itemContainer: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: spacing.m,
        marginBottom: spacing.m,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    info: {
        flex: 1,
    },
    title: {
        ...typography.subheader,
        marginBottom: 4,
    },
    stats: {
        ...typography.body,
        fontSize: 14,
    },
    deleteButton: {
        padding: spacing.s,
    },
    emptyText: {
        ...typography.body,
        textAlign: 'center',
        marginTop: spacing.xl,
        opacity: 0.7,
    },
});

export default HabitsScreen;
