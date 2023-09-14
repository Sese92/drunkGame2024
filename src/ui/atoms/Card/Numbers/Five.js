import React from 'react';

import { View } from 'react-native';

import { getIcon, actuatedNormalize } from './One';

export const Five = ({ card }) => {
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          height: '33%',
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
          height: '33%',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
          }}>
          {getIcon(card.type, actuatedNormalize(85), card.color)}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: '33%',
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
