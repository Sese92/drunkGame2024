import React, { useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import { Text } from '../../atoms/Text';

export const SplashScreen = ({ onAfterReady }) => {
  const animation = useRef(null);

  const { colors } = useTheme();
  const movementScreen = useRef(new Animated.Value(0)).current;

  const moveOut = () => {
    Animated.timing(movementScreen, {
      toValue: Dimensions.get('window').height * -1,
      duration: 300,
      delay: 300,
      useNativeDriver: true,
    }).start(kill);
  };

  const kill = () => {
    onAfterReady();
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: movementScreen || 0 }],
      }}>
      <Text
        text="DRUNK GAME"
        style={{
          color: colors.info,
          fontWeight: 'bold',
          fontSize: 40,
          marginBottom: 0,
        }}
      />
      <View style={{ width: 400, height: 400 }}>
        <LottieView
          ref={animation}
          autoPlay
          source={require('../../../../assets/animations/beer.json')}
          loop={false}
          style={{ width: 400, height: 400 }}
          onAnimationFinish={() => moveOut()}
        />
      </View>
    </Animated.View>
  );
};
