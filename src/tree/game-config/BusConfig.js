import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, View, Platform } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

import { selectPlayers } from '../../features/gameConfiguration/configuration.store';
import { setNumberOfJokersAndDecks } from '../../services/bus/bus.service';
import { flex } from '../../ui/style/layout';
import { margins } from '../../ui/style/spacing';
import { QuantityButtons } from '../../ui/organisms/QuantityButtons';
import { Text } from '../../ui/atoms/Text';
import { FloatingBar } from '../../ui/atoms/FloatingBar';
import { Button } from '../../ui/atoms/Button';
import { IconArrow } from '../../ui/zicons/Arrow';

export const BusConfig = () => {
  const players = useSelector(selectPlayers);
  const [nbJokers, saveNbJokers] = useState(0);
  const [nbDecks, saveNbDecks] = useState(1);
  const [mindecks, saveMinDecks] = useState(1);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Add 3 to have at least one row on the final
    saveMinDecks(Math.ceil((players.length * 4 + 3) / 52));
    saveNbDecks(Math.ceil((players.length * 4 + 3) / 52));
  }, []);

  function continueToGame() {
    dispatch(setNumberOfJokersAndDecks({ decks: nbDecks, jokers: nbJokers }));
    navigation.navigate('BusGame');
  }

  return (
    <SafeAreaView
      style={[
        flex.on,
        {
          backgroundColor: colors.secondary,
          paddingTop: Platform.OS === 'android' ? 20 : 0,
        },
      ]}>
      <View style={{ flexDirection: 'row' }}>
        <Button
          shadow="none"
          onPress={() => navigation.navigate('Main')}
          bgColor="transparent"
          style={{ height: 30 }}>
          <IconArrow height={20} width={20} rotate={270} />
        </Button>
      </View>

      <View style={[margins.mx6]}>
        <Text
          text="bus"
          style={{ textAlign: 'center', fontSize: 26, fontWeight: 'bold' }}
        />
      </View>
      <View>
        <View style={[margins.mt8]}>
          <Text
            text="game_configuration.nb_jokers"
            style={[
              margins.mb3,
              { textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
            ]}
          />

          <View style={{ alignSelf: 'center' }}>
            <QuantityButtons
              min={0}
              addQuantity={() => saveNbJokers(nbJokers + 1)}
              subQuantity={() => saveNbJokers(nbJokers - 1)}
              value={nbJokers.toString()}
            />
          </View>
        </View>
        <View style={[margins.mt8]}>
          <Text
            text="game_configuration.nb_decks"
            style={[
              margins.mb3,
              { textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
            ]}
          />

          <View style={{ alignSelf: 'center' }}>
            <QuantityButtons
              min={mindecks}
              addQuantity={() => saveNbDecks(nbDecks + 1)}
              subQuantity={() => saveNbDecks(nbDecks - 1)}
              value={nbDecks.toString()}
            />
          </View>
        </View>
      </View>

      <FloatingBar>
        <View style={[margins.mx4]}>
          <Button onPress={() => continueToGame()}>
            <Text
              text="continue"
              style={{ fontSize: 20, fontWeight: 'bold' }}></Text>
          </Button>
        </View>
      </FloatingBar>
    </SafeAreaView>
  );
};
