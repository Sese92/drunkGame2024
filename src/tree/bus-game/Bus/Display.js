import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { selectBusCards } from '../../../features/bus/bus.store';

import { Text } from '../../../ui/atoms/Text';
import { SmallCard } from '../../../ui/atoms/Card';
import { margins } from '../../../ui/style/spacing';

export const Display = () => {
  const busCards = useSelector(selectBusCards);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        marginBottom: 100,
        marginTop: 30,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            width: '30%',
          }}>
          <Text
            text="bus_game.drink"
            style={[margins.my3, { fontWeight: 'bold', fontSize: 22 }]}
          />
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
          <Text
            text="bus_game.send"
            style={[margins.my3, { fontWeight: 'bold', fontSize: 22 }]}
          />
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
