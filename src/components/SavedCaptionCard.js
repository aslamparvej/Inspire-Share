import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';


const SavedCaptionCard = ({ caption, onDelete }) => {

    return (
        <View style={styles.card} key={caption.$id}>
            <TouchableOpacity
                style={styles.captionContent}
                onPress={() => {
                    Clipboard.setStringAsync(caption.text);
                }}
                activeOpacity={0.7}
            >
                <Ionicons name="copy-outline" size={18} color="#666" style={styles.copyIcon} />
                <Text style={styles.cardText} numberOfLines={2}>
                    {caption.text}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => onDelete(caption.$id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Ionicons name="trash-outline" size={20} color="#ff4444" />
            </TouchableOpacity>
        </View>
    );
}

export default SavedCaptionCard;


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