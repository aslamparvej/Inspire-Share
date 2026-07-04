import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { OPENAI_API_KEY } from '@env';
import * as Clipboard from 'expo-clipboard';

import { saveCaption } from "../services/appwriteCaptions";
import { getUserDetails } from "../services/appwriteAuth";

function CaptionsScreen() {
    const [platform, setPlatform] = useState('Instagram');
    const [language, setLanguage] = useState('English');
    const [topic, setTopic] = useState('traveling to a beach');
    const [caption, setCaption] = useState('Pick a platform & generate caption ✨');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getUserDetails();
            setUser(currentUser);
        };
        fetchUser();
    }, []);

    const generateCaption = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: 'You are a creative social media content writer.' },
                        { role: 'user', content: `Write a catchy ${platform} caption about ${topic}. If Instagram, add 5 relevant hashtags. Don’t repeat previous ones. Every caption must be unique. The caption should be in ${language}.` },
                    ],
                    max_tokens: 120,
                },
                { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}` } }
            );

            const aiCaption = response.data.choices?.[0]?.message?.content?.trim() || "Couldn't create caption.";
            setCaption(aiCaption);
        } catch (err) {
            console.error(err);
            setCaption("Oops! Couldn't generate a caption 😢");
        } finally {
            setLoading(false);
        }
    };

    const saveCaptionHandler = async () => {
        try {
            if (!user) {
                Alert.alert("Login Required", "Please log in to save caption.");
                return;
            }
            if (!caption) {
                Alert.alert("Caption Required", "Please generate caption to save.");
                return;
            }

            await saveCaption(caption, user.$id);

            Alert.alert("Success", "Caption saved to favorites!");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📱 Social Media Captions</Text>

            <View style={styles.pickerBox}>
                <Text style={styles.label}>Platform</Text>
                <Picker selectedValue={platform} style={styles.picker} onValueChange={(v) => setPlatform(v)}>
                    <Picker.Item label="Instagram 📸" value="Instagram" />
                    <Picker.Item label="Facebook 📘" value="Facebook" />
                    <Picker.Item label="YouTube 🎥" value="YouTube" />
                    <Picker.Item label="Twitter 🐦" value="Twitter" />
                </Picker>

                <Text style={styles.label}>Language</Text>
                <Picker selectedValue={language} style={styles.picker} onValueChange={(v) => setLanguage(v)}>
                    <Picker.Item label="English" value="English" />
                    <Picker.Item label="Hindi" value="Hindi" />
                    <Picker.Item label="Bengali" value="Bengali" />
                </Picker>

                <Text style={[styles.label, { marginTop: 8 }]}>Topic</Text>
                <TextInput style={styles.input} value={topic} onChangeText={setTopic} placeholder="Describe the photo/topic" />
            </View>

            <View style={styles.box}>
                {loading ? <ActivityIndicator size="large" color="#ff66b2" /> : <Text style={styles.quote}>{caption}</Text>}
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={generateCaption}>
                <Text style={styles.btnText}>✨ Generate Caption</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                <TouchableOpacity style={styles.secondaryBtn} onPress={() => Clipboard.setStringAsync(caption)}>
                    <Text style={styles.btnText}>📋 Copy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryBtn} onPress={saveCaptionHandler}>
                    <Text style={styles.btnText}>💾 Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CaptionsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffe6f2', alignItems: 'center', justifyContent: 'center', padding: 20 },
    title: { fontSize: 26, fontWeight: '700', marginBottom: 12, color: '#ff3399' },
    pickerBox: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 18, width: '100%', shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 4 },
    label: { fontSize: 14, marginBottom: 6, color: '#333', fontWeight: '600' },
    picker: { height: 56, width: '100%', borderColor: '#eee', borderWidth: 1 },
    box: { backgroundColor: '#fff', borderRadius: 14, padding: 18, marginBottom: 12, minWidth: '100%', shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 4 },
    quote: { fontSize: 18, textAlign: 'center', color: '#333' },
    input: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginTop: 6, borderColor: '#eee', borderWidth: 1 },
    primaryBtn: { backgroundColor: '#ff66b2', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, marginTop: 8 },
    btnText: { color: '#fff', fontWeight: '700' },
    secondaryBtn: { backgroundColor: '#ff99cc', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 },
});