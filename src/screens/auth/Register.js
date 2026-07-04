import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Client, Account, ID, Models } from 'react-native-appwrite';
import { EXPO_PUBLIC_APPWRITE_PROJECT_ID, EXPO_PUBLIC_APPWRITE_ENDPOINT, EXPO_PUBLIC_APPWRITE_PROJECT_NAME } from '@env';

const client = new Client()
  .setEndpoint(`${EXPO_PUBLIC_APPWRITE_ENDPOINT}`)
  .setProject(`${EXPO_PUBLIC_APPWRITE_PROJECT_ID}`)
  .setPlatform(`${EXPO_PUBLIC_APPWRITE_PROJECT_NAME}`);

const account = new Account(client);

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Create new user account
      await account.create(ID.unique(), email, password, name);

      // Auto-login after signup
      await account.createEmailPasswordSession(email, password);

      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('MainTabs'); // go to main app
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Captify ✨</Text>
      <Text style={styles.subtitle}>Create an account to get started</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff3399',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  primaryBtn: {
    backgroundColor: '#ff3399',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  link: {
    color: '#ff3399',
    fontSize: 14,
    textAlign: 'center',
  },
});
