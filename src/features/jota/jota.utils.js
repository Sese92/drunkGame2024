export const dice = [
  { number: 1, color: 'red', rule: 'new_rule' },
  { number: 7, color: 'black', rule: 'left' },
  { number: 8, color: 'red', rule: 'right' },
  { number: 'J', color: 'black', rule: 'j' },
  { number: 'Q', color: 'black', rule: 'q' },
  { number: 'K', color: 'red', rule: 'k' },
];

export function setJota(players, player) {
  const string = JSON.stringify(players);
  const goodPlayers = JSON.parse(string);
  let pl = goodPlayers.find((play) => play.name === player.name);
  let index = goodPlayers.indexOf(pl);

  goodPlayers[index] = { name: player.name, jota: true };

  return goodPlayers;
}
