import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import {
  SELECT_GAME,
  SET_NUMBER_PLAYERS,
  SET_NAMES,
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

import {
  setPlayers,
  setPlayersNames,
  selectLastPlayers,
} from './configuration.utils';
import { setHand, removeFromHand, clearHand } from '../bus/bus.utils';
import { setJota } from '../jota/jota.utils';
export const initialState = {
  game: '',
  players: [],
  turn: 0,
  initialPlayers: [],
};

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  extraReducers: {
    [SELECT_GAME]: (state, action) => {
      return {
        ...state,
        game: action.meta.game,
      };
    },
    [SET_NUMBER_PLAYERS]: (state, action) => {
      return {
        ...state,
        players: setPlayers(
          action.meta.numberOfPlayers,
          state.game,
          action.meta.playersName
        ),
        initialPlayers: setPlayers(
          action.meta.numberOfPlayers,
          state.game,
          action.meta.playersName
        ),
      };
    },
    [SET_NAMES]: (state, action) => {
      return {
        ...state,
        players: setPlayersNames(state.players, action.meta.names),
        initialPlayers: setPlayersNames(
          state.initialPlayers,
          action.meta.names
        ),
      };
    },
    [SET_TURN]: (state, action) => {
      return {
        ...state,
        turn: action.meta.turn,
      };
    },

    // Jota
    [SET_PLAYER_AS_JOTA]: (state, action) => {
      return {
        ...state,
        players: setJota(state.players, action.meta.player),
      };
    },
    // Bus
    [SET_PLAYER_HAND]: (state, action) => {
      return {
        ...state,
        players: setHand(state.players, action.meta.player, action.meta.card),
      };
    },
    [REMOVE_CARD_FROM_HAND]: (state, action) => {
      return {
        ...state,
        players: removeFromHand(
          state.players.slice(),
          action.meta.player,
          action.meta.card
        ),
      };
    },
    [RENEW_PLAYERS]: (state) => {
      return {
        ...state,
        players: selectLastPlayers(state.players),
      };
    },
    [CLEAR_PLAYER_HAND]: (state, action) => {
      return {
        ...state,
        players: clearHand(state.players.slice(), action.meta.player),
      };
    },
    [REMOVE_PLAYER]: (state, action) => {
      return {
        ...state,
        players: state.players.filter(
          (player) => player.name !== action.meta.player.name
        ),
      };
    },
  },
});

const selectRoot = (state) => state.configuration;

const selectGame = createSelector(
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
  selectGame,
  selectPlayers,
  selectNumberOfPlayers,
  selectTurn,
  selectFinalPlayers,
  selectInitialPlayers,
};

export const { actions, reducer } = configurationSlice;
