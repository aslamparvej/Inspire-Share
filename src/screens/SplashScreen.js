import React, {useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { checkLogin } from "../services/appwriteAuth";


function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkUser = async () => {
      const user = await checkLogin();
      setTimeout(() => {
        if (user) {
          navigation.replace("MainTabs"); // ✅ if logged in → go main
        } else {
          navigation.replace("Onboarding"); // ❌ if not logged in → onboarding
        }
      }, 1400); // splash delay
    };

    checkUser();
  }, []);

  return (
    <View style={[styles.center, { backgroundColor: '#ff66b2' }]}> 
      <Ionicons name="heart" size={90} color="#fff" />
      <Text style={styles.splashTitle}>Captify</Text>
      <Text style={styles.splashSubtitle}>AI Captions & Quotes</Text>
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  splashTitle: { fontSize: 36, fontWeight: '800', color: '#fff', marginTop: 10 },
  splashSubtitle: { color: '#fff', marginTop: 6 },
});