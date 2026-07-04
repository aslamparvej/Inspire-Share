import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { saveCaption } from "../services/appwriteCaptions";
import { getUserDetails } from "../services/appwriteAuth";

function HashtagScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hashtag Generator</Text>

            <View style={styles.pickerBox}>
                <Text style={styles.label}>
                    Coming soon.
                </Text>
            </View>
        </View>
    );
}

export default HashtagScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffe6f2', alignItems: 'center', justifyContent: 'center', padding: 20 },
    title: { fontSize: 26, fontWeight: '700', marginBottom: 12, color: '#ff3399' },
    pickerBox: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 18, width: '100%', shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 4 },
    label: { fontSize: 14, marginBottom: 6, color: '#333', fontWeight: '600', textAlign: 'center' },
    picker: { height: 56, width: '100%', borderColor: '#eee', borderWidth: 1 },
    box: { backgroundColor: '#fff', borderRadius: 14, padding: 18, marginBottom: 12, minWidth: '100%', shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 4 },
    quote: { fontSize: 18, textAlign: 'center', color: '#333' },
    input: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginTop: 6, borderColor: '#eee', borderWidth: 1 },
    primaryBtn: { backgroundColor: '#ff66b2', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, marginTop: 8 },
    btnText: { color: '#fff', fontWeight: '700' },
    secondaryBtn: { backgroundColor: '#ff99cc', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 },
});