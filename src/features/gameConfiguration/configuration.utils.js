export function setPlayers(players, game) {
  const string = JSON.stringify(players);
  const goodPlayers = JSON.parse(string);

  const arrayOfPlayers = [];
  if (game === 'JotaGame') {
    for (let i = 0; i < goodPlayers.length; i++) {
      arrayOfPlayers.push({
        name: goodPlayers[i].name,
        jota: goodPlayers[i].jota ?? false,
      });
    }
  } else if (game === 'BusGame') {
    for (let i = 0; i < goodPlayers.length; i++) {
      arrayOfPlayers.push({ name: goodPlayers[i].name, hand: [] });
    }
  }
  return arrayOfPlayers;
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
