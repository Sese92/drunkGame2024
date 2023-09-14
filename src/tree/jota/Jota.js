import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SafeAreaView,
  View,
  Text as RNText,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';

import { setTurn } from '../../services/game/game.service';
import {
  selectTurn,
  selectPlayers,
} from '../../features/gameConfiguration/configuration.store';
import { selectDice, selectFirstRound } from '../../features/jota/jota.store';

import { Text } from '../../ui/atoms/Text';
import { FloatingTopBar } from '../../ui/atoms/FloatingBar';
import { Button } from '../../ui/atoms/Button';
import { RoundButton } from '../../ui/atoms/RoundButton';
import { flex } from '../../ui/style/layout';
import { margins, paddings } from '../../ui/style/spacing';

import { Dice } from '../../ui/atoms/Dice';
import {
  setPlayerAsJota,
  finishFirstRound,
} from '../../services/jota/jota.service';

export const Jota = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const players = useSelector(selectPlayers);
  const turn = useSelector(selectTurn);
  const dice = useSelector(selectDice);
  const firstRound = useSelector(selectFirstRound);
  const [resultsScreen, saveResultsScreen] = useState(false);
  const [diceSelected, saveDiceSelected] = useState(null);

  const modalizeJota = useRef(null);

  useEffect(() => {
    dispatch(setTurn({ turn: 0 }));
  }, []);

  function setNextTurn() {
    if (diceSelected.number === 'J' && firstRound) {
      dispatch(setPlayerAsJota({ player: players[turn] }));
    }
    if (diceSelected.number === 'J' && !firstRound) {
      return;
    }
    if (turn < players.length - 1) {
      dispatch(setTurn({ turn: turn + 1 }));
    } else {
      let anyJota = false;
      for (let i = 0; i < players.length; i++) {
        if (
          players[i].jota === true ||
          (firstRound && diceSelected.number === 'J')
        ) {
          anyJota = true;
        }
      }
      if (anyJota) {
        dispatch(finishFirstRound());
      }
      dispatch(setTurn({ turn: 0 }));
    }
  }

  function rollIt() {
    saveDiceSelected(dice[Math.floor(Math.random() * dice.length)]);
    saveResultsScreen(true);
  }

  const onOpenPlayers = () => {
    modalizeJota.current?.open();
  };

  return (
    <SafeAreaView style={[flex.on, { backgroundColor: colors.tertiary }]}>
      {firstRound && (
        <Text
          text="j_game.first_round"
          style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
        />
      )}
      {!firstRound && (
        <FloatingTopBar style={{ left: 'auto' }}>
          <View style={[margins.mx4]}>
            <RoundButton onPress={() => onOpenPlayers()}>
              <Text
                text="J"
                style={{
                  color: colors.white,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}
              />
            </RoundButton>
          </View>
        </FloatingTopBar>
      )}
      <Portal>
        <Modalize ref={modalizeJota} adjustToContentHeight={true}>
          <View style={[margins.m5]}>
            <Text
              text="j_game.players"
              style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}
            />
            {players.map((player, i) => (
              <View key={i}>
                {player.jota && (
                  <RNText style={[margins.mt4, { fontSize: 18 }]}>
                    {player.name}
                  </RNText>
                )}
              </View>
            ))}
          </View>
        </Modalize>
      </Portal>
      {resultsScreen ? (
        <View style={[flex.centerContent]}>
          <View>
            <RNText
              style={[
                {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 45,
                  fontStyle: 'italic',
                },
              ]}>
              {players[turn].name}
            </RNText>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              setNextTurn(), saveResultsScreen(false);
            }}>
            <View style={{ padding: 30 }}>
              <Dice dice={diceSelected} />
            </View>
          </TouchableWithoutFeedback>
          {!firstRound && (
            <Text
              text={'j_game.rules.' + diceSelected.rule}
              style={[margins.mt5, { fontSize: 30 }]}
            />
          )}
        </View>
      ) : (
        <View style={[flex.centerContent]}>
          <RNText
            style={[
              {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 60,
                fontStyle: 'italic',
              },
            ]}>
            {players[turn].name}
          </RNText>
          <View style={[margins.my8]}>
            <Button
              style={[
                paddings.px6,
                {
                  borderColor: colors.black,
                  borderWidth: 2,
                  borderRadius: 20,
                },
              ]}
              onPress={() => rollIt()}>
              <Text
                text="j_game.roll"
                style={{ fontSize: 18, fontWeight: 'bold' }}
              />
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
