import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import { Host } from 'react-native-portalize';

import { Main } from './main';
import { Jota } from './jota/Jota';
import { GameConfig } from './game-config/GameConfig';
import { BusTree } from './bus-game/bus.navigation';

const Stack = createStackNavigator();

export function Tree() {
  return (
    <Host>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="GameConfig" component={GameConfig} />
        <Stack.Screen name="JotaGame" component={Jota} />
        <Stack.Screen name="BusGame" component={BusTree} />
      </Stack.Navigator>
    </Host>
  );
}
