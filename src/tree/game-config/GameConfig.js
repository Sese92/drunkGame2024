import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, View, Platform } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';

import { selectGame } from '../../features/gameConfiguration/configuration.store';
import { setNumberOfPlayers } from '../../services/game/game.service';
import { setNumberOfJokersAndDecks } from '../../services/bus/bus.service';
import { startJotaGame } from '../../services/jota/jota.service';
import { flex } from '../../ui/style/layout';
import { margins } from '../../ui/style/spacing';
import { QuantityButtons } from '../../ui/organisms/QuantityButtons';
import { Text } from '../../ui/atoms/Text';
import { FloatingBar } from '../../ui/atoms/FloatingBar';
import { Button } from '../../ui/atoms/Button';
import { IconArrow } from '../../ui/zicons/Arrow';
import { PlayersNames } from './PlayersNames';

export const GameConfig = () => {
  const game = useSelector(selectGame);
  const [players, savePlayers] = useState(1);
  const [jokers, saveJokers] = useState(0);
  const [decks, saveDecks] = useState(1);
  const [mindecks, saveMinDecks] = useState(1);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (players * 4 >= decks * 54) {
      saveMinDecks(decks + 1);
      saveDecks(decks + 1);
    }
  }, [players]);

  const modalizeNames = useRef(null);

  function nextScreen() {
    dispatch(
      setNumberOfPlayers({
        numberOfPlayers: players,
        playersName: t('game_configuration.player'),
      })
    );
    openPlayersNames();
  }

  const openPlayersNames = () => {
    modalizeNames.current?.open();
  };

  const closePlayersNames = () => {
    modalizeNames.current?.close();
  };

  function continueToGame() {
    closePlayersNames();
    if (game === 'BusGame') {
      dispatch(setNumberOfJokersAndDecks({ decks: decks, jokers: jokers }));
      navigation.navigate('BusGame');
    } else {
      dispatch(startJotaGame());
      navigation.navigate('JotaGame');
    }
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
          text={game === 'JotaGame' ? 'j' : 'bus'}
          style={{ textAlign: 'center', fontSize: 26, fontWeight: 'bold' }}
        />

        <View style={[margins.mt8]}>
          <Text
            text="game_configuration.nb_players"
            style={[
              margins.mb3,
              { textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
            ]}
          />

          <View style={{ alignSelf: 'center' }}>
            <QuantityButtons
              value={players.toString()}
              addQuantity={() => savePlayers(players + 1)}
              subQuantity={() => savePlayers(players - 1)}
            />
          </View>
        </View>
      </View>
      {game === 'BusGame' && (
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
                addQuantity={() => saveJokers(jokers + 1)}
                subQuantity={() => saveJokers(jokers - 1)}
                value={jokers.toString()}
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
                addQuantity={() => saveDecks(decks + 1)}
                subQuantity={() => saveDecks(decks - 1)}
                value={decks.toString()}
              />
            </View>
          </View>
        </View>
      )}

      <FloatingBar>
        <View style={[margins.mx4]}>
          <Button onPress={() => nextScreen()}>
            <Text
              text="continue"
              style={{ fontSize: 20, fontWeight: 'bold' }}></Text>
          </Button>
        </View>
      </FloatingBar>
      <Portal>
        <Modalize ref={modalizeNames} adjustToContentHeight={true}>
          <PlayersNames continueToGame={() => continueToGame()} />
        </Modalize>
      </Portal>
    </SafeAreaView>
  );
};
