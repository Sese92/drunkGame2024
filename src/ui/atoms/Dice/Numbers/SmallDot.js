import React from 'react';

import { View } from 'react-native';

export const SmallDot = ({ color }) => {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        backgroundColor: color,
        borderRadius: 100,
      }}></View>
  );
};
