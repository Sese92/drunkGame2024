import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { dice } from './jota.utils';

import {
  FINISH_FIRST_ROUND,
  START_THE_GAME,
} from '../../services/jota/jota.service';

export const initialState = {
  dice: dice,
  firstRound: true,
};

const jotaSlice = createSlice({
  name: 'jota',
  initialState,
  extraReducers: {
    [START_THE_GAME]: (state) => {
      return {
        ...state,
        firstRound: true,
      };
    },
    [FINISH_FIRST_ROUND]: (state) => {
      return {
        ...state,
        firstRound: false,
      };
    },
  },
});

const selectRoot = (state) => state.jota;

const selectDice = createSelector(selectRoot, (jota) => jota.dice);

const selectFirstRound = createSelector(selectRoot, (jota) => jota.firstRound);

export { selectDice, selectFirstRound };

export const { actions, reducer } = jotaSlice;
