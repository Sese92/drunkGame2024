import React from 'react';

import { View } from 'react-native';

import { getIcon, actuatedNormalize } from './One';

export const Two = ({ card }) => {
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <View
        style={{
          height: '50%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {getIcon(card.type, actuatedNormalize(110), card.color)}
      </View>
      <View
        style={{
          height: '50%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {getIcon(card.type, actuatedNormalize(110), card.color)}
      </View>
    </View>
  );
};
