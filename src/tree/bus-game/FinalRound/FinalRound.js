import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, View, Text as RNText } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  clearPlayerHand,
  removeCard,
  setPlayerHand,
  removePlayer,
  finalRound,
  setNumberOfJokersAndDecks,
} from '../../../services/bus/bus.service';
import {
  setTurn,
  setNames,
  setNumberOfPlayers,
} from '../../../services/game/game.service';

import {
  selectTurn,
  selectPlayers,
  selectInitialPlayers,
} from '../../../features/gameConfiguration/configuration.store';
import {
  selectCard,
  selectNumberOfCards,
  selectDecks,
  selectJokers,
} from '../../../features/bus/bus.store';
import { Text } from '../../../ui/atoms/Text';
import { Button } from '../../../ui/atoms/Button';
import { Card, SmallCard } from '../../../ui/atoms/Card';
import { flex } from '../../../ui/style/layout';
import { margins, paddings } from '../../../ui/style/spacing';

import {
  renderLeftButton,
  renderRightButton,
  leftClicked,
  rightClicked,
  middleClicked,
} from '../bus.utils';

export const FinalRound = () => {
  const navigation = useNavigation();

  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const card = useSelector(selectCard);
  const players = useSelector(selectPlayers);
  const turn = useSelector(selectTurn);
  const initialPlayers = useSelector(selectInitialPlayers);
  const decks = useSelector(selectDecks);
  const jokers = useSelector(selectJokers);

  const numberOfCards = useSelector(selectNumberOfCards);
  const [flipCard, saveFlipCard] = useState(false);
  const [buttonClicked, saveButtonClicked] = useState('');

  useEffect(() => {
    if (players.length > 0) {
      dispatch(setTurn({ turn: 0 }));
      saveFlipCard(false);
    }
  }, []);

  var success =
    players.length > 0 &&
    ((buttonClicked === 'Left' && leftClicked(players[turn].hand, card)) ||
      (buttonClicked === 'Middle' && middleClicked(players[turn].hand, card)) ||
      (buttonClicked === 'Right' && rightClicked(players[turn].hand, card)));

  function nextCard() {
    saveFlipCard(false);
    if (numberOfCards === 1) {
      dispatch(finalRound());
    }
    if (success) {
      if (players[turn].hand.length < 3) {
        dispatch(setPlayerHand({ player: players[turn], card: card })); // Add to player hand
      }
      dispatch(removeCard({ card: card })); // Remove from stack
      if (players[turn].hand.length === 3) {
        let playerToRemove = players[turn];
        if (turn === players.length - 1) {
          dispatch(setTurn({ turn: 0 }));
        }
        dispatch(removePlayer({ player: playerToRemove })); // Winner, remove from stack
      }
    } else {
      dispatch(removeCard({ card: card })); // Remove from stack
      if (card.type !== 'Joker') {
        dispatch(clearPlayerHand({ player: players[turn] }));
        if (turn < players.length - 1) {
          dispatch(setTurn({ turn: turn + 1 }));
        } else {
          dispatch(setTurn({ turn: 0 }));
        }
      }
    }
  }

  function playAgain() {
    dispatch(
      setNumberOfPlayers({
        numberOfPlayers: initialPlayers.length,
        playersName: t('game_configuration.player'),
      })
    );
    let names = [];
    initialPlayers.map((player) => names.push(player.name));
    dispatch(setNames({ names: names }));
    dispatch(setNumberOfJokersAndDecks({ decks: decks, jokers: jokers }));
    navigation.navigate('Election');
  }

  return (
    <View style={[flex.on]}>
      {players.length > 0 ? (
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
              <Button style={[paddings.px3]} onPress={() => nextCard()}>
                <Text
                  text={
                    success
                      ? 'continue'
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
            </View>
          )}
          {numberOfCards === 1 && (
            <Text
              text="bus_game.last_card"
              style={{ marginTop: 20, fontWeight: 'bold', fontSize: 16 }}
            />
          )}
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={[
            flex.on,
            flex.centerContent,
            { backgroundColor: colors.tertiary },
          ]}>
          <Text
            text="bus_game.game_finished"
            style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 50 }}
          />
          <Button
            style={[paddings.px3, margins.mb6]}
            onPress={() => playAgain()}>
            <Text
              text="play_again"
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            />
          </Button>
          <Button
            style={[paddings.px3, margins.mt6]}
            onPress={() => navigation.navigate('Main')}>
            <Text
              text="main_menu"
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            />
          </Button>
        </SafeAreaView>
      )}
    </View>
  );
};
