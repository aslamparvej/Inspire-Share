import { Client, Account, Databases, ID, Query  } from 'react-native-appwrite';
import { EXPO_PUBLIC_APPWRITE_PROJECT_ID, EXPO_PUBLIC_APPWRITE_ENDPOINT, EXPO_PUBLIC_APPWRITE_PROJECT_NAME, APPWRITE_DATABASE_ID, APPWRITE_CAPTIONS_COLLECTION_ID } from '@env';

const client = new Client()
  .setEndpoint(`${EXPO_PUBLIC_APPWRITE_ENDPOINT}`)
  .setProject(`${EXPO_PUBLIC_APPWRITE_PROJECT_ID}`)
  .setPlatform(`${EXPO_PUBLIC_APPWRITE_PROJECT_NAME}`);

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = APPWRITE_DATABASE_ID;
const CAPTIONS_COLLECTION_ID = APPWRITE_CAPTIONS_COLLECTION_ID;

// Save Caption
export const saveCaption = async (captionText, userId) => {
  return await databases.createDocument(
    DATABASE_ID,
    CAPTIONS_COLLECTION_ID,
    ID.unique(),
    {
      text: captionText,
      userId: userId,
      $createdAt: new Date().toISOString(),
    }
  );
};

// Get User's Saved Captions
export const getUserCaptions = async (userId) => {
  const response = await databases.listDocuments(
    DATABASE_ID,
    CAPTIONS_COLLECTION_ID,
    [
      Query.equal("userId", userId)
    ]
  );
  return response.documents;
};

// Delete Caption
export const deleteCaption = async (captionId) => {
  return await databases.deleteDocument(DATABASE_ID, CAPTIONS_COLLECTION_ID, captionId);
};


