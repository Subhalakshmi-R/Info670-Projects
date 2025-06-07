import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddAssignment from './screens/AddAssignment';
import ViewAssignments from './screens/ViewAssignments';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Add">
        <Stack.Screen name="Add" component={AddAssignment} />
        <Stack.Screen name="View" component={ViewAssignments} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
