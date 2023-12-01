import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import {
  SET_NUMBER_ROWS,
  SET_NUMBER_DECKS_JOKERS,
  REMOVE_CARD,
  FLIP_CARD,
  FINAL_ROUND,
} from '../../services/bus/bus.service';

import {
  buildDeck,
  selectRandomCard,
  removeCard,
  setBusCard,
  selectPlayersByCard,
  allCards,
  numberOfCards,
} from './bus.utils';

export const initialState = {
  cards: allCards,
  jokers: 0,
  rows: 1,
  busCards: [],
};

const extraReducers = createExtraReducers();

const busSlice = createSlice({
  name: 'bus',
  initialState,
  extraReducers,
});

function createExtraReducers() {
  return (builder) => {
    builder.addCase(SET_NUMBER_DECKS_JOKERS, (state, action) => {
      return {
        ...state,
        cards: buildDeck(action.meta.decks, action.meta.jokers),
        jokers: action.meta.jokers,
        decks: action.meta.decks,
      };
    });
    builder.addCase(SET_NUMBER_ROWS, (state, action) => {
      return {
        ...state,
        rows: action.meta.rows,
        busCards: Array(action.meta.rows * 2 + 1).fill(0),
      };
    });
    builder.addCase(REMOVE_CARD, (state, action) => {
      return {
        ...state,
        cards: removeCard(state.cards.slice(), action.meta.card, state.jokers),
      };
    });
    builder.addCase(FLIP_CARD, (state, action) => {
      return {
        ...state,
        cards: removeCard(state.cards.slice(), action.meta.card),
        busCards: setBusCard(state.busCards.slice(), action.meta.card),
      };
    });
    builder.addCase(FINAL_ROUND, (state) => {
      return {
        ...state,
        cards: buildDeck(state.decks, state.jokers),
        busCards: [],
      };
    });
  };
}

const selectRoot = (state) => state.bus;

const selectConfigRoot = (state) => state.configuration;

const selectNumberOfRows = createSelector(selectRoot, (bus) => bus.rows);

const selectDecks = createSelector(selectRoot, (bus) => bus.decks);

const selectJokers = createSelector(selectRoot, (bus) => bus.jokers);

const selectNumberOfCards = createSelector(selectRoot, (bus) =>
  numberOfCards(bus.cards)
);

const selectCard = createSelector(selectRoot, (bus) =>
  selectRandomCard(bus.cards)
);

const selectBusCards = createSelector(selectRoot, (bus) => bus.busCards);

const selectPlayersFiltered = createSelector(
  selectConfigRoot,
  selectCard,
  (configuration, card) => selectPlayersByCard(configuration.players, card)
);

export {
  selectNumberOfRows,
  selectCard,
  selectBusCards,
  selectPlayersFiltered,
  selectNumberOfCards,
  selectDecks,
  selectJokers,
};

export const { actions, reducer } = busSlice;
