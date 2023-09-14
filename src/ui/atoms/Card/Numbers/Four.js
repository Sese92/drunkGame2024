import React from 'react';

import { View } from 'react-native';

import { getIcon, actuatedNormalize } from './One';

export const Four = ({ card }) => {
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          height: '50%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            width: '50%',
            alignItems: 'flex-start',
          }}>
          {getIcon(card.type, actuatedNormalize(85), card.color)}
        </View>
        <View
          style={{
            justifyContent: 'center',
            width: '50%',
            alignItems: 'flex-end',
          }}>
          {getIcon(card.type, actuatedNormalize(85), card.color)}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: '50%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            width: '50%',
            alignItems: 'flex-start',
          }}>
          {getIcon(card.type, actuatedNormalize(85), card.color)}
        </View>
        <View
          style={{
            justifyContent: 'center',
            width: '50%',
            alignItems: 'flex-end',
          }}>
          {getIcon(card.type, actuatedNormalize(85), card.color)}
        </View>
      </View>
    </View>
  );
};
