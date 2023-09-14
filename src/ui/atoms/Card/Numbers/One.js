import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { View, Dimensions, Platform, PixelRatio } from 'react-native';

export const One = ({ card }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      {getIcon(card.type, actuatedNormalize(150), card.color)}
    </View>
  );
};

export function getIcon(type, size, color) {
  switch (type) {
    case '♥':
      return <Icon name="cards-heart" size={size} color={color} />;
    case '♦':
      return <Icon name="cards-diamond" size={size} color={color} />;
    case '♣':
      return <Icon name="cards-club" size={size} color={color} />;
    case '♠':
      return <Icon name="cards-spade" size={size} color={color} />;
  }
}

export function actuatedNormalize(size) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  const scale = SCREEN_WIDTH / 320;

  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
