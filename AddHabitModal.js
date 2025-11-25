import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, spacing, typography } from '../utils/theme';

const AddHabitModal = ({ visible, onClose, onAdd }) => {
    const [title, setTitle] = useState('');

    const handleAdd = () => {
        if (title.trim()) {
            onAdd(title);
            setTitle('');
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.centeredView}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>New Habit</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="What do you want to track?"
                        placeholderTextColor={colors.textSecondary}
                        value={title}
                        onChangeText={setTitle}
                        autoFocus
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAdd}>
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '85%',
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: spacing.l,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        ...typography.header,
        fontSize: 24,
        marginBottom: spacing.l,
    },
    input: {
        width: '100%',
        backgroundColor: colors.surface,
        color: colors.text,
        padding: spacing.m,
        borderRadius: 10,
        marginBottom: spacing.l,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: spacing.m,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: spacing.s,
    },
    cancelButton: {
        backgroundColor: colors.surface,
    },
    addButton: {
        backgroundColor: colors.primary,
    },
    buttonText: {
        ...typography.subheader,
        fontSize: 16,
    },
});

export default AddHabitModal;
