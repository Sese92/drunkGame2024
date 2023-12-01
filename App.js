import React from 'react';

import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { View } from 'react-native';

import './src/i18n';
import { theme } from './src/ui/style/theme';
import { store } from './src/store';
import { Tree } from './src/tree/tree.navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <NavigationContainer theme={theme}>
            <StatusBar translucent={true} />
            <Tree />
          </NavigationContainer>
        </View>
      </Provider>
    </GestureHandlerRootView>
  );
}
