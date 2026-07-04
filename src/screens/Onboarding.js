import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Onboarding({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to captify ✨</Text>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}>Generate AI-powered social captions and quotes — pretty, quick & ready to share.</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, }}>
        <TouchableOpacity style={[styles.primaryBtn, {flex: 1}]} onPress={() => navigation.replace('Login')}>
          <Text style={[styles.btnText, {textAlign: 'center'}]}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.ghostBtn, {flex: 1}]} onPress={() => navigation.replace('MainTabs')}>
          <Text style={{ color: '#ff3399', textAlign: 'center' }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Onboarding;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffe6f2', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 12, color: '#ff3399' },
  primaryBtn: { backgroundColor: '#ff66b2', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, marginTop: 8 },
  ghostBtn: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, marginTop: 8, borderWidth: 1, borderColor: '#ff66b2' },
});