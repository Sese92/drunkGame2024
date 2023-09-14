import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

import { setNames } from '../../services/game/game.service';
import { selectPlayers } from '../../features/gameConfiguration/configuration.store';
import { margins, paddings } from '../../ui/style/spacing';
import { Text } from '../../ui/atoms/Text';
import { Button } from '../../ui/atoms/Button';

export const PlayersNames = ({ continueToGame }) => {
  const players = useSelector(selectPlayers);
  const names = Array(players.length).fill('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function play() {
    dispatch(setNames({ names: names }));
    continueToGame();
  }

  return (
    <View style={[margins.m6]}>
      <Text
        text="game_configuration.players"
        style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
        Players
      </Text>
      <View style={[margins.mb8, margins.mt4]}>
        {names.map((name, i) => (
          <View key={i}>
            <TextInput
              placeholder={t('game_configuration.player') + ' ' + (i + 1)}
              onChangeText={(input) => (names[i] = input)}
              style={[
                paddings.px2,
                paddings.py1,
                margins.my1,
                { borderBottomWidth: 1, fontSize: 20 },
              ]}>
              {name}
            </TextInput>
          </View>
        ))}
      </View>
      <Button onPress={() => play()}>
        <Text
          text="game_configuration.play"
          style={{ fontSize: 20, fontWeight: 'bold' }}
        />
      </Button>
    </View>
  );
};
