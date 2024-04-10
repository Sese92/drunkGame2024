import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

import { margins, paddings } from '../../ui/style/spacing';
import { Text } from '../../ui/atoms/Text';
import { Button } from '../../ui/atoms/Button';
import { QuantityButtons } from '../../ui/organisms/QuantityButtons';
import { selectSelectedGame } from '../../features/gameConfiguration/configuration.store';
import { setPlayers } from '../../services/game/game.service';

export const Players = ({ continueToGame }) => {
  const [players, savePlayers] = useState([{ name: '' }]);
  const game = useSelector(selectSelectedGame);

  const [buttonDisabled, saveButtonDisabled] = useState(true);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  function play() {
    dispatch(setPlayers({ players }));
    continueToGame();
  }

  function changeName(input, index) {
    let playersChanged = JSON.stringify(players);
    let json = JSON.parse(playersChanged);
    json[index].name = input;

    savePlayers(json);
  }

  useEffect(() => {
    if (players.some((plyr) => plyr.name === '')) {
      saveButtonDisabled(true);
    } else {
      saveButtonDisabled(false);
    }
  }, [players]);

  return (
    <View style={[margins.m6]}>
      <Text
        text="game_configuration.players"
        style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
        Players
      </Text>
      <View style={[margins.my6]}>
        <Text
          text="game_configuration.nb_players"
          style={[
            margins.mb3,
            { textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
          ]}
        />

        <View style={{ alignSelf: 'center' }}>
          <QuantityButtons
            min={1}
            value={players.length.toString()}
            addQuantity={() => savePlayers([...players, { name: '' }])}
            subQuantity={() => savePlayers(players.slice(0, -1))}
          />
        </View>
      </View>

      <View style={[margins.mb6]}>
        {players.map((player, i) => (
          <View key={i}>
            <TextInput
              placeholder={t('game_configuration.player')}
              onChangeText={(input) => changeName(input, i)}
              style={[
                paddings.px2,
                paddings.py1,
                margins.my1,
                { borderBottomWidth: 1, fontSize: 20 },
              ]}>
              {player.name}
            </TextInput>
          </View>
        ))}
      </View>
      <Button disabled={buttonDisabled} onPress={() => play()}>
        <Text
          text={
            game === 'JotaGame'
              ? 'game_configuration.play'
              : 'game_configuration.next'
          }
          style={{ fontSize: 20, fontWeight: 'bold' }}
        />
      </Button>
    </View>
  );
};
