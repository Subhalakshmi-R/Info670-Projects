import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import GalleryScreen from './screens/GalleryScreen';
import PictureViewScreen from './screens/PictureViewScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function GalleryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GalleryMain" component={GalleryScreen} options={{ title: 'Gallery' }} />
      <Stack.Screen name="PictureView" component={PictureViewScreen} options={{ title: 'View Picture' }} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Gallery"
            component={GalleryStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="image-multiple" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="dog" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
