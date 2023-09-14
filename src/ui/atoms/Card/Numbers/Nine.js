import React from 'react';

import { View } from 'react-native';

import { getIcon, actuatedNormalize } from './One';

export const Nine = ({ card }) => {
  return (
    <View style={{ flex: 1, width: '100%', justifyContent: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          height: '25%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            width: '50%',
            alignItems: 'flex-start',
          }}>
          {getIcon(card.type, actuatedNormalize(70), card.color)}
        </View>
        <View
          style={{
            justifyContent: 'center',
            width: '50%',
            alignItems: 'flex-end',
          }}>
          {getIcon(card.type, actuatedNormalize(70), card.color)}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: '25%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            width: '50%',
            alignItems: 'flex-start',
          }}>
          {getIcon(card.type, actuatedNormalize(70), card.color)}
        </View>
        <View
          style={{
            justifyContent: 'center',
            width: '50%',
            alignItems: 'flex-end',
          }}>
          {getIcon(card.type, actuatedNormalize(70), card.color)}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          alignSelf: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          {getIcon(card.type, actuatedNormalize(70), card.color)}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: '25%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            width: '50%',
            alignItems: 'flex-start',
          }}>
          {getIcon(card.type, actuatedNormalize(70), card.color)}
        </View>
        <View
          style={{
            justifyContent: 'center',
            width: '50%',
            alignItems: 'flex-end',
          }}>
          {getIcon(card.type, actuatedNormalize(70), card.color)}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: '25%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            width: '50%',
            alignItems: 'flex-start',
          }}>
          {getIcon(card.type, actuatedNormalize(70), card.color)}
        </View>
        <View
          style={{
            justifyContent: 'center',
            width: '50%',
            alignItems: 'flex-end',
          }}>
          {getIcon(card.type, actuatedNormalize(70), card.color)}
        </View>
      </View>
    </View>
  );
};
