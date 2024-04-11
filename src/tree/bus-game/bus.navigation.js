import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Election } from './Election/Election';
import { Bus } from './Bus/Bus';
import { FinalRound } from './FinalRound/FinalRound';

const Stack = createStackNavigator();

export function BusTree() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Election">
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="Election"
        component={Election}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="Bus"
        component={Bus}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="FinalRound"
        component={FinalRound}
      />
    </Stack.Navigator>
  );
}
