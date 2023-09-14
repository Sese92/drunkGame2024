import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { One } from './Numbers/One';
import { Seven } from './Numbers/Seven';
import { Eight } from './Numbers/Eight';

export const Dice = ({ dice }) => {
  const { colors } = useTheme();

  function RenderFace() {
    switch (dice.number) {
      case 1:
        return <One color={dice.color} />;
      case 7:
        return <Seven color={dice.color} />;
      case 8:
        return <Eight color={dice.color} />;
      default:
        return (
          <Text style={{ fontSize: 150, color: dice.color }}>
            {dice.number}
          </Text>
        );
    }
  }

  return (
    <View
      style={{
        backgroundColor: colors.white,
        width: 300,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: colors.black,
        borderWidth: 6,
        shadowColor: colors.black,
        shadowOffset: {
          width: 8,
          height: 8,
        },
        shadowOpacity: 0.4,
        elevation: 12,
      }}>
      {RenderFace()}
    </View>
  );
};
