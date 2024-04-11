import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { useTheme } from '@react-navigation/native';

import { selectBusCards } from '../../../features/bus/bus.store';

import { Text } from '../../../ui/atoms/Text';
import { SmallCard } from '../../../ui/atoms/Card';
import { margins, paddings } from '../../../ui/style/spacing';

export const Display = ({ round }) => {
  const busCards = useSelector(selectBusCards);
  const [scrollRef, setRef] = useState(null);

  const { colors } = useTheme();

  useEffect(() => {
    if (round > 0.5) {
      scrollRef.scrollTo({
        x: 0,
        y: Math.floor(round) * 80,
        animated: true,
      });
    }
  }, [round]);

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      ref={(ref) => {
        setRef(ref);
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        marginBottom: 100,
        marginTop: 30,
      }}>
      <View>
        <View
          style={[
            paddings.py2,
            {
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: colors.tertiary,
            },
          ]}>
          <Text
            text="bus_game.drink"
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              width: '30%',
              textAlign: 'center',
            }}
          />

          <Text
            text="bus_game.send"
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              width: '30%',
              textAlign: 'center',
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{ alignItems: 'center', width: '30%' }}>
          {busCards.map(
            (card, i) =>
              i % 2 === 0 &&
              i < busCards.length - 1 && (
                <View key={i} style={[margins.mb4, { height: 110, width: 75 }]}>
                  {card === 0 ? (
                    <SmallCard
                      style={{ flex: 1, width: '100%' }}
                      backSide={true}
                    />
                  ) : (
                    <SmallCard style={{ flex: 1, width: '100%' }} card={card} />
                  )}
                </View>
              )
          )}
        </View>
        <View style={{ alignItems: 'center', width: '30%' }}>
          {busCards.map(
            (card, i) =>
              i % 2 !== 0 && (
                <View key={i} style={[margins.mb4, { height: 110, width: 75 }]}>
                  {card === 0 ? (
                    <SmallCard
                      style={{ flex: 1, width: '100%' }}
                      backSide={true}
                    />
                  ) : (
                    <SmallCard style={{ flex: 1, width: '100%' }} card={card} />
                  )}
                </View>
              )
          )}
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        {busCards.map(
          (card, i) =>
            i === busCards.length - 1 && (
              <View key={i} style={[margins.mb4, { height: 110, width: 75 }]}>
                {card === 0 ? (
                  <SmallCard
                    style={{ flex: 1, width: '100%' }}
                    backSide={true}
                  />
                ) : (
                  <SmallCard style={{ flex: 1, width: '100%' }} card={card} />
                )}
              </View>
            )
        )}
      </View>
    </ScrollView>
  );
};
