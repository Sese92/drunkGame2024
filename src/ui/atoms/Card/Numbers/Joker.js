import React from 'react';

import { View, Image } from 'react-native';

export const Joker = ({ height = '60%', width = '100%' }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}>
      <Image
        style={{ height: height, width: width }}
        source={require('../../../images/joker.png')}
      />
    </View>
  );
};
