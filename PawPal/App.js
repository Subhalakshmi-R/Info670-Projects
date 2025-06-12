import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import AddPetScreen from './screens/AddPetScreen';
import PetDetailScreen from './screens/PetDetailScreen';
import PetManagerScreen from './screens/PetManagerScreen';
import AddMedicalRecordScreen from './screens/AddMedicalRecordScreen';
import ReminderScreen from './screens/ReminderScreen';
import OwnerProfileScreen from './screens/OwnerProfileScreen';
import EditPetScreen from './screens/EditPetScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{ title: 'My Profile' }}
        />
        <Stack.Screen
          name="AddPet"
          component={AddPetScreen}
          options={{ title: 'Add a Pet' }}
        />
        <Stack.Screen
          name="PetDetail"
          component={PetDetailScreen}
          options={{ title: 'Pet Details' }}
        />
        <Stack.Screen 
        name="EditPetScreen" 
        component={EditPetScreen}
        options={{ title: 'EditPetScreen' }} 
        />
        <Stack.Screen 
        name="PetManager" 
        component={PetManagerScreen}
        options={{ title: 'Pet Manager' }} 
        />
        <Stack.Screen 
        name="AddMedicalRecord" 
        component={AddMedicalRecordScreen}
        options={{ title: 'AddMedicalRecord' }} 
        />
        <Stack.Screen 
        name="Reminders" 
        component={ReminderScreen}
        options={{ title: 'Reminders' }} 
        />
        <Stack.Screen 
        name="OwnerProfileScreen" 
        component={OwnerProfileScreen}
        options={{title: 'OwnerProfileScreen' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
