import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

import { Translation } from '../Translation';

export const Text = ({ text, style }) => {
  return (
    <RNText style={StyleSheet.flatten(style)}>
      <Translation tkey={text} />
    </RNText>
  );
};
