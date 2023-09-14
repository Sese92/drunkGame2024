import React from 'react';
import { View } from 'react-native';

export const One = ({ color }) => {
  return (
    <View
      style={{
        width: 120,
        height: 120,
        backgroundColor: color,
        borderRadius: 100,
      }}></View>
  );
};
