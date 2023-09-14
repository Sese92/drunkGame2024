export const SET_NUMBER_DECKS_JOKERS = 'SET_NUMBER_DECKS_JOKERS';
export const SET_NUMBER_ROWS = 'SET_NUMBER_ROWS';
export const SET_PLAYER_HAND = 'SET_PLAYER_HAND';
export const REMOVE_CARD = 'REMOVE_CARD';
export const FLIP_CARD = 'FLIP_CARD';
export const REMOVE_CARD_FROM_HAND = 'REMOVE_CARD_FROM_HAND';
export const FINAL_ROUND = 'FINAL_ROUND';
export const CLEAR_PLAYER_HAND = 'CLEAR_PLAYER_HAND';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';

export const setNumberOfJokersAndDecks = ({ decks, jokers }) => ({
  type: SET_NUMBER_DECKS_JOKERS,
  meta: {
    decks,
    jokers,
  },
});

export const setNumberOfRows = ({ rows }) => ({
  type: SET_NUMBER_ROWS,
  meta: {
    rows,
  },
});

export const setPlayerHand = ({ player, card }) => ({
  type: SET_PLAYER_HAND,
  meta: {
    player,
    card,
  },
});

export const clearPlayerHand = ({ player }) => ({
  type: CLEAR_PLAYER_HAND,
  meta: {
    player,
  },
});

export const removeCard = ({ card }) => ({
  type: REMOVE_CARD,
  meta: {
    card,
  },
});

export const flipCard = ({ card }) => ({
  type: FLIP_CARD,
  meta: {
    card,
  },
});

export const removeFromHand = ({ player, card }) => ({
  type: REMOVE_CARD_FROM_HAND,
  meta: {
    player,
    card,
  },
});

export const finalRound = () => ({
  type: FINAL_ROUND,
});

export const removePlayer = ({ player }) => ({
  type: REMOVE_PLAYER,
  meta: {
    player,
  },
});
