import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import {
  SELECT_GAME,
  SET_PLAYERS,
  SET_TURN,
  RENEW_PLAYERS,
} from '../../services/game/game.service';

import {
  SET_PLAYER_HAND,
  REMOVE_CARD_FROM_HAND,
  CLEAR_PLAYER_HAND,
  REMOVE_PLAYER,
} from '../../services/bus/bus.service';

import { SET_PLAYER_AS_JOTA } from '../../services/jota/jota.service';

import { setPlayers, selectLastPlayers } from './configuration.utils';
import { setHand, removeFromHand, clearHand } from '../bus/bus.utils';
import { setJota } from '../jota/jota.utils';

export const initialState = {
  game: '',
  players: [],
  turn: 0,
  initialPlayers: [],
};

const extraReducers = createExtraReducers();

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  extraReducers,
});

function createExtraReducers() {
  return (builder) => {
    builder.addCase(SELECT_GAME, (state, action) => {
      return {
        ...state,
        game: action.meta.game,
      };
    });
    builder.addCase(SET_PLAYERS, (state, action) => {
      return {
        ...state,
        players: setPlayers(action.meta.players, state.game),
        initialPlayers: setPlayers(action.meta.players, state.game),
      };
    });
    builder.addCase(SET_TURN, (state, action) => {
      return {
        ...state,
        turn: action.meta.turn,
      };
    });
    // JOTA
    builder.addCase(SET_PLAYER_AS_JOTA, (state, action) => {
      return {
        ...state,
        players: setJota(state.players, action.meta.player),
      };
    });
    // BUS
    builder.addCase(SET_PLAYER_HAND, (state, action) => {
      return {
        ...state,
        players: setHand(state.players, action.meta.player, action.meta.card),
      };
    });
    builder.addCase(REMOVE_CARD_FROM_HAND, (state, action) => {
      return {
        ...state,
        players: removeFromHand(
          state.players.slice(),
          action.meta.player,
          action.meta.card
        ),
      };
    });
    builder.addCase(RENEW_PLAYERS, (state) => {
      return {
        ...state,
        players: selectLastPlayers(state.players),
      };
    });
    builder.addCase(CLEAR_PLAYER_HAND, (state, action) => {
      return {
        ...state,
        players: clearHand(state.players.slice(), action.meta.player),
      };
    });
    builder.addCase(REMOVE_PLAYER, (state, action) => {
      return {
        ...state,
        players: state.players.filter(
          (player) => player.name !== action.meta.player.name
        ),
      };
    });
  };
}

const selectRoot = (state) => state.configuration;

const selectSelectedGame = createSelector(
  selectRoot,
  (configuration) => configuration.game
);

const selectPlayers = createSelector(
  selectRoot,
  (configuration) => configuration.players
);

const selectInitialPlayers = createSelector(
  selectRoot,
  (configuration) => configuration.initialPlayers
);

const selectNumberOfPlayers = createSelector(
  selectRoot,
  (configuration) => configuration.players.length
);

const selectTurn = createSelector(
  selectRoot,
  (configuration) => configuration.turn
);

const selectFinalPlayers = createSelector(selectRoot, (configuration) =>
  selectLastPlayers(configuration.players)
);

export {
  selectSelectedGame,
  selectPlayers,
  selectNumberOfPlayers,
  selectTurn,
  selectFinalPlayers,
  selectInitialPlayers,
};

export const { actions, reducer } = configurationSlice;
