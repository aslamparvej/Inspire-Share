import React, { useState, useEffect } from "react";

import { Text, View, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import * as Clipboard from 'expo-clipboard';

import axios from "axios";
import { OPENAI_API_KEY } from '@env';

import { saveQuote } from "../services/appwriteQuotes";
import { getUserDetails } from "../services/appwriteAuth";

function QuotesScreen({ navigation }) {
  const [quote, setQuote] = useState('Pick a category & generate your quote ✨');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('Motivation');
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUserDetails();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const fetchQuote = async (cat = category) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a wise and inspiring quote generator. Reply with one short uplifting quote.' },
            { role: 'user', content: `Give me a unique  short ${cat} quote. Don’t repeat previous ones. Every quote must be unique. The quote should be in ${language}.` },
          ],
          max_tokens: 120,
        },
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}` },
        }
      );

      const aiQuote = response.data.choices?.[0]?.message?.content?.trim() || 'Sorry, no quote right now.';
      setQuote(aiQuote);
    } catch (err) {
      console.error(err);
      setQuote("Oops! Couldn't fetch an AI quote 😢");
    } finally {
      setLoading(false);
    }
  };


  const saveQuoteHandler = async () => {
    try {
      if (!user) {
        Alert.alert("Login Required", "Please log in to save quote.");
        return;
      }
      if (!quote) {
        Alert.alert("Quote Required", "Please generate quote to save.");
        return;
      }

      await saveQuote(quote, user.$id);

      Alert.alert("Success", "Quote saved to favorites!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Quote Generator 💫</Text>

      <View style={styles.pickerBox}>
        <Text style={styles.label}>Choose Category:</Text>
        <Picker selectedValue={category} style={styles.picker} onValueChange={(v) => setCategory(v)}>
          <Picker.Item label="Motivation 💪" value="Motivation" />
          <Picker.Item label="Love ❤️" value="Love" />
          <Picker.Item label="Tech 💻" value="Tech" />
          <Picker.Item label="Funny 😂" value="Funny" />
        </Picker>

        <Text style={styles.label}>Language</Text>
        <Picker selectedValue={language} style={styles.picker} onValueChange={(v) => setLanguage(v)}>
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Hindi" value="Hindi" />
          <Picker.Item label="Bengali" value="Bengali" />
        </Picker>
      </View>

      <View style={styles.box}>
        {loading ? <ActivityIndicator size="large" color="#ff66b2" /> : <Text style={styles.quote}>{quote}</Text>}
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={() => fetchQuote()}>
        <Text style={styles.btnText}>✨ Generate Quote</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => Clipboard.setStringAsync(quote)}>
          <Text style={styles.btnText}>📋 Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={saveQuoteHandler}>
          <Text style={styles.btnText}>💾 Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default QuotesScreen;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffe6f2', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 12, color: '#ff3399' },
  pickerBox: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 18, width: '100%', shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 4 },
  label: { fontSize: 14, marginBottom: 6, color: '#333', fontWeight: '600' },
  picker: { height: 56, width: '100%', borderColor: '#eee', borderWidth: 1 },
  box: { backgroundColor: '#fff', borderRadius: 14, padding: 18, marginBottom: 12, minWidth: '100%', shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 4 },
  quote: { fontSize: 18, textAlign: 'center', color: '#333' },
  primaryBtn: { backgroundColor: '#ff66b2', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, marginTop: 8 },
  btnText: { color: '#fff', fontWeight: '700' },
  secondaryBtn: { backgroundColor: '#ff99cc', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 },
});
