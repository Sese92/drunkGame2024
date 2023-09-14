import React, { useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Text } from '../../atoms/Text';

export const SplashScreen = () => {
  const { colors } = useTheme();
  const movementScreen = useRef(new Animated.Value(0)).current;

  // const moveOut = () => {
  //   Animated.timing(movementScreen, {
  //     toValue: Dimensions.get('window').height * -1,
  //     duration: 300,
  //     delay: 300,
  //     useNativeDriver: true,
  //   }).start(kill);
  // };

  // const kill = () => {
  //   onAfterReady();
  // };

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
        style={{ color: colors.info, fontWeight: 'bold', fontSize: 40 }}
      />

      {/* <LottieView
        autoSize={true}
        source={require('../../../../assets/animations/beer.json')}
        autoPlay={true}
        loop={false}
        onAnimationFinish={() => moveOut()}
      /> */}
    </Animated.View>
  );
};
