import { Client, Account, ID, Models } from 'react-native-appwrite';
import { EXPO_PUBLIC_APPWRITE_PROJECT_ID, EXPO_PUBLIC_APPWRITE_ENDPOINT, EXPO_PUBLIC_APPWRITE_PROJECT_NAME } from '@env';

const client = new Client()
    .setEndpoint(`${EXPO_PUBLIC_APPWRITE_ENDPOINT}`)
    .setProject(`${EXPO_PUBLIC_APPWRITE_PROJECT_ID}`)
    .setPlatform(`${EXPO_PUBLIC_APPWRITE_PROJECT_NAME}`);

const account = new Account(client);

export const registerUser = async (name, email, password) => {
    try {
        // Create new user account
        const user = await account.create(ID.unique(), email, password, name);

        // Auto-login after signup
        await account.createEmailPasswordSession(email, password);

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const loginUser = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const checkLogin = async () => {
    try {
        const user = await account.get();
        return user;
    } catch {
        return null;
    }
}

export const getUserDetails = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};