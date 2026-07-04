import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getUserDetails, logoutUser } from '../services/appwriteAuth';
import { getUserCaptions } from '../services/appwriteCaptions';
import { getUserQuotes } from '../services/appwriteQuotes';

import SavedCaptionCard from '../components/SavedCaptionCard';
import { deleteCaption } from "../services/appwriteCaptions";
import { deleteQuote } from '../services/appwriteQuotes';

const UserScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [savedCaptions, setSavedCaptions] = useState([]);
    const [savedQuotes, setSavedQuotes] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchUser = async () => {
                setLoading(true);
                try {
                    const userData = await getUserDetails();
                    setUser(userData);

                    if (userData) {
                        const captionsData = await getUserCaptions(userData.$id);
                        const quotesData = await getUserQuotes(userData.$id);

                        setSavedCaptions(captionsData);
                        setSavedQuotes(quotesData);
                    }
                } catch (error) {
                    console.log("Error fetching user:", error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }, [])
    );

    const deleteCaptionHandler = async (id) => {
        try {
            await deleteCaption(id);
            Alert.alert('Delete Successfully');
            setSavedCaptions(prev => prev.filter(p => p.$id !== id));
        } catch (error) {
            Alert.alert('Failed to delete', error.message);
        }
    }
    const deleteQuoteHandler = async (id) => {
        try {
            await deleteQuote(id);
            Alert.alert('Delete Successfully');
            setSavedQuotes(prev => prev.filter(p => p.$id !== id));
        } catch (error) {
            Alert.alert('Failed to delete', error.message);
        }
    }

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigation.replace('Login');
        } catch (error) {
            Alert.alert('Logout Failed', error.message);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#ff3399" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* User Header */}
            <View style={styles.header}>
                <Ionicons name="person-circle-outline" size={80} color="#ff3399" />
                <Text style={styles.username}>Hello, {user.name} 👋</Text>
                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={() => handleLogout()}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Favorites Section */}
            <Text style={styles.sectionTitle}><Ionicons name="heart" size='18' color='#ff3399' /> Saved Captions</Text>
            {savedCaptions.length > 0 ? (
                <FlatList
                    data={savedCaptions}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }) => (
                        <SavedCaptionCard
                            key={item.$id}
                            caption={item}
                            onDelete={deleteCaptionHandler}
                        />
                    )}
                />
            ) : (
                <Text style={styles.emptyText}>No saved captions yet.</Text>
            )}

            {/* Saved Quotes */}
            <Text style={styles.sectionTitle}><Ionicons name="heart" size='18' color='#ff3399' /> Saved Quotes</Text>
            {savedQuotes.length > 0 ? (
                <FlatList
                    data={savedQuotes}
                    keyExtractor={(item) => item.$id}
                    // renderItem={SavedQuoteCard}
                    renderItem={({ item }) => (
                        <SavedCaptionCard
                            caption={item}
                            onDelete={deleteQuoteHandler}
                        />
                    )}
                />
            ) : (
                <Text style={styles.emptyText}>No saved qoutes yet.</Text>
            )}
        </View>
    );
};

export default UserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    logoutBtn: {
        marginTop: 10,
        backgroundColor: '#ff3399',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10,
    },
    logoutText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        color: '#444',
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 14,
        borderRadius: 12,
        marginTop: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardText: {
        fontSize: 14,
        color: '#333',
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
        marginLeft: 6,
    },
});
