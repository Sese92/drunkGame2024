import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Portal } from 'react-native-portalize';

import { SafeAreaView, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';

import { useNavigation, useTheme } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { selectGame } from '../services/game/game.service';

import { Button } from '../ui/atoms/Button';
import { Text } from '../ui/atoms/Text';
import { SplashScreen } from './../ui/organisms/SplashScreen';

import { flex } from '../ui/style/layout';
import { margins, paddings } from '../ui/style/spacing';

import i18n from '../i18n';

export const Main = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [showSplash, setShowSplash] = useState(true);

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: colors.white,
      borderRadius: 4,
      color: colors.white,
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderWidth: 0.5,
      borderColor: colors.white,
      borderRadius: 8,
      color: colors.white,
    },
    iconContainer: {
      top: 16,
      right: 10,
    },
  });

  return (
    <SafeAreaView
      style={[
        flex.centerContent,
        paddings.p5,
        { backgroundColor: colors.primary },
      ]}>
      {showSplash && (
        <Portal>
          <SplashScreen onAfterReady={() => setShowSplash(false)} />
        </Portal>
      )}
      <View
        style={{
          position: 'absolute',
          top: 60,
          right: 20,
        }}>
        <RNPickerSelect
          Icon={() => {
            return (
              <FontAwesomeIcon size={12} color="white" icon={faChevronDown} />
            );
          }}
          touchableWrapperProps={{ activeOpacity: 0.65 }}
          placeholder={{}}
          useNativeAndroidPickerStyle={false}
          fixAndroidTouchableBug
          style={pickerSelectStyles}
          value={i18n.language}
          onValueChange={(value) => i18n.changeLanguage(value)}
          items={[
            {
              label: t('languages.english'),
              value: 'en',
            },
            {
              label: t('languages.spanish'),
              value: 'es',
            },
          ]}
        />
      </View>

      <Text
        text="welcome"
        style={{
          fontSize: 40,
          color: colors.white,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      />
      <Text
        text="how_to"
        style={[margins.mt4, { fontSize: 20, color: colors.white }]}
      />

      <View style={[margins.mt8]}>
        <Button
          onPress={() => {
            dispatch(selectGame({ game: 'JotaGame' }));
            navigation.navigate('GameConfig', { game: 'JotaGame' });
          }}>
          <Text
            text="j"
            style={{
              fontWeight: 'bold',
              fontSize: 20,
            }}
          />
        </Button>
        <Button
          style={[margins.mt8, paddings.px6]}
          onPress={() => {
            dispatch(selectGame({ game: 'BusGame' }));
            navigation.navigate('GameConfig', { game: 'BusGame' });
          }}>
          <Text
            text="bus"
            style={{
              fontWeight: 'bold',
              fontSize: 20,
            }}
          />
        </Button>
      </View>
    </SafeAreaView>
  );
};
