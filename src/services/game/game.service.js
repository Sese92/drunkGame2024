export const SELECT_GAME = 'SELECT_GAME';
export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_TURN = 'SET_TURN';
export const RENEW_PLAYERS = 'RENEW_PLAYERS';

export const selectGame = ({ game }) => ({
  type: SELECT_GAME,
  meta: {
    game,
  },
});

export const setPlayers = ({ players }) => ({
  type: SET_PLAYERS,
  meta: {
    players,
  },
});

export const setTurn = ({ turn }) => ({
  type: SET_TURN,
  meta: {
    turn,
  },
});

export const renewPlayers = () => ({
  type: RENEW_PLAYERS,
});
