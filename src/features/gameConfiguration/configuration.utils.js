export function setPlayers(number, game, playerName) {
  const arrayOfPlayers = [];
  if (game === 'Jota') {
    for (let i = 0; i < number; i++) {
      arrayOfPlayers.push({ name: playerName + ' ' + (i + 1), jota: false });
    }
  } else if (game === 'Bus') {
    for (let i = 0; i < number; i++) {
      arrayOfPlayers.push({ name: playerName + ' ' + (i + 1), hand: [] });
    }
  }
  return arrayOfPlayers;
}

export function setPlayersNames(players, names) {
  const string = JSON.stringify(players);
  const goodPlayers = JSON.parse(string);
  for (let i = 0; i < goodPlayers.length; i++) {
    if (names[i] !== '') {
      goodPlayers[i].name = names[i];
    }
  }
  return goodPlayers;
}

export function selectLastPlayers(players) {
  const string = JSON.stringify(players);
  const goodPlayers = JSON.parse(string);

  let maxLenght = 0;
  for (let i = 0; i < goodPlayers.length; i++) {
    if (goodPlayers[i].hand.length > maxLenght) {
      maxLenght = goodPlayers[i].hand.length;
    }
  }

  const lastPlayers = goodPlayers.filter(
    (player) => player.hand.length === maxLenght
  );

  for (let i = 0; i < lastPlayers.length; i++) {
    lastPlayers[i].hand = [];
  }

  return lastPlayers;
}
