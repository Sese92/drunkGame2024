import React from 'react';

import { TouchableOpacity, StyleSheet, View } from 'react-native';

import { useTheme } from '@react-navigation/native';

import { flex } from '../../style/layout';
import { margins, paddings } from '../../style/spacing';
import { shadows } from '../../style/shadows';

export const Button = ({
  disabled = false,
  children,
  style = [],
  onPress,
  underlayColor,
  LeftElement,
  RightElement,
  bgColor,
  shadow = shadows.L1Black,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      underlayColor={underlayColor || 'none'}
      onPress={() => !disabled && onPress && onPress()}
      style={[
        StyleSheet.flatten(style),
        shadow,
        {
          backgroundColor: bgColor || colors.info,
          justifyContent: 'center',
          opacity: disabled ? 0.4 : 1,
        },
      ]}>
      <View
        style={[
          {
            alignItems: 'center',
          },
          paddings.py3,
        ]}>
        <View style={[flex.row, flex.centerX]}>
          {LeftElement && <View style={[margins.mr2]}>{LeftElement}</View>}
          {children}
          {RightElement && <View style={[margins.ml2]}>{RightElement}</View>}
        </View>
      </View>
    </TouchableOpacity>
  );
};
