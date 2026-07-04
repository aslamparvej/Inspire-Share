import React, {useState, useEffect} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { checkLogin } from "../services/appwriteAuth";

// Screens
import QuotesScreen from "./QuotesScreen";
import CaptionsScreen from "./CaptionsScreen";
import HashtagScreen from "./HashtagScreen";
import UserScreen from "./UserScreen";

import Login from "../screens/auth/Login";

const Tab = createBottomTabNavigator();

function MainTabs() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      const currentUser = await checkLogin();
      setUser(currentUser);
      setLoading(false);
    };
    verifyUser();
  }, []);

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#ff3399',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#fff', paddingBottom: 6, height: 60 },
      tabBarIcon: ({ color, size }) => {
        if (route.name === 'Quotes') return <Ionicons name="heart" size={size} color={color} />;
        if (route.name === 'Captions') return <MaterialIcons name="camera-alt" size={size} color={color} />;
        if (route.name === 'Hashtag') return <Ionicons name="pricetags" size={size} color={color} />;
        if (route.name === 'User') return <Ionicons name="person-circle" size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Captions" component={CaptionsScreen} />
      <Tab.Screen name="Quotes" component={QuotesScreen} />
      <Tab.Screen name="Hashtag" component={HashtagScreen} />
      <Tab.Screen name="User" component={user ? UserScreen : Login} options={{ title: user ? "Profile" : "Login" }} />
    </Tab.Navigator>
  );
}

export default MainTabs;