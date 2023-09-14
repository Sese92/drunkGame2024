import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Portal } from 'react-native-portalize';

import { SafeAreaView, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from 'react-i18next';

import { useNavigation, useTheme } from '@react-navigation/native';

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

  const [showSplash, setShowSplash] = useState(false);

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
      <DropDownPicker
        activeLabelStyle={{ color: colors.primary }}
        labelStyle={{ color: colors.gray }}
        selectedLabelStyle={{ color: colors.primary }}
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
        defaultValue={i18n.language}
        containerStyle={{
          height: 40,
          width: '30%',
          position: 'absolute',
          top: '6%',
          alignSelf: 'flex-end',
          right: '8%',
        }}
        style={{ paddingLeft: 4 }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        onChangeItem={(item) => i18n.changeLanguage(item.value)}
      />
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
            dispatch(selectGame({ game: 'Jota' }));
            navigation.navigate('GameConfig', { game: 'Jota' });
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
            dispatch(selectGame({ game: 'Bus' }));
            navigation.navigate('GameConfig', { game: 'Bus' });
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
