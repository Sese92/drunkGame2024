import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import { View, Text as RNText } from 'react-native';

import { SmallCard } from '../../../ui/atoms/Card';
import { Text } from '../../../ui/atoms/Text';
import { Button } from '../../../ui/atoms/Button';

import { flex } from '../../../ui/style/layout';
import { margins, paddings } from '../../../ui/style/spacing';
import { selectPlayers } from '../../../features/gameConfiguration/configuration.store';
import { removeFromHand } from '../../../services/bus/bus.service';

export const PlayersHands = ({
  playersPassed,
  card,
  finalRound,
  toFinalRound,
}) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  var players = useSelector(selectPlayers);
  if (playersPassed) {
    players = playersPassed;
  }

  return (
    <View style={[paddings.px4, paddings.pb4]}>
      {players.map((player, i) => (
        <View key={i}>
          <View style={[margins.my4]}>
            <RNText style={[margins.mb3, { fontSize: 22, fontWeight: 'bold' }]}>
              {player.name}
            </RNText>
            <View
              style={[
                flex.row,
                { justifyContent: 'space-around', height: 70 },
              ]}>
              {player.hand.length === 0 ? (
                <View style={{ justifyContent: 'center' }}>
                  <Text
                    text="bus_game.no_cards"
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: colors.gray,
                    }}
                  />
                </View>
              ) : (
                player.hand.map(
                  (card, j) =>
                    card.type !== 'Joker' && (
                      <View key={j} style={{ width: '15%' }}>
                        <SmallCard style={{ flex: 1 }} card={card} />
                      </View>
                    )
                )
              )}
            </View>
            {playersPassed && (
              <View
                style={[flex.row, margins.mt4, { justifyContent: 'center' }]}>
                <Button
                  style={[paddings.px5]}
                  onPress={() => {
                    dispatch(removeFromHand({ player: player, card: card }));
                  }}>
                  <Text
                    text="bus_game.place"
                    style={{ fontWeight: 'bold', fontSize: 14 }}
                  />
                </Button>
              </View>
            )}
          </View>
          {i < players.length - 1 && (
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: colors.gray,
              }}></View>
          )}
        </View>
      ))}
      {finalRound && (
        <Button onPress={toFinalRound}>
          <Text
            text="bus_game.to_final"
            style={{ fontWeight: 'bold', fontSize: 14 }}
          />
        </Button>
      )}
    </View>
  );
};
