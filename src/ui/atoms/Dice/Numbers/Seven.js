import React from 'react';
import { View } from 'react-native';

import { SmallDot } from './SmallDot';

export const Seven = ({ color }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
        width: 300,
        height: 300,
      }}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <SmallDot color={color} />
        <SmallDot color={color} />
        <SmallDot color={color} />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <SmallDot color={color} />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <SmallDot color={color} />
        <SmallDot color={color} />
        <SmallDot color={color} />
      </View>
    </View>
  );
};
