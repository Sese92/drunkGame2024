import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@react-navigation/native';

import { margins, paddings } from '../../ui/style/spacing';
import { Text } from '../../ui/atoms/Text';
import { Button } from '../../ui/atoms/Button';
import { QuantityButtons } from '../../ui/organisms/QuantityButtons';
import { selectPlayers } from '../../features/gameConfiguration/configuration.store';
import { setPlayers } from '../../services/game/game.service';
import { IconDelete } from '../../ui/zicons/Delete';

export const ModifyPlayers = ({ continueToGame, game }) => {
  const [newPlayers, saveNewPlayers] = useState([]);
  const playersOnPlay = useSelector(selectPlayers);

  const [buttonDisabled, saveButtonDisabled] = useState(true);

  const { colors } = useTheme();

  const dispatch = useDispatch();
  const { t } = useTranslation();

  function play() {
    for (let j = 0; j < newPlayers.length; j++) {
      if (game !== 'Bus') {
        newPlayers[j].jota = true;
      } else {
        newPlayers[j].hand = [];
      }
    }

    console.log(playersOnPlay, newPlayers);

    dispatch(setPlayers({ players: [...playersOnPlay, ...newPlayers] }));
    continueToGame();
  }

  function changeName(input, index) {
    let playersChanged = JSON.stringify(newPlayers);
    let json = JSON.parse(playersChanged);
    json[index].name = input;

    saveNewPlayers(json);
  }

  function deletePlayer(player) {
    if (playersOnPlay.length > 1) {
      Alert.alert(
        t('game_configuration.remove'),
        t('game_configuration.remove_player', { playerName: player.name }),
        [
          { text: t('no'), style: 'cancel', onPress: () => {} },
          {
            text: t('yes'),
            style: 'destructive',
            onPress: () => {
              let filter = playersOnPlay.filter(
                (plyr) => plyr.name !== player.name
              );
              dispatch(setPlayers({ players: filter }));
            },
          },
        ]
      );
    }
  }

  useEffect(() => {
    if (newPlayers.some((plyr) => plyr.name === '')) {
      saveButtonDisabled(true);
    } else {
      saveButtonDisabled(false);
    }
  }, [newPlayers]);

  return (
    <View style={[margins.m6]}>
      <Text
        text={
          game === 'Bus'
            ? 'bus_game.new_game_players'
            : 'game_configuration.nb_new_players'
        }
        style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
        Players
      </Text>
      <View style={[margins.my6]}>
        <View style={{ alignSelf: 'center' }}>
          <QuantityButtons
            min={0}
            value={newPlayers.length.toString()}
            addQuantity={() => saveNewPlayers([...newPlayers, { name: '' }])}
            subQuantity={() => saveNewPlayers(newPlayers.slice(0, -1))}
          />
        </View>
      </View>
      {game !== 'Bus' && (
        <Text
          text="j_game.morePlayers"
          style={[margins.my4, { textAlign: 'center', fontSize: 14 }]}
        />
      )}
      <View style={[margins.mb6]}>
        {playersOnPlay.map((player, i) => (
          <View
            key={i}
            style={[
              paddings.px2,
              paddings.py1,
              margins.my1,
              {
                borderBottomWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
              }}
              text={player.name}
            />
            <Button
              onPress={() => deletePlayer(player)}
              shadow="none"
              bgColor="transparent"
              style={{ height: 30 }}>
              <IconDelete
                width={24}
                height={24}
                iconLineColor={colors.black}></IconDelete>
            </Button>
          </View>
        ))}

        {newPlayers.map((player, i) => (
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
          text={game === 'Bus' ? 'continue' : 'j_game.addPlayers'}
          style={{ fontSize: 20, fontWeight: 'bold' }}
        />
      </Button>
    </View>
  );
};
