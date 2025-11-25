import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHabits } from '../context/HabitContext';
import XPBar from '../components/XPBar';
import HabitItem from '../components/HabitItem';
import AddHabitModal from '../components/AddHabitModal';
import { colors, spacing, typography } from '../utils/theme';

const HomeScreen = () => {
    const { habits, user, addHabit, completeHabit } = useHabits();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hello, Hero!</Text>
                <XPBar user={user} />
            </View>

            <View style={styles.content}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Today's Quests</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Ionicons name="add-circle" size={32} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={habits}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <HabitItem habit={item} onComplete={completeHabit} />
                    )}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No active quests. Add one to start your journey!</Text>
                    }
                />
            </View>

            <AddHabitModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAdd={addHabit}
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
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    greeting: {
        ...typography.header,
        marginBottom: spacing.s,
    },
    content: {
        flex: 1,
        padding: spacing.l,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.m,
    },
    sectionTitle: {
        ...typography.subheader,
    },
    listContent: {
        paddingBottom: 80,
    },
    emptyText: {
        ...typography.body,
        textAlign: 'center',
        marginTop: spacing.xl,
        opacity: 0.7,
    },
});

export default HomeScreen;
