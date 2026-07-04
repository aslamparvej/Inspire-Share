import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

import { deleteQuote } from "../services/appwriteQuotes";

const SavedQuoteCard = ({ item }) => {

    const handleDeleteCaption = async (id) => {
        try {
            await deleteQuote(id);
            Alert.alert('Delete Successfully');
        } catch (error) {
            Alert.alert('Failed to delete', error.message);
        }
    }

    return (
        <View style={styles.card} key={item.$id}>
            <TouchableOpacity
                style={styles.captionContent}
                onPress={() => {
                    Clipboard.setStringAsync(item.text);
                }}
                activeOpacity={0.7}
            >
                <Ionicons name="copy-outline" size={18} color="#666" style={styles.copyIcon} />
                <Text style={styles.cardText} numberOfLines={2}>
                    {item.text}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleDeleteCaption(item.$id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Ionicons name="trash-outline" size={20} color="#ff4444" />
            </TouchableOpacity>
        </View>
    );
}

export default SavedQuoteCard;


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginTop: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    captionContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    copyIcon: {
        marginTop: 2,
    },
    cardText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        flex: 1,
    },
});