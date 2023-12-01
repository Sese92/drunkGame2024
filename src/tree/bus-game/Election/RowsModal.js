import React, { useState } from 'react';

import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { selectNumberOfCards } from '../../../features/bus/bus.store';
import { setNumberOfRows } from '../../../services/bus/bus.service';

import { QuantityButtons } from '../../../ui/organisms/QuantityButtons';

import { margins } from '../../../ui/style/spacing';
import { Text } from '../../../ui/atoms/Text';
import { Button } from '../../../ui/atoms/Button';

export const RowsModal = ({ navigation, onClose }) => {
  const [localRows, saveRows] = useState(1);
  const dispatch = useDispatch();
  const numberOfCardsRemain = useSelector(selectNumberOfCards);

  function nextScreen() {
    dispatch(setNumberOfRows({ rows: localRows }));

    onClose();
    navigation.navigate('Bus');
  }

  return (
    <View style={[margins.m10, { alignSelf: 'center' }]}>
      <Text
        text="bus_game.nb_rows"
        style={[
          margins.mb3,
          { textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
        ]}
      />

      <View style={[margins.mb8]}>
        <QuantityButtons
          max={numberOfCardsRemain / 2 - 1}
          value={localRows.toString()}
          addQuantity={() => saveRows(localRows + 1)}
          subQuantity={() => saveRows(localRows - 1)}
        />
      </View>

      <Button onPress={() => nextScreen()}>
        <Text text="continue" style={{ fontSize: 16, fontWeight: 'bold' }} />
      </Button>
    </View>
  );
};
