import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, View, Text as RNText } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RowsModal } from './RowsModal';
import { setTurn } from '../../../services/game/game.service';
import { removeCard, setPlayerHand } from '../../../services/bus/bus.service';
import {
  selectPlayers,
  selectTurn,
} from '../../../features/gameConfiguration/configuration.store';
import { selectCard } from '../../../features/bus/bus.store';

import { Text } from '../../../ui/atoms/Text';
import { Button } from '../../../ui/atoms/Button';
import { Card, SmallCard } from '../../../ui/atoms/Card';
import { FloatingTopBar } from '../../../ui/atoms/FloatingBar';
import { RoundButton } from '../../../ui/atoms/RoundButton';
import { PlayersHands } from '../Bus/PlayersHands';

import { flex } from '../../../ui/style/layout';
import { margins, paddings } from '../../../ui/style/spacing';

import {
  renderLeftButton,
  renderRightButton,
  leftClicked,
  rightClicked,
  middleClicked,
} from '../bus.utils';

export const Election = () => {
  const navigation = useNavigation();
  const modalizeRef = useRef(null);

  const { colors } = useTheme();
  const dispatch = useDispatch();

  const card = useSelector(selectCard);
  const players = useSelector(selectPlayers);
  const turn = useSelector(selectTurn);

  const [flipCard, saveFlipCard] = useState(false);
  const [buttonClicked, saveButtonClicked] = useState('');

  const modalizeHands = useRef(null);

  useEffect(() => {
    dispatch(setTurn({ turn: 0 }));
    saveFlipCard(false);
  }, []);

  const onOpenHands = () => {
    modalizeHands.current?.open();
  };

  var successSides =
    players.length > 0 &&
    ((buttonClicked === 'Left' && leftClicked(players[turn].hand, card)) ||
      (buttonClicked === 'Right' && rightClicked(players[turn].hand, card)));

  var successMiddle =
    players.length > 0 &&
    buttonClicked === 'Middle' &&
    middleClicked(players[turn].hand, card);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  function nextTurn() {
    if (turn < players.length - 1) {
      saveFlipCard(false);
      dispatch(setPlayerHand({ player: players[turn], card: card }));
      dispatch(removeCard({ card: card }));
      if (card.type !== 'Joker') {
        dispatch(setTurn({ turn: turn + 1 }));
      }
    } else {
      if (players[players.length - 1].hand.length === 3) {
        if (card.type !== 'Joker') {
          saveFlipCard(false);
          dispatch(setPlayerHand({ player: players[turn], card: card }));
          dispatch(removeCard({ card: card }));
          onOpen();
        } else {
          saveFlipCard(false);
          dispatch(removeCard({ card: card }));
        }
      } else if (players[players.length - 1].hand.length < 3) {
        saveFlipCard(false);
        dispatch(setPlayerHand({ player: players[turn], card: card }));
        dispatch(removeCard({ card: card }));
        if (card.type !== 'Joker') {
          dispatch(setTurn({ turn: 0 }));
        }
      } else {
        saveFlipCard(false);
        onOpen();
      }
    }
  }

  return (
    <View style={[flex.on]}>
      {players.length > 0 && (
        <SafeAreaView
          style={[
            flex.on,
            flex.centerContent,
            { backgroundColor: colors.tertiary },
          ]}>
          <RNText
            style={[
              margins.mb2,
              {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 40,
                fontStyle: 'italic',
              },
            ]}>
            {players[turn].name}
          </RNText>
          <View
            style={[
              flex.row,
              margins.mb6,
              {
                justifyContent: 'space-around',
                width: '100%',
                height: '10%',
              },
            ]}>
            {players[turn].hand.map(
              (card, i) =>
                card.type !== 'Joker' && (
                  <View key={i} style={{ width: '15%' }}>
                    <SmallCard style={{ flex: 1 }} card={card} />
                  </View>
                )
            )}
          </View>

          <Card flip={flipCard} card={flipCard ? card : null} />

          {!flipCard && players[players.length - 1].hand.length < 4 ? (
            <View
              style={[
                margins.mt3,
                flex.row,
                paddings.px3,
                {
                  justifyContent: 'space-between',
                  width: '100%',
                },
              ]}>
              <Button
                style={{ width: '25%' }}
                onPress={() => {
                  saveFlipCard(true);
                  saveButtonClicked('Left');
                }}>
                <Text
                  text={
                    'bus_game.options.' + renderLeftButton(players[turn].hand)
                  }
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                />
              </Button>
              {players[turn].hand.length > 0 &&
                players[turn].hand.length < 3 && (
                  <Button
                    style={{ width: '25%' }}
                    onPress={() => {
                      saveFlipCard(true);
                      saveButtonClicked('Middle');
                    }}>
                    <Text
                      text="bus_game.options.same"
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    />
                  </Button>
                )}
              <Button
                style={{ width: '25%' }}
                onPress={() => {
                  saveFlipCard(true);
                  saveButtonClicked('Right');
                }}>
                <Text
                  text={
                    'bus_game.options.' + renderRightButton(players[turn].hand)
                  }
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                />
              </Button>
            </View>
          ) : (
            <View
              style={[
                margins.mt3,
                flex.row,
                paddings.px3,
                {
                  justifyContent: 'center',
                },
              ]}>
              {players[players.length - 1].hand.length < 4 ? (
                <Button style={[paddings.px5]} onPress={() => nextTurn()}>
                  <Text
                    text={
                      successSides
                        ? 'bus_game.send'
                        : successMiddle
                        ? 'bus_game.all_drink'
                        : card.type === 'Joker'
                        ? 'bus_game.shot'
                        : 'bus_game.drink'
                    }
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  />
                </Button>
              ) : (
                <Button style={[paddings.px5]} onPress={() => onOpen()}>
                  <Text
                    text="bus_game.next_round"
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  />
                </Button>
              )}
            </View>
          )}
          <Portal>
            <Modalize ref={modalizeRef} adjustToContentHeight={true}>
              <RowsModal navigation={navigation} onClose={() => onClose()} />
            </Modalize>
          </Portal>
          <FloatingTopBar style={{ left: 'auto' }}>
            <View style={[margins.mx4]}>
              <RoundButton onPress={() => onOpenHands()}>
                <Icon name="cards" size={23} color={colors.info} />
              </RoundButton>
            </View>
          </FloatingTopBar>
          <Portal>
            <Modalize ref={modalizeHands} adjustToContentHeight={true}>
              <PlayersHands />
            </Modalize>
          </Portal>
        </SafeAreaView>
      )}
    </View>
  );
};
