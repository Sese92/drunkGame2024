import React, { useEffect, useRef } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { margins, paddings } from '../../style/spacing';
import { actuatedNormalize } from './Numbers/One';

import {
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Joker,
} from './Numbers';

export const Card = ({ card, flip }) => {
  const { colors } = useTheme();
  const isFirstRun = useRef(true);
  const spin = useSharedValue(1);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    spin.value = spin.value ? 0 : 1;
  }, [flip]);

  const rStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const bStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  function RenderCard() {
    switch (card.number) {
      case 'A':
        return <One card={card} />;
      case 2:
        return <Two card={card} />;
      case 3:
        return <Three card={card} />;
      case 4:
        return <Four card={card} />;
      case 5:
        return <Five card={card} />;
      case 6:
        return <Six card={card} />;
      case 7:
        return <Seven card={card} />;
      case 8:
        return <Eight card={card} />;
      case 9:
        return <Nine card={card} />;
      case 10:
        return <Ten card={card} />;
      case 'Joker':
        return <Joker />;
      default:
        return (
          <Text
            style={{
              fontSize: actuatedNormalize(180),
              color: card.color,
              fontWeight: 'bold',
            }}>
            {card.number}
          </Text>
        );
    }
  }

  return (
    <View style={{ height: '55%', width: '80%' }}>
      <Animated.View
        style={[
          rStyle,
          {
            backgroundColor: colors.white,
            borderRadius: 20,
            borderColor: colors.black,
            borderWidth: 4,
            backfaceVisibility: 'hidden',
            zIndex: 10,
          },
        ]}
        onPress={() => (spin.value = spin.value ? 0 : 1)}>
        {card ? (
          <View>
            <Text
              style={{
                position: 'absolute',
                top: 1,
                left: 4,
                fontSize: actuatedNormalize(25),
                fontWeight: 'bold',
                color: card.color,
              }}>
              {card.type}
              {card.type !== 'Joker' && card.number}
            </Text>
            <View style={[margins.m9]}>
              <View
                style={[
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                    borderColor: colors.black,
                    borderWidth: card.type !== 'Joker' ? 1 : 0,
                    padding: 10,
                  },
                ]}>
                {RenderCard()}
              </View>
            </View>

            <Text
              style={{
                position: 'absolute',
                fontSize: actuatedNormalize(25),
                fontWeight: 'bold',
                bottom: 1,
                right: 4,
                color: card.color,
              }}>
              {card.type !== 'Joker' && card.number}
              {card.type}
            </Text>
          </View>
        ) : (
          <View style={{ height: '100%', width: '100%' }}>
            <View style={[margins.m9]}>
              <View
                style={[
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                    borderColor: colors.black,
                    borderWidth: 1,
                    padding: 10,
                  },
                ]}></View>
            </View>
          </View>
        )}
      </Animated.View>
      <Animated.View
        style={[
          bStyle,
          {
            width: '100%',
            height: '100%',
            position: 'absolute',
            borderRadius: 20,
            borderWidth: 4,

            borderColor: colors.black,
            padding: 20,
            backgroundColor: colors.white,
          },
        ]}>
        <View
          style={{
            backgroundColor: colors.primary,
            width: '100%',
            height: '100%',
            borderRadius: 10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 80,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: colors.info,
            }}>
            Bus game
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export const SmallCard = ({ style, card, backSide = false }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        paddings.px1,
        paddings.py1,
        {
          backgroundColor: colors.white,
          borderColor: colors.black,
          borderWidth: 1,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
        },
        StyleSheet.flatten(style),
      ]}>
      {backSide ? (
        <View
          style={{
            backgroundColor: colors.primary,
            width: '100%',
            height: '100%',
            borderRadius: 4,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 10,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: colors.info,
            }}>
            Bus game
          </Text>
        </View>
      ) : card.type !== 'Joker' ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: card.color,
              textAlign: 'center',
              fontSize: actuatedNormalize(15),
            }}>
            {card.number} {card.type}
          </Text>
        </View>
      ) : (
        <Joker width={60} height={'75%'} />
      )}
    </View>
  );
};
